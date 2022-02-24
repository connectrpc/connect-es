import { FieldMask } from "@bufbuild/protobuf";

describe(FieldMask.typeName, () => {
  const fieldMask = new FieldMask({
    paths: ["user.display_name", "photo"],
  });
  const json = "user.displayName,photo";
  test("encodes to JSON", () => {
    expect(fieldMask.toJson()).toBe(json);
  });
  test("decodes from JSON", () => {
    const want = new FieldMask({
      paths: ["user.display_name", "photo"],
    });
    expect(FieldMask.fromJson(json)).toStrictEqual(want);
  });
});
