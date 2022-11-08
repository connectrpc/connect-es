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

/**
 * Asserts a valid gRPC-web Content-Type header. Raises a ConnectError otherwise.
 */
export function grpcWebExpectContentType(
  binaryFormat: boolean,
  contentType: string | null
): void {
  const t = grpcWebParseContentType(contentType);
  if (t && t.text) {
    throw new ConnectError("grpc-web-text is not supported", Code.Internal);
  }
  if (!t || t.binary != binaryFormat) {
    throw new ConnectError(
      `unexpected response content type ${String(contentType)}`,
      Code.Internal
    );
  }
}

/**
 * Parse a gRPC-web Content-Type header.
 */
export function grpcWebParseContentType(
  contentType: string | null
): { text: boolean; binary: boolean } | undefined {
  const match = contentType
    ?.toLowerCase()
    ?.match(
      /^application\/grpc-web(-text)?(?:\+(?:(json)(?:; ?charset=utf-?8)?|proto))?$/
    );
  if (!match) {
    return undefined;
  }
  const text = !!match[1];
  const binary = !match[2];
  return { text, binary };
}
