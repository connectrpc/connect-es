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
import { fromJson, toJson } from "@bufbuild/protobuf";
import { decodeBinaryHeader, encodeBinaryHeader } from "./http-headers.js";
import { StructSchema } from "@bufbuild/protobuf/wkt";

describe("encodeBinaryHeader()", () => {
  it("accepts unicode string", () => {
    const input = "👋";
    const encoded = encodeBinaryHeader(input);
    assert.strictEqual(encoded, "8J+Riw");
  });
  it("accepts Uint8Array", () => {
    const input = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    const encoded = encodeBinaryHeader(input);
    assert.strictEqual(encoded, "3q2+7w");
  });
  it("accepts message", () => {
    const input = fromJson(StructSchema, {
      a: "abc",
      b: 456,
      c: true,
    });
    const encoded = encodeBinaryHeader(input, StructSchema);
    assert.strictEqual(
      encoded,
      "CgoKAWESBRoDYWJjCg4KAWISCREAAAAAAIB8QAoHCgFjEgIgAQ",
    );
  });
});

describe("decodeBinaryHeader()", () => {
  it("decodes Uint8Array with padding", () => {
    const decoded = decodeBinaryHeader("3q2+7w==");
    assert.ok(decoded instanceof Uint8Array);
    assert.deepStrictEqual(decoded, new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
  });
  it("decodes Uint8Array without padding", () => {
    const decoded = decodeBinaryHeader("3q2+7w");
    assert.ok(decoded instanceof Uint8Array);
    assert.deepStrictEqual(decoded, new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
  });
  it("decodes message", () => {
    const decoded = toJson(
      StructSchema,
      decodeBinaryHeader(
        "CgoKAWESBRoDYWJjCg4KAWISCREAAAAAAIB8QAoHCgFjEgIgAQ",
        StructSchema,
      ),
    ) as Record<string, unknown>; // Otherwise TS can't compute the type in expect
    assert.deepStrictEqual(decoded, {
      a: "abc",
      b: 456,
      c: true,
    });
  });
  it("throws error on invalid base64 input", () => {
    const encoded = "not-base-64-😞";
    assert.throws(() => decodeBinaryHeader(encoded), {
      message: "[data_loss] invalid base64 string",
    });
  });
  it("throws error on invalid message input", () => {
    assert.throws(() => decodeBinaryHeader("3q2+7w==", StructSchema), {
      message: "[data_loss] premature EOF",
    });
  });
});
