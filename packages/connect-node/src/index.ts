// Copyright 2021-2022 Buf Technologies, Inc.
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

export * from "./connect-http2-transport.js";
export { mergeHandlers } from "./merge-handlers.js";
export { createHandler, createHandlers } from "./create-handler.js";
export {
  createCallbackClient,
  CallbackClient,
  createPromiseClient,
  PromiseClient,
  CallOptions,
  Transport,
  ConnectError,
  connectErrorDetails,
  connectErrorFromReason,
  Code,
  Interceptor,
  UnaryRequest,
  UnaryResponse,
  StreamingRequest,
  StreamingConn,
  encodeBinaryHeader,
  decodeBinaryHeader,
} from "@bufbuild/connect-core";
