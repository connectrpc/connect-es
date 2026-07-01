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
import { ConnectError } from "../connect-error.js";
import { parseTimeout } from "./parse-timeout.js";

describe("parseTimeout()", () => {
  it("should parse proper timeout", () => {
    assert.deepStrictEqual(parseTimeout("1H", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 3600000,
    });
    assert.deepStrictEqual(parseTimeout("1M", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 60000,
    });
    assert.deepStrictEqual(parseTimeout("1S", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 1000,
    });
    assert.deepStrictEqual(parseTimeout("12345678m", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 12345678,
    });
    assert.deepStrictEqual(parseTimeout("1m", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 1,
    });
    assert.deepStrictEqual(parseTimeout("1000u", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 1,
    });
    assert.deepStrictEqual(parseTimeout("1000000n", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 1,
    });
    assert.deepStrictEqual(parseTimeout("0n", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 0,
    });
    assert.deepStrictEqual(parseTimeout("0H", Number.MAX_SAFE_INTEGER), {
      timeoutMs: 0,
    });
  });
  it("should should return undefined for null value", () => {
    const r = parseTimeout(null, Number.MAX_SAFE_INTEGER);
    assert.strictEqual(r.timeoutMs, undefined);
    assert.strictEqual(r.error, undefined);
  });
  it("should return a ConnectError for a value exceeding maxTimeoutMs", () => {
    assert.strictEqual(
      parseTimeout("1m", 0).error?.message,
      "[invalid_argument] timeout 1ms must be <= 0",
    );
    assert.strictEqual(
      parseTimeout("1024m", 1000).error?.message,
      "[invalid_argument] timeout 1024ms must be <= 1000",
    );
    assert.strictEqual(
      parseTimeout("1S", 999).error?.message,
      "[invalid_argument] timeout 1000ms must be <= 999",
    );
  });
  const invalidValues = [
    "1",
    "-1m",
    "HH",
    "123456789m",
    "12345678",
    "1H1H",
    "foo",
    "1X",
  ];
  for (const invalidValue of invalidValues) {
    it(`should should return a ConnectError for an incorrect value "${invalidValue}"`, () => {
      const r = parseTimeout(invalidValue, Number.MAX_SAFE_INTEGER);
      assert.strictEqual(r.timeoutMs, undefined);
      assert.ok(r.error instanceof ConnectError);
      if (r instanceof ConnectError) {
        assert.strictEqual(
          r.message,
          `protocol error: invalid grpc timeout value: ${invalidValue}`,
        );
      }
    });
  }
});
