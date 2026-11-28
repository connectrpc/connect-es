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
import { createClient } from "@connectrpc/connect";
import { ConformanceService } from "@connectrpc/connect-conformance";
import { createGrpcWebTransport } from "./grpc-web-transport.js";

describe("gRPC-web transport", () => {
  it("should provide trailers of a trailers-only server-streaming response", async () => {
    const transport = createGrpcWebTransport({
      baseUrl: "https://example.com",
      fetch: () =>
        Promise.resolve(
          new Response(new Uint8Array(), {
            headers: {
              "Content-Type": "application/grpc-web+proto",
              "Grpc-Status": "0",
              "X-Custom": "foo",
            },
          }),
        ),
    });
    const client = createClient(ConformanceService, transport);
    let trailer: Headers | undefined;
    for await (const _ of client.serverStream(
      {},
      {
        onTrailer: (t) => {
          trailer = t;
        },
      },
    )) {
      assert.fail("expected no response messages");
    }
    assert.strictEqual(trailer?.get("grpc-status"), "0");
    assert.strictEqual(trailer?.get("x-custom"), "foo");
    assert.strictEqual(trailer?.has("content-type"), false);
  });
});
