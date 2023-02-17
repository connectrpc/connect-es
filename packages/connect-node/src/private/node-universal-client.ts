// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as http2 from "http2";
import * as http from "http";
import * as https from "https";
import type * as net from "net";
import { Code, ConnectError } from "@bufbuild/connect";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./node-universal-header.js";
import {
  connectErrorFromNodeReason,
  getNodeErrorProps,
  unwrapNodeErrorChain,
} from "./node-error.js";
import type {
  AsyncIterableSink,
  UniversalClientFn,
  UniversalClientRequest,
  UniversalClientResponse,
} from "@bufbuild/connect/protocol";
import { pipeTo } from "@bufbuild/connect/protocol";

/**
 * Create an HTTP client using the Node.js `http` or `https` package.
 *
 * The HTTP client is a simple function conforming to the type UniversalClientFn.
 * It takes an UniversalClientRequest as an argument, and returns a promise for
 * an UniversalClientResponse.
 */
export function createNodeHttp1Client(
  httpOptions:
    | Omit<http.RequestOptions, "signal">
    | Omit<https.RequestOptions, "signal">
    | undefined
): UniversalClientFn {
  return async function request(
    req: UniversalClientRequest
  ): Promise<UniversalClientResponse> {
    const sentinel = createSentinel();
    return new Promise<UniversalClientResponse>((resolve, reject) => {
      sentinel.catch((e) => {
        reject(e);
      });

      h1Request(
        sentinel,
        req.url,
        {
          ...httpOptions,
          headers: webHeaderToNodeHeaders(req.header),
          method: req.method,
          signal: req.signal,
        },
        (request) => {
          pipeTo(req.body, sinkRequest(sentinel, request), {
            propagateDownStreamError: true,
          }).catch(sentinel.reject);
          request.on("response", (response) => {
            response.on("error", sentinel.reject);
            response.on("abort", () =>
              sentinel.reject(
                new ConnectError("node response aborted", Code.Aborted)
              )
            );
            response.on("timeout", () =>
              sentinel.reject(
                new ConnectError("node response timed out", Code.Aborted)
              )
            );
            const trailer = new Headers();
            resolve({
              status: response.statusCode ?? 0,
              header: nodeHeaderToWebHeader(response.headers),
              body: h1ResponseIterable(sentinel, response, trailer),
              trailer,
            });
          });
        }
      );
    });
  };
}

/**
 * Create an HTTP client using the Node.js `http2` package.
 *
 * Note that the client is bound to the authority, and by default, it will close
 * the HTTP/2 session after the response is read to the end.
 *
 * The HTTP client is a simple function conforming to the type UniversalClientFn.
 * It takes an UniversalClientRequest as an argument, and returns a promise for
 * an UniversalClientResponse.
 */
export function createNodeHttp2Client(
  authority: URL | string,
  keepSessionOpen: boolean,
  http2SessionOptions:
    | http2.ClientSessionOptions
    | http2.SecureClientSessionOptions
    | undefined
): UniversalClientFn {
  const sessionHolder: H2SessionHolder = {
    options: http2SessionOptions,
    authority: new URL(authority).origin,
    keepOpen: keepSessionOpen,
    lastSession: undefined,
  };
  return async function request(
    req: UniversalClientRequest
  ): Promise<UniversalClientResponse> {
    const sentinel = createSentinel();
    return new Promise<UniversalClientResponse>((resolve, reject) => {
      sentinel.catch((e) => {
        reject(e);
      });
      h2Request(
        sentinel,
        sessionHolder,
        req.url,
        req.method,
        webHeaderToNodeHeaders(req.header),
        {
          signal: req.signal,
        },
        (stream) => {
          void pipeTo(req.body, sinkRequest(sentinel, stream), {
            propagateDownStreamError: true,
          }).catch(sentinel.reject);
          stream.on("response", (headers) => {
            const response: UniversalClientResponse = {
              status: headers[":status"] ?? 0,
              header: nodeHeaderToWebHeader(headers),
              body: h2ResponseIterable(sentinel, stream),
              trailer: h2ResponseTrailer(stream),
            };
            resolve(response);
          });
        }
      );
    });
  };
}

