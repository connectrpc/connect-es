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

import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { describeMT } from "./helpers.js";
import { OneofMessage, OneofMessageFoo } from "./gen/extra/msg-oneof_pb.js";

describeMT(OneofMessage, (messageType) => {
  const messageField11 = messageType.fields.find(11);
  if (!messageField11) {
    throw new Error();
  }
  if (messageField11.kind !== "message") {
    throw new Error();
  }
  const defaultFields: PlainMessage<OneofMessage> = {
    message: { case: undefined },
    scalar: { case: undefined },
    enum: { case: undefined },
  };
  const defaultJson: JsonValue = {};
  const fooValue = new messageField11.T({
    name: "max",
    toggle: false,
  }) as OneofMessageFoo;
  const exampleFields: PlainMessage<OneofMessage> = {
    message: { case: "foo", value: fooValue },
    scalar: { case: undefined },
    enum: { case: undefined },
  };
  const exampleJson: JsonValue = {
    foo: { name: "max" },
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
