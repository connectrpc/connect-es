import {
  varint32read,
  varint32write,
  varint64read,
  varint64write,
} from "./private/goog-varint.js";
import { assertFloat32, assertInt32, assertUInt32 } from "./private/assert.js";
import { protoInt64 } from "./proto-int64.js";

/* eslint-disable prefer-const,no-case-declarations,@typescript-eslint/restrict-plus-operands */

/**
 * Protobuf binary format wire types.
 *
 * A wire type provides just enough information to find the length of the
 * following value.
 *
 * See https://developers.google.com/protocol-buffers/docs/encoding#structure
 */
export enum WireType {
  /**
   * Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
   */
  Varint = 0,

  /**
   * Used for fixed64, sfixed64, double.
   * Always 8 bytes with little-endian byte order.
   */
  Bit64 = 1,

  /**
   * Used for string, bytes, embedded messages, packed repeated fields
   *
   * Only repeated numeric types (types which use the varint, 32-bit,
   * or 64-bit wire types) can be packed. In proto3, such fields are
   * packed by default.
   */
  LengthDelimited = 2,

  /**
   * Used for groups
   * @deprecated
   */
  StartGroup = 3,

  /**
   * Used for groups
   * @deprecated
   */
  EndGroup = 4,

  /**
   * Used for fixed32, sfixed32, float.
   * Always 4 bytes with little-endian byte order.
   */
  Bit32 = 5,
}

type TextEncoderLike = { encode(input?: string): Uint8Array };
type TextDecoderLike = { decode(input?: Uint8Array): string };

export interface IBinaryReader {
  /**
   * Current position.
   */
  readonly pos: number;

  /**
   * Number of bytes available in this reader.
   */
  readonly len: number;

  /**
   * Reads a tag - field number and wire type.
   */
  tag(): [number, WireType];

  /**
   * Skip one element on the wire and return the skipped data.
   */
  skip(wireType: WireType): Uint8Array;

  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  uint32(): number;

  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  int32(): number;

  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(): number;

  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64(): bigint | string;

  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(): bigint | string;

  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64(): bigint | string;

  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64(): bigint | string;

  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(): bigint | string;

  /**
   * Read a `bool` field, a variant.
   */
  bool(): boolean;

  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(): number;

  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32(): number;

  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float(): number;

  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double(): number;

  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes(): Uint8Array;

  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string(): string;
}

export interface IBinaryWriter {
  /**
   * Return all bytes written and reset this writer.
   */
  finish(): Uint8Array;

  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork(): IBinaryWriter;

  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join(): IBinaryWriter;

  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo: number, type: WireType): IBinaryWriter;

  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk: Uint8Array): IBinaryWriter;

  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value: number): IBinaryWriter;

  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value: number): IBinaryWriter;

  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value: number): IBinaryWriter;

  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `bool` value, a variant.
   */
  bool(value: boolean): IBinaryWriter;

  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value: number): IBinaryWriter;

  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value: number): IBinaryWriter;

  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value: number): IBinaryWriter;

  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value: number): IBinaryWriter;

  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value: Uint8Array): IBinaryWriter;

  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value: string): IBinaryWriter;
}

export class BinaryWriter implements IBinaryWriter {
  /**
   * We cannot allocate a buffer for the entire output
   * because we don't know it's size.
   *
   * So we collect smaller chunks of known size and
   * concat them later.
   *
   * Use `raw()` to push data to this array. It will flush
   * `buf` first.
   */
  private chunks: Uint8Array[];

  /**
   * A growing buffer for byte values. If you don't know
   * the size of the data you are writing, push to this
   * array.
   */
  protected buf: number[];

  /**
   * Previous fork states.
   */
  private stack: Array<{ chunks: Uint8Array[]; buf: number[] }> = [];

  /**
   * Text encoder instance to convert UTF-8 to bytes.
   */
  private readonly textEncoder: TextEncoderLike;

  constructor(textEncoder?: TextEncoderLike) {
    this.textEncoder = textEncoder ?? new TextEncoder();
    this.chunks = [];
    this.buf = [];
  }

