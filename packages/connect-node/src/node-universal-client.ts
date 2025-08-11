// Copyright 2021-2025 The Connect Authors
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

import type * as http2 from "node:http2";
import * as http from "node:http";
import * as https from "node:https";
import type * as net from "node:net";
import { Code, ConnectError } from "@connectrpc/connect";
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
} from "@connectrpc/connect/protocol";
import { getAbortSignalReason } from "@connectrpc/connect/protocol";
import { Http2SessionManager } from "./http2-session-manager.js";

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
       * A function that must return a session manager for the given URL.
       * The session manager may be taken from a pool.
       * By default, a new Http2SessionManager is created for every request.
       */
      sessionProvider?: (url: string) => NodeHttp2ClientSessionManager;
    };

/**
 * Create a universal client function, a minimal abstraction of an HTTP client,
 * using the Node.js `http`, `https`, or `http2` module.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createNodeHttpClient(options: NodeHttpClientOptions) {
  if (options.httpVersion == "1.1") {
    return createNodeHttp1Client(options.nodeOptions);
  }
  const sessionProvider =
    options.sessionProvider ?? ((url: string) => new Http2SessionManager(url));
  return createNodeHttp2Client(sessionProvider);
}

/**
 * Manager for a HTTP/2 session.
 */
export interface NodeHttp2ClientSessionManager {
  /**
   * The host this session manager connects to.
   */
  authority: string;

  /**
   * Issue a request.
   */
  request(
    method: string,
    path: string,
    headers: http2.OutgoingHttpHeaders,
    options: Omit<http2.ClientSessionRequestOptions, "signal">,
  ): Promise<http2.ClientHttp2Stream>;

  /**
   * Notify the manager of a successful read from a http2.ClientHttp2Stream.
   */
  notifyResponseByteRead(stream: http2.ClientHttp2Stream): void;
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
    | undefined,
): UniversalClientFn {
  return async function request(
    req: UniversalClientRequest,
  ): Promise<UniversalClientResponse> {
    const sentinel = createSentinel(req.signal);
    return new Promise<UniversalClientResponse>((resolve, reject) => {
      sentinel.onError((e) => {
        reject(e);
      });
      h1Request(
        sentinel,
        req.url,
        {
          ...httpOptions,
          headers: webHeaderToNodeHeaders(req.header, httpOptions?.headers),
          method: req.method,
        },
        (request) => {
          void sinkRequest(req, request, sentinel);
          request.on("response", (response) => {
            response.on("error", sentinel.error);
            sentinel.onError((reason) =>
              response.destroy(connectErrorFromNodeReason(reason)),
            );
            const trailer = new Headers();
            resolve({
              status: response.statusCode ?? 0,
              header: nodeHeaderToWebHeader(response.headers),
              body: h1ResponseIterable(sentinel, response, trailer),
              trailer,
            });
          });
        },
      );
    });
  };
}

/**
 * Create an HTTP client using the Node.js `http2` package.
 *
 * The HTTP client is a simple function conforming to the type UniversalClientFn.
 * It takes an UniversalClientRequest as an argument, and returns a promise for
 * an UniversalClientResponse.
 */
function createNodeHttp2Client(
  sessionProvider: (url: string) => NodeHttp2ClientSessionManager,
): UniversalClientFn {
  return function request(
    req: UniversalClientRequest,
  ): Promise<UniversalClientResponse> {
    const sentinel = createSentinel(req.signal);
    const sessionManager = sessionProvider(req.url);
    return new Promise<UniversalClientResponse>((resolve, reject) => {
      sentinel.onError((e) => {
        reject(e);
      });
      h2Request(
        sentinel,
        sessionManager,
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
              body: h2ResponseIterable(sentinel, stream, sessionManager),
              trailer: h2ResponseTrailer(stream),
            };
            resolve(response);
          });
        },
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
  onRequest: (request: http.ClientRequest) => void,
): void {
  let request: http.ClientRequest;
  if (new URL(url).protocol.startsWith("https")) {
    request = https.request(url, options);
  } else {
    request = http.request(url, options);
  }
  sentinel.onError((reason) =>
    request.destroy(connectErrorFromNodeReason(reason)),
  );
  // Node.js will only send headers with the first request body byte by default.
  // We force it to send headers right away for consistent behavior between
  // HTTP/1.1 and HTTP/2.0 clients.
  request.flushHeaders();

  request.on("error", sentinel.error);
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
  trailer: Headers,
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
            sentinel.close();
          }
          return r;
        },
        throw(e?: unknown): Promise<IteratorResult<Uint8Array>> {
          sentinel.error(e);
          throw e;
        },
      };
    },
  };
}

function h2Request(
  sentinel: Sentinel,
  sm: NodeHttp2ClientSessionManager,
  url: string,
  method: string,
  headers: http2.OutgoingHttpHeaders,
  options: Omit<http2.ClientSessionRequestOptions, "signal">,
  onStream: (stream: http2.ClientHttp2Stream) => void,
): void {
  const requestUrl = new URL(url);
  if (requestUrl.origin !== sm.authority) {
    const message = `cannot make a request to ${requestUrl.origin}: the http2 session is connected to ${sm.authority}`;
    sentinel.error(new ConnectError(message, Code.Internal));
    return;
  }
  sm.request(method, requestUrl.pathname + requestUrl.search, headers, {}).then(
    (stream) => {
      sentinel.onError((reason) => {
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
        sentinel.error(e);
      });

      stream.on("close", function h2StreamClose() {
        const err = connectErrorFromH2ResetCode(stream.rstCode);
        if (err) {
          sentinel.error(err);
        }
      });
      onStream(stream);
    },
    (reason) => {
      sentinel.error(reason);
    },
  );
}

