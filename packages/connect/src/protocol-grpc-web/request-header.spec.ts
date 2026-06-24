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
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "user-agent",
      "x-grpc-web",
      "x-user-agent",
    ]);
    assert.strictEqual(
      headers.get("Content-Type"),
      "application/grpc-web+proto",
    );
    // The user-agent placeholder is replaced with the actual version at build
    // time (see scripts/update-user-agent.mjs); these tests run against source.
    assert.strictEqual(headers.get("X-User-Agent"), "CONNECT_ES_USER_AGENT");
    assert.strictEqual(headers.get("User-Agent"), "CONNECT_ES_USER_AGENT");
    assert.strictEqual(headers.get("X-Grpc-Web"), "1");
  });

  it("should create request headers with timeout", () => {
    const headers = requestHeader(true, 10, undefined, true);
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "grpc-timeout",
      "user-agent",
      "x-grpc-web",
      "x-user-agent",
    ]);
    assert.strictEqual(headers.get("Grpc-Timeout"), "10m");
  });

  it("should not set user-agent header", () => {
    const headers = requestHeader(true, 10, undefined, false);
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "grpc-timeout",
      "x-grpc-web",
      "x-user-agent",
    ]);
    assert.strictEqual(headers.get("Grpc-Timeout"), "10m");
  });

  it("should set user provided user-agent header", () => {
    const headers = requestHeader(
      true,
      10,
      { "User-Agent": "grpc-es/0.0.0" },
      true,
    );
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "grpc-timeout",
      "user-agent",
      "x-grpc-web",
      "x-user-agent",
    ]);
    assert.strictEqual(headers.get("User-Agent"), "grpc-es/0.0.0");
    assert.strictEqual(headers.get("X-User-Agent"), "grpc-es/0.0.0");
  });

  it("should set user provided x-user-agent header", () => {
    const headers = requestHeader(
      true,
      10,
      { "X-User-Agent": "grpc-es/0.0.0" },
      true,
    );
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "grpc-timeout",
      "user-agent",
      "x-grpc-web",
      "x-user-agent",
    ]);
    assert.strictEqual(headers.get("User-Agent"), "grpc-es/0.0.0");
    assert.strictEqual(headers.get("X-User-Agent"), "grpc-es/0.0.0");
  });

  it("should create request headers with compression", () => {
    const compressionMock: Compression = {
      name: "gzip",
      compress: (bytes: Uint8Array) => Promise.resolve(new Uint8Array(bytes)),
      decompress: (bytes: Uint8Array, _: number) =>
        Promise.resolve(new Uint8Array(bytes)),
    };
    const headers = requestHeaderWithCompression(
      true,
      undefined,
      undefined,
      [compressionMock],
      compressionMock,
      true,
    );
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "grpc-accept-encoding",
      "grpc-encoding",
      "user-agent",
      "x-grpc-web",
      "x-user-agent",
    ]);
    assert.strictEqual(headers.get(headerEncoding), compressionMock.name);
    assert.strictEqual(headers.get(headerAcceptEncoding), compressionMock.name);
  });
});
