// Copyright 2021-2024 The Connect Authors
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
import { Message, MethodKind, proto3 } from "@bufbuild/protobuf";
import type { PartialMessage } from "@bufbuild/protobuf";
import {
  createContextKey,
  createContextValues,
  createPromiseClient,
  createRouterTransport,
} from "@connectrpc/connect";
import type { ConnectRouter } from "@connectrpc/connect";
import { createWritableIterable } from "@connectrpc/connect/protocol";
import { connectNodeAdapter } from "./connect-node-adapter.js";
import { createGrpcTransport } from "./grpc-transport.js";
import { createGrpcWebTransport } from "./grpc-web-transport.js";
import { createConnectTransport } from "./connect-transport.js";

/* eslint-disable @typescript-eslint/require-await */

describe("node readme", function () {
  interface SayR extends Message<SayR> {
    sentence: string;
  }
  const SayR = proto3.makeMessageType<SayR>("connectrpc.eliza.v1.SayRequest", [
    { no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  interface IntroduceRequest extends Message<IntroduceRequest> {
    name: string;
  }
  const IntroduceRequest = proto3.makeMessageType<IntroduceRequest>(
    "connectrpc.eliza.v1.IntroduceRequest",
    [{ no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ }],
  );

  interface ConverseRequest extends Message<ConverseRequest> {
    sentence: string;
  }

  const ConverseRequest = proto3.makeMessageType<ConverseRequest>(
    "connectrpc.eliza.v1.ConverseRequest",
    [{ no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ }],
  );

  interface ConverseResponse extends Message<ConverseResponse> {
    sentence: string;
  }

  const ConverseResponse = proto3.makeMessageType<ConverseResponse>(
    "connectrpc.eliza.v1.ConverseResponse",
    [{ no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ }],
  );

  const ElizaService = {
    typeName: "connectrpc.eliza.v1.ElizaService",
    methods: {
      say: {
        name: "Say",
        I: SayR,
        O: SayR,
        kind: MethodKind.Unary,
      },
      introduce: {
        name: "Introduce",
        I: IntroduceRequest,
        O: SayR,
        kind: MethodKind.ServerStreaming,
      },
      converse: {
        name: "Converse",
        I: ConverseRequest,
        O: ConverseResponse,
        kind: MethodKind.BiDiStreaming,
      },
    },
  } as const;

  const optionsHttp2 = {
    baseUrl: "https://demo.connectrpc.com",
    httpVersion: "2" as const,
  };
  const optionsHttp1 = {
    baseUrl: "https://demo.connectrpc.com",
    httpVersion: "1.1" as const,
  };

  it("createConnectTransport()", async function () {
    // A transport for clients using the gRPC protocol with Node.js `http` module
    const transport = createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
      httpVersion: "1.1",
    });
    const client = createPromiseClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    expect(sentence).toBeDefined();
  });

  it("createGrpcTransport()", async function () {
    // A transport for clients using the gRPC protocol with Node.js `http2` module
    const transport = createGrpcTransport(optionsHttp2);
    const client = createPromiseClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    expect(sentence).toBeDefined();
  });

  it("createGrpcWebTransport()", async function () {
    // A transport for clients using the gRPC-web protocol with Node.js `http` module
    const transport = createGrpcWebTransport(optionsHttp1);
    const client = createPromiseClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    expect(sentence).toBeDefined();
  });

  it("createRouterTransport()", async function () {
    // A transport for clients using the in-memory createRouterTransport
    const transport = createRouterTransport(
      ({ service }) => {
        service(ElizaService, {
          say: async () => ({
            sentence: "server response",
          }),
        });
      },
      {
        transport: optionsHttp1,
      },
    );
    const client = createPromiseClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "I feel happy." });
    expect(sentence).toBeDefined();
  });

  it("should work as well", async function () {
    let port = -1;

    function routes(router: ConnectRouter) {
      router.rpc(ElizaService, ElizaService.methods.say, async (req) => ({
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
        httpVersion: "2",
      });
      const client = createPromiseClient(ElizaService, transport);
      const res = await client.say({ sentence: "I feel happy." });
      // console.log(res.sentence) // you said: I feel happy.
      expect(res.sentence).toBe("you said: I feel happy.");
    }

    const server = await startServer();
    await runClient();
    server.close();
  });

  it("using context value", async function () {
    let port = -1;

    const kUser = createContextKey<string | undefined>(undefined);
    function routes(router: ConnectRouter) {
      router.rpc(
        ElizaService,
        ElizaService.methods.say,
        async (req, { values }) => ({
          sentence: `Hey ${values.get(kUser)}! You said: ${req.sentence}`,
        }),
      );
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
        httpVersion: "2",
      });
      const client = createPromiseClient(ElizaService, transport);
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

  it("using writable iterable", async function () {
    let port = -1;

    function routes(router: ConnectRouter) {
      router.rpc(
        ElizaService,
        ElizaService.methods.converse,
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
        httpVersion: "2",
      });
      const client = createPromiseClient(ElizaService, transport);
      const req = createWritableIterable<PartialMessage<ConverseRequest>>();
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
