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

/**
 * A minimal abstraction of a WebSocket client, which opens one connection.
 */
export type UniversalWebSocketClientFn = (
  request: UniversalWebSocketClientRequest,
) => Promise<UniversalWebSocket>;

/**
 * A minimal abstraction of a request to open a WebSocket connection.
 */
export interface UniversalWebSocketClientRequest {
  /**
   * The URL to connect to, with the scheme ws or wss.
   */
  url: string;

  /**
   * The subprotocols to offer to the server, in order of preference.
   */
  protocols: string[];

  /**
   * Closes the connection with a normal closure when aborted.
   */
  signal?: AbortSignal;
}

/**
 * A minimal abstraction of an open WebSocket connection.
 */
export interface UniversalWebSocket {
  /**
   * The subprotocol selected by the server, or an empty string for none.
   */
  readonly protocol: string;

  /**
   * The extensions negotiated in the handshake, or an empty string for none.
   */
  readonly extensions: string;

  /**
   * The received messages, which end when either side closes the connection.
   */
  readonly messages: AsyncIterable<string | Uint8Array>;

  /**
   * Resolves with the close code once the connection has closed.
   */
  readonly closed: Promise<number>;

  /**
   * Sends a string as text or bytes as binary, and does nothing after a close.
   */
  send(data: string | Uint8Array<ArrayBuffer>): void;

  /**
   * Closes the connection, where only the first call has an effect.
   */
  close(closeCode: number, reason?: string): void;
}
