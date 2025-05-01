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

import { ConnectError } from "../connect-error.js";
import { parseTimeout } from "./parse-timeout.js";

describe("parseTimeout()", () => {
  it("should parse proper timeout", () => {
    expect(parseTimeout("1", Number.MAX_SAFE_INTEGER)).toEqual({
      timeoutMs: 1,
    });
    expect(parseTimeout("1234567890", Number.MAX_SAFE_INTEGER)).toEqual({
      timeoutMs: 1234567890,
    });
    expect(parseTimeout("0", Number.MAX_SAFE_INTEGER)).toEqual({
      timeoutMs: 0,
    });
  });
  it("should should return undefined for null value", () => {
    const r = parseTimeout(null, Number.MAX_SAFE_INTEGER);
    expect(r.timeoutMs).toBeUndefined();
    expect(r.error).toBeUndefined();
  });
  it("should return a ConnectError for a value exceeding maxTimeoutMs", () => {
    expect(parseTimeout("1", 0).error?.message).toBe(
      "[invalid_argument] timeout 1ms must be <= 0",
    );
    expect(parseTimeout("1024", 1000).error?.message).toBe(
      "[invalid_argument] timeout 1024ms must be <= 1000",
    );
  });
  const invalidValues = ["100m", "1H", "-1", "1e+10", "", "12345678901", "foo"];
  for (const invalidValue of invalidValues) {
    it(`should should return a ConnectError for an incorrect value "${invalidValue}"`, () => {
      const r = parseTimeout(invalidValue, Number.MAX_SAFE_INTEGER);
      expect(r.timeoutMs).toBeUndefined();
      expect(r.error).toBeInstanceOf(ConnectError);
      if (r instanceof ConnectError) {
        expect(r.message).toBe(
          `protocol error: invalid connect timeout value: ${invalidValue}`,
        );
      }
    });
  }
});
