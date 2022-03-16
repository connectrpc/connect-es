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

import type { Message, MessageType } from "@bufbuild/protobuf";
import type { EnumType, FieldInfo } from "@bufbuild/protobuf";
import { readFileSync } from "fs";
import { FileDescriptorSet } from "@bufbuild/protobuf";
import { DescriptorRegistry } from "@bufbuild/protobuf";

/**
 * Runs a describe.each() with two test cases:
 * 1. passing the given MessageType as is
 * 2. passing a dynamic version of the MessageType
 */
export function describeMT<T extends Message<T>>(
  type: MessageType<T>,
  fn: (type: MessageType<T>) => void
) {
  const mtDynamic = makeMessageTypeDynamic(type);
  type testCase = { name: string; messageType: MessageType<T> };
  describe.each<testCase>([
    { name: type.typeName + " (generated)", messageType: type },
    { name: type.typeName + " (dynamic)", messageType: mtDynamic },
  ])("$name", function (testCase: testCase) {
    fn(testCase.messageType);
  });
}

/**
 * Runs a test.each() with two test cases:
 * 1. passing the given MessageType as is
 * 2. passing a dynamic version of the MessageType
 */
export function testMT<T extends Message<T>>(
  type: MessageType<T>,
  fn: (type: MessageType<T>) => void
) {
  const mtDynamic = makeMessageTypeDynamic(type);
  type testCase = { name: string; messageType: MessageType<T> };
  test.each<testCase>([
    { name: type.typeName + " (generated)", messageType: type },
    { name: type.typeName + " (dynamic)", messageType: mtDynamic },
  ])("$name", function (testCase: testCase) {
    fn(testCase.messageType);
  });
}

const fds = FileDescriptorSet.fromBinary(readFileSync("./descriptorset.bin"));
const dr = new DescriptorRegistry();
dr.add(...fds.file);

function makeMessageTypeDynamic<T extends Message<T>>(
  type: MessageType<T>
): MessageType<T> {
  const dyn = dr.findMessage(type.typeName);
  if (!dyn) {
    throw new Error();
  }
  return dyn as MessageType<T>;
}

export function assertMessageTypeEquals(a: MessageType, b: MessageType): void {
  expect(a.name).toBe(b.name);
  expect(a.typeName).toBe(b.typeName);
  // We do not surface options at this time
  // expect(a.options).toStrictEqual(b.options);
  expect(!!a.fieldWrapper).toBe(!!b.fieldWrapper);
  expect(a.runtime.syntax).toBe(b.runtime.syntax);
  expect(a.fields.list().length).toBe(b.fields.list().length);
  if (a.fields.list().length > 0 && b.fields.list().length > 0) {
    for (let i = 0; i < a.fields.list().length; i++) {
      const fa = a.fields.list()[i];
      const fb = b.fields.list()[i];
      assertFieldInfoEquals(fa, fb);
    }
  }
}

export function assertEnumTypeEquals(a: EnumType, b: EnumType): void {
  expect(a.typeName).toBe(b.typeName);
  // We do not surface options at this time
  // expect(a.options).toStrictEqual(b.options);
  expect(a.values).toStrictEqual(b.values);
}

export function assertFieldInfoEquals(a: FieldInfo, b: FieldInfo): void {
  expect(a.no).toBe(b.no);
  expect(a.name).toBe(b.name);
  expect(a.localName).toBe(b.localName);
  expect(a.jsonName).toBe(b.jsonName);
  expect(a.repeated).toBe(b.repeated);
  expect(a.packed).toBe(b.packed);
  expect(a.default).toStrictEqual(b.default);
  expect(a.opt).toBe(b.opt);
  // We do not surface options at this time
  // expect(a.options).toStrictEqual(b.options);
  expect(a.kind).toStrictEqual(b.kind);
  if (a.kind === "scalar" && b.kind === "scalar") {
    expect(a.T).toBe(b.T);
  }
  if (a.kind === "message" && b.kind === "message") {
    a.T;
    assertMessageTypeEquals(a.T, b.T);
  }
  if (a.kind === "enum" && b.kind === "enum") {
    assertEnumTypeEquals(a.T, b.T);
  }
  if (a.kind === "map" && b.kind === "map") {
    expect(a.K).toBe(b.K);
    expect(a.V.kind).toBe(b.V.kind);
    if (a.V.kind === "scalar" && b.V.kind === "scalar") {
      expect(a.V.T).toBe(b.V.T);
    }
    if (a.V.kind === "enum" && b.V.kind === "enum") {
      assertEnumTypeEquals(a.V.T, b.V.T);
    }
    if (a.V.kind === "message" && b.V.kind === "message") {
      assertMessageTypeEquals(a.V.T, b.V.T);
    }
  }
}
