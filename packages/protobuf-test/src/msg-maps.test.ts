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

import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { describeMT } from "./helpers.js";
import { MapsMessage } from "./gen/extra/msg-maps_pb";

describeMT(MapsMessage, (messageType) => {
  const defaultFields: PlainMessage<MapsMessage> = {
    boolStrField: {},
    int32EnuField: {},
    int32MsgField: {},
    int32StrField: {},
    int64EnuField: {},
    int64MsgField: {},
    int64StrField: {},
    strBoolField: {},
    strBytesField: {},
    strEnuField: {},
    strInt32Field: {},
    strInt64Field: {},
    strMsgField: {},
    strStrField: {},
  };
  const defaultJson: JsonValue = {};
  const exampleFields: PlainMessage<MapsMessage> = {
    strStrField: { a: "str", b: "xx" },
    strInt32Field: { a: 123, b: 455 },
    strInt64Field: { a: 123n },
    strBoolField: { a: true, b: false },
    strBytesField: {
      a: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
    },
    int32StrField: { 123: "hello" },
    int64StrField: { "9223372036854775807": "hello" },
    boolStrField: { true: "yes", false: "no" },
    strMsgField: {
      a: new messageType(), // TODO we do not support partial inputs here - should we?
    },
    int32MsgField: {
      "32": new messageType(), // TODO we do not support partial inputs here - should we?
    },
    int64MsgField: {
      "64": new messageType(), // TODO we do not support partial inputs here - should we?
    },
    strEnuField: { a: 0, b: 1, c: 2 },
    int32EnuField: { 1: 0, 2: 1, 0: 2 },
    int64EnuField: { "-1": 0, "2": 1, "0": 2 },
  };
  const exampleJson: JsonValue = {
    strStrField: { a: "str", b: "xx" },
    strInt32Field: { a: 123, b: 455 },
    strInt64Field: { a: "123" },
    strBoolField: { a: true, b: false },
    strBytesField: { a: "aGVsbG8gd29ybGQ=" },
    int32StrField: { "123": "hello" },
    int64StrField: { "9223372036854775807": "hello" },
    boolStrField: { true: "yes", false: "no" },
    strMsgField: { a: {} },
    int32MsgField: { "32": {} },
    int64MsgField: { "64": {} },
    strEnuField: { a: "MAPS_ENUM_ANY", b: "MAPS_ENUM_YES", c: "MAPS_ENUM_NO" },
    int32EnuField: {
      "0": "MAPS_ENUM_NO",
      "1": "MAPS_ENUM_ANY",
      "2": "MAPS_ENUM_YES",
    },
    int64EnuField: {
      "0": "MAPS_ENUM_NO",
      "2": "MAPS_ENUM_YES",
      "-1": "MAPS_ENUM_ANY",
    },
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
