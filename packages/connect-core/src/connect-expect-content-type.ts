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

import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * Asserts a valid Connect Content-Type response header. Raises a ConnectError
 * otherwise.
 */
export function connectExpectContentType(
  methodKind: MethodKind,
  binaryFormat: boolean,
  contentType: string | null
): void {
  const t = connectParseContentType(contentType);
  if (
    !t ||
    t.binary != binaryFormat ||
    t.stream != (methodKind != MethodKind.Unary)
  ) {
    throw new ConnectError(
      `unexpected response content type ${String(contentType)}`,
      Code.Internal
    );
  }
}

/**
 * Parse a Connect Content-Type header.
 */
export function connectParseContentType(
  contentType: string | null
): { stream: boolean; binary: boolean } | undefined {
  const match = contentType
    ?.toLowerCase()
    ?.match(
      /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/
    );
  if (!match) {
    return undefined;
  }
  const stream = !!match[1];
  const binary = !!match[3];
  return { stream, binary };
}
