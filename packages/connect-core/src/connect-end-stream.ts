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

import type { ConnectError } from "./connect-error.js";
import { connectErrorFromJson } from "./connect-error-from-json.js";
import type { JsonValue } from "@bufbuild/protobuf";
import { newParseError } from "./private/new-parse-error.js";

/**
 *
 */
export const connectEndStreamFlag = 0b00000010;

/**
 * Represents the EndStreamResponse of the Connect protocol.
 */
interface EndStreamResponse {
  metadata: Headers;
  error?: ConnectError;
}

/**
 * Parse an EndStreamResponse of the Connect protocol.
 */
export function connectEndStreamFromJson(
  data: Uint8Array | string
): EndStreamResponse {
  let jsonValue: JsonValue;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    jsonValue = JSON.parse(
      typeof data == "string" ? data : new TextDecoder().decode(data)
    );
  } catch (e) {
    throw newParseError(e, "", false);
  }
  if (
    typeof jsonValue != "object" ||
    jsonValue == null ||
    Array.isArray(jsonValue)
  ) {
    throw newParseError(jsonValue);
  }
  const metadata = new Headers();
  if ("metadata" in jsonValue) {
    if (
      typeof jsonValue.metadata != "object" ||
      jsonValue.metadata == null ||
      Array.isArray(jsonValue.metadata)
    ) {
      throw newParseError(jsonValue, ".metadata");
    }
    for (const [key, values] of Object.entries(jsonValue.metadata)) {
      if (
        !Array.isArray(values) ||
        values.some((value) => typeof value != "string")
      ) {
        throw newParseError(values, `.metadata["${key}"]`);
      }
      for (const value of values) {
        metadata.append(key, value as string);
      }
    }
  }
  const error =
    "error" in jsonValue
      ? connectErrorFromJson(jsonValue.error, metadata)
      : undefined;
  return { metadata, error };
}
