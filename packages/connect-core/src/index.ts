// Copyright 2021-2023 Buf Technologies, Inc.
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

export { createCallbackClient, CallbackClient } from "./callback-client.js";
export { createPromiseClient, PromiseClient } from "./promise-client.js";
export type { CallOptions } from "./call-options.js";
export type { Transport } from "./transport.js";
export {
  ConnectError,
  connectErrorDetails,
  connectErrorFromReason,
} from "./connect-error.js";
export { Code } from "./code.js";
export {
  Interceptor,
  UnaryRequest,
  UnaryResponse,
  StreamingRequest,
  StreamingConn,
} from "./interceptor.js";
export {
  encodeBinaryHeader,
  decodeBinaryHeader,
  appendHeaders,
} from "./http-headers.js";

// Symbols above should be relevant to end users.
// Symbols below should only be relevant for other libraries.
export { runUnary, runStreaming } from "./interceptor.js";
export { makeAnyClient, AnyClient } from "./any-client.js";
export { codeToString, codeFromString } from "./code.js";
export { createMethodUrl } from "./create-method-url.js";
export {
  Serialization,
  createBinarySerialization,
  createJsonSerialization,
  createClientMethodSerializers,
} from "./serialization.js";
export {
  createEnvelopeReadableStream,
  EnvelopedMessage,
  encodeEnvelope,
  encodeEnvelopes,
} from "./envelope.js";
export { Compression, compressedFlag } from "./compression.js";
export {
  transformCompress,
  transformDecompress,
  transformJoin,
  transformSplit,
  transformSerialize,
  transformParse,
  transformSerializeWithEnd,
  transformParseWithEnd,
} from "./transform-stream.js";
