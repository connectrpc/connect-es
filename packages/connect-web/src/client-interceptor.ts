// Copyright 2020-2022 Buf Technologies, Inc.
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

import type {
  ClientResponse,
  ClientRequest,
  ClientCallOptions,
} from "./client-transport.js";
import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";

export type ClientInterceptor = (
  service: ServiceType,
  method: MethodInfo,
  options: Readonly<ClientCallOptions>,
  request: ClientRequest,
  response: ClientResponse
) => [ClientRequest, ClientResponse];

export function chainClientInterceptors(
  service: ServiceType,
  method: MethodInfo,
  options: Readonly<ClientCallOptions>,
  request: ClientRequest,
  response: ClientResponse,
  chain: ClientInterceptor[]
): [ClientRequest, ClientResponse] {
  for (const interceptor of chain.concat().reverse()) {
    [request, response] = interceptor(
      service,
      method,
      options,
      { ...request },
      response
    );
  }
  return [request, response];
}
