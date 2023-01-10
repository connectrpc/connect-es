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

import { JsonValue, protoBase64 } from "@bufbuild/protobuf";
import { codeFromString } from "../code.js";
import { ConnectError } from "../connect-error.js";
import { newParseError } from "../private/new-parse-error.js";

/**
 * Parse a Connect error from a JSON value.
 * Will return a ConnectError, but throw one in case the JSON is malformed.
 */
export function errorFromJson(
  jsonValue: JsonValue,
  metadata?: HeadersInit
): ConnectError {
  if (
    typeof jsonValue !== "object" ||
    jsonValue == null ||
    Array.isArray(jsonValue) ||
    !("code" in jsonValue) ||
    typeof jsonValue.code !== "string"
  ) {
    throw newParseError(jsonValue);
  }
  const code = codeFromString(jsonValue.code);
  if (!code) {
    throw newParseError(jsonValue.code, ".code");
  }
  const message = jsonValue.message;
  if (message != null && typeof message !== "string") {
    throw newParseError(jsonValue.code, ".message");
  }
  const error = new ConnectError(message ?? "", code, metadata);
  if ("details" in jsonValue && Array.isArray(jsonValue.details)) {
    for (const detail of jsonValue.details) {
      if (
        detail === null ||
        typeof detail != "object" ||
        Array.isArray(detail) ||
        typeof detail.type != "string" ||
        typeof detail.value != "string" ||
        ("debug" in detail && typeof detail.debug != "object")
      ) {
        throw newParseError(detail, `.details`);
      }
      try {
        error.details.push({
          type: detail.type,
          value: protoBase64.dec(detail.value),
          debug: detail.debug,
        });
      } catch (e) {
        throw newParseError(e, `.details`, false);
      }
    }
  }
  return error;
}
