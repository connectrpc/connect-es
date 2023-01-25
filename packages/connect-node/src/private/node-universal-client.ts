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
import {
  AsyncIterableSink,
  Code,
  ConnectError,
  pipeTo,
} from "@bufbuild/connect-core";
import type {
  UniversalClientFn,
  UniversalClientRequest,
  UniversalClientResponse,
} from "./universal.js";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./node-universal-header.js";

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
    const nodeRequest: http.ClientRequest = await new Promise(
      (resolve, error) => {
        let request: http.ClientRequest;
        const requestOptions = {
          ...httpOptions,
          headers: webHeaderToNodeHeaders(req.header),
          method: req.method,
          signal: req.signal,
        };
        if (new URL(req.url).protocol.startsWith("https")) {
          request = https.request(req.url, requestOptions);
        } else {
          request = http.request(req.url, requestOptions);
        }
        request.once("socket", (socket) => {
          socket.once("connect", connect);
          socket.once("error", error);

          function connect() {
            socket.off("error", rejectError);
            resolve(request);
          }

          function rejectError(err: Error) {
            socket.off("connect", connect);
            error(err);
          }
        });
      }
    );
    if (req.body == undefined) {
      await new Promise<void>((resolve) => {
        nodeRequest.end(resolve);
      });
    } else {
      await pipeTo(req.body, createRequestSink(nodeRequest), {
        propagateDownStreamError: true,
      });
    }
    nodeRequest.removeAllListeners();
    return new Promise<UniversalClientResponse>((resolve, reject) => {
      nodeRequest.on("error", (args) => {
        reject(args);
      });
      nodeRequest.on("response", (nodeResponse) => {
        const status = nodeResponse.statusCode ?? 0;
        const header = nodeHeaderToWebHeader(nodeResponse.headers);
        const trailer = new Headers();
        resolve({
          status,
          header,
          body: read(nodeResponse, () => {
            nodeHeaderToWebHeader(nodeResponse.trailers).forEach(
              (value, key) => {
                trailer.set(key, value);
              }
            );
            nodeResponse.removeAllListeners();
          }),
          trailer,
        });
      });
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
  http2Options:
    | http2.ClientSessionOptions
    | http2.SecureClientSessionOptions
    | undefined
): UniversalClientFn {
  const origin = new URL(authority).origin;
  let lastSession: http2.ClientHttp2Session | undefined;
  async function connect(): Promise<http2.ClientHttp2Session> {
    if (
      keepSessionOpen &&
      lastSession !== undefined &&
      !lastSession.closed &&
      !lastSession.destroyed
    ) {
      return lastSession;
    }
    return (lastSession = await new Promise<http2.ClientHttp2Session>(
      (resolve, reject) => {
        const s = http2.connect(
          origin,
          {
            ...http2Options,
          },
          (s) => resolve(s)
        );
        s.on("error", (err) => reject(err));
      }
    ));
  }
  return async function request(
    req: UniversalClientRequest
  ): Promise<UniversalClientResponse> {
    if (new URL(req.url).origin !== origin) {
      throw new ConnectError(
        `cannot make a request to ${
          new URL(req.url).origin
        }: the http2 session is connected to ${origin}`,
        Code.Internal
      );
    }
    const session = await connect();
    return new Promise<UniversalClientResponse>((resolve, reject) => {
      const stream = session.request(
        {
          ...webHeaderToNodeHeaders(req.header),
          ":method": req.method,
          ":path": new URL(req.url).pathname,
        },
        {
          signal: req.signal,
        }
      );
      stream.on("error", (e) => {
        reject(e);
        cleanup();
      });
      const trailer = new Headers();
      stream.on(
        "trailers",
        (args: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader) => {
          nodeHeaderToWebHeader(args).forEach((value, key) => {
            trailer.set(key, value);
          });
        }
      );
      if (req.body == undefined) {
        stream.end();
      } else {
        // we rely on propagation of the error to the source iterable
        void pipeTo(req.body, createRequestSink(stream), {
          propagateDownStreamError: true,
        });
      }
      stream.on("response", (headers) => {
        const status = headers[":status"] ?? 0;
        const header = nodeHeaderToWebHeader(headers);
        const response: UniversalClientResponse = {
          status,
          header,
          body: read(stream, cleanup),
          trailer,
        };
        resolve(response);
      });
      function cleanup() {
        stream.removeAllListeners();
        if (!keepSessionOpen) {
          session.close();
        }
      }
    });
  };
}

async function* read(
  readable: http.IncomingMessage | http2.ClientHttp2Stream,
  finallyFn: undefined | (() => void) | (() => Promise<void>)
): AsyncIterable<Uint8Array> {
  try {
    for await (const chunk of readable) {
      yield chunk;
    }
  } finally {
    if (finallyFn !== undefined) {
      await finallyFn();
    }
  }
}

function createRequestSink(
  nodeRequest: http.ClientRequest | http2.ClientHttp2Stream
): AsyncIterableSink<Uint8Array> {
  return function write(iterable: AsyncIterable<Uint8Array>): Promise<void> {
    const it = iterable[Symbol.asyncIterator]();

    return new Promise((resolve, reject) => {
      nodeRequest.on("error", error);
      nodeRequest.on("drain", drain);
      nodeRequest.on("end", complete);

      writeNext();

      function complete() {
        nodeRequest.off("error", error);
        nodeRequest.off("drain", drain);
        nodeRequest.off("end", complete);
        resolve();
      }

      function error(reason: unknown) {
        nodeRequest.off("drain", error);
        nodeRequest.off("drain", drain);
        nodeRequest.off("end", complete);
        reject(reason);
      }

      function drain() {
        writeNext();
      }

      function writeNext() {
        it.next().then((r) => {
          if (r.done === true) {
            nodeRequest.end(complete);
            return;
          }
          const flushed = nodeRequest.write(r.value, "binary", function (e) {
            if (e) {
              error(e);
            }
          });
          // flushed == false: the stream wishes for the calling code to wait for
          // the 'drain' event to be emitted before continuing to write additional
          // data.
          if (flushed) {
            writeNext();
          }
        }, error);
      }
    });
  };
}
