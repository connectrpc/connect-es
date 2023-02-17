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
export {
  Serialization,
  createMethodSerializationLookup,
  createClientMethodSerializers,
  MethodSerializationLookup,
  limitSerialization,
} from "./serialization.js";
export { validateReadWriteMaxBytes } from "./limit-io.js";
export {
  EnvelopedMessage,
  encodeEnvelope,
  encodeEnvelopes,
  envelopeDecompress,
  envelopeCompress,
  createEnvelopeReadableStream,
} from "./envelope.js";
export {
  Compression,
  compressedFlag,
  compressionNegotiate,
} from "./compression.js";
export {
  AsyncIterableTransform,
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
  AsyncIterableSink,
  pipeTo,
  sinkAll,
  sinkAllBytes,
  makeIterableAbortable,
  WritableIterable,
  createWritableIterable,
  createAsyncIterable,
  readAllBytes,
} from "./async-iterable.js";
export {
  ContentTypeMatcher,
  contentTypeMatcher,
} from "./content-type-matcher.js";
export {
  invokeUnaryImplementation,
  transformInvokeImplementation,
} from "./invoke-implementation.js";
export {
  UniversalClientFn,
  UniversalClientRequest,
  UniversalClientResponse,
  UniversalHandlerFn,
  UniversalServerRequest,
  UniversalServerResponse,
  assertByteStreamRequest,
  uResponseOk,
  uResponseNotFound,
  uResponseUnsupportedMediaType,
  uResponseMethodNotAllowed,
  uResponseVersionNotSupported,
} from "./universal.js";
export {
  UniversalHandler,
  UniversalHandlerOptions,
  validateUniversalHandlerOptions,
  createUniversalServiceHandlers,
  createUniversalMethodHandler,
} from "./universal-handler.js";
export { ProtocolHandlerFactory } from "./protocol-handler-factory.js";
