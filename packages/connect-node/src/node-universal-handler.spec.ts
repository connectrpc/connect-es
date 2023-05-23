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
import { ConnectError } from "@bufbuild/connect";
import { readAllBytes } from "@bufbuild/connect/protocol";

// Polyfill the Headers API for Node versions < 18
import "./node-headers-polyfill.js";

// a tribute to the CI celestial beings.  increment once for good luck.
const entropyCounter = 3;
/* eslint-disable no-console */
console.log({ entropyCounter });

const logEvents = (
  request: http.IncomingMessage | http.ClientRequest,
  message: string,
  skip?: boolean
) => {
  console.log(`[HEY!] start: ${message}`);
  console.log("Node version: " + process.versions.node);

  if (skip === false || skip === undefined) {
    request.on("close", () => console.log(`[EVENT(close)]: ${message}`));
    request.on("data", (chunk) =>
      console.log(`[EVENT(data)]: ${message}`, chunk)
    );
    request.on("end", () => console.log(`[EVENT(end)]: ${message}`));
    request.on("error", (err) =>
      console.log(`[EVENT(error)]: ${message}`, err)
    );
    request.on("pause", () => console.log(`[EVENT(pause)]: ${message}`));
    request.on("readable", () => console.log(`[EVENT(readable)]: ${message}`));
    request.on("resume", () => console.log(`[EVENT(resume)]: ${message}`));

    if (request instanceof http.ClientRequest) {
      request.on("abort", () => console.log(`[EVENT(abort)]: ${message}`));
      request.on("connect", (response, socket, head) =>
        console.log(`[EVENT(connect)]: ${message}`)
      );
      request.on("continue", () =>
        console.log(`[EVENT(continue)]: ${message}`)
      );
      request.on("drain", () => console.log(`[EVENT(drain)]: ${message}`));
      request.on("finish", () => console.log(`[EVENT(finish)]: ${message}`));
      request.on("information", (info) =>
        console.log(`[EVENT(information)]: ${message}`)
      );
      request.on("pipe", (src) => console.log(`[EVENT(pipe)]: ${message}`));
      request.on("response", (response) =>
        console.log(`[EVENT(response)]: ${message}`, {
          statusCode: response.statusCode,
          destroyed: response.destroyed,
          closed: response.closed,
          complete: response.complete,
          errored: response.errored,
          statusMessage: response.statusMessage,
          method: response.method,
          readable: response.readable,
        })
      );
      request.on("socket", (socket) =>
        console.log(`[EVENT(socket)]: ${message}`)
      );
      request.on("timeout", () => console.log(`[EVENT(timeout)]: ${message}`));
      request.on("unpipe", (src) => console.log(`[EVENT(unpipe)]: ${message}`));
      request.on("upgrade", (response, socket, head) =>
        console.log(`[EVENT(upgrade)]: ${message}`)
      );
    }
  }

  return () => console.log(`[HEY!] done: ${message}`);
};

