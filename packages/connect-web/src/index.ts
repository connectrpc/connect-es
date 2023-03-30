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

export { createConnectTransport } from "./connect-transport.js";
export { createGrpcWebTransport } from "./grpc-web-transport.js";
export type { ConnectTransportOptions } from "./connect-transport.js";
export type { GrpcWebTransportOptions } from "./grpc-web-transport.js";

// all of the following exports will be removed in a future release
// please please import from @bufbuild/connect instead
// TODO(TCN-1261)
import {
  CallbackClient,
  CallOptions,
  Code,
  ConnectError,
  connectErrorDetails,
  connectErrorFromReason,
  createCallbackClient,
  createPromiseClient,
  decodeBinaryHeader,
  encodeBinaryHeader,
  Interceptor,
  PromiseClient,
  StreamRequest,
  StreamResponse,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect";

export {
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  createPromiseClient,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  createCallbackClient,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  ConnectError,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  connectErrorDetails,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  connectErrorFromReason,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  Code,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  encodeBinaryHeader,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  decodeBinaryHeader,
};
export type {
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  CallbackClient,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  PromiseClient,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  CallOptions,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  Transport,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  Interceptor,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  UnaryRequest,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  UnaryResponse,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  StreamRequest,
  /**
   * @deprecated please import from \@bufbuild/connect instead
   */
  StreamResponse,
};
