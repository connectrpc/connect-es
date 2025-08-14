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

import type { Compression } from "../protocol/index.js";
import {
  requestHeader,
  requestHeaderWithCompression,
} from "./request-header.js";
import {
  headerStreamAcceptEncoding,
  headerStreamEncoding,
  headerUnaryAcceptEncoding,
  headerUnaryEncoding,
} from "./headers.js";

function listHeaderKeys(header: Headers): string[] {
  const keys: string[] = [];
  header.forEach((_, key) => keys.push(key));
  return keys.sort();
}

describe("requestHeader", () => {
  it("should create request headers", () => {
    const headers = requestHeader("unary", true, undefined, undefined, true);
    expect(listHeaderKeys(headers)).toEqual([
      "connect-protocol-version",
      "content-type",
      "user-agent",
    ]);
    expect(headers.get("Content-Type")).toBe("application/proto");
    expect(headers.get("Connect-Protocol-Version")).toBe("1");
    expect(headers.get("User-Agent")).toMatch(/^connect-es\/\d+\.\d+\.\d+/);
  });

  it("should create request headers with timeout", () => {
    const headers = requestHeader("unary", true, 10, undefined, true);
    expect(listHeaderKeys(headers)).toEqual([
      "connect-protocol-version",
      "connect-timeout-ms",
      "content-type",
      "user-agent",
    ]);
    expect(headers.get("Connect-Timeout-Ms")).toBe("10");
  });

  it("should create request headers with user provided user-agent", () => {
    const headers = requestHeader(
      "unary",
      true,
      10,
      { "User-Agent": "grpc-es/0.0.0" },
      true,
    );
    expect(listHeaderKeys(headers)).toEqual([
      "connect-protocol-version",
      "connect-timeout-ms",
      "content-type",
      "user-agent",
    ]);
    expect(headers.get("User-Agent")).toBe("grpc-es/0.0.0");
  });

  it("should exclude user-agent", () => {
    const headers = requestHeader("unary", true, undefined, undefined, false);
    expect(listHeaderKeys(headers)).toEqual([
      "connect-protocol-version",
      "content-type",
    ]);
  });
});

describe("requestHeaderWithCompression", () => {
  const compressionMock: Compression = {
    name: "gzip",
    compress: (bytes: Uint8Array) => Promise.resolve(new Uint8Array(bytes)),
    decompress: (bytes: Uint8Array, _: number) =>
      Promise.resolve(new Uint8Array(bytes)),
  };

  it("should create request headers with compression for unary request", () => {
    const headers = requestHeaderWithCompression(
      "unary",
      true,
      undefined,
      undefined,
      [compressionMock],
      compressionMock,
      true,
    );
    expect(listHeaderKeys(headers)).toEqual([
      "accept-encoding",
      "connect-protocol-version",
      "content-encoding",
      "content-type",
      "user-agent",
    ]);
    expect(headers.get(headerUnaryEncoding)).toBe(compressionMock.name);
    expect(headers.get(headerUnaryAcceptEncoding)).toBe(compressionMock.name);
  });

  it("should create request headers with compression for stream request", () => {
    const headers = requestHeaderWithCompression(
      "client_streaming",
      true,
      undefined,
      undefined,
      [compressionMock],
      compressionMock,
      true,
    );
    expect(listHeaderKeys(headers)).toEqual([
      "connect-accept-encoding",
      "connect-content-encoding",
      "connect-protocol-version",
      "content-type",
      "user-agent",
    ]);
    expect(headers.get(headerStreamEncoding)).toBe(compressionMock.name);
    expect(headers.get(headerStreamAcceptEncoding)).toBe(compressionMock.name);
  });
});
