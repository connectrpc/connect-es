import type { JsonObject } from "@bufbuild/protobuf";
import { Struct, Value } from "@bufbuild/protobuf";

describe(Value.typeName, () => {
  test("encodes to JSON", () => {
    const value = new Value({
      kind: { case: "boolValue", value: true },
    });
    expect(value.toJsonString()).toBe("true");
  });
  test("decodes from JSON", () => {
    const value = Value.fromJsonString("true");
    expect(value.kind.case).toBe("boolValue");
    expect(value.kind.value).toBe(true);
  });
  test("survives binary round trip", () => {
    const want = new Value({
      kind: { case: "boolValue", value: true },
    });
    const got = Value.fromBinary(want.toBinary());
    expect(got).toStrictEqual(want);
  });
});

describe(`${Value.typeName} with ${Struct.typeName} field`, () => {
  let json: JsonObject;
  let value: Value;
  beforeEach(() => {
    json = {
      foo: 1,
    };
    value = new Value({
      kind: {
        case: "structValue",
        value: new Struct({
          fields: {
            foo: { kind: { case: "numberValue", value: 1 } },
          },
        }),
      },
    });
  });
  test("encodes to JSON", () => {
    expect(value.toJson()).toStrictEqual(json);
  });
  test("decodes from JSON", () => {
    expect(Value.fromJson(json)).toStrictEqual(value);
  });
  test("survives binary round trip", () => {
    const got = Value.fromBinary(value.toBinary());
    expect(got).toStrictEqual(value);
  });
});

describe(Struct.typeName, () => {
  let json: JsonObject;
  let struct: Struct;
  beforeEach(() => {
    json = {
      a: 123,
      b: "abc",
    };
    struct = new Struct({
      fields: {
        a: {
          kind: { case: "numberValue", value: 123 },
        },
        b: {
          kind: { case: "stringValue", value: "abc" },
        },
      },
    });
  });
  test("encodes to JSON", () => {
    const got = struct.toJson();
    expect(got).toStrictEqual(json);
  });
  test("decodes from JSON", () => {
    const got = Struct.fromJson(json);
    expect(Object.keys(got.fields).length).toBe(
      Object.keys(struct.fields).length
    );
    expect(got.fields["a"].kind.case).toBe(struct.fields["a"].kind.case);
    expect(got.fields["a"].kind.value).toBe(struct.fields["a"].kind.value);
    expect(got.fields["b"].kind.case).toBe(struct.fields["b"].kind.case);
    expect(got.fields["b"].kind.value).toBe(struct.fields["b"].kind.value);
  });
  test("survives binary round trip", () => {
    const got = Struct.fromBinary(struct.toBinary());
    expect(got).toStrictEqual(struct);
  });
});
