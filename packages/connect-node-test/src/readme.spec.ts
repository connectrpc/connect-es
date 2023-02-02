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

import { Message, MethodKind, proto3 } from "@bufbuild/protobuf";
import * as http2 from "http2";
import {
  createGrpcTransport,
  createHandler,
  createPromiseClient,
  mergeHandlers,
} from "@bufbuild/connect-node";

/* eslint-disable @typescript-eslint/require-await */

describe("readme", function () {
  interface SayR extends Message<SayR> {
    sentence: string;
  }
  const SayR = proto3.makeMessageType<SayR>(
    "buf.connect.demo.eliza.v1.SayRequest",
    [{ no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ }]
  );

  interface IntroduceRequest extends Message<IntroduceRequest> {
    name: string;
  }
  const IntroduceRequest = proto3.makeMessageType<IntroduceRequest>(
    "buf.connect.demo.eliza.v1.IntroduceRequest",
    [{ no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ }]
  );

  const ElizaService = {
    typeName: "buf.connect.demo.eliza.v1.ElizaService",
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

  it("should work as well", async function () {
    let port = -1;

    function startServer() {
      return new Promise<http2.Http2Server>((resolve) => {
        // A Node.js request listener that implements rpc Say(SayRequest) returns (SayResponse)
        const handleSay = createHandler(
          ElizaService,
          ElizaService.methods.say,
          async (req) => {
            return {
              sentence: `you said: ${req.sentence}`,
            };
          }
        );

        const server = http2
          .createServer(mergeHandlers([handleSay]))
          .listen(0, () => {
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
});
