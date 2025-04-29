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

import * as http2 from "node:http2";
import {
  createContextKey,
  createContextValues,
  createClient,
} from "@connectrpc/connect";
import type { ConnectRouter } from "@connectrpc/connect";
import { createWritableIterable } from "@connectrpc/connect/protocol";
import { connectNodeAdapter } from "./connect-node-adapter.js";
import { createGrpcTransport } from "./grpc-transport.js";
import { createGrpcWebTransport } from "./grpc-web-transport.js";
import { createConnectTransport } from "./connect-transport.js";
import { ElizaService } from "./testdata/gen/connectrpc/eliza/v1/eliza_pb.js";
import type {
  ConverseRequest,
  ConverseRequestSchema,
} from "./testdata/gen/connectrpc/eliza/v1/eliza_pb.js";
import type { MessageInitShape } from "@bufbuild/protobuf";
/* eslint-disable @typescript-eslint/require-await */

describe("node readme", () => {
  const optionsHttp2 = {
    baseUrl: "https://demo.connectrpc.com",
    httpVersion: "2" as const,
  };
  const optionsHttp1 = {
    baseUrl: "https://demo.connectrpc.com",
    httpVersion: "1.1" as const,
  };

  it("createConnectTransport()", async () => {
    // A transport for clients using the gRPC protocol with Node.js `http` module
    const transport = createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
      httpVersion: "1.1",
    });
    const client = createClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    expect(sentence).toBeDefined();
  });

  it("createGrpcTransport()", async () => {
    // A transport for clients using the gRPC protocol with Node.js `http2` module
    const transport = createGrpcTransport(optionsHttp2);
    const client = createClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    expect(sentence).toBeDefined();
  });

  it("createGrpcWebTransport()", async () => {
    // A transport for clients using the gRPC-web protocol with Node.js `http` module
    const transport = createGrpcWebTransport(optionsHttp1);
    const client = createClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    expect(sentence).toBeDefined();
  });

  it("should work as well", async () => {
    let port = -1;

    function routes(router: ConnectRouter) {
      router.rpc(ElizaService.method.say, async (req) => ({
        sentence: `you said: ${req.sentence}`,
      }));
    }

    function startServer() {
      return new Promise<http2.Http2Server>((resolve) => {
        const handler = connectNodeAdapter({ routes });
        const server = http2.createServer(handler).listen(0, () => {
          const a = server.address();
          if (a !== null && typeof a !== "string") {
            port = a.port;
          }
          resolve(server);
        });
      });
    }

    async function runClient() {
      const transport = createGrpcTransport({
        baseUrl: `http://localhost:${port}`,
      });
      const client = createClient(ElizaService, transport);
      const res = await client.say({ sentence: "I feel happy." });
      // console.log(res.sentence) // you said: I feel happy.
      expect(res.sentence).toBe("you said: I feel happy.");
    }

    const server = await startServer();
    await runClient();
    server.close();
  });

  it("using context value", async () => {
    let port = -1;

    const kUser = createContextKey<string | undefined>(undefined);
    function routes(router: ConnectRouter) {
      router.rpc(ElizaService.method.say, async (req, { values }) => ({
        sentence: `Hey ${values.get(kUser)}! You said: ${req.sentence}`,
      }));
    }

    function startServer() {
      return new Promise<http2.Http2Server>((resolve) => {
        const handler = connectNodeAdapter({
          routes,
          contextValues: (req) =>
            createContextValues().set(kUser, req.headers["x-user"]),
        });
        const server = http2.createServer(handler).listen(0, () => {
          const a = server.address();
          if (a !== null && typeof a !== "string") {
            port = a.port;
          }
          resolve(server);
        });
      });
    }

    async function runClient() {
      const transport = createGrpcTransport({
        baseUrl: `http://localhost:${port}`,
      });
      const client = createClient(ElizaService, transport);
      const res = await client.say(
        { sentence: "I feel happy." },
        { headers: { "x-user": "alice" } },
      );
      // console.log(res.sentence) // Hey alice! You said: I feel happy.
      expect(res.sentence).toBe("Hey alice! You said: I feel happy.");
    }

    const server = await startServer();
    await runClient();
    server.close();
  });

  it("using writable iterable", async () => {
    let port = -1;

    function routes(router: ConnectRouter) {
      router.rpc(
        ElizaService.method.converse,
        async function* (req: AsyncIterable<ConverseRequest>) {
          yield { sentence: "ping" };
          for await (const next of req) {
            expect(next.sentence).toBe("pong");
          }
        },
      );
    }

    function startServer() {
      return new Promise<http2.Http2Server>((resolve) => {
        const handler = connectNodeAdapter({ routes });
        const server = http2.createServer(handler).listen(0, () => {
          const a = server.address();
          if (a !== null && typeof a !== "string") {
            port = a.port;
          }
          resolve(server);
        });
      });
    }

    async function runClient() {
      const transport = createGrpcTransport({
        baseUrl: `http://localhost:${port}`,
      });
      const client = createClient(ElizaService, transport);
      const req =
        createWritableIterable<
          MessageInitShape<typeof ConverseRequestSchema>
        >();
      try {
        const res = client.converse(req);
        for await (const next of res) {
          expect(next.sentence).toBe("ping");
          await req.write({ sentence: "pong" });
          break;
        }
      } finally {
        req.close();
      }
    }

    const server = await startServer();
    await runClient();
    server.close();
  });
});
