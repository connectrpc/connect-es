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

import { JsonValue, proto3 } from "@bufbuild/protobuf";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";

/**
 * newParseError() is an internal utility to create a ConnectError while
 * parsing a Connect EndStreamResponse or a Connect Error from the wire.
 */
export function newParseError(
  error: unknown,
  property: string,
  json: false
): ConnectError;
export function newParseError(
  value: JsonValue,
  property?: string,
  json?: true
): ConnectError;
export function newParseError(
  valueOrError: JsonValue | unknown,
  property?: string,
  json?: boolean
): ConnectError {
  let d: string;
  if (json ?? true) {
    d = proto3.json.debug(valueOrError as JsonValue);
  } else {
    property = "";
    d =
      valueOrError instanceof Error
        ? valueOrError.message
        : String(valueOrError);
  }
  return new ConnectError(
    `cannot decode ConnectError${property ?? ""} from JSON: ${d}`,
    Code.Internal
  );
}
