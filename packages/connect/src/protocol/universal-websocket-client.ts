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

import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import { getAbortSignalReason } from "./signals.js";
import { closeCodeNormalClosure } from "./websocket-close-code.js";
import { createAsyncQueue } from "./async-queue.js";
import type {
  UniversalWebSocketClientFn,
  UniversalWebSocket,
} from "./universal-websocket.js";

/**
 * Creates a WebSocket client on top of the standard WebSocket API.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createWebSocketClient(
  WebSocketConstructor: typeof globalThis.WebSocket = globalThis.WebSocket,
): UniversalWebSocketClientFn {
  return async function open({ url, protocols, signal }) {
    const socket = new WebSocketConstructor(url, protocols);
    if (signal?.aborted === true) {
      socket.close(closeCodeNormalClosure);
      throw signal.reason;
    }

    socket.binaryType = "arraybuffer";

    const messageQueue = createAsyncQueue<string | Uint8Array>();

    function close(closeCode: number, reason?: string): void {
      messageQueue.end();
      // A Close frame holds at most 125 bytes:
      //
      // - code: 2 bytes
      // - reason: 123 UTF-8 bytes
      //
      // close() throws a SyntaxError for a reason that won't fit, so we truncate it here.
      const { read } = new TextEncoder().encodeInto(
        reason ?? "",
        new Uint8Array(123),
      );
      socket.close(closeCode, reason?.slice(0, read));
    }

    function closeOnAbort(): void {
      close(closeCodeNormalClosure);
    }
    signal?.addEventListener("abort", closeOnAbort, { once: true });

    const closed = new Promise<number>((resolve) => {
      socket.addEventListener("close", (event) => {
        signal?.removeEventListener("abort", closeOnAbort);
        messageQueue.end();
        resolve(event.code);
      });
    });
    socket.addEventListener(
      "message",
      (event: MessageEvent<string | ArrayBuffer>) => {
        messageQueue.push(
          typeof event.data === "string"
            ? event.data
            : new Uint8Array(event.data),
        );
      },
    );

    return new Promise<UniversalWebSocket>((resolve, reject) => {
      socket.addEventListener("open", () => {
        resolve({
          protocol: socket.protocol,
          extensions: socket.extensions,
          messages: messageQueue.read(),
          closed,
          send: (data) => socket.send(data),
          close,
        });
      });
      signal?.addEventListener(
        "abort",
        () => reject(getAbortSignalReason(signal)),
        { once: true },
      );
      void closed.then(() =>
        reject(
          new ConnectError(
            "connection failed before it opened, and the reason is not available to the client",
            Code.Unavailable,
          ),
        ),
      );
    });
  };
}
