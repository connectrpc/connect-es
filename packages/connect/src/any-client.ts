// Copyright 2021-2024 The Connect Authors
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

import type { DescMethod, DescService } from "@bufbuild/protobuf";

/**
 * AnyClient is an arbitrary service client with any method signature.
 *
 * It usually has methods for all methods defined for a service, but may
 * omit some, for example because it's transport does not support streaming.
 */
export type AnyClient = Record<string, AnyClientMethod>;

type AnyClientMethod = (...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any

type CreateAnyClientMethod = (method: DescMethod) => AnyClientMethod | null;

/**
 * Create any client for the given service.
 *
 * The given createMethod function is called for each method definition
 * of the service. The function it returns is added to the client object
 * as a method.
 */
export function makeAnyClient(
  service: DescService,
  createMethod: CreateAnyClientMethod,
): AnyClient {
  const client: AnyClient = {};
  for (const desc of service.methods) {
    const method = createMethod(desc);
    if (method != null) {
      client[desc.localName] = method;
    }
  }
  return client;
}