function h1Request(
  sentinel: Sentinel,
  url: string,
  options: http.RequestOptions | https.RequestOptions,
  onRequest: (request: http.ClientRequest) => void
): void {
  let request: http.ClientRequest;
  if (new URL(url).protocol.startsWith("https")) {
    request = https.request(url, options);
  } else {
    request = http.request(url, options);
  }
  request.on("error", sentinel.reject);
  request.on("abort", () =>
    sentinel.reject(new ConnectError("node request aborted", Code.Aborted))
  );
  request.on("socket", function onRequestSocket(socket: net.Socket) {
    socket.on("error", sentinel.reject);
    socket.on("timeout", () =>
      sentinel.reject(new ConnectError("node socket timed out", Code.Aborted))
    );
    request.off("socket", onRequestSocket);
    socket.on("connect", onSocketConnect);

    function onSocketConnect() {
      socket.off("connect", onSocketConnect);
      onRequest(request);
    }
  });
}

function sinkRequest(
  sentinel: Sentinel,
  request: http.ClientRequest | http2.ClientHttp2Stream
): AsyncIterableSink<Uint8Array> {
  return function write(iterable: AsyncIterable<Uint8Array>): Promise<void> {
    const it = iterable[Symbol.asyncIterator]();
    return new Promise((resolve, reject) => {
      sentinel.catch(reject);
      writeNext();

      function writeNext() {
        if (sentinel.isRejected()) {
          return;
        }
        it.next().then(
          (r) => {
            if (r.done === true) {
              request.end(resolve);
              return;
            }
            request.write(r.value, "binary", function (e) {
              if (e) {
                if (
                  request.writableEnded &&
                  unwrapNodeErrorChain(e)
                    .map(getNodeErrorProps)
                    .some((p) => p.code == "ERR_STREAM_WRITE_AFTER_END") &&
                  it.throw !== undefined
                ) {
                  // If the server responds and closes the connection before the client has written the entire response
                  // body, we get an ERR_STREAM_WRITE_AFTER_END error code from Node.js here.
                  // We do want to notify the iterable of the error condition, but we do not want to reject our sentinel,
                  // because that would also affect the reading side.
                  it.throw(
                    new ConnectError("stream closed", Code.Aborted)
                  ).catch(() => {
                    //
                  });
                  return;
                }
                sentinel.reject(e);
              } else {
                writeNext();
              }
            });
          },
          (e) => {
            sentinel.reject(e);
          }
        );
      }
    });
  };
}

function h1ResponseIterable(
  sentinel: Sentinel,
  response: http.IncomingMessage,
  trailer: Headers
): AsyncIterable<Uint8Array> {
  const inner: AsyncIterator<Uint8Array> = response[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return {
        async next(): Promise<IteratorResult<Uint8Array>> {
          const r = await sentinel.race(inner.next());
          if (r.done === true) {
            nodeHeaderToWebHeader(response.trailers).forEach((value, key) => {
              trailer.set(key, value);
            });
            sentinel.resolve();
            await sentinel;
          }
          return r;
        },
        throw(e?: unknown): Promise<IteratorResult<Uint8Array>> {
          sentinel.reject(e);
          throw e;
        },
      };
    },
  };
}

interface H2SessionHolder {
  readonly options:
    | http2.ClientSessionOptions
    | http2.SecureClientSessionOptions
    | undefined;
  readonly authority: string;
  readonly keepOpen: boolean;
  lastSession: http2.ClientHttp2Session | undefined;
}

