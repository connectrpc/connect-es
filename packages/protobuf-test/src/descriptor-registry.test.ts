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
