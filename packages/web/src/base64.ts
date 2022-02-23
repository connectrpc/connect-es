/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unnecessary-condition, prefer-const */

// lookup table from base64 character to byte
let encTable =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");

// lookup table from base64 character *code* to byte because lookup by number is fast
let decTable: number[] = [];
for (let i = 0; i < encTable.length; i++)
  decTable[encTable[i].charCodeAt(0)] = i;

// support base64url variants
decTable["-".charCodeAt(0)] = encTable.indexOf("+");
decTable["_".charCodeAt(0)] = encTable.indexOf("/");

/**
 * Decodes a base64 string to a byte array.
 *
 * - ignores white-space, including line breaks and tabs
 * - allows inner padding (can decode concatenated base64 strings)
 * - does not require padding
 * - understands base64url encoding:
 *   "-" instead of "+",
 *   "_" instead of "/",
 *   no padding
 */
export function base64decode(base64Str: string): Uint8Array {
  // estimate byte size, not accounting for inner padding and whitespace
  let es = (base64Str.length * 3) / 4;
  // if (es % 3 !== 0)
  // throw new Error("invalid base64 string");
  if (base64Str[base64Str.length - 2] == "=") es -= 2;
  else if (base64Str[base64Str.length - 1] == "=") es -= 1;

  let bytes = new Uint8Array(es),
    bytePos = 0, // position in byte array
    groupPos = 0, // position in base64 group
    b, // current byte
    p = 0; // previous byte
  for (let i = 0; i < base64Str.length; i++) {
    b = decTable[base64Str.charCodeAt(i)];
    if (b === undefined) {
      switch (base64Str[i]) {
        // @ts-ignore TS7029: Fallthrough case in switch
        case "=":
          groupPos = 0; // reset state when padding found
        // @ts-ignore TS7029: Fallthrough case in switch
        case "\n":
        case "\r":
        case "\t":
        case " ":
          continue; // skip white-space, and padding
        default:
          throw Error("invalid base64 string.");
      }
    }
    switch (groupPos) {
      case 0:
        p = b;
        groupPos = 1;
        break;
      case 1:
        bytes[bytePos++] = (p << 2) | ((b & 48) >> 4);
        p = b;
        groupPos = 2;
        break;
      case 2:
        bytes[bytePos++] = ((p & 15) << 4) | ((b & 60) >> 2);
        p = b;
        groupPos = 3;
        break;
      case 3:
        bytes[bytePos++] = ((p & 3) << 6) | b;
        groupPos = 0;
        break;
    }
  }
  if (groupPos == 1) throw Error("invalid base64 string.");
  return bytes.subarray(0, bytePos);
}

/**
 * Encodes a byte array to a base64 string.
 * Adds padding at the end.
 * Does not insert newlines.
 */
export function base64encode(bytes: Uint8Array): string {
  let base64 = "",
    groupPos = 0, // position in base64 group
    b, // current byte
    p = 0; // carry over from previous byte

  for (let i = 0; i < bytes.length; i++) {
    b = bytes[i];
    switch (groupPos) {
      case 0:
        base64 += encTable[b >> 2];
        p = (b & 3) << 4;
        groupPos = 1;
        break;
      case 1:
        base64 += encTable[p | (b >> 4)];
        p = (b & 15) << 2;
        groupPos = 2;
        break;
      case 2:
        base64 += encTable[p | (b >> 6)];
        base64 += encTable[b & 63];
        groupPos = 0;
        break;
    }
  }

  // padding required?
  if (groupPos) {
    base64 += encTable[p];
    base64 += "=";
    if (groupPos == 1) base64 += "=";
  }

  return base64;
}
