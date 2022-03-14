import { MessageFieldMessage } from "./gen/extra/msg-message_pb";
import type { AnyMessage, Message, MessageType } from "@bufbuild/protobuf";
import { ScalarValuesMessage } from "./gen/extra/msg-scalar_pb.js";

describe("Message", () => {
  const message = new MessageFieldMessage() as Message;
  test("has methods", () => {
    const methodsCallable = message.toJsonString();
    expect(methodsCallable).not.toBeUndefined();
  });
  test("is assignable to AnyMessage", () => {
    const dynamicMessage: AnyMessage = message;
    const methodsCallable = dynamicMessage.toJsonString();
    expect(methodsCallable).not.toBeUndefined();
  });
  test("getType() returns MessageType<DynamicMessage>", () => {
    const messageMessageType: MessageType = message.getType();
    const message2 = messageMessageType.fromBinary(message.toBinary());
    const methodsCallable = message2.toJsonString();
    expect(methodsCallable).not.toBeUndefined();
  });
});

describe("AnyMessage", () => {
  const message = new MessageFieldMessage() as AnyMessage;
  test("has methods", () => {
    const methodsCallable = message.toJsonString();
    expect(methodsCallable).not.toBeUndefined();
  });
  test("is assignable to Message", () => {
    const dynamicMessage: Message = message;
    expect(dynamicMessage).not.toBeUndefined();
  });
  test("is not assignable to MessageFieldMessage", () => {
    // @ts-expect-error TS2741
    const dynamicMessage: MessageFieldMessage = message;
    expect(dynamicMessage).not.toBeUndefined();
  });
  test("getType() returns MessageType<DynamicMessage>", () => {
    const messageMessageType: MessageType = message.getType();
    const message2 = messageMessageType.fromBinary(message.toBinary());
    const methodsCallable = message2.toJsonString();
    expect(methodsCallable).not.toBeUndefined();
  });
  test("access field value", () => {
    const message = new ScalarValuesMessage() as AnyMessage;
    const f = message.getType().fields.find(5);
    if (f) {
      expect(message[f.localName]).toBe(0);
    }
  });
});
