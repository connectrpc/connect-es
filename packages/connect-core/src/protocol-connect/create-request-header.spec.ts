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
import type { Compression } from "../compression.js";
import {
  createRequestHeader,
  createRequestHeaderWithCompression,
} from "./create-request-header.js";
import {
  headerStreamAcceptEncoding,
  headerStreamEncoding,
  headerUnaryAcceptEncoding,
  headerUnaryEncoding,
} from "./headers.js";

describe("createRequestHeader", () => {
  it("should create request headers", () => {
    const headers = createRequestHeader(
      MethodKind.Unary,
      true,
      undefined,
      undefined
    );
    expect(headers instanceof Headers).toBe(true);
    expect(headers.get("Content-Type")).toBe("application/proto");
    expect(headers.get("Connect-Protocol-Version")).toBe("1");
  });

  it("should create request headers with timeout", () => {
    const headers = createRequestHeader(MethodKind.Unary, true, 10, undefined);
    expect(headers instanceof Headers).toBe(true);
    expect(headers.get("Connect-Timeout-Ms")).toBe("10");
  });
});

describe("createRequestHeaderWithCompression", () => {
  const compressionMock: Compression = {
    name: "gzip",
    compress: (bytes: Uint8Array) => Promise.resolve(bytes),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decompress: (bytes: Uint8Array, _: number) => Promise.resolve(bytes),
  };

  it("should create request headers with compression for unary request", () => {
    const headers = createRequestHeaderWithCompression(
      MethodKind.Unary,
      true,
      undefined,
      undefined,
      [compressionMock.name],
      compressionMock
    );
    expect(headers instanceof Headers).toBe(true);
    expect(headers.get(headerUnaryEncoding)).toBe(compressionMock.name);
    expect(headers.get(headerUnaryAcceptEncoding)).toBe(compressionMock.name);
  });

  it("should create request headers with compression for stream request", () => {
    const headers = createRequestHeaderWithCompression(
      MethodKind.ClientStreaming,
      true,
      undefined,
      undefined,
      [compressionMock.name],
      compressionMock
    );
    expect(headers instanceof Headers).toBe(true);
    expect(headers.get(headerStreamEncoding)).toBe(compressionMock.name);
    expect(headers.get(headerStreamAcceptEncoding)).toBe(compressionMock.name);
  });
});
