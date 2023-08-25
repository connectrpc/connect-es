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

import { MethodKind } from "@bufbuild/protobuf";
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
    const headers = requestHeader(MethodKind.Unary, true, undefined, undefined);
    expect(listHeaderKeys(headers)).toEqual([
      "connect-protocol-version",
      "content-type",
      "user-agent",
    ]);
    expect(headers.get("Content-Type")).toBe("application/proto");
    expect(headers.get("Connect-Protocol-Version")).toBe("1");
    expect(headers.get("User-Agent")).toMatch(/^connect-es\/\d+\.\d+\.\d+$/);
  });

  it("should create request headers with timeout", () => {
    const headers = requestHeader(MethodKind.Unary, true, 10, undefined);
    expect(listHeaderKeys(headers)).toEqual([
      "connect-protocol-version",
      "connect-timeout-ms",
      "content-type",
      "user-agent",
    ]);
    expect(headers.get("Connect-Timeout-Ms")).toBe("10");
  });
});

describe("requestHeaderWithCompression", () => {
  const compressionMock: Compression = {
    name: "gzip",
    compress: (bytes: Uint8Array) => Promise.resolve(bytes),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decompress: (bytes: Uint8Array, _: number) => Promise.resolve(bytes),
  };

  it("should create request headers with compression for unary request", () => {
    const headers = requestHeaderWithCompression(
      MethodKind.Unary,
      true,
      undefined,
      undefined,
      [compressionMock],
      compressionMock,
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
      MethodKind.ClientStreaming,
      true,
      undefined,
      undefined,
      [compressionMock],
      compressionMock,
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
