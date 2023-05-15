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

export { createMethodUrl } from "./create-method-url.js";
export type {
  UniversalClientFn,
  UniversalClientRequest,
  UniversalClientResponse,
  UniversalHandlerFn,
  UniversalServerRequest,
  UniversalServerResponse,
} from "./universal.js";
export type { Compression } from "./compression.js";
export type { UniversalHandler } from "./universal-handler.js";
export { createUniversalHandlerClient } from "./universal-handler-client.js";
export { createFetchClient, createFetchHandler } from "./universal-fetch.js";

// All exports below are private — internal code that does not follow semantic
// versioning.
// We will try hard to avoid breaking changes, but if you depend on the
// following exports, we recommend that you do so with an exact version
// constraint (no ~ or ^).

export {
  createMethodSerializationLookup,
  createClientMethodSerializers,
  limitSerialization,
} from "./serialization.js";
export type {
  Serialization,
  MethodSerializationLookup,
} from "./serialization.js";
export { validateReadWriteMaxBytes } from "./limit-io.js";
export {
  encodeEnvelope,
  encodeEnvelopes,
  envelopeDecompress,
  envelopeCompress,
  createEnvelopeReadableStream,
} from "./envelope.js";
export type { EnvelopedMessage } from "./envelope.js";
export { compressedFlag, compressionNegotiate } from "./compression.js";
export {
  pipe,
  transformCatch,
  transformCatchFinally,
  transformAppend,
  transformPrepend,
  transformReadAllBytes,
  transformNormalizeMessage,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformSplitEnvelope,
  transformSerializeEnvelope,
  transformParseEnvelope,
  pipeTo,
  sinkAll,
  sinkAllBytes,
  makeIterableAbortable,
  createWritableIterable,
  createAsyncIterable,
  readAllBytes,
  untilFirst,
} from "./async-iterable.js";
export type {
  AsyncIterableTransform,
  AsyncIterableSink,
  WritableIterable,
} from "./async-iterable.js";
export { contentTypeMatcher } from "./content-type-matcher.js";
export type { ContentTypeMatcher } from "./content-type-matcher.js";
export {
  invokeUnaryImplementation,
  transformInvokeImplementation,
} from "./invoke-implementation.js";
export {
  createLinkedAbortController,
  getAbortSignalReason,
  createDeadlineSignal,
} from "./signals.js";
export {
  assertByteStreamRequest,
  uResponseOk,
  uResponseNotFound,
  uResponseUnsupportedMediaType,
  uResponseMethodNotAllowed,
  uResponseVersionNotSupported,
} from "./universal.js";
export {
  validateUniversalHandlerOptions,
  createUniversalServiceHandlers,
  createUniversalMethodHandler,
} from "./universal-handler.js";
export type { UniversalHandlerOptions } from "./universal-handler.js";
export type { ProtocolHandlerFactory } from "./protocol-handler-factory.js";
export type { CommonTransportOptions } from "./transport-options.js";
