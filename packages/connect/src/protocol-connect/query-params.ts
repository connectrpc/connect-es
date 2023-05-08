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
 * @private Internal code, does not follow semantic versioning.
 */
export const paramConnectVersion = "connect";
export const paramEncoding = "encoding";
export const paramCompression = "compression";
export const paramBase64 = "base64";
export const paramMessage = "message";

/**
 * Parses a query parameter, but does not decode the values.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function parseQueryRaw(search: string): Map<string, string> {
  const delimRe = /[&=]/g;
  const map = new Map<string, string>();
  if (search.length < 2 || search[0] != "?") {
    return map;
  }
  let i = 0;
  let match: RegExpExecArray | null;
  let key = "",
    lastDelim = search[0];
  while ((match = delimRe.exec(search)) !== null) {
    if (match[0] === "=") {
      if (lastDelim === "=") {
        continue;
      } else {
        key = search.slice(i + 1, match.index);
      }
    } else if (match[0] === "&") {
      map.set(key, search.slice(i + 1, match.index));
    }
    lastDelim = match[0];
    i = match.index;
  }
  if (lastDelim === "=") {
    map.set(key, search.slice(i + 1));
  } else {
    map.set(search.slice(i + 1), "");
  }
  return map;
}

/**
 * Decodes a query parameter into a Uint8Array.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function decodeQueryRaw(value: string): Uint8Array {
  const result = new Uint8Array(value.length);
  let n = 0;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "%") {
      const ch = parseInt(value.slice(i + 1, i + 3), 16);
      if (!isNaN(n)) {
        result[n++] = ch;
        i += 2;
        continue;
      }
    }
    result[n++] = value.charCodeAt(i);
  }
  return result.subarray(0, n);
}
