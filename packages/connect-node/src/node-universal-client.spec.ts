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
import type * as net from "net";
import { createAsyncIterable } from "@bufbuild/connect/protocol";
import { createNodeHttpClient } from "./node-universal-client.js";
import { encodeEnvelope } from "@bufbuild/connect/protocol";

describe("Node.js http2 API", function () {
  it("should see reset codes from the client side on the server", async function () {
    const server = await startServer();
    await h2RequestWithReset(server.baseUrl, http2.constants.NGHTTP2_CANCEL);
    const { rstCode } = await server.stop();
    expect(rstCode).toBe(http2.constants.NGHTTP2_CANCEL);
  });

  /**
   * Issues an H2 request, and immediately resets with the given code.
   */
  async function h2RequestWithReset(baseUrl: string, rstCode: number) {
    return new Promise<void>((resolve) => {
      http2.connect(baseUrl, (session: http2.ClientHttp2Session) => {
        const stream = session.request(
          {
            ":method": "POST",
            ":path": "/",
          },
          {}
        );
        setTimeout(() => {
          stream.close(rstCode, () => {
            session.close();
            setTimeout(() => resolve(), 0);
          });
        }, 0);
      });
    });
  }
});

describe("universal node http2 client", function () {
  describe("with a signal that is already aborted", function () {
    it("should raise error with code canceled", async function () {
      const signal = AbortSignal.abort();
      const client = createNodeHttpClient({
        httpVersion: "2",
        baseUrl: "http://example.com",
        keepSessionAlive: false,
      });
      try {
        await client({
          url: "http://example.com",
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
          signal,
        });
        fail("expected error");
      } catch (e) {
        expect((e as Error).message).toBe(
          "[canceled] operation was aborted via signal"
        );
      }
    });
  });
  describe("with a signal aborting mid request", function () {
    it("should send RST_STREAM with code CANCEL", async function () {
      const server = await startServer();

      // set up a client that aborts while still streaming the request body
      const ac = new AbortController();
      const client = createNodeHttpClient({
        httpVersion: "2",
        baseUrl: server.baseUrl,
        keepSessionAlive: false,
      });
      async function* body() {
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        ac.abort();
        yield encodeEnvelope(0, new Uint8Array(0));
      }
      try {
        await client({
          url: server.baseUrl,
          method: "POST",
          header: new Headers(),
          body: body(),
          signal: ac.signal,
        });
        fail("expected error");
      } catch (e) {
        expect((e as Error).message).toBe(
          "[canceled] operation was aborted via signal"
        );
      }

      const { rstCode } = await server.stop();
      expect(rstCode).toBe(http2.constants.NGHTTP2_CANCEL);
    });
  });
});

/**
 * Start an H2 server that expects all requests to be closed right away.
 * When stopped, waits for all connections to close, then returns the last
 * received reset code.
 */
async function startServer(): Promise<{
  baseUrl: string;
  stop(): Promise<{ rstCode: number }>;
}> {
  const s = http2.createServer({});
  let rstCode = -1;
  s.on("stream", (stream) => {
    stream.on("close", () => {
      rstCode = stream.rstCode;
    });
  });
  await new Promise<http2.Http2Server>((resolve) => {
    s.listen(0, () => resolve(s));
  });
  return {
    baseUrl: `http://localhost:${(s.address() as net.AddressInfo).port}`,
    async stop() {
      for (;;) {
        const count = await new Promise<number>((resolve, reject) => {
          s.getConnections((err, count) => {
            if (err) {
              return reject(err);
            }
            return resolve(count);
          });
        });
        if (count === 0) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      s.close();
      return Promise.resolve({
        rstCode,
      });
    },
  };
}
