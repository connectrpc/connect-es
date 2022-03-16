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

import { MessageFieldMessage } from "./gen/extra/msg-message_pb.js";
import {
  RepeatedScalarValuesMessage,
  ScalarValuesMessage,
} from "./gen/extra/msg-scalar_pb.js";
import { WrappersMessage } from "./gen/extra/wkt-wrappers_pb.js";
import { testMT } from "./helpers.js";
import { protoInt64 } from "@bufbuild/protobuf";

describe("clone", function () {
  testMT(MessageFieldMessage, (messageType) => {
    const a = new messageType({
      messageField: { name: "test" },
      repeatedMessageField: [{ name: "a" }, { name: "b" }],
    });
    const b = a.clone();
    expect(b).toStrictEqual(a);
    expect(b.messageField).toBeDefined();
    if (b.messageField !== undefined) {
      b.messageField.name = "123";
    }
    expect(b.messageField?.name).not.toBe(a.messageField?.name);
  });

  testMT(ScalarValuesMessage, (messageType) => {
    const a = new messageType({
      doubleField: 0.75,
      floatField: -0.75,
      int64Field: -1n,
      uint64Field: 1n,
      int32Field: -123,
      fixed64Field: 1n,
      fixed32Field: 123,
      boolField: true,
      stringField: "hello world",
      bytesField: new Uint8Array([
        104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
      ]),
      uint32Field: 123,
      sfixed32Field: -123,
      sfixed64Field: -1n,
      sint32Field: -1,
      sint64Field: -1n,
    });
    const b = a.clone();
    expect(b).toStrictEqual(a);
    a.stringField = "123";
    expect(b.stringField).not.toBe(a.stringField);
    const c = a.clone();
    c.bytesField.set([0, 1], 0);
    expect(c.bytesField).not.toStrictEqual(a.bytesField);
  });

  testMT(RepeatedScalarValuesMessage, (messageType) => {
    const a = new messageType({
      doubleField: [0.75, 0, 1],
      floatField: [0.75, -0.75],
      int64Field: [-1n, -2n],
      uint64Field: [1n, 2n],
      int32Field: [-123, 500],
      fixed64Field: [1n, 99n],
      fixed32Field: [123, 999],
      boolField: [true, false, true],
      stringField: ["hello", "world"],
      bytesField: [
        new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
      ],
      uint32Field: [123, 123],
      sfixed32Field: [-123, -123, -123],
      sfixed64Field: [-1n, -2n, 100n],
      sint32Field: [-1, -2, 999],
      sint64Field: [-1n, -99n, 99n],
    });
    const b = a.clone();
    expect(b).toStrictEqual(a);
    a.doubleField.push(1.2);
    expect(b.doubleField).not.toBe(a.doubleField);
  });

  testMT(WrappersMessage, (messageType) => {
    const a = new messageType({
      doubleValueField: 1.2,
      boolValueField: true,
      floatValueField: 1.3,
      int64ValueField: protoInt64.parse(4),
      uint64ValueField: protoInt64.parse(5),
      int32ValueField: 6,
      uint32ValueField: 7,
      stringValueField: "a",
      bytesValueField: new Uint8Array([0xff]),
    });
    const b = a.clone();
    expect(b).toStrictEqual(a);
    a.doubleValueField = 0.1;
    expect(b.doubleValueField).not.toBe(a.doubleValueField);
  });
});
