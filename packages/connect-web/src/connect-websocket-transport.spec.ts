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
import type { TestContext } from "node:test";
import * as assert from "node:assert";
import { Code, ConnectError } from "@connectrpc/connect";
import { ConformanceService } from "@connectrpc/connect-conformance";
import { createConnectWebSocketTransport } from "./connect-websocket-transport.js";

function installFakeWebSocket(t: TestContext, messages: string[] = []) {
  class FakeWebSocket extends EventTarget {
    binaryType = "blob";
    readonly protocol: string;

    constructor(_url: string, protocols: string[]) {
      super();
      this.protocol = protocols[0];
      queueMicrotask(() => {
        this.dispatchEvent(new Event("open"));
        for (const data of messages) {
          this.dispatchEvent(new MessageEvent("message", { data }));
        }
      });
    }

    send(_data: string | Uint8Array): void {}

    close(_code?: number, _reason?: string): void {}
  }

  const mocks = {
    WebSocket: t.mock.fn(FakeWebSocket),
    send: t.mock.method(FakeWebSocket.prototype, "send"),
    close: t.mock.method(FakeWebSocket.prototype, "close"),
  };
  t.mock.property(
    globalThis,
    "WebSocket",
    mocks.WebSocket as unknown as typeof WebSocket,
  );

  return mocks;
}

describe("createConnectWebSocketTransport()", () => {
  it("should not open a connection for a base URL with another scheme", async (t) => {
    const fake = installFakeWebSocket(t);
    await assert.rejects(
      createConnectWebSocketTransport({
        baseUrl: "ftp://example.com",
      }).unary(
        ConformanceService.method.unary,
        undefined,
        undefined,
        undefined,
        {},
      ),
      (e) => e instanceof ConnectError && e.code === Code.Internal,
    );
    assert.strictEqual(fake.WebSocket.mock.callCount(), 0);
  });

  it("should close with 3102 and a reason cut to 123 bytes when the request stream fails", async (t) => {
    const fitting = `a${"\u00e9".repeat(61)}`;
    const fake = installFakeWebSocket(t, ["M[]"]);
    const response = await createConnectWebSocketTransport({
      baseUrl: "https://example.com",
    }).stream(
      ConformanceService.method.bidiStream,
      undefined,
      undefined,
      undefined,
      // biome-ignore lint/correctness/useYield: the stream fails before a message
      (async function* (): AsyncIterable<object> {
        throw new ConnectError(`${fitting}\u00e9`, Code.Aborted);
      })(),
    );

    await assert.rejects(
      response.message[Symbol.asyncIterator]().next(),
      (e) => e instanceof ConnectError && e.code === Code.Aborted,
    );
    assert.deepStrictEqual(
      fake.send.mock.calls.map((call) => call.arguments),
      [["M[]"]],
    );
    assert.deepStrictEqual(fake.close.mock.calls[0].arguments, [3102, fitting]);
  });

  const webSocketUrls: {
    baseUrl: string;
    timeoutMs: number | undefined;
    url: string;
  }[] = [
    {
      baseUrl: "ws://example.com",
      timeoutMs: undefined,
      url: "ws://example.com/connectrpc.conformance.v1.ConformanceService/Unary",
    },
    {
      baseUrl: "https://example.com/api/?key=a/b",
      timeoutMs: 5000,
      url: "wss://example.com/api/connectrpc.conformance.v1.ConformanceService/Unary?key=a%2Fb&connect-timeout-ms=5000",
    },
    {
      baseUrl: "https://example.com/api?connect-timeout-ms=1#fragment",
      timeoutMs: 5000,
      url: "wss://example.com/api/connectrpc.conformance.v1.ConformanceService/Unary?connect-timeout-ms=5000",
    },
  ];
  for (const { baseUrl, timeoutMs, url } of webSocketUrls) {
    it(`should open ${url} for the base URL ${baseUrl}`, async (t) => {
      const fake = installFakeWebSocket(t, ["M[]", "B{}", "S{}"]);
      await createConnectWebSocketTransport({
        baseUrl,
      }).unary(
        ConformanceService.method.unary,
        undefined,
        timeoutMs,
        undefined,
        {},
      );

      assert.strictEqual(fake.WebSocket.mock.calls[0].arguments[0], url);
    });
  }
});