function h2ResponseTrailer(response: http2.ClientHttp2Stream): Headers {
  const trailer = new Headers();
  response.on(
    "trailers",
    (args: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader) => {
      nodeHeaderToWebHeader(args).forEach((value, key) => {
        trailer.set(key, value);
      });
    },
  );
  return trailer;
}

function h2ResponseIterable(
  sentinel: Sentinel,
  response: http2.ClientHttp2Stream,
  sm?: NodeHttp2ClientSessionManager,
): AsyncIterable<Uint8Array> {
  const inner: AsyncIterator<Uint8Array> = response[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return {
        async next(): Promise<IteratorResult<Uint8Array>> {
          const r = await sentinel.race(inner.next());
          if (r.done === true) {
            sentinel.close();
          }
          sm?.notifyResponseByteRead(response);
          return r;
        },
        throw(e?: unknown): Promise<IteratorResult<Uint8Array>> {
          sentinel.error(e);
          throw e;
        },
      };
    },
  };
}

async function sinkRequest(
  request: UniversalClientRequest,
  nodeRequest: http.ClientRequest | http2.ClientHttp2Stream,
  sentinel: Sentinel,
) {
  if (request.body === undefined) {
    await new Promise<void>((resolve) => nodeRequest.end(resolve));
    return;
  }
  const it = request.body[Symbol.asyncIterator]();
  return new Promise<void>((resolve) => {
    writeNext();

    function writeNext() {
      if (sentinel.isClosed()) {
        return;
      }
      it.next().then(
        (r) => {
          if (r.done === true) {
            nodeRequest.end(resolve);
            return;
          }
          nodeRequest.write(r.value, "binary", (e) => {
            if (e === null || e === undefined) {
              writeNext();
              return;
            }
            if (it.throw !== undefined) {
              it.throw(connectErrorFromNodeReason(e)).catch(() => {
                //
              });
            }
            // If the server responds and closes the connection before the client has written the entire response
            // body, we get an ERR_STREAM_WRITE_AFTER_END error code from Node.js here.
            // We do want to notify the iterable of the error condition, but we do not want to reject our sentinel,
            // because that would also affect the reading side.
            if (
              nodeRequest.writableEnded &&
              unwrapNodeErrorChain(e)
                .map(getNodeErrorProps)
                .some((p) => p.code == "ERR_STREAM_WRITE_AFTER_END")
            ) {
              return;
            }
            sentinel.error(e);
          });
        },
        (e) => {
          sentinel.error(e);
        },
      );
    }
  });
}

type Sentinel = {
  /**
   * Close the sentinel.
   */
  close(): void;

  /**
   * Close the sentinel with an error.
   *
   * If error is not a ConnectError, it is converted to one via ConnectError.from().
   *
   * Triggers onError handlers.
   */
  error(error?: unknown): void;

  isClosed(): boolean;

  /**
   * Race a promise against the sentinel.
   *
   * Returns the outcome of the promise if it resolves or rejects faster than
   * the sentinel.
   *
   * Rejects if the sentinel is faster, even if the sentinel resolved
   * successfully.
   */
  race<T>(promise: Promise<T>): Promise<T>;

  /**
   * Listen to the sentinel closing with an error.
   */
  onError(onError: (reason: unknown) => void): void;
};

function createSentinel(signal?: AbortSignal): Sentinel {
  let rejectRace: ((reason: unknown) => void) | undefined;
  let closed = false;
  let closedError: unknown | undefined = undefined;
  let onErrorListeners: ((reason: unknown) => void)[] = [];
  const sentinel = {
    error(error: unknown): void {
      if (closed) {
        return;
      }
      closed = true;
      closedError = connectErrorFromNodeReason(error);
      rejectRace?.(closedError);
      for (const onRejected of onErrorListeners) {
        onRejected(closedError);
      }
      cleanup();
    },
    close(): void {
      if (closed) {
        return;
      }
      closed = true;
      if (rejectRace) {
        rejectRace(new ConnectError("sentinel completed early", Code.Internal));
      }
      cleanup();
    },
    isClosed() {
      return closed;
    },
    onError(onError: (reason: unknown) => void): void {
      if (closed) {
        if (closedError !== undefined) {
          onError(closedError);
        }
      } else {
        onErrorListeners.push(onError);
      }
    },
    race<T>(promise: Promise<T>): Promise<T> {
      let resolveRace: ((value: T) => void) | undefined;
      const race = new Promise<T>((resolve, reject) => {
        resolveRace = resolve;
        rejectRace = reject;
      });
      promise.then(
        (value) => {
          resolveRace?.(value);
        },
        (reason: unknown) => {
          rejectRace?.(reason);
        },
      );
      if (closed) {
        rejectRace?.(
          closedError ??
            new ConnectError("sentinel completed early", Code.Internal),
        );
      }
      return race;
    },
  };
  function cleanup() {
    if (signal) {
      signal.removeEventListener("abort", onSignalAbort);
    }
    onErrorListeners = [];
    rejectRace = undefined;
  }
  function onSignalAbort(this: AbortSignal) {
    sentinel.error(getAbortSignalReason(this));
  }
  if (signal) {
    signal.addEventListener("abort", onSignalAbort);
    if (signal.aborted) {
      sentinel.error(getAbortSignalReason(signal));
    }
  }
  return sentinel;
}
