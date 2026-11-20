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

import type { Transport } from "@connectrpc/connect";
import { createWebSocketClient } from "@connectrpc/connect/protocol";
import { createTransport } from "@connectrpc/connect/protocol-connect-websocket";
import { createConnectTransport } from "./connect-transport.js";
import type { ConnectTransportOptions } from "./connect-transport.js";

/**
 * Options used to configure the hybrid Connect transport.
 */
export interface ConnectHybridTransportOptions extends ConnectTransportOptions {
  /**
   * Overrides the WebSocket implementation used for streaming calls, which
   * run over HTTP if there is none.
   */
  WebSocket?: typeof globalThis.WebSocket;
}

/**
 * Creates a Transport that runs unary calls over HTTP with the Connect
 * protocol, and streaming calls over the Connect-over-WebSocket protocol if a
 * WebSocket implementation is available, which supports all streaming RPC
 * types in web browsers.
 */
export function createConnectHybridTransport(
  options: ConnectHybridTransportOptions,
): Transport {
  const httpTransport = createConnectTransport(options);
  const WebSocketConstructor: typeof globalThis.WebSocket | undefined =
    options.WebSocket ?? globalThis.WebSocket;
  if (WebSocketConstructor === undefined) {
    return httpTransport;
  }

  const webSocketTransport = createTransport({
    ...options,
    webSocketClient: createWebSocketClient(WebSocketConstructor),
    useBinaryFormat: options.useBinaryFormat ?? false,
  });

  return {
    unary: (...args) => httpTransport.unary(...args),
    stream: (...args) => webSocketTransport.stream(...args),
  };
}
