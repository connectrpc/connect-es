import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { describeMT } from "./helpers.js";
import { OneofMessage, OneofMessageFoo } from "./gen/extra/msg-oneof_pb.js";

describeMT(OneofMessage, (messageType) => {
  const messageField11 = messageType.fields.find(11);
  if (!messageField11) {
    throw new Error();
  }
  if (messageField11.kind !== "message") {
    throw new Error();
  }
  const defaultFields: PlainMessage<OneofMessage> = {
    message: { case: undefined },
    scalar: { case: undefined },
    enum: { case: undefined },
  };
  const defaultJson: JsonValue = {};
  const fooValue = new messageField11.T({
    name: "max",
    toggle: false,
  }) as OneofMessageFoo;
  const exampleFields: PlainMessage<OneofMessage> = {
    message: { case: "foo", value: fooValue },
    scalar: { case: undefined },
    enum: { case: undefined },
  };
  const exampleJson: JsonValue = {
    foo: { name: "max" },
  };
  test("has expected defaults", () => {
    const got = { ...new messageType() };
    expect(got).toStrictEqual(defaultFields);
  });
  test("defaults encodes to JSON", () => {
    const got = new messageType().toJson();
    expect(got).toStrictEqual(defaultJson);
  });
  test("defaults decodes from JSON", () => {
    const got = { ...messageType.fromJson(defaultJson) };
    expect(got).toStrictEqual(defaultFields);
  });
  test("example encodes to JSON", () => {
    const got = new messageType(exampleFields).toJson();
    expect(got).toStrictEqual(exampleJson);
  });
  test("example decodes from JSON", () => {
    const got = { ...messageType.fromJson(exampleJson) };
    expect(got).toStrictEqual(exampleFields);
  });
});
