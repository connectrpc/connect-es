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
import { setImmediate } from "node:timers/promises";
import { create } from "@bufbuild/protobuf";
import {
  BidiStreamRequestSchema,
  ConformanceService,
  ServerStreamRequestSchema,
  UnaryRequestSchema,
} from "@connectrpc/connect-conformance";
import { createAsyncIterable } from "@connectrpc/connect/protocol";
import { createConnectHybridTransport } from "./connect-hybrid-transport.js";

class FakeWebSocket extends EventTarget {
  static offeredProtocols: string[] | undefined;

  binaryType = "blob";

  constructor(_url: string, offeredProtocols: string[]) {
    super();
    FakeWebSocket.offeredProtocols = offeredProtocols;
  }

  close(): void {}
}

describe("createConnectHybridTransport()", () => {
  it("should run unary calls over HTTP and streaming calls over a WebSocket", async () => {
    const fetchedUrls: string[] = [];
    const controller = new AbortController();
    const transport = createConnectHybridTransport({
      baseUrl: "https://example.com",
      fetch: (input) => {
        fetchedUrls.push(String(input instanceof Request ? input.url : input));

        return Promise.resolve(
          new Response("{}", {
            headers: { "Content-Type": "application/json" },
          }),
        );
      },
      WebSocket: FakeWebSocket as unknown as typeof WebSocket,
    });
    await transport.unary(
      ConformanceService.method.unary,
      undefined,
      undefined,
      undefined,
      create(UnaryRequestSchema),
    );
    const stream = transport.stream(
      ConformanceService.method.bidiStream,
      controller.signal,
      undefined,
      undefined,
      createAsyncIterable([create(BidiStreamRequestSchema)]),
    );
    await setImmediate();
    controller.abort();

    await assert.rejects(stream);
    assert.deepStrictEqual(fetchedUrls, [
      "https://example.com/connectrpc.conformance.v1.ConformanceService/Unary",
    ]);
    assert.deepStrictEqual(FakeWebSocket.offeredProtocols, [
      "connectrpc.1+json",
    ]);
  });

  it("should run streaming calls over HTTP without a WebSocket implementation", async (t) => {
    const original = globalThis.WebSocket;
    t.after(() => {
      globalThis.WebSocket = original;
    });
    Object.assign(globalThis, { WebSocket: undefined });
    const fetchedUrls: string[] = [];
    const transport = createConnectHybridTransport({
      baseUrl: "https://example.com",
      fetch: (input) => {
        fetchedUrls.push(String(input instanceof Request ? input.url : input));

        return Promise.reject(new Error("failed"));
      },
    });

    await assert.rejects(
      transport.stream(
        ConformanceService.method.serverStream,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([create(ServerStreamRequestSchema)]),
      ),
    );
    assert.deepStrictEqual(fetchedUrls, [
      "https://example.com/connectrpc.conformance.v1.ConformanceService/ServerStream",
    ]);
  });
});
