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

import { useNodeServer } from "./use-node-server-helper.spec.js";
import * as http2 from "http2";
import * as http from "http";
import { universalRequestFromNodeRequest } from "./node-universal-handler.js";
import { ConnectError, connectErrorFromReason } from "@bufbuild/connect";
import { readAllBytes } from "@bufbuild/connect/protocol";

// Polyfill the Headers API for Node versions < 18
import "./node-headers-polyfill.js";

describe("universalRequestFromNodeRequest()", function () {
  describe("with HTTP/2 stream closed with an RST code", function () {
    let universalRequestSignal: AbortSignal | undefined;
    const server = useNodeServer(() => {
      universalRequestSignal = undefined;
      return http2.createServer(function (request) {
        universalRequestSignal = universalRequestFromNodeRequest(
          request,
          undefined
        ).signal;
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
            {}
          );
          setTimeout(() => {
            stream.on("error", () => {
              // Closing with _some_ codes raises an ERR_HTTP2_STREAM_ERROR
              // error here.
            });
            stream.close(rstCode, () => {
              // We are seeing a race condition in Node v16.20.0, where closing
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
    it("should abort request signal with ConnectError and Code.Canceled for NO_ERROR", async function () {
      await request(http2.constants.NGHTTP2_NO_ERROR);
      expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
      expect(universalRequestSignal?.aborted).toBeTrue();
      expect(universalRequestSignal?.reason).toBeInstanceOf(Error);
      if (universalRequestSignal?.reason instanceof Error) {
        expect(universalRequestSignal.reason.name).toBe("AbortError");
        expect(universalRequestSignal.reason.message).toBe(
          "This operation was aborted"
        );
      }
    });
    it("should abort request signal with ConnectError and Code.Canceled for CANCEL", async function () {
      await request(http2.constants.NGHTTP2_CANCEL);
      expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
      expect(universalRequestSignal?.aborted).toBeTrue();
      expect(universalRequestSignal?.reason).toBeInstanceOf(ConnectError);
      const ce = connectErrorFromReason(universalRequestSignal?.reason);
      expect(ce.message).toBe(
        "[canceled] http/2 stream closed with RST code CANCEL (0x8)"
      );
    });
    it("should abort request signal with ConnectError and Code.ResourceExhausted for ENHANCE_YOUR_CALM", async function () {
      await request(http2.constants.NGHTTP2_ENHANCE_YOUR_CALM);
      expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
      expect(universalRequestSignal?.aborted).toBeTrue();
      expect(universalRequestSignal?.reason).toBeInstanceOf(ConnectError);
      const ce = connectErrorFromReason(universalRequestSignal?.reason);
      expect(ce.message).toBe(
        "[resource_exhausted] http/2 stream closed with RST code ENHANCE_YOUR_CALM (0xb)"
      );
    });
    it("should abort request signal with ConnectError and Code.Internal for FRAME_SIZE_ERROR", async function () {
      await request(http2.constants.NGHTTP2_FRAME_SIZE_ERROR);
      expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
      expect(universalRequestSignal?.aborted).toBeTrue();
      expect(universalRequestSignal?.reason).toBeInstanceOf(ConnectError);
      const ce = connectErrorFromReason(universalRequestSignal?.reason);
      expect(ce.message).toBe(
        "[internal] http/2 stream closed with RST code FRAME_SIZE_ERROR (0x6)"
      );
    });333
  });
  describe("with HTTP/1.1 ECONNRESET", function () {
    let serverAbortReason: undefined | unknown;
    const server = useNodeServer(() =>
      http.createServer(
        {
          connectionsCheckingInterval: 1,
        },
        function (request) {
          console.log('with HTTP/1.1 ECONNRESET server handler')
          request.on("close", () => console.log('with HTTP/1.1 ECONNRESET got event CLOSE'))
          request.on("error", (e) => console.log('with HTTP/1.1 ECONNRESET got event ERROR', e))
          request.on("abort", () => console.log('with HTTP/1.1 ECONNRESET got event ABORT'))
          const uReq = universalRequestFromNodeRequest(request, undefined);
          uReq.signal.addEventListener("abort", () => {
            serverAbortReason = uReq.signal.reason;
          });
          console.log('with HTTP/1.1 ECONNRESET server handler done')
        }
      )
    );
    it("should abort request signal with ConnectError and Code.Aborted", async function () {
      await new Promise<void>((resolve) => {
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
      while (serverAbortReason === undefined) {
        await new Promise((r) => setTimeout(r, 1));
      }
      expect(serverAbortReason).toBeInstanceOf(Error);
      if (serverAbortReason instanceof Error) {
        expect(serverAbortReason).toBeInstanceOf(ConnectError);
        const ce = connectErrorFromReason(serverAbortReason);
        expect(ce.message).toBe("[aborted] aborted");
      }
    });
  });
  describe("with HTTP/1.1 request finishing without error", function () {
    let universalRequestSignal: AbortSignal | undefined;
    const server = useNodeServer(() =>
      http.createServer(
        {
          connectionsCheckingInterval: 1,
        },
        function (request, response) {
          console.log('with HTTP/1.1 request finishing server handler')
          request.on("close", () => console.log('with HTTP/1.1 request finishing got event CLOSE'))
          request.on("error", (e) => console.log('with HTTP/1.1 request finishing got event ERROR', e))
          request.on("abort", () => console.log('with HTTP/1.1 request finishing got event ABORT'))
          response.on("close", () => console.log('with HTTP/1.1 request finishing got RESP event CLOSE'))
          const uReq = universalRequestFromNodeRequest(request, undefined);
          universalRequestSignal = uReq.signal;
          response.writeHead(200);
          response.end();
          console.log('with HTTP/1.1 request finishing server handler done')
        }
      )
    );
    it("should abort request signal with AbortError", async function () {
      console.log('with HTTP/1.1 request finishing client starting request')
      await new Promise<void>((resolve) => {
        const request = http.request(server.getUrl(), {
          method: "POST",
          // close TCP connection after we're done so that the server shuts down cleanly
          agent: new http.Agent({ keepAlive: false }),
        });
        request.flushHeaders();
        request.end();
        request.on("response", (response) => {
          void readAllBytes(response, Number.MAX_SAFE_INTEGER).then(() =>
            resolve()
          );
        });
      });
      console.log('with HTTP/1.1 request finishing client request done')
      expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
      expect(universalRequestSignal?.aborted).toBeTrue();
      expect(universalRequestSignal?.reason).toBeInstanceOf(Error);
      if (universalRequestSignal?.reason instanceof Error) {
        expect(universalRequestSignal.reason.name).toBe("AbortError");
        expect(universalRequestSignal.reason.message).toBe(
          "This operation was aborted"
        );
      }
    });
  });
});
