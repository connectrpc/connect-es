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

interface FakeServer {
  protocol?: string;
  messages?: string[];
}

function createFakeWebSocket(server: FakeServer = {}) {
  const urls: string[] = [];
  const sent: (string | Uint8Array)[] = [];
  const closeCodes: (number | undefined)[] = [];
  const closeReasons: (string | undefined)[] = [];

  class FakeWebSocket {
    binaryType = "blob";
    readonly extensions = "";
    readonly protocol: string;
    private isClosing = false;
    private onMessage = (_event: FakeEvent): void => {};

    constructor(url: string, protocols: string[]) {
      urls.push(url);
      this.protocol = server.protocol ?? protocols[0];
    }

    send(data: string | Uint8Array): void {
      sent.push(data);
    }

    close(code?: number, reason?: string): void {
      if (this.isClosing) {
        return;
      }

      this.isClosing = true;
      closeCodes.push(code);
      closeReasons.push(reason);
    }

    addEventListener(type: string, listener: (event: FakeEvent) => void): void {
      if (type === "message") {
        this.onMessage = listener;
      }
      if (type === "open") {
        queueMicrotask(() => {
          listener({ data: undefined, code: 0 });
          for (const data of server.messages ?? []) {
            this.onMessage({ data, code: 0 });
          }
        });
      }
    }
  }

  return { WebSocket: FakeWebSocket, urls, sent, closeCodes, closeReasons };
}

describe("createConnectWebSocketTransport()", () => {
  const options = { baseUrl: "https://example.com/api" };

  function unary(
    fake: ReturnType<typeof createFakeWebSocket> & { baseUrl?: string },
  ) {
    return createConnectWebSocketTransport({ ...options, ...fake }).unary(
      ConformanceService.method.unary,
      undefined,
      undefined,
      undefined,
      {},
    );
  }

  it("should cut a close reason to whole characters within 123 bytes", async () => {
    const fitting = `a${"\u00e9".repeat(41)}`;
    const fake = createFakeWebSocket({ protocol: `${fitting}\u00e9` });

    await assert.rejects(unary(fake));
    assert.deepStrictEqual(fake.closeReasons, [
      `protocol error: unexpected subprotocol "${fitting}`,
    ]);
  });

  it("should not open a connection for a base URL with another scheme", async () => {
    const fake = createFakeWebSocket();

    await assert.rejects(
      unary({ ...fake, baseUrl: "ftp://example.com" }),
      (e) => e instanceof ConnectError && e.code === Code.Internal,
    );
    assert.strictEqual(fake.urls.length, 0);
  });

  it("should close with 3102 when the request stream fails", async () => {
    const fake = createFakeWebSocket({ messages: ["M[]"] });
    // biome-ignore lint/correctness/useYield: the stream fails before a message
    async function* failingRequests(): AsyncIterable<object> {
      throw new ConnectError("failed", Code.Aborted);
    }
    const response = await createConnectWebSocketTransport({
      ...options,
      ...fake,
    }).stream(
      ConformanceService.method.bidiStream,
      undefined,
      undefined,
      undefined,
      failingRequests(),
    );

    await assert.rejects(
      response.message[Symbol.asyncIterator]().next(),
      (e) => e instanceof ConnectError && e.code === Code.Aborted,
    );
    assert.deepStrictEqual(fake.sent, ["M[]"]);
    assert.deepStrictEqual(fake.closeCodes, [3102]);
  });

  const webSocketUrls: [string, string][] = [
    [
      "ws://example.com",
      "ws://example.com/connectrpc.conformance.v1.ConformanceService/Unary",
    ],
    [
      "https://example.com/api/?key=a/b",
      "wss://example.com/api/connectrpc.conformance.v1.ConformanceService/Unary?key=a%2Fb&connect-timeout-ms=5000",
    ],
    [
      "https://example.com/api?connect-timeout-ms=1#fragment",
      "wss://example.com/api/connectrpc.conformance.v1.ConformanceService/Unary?connect-timeout-ms=5000",
    ],
  ];
  for (const [baseUrl, url] of webSocketUrls) {
    it(`should open ${url} for the base URL ${baseUrl}`, async () => {
      const fake = createFakeWebSocket({ messages: ["M[]", "B{}", "S{}"] });
      await createConnectWebSocketTransport({
        ...options,
        ...fake,
        baseUrl,
      }).unary(
        ConformanceService.method.unary,
        undefined,
        url.includes("?") ? 5000 : undefined,
        undefined,
        {},
      );

      assert.strictEqual(fake.urls[0], url);
    });
  }
});
