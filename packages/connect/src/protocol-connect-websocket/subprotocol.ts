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
 * The WebSocket subprotocol that selects the Protobuf binary format.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const subprotocolProto = "connectrpc.1+proto";

/**
 * The WebSocket subprotocol that selects the Protobuf JSON format.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const subprotocolJson = "connectrpc.1+json";
