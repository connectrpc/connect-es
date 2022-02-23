import { WrappersMessage } from "./gen/extra/wkt-wrappers_pb.js";
import { describeMT } from "./helpers";

describeMT(WrappersMessage, (messageType) => {
  test("wrapper field is unset by default", () => {
    const w = new messageType();
    expect(w.boolValueField).toBeUndefined();
  });
  test("wrapper field is accepted in constructor", () => {
    const w = new messageType({
      boolValueField: true,
    });
    expect(w.boolValueField).toBe(true);
  });
  test("unset wrapper field is omitted in JSON", () => {
    const w = new messageType();
    const got = w.toJsonString();
    const want = `{}`;
    expect(got).toBe(want);
  });
  test("set wrapper field is not omitted in JSON", () => {
    const w = new messageType({
      boolValueField: true,
    });
    const got = w.toJsonString();
    const want = `{"boolValueField":true}`;
    expect(got).toBe(want);
  });
});
