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

import * as http from "http";
import { Message, MethodKind, proto3 } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import type { ConnectRouter } from "@connectrpc/connect";
import { expressConnectMiddleware } from "@connectrpc/connect-express";
import { createGrpcWebTransport } from "@connectrpc/connect-node";
import { importExpress } from "./helpers/import-express.js";

describe("express readme", function () {
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
    },
  } as const;

  it("should work", async function () {
    let port = -1;

    function routes(router: ConnectRouter) {
      // eslint-disable-next-line @typescript-eslint/require-await
      router.rpc(ElizaService, ElizaService.methods.say, async (req) => ({
        sentence: `you said: ${req.sentence}`,
      }));
    }

    async function startServer() {
      const express = await importExpress();
      return await new Promise<http.Server>((resolve) => {
        const app = express();
        app.use(expressConnectMiddleware({ routes }));
        const server = http.createServer(app).listen(0, () => {
          const a = server.address();
          if (a !== null && typeof a !== "string") {
            port = a.port;
          }
          resolve(server);
        });
      });
    }

    async function runClient() {
      const transport = createGrpcWebTransport({
        baseUrl: `http://localhost:${port}`,
        httpVersion: "1.1",
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
});
