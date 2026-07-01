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
import { headerEncoding, headerAcceptEncoding } from "./headers.js";

function listHeaderKeys(header: Headers): string[] {
  const keys: string[] = [];
  header.forEach((_, key) => keys.push(key));
  return keys.sort();
}

describe("requestHeader", () => {
  it("should create request headers", () => {
    const headers = requestHeader(true, undefined, undefined);
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "te",
      "user-agent",
    ]);
    assert.strictEqual(headers.get("Content-Type"), "application/grpc+proto");
    // The user-agent placeholder is replaced with the actual version at build
    // time (see scripts/update-user-agent.mjs); these tests run against source.
    assert.strictEqual(headers.get("User-Agent"), "CONNECT_ES_USER_AGENT");
  });

  it("should create request headers with timeout", () => {
    const headers = requestHeader(true, 10, undefined);
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "grpc-timeout",
      "te",
      "user-agent",
    ]);
    assert.strictEqual(headers.get("Grpc-Timeout"), "10m");
  });

  it("should create request headers with user provided user-agent", () => {
    const headers = requestHeader(true, 10, { "User-Agent": "grpc-es/0.0.0" });
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "grpc-timeout",
      "te",
      "user-agent",
    ]);
    assert.strictEqual(headers.get("User-Agent"), "grpc-es/0.0.0");
  });

  it("should create request headers with compression", () => {
    const compressionMock: Compression = {
      name: "gzip",
      compress: (bytes: Uint8Array) => Promise.resolve(new Uint8Array(bytes)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      decompress: (bytes: Uint8Array, _: number) =>
        Promise.resolve(new Uint8Array(bytes)),
    };
    const headers = requestHeaderWithCompression(
      true,
      undefined,
      undefined,
      [compressionMock],
      compressionMock,
    );
    assert.deepStrictEqual(listHeaderKeys(headers), [
      "content-type",
      "grpc-accept-encoding",
      "grpc-encoding",
      "te",
      "user-agent",
    ]);
    assert.strictEqual(headers.get(headerEncoding), compressionMock.name);
    assert.strictEqual(headers.get(headerAcceptEncoding), compressionMock.name);
  });
});
