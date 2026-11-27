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

// Names and codes follow https://www.iana.org/assignments/websocket#close-code-number.

/**
 * Normal Closure: the purpose of the connection has been fulfilled.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const closeCodeNormalClosure = 1000;

/**
 * Invalid frame payload data: a message had data unlike its type.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const closeCodeInvalidFramePayloadData = 1007;

/**
 * Message Too Big: an endpoint received a message too big to process.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const closeCodeMessageTooBig = 1009;

/**
 * Connect-over-WebSocket client error: the client ended an RPC because of
 * a protocol error or another unexpected condition.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const closeCodeConnectClientError = 3102;
