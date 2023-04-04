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

export { createHandlerFactory } from "./handler-factory.js";
export { createTransport } from "./transport.js";

// All exports below are private — internal code that does not follow semantic
// versioning.
// We will try hard to avoid breaking changes, but if you depend on the
// following exports, we recommend that you do so with an exact version
// constraint (no ~ or ^).

export { codeFromHttpStatus, codeToHttpStatus } from "./http-status.js";
export {
  requestHeader,
  requestHeaderWithCompression,
} from "./request-header.js";
export {
  endStreamToJson,
  endStreamFromJson,
  endStreamFlag,
  createEndStreamSerialization,
} from "./end-stream.js";
export type { EndStreamResponse } from "./end-stream.js";
export {
  errorFromJson,
  errorFromJsonBytes,
  errorToJson,
  errorToJsonBytes,
} from "./error-json.js";
export {
  parseContentType,
  contentTypeUnaryProto,
  contentTypeUnaryJson,
  contentTypeStreamProto,
  contentTypeStreamJson,
  contentTypeRegExp,
  contentTypeUnaryRegExp,
  contentTypeStreamRegExp,
} from "./content-type.js";
export { parseTimeout } from "./parse-timeout.js";
export {
  validateResponse,
  validateResponseWithCompression,
} from "./validate-response.js";
export { trailerMux, trailerDemux } from "./trailer-mux.js";
export * from "./headers.js";
export { protocolVersion } from "./version.js";
export { codeFromString } from "./code-string.js";
export { codeToString } from "./code-string.js";
