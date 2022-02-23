import { TestAllTypesProto3 } from "../../gen/google/protobuf/test_messages_proto3_pb.js";
import { describeMT } from "../../helpers.js";
import type {
  JsonValue,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf";

describeMT(TestAllTypesProto3, (messageType) => {
  test("defaults encodes to JSON", () => {
    const got: JsonValue = new messageType().toJson();
    const want: JsonValue = {};
    expect(got).toStrictEqual(want);
  });
  test("defaults decodes from JSON", () => {
    const got: PlainMessage<TestAllTypesProto3> = {
      ...messageType.fromJson({}),
    };
    const want: PartialMessage<TestAllTypesProto3> = { ...new messageType() };
    expect(got).toStrictEqual(want);
  });
});
