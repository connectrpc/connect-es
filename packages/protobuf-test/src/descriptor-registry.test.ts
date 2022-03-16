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

import { readFileSync } from "fs";
import {
  DescriptorRegistry,
  DescriptorSet,
  FileDescriptorSet,
} from "@bufbuild/protobuf";
import { TestAllTypes } from "./gen/google/protobuf/unittest_proto3_pb.js";
import { assertMessageTypeEquals } from "./helpers.js";

const fds = FileDescriptorSet.fromBinary(readFileSync("./descriptorset.bin"));

describe("DescriptorSet", () => {
  test("add() does not crash", () => {
    const ds = new DescriptorSet();
    expect(ds.enums).toStrictEqual({});
    expect(ds.messages).toStrictEqual({});
    expect(ds.services).toStrictEqual({});
    ds.add(...fds.file);
  });
});

describe("DescriptorRegistry", () => {
  test("finds nothing if empty", () => {
    const dr = new DescriptorRegistry();
    expect(dr.findMessage("foo.Foo")).toBeUndefined();
    expect(dr.findEnum("foo.Foo")).toBeUndefined();
  });
  test("dynamic type equals generated type", () => {
    const dr = new DescriptorRegistry();
    dr.add(...fds.file);
    const messageTypeDyn = dr.findMessage(TestAllTypes.typeName);
    expect(messageTypeDyn).toBeDefined();
    if (!messageTypeDyn) {
      return;
    }
    assertMessageTypeEquals(messageTypeDyn, TestAllTypes);
  });
});
