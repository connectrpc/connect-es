import { Any, Struct, TypeRegistry, Value } from "@bufbuild/protobuf";

describe(Any.typeName, () => {
  const typeRegistry = TypeRegistry.fromTypes(Struct, Value);

  test(`encodes ${Struct.typeName} to JSON`, () => {
    const str = new Struct({
      fields: {
        foo: { kind: { case: "numberValue", value: 1 } },
      },
    });
    const got = Any.pack(str).toJson({
      typeRegistry,
    });
    expect(got).toStrictEqual({
      "@type": "type.googleapis.com/google.protobuf.Struct",
      value: { foo: 1 },
    });
  });

  test(`encodes ${Value.typeName} to JSON`, () => {
    const val = new Value({
      kind: { case: "numberValue", value: 1 },
    });
    const got = Any.pack(val).toJson({
      typeRegistry,
    });
    expect(got).toStrictEqual({
      "@type": "type.googleapis.com/google.protobuf.Value",
      value: 1,
    });
  });

  test(`encodes ${Value.typeName} with ${Struct.typeName} to JSON`, () => {
    const want = {
      "@type": "type.googleapis.com/google.protobuf.Value",
      value: {
        foo: 1,
      },
    };
    const got = Any.pack(
      new Value({
        kind: {
          case: "structValue",
          value: new Struct({
            fields: {
              foo: { kind: { case: "numberValue", value: 1 } },
            },
          }),
        },
      })
    ).toJson({ typeRegistry });
    expect(got).toStrictEqual(want);
  });

  test(`decodes ${Value.typeName} from JSON`, () => {
    const want = new Value({
      kind: { case: "numberValue", value: 1 },
    });
    const any = Any.fromJson(
      {
        "@type": "type.googleapis.com/google.protobuf.Value",
        value: 1,
      },
      { typeRegistry }
    );
    const got = new Value();
    expect(any.unpackTo(got)).toBe(true);
    expect(got).toStrictEqual(want);
  });
});
