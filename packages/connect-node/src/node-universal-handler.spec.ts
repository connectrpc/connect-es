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

import { useNodeServer } from "./use-node-server-helper.spec.js";
import * as http2 from "node:http2";
import * as http from "node:http";
import { universalRequestFromNodeRequest } from "./node-universal-handler.js";
import { ConnectError } from "@connectrpc/connect";
import { getNodeErrorProps } from "./node-error.js";
import {
  assertByteStreamRequest,
  readAllBytes,
} from "@connectrpc/connect/protocol";
import type { UniversalServerRequest } from "@connectrpc/connect/protocol";

describe("universalRequestFromNodeResponse()", () => {
  describe("with HTTP/2 stream closed with an RST code", () => {
    let serverRequest: UniversalServerRequest | undefined;
    const server = useNodeServer(() => {
      serverRequest = undefined;
      return http2.createServer((request, response) => {
        serverRequest = universalRequestFromNodeRequest(
          request,
          response,
          undefined,
          undefined,
        );
      });
    });
    async function request(rstCode: number) {
      await new Promise<void>((resolve) => {
        http2.connect(server.getUrl(), (session: http2.ClientHttp2Session) => {
          const stream = session.request(
            {
              ":method": "POST",
              ":path": "/",
            },
            {},
          );
          setTimeout(() => {
            stream.on("error", () => {
              // Closing with _some_ codes raises an ERR_HTTP2_STREAM_ERROR
              // error here.
            });
            stream.close(rstCode, () => {
              // We are seeing a race condition in Node.js, where closing
              // the session right after closing a stream with an RST code
              // _sometimes_ sends an INTERNAL_ERROR code.
              // Simply delaying the session close until the next tick like
              // we do here seems to work around the issue.
              setTimeout(() => session.close(resolve), 0);
            });
          }, 0);
        });
      });
    }
    it("should abort request signal with ConnectError and Code.Canceled for NO_ERROR", async () => {
      await request(http2.constants.NGHTTP2_NO_ERROR);
      expect(serverRequest?.signal).toBeInstanceOf(AbortSignal);
      expect(serverRequest?.signal.aborted).toBeTrue();
      expect(serverRequest?.signal.reason).toBeInstanceOf(Error);
      if (serverRequest?.signal.reason instanceof Error) {
        expect(serverRequest.signal.reason.name).toBe("AbortError");
        expect(serverRequest.signal.reason.message).toBe(
          "This operation was aborted",
        );
      }
    });
    it("should silently end request body stream for NO_ERROR", async () => {
      await request(http2.constants.NGHTTP2_NO_ERROR);
      expect(serverRequest).toBeDefined();
      if (serverRequest !== undefined) {
        assertByteStreamRequest(serverRequest);
        const it = serverRequest.body[Symbol.asyncIterator]();
        const r = await it.next();
        expect(r.done).toBeTrue();
      }
    });
    it("should abort request signal with ConnectError and Code.Canceled for CANCEL", async () => {
      await request(http2.constants.NGHTTP2_CANCEL);
      expect(serverRequest?.signal).toBeInstanceOf(AbortSignal);
      expect(serverRequest?.signal.aborted).toBeTrue();
      expect(serverRequest?.signal.reason).toBeInstanceOf(ConnectError);
      const ce = ConnectError.from(serverRequest?.signal.reason);
      expect(ce.message).toBe(
        "[canceled] http/2 stream closed with error code CANCEL (0x8)",
      );
    });
    it("should silently end request body stream for CANCEL", async () => {
      await request(http2.constants.NGHTTP2_CANCEL);
      expect(serverRequest).toBeDefined();
      if (serverRequest !== undefined) {
        assertByteStreamRequest(serverRequest);
        const it = serverRequest.body[Symbol.asyncIterator]();
        const r = await it.next();
        expect(r.done).toBeTrue();
      }
    });
    it("should abort request signal with ConnectError and Code.ResourceExhausted for ENHANCE_YOUR_CALM", async () => {
      await request(http2.constants.NGHTTP2_ENHANCE_YOUR_CALM);
      expect(serverRequest?.signal).toBeInstanceOf(AbortSignal);
      expect(serverRequest?.signal.aborted).toBeTrue();
      expect(serverRequest?.signal.reason).toBeInstanceOf(ConnectError);
      const ce = ConnectError.from(serverRequest?.signal.reason);
      expect(ce.message).toBe(
        "[resource_exhausted] http/2 stream closed with error code ENHANCE_YOUR_CALM (0xb)",
      );
    });
    it("should silently end request body stream for ENHANCE_YOUR_CALM", async () => {
      await request(http2.constants.NGHTTP2_ENHANCE_YOUR_CALM);
      expect(serverRequest).toBeDefined();
      if (serverRequest !== undefined) {
        assertByteStreamRequest(serverRequest);
        const it = serverRequest.body[Symbol.asyncIterator]();
        const r = await it.next();
        expect(r.done).toBeTrue();
      }
    });
    it("should abort request signal with ConnectError and Code.Internal for FRAME_SIZE_ERROR", async () => {
      await request(http2.constants.NGHTTP2_FRAME_SIZE_ERROR);
      expect(serverRequest?.signal).toBeInstanceOf(AbortSignal);
      expect(serverRequest?.signal.aborted).toBeTrue();
      expect(serverRequest?.signal.reason).toBeInstanceOf(ConnectError);
      const ce = ConnectError.from(serverRequest?.signal.reason);
      expect(ce.message).toBe(
        "[internal] http/2 stream closed with error code FRAME_SIZE_ERROR (0x6)",
      );
    });
    it("should silently end request body stream for FRAME_SIZE_ERROR", async () => {
      await request(http2.constants.NGHTTP2_FRAME_SIZE_ERROR);
      expect(serverRequest).toBeDefined();
      if (serverRequest !== undefined) {
        assertByteStreamRequest(serverRequest);
        const it = serverRequest.body[Symbol.asyncIterator]();
        const r = await it.next();
        expect(r.done).toBeTrue();
      }
    });
  });
  describe("with HTTP/1.1 ECONNRESET", () => {
    let serverRequest: UniversalServerRequest | undefined;
    const server = useNodeServer(() => {
      serverRequest = undefined;
      const s = http.createServer(
        {
          // We want to test behavior when a connection is dropped, and we do
          // not want to wait for the default check interval of 30 seconds,
          // because it would make our test suite idle for 30 seconds, so we
          // set it to a very low interval.
          //
          // Node 18 also enabled two timeouts by default: headersTimeout and
          // requestTimeout, which are 60s and 5 mins respectively.
          // https://github.com/nodejs/node/pull/41263
          //
          // However, this change seems to be buggy:
          // https://github.com/nodejs/node/issues/44228
          // https://github.com/b3nsn0w/koa-easy-ws/issues/36
          //
          // And coupled with our low check interval, it seems to be causing
          // intermittent timeouts in our test server. So, we are disabling
          // them by default.
          //
          connectionsCheckingInterval: 1,
          requestTimeout: 0,
        },
        (request, response) => {
          serverRequest = universalRequestFromNodeRequest(
            request,
            response,
            undefined,
            undefined,
          );
        },
      );
      // For some reason, the type definitions for ServerOptions do not include
      // headersTimeout:
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/http.d.ts
      // So, it must be added to the server property after construction.
      s.headersTimeout = 0;
      return s;
    });
    async function request() {
      return new Promise<void>((resolve) => {
        const request = http.request(server.getUrl(), {
          method: "POST",
        });
        request.on("error", () => {
          // we need this event lister so that Node.js does not raise the error
          // we trigger by calling destroy()
        });
        request.flushHeaders();
        setTimeout(() => {
          request.destroy();
          resolve();
        }, 20);
      });
    }
    it("should abort request signal with ConnectError and Code.Aborted", async () => {
      await request();
      while (serverRequest?.signal.reason === undefined) {
        await new Promise((r) => setTimeout(r, 1));
      }
      expect(serverRequest.signal.reason).toBeInstanceOf(Error);
      if (serverRequest.signal.reason instanceof Error) {
        expect(serverRequest.signal.reason).toBeInstanceOf(ConnectError);
        const ce = ConnectError.from(serverRequest.signal.reason);
        expect(ce.message).toBe("[aborted] aborted");
      }
    });
    it("should error request body stream with ECONNRESET", async () => {
      await request();
      expect(serverRequest).toBeDefined();
      if (serverRequest !== undefined) {
        assertByteStreamRequest(serverRequest);
        const it = serverRequest.body[Symbol.asyncIterator]();
        try {
          await it.next();
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
          expect(e).not.toBeInstanceOf(ConnectError);
          if (e instanceof Error) {
            expect(e.message).toBe("aborted");
            expect(getNodeErrorProps(e)).toEqual({
              code: "ECONNRESET",
            });
          }
        }
      }
    });
  });
  describe("with HTTP/1.1 request finishing without error", () => {
    let serverRequest: UniversalServerRequest | undefined;
    const server = useNodeServer(() => {
      const s = http.createServer(
        {
          // We want to test behavior when a connection is dropped, and we do
          // not want to wait for the default check interval of 30 seconds,
          // because it would make our test suite idle for 30 seconds, so we
          // set it to a very low interval.
          //
          // Node 18 also enabled two timeouts by default: headersTimeout and
          // requestTimeout, which are 60s and 5 mins respectively.
          // https://github.com/nodejs/node/pull/41263
          //
          // However, this change seems to be buggy:
          // https://github.com/nodejs/node/issues/44228
          // https://github.com/b3nsn0w/koa-easy-ws/issues/36
          //
          // And coupled with our low check interval, it seems to be causing
          // intermittent timeouts in our test server. So, we are disabling
          // them by default.
          //
          connectionsCheckingInterval: 1,
          requestTimeout: 0,
        },
        (request, response) => {
          serverRequest = universalRequestFromNodeRequest(
            request,
            response,
            undefined,
            undefined,
          );
          response.writeHead(200);
          response.end();
        },
      );
      // For some reason, the type definitions for ServerOptions do not include
      // headersTimeout:
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/http.d.ts
      // So, it must be added to the server property after construction.
      s.headersTimeout = 0;
      return s;
    });
    async function request() {
      return new Promise<void>((resolve) => {
        const request = http.request(server.getUrl(), {
          method: "POST",
          // close TCP connection after we're done so that the server shuts down cleanly
          agent: new http.Agent({ keepAlive: false }),
        });
        request.flushHeaders();
        request.end();
        request.on("response", (response) => {
          void readAllBytes(response, Number.MAX_SAFE_INTEGER).then(() =>
            resolve(),
          );
        });
      });
    }
    it("should abort request signal with AbortError", async () => {
      await request();
      expect(serverRequest?.signal).toBeInstanceOf(AbortSignal);
      expect(serverRequest?.signal.aborted).toBeTrue();
      expect(serverRequest?.signal.reason).toBeInstanceOf(Error);
      if (serverRequest?.signal.reason instanceof Error) {
        expect(serverRequest.signal.reason.name).toBe("AbortError");
        expect(serverRequest.signal.reason.message).toBe(
          "This operation was aborted",
        );
      }
    });
    it("should silently end request body stream", async () => {
      await request();
      expect(serverRequest).toBeDefined();
      if (serverRequest !== undefined) {
        assertByteStreamRequest(serverRequest);
        const it = serverRequest.body[Symbol.asyncIterator]();
        const r = await it.next();
        expect(r.done).toBeTrue();
      }
    });
  });
  describe("with HTTP/1.1", () => {
    let serverRequest: UniversalServerRequest | undefined;
    let serverNodeResponse:
      | http.ServerResponse<http.IncomingMessage>
      | undefined;
    const server = useNodeServer(() =>
      http.createServer((request, response) => {
        serverRequest = universalRequestFromNodeRequest(
          request,
          response,
          undefined,
          undefined,
        );
        response.on("error", fail);
        serverNodeResponse = response;
        void readAllBytes(
          serverRequest.body as AsyncIterable<Uint8Array>,
          Number.MAX_SAFE_INTEGER,
        ).then(() => {
          response.writeHead(200);
          response.flushHeaders();
        });
      }),
    );
    it("signal should not be aborted on start", async () => {
      await new Promise<void>((resolve) => {
        const request = http.request(server.getUrl(), {
          method: "POST",
          // close TCP connection after we're done so that the server shuts down cleanly
          agent: new http.Agent({ keepAlive: false }),
        });
        request.on("error", fail);
        request.flushHeaders();
        request.end();
        request.on("response", (response) => {
          expect(serverRequest).toBeDefined();
          expect(serverRequest?.signal.aborted).toBeFalse();
          serverNodeResponse?.end();
          void readAllBytes(response, Number.MAX_SAFE_INTEGER).then(() =>
            resolve(),
          );
        });
      });
    });
  });
});