describe("universalRequestFromNodeRequest()", function () {
  // xdescribe("with HTTP/2 stream closed with an RST code", function () {
  //   let universalRequestSignal: AbortSignal | undefined;
  //   const server = useNodeServer(() => {
  //     universalRequestSignal = undefined;
  //     return http2.createServer(function (request) {
  //       universalRequestSignal = universalRequestFromNodeRequest(
  //         request,
  //         undefined
  //       ).signal;
  //     });
  //   });
  //   async function request(rstCode: number) {
  //     await new Promise<void>((resolve) => {
  //       http2.connect(server.getUrl(), (session: http2.ClientHttp2Session) => {
  //         const stream = session.request(
  //           {
  //             ":method": "POST",
  //             ":path": "/",
  //           },
  //           {}
  //         );
  //         setTimeout(() => {
  //           stream.on("error", () => {
  //             // Closing with _some_ codes raises an ERR_HTTP2_STREAM_ERROR
  //             // error here.
  //           });
  //           stream.close(rstCode, () => {
  //             // We are seeing a race condition in Node v16.20.0, where closing
  //             // the session right after closing a stream with an RST code
  //             // _sometimes_ sends an INTERNAL_ERROR code.
  //             // Simply delaying the session close until the next tick like
  //             // we do here seems to work around the issue.
  //             setTimeout(() => session.close(resolve), 0);
  //           });
  //         }, 0);
  //       });
  //     });
  //   }
  //   it("should abort request signal with ConnectError and Code.Canceled for NO_ERROR", async function () {
  //     await request(http2.constants.NGHTTP2_NO_ERROR);
  //     expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
  //     expect(universalRequestSignal?.aborted).toBeTrue();
  //     expect(universalRequestSignal?.reason).toBeInstanceOf(Error);
  //     if (universalRequestSignal?.reason instanceof Error) {
  //       expect(universalRequestSignal.reason.name).toBe("AbortError");
  //       expect(universalRequestSignal.reason.message).toBe(
  //         "This operation was aborted"
  //       );
  //     }
  //   });
  //   it("should abort request signal with ConnectError and Code.Canceled for CANCEL", async function () {
  //     await request(http2.constants.NGHTTP2_CANCEL);
  //     expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
  //     expect(universalRequestSignal?.aborted).toBeTrue();
  //     expect(universalRequestSignal?.reason).toBeInstanceOf(ConnectError);
  //     const ce = connectErrorFromReason(universalRequestSignal?.reason);
  //     expect(ce.message).toBe(
  //       "[canceled] http/2 stream closed with RST code CANCEL (0x8)"
  //     );
  //   });
  //   it("should abort request signal with ConnectError and Code.ResourceExhausted for ENHANCE_YOUR_CALM", async function () {
  //     await request(http2.constants.NGHTTP2_ENHANCE_YOUR_CALM);
  //     expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
  //     expect(universalRequestSignal?.aborted).toBeTrue();
  //     expect(universalRequestSignal?.reason).toBeInstanceOf(ConnectError);
  //     const ce = connectErrorFromReason(universalRequestSignal?.reason);
  //     expect(ce.message).toBe(
  //       "[resource_exhausted] http/2 stream closed with RST code ENHANCE_YOUR_CALM (0xb)"
  //     );
  //   });
  //   it("should abort request signal with ConnectError and Code.Internal for FRAME_SIZE_ERROR", async function () {
  //     await request(http2.constants.NGHTTP2_FRAME_SIZE_ERROR);
  //     expect(universalRequestSignal).toBeInstanceOf(AbortSignal);
  //     expect(universalRequestSignal?.aborted).toBeTrue();
  //     expect(universalRequestSignal?.reason).toBeInstanceOf(ConnectError);
  //     const ce = connectErrorFromReason(universalRequestSignal?.reason);
  //     expect(ce.message).toBe(
  //       "[internal] http/2 stream closed with RST code FRAME_SIZE_ERROR (0x6)"
  //     );
  //   });
  // });

  describe("with HTTP/1.1 ECONNRESET", function () {
    let serverAbortReason: undefined | unknown;
    const server = useNodeServer(() => {
      const s = http.createServer(
        {
          connectionsCheckingInterval: 1,
        },
        function (request) {
          const done = logEvents(request, "HTTP/1.1 ECONNRESET", true);
          const uReq = universalRequestFromNodeRequest(request, undefined);
          uReq.signal.addEventListener("abort", () => {
            serverAbortReason = uReq.signal.reason;
          });
          done();
        }
      );
      s.requestTimeout = 0;
      s.headersTimeout = 0;
      return s;
    });

    // this one is the stinker
    it("should abort request signal with ConnectError and Code.Aborted", async function () {
      await new Promise<void>((resolve) => {
        const request = http.request(server.getUrl(), {
          method: "POST",
        });
        const done = logEvents(
          request,
          "should abort request signal with ConnectError and Code.Aborted",
          true
        );
        request.on("error", () => {
          // we need this event lister so that Node.js does not raise the error
          // we trigger by calling destroy()
        });
        request.flushHeaders();
        setTimeout(() => {
          request.destroy();
          done();
          resolve();
        }, 20);
      });
      while (serverAbortReason === undefined) {
        await new Promise((r) => setTimeout(r, 1));
      }
      expect(serverAbortReason).toBeInstanceOf(Error);
      if (serverAbortReason instanceof Error) {
        expect(serverAbortReason).toBeInstanceOf(ConnectError);
        const ce = ConnectError.from(serverAbortReason);
        expect(ce.message).toBe("[aborted] aborted");
      }
    });
  });

  describe("with HTTP/1.1 request finishing without error", function () {
    let universalRequestSignal: AbortSignal | undefined;
    const server = useNodeServer(() => {
      console.log("inside: creating server");
      return http.createServer(
        {
          connectionsCheckingInterval: 1,
        },
        function (request, response) {
          const done = logEvents(
            request,
            "HTTP/1.1 request finishing server handler"
          );
          const uReq = universalRequestFromNodeRequest(request, undefined);
          universalRequestSignal = uReq.signal;
          response.writeHead(200);
          response.end();
          done();
        }
      );
    }, true);

    // this one too
    it("should abort request signal with AbortError", async function () {
      await new Promise<void>((resolve) => {
        const request = http.request(server.getUrl(), {
          method: "POST",
          // close TCP connection after we're done so that the server shuts down cleanly
          agent: new http.Agent({ keepAlive: false }),
        });
        const done = logEvents(
          request,
          "with HTTP/1.1 request finishing client starting request"
        );
        request.flushHeaders();
        request.end();
        request.on("response", (response) => {
          void readAllBytes(response, Number.MAX_SAFE_INTEGER).then(() => {
            done();
            resolve();
          });
        });
      });
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