  /**
   * Return all bytes written and reset this writer.
   */
  finish(): Uint8Array {
    this.chunks.push(new Uint8Array(this.buf)); // flush the buffer
    let len = 0;
    for (let i = 0; i < this.chunks.length; i++) len += this.chunks[i].length;
    let bytes = new Uint8Array(len);
    let offset = 0;
    for (let i = 0; i < this.chunks.length; i++) {
      bytes.set(this.chunks[i], offset);
      offset += this.chunks[i].length;
    }
    this.chunks = [];
    return bytes;
  }

  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork(): IBinaryWriter {
    this.stack.push({ chunks: this.chunks, buf: this.buf });
    this.chunks = [];
    this.buf = [];
    return this;
  }

  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join(): IBinaryWriter {
    // get chunk of fork
    let chunk = this.finish();

    // restore previous state
    let prev = this.stack.pop();
    if (!prev) throw new Error("invalid state, fork stack empty");
    this.chunks = prev.chunks;
    this.buf = prev.buf;

    // write length of chunk as varint
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }

  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo: number, type: WireType): IBinaryWriter {
    return this.uint32(((fieldNo << 3) | type) >>> 0);
  }

  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk: Uint8Array): IBinaryWriter {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    this.chunks.push(chunk);
    return this;
  }

  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value: number): IBinaryWriter {
    assertUInt32(value);

    // write value as varint 32, inlined for speed
    while (value > 0x7f) {
      this.buf.push((value & 0x7f) | 0x80);
      value = value >>> 7;
    }
    this.buf.push(value);

    return this;
  }

  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value: number): IBinaryWriter {
    assertInt32(value);
    varint32write(value, this.buf);
    return this;
  }

  /**
   * Write a `bool` value, a variant.
   */
  bool(value: boolean): IBinaryWriter {
    this.buf.push(value ? 1 : 0);
    return this;
  }

  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value: Uint8Array): IBinaryWriter {
    this.uint32(value.byteLength); // write length of chunk as varint
    return this.raw(value);
  }

  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value: string): IBinaryWriter {
    let chunk = this.textEncoder.encode(value);
    this.uint32(chunk.byteLength); // write length of chunk as varint
    return this.raw(chunk);
  }

  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value: number): IBinaryWriter {
    assertFloat32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setFloat32(0, value, true);
    return this.raw(chunk);
  }

  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value: number): IBinaryWriter {
    let chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setFloat64(0, value, true);
    return this.raw(chunk);
  }

  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value: number): IBinaryWriter {
    assertUInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setUint32(0, value, true);
    return this.raw(chunk);
  }

  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value: number): IBinaryWriter {
    assertInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setInt32(0, value, true);
    return this.raw(chunk);
  }

  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value: number): IBinaryWriter {
    assertInt32(value);
    // zigzag encode
    value = ((value << 1) ^ (value >> 31)) >>> 0;
    varint32write(value, this.buf);
    return this;
  }

  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value: string | number | bigint): IBinaryWriter {
    let chunk = new Uint8Array(8),
      view = new DataView(chunk.buffer),
      tc = protoInt64.enc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }

  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value: string | number | bigint): IBinaryWriter {
    let chunk = new Uint8Array(8),
      view = new DataView(chunk.buffer),
      tc = protoInt64.uEnc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }

  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value: string | number | bigint): IBinaryWriter {
    let tc = protoInt64.enc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }

  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value: string | number | bigint): IBinaryWriter {
    let tc = protoInt64.enc(value),
      // zigzag encode
      sign = tc.hi >> 31,
      lo = (tc.lo << 1) ^ sign,
      hi = ((tc.hi << 1) | (tc.lo >>> 31)) ^ sign;
    varint64write(lo, hi, this.buf);
    return this;
  }

  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value: string | number | bigint): IBinaryWriter {
    let tc = protoInt64.uEnc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
}

export class BinaryReader implements IBinaryReader {
  /**
   * Current position.
   */
  pos: number;

  /**
   * Number of bytes available in this reader.
   */
  readonly len: number;

  private readonly buf: Uint8Array;
  private readonly view: DataView;
  private readonly textDecoder: TextDecoderLike;

  constructor(buf: Uint8Array, textDecoder?: TextDecoderLike) {
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    this.textDecoder = textDecoder ?? new TextDecoder();
  }

  /**
   * Reads a tag - field number and wire type.
   */
  tag(): [number, WireType] {
    let tag = this.uint32(),
      fieldNo = tag >>> 3,
      wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5)
      throw new Error(
        "illegal tag: field no " + fieldNo + " wire type " + wireType
      );
    return [fieldNo, wireType];
  }

  /**
   * Skip one element on the wire and return the skipped data.
   * Supports WireType.StartGroup since v2.0.0-alpha.23.
   */
  skip(wireType: WireType): Uint8Array {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 0x80) {
          // ignore
        }
        break;
      // eslint-disable-next-line
      // @ts-ignore TS7029: Fallthrough case in switch
      case WireType.Bit64:
        this.pos += 4;
      // eslint-disable-next-line
      // @ts-ignore TS7029: Fallthrough case in switch
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        // From descriptor.proto: Group type is deprecated, not supported in proto3.
        // But we must still be able to parse and treat as unknown.
        let t: WireType;
        while ((t = this.tag()[1]) !== WireType.EndGroup) {
          this.skip(t);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }

  protected varint64 = varint64read as () => [number, number]; // dirty cast for `this`

  /**
   * Throws error if position in byte array is out of range.
   */
  protected assertBounds(): void {
    if (this.pos > this.len) throw new RangeError("premature EOF");
  }

  /**
   * Read a `uint32` field, an unsigned 32 bit varint.
   */
  uint32 = varint32read as IBinaryReader["uint32"]; // dirty cast for `this` and access to protected `buf`

  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32(): number {
    return this.uint32() | 0;
  }

  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(): number {
    let zze = this.uint32();
    // decode zigzag
    return (zze >>> 1) ^ -(zze & 1);
  }

  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64(): bigint | string {
    return protoInt64.dec(...this.varint64());
  }

  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64(): bigint | string {
    return protoInt64.uDec(...this.varint64());
  }

  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(): bigint | string {
    let [lo, hi] = this.varint64();
    // decode zig zag
    let s = -(lo & 1);
    lo = ((lo >>> 1) | ((hi & 1) << 31)) ^ s;
    hi = (hi >>> 1) ^ s;
    return protoInt64.dec(lo, hi);
  }

  /**
   * Read a `bool` field, a variant.
   */
  bool(): boolean {
    let [lo, hi] = this.varint64();
    return lo !== 0 || hi !== 0;
  }

  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(): number {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }

  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32(): number {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }

  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(): bigint | string {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }

  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64(): bigint | string {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }

  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float(): number {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }

  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double(): number {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }

  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes(): Uint8Array {
    let len = this.uint32(),
      start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }

  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string(): string {
    return this.textDecoder.decode(this.bytes());
  }
}
