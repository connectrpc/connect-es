// Copyright 2021-2023 The Connect Authors
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

export { ConnectError } from "./connect-error.js";
export { Code } from "./code.js";
export {
  encodeBinaryHeader,
  decodeBinaryHeader,
  appendHeaders,
} from "./http-headers.js";
export { createCallbackClient } from "./callback-client.js";
export type { CallbackClient } from "./callback-client.js";
export { createPromiseClient } from "./promise-client.js";
export type { PromiseClient } from "./promise-client.js";
export type { CallOptions } from "./call-options.js";
export type { Transport } from "./transport.js";
export type {
  Interceptor,
  UnaryRequest,
  UnaryResponse,
  StreamRequest,
  StreamResponse,
} from "./interceptor.js";

export type {
  ServiceImpl,
  MethodImpl,
  HandlerContext,
} from "./implementation.js";
export { createConnectRouter } from "./router.js";
export type { ConnectRouter, ConnectRouterOptions } from "./router.js";
export { createHandlerContext } from "./implementation.js";
export { cors } from "./cors.js";

// Symbols above should be relevant to end users.
// Symbols below should only be relevant for other libraries.
export { makeAnyClient } from "./any-client.js";
export type { AnyClient } from "./any-client.js";

export {
  createServiceImplSpec,
  createMethodImplSpec,
} from "./implementation.js";
export type { ServiceImplSpec, MethodImplSpec } from "./implementation.js";
export { createRouterTransport } from "./router-transport.js";
