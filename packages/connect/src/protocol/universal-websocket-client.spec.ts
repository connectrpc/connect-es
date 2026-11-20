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
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import { createWebSocketClient } from "./universal-websocket-client.js";

class FakeWebSocket extends EventTarget {
  static last: FakeWebSocket | undefined;

  protocol = "";
  extensions = "";
  binaryType = "blob";
  closeCode: number | undefined;
  closeReason: string | undefined;

  constructor(
    readonly url: string,
    readonly offeredProtocols: string[],
  ) {
    super();
    FakeWebSocket.last = this;
  }

  close(code: number, reason?: string): void {
    this.closeCode = code;
    this.closeReason = reason;
  }

  accept(): void {
    this.protocol = this.offeredProtocols[0];
    this.dispatchEvent(new Event("open"));
  }

  receiveClose(code: number): void {
    this.dispatchEvent(Object.assign(new Event("close"), { code }));
  }
}

describe("createWebSocketClient()", () => {
  const client = createWebSocketClient(
    FakeWebSocket as unknown as typeof WebSocket,
  );
  const request = { url: "wss://example.com/chat", protocols: ["a", "b"] };

  function open(signal?: AbortSignal) {
    const connection = client({ ...request, signal });
    const socket = FakeWebSocket.last;
    assert.ok(socket !== undefined);

    return { connection, socket };
  }

  async function readAll(messages: AsyncIterable<string | Uint8Array>) {
    const all: (string | Uint8Array)[] = [];
    for await (const message of messages) {
      all.push(message);
    }

    return all;
  }

  it("should fail when the connection does not open", async () => {
    const { connection, socket } = open();
    socket.receiveClose(1006);

    await assert.rejects(
      connection,
      (e) => e instanceof ConnectError && e.code === Code.Unavailable,
    );
  });

  it("should not open a connection when the signal is already aborted", async () => {
    const reason = new Error("aborted");
    FakeWebSocket.last = undefined;

    await assert.rejects(
      client({ ...request, signal: AbortSignal.abort(reason) }),
      (e) => e === reason,
    );
    assert.strictEqual(FakeWebSocket.last, undefined);
  });

  it("should fail with the abort reason when aborted before it opens", async () => {
    const reason = new Error("aborted");
    const controller = new AbortController();
    const { connection } = open(controller.signal);
    controller.abort(reason);

    await assert.rejects(connection, (e) => e === reason);
  });

  it("should end the messages when aborted", async () => {
    const controller = new AbortController();
    const { connection, socket } = open(controller.signal);
    socket.accept();
    const { messages } = await connection;
    controller.abort();

    assert.deepStrictEqual(await readAll(messages), []);
  });

  it("should cut a close reason to whole characters within 123 bytes", async () => {
    const fitting = `\u00e9${"a".repeat(120)}`;
    const { connection, socket } = open();
    socket.accept();
    (await connection).close(3102, `${fitting}\u00e9a`);

    assert.strictEqual(socket.closeReason, fitting);
  });
});
