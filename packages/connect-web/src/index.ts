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

export { createCallbackClient, CallbackClient } from "./callback-client.js";
export { createPromiseClient, PromiseClient } from "./promise-client.js";
export { makeAnyClient, AnyClient } from "./any-client.js";
export type { CallOptions } from "./call-options.js";

export { createConnectTransport } from "./connect-transport.js";
export { createGrpcWebTransport } from "./grpc-web-transport.js";
export type { Transport } from "./transport.js";

export {
  Interceptor,
  UnaryRequest,
  UnaryResponse,
  StreamResponse,
  runUnary,
  runServerStream,
} from "./interceptor.js";

export { ConnectError, connectErrorFromJson } from "./connect-error.js";
export { Code, codeFromString, codeToString } from "./code.js";

export {
  decodeBinaryHeader,
  encodeBinaryHeader,
  mergeHeaders,
} from "./http-headers.js";

export { createEnvelopeReadableStream } from "./envelope.js";
