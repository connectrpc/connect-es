// Copyright 2021-2025 The Connect Authors
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
 * Regular Expression that matches any valid gRPC Content-Type header value.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const contentTypeRegExp =
  /^application\/grpc(?:\+(?:(json)(?:; ?charset=utf-?8)?|proto))?$/i;

export const contentTypeProto = "application/grpc+proto";
export const contentTypeJson = "application/grpc+json";

/**
 * Parse a gRPC Content-Type header.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function parseContentType(
  contentType: string | null,
): { binary: boolean } | undefined {
  const match = contentType?.match(contentTypeRegExp);
  if (!match) {
    return undefined;
  }
  const binary = !match[1];
  return { binary };
}
