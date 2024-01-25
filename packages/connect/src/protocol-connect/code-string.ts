// Copyright 2021-2024 The Connect Authors
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

import { Code } from "../code.js";

/**
 * codeToString returns the string representation of a Code.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function codeToString(value: Code): string {
  const name = Code[value] as string | undefined;
  if (typeof name != "string") {
    return value.toString();
  }
  return (
    name[0].toLowerCase() +
    name.substring(1).replace(/[A-Z]/g, (c) => "_" + c.toLowerCase())
  );
}

let stringToCode: Record<string, Code> | undefined;

/**
 * codeFromString parses the string representation of a Code in snake_case.
 * For example, the string "permission_denied" parses into Code.PermissionDenied.
 *
 * If the given string cannot be parsed, the function returns undefined.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function codeFromString(value: string): Code | undefined {
  if (!stringToCode) {
    stringToCode = {};
    for (const value of Object.values(Code)) {
      if (typeof value == "string") {
        continue;
      }
      stringToCode[codeToString(value)] = value;
    }
  }
  return stringToCode[value];
}
