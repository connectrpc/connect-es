// Copyright 2020-2022 Buf Technologies, Inc.
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

import { int64fromString, int64toString } from "./google/varint.js";

/**
 * We use the `bigint` primitive to represent 64-bit integral types. If bigint
 * is unavailable, we fall back to a string representation, which means that
 * all values typed as `bigint` will actually be strings.
 *
 * If your code is intended to run in an environment where bigint may be
 * unavailable, it must handle both the bigint and the string representation.
 * For presenting values, this is straight-forward with implicit or explicit
 * conversion to string:
 *
 * ```ts
 * let el = document.createElement("span");
 * el.innerText = message.int64Field; // assuming a protobuf int64 field
 *
 * console.log(`int64: ${message.int64Field}`);
 *
 * let str: string = message.int64Field.toString();
 * ```
 *
 * If you need to manipulate 64-bit integral values and are sure the values
 * can be safely represented as an IEEE-754 double precision number, you can
 * convert to a JavaScript Number:
 *
 * ```ts
 * console.log(message.int64Field.toString())
 * let num = Number(message.int64Field);
 * num = num + 1;
 * message.int64Field = protoInt64.parse(num);
 * ```
 *
 * If you need to manipulate 64-bit integral values that are outside the
 * range of safe representation as Number, you can work with the two's
 * complement directly. The following example negates a field value:
 *
 * ```ts
 * let t = protoInt64.enc(message.int64Field);
 * t.hi = ~t.hi;
 * if (t.lo) {
 *     t.lo = ~t.lo + 1;
 * } else {
 *     t.hi += 1;
 * }
 * message.int64Field = protoInt64.dec(t.lo, t.hi);
 * ```
 *
 * There are several 3rd party libraries that provide arithmetic operations
 * on a two's complement, for example the npm package "long".
 */
interface Int64Support {
  /**
   * 0n if bigint is available, "0" if unavailable.
   */
  readonly zero: bigint;

  /**
   * Is bigint available?
   */
  readonly supported: boolean;

  /**
   * Parse a signed 64-bit integer.
   * Returns a bigint if available, a string otherwise.
   */
  parse(value: string | number | bigint): bigint;

  /**
   * Parse an unsigned 64-bit integer.
   * Returns a bigint if available, a string otherwise.
   */
  uParse(value: string | number | bigint): bigint;

  /**
   * Convert a signed 64-bit integral value to a two's complement.
   */
  enc(value: string | number | bigint): { lo: number; hi: number };

  /**
   * Convert an unsigned 64-bit integral value to a two's complement.
   */
  uEnc(value: string | number | bigint): { lo: number; hi: number };

  /**
   * Convert a two's complement to a signed 64-bit integral value.
   * Returns a bigint if available, a string otherwise.
   */
  dec(lo: number, hi: number): bigint;

  /**
   * Convert a two's complement to an unsigned 64-bit integral value.
   * Returns a bigint if available, a string otherwise.
   */
  uDec(lo: number, hi: number): bigint;
}

function makeInt64Support(): Int64Support {
  const dv = new DataView(new ArrayBuffer(8));
  // note that Safari 14 implements BigInt, but not the DataView methods
  const ok =
    globalThis.BigInt !== undefined && // eslint-disable-line @typescript-eslint/no-unnecessary-condition -- conditional for BigInt is very much necessary
    typeof dv.getBigInt64 === "function" &&
    typeof dv.getBigUint64 === "function" &&
    typeof dv.setBigInt64 === "function" &&
    typeof dv.setBigUint64 === "function";
  if (ok) {
    const MIN = BigInt("-9223372036854775808"),
      MAX = BigInt("9223372036854775807"),
      UMIN = BigInt("0"),
      UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value: string | number | bigint): bigint {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > MAX || bi < MIN) {
          throw new Error(`int64 invalid: ${value}`);
        }
        return bi;
      },
      uParse(value: string | number | bigint): bigint {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > UMAX || bi < UMIN) {
          throw new Error(`uint64 invalid: ${value}`);
        }
        return bi;
      },
      enc(value: string | number | bigint): { lo: number; hi: number } {
        dv.setBigInt64(0, this.parse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true),
        };
      },
      uEnc(value: string | number | bigint): { lo: number; hi: number } {
        dv.setBigInt64(0, this.uParse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true),
        };
      },
      dec(lo: number, hi: number): bigint {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigInt64(0, true);
      },
      uDec(lo: number, hi: number): bigint {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigUint64(0, true);
      },
    };
  }
  return {
    zero: "0" as unknown as 0n,
    supported: false,
    parse(value: string): bigint {
      if (!/^-?[0-9]+$/.test(value)) {
        throw new Error(`int64 invalid: ${value}`);
      }
      return value as unknown as bigint;
    },
    uParse(value: string): bigint {
      if (!/^-?[0-9]+$/.test(value)) {
        throw new Error(`uint64 invalid: ${value}`);
      }
      return value as unknown as bigint;
    },
    enc(value: string | number | bigint): { lo: number; hi: number } {
      if (typeof value == "string") {
        if (!/^-?[0-9]+$/.test(value)) {
          throw new Error(`int64 invalid: ${value}`);
        }
      } else {
        value = value.toString(10);
      }
      const [, lo, hi] = int64fromString(value);
      return { lo, hi };
    },
    uEnc(value: string | number | bigint): { lo: number; hi: number } {
      if (typeof value == "string") {
        if (!/^-?[0-9]+$/.test(value)) {
          throw new Error(`uint64 invalid: ${value}`);
        }
      } else {
        value = value.toString(10);
      }
      const [minus, lo, hi] = int64fromString(value);
      if (minus) {
        throw new Error(`uint64 invalid: ${value}`);
      }
      return { lo, hi };
    },
    dec(lo: number, hi: number): bigint {
      const minus = (hi & 0x80000000) !== 0;
      if (minus) {
        // negate
        hi = ~hi;
        if (lo) {
          lo = ~lo + 1;
        } else {
          hi += 1;
        }
        return ("-" + int64toString(lo, hi)) as unknown as bigint;
      }
      return int64toString(lo, hi) as unknown as bigint;
    },
    uDec(lo: number, hi: number): bigint {
      return int64toString(lo, hi) as unknown as bigint;
    },
  };
}

export const protoInt64: Int64Support = makeInt64Support();
