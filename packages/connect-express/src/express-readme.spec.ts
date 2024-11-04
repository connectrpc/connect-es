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

import * as http from "http";
import { createClient } from "@connectrpc/connect";
import type { ConnectRouter } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-node";
import express from "express";
import { expressConnectMiddleware } from "./express-connect-middleware.js";
import { ElizaService } from "./testdata/gen/connectrpc/eliza/v1/eliza_pb.js";

describe("express readme", function () {
  it("should work", async function () {
    let port = -1;

    function routes(router: ConnectRouter) {
      // eslint-disable-next-line @typescript-eslint/require-await
      router.rpc(ElizaService.method.say, async (req) => ({
        sentence: `you said: ${req.sentence}`,
      }));
    }

    async function startServer() {
      return await new Promise<http.Server>((resolve) => {
        const app = express();
        app.use(expressConnectMiddleware({ routes }));
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- typing issue in express
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
      const client = createClient(ElizaService, transport);
      const res = await client.say({ sentence: "I feel happy." });
      // console.log(res.sentence) // you said: I feel happy.
      expect(res.sentence).toBe("you said: I feel happy.");
    }

    const server = await startServer();
    await runClient();
    server.close();
  });
});
