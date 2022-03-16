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

import {
  RepeatedScalarValuesMessage,
  ScalarValuesMessage,
} from "./gen/extra/msg-scalar_pb";
import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { describeMT } from "./helpers.js";

describeMT(ScalarValuesMessage, (messageType) => {
  const defaultFields: PlainMessage<ScalarValuesMessage> = {
    doubleField: 0,
    floatField: 0,
    int64Field: 0n,
    uint64Field: 0n,
    int32Field: 0,
    fixed64Field: 0n,
    fixed32Field: 0,
    boolField: false,
    stringField: "",
    bytesField: new Uint8Array(0),
    uint32Field: 0,
    sfixed32Field: 0,
    sfixed64Field: 0n,
    sint32Field: 0,
    sint64Field: 0n,
  };
  const defaultJson: JsonValue = {};
  const exampleFields: PlainMessage<ScalarValuesMessage> = {
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
  };
  const exampleJson: JsonValue = {
    doubleField: 0.75,
    floatField: -0.75,
    int64Field: "-1",
    uint64Field: "1",
    int32Field: -123,
    fixed64Field: "1",
    fixed32Field: 123,
    boolField: true,
    stringField: "hello world",
    bytesField: "aGVsbG8gd29ybGQ=",
    uint32Field: 123,
    sfixed32Field: -123,
    sfixed64Field: "-1",
    sint32Field: -1,
    sint64Field: "-1",
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
    const got = { ...messageType.fromJson(defaultJson) };
    expect(got).toStrictEqual(defaultFields);
  });
  test("example encodes to JSON", () => {
    const got = new messageType(exampleFields).toJson();
    expect(got).toStrictEqual(exampleJson);
  });
  test("example decodes from JSON", () => {
    const got = { ...messageType.fromJson(exampleJson) };
    expect(got).toStrictEqual(exampleFields);
  });
});

describeMT(RepeatedScalarValuesMessage, (messageType) => {
  const defaultFields: PlainMessage<RepeatedScalarValuesMessage> = {
    doubleField: [],
    floatField: [],
    int64Field: [],
    uint64Field: [],
    int32Field: [],
    fixed64Field: [],
    fixed32Field: [],
    boolField: [],
    stringField: [],
    bytesField: [],
    uint32Field: [],
    sfixed32Field: [],
    sfixed64Field: [],
    sint32Field: [],
    sint64Field: [],
  };
  const defaultJson: JsonValue = {};
  const exampleFields: PlainMessage<RepeatedScalarValuesMessage> = {
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
  };
  const exampleJson: JsonValue = {
    doubleField: [0.75, 0, 1],
    floatField: [0.75, -0.75],
    int64Field: ["-1", "-2"],
    uint64Field: ["1", "2"],
    int32Field: [-123, 500],
    fixed64Field: ["1", "99"],
    fixed32Field: [123, 999],
    boolField: [true, false, true],
    stringField: ["hello", "world"],
    bytesField: ["aGVsbG8gd29ybGQ="],
    uint32Field: [123, 123],
    sfixed32Field: [-123, -123, -123],
    sfixed64Field: ["-1", "-2", "100"],
    sint32Field: [-1, -2, 999],
    sint64Field: ["-1", "-99", "99"],
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
    const got = { ...messageType.fromJson(defaultJson) };
    expect(got).toStrictEqual(defaultFields);
  });
  test("example encodes to JSON", () => {
    const got = new messageType(exampleFields).toJson();
    expect(got).toStrictEqual(exampleJson);
  });
  test("example decodes from JSON", () => {
    const got = { ...messageType.fromJson(exampleJson) };
    expect(got).toStrictEqual(exampleFields);
  });
});
