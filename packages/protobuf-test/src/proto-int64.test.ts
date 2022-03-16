// Copyright 2021-2022 Buf Technologies, Inc.
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

import { protoInt64 } from "@bufbuild/protobuf";

describe("protoInt64", function () {
  test("negate example", () => {
    const message = {
      int64Field: protoInt64.parse("-123"),
    };
    // ---
    const t = protoInt64.enc(message.int64Field);
    t.hi = ~t.hi;
    if (t.lo) {
      t.lo = ~t.lo + 1;
    } else {
      t.hi += 1;
    }
    message.int64Field = protoInt64.dec(t.lo, t.hi);
    // ---
    expect(message.int64Field).toBe(protoInt64.parse("123"));
  });
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- conditional is very much necessary
  if (globalThis.BigInt === undefined) {
    describe("without BigInt support", () => {
      test("supported is false", () => {
        expect(protoInt64.supported).toBe(false);
      });
      test("zero is a string ", () => {
        expect(protoInt64.zero).toBe("0");
      });
      test("parse returns string", () => {
        expect(typeof protoInt64.parse("123")).toBe("string");
        expect(typeof protoInt64.parse(123)).toBe("string");
      });
      test("round trip", () => {
        const want = "123";
        const tc = protoInt64.enc(want);
        const got = protoInt64.dec(tc.lo, tc.hi) as unknown;
        expect(typeof got).toBe("string");
        if (typeof got === "string") {
          if (got !== want) {
            throw `got ${got}, want ${want}`;
          }
        }
      });
    });
  } else {
    describe("with BigInt support", () => {
      test("supported is true", () => {
        expect(protoInt64.supported).toBe(true);
      });
      test("zero is a bigint", () => {
        expect(protoInt64.zero).toBe(0n);
      });
      test("parse returns bigint", () => {
        expect(typeof protoInt64.parse("123")).toBe("bigint");
        expect(typeof protoInt64.parse(123)).toBe("bigint");
        expect(typeof protoInt64.parse(123n)).toBe("bigint");
      });
      test("encode throws on overflow", () => {
        const MIN = -9223372036854775808n;
        const MAX = 9223372036854775807n;
        const UMIN = 0n;
        const UMAX = 18446744073709551615n;
        expect(() => protoInt64.enc(MIN)).not.toThrow();
        expect(() => protoInt64.enc(MAX)).not.toThrow();
        expect(() => protoInt64.uEnc(UMIN)).not.toThrow();
        expect(() => protoInt64.uEnc(UMAX)).not.toThrow();
        expect(() => protoInt64.enc(MIN - 1n)).toThrow(
          "int64 invalid: -9223372036854775809"
        );
        expect(() => protoInt64.enc(MAX + 1n)).toThrow(
          "int64 invalid: 9223372036854775808"
        );
        expect(() => protoInt64.uEnc(UMIN - 1n)).toThrow("uint64 invalid: -1");
        expect(() => protoInt64.uEnc(UMAX + 1n)).toThrow(
          "uint64 invalid: 18446744073709551616"
        );
      });
      test("round trip", () => {
        const want = 123n;
        const tc = protoInt64.enc(want);
        const got = protoInt64.dec(tc.lo, tc.hi);
        if (got !== want) {
          throw `got ${got}, want ${want}`;
        }
      });
    });
  }
});
