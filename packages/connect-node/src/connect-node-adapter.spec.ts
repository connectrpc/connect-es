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
import {
  createClient,
  createContextKey,
  createContextValues,
} from "@connectrpc/connect";
import type { ConnectRouter, Transport } from "@connectrpc/connect";
import { createTransport as createGrpcTransport } from "@connectrpc/connect/protocol-grpc";
import { connectNodeAdapter } from "./connect-node-adapter.js";
import { validateNodeTransportOptions } from "./node-transport-options.js";
import { useNodeServer } from "./use-node-server-helper.spec.js";
import { ElizaService } from "./testdata/gen/connectrpc/eliza/v1/eliza_pb.js";

describe("connectNodeAdapter()", () => {
  const kUser = createContextKey<string | undefined>(undefined);

  function routes(router: ConnectRouter) {
    router.rpc(ElizaService.method.say, async (req, { values }) => ({
      sentence: `Hey ${values.get(kUser)}! You said: ${req.sentence}`,
    }));
  }

  const server = useNodeServer(() =>
    http2.createServer(
      connectNodeAdapter({
        routes,
        contextValues: (req) =>
          createContextValues().set(kUser, req.headers["x-user"]),
      }),
    ),
  );

  function createTransport(): Transport {
    return createGrpcTransport({
      ...validateNodeTransportOptions({
        httpVersion: "2",
        baseUrl: server.getUrl(),
      }),
      baseUrl: server.getUrl(),
      httpClient: server.getClient(),
    });
  }

  it("should pass context values to the handler", async () => {
    const client = createClient(ElizaService, createTransport());
    const { sentence } = await client.say(
      { sentence: "I feel happy." },
      { headers: { "x-user": "alice" } },
    );
    assert.strictEqual(sentence, "Hey alice! You said: I feel happy.");
  });
});
