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

/**
 * Regular Expression that matches any valid gRPC-web Content-Type header value.
 * Note that this includes application/grpc-web-text with the additional base64
 * encoding.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const contentTypeRegExp =
  /^application\/grpc-web(-text)?(?:\+(?:(json)(?:; ?charset=utf-?8)?|proto))?$/i;

export const contentTypeProto = "application/grpc-web+proto";
export const contentTypeJson = "application/grpc-web+json";

/**
 * Parse a gRPC-web Content-Type header value.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function parseContentType(
  contentType: string | null
): { text: boolean; binary: boolean } | undefined {
  const match = contentType?.match(contentTypeRegExp);
  if (!match) {
    return undefined;
  }
  const text = !!match[1];
  const binary = !match[2];
  return { text, binary };
}
