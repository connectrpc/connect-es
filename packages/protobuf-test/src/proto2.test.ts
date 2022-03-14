import {
  Proto2DefaultsMessage,
  Proto2Enum,
  Proto2RequiredDefaultsMessage,
  Proto2RequiredMessage,
} from "./gen/extra/proto2_pb.js";
import { describeMT, testMT } from "./helpers.js";
import type { AnyMessage, Message } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";

function setDefaults(m: AnyMessage): void {
  for (const f of m.getType().fields.list()) {
    if (f.kind == "scalar" || f.kind == "enum") {
      m[f.localName] = f.default;
    }
  }
}

function verify<T extends Message>(m: T): boolean {
  return m
    .getType()
    .fields.list()
    .every((f) => f.opt || (m as AnyMessage)[f.localName] !== undefined);
}

describe("setDefaults", () => {
  testMT(Proto2DefaultsMessage, (messageType) => {
    const msg = new messageType();
    setDefaults(msg);
    expect(msg.stringField).toBe('hello " */ ');
    expect(msg.bytesField).toStrictEqual(
      new Uint8Array([
        0x00, 0x78, 0x5c, 0x78, 0x78, 0x41, 0x41, 0x41, 0x41, 0x41, 0x41, 0x08,
        0x0c, 0x0a, 0x0d, 0x09, 0x0b,
      ])
    );
    expect(msg.int32Field).toBe(128);
    expect(msg.int46Field).toBe(protoInt64.parse("-256"));
    expect(msg.floatField).toBe(-512.13);
    expect(msg.enumField).toBe(Proto2Enum.YES);
    expect(msg.messageField).toBe(undefined);
  });
});

describe("verify", () => {
  testMT(Proto2RequiredDefaultsMessage, (messageType) => {
    const msg = new messageType({
      messageField: {},
    });
    expect(verify(msg)).toBe(false);
    setDefaults(msg);
    expect(verify(msg)).toBe(true);
  });
});

describeMT(Proto2RequiredMessage, (messageType) => {
  test("has expected defaults", () => {
    const got = { ...new messageType() };
    expect(got).toStrictEqual({});
  });
  test("encode to JSON errors on missing required field", () => {
    expect(() =>
      new messageType({
        // enumField: Proto2Enum.PROTO2_ENUM_YES,
        messageField: {},
        bytesField: new Uint8Array(0),
        stringField: "",
      }).toJson()
    ).toThrow(
      `cannot encode field ${messageType.typeName}.enum_field to JSON: required field not set`
    );
  });
  test("encode to binary errors on missing required field", () => {
    expect(() =>
      new messageType({
        // enumField: Proto2Enum.PROTO2_ENUM_YES,
        messageField: {},
        bytesField: new Uint8Array(0),
        stringField: "",
      }).toBinary()
    ).toThrow(
      `cannot encode field ${messageType.typeName}.enum_field to JSON: required field not set`
    );
  });
});

describeMT(Proto2DefaultsMessage, (messageType) => {
  test("has no default values", () => {
    const got = { ...new messageType() };
    expect(got).toStrictEqual({});
  });
});
