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
 * trailerFlag indicates that the data in a EnvelopedMessage
 * is a set of trailers of the gRPC-web protocol.
 */
export const trailerFlag = 0b10000000;

/**
 * Parse a gRPC-web trailer, a set of header fields separated by CRLF.
 */
export function trailerParse(data: Uint8Array): Headers {
  const headers = new Headers();
  const lines = new TextDecoder().decode(data).split("\r\n");
  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const i = line.indexOf(":");
    if (i > 0) {
      const name = line.substring(0, i).trim();
      const value = line.substring(i + 1).trim();
      headers.append(name, value);
    }
  }
  return headers;
}

/**
 * Serialize a Headers object as a gRPC-web trailer.
 */
export function trailerSerialize(trailer: Headers): Uint8Array {
  const lines: string[] = [];
  trailer.forEach((value, key) => {
    lines.push(`${key}: ${value}\r\n`);
  });
  return new TextEncoder().encode(lines.join(""));
}
