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
import { Code, ConnectError } from "@connectrpc/connect";
import { ConformanceService } from "@connectrpc/connect-conformance";
import { createConnectWebSocketTransport } from "./connect-websocket-transport.js";

type FakeEvent = { data: unknown; code: number };

function createFakeWebSocket(messages: string[] = []) {
  class FakeWebSocket {
    binaryType = "blob";
    readonly protocol: string;
    private listeners: Record<string, ((event: FakeEvent) => void)[]> = {};

    constructor(url: string, protocols: string[]) {
      fake.url = url;
      this.protocol = protocols[0];
      queueMicrotask(() => {
        this.dispatch("open", { data: undefined, code: 0 });
        for (const data of messages) {
          this.dispatch("message", { data, code: 0 });
        }
      });
    }

    send(data: string | Uint8Array): void {
      fake.sent.push(data);
    }

    close(code?: number, reason?: string): void {
      fake.close ??= { code, reason };
    }

    addEventListener(type: string, listener: (event: FakeEvent) => void): void {
      this.listeners[type] ??= [];
      this.listeners[type].push(listener);
    }

    private dispatch(type: string, event: FakeEvent): void {
      for (const listener of this.listeners[type] ?? []) {
        listener(event);
      }
    }
  }

  const fake: {
    WebSocket: typeof FakeWebSocket;
    url?: string;
    sent: (string | Uint8Array)[];
    close?: { code?: number; reason?: string };
  } = { WebSocket: FakeWebSocket, sent: [] };

  return fake;
}

describe("createConnectWebSocketTransport()", () => {
  it("should not open a connection for a base URL with another scheme", async () => {
    const fake = createFakeWebSocket();
    await assert.rejects(
      createConnectWebSocketTransport({
        WebSocket: fake.WebSocket,
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
    assert.strictEqual(fake.url, undefined);
  });

  it("should close with 3102 and a reason cut to 123 bytes when the request stream fails", async () => {
    const fitting = `a${"\u00e9".repeat(61)}`;
    const fake = createFakeWebSocket(["M[]"]);
    const response = await createConnectWebSocketTransport({
      WebSocket: fake.WebSocket,
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
    assert.deepStrictEqual(fake.sent, ["M[]"]);
    assert.deepStrictEqual(fake.close, { code: 3102, reason: fitting });
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
    it(`should open ${url} for the base URL ${baseUrl}`, async () => {
      const fake = createFakeWebSocket(["M[]", "B{}", "S{}"]);
      await createConnectWebSocketTransport({
        WebSocket: fake.WebSocket,
        baseUrl,
      }).unary(
        ConformanceService.method.unary,
        undefined,
        timeoutMs,
        undefined,
        {},
      );

      assert.strictEqual(fake.url, url);
    });
  }
});
