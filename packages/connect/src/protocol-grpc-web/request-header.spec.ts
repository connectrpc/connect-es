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

import type { Compression } from "../protocol/index.js";
import {
  requestHeader,
  requestHeaderWithCompression,
} from "./request-header.js";
import {
  headerEncoding,
  headerAcceptEncoding,
} from "../protocol-grpc/headers.js";

function listHeaderKeys(header: Headers): string[] {
  const keys: string[] = [];
  header.forEach((_, key) => keys.push(key));
  return keys.sort();
}

describe("requestHeader", () => {
  it("should create request headers", () => {
    const headers = requestHeader(true, undefined, undefined, true);
    expect(listHeaderKeys(headers)).toEqual([
      "content-type",
      "user-agent",
      "x-grpc-web",
      "x-user-agent",
    ]);
    expect(headers.get("Content-Type")).toBe("application/grpc-web+proto");
    expect(headers.get("X-User-Agent")).toMatch(/^connect-es\/\d+\.\d+\.\d+/);
    expect(headers.get("User-Agent")).toMatch(/^connect-es\/\d+\.\d+\.\d+/);
    expect(headers.get("X-Grpc-Web")).toBe("1");
  });

  it("should create request headers with timeout", () => {
    const headers = requestHeader(true, 10, undefined, true);
    expect(listHeaderKeys(headers)).toEqual([
      "content-type",
      "grpc-timeout",
      "user-agent",
      "x-grpc-web",
      "x-user-agent",
    ]);
    expect(headers.get("Grpc-Timeout")).toBe("10m");
  });

  it("should not set user-agent header", () => {
    const headers = requestHeader(true, 10, undefined, false);
    expect(listHeaderKeys(headers)).toEqual([
      "content-type",
      "grpc-timeout",
      "x-grpc-web",
      "x-user-agent",
    ]);
    expect(headers.get("Grpc-Timeout")).toBe("10m");
  });

  it("should create request headers with compression", () => {
    const compressionMock: Compression = {
      name: "gzip",
      compress: (bytes: Uint8Array) => Promise.resolve(bytes),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      decompress: (bytes: Uint8Array, _: number) => Promise.resolve(bytes),
    };
    const headers = requestHeaderWithCompression(
      true,
      undefined,
      undefined,
      [compressionMock],
      compressionMock,
      true,
    );
    expect(listHeaderKeys(headers)).toEqual([
      "content-type",
      "grpc-accept-encoding",
      "grpc-encoding",
      "user-agent",
      "x-grpc-web",
      "x-user-agent",
    ]);
    expect(headers.get(headerEncoding)).toBe(compressionMock.name);
    expect(headers.get(headerAcceptEncoding)).toBe(compressionMock.name);
  });
});
