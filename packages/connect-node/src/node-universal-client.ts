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
  connectErrorFromH2ResetCode,
  connectErrorFromNodeReason,
  getNodeErrorProps,
  H2Code,
  unwrapNodeErrorChain,
} from "./node-error.js";
import type {
  UniversalClientFn,
  UniversalClientRequest,
  UniversalClientResponse,
} from "@bufbuild/connect/protocol";
import { getAbortSignalReason } from "@bufbuild/connect/protocol";

/**
 * Options for creating an UniversalClientFn using the Node.js `http`, `https`,
 * or `http2` module.
 */
export type NodeHttpClientOptions =
  | {
      /**
       * Use the Node.js `http` or `https` module.
       */
      httpVersion: "1.1";

      /**
       * Options passed to the request() call of the Node.js built-in
       * http or https module.
       */
      nodeOptions?:
        | Omit<http.RequestOptions, "signal">
        | Omit<https.RequestOptions, "signal">;
    }
  | {
      /**
       * Use the Node.js `http2` module.
       */
      httpVersion: "2";

      /**
       * Base URI for all HTTP requests.
       *
       * Requests will be made to <baseUrl>/<package>.<service>/method
       *
       * Example: `baseUrl: "https://example.com/my-api"`
       *
       * This will make a `POST /my-api/my_package.MyService/Foo` to
       * `example.com` via HTTPS.
       */
      baseUrl: string;

      /**
       * Options passed to the connect() call of the Node.js built-in
       * http2 module.
       */
      nodeOptions?:
        | http2.ClientSessionOptions
        | http2.SecureClientSessionOptions;

      /**
       * By default, HTTP/2 sessions are terminated after each request.
       * Set this option to true to keep sessions alive across multiple
       * requests.
       */
      keepSessionAlive?: boolean;
    };

/**
 * Create a universal client function, a minimal abstraction of an HTTP client,
 * using the Node.js `http`, `https`, or `http2` module.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createNodeHttpClient(options: NodeHttpClientOptions) {
  return options.httpVersion == "2"
    ? createNodeHttp2Client(
        options.baseUrl,
        options.keepSessionAlive ?? false,
        options.nodeOptions
      )
    : createNodeHttp1Client(options.nodeOptions);
}

/**
 * Create an HTTP client using the Node.js `http` or `https` package.
 *
 * The HTTP client is a simple function conforming to the type UniversalClientFn.
 * It takes an UniversalClientRequest as an argument, and returns a promise for
 * an UniversalClientResponse.
 */
