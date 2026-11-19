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

import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
} from "@bufbuild/protobuf";
import type { Interceptor, Transport } from "@connectrpc/connect";
import { createWebSocketClient } from "@connectrpc/connect/protocol";
import { createTransport } from "@connectrpc/connect/protocol-connect-websocket";

/**
 * Options used to configure the Connect-over-WebSocket transport.
 */
export interface ConnectWebSocketTransportOptions {
  /**
   * The base URL for all RPCs, with the scheme http, https, ws, or wss.
   */
  baseUrl: string;

  /**
   * Selects the Protobuf binary format, where the default is JSON.
   */
  useBinaryFormat?: boolean;

  /**
   * Interceptors that are applied to all calls running through this transport.
   */
  interceptors?: Interceptor[];

  /**
   * Options for the JSON format, where unknown fields are ignored by default.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  /**
   * Overrides the WebSocket implementation used by the transport.
   */
  WebSocket?: typeof globalThis.WebSocket;

  /**
   * The timeout in milliseconds for all calls, unless a call sets its own.
   */
  defaultTimeoutMs?: number;
}

/**
 * Creates a Transport for the Connect-over-WebSocket protocol, which supports
 * all four RPC types in web browsers by opening one WebSocket per call.
 */
export function createConnectWebSocketTransport(
  options: ConnectWebSocketTransportOptions,
): Transport {
  return createTransport({
    ...options,
    webSocketClient: createWebSocketClient(options.WebSocket),
    useBinaryFormat: options.useBinaryFormat ?? false,
  });
}
