// Copyright 2021-2026 The Connect Authors
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

import { describe, it } from "node:test";
import * as assert from "node:assert";
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
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "connect-protocol-version",
      "content-type",
      "user-agent",
    ]);
    assert.strictEqual(headers.get("Content-Type"), "application/proto");
    assert.strictEqual(headers.get("Connect-Protocol-Version"), "1");
    // The user-agent placeholder is replaced with the actual version at build
    // time (see scripts/update-user-agent.mjs); these tests run against source.
    assert.strictEqual(headers.get("User-Agent"), "CONNECT_ES_USER_AGENT");
  });

  it("should create request headers with timeout", () => {
    const headers = requestHeader("unary", true, 10, undefined, true);
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "connect-protocol-version",
      "connect-timeout-ms",
      "content-type",
      "user-agent",
    ]);
    assert.strictEqual(headers.get("Connect-Timeout-Ms"), "10");
  });

  it("should create request headers with user provided user-agent", () => {
    const headers = requestHeader(
      "unary",
      true,
      10,
      { "User-Agent": "grpc-es/0.0.0" },
      true,
    );
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "connect-protocol-version",
      "connect-timeout-ms",
      "content-type",
      "user-agent",
    ]);
    assert.strictEqual(headers.get("User-Agent"), "grpc-es/0.0.0");
  });

  it("should exclude user-agent", () => {
    const headers = requestHeader("unary", true, undefined, undefined, false);
    assert.deepStrictEqual(listHeaderKeys(headers), [
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
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "accept-encoding",
      "connect-protocol-version",
      "content-encoding",
      "content-type",
      "user-agent",
    ]);
    assert.strictEqual(headers.get(headerUnaryEncoding), compressionMock.name);
    assert.strictEqual(
      headers.get(headerUnaryAcceptEncoding),
      compressionMock.name,
    );
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
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "connect-accept-encoding",
      "connect-content-encoding",
      "connect-protocol-version",
      "content-type",
      "user-agent",
    ]);
    assert.strictEqual(headers.get(headerStreamEncoding), compressionMock.name);
    assert.strictEqual(
      headers.get(headerStreamAcceptEncoding),
      compressionMock.name,
    );
  });
});