function createNodeHttp1Client(
  httpOptions:
    | Omit<http.RequestOptions, "signal">
    | Omit<https.RequestOptions, "signal">
    | undefined
): UniversalClientFn {
  return async function request(
    req: UniversalClientRequest
  ): Promise<UniversalClientResponse> {
    const sentinel = createSentinel(req.signal);
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
        },
        (request) => {
          void sinkRequest(req, request, sentinel);
          request.on("response", (response) => {
            response.on("error", sentinel.reject);
            sentinel.catch((reason) =>
              response.destroy(connectErrorFromNodeReason(reason))
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
function createNodeHttp2Client(
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
    const sentinel = createSentinel(req.signal);
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
        {},
        (stream) => {
          void sinkRequest(req, stream, sentinel);
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
  options:
    | Omit<http.RequestOptions, "signal">
    | Omit<https.RequestOptions, "signal">,
  onRequest: (request: http.ClientRequest) => void
): void {
  let request: http.ClientRequest;
  if (new URL(url).protocol.startsWith("https")) {
    request = https.request(url, options);
  } else {
    request = http.request(url, options);
  }
  sentinel.catch((reason) =>
    request.destroy(connectErrorFromNodeReason(reason))
  );
  // Node.js will only send headers with the first request body byte by default.
  // We force it to send headers right away for consistent behavior between
  // HTTP/1.1 and HTTP/2.2 clients.
  request.flushHeaders();

  request.on("error", sentinel.reject);
  request.on("socket", function onRequestSocket(socket: net.Socket) {
    function onSocketConnect() {
      socket.off("connect", onSocketConnect);
      onRequest(request);
    }

    // If readyState is open, then socket is already open due to keepAlive, so
    // the 'connect' event will never fire so call onRequest explicitly
    if (socket.readyState === "open") {
      onRequest(request);
    } else {
      socket.on("connect", onSocketConnect);
    }
  });
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
  options: Omit<http2.ClientSessionRequestOptions, "signal">,
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
  connectingSession.on("error", h2SessionConnectError);

  function h2SessionConnectError(e: unknown) {
    sentinel.reject(e);
  }

  function h2ConnectedSession(session: http2.ClientHttp2Session): void {
    sessionHolder.lastSession = session;
    session.off("error", sentinel.reject);
    session.off("error", h2SessionConnectError);
    session.on("error", sentinel.reject);
    const stream = session.request(
      {
        ...headers,
        ":method": method,
        ":path": requestUrl.pathname + requestUrl.search,
      },
      options
    );
    sentinel
      .catch((reason) => {
        if (stream.closed) {
          return;
        }
        // Node.js http2 streams that are aborted via an AbortSignal close with
        // an RST_STREAM with code INTERNAL_ERROR.
        // To comply with the mapping between gRPC and HTTP/2 codes, we need to
        // close with code CANCEL.
        // See https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md#errors
        // See https://www.rfc-editor.org/rfc/rfc7540#section-7
        const rstCode =
          reason instanceof ConnectError && reason.code == Code.Canceled
            ? H2Code.CANCEL
            : H2Code.INTERNAL_ERROR;
        return new Promise<void>((resolve) => stream.close(rstCode, resolve));
      })
      .finally(() => {
        session.off("error", sentinel.reject);
        if (!sessionHolder.keepOpen) {
          session.close();
        }
      })
      .catch(() => {
        // We intentionally swallow sentinel rejection - errors must
        // propagate through the request or response iterables.
      });
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

    stream.on("close", function h2StreamClose() {
      const err = connectErrorFromH2ResetCode(stream.rstCode);
      if (err) {
        sentinel.reject(err);
      }
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

async function sinkRequest(
  request: UniversalClientRequest,
  nodeRequest: http.ClientRequest | http2.ClientHttp2Stream,
  sentinel: Sentinel
) {
  if (request.body === undefined) {
    await new Promise<void>((resolve) => nodeRequest.end(resolve));
    return;
  }
  const it = request.body[Symbol.asyncIterator]();
  return new Promise<void>((resolve) => {
    writeNext();

    function writeNext() {
      if (sentinel.isRejected()) {
        return;
      }
      it.next().then(
        (r) => {
          if (r.done === true) {
            nodeRequest.end(resolve);
            return;
          }
          nodeRequest.write(r.value, "binary", function (e) {
            if (e) {
              if (
                nodeRequest.writableEnded &&
                unwrapNodeErrorChain(e)
                  .map(getNodeErrorProps)
                  .some((p) => p.code == "ERR_STREAM_WRITE_AFTER_END") &&
                it.throw !== undefined
              ) {
                // If the server responds and closes the connection before the client has written the entire response
                // body, we get an ERR_STREAM_WRITE_AFTER_END error code from Node.js here.
                // We do want to notify the iterable of the error condition, but we do not want to reject our sentinel,
                // because that would also affect the reading side.
                it.throw(new ConnectError("stream closed", Code.Aborted)).catch(
                  () => {
                    //
                  }
                );
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
}

type Sentinel = Promise<void> & {
  /**
   * Resolve the sentinel.
   */
  resolve(): void;

  isResolved(): boolean;

  /**
   * Reject the sentinel. All errors are converted to ConnectError via
   * ConnectError.from().
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

function createSentinel(signal?: AbortSignal): Sentinel {
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
  const s = Object.assign(p, c);

  function onSignalAbort(this: AbortSignal) {
    c.reject(getAbortSignalReason(this));
  }

  if (signal) {
    if (signal.aborted) {
      c.reject(getAbortSignalReason(signal));
    } else {
      signal.addEventListener("abort", onSignalAbort);
    }
    p.finally(() => signal.removeEventListener("abort", onSignalAbort)).catch(
      () => {
        // We intentionally swallow sentinel rejection - errors must
        // propagate through the request or response iterables.
      }
    );
  }
  return s;
}
