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
 * Regular Expression that matches any valid Connect Content-Type header value.
 */
export const contentTypeRegExp =
  /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i;

/**
 * Regular Expression that matches a Connect unary Content-Type header value.
 */
export const contentTypeUnaryRegExp =
  /^application\/(?:json(?:; ?charset=utf-?8)?|proto)$/i;

/**
 * Regular Expression that matches a Connect streaming Content-Type header value.
 */
export const contentTypeStreamRegExp =
  /^application\/connect\+?(?:json(?:; ?charset=utf-?8)?|proto)$/i;

export const contentTypeUnaryProto = "application/proto";
export const contentTypeUnaryJson = "application/json";
export const contentTypeStreamProto = "application/connect+proto";
export const contentTypeStreamJson = "application/connect+json";

/**
 * Parse a Connect Content-Type header.
 */
export function parseContentType(
  contentType: string | null
): { stream: boolean; binary: boolean } | undefined {
  const match = contentType?.match(contentTypeRegExp);
  if (!match) {
    return undefined;
  }
  const stream = !!match[1];
  const binary = !!match[3];
  return { stream, binary };
}
