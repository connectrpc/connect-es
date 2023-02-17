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

import { Code, ConnectError, MethodImpl, ServiceImpl } from "@bufbuild/connect";
import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";

/**
 * @deprecated partial services are now the default, and they raise code
 * unimplemented by default for missing method implementations. If you want
 * to enforce presence of all methods at compile time, assign to ServiceImpl<T>.
 *
 * unimplementService() takes a partial service implementation,
 * and adds a method that throws a ConnectError with code unimplemented
 * for every missing method implementation.
 */
export function unimplementService<T extends ServiceType>(
  service: T,
  partialImp: Partial<ServiceImpl<T>>
): ServiceImpl<T> {
  const impl = partialImp as Record<string, MethodImpl<MethodInfo>>;
  for (const [localName, methodInfo] of Object.entries(service.methods)) {
    if (typeof impl[localName] != "function") {
      impl[localName] = () => {
        throw new ConnectError(
          `${service.typeName}.${methodInfo.name} is not implemented`,
          Code.Unimplemented
        );
      };
    }
  }
  return impl as ServiceImpl<T>;
}