function h2Request(
  sentinel: Sentinel,
  sessionHolder: H2SessionHolder,
  url: string,
  method: string,
  headers: http2.OutgoingHttpHeaders,
  options: http2.ClientSessionRequestOptions,
  onStream: (stream: http2.ClientHttp2Stream) => void
): void {
  const requestUrl = new URL(url);
  if (requestUrl.origin !== sessionHolder.authority) {
    const message = `cannot make a request to ${requestUrl.origin}: the http2 session is connected to ${sessionHolder.authority}`;
    sentinel.reject(new ConnectError(message, Code.Internal));
    return;
  }
  if (
    sessionHolder.keepOpen &&
    sessionHolder.lastSession !== undefined &&
    !sessionHolder.lastSession.closed &&
    !sessionHolder.lastSession.destroyed
  ) {
    return h2ConnectedSession(sessionHolder.lastSession);
  }

  const connectingSession = http2.connect(
    sessionHolder.authority,
    sessionHolder.options,
    h2ConnectedSession
  );
  // connectingSession.on("error", sentinel.reject);
  connectingSession.on("error", h2SessionConnectError);

  function h2SessionConnectError(e: unknown) {
    sentinel.reject(e);
  }

  function h2ConnectedSession(session: http2.ClientHttp2Session): void {
    sessionHolder.lastSession = session;
    session.off("error", sentinel.reject);
    session.off("error", h2SessionConnectError);
    session.on("error", sentinel.reject);
    sentinel.finally(() => {
      session.off("error", sentinel.reject);
      if (!sessionHolder.keepOpen) {
        session.close();
      }
    });
    const stream = session.request(
      {
        ...headers,
        ":method": method,
        ":path": requestUrl.pathname,
      },
      options
    );
    stream.on("error", function h2StreamError(e: unknown) {
      if (
        stream.writableEnded &&
        unwrapNodeErrorChain(e)
          .map(getNodeErrorProps)
          .some((p) => p.code == "ERR_STREAM_WRITE_AFTER_END")
      ) {
        return;
      }
      sentinel.reject(e);
    });
    stream.on("abort", function h2StreamAbort() {
      sentinel.reject(new ConnectError("node request aborted", Code.Aborted));
    });
    onStream(stream);
  }
}

function h2ResponseTrailer(response: http2.ClientHttp2Stream): Headers {
  const trailer = new Headers();
  response.on(
    "trailers",
    (args: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader) => {
      nodeHeaderToWebHeader(args).forEach((value, key) => {
        trailer.set(key, value);
      });
    }
  );
  return trailer;
}

function h2ResponseIterable(
  sentinel: Sentinel,
  response: http2.ClientHttp2Stream
): AsyncIterable<Uint8Array> {
  const inner: AsyncIterator<Uint8Array> = response[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return {
        async next(): Promise<IteratorResult<Uint8Array>> {
          const r = await sentinel.race(inner.next());
          if (r.done === true) {
            sentinel.resolve();
            await sentinel;
          }
          return r;
        },
        throw(e?: unknown): Promise<IteratorResult<Uint8Array>> {
          sentinel.reject(e);
          throw e;
        },
      };
    },
  };
}

type Sentinel = Promise<void> & {
  /**
   * Resolve the sentinel.
   */
  resolve(): void;

  isResolved(): boolean;

  /**
   * Reject the sentinel. All errors are converted to ConnectError via
   * connectErrorFromReason().
   */
  reject: (reason: ConnectError | unknown) => void;

  isRejected(): boolean;

  /**
   * Race a promise against the sentinel.
   *
   * Returns the outcome of the promise if it resolves or rejects faster than
   * the sentinel.
   *
   * Rejects if the sentinel is faster, even if the sentinel resolved
   * successfully.
   */
  race<T>(promise: PromiseLike<T>): Promise<Awaited<T>>;
};

function createSentinel(): Sentinel {
  let res: (() => void) | undefined;
  let rej: ((reason: ConnectError | unknown) => void) | undefined;
  let resolved = false;
  let rejected = false;
  const p = new Promise<void>((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  const c: Pick<
    Sentinel,
    "resolve" | "isResolved" | "reject" | "isRejected" | "race"
  > = {
    resolve(): void {
      if (!resolved && !rejected) {
        resolved = true;
        res?.();
      }
    },
    isResolved() {
      return resolved;
    },
    reject(reason): void {
      if (!resolved && !rejected) {
        rejected = true;
        rej?.(connectErrorFromNodeReason(reason));
      }
    },
    isRejected() {
      return rejected;
    },
    async race<T>(promise: PromiseLike<T>): Promise<Awaited<T>> {
      const r = await Promise.race([promise, p]);
      if (r === undefined && resolved) {
        throw new ConnectError("sentinel completed early", Code.Internal);
      }
      return r as Awaited<T>;
    },
  };
  return Object.assign(p, c);
}
