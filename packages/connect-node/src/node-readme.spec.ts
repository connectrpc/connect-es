// Copyright 2021-2026 The Connect Authors
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

import { describe, it } from "node:test";
import * as assert from "node:assert";
import * as http2 from "node:http2";
import { createClient } from "@connectrpc/connect";
import type { ConnectRouter } from "@connectrpc/connect";
import { connectNodeAdapter } from "./connect-node-adapter.js";
import { createGrpcTransport } from "./grpc-transport.js";
import { createGrpcWebTransport } from "./grpc-web-transport.js";
import { createConnectTransport } from "./connect-transport.js";
import { ElizaService } from "./testdata/gen/connectrpc/eliza/v1/eliza_pb.js";

describe("node readme", () => {
  it("createConnectTransport()", async () => {
    // A transport for clients using the Connect protocol with Node.js `http` module
    const transport = createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
      httpVersion: "1.1",
    });
    const client = createClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    assert.notStrictEqual(sentence, undefined);
  });

  it("createGrpcTransport()", async () => {
    // A transport for clients using the gRPC protocol with Node.js `http2` module
    const transport = createGrpcTransport({
      baseUrl: "https://demo.connectrpc.com",
    });
    const client = createClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    assert.notStrictEqual(sentence, undefined);
  });

  it("createGrpcWebTransport()", async () => {
    // A transport for clients using the gRPC-Web protocol with Node.js `http` module
    const transport = createGrpcWebTransport({
      baseUrl: "https://demo.connectrpc.com",
      httpVersion: "1.1",
    });
    const client = createClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    assert.notStrictEqual(sentence, undefined);
  });

  it("connectNodeAdapter()", async () => {
    let port = -1;

    function routes(router: ConnectRouter) {
      router.rpc(ElizaService.method.say, async (req) => ({
        sentence: `you said: ${req.sentence}`,
      }));
    }

    const sessions = new Set<http2.ServerHttp2Session>();

    function startServer() {
      return new Promise<http2.Http2Server>((resolve) => {
        const server = http2
          .createServer(connectNodeAdapter({ routes }))
          .listen(0, () => {
            const a = server.address();
            if (a !== null && typeof a !== "string") {
              port = a.port;
            }
            resolve(server);
          });
        server.on("session", (session) => {
          sessions.add(session);
          session.on("close", () => sessions.delete(session));
        });
      });
    }

    async function runClient() {
      const transport = createGrpcTransport({
        baseUrl: `http://localhost:${port}`,
      });

      const client = createClient(ElizaService, transport);
      const { sentence } = await client.say({ sentence: "I feel happy." });
      // console.log(sentence); // you said: I feel happy.
      assert.strictEqual(sentence, "you said: I feel happy.");
    }

    const server = await startServer();
    await runClient();
    for (const session of sessions) {
      session.close();
    }
    server.close();
  });
});
