// Copyright 2020-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
