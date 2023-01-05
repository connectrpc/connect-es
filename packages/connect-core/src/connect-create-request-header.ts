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

import { MethodKind } from "@bufbuild/protobuf";

/**
 * Creates headers for a Connect request.
 */
export function connectCreateRequestHeader(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined
): Headers {
  const result = new Headers(userProvidedHeaders ?? {});
  let type = "application/";
  if (methodKind != MethodKind.Unary) {
    type += "connect+";
  }
  type += useBinaryFormat ? "proto" : "json";
  result.set("Content-Type", type);
  if (timeoutMs !== undefined) {
    result.set("Connect-Timeout-Ms", `${timeoutMs}`);
  }
  return result;
}
