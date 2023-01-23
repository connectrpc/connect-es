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

export { createConnectHttp2Transport } from "./connect-http2-transport.js";
export { createConnectHttpTransport } from "./connect-http-transport.js";
export { createGrpcHttp2Transport } from "./grpc-http2-transport.js";
export { createGrpcHttpTransport } from "./grpc-http-transport.js";
export { createGrpcWebHttp2Transport } from "./grpc-web-http2-transport.js";
export { createGrpcWebHttpTransport } from "./grpc-web-http-transport.js";
export { compressionBrotli, compressionGzip } from "./compression.js";
export {
  ServiceImpl,
  MethodImpl,
  HandlerContext,
  unimplementService,
} from "./implementation.js";
export {
  Handler,
  createHandler,
  createHandlers,
  mergeHandlers,
} from "./handler.js";
