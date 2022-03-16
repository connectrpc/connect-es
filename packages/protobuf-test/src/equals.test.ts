// Copyright 2021-2022 Buf Technologies, Inc.
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

import { MessageFieldMessage } from "./gen/extra/msg-message_pb.js";
import { ScalarValuesMessage } from "./gen/extra/msg-scalar_pb.js";
import { describeMT } from "./helpers.js";

describe("equals", function () {
  describeMT(MessageFieldMessage, (messageType) => {
    let a: MessageFieldMessage, b: MessageFieldMessage;
    beforeEach(() => {
      a = new messageType({
        messageField: { name: "test" },
        repeatedMessageField: [{ name: "a" }, { name: "b" }],
      });
      b = new messageType({
        messageField: { name: "test" },
        repeatedMessageField: [{ name: "a" }, { name: "b" }],
      });
    });
    test("same are equal", () => {
      expect(a).toStrictEqual(b);
      expect(a.equals(b)).toBeTruthy();
    });
    test("changed message field field is not equal", () => {
      expect(a.messageField).toBeDefined();
      if (a.messageField !== undefined) {
        a.messageField.name = "changed";
        expect(a).not.toStrictEqual(b);
        expect(a.equals(b)).toBeFalsy();
      }
    });
    test("changed repeated message field field is not equal", () => {
      a.repeatedMessageField[0].name = "changed";
      expect(a.equals(b)).toBeFalsy();
    });
  });

  describeMT(ScalarValuesMessage, (messageType) => {
    let a: ScalarValuesMessage, b: ScalarValuesMessage;
    beforeEach(() => {
      a = new messageType({
        doubleField: 0.75,
        boolField: true,
        stringField: "hello world",
        bytesField: new Uint8Array([
          104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
        ]),
      });
      b = new messageType({
        doubleField: 0.75,
        boolField: true,
        stringField: "hello world",
        bytesField: new Uint8Array([
          104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
        ]),
      });
    });
    test("same are equal", () => {
      expect(a).toStrictEqual(b);
      expect(a.equals(b)).toBeTruthy();
    });
    test("changed string field is not equal", () => {
      a.stringField = "changed";
      expect(a).not.toStrictEqual(b);
      expect(a.equals(b)).toBeFalsy();
    });
    test("changed bytes field is not equal", () => {
      a.bytesField.set([0, 1], 0);
      expect(a).not.toStrictEqual(b);
      expect(a.equals(b)).toBeFalsy();
    });
  });
});
