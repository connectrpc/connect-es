import { Timestamp } from "@bufbuild/protobuf";

describe(Timestamp.typeName, () => {
  test("now()", () => {
    const ts = Timestamp.now();
    expect(ts.seconds).toBeDefined();
  });

  test("fromDate()", () => {
    const a = new Date();
    const ts = Timestamp.fromDate(a);
    const b = ts.toDate();
    expect(b.getTime()).toBe(a.getTime());
  });
});
