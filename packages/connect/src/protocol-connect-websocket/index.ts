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

// All exports below are private, internal code that does not follow semantic
// versioning.
// We will try hard to avoid breaking changes, but if you depend on the
// following exports, we recommend that you do so with an exact version
// constraint (no ~ or ^).

export {
  closeCodeNormalClosure,
  closeCodeInvalidFramePayloadData,
  closeCodeMessageTooBig,
  closeCodeConnectClientError,
} from "./close-code.js";
export { protocolError } from "./error.js";
export { deserializeMessage, serializeMessage } from "./message.js";
export type {
  ClientMessage,
  SerializationOptions,
} from "./message.js";
export { validateMetadata } from "./metadata.js";
export { queryParamTimeoutMs } from "./query-params.js";
export { subprotocolJson, subprotocolProto } from "./subprotocol.js";
