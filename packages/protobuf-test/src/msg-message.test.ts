import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { MessageFieldMessage } from "./gen/extra/msg-message_pb";
import { describeMT } from "./helpers.js";

describeMT(MessageFieldMessage, (messageType) => {
  const defaultFields: PlainMessage<MessageFieldMessage> = {
    repeatedMessageField: [],
  };
  const defaultJson: JsonValue = {};
  const exampleFields = {
    messageField: { name: "test" },
    repeatedMessageField: [{ name: "a" }, { name: "b" }],
  };
  const exampleJson: JsonValue = {
    messageField: { name: "test" },
    repeatedMessageField: [{ name: "a" }, { name: "b" }],
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
    const got = messageType.fromJson(defaultJson);
    expect(got.messageField?.name).toStrictEqual(
      defaultFields.messageField?.name
    );
    expect(got.repeatedMessageField.length).toStrictEqual(
      defaultFields.repeatedMessageField.length
    );
  });
  test("example encodes to JSON", () => {
    /* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access */
    const got = new messageType(exampleFields).toJson();
    expect((got as any).messageField?.name).toStrictEqual(
      (exampleJson as any).messageField?.name
    );
    expect((got as any).repeatedMessageField.length).toStrictEqual(
      (exampleJson as any).repeatedMessageField.length
    );
    expect((got as any).repeatedMessageField[0].name).toStrictEqual(
      (exampleJson as any).repeatedMessageField[0].name
    );
    expect((got as any).repeatedMessageField[1].name).toStrictEqual(
      (exampleJson as any).repeatedMessageField[1].name
    );
  });
  test("example decodes from JSON", () => {
    const got = messageType.fromJson(exampleJson);
    expect(got.messageField?.name).toStrictEqual(
      exampleFields.messageField.name
    );
    expect(got.repeatedMessageField.length).toStrictEqual(
      exampleFields.repeatedMessageField.length
    );
    expect(got.repeatedMessageField[0].name).toStrictEqual(
      exampleFields.repeatedMessageField[0].name
    );
    expect(got.repeatedMessageField[1].name).toStrictEqual(
      exampleFields.repeatedMessageField[1].name
    );
  });
});
