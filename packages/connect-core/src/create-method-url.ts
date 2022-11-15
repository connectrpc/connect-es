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

import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";

/**
 * Create a URL for the given RPC. This simply adds the qualified
 * service name, a slash, and the method name to the path.
 * This format is used by the protocols Connect, gRPC and Twirp.
 */
export function createMethodUrl(
  baseUrl: string | URL,
  service: ServiceType | string,
  method: MethodInfo | string
): URL {
  const s = typeof service == "string" ? service : service.typeName;
  const m = typeof method == "string" ? method : method.name;
  return new URL(baseUrl.toString().replace(/\/?$/, `/${s}/${m}`));
}
