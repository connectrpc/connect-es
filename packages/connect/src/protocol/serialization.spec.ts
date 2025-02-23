// Copyright 2021-2025 The Connect Authors
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

import type { Serialization } from "./serialization.js";
import {
  createBinarySerialization,
  createJsonSerialization,
  getJsonOptions,
  limitSerialization,
} from "./serialization.js";
import { ConnectError } from "../connect-error.js";
import { StringValueSchema, UInt32ValueSchema } from "@bufbuild/protobuf/wkt";
import { clone, create, equals, toBinary } from "@bufbuild/protobuf";

describe("createBinarySerialization()", function () {
  const goldenMessage = create(StringValueSchema, { value: "abc" });
  const goldenBytes = toBinary(
    StringValueSchema,
    create(StringValueSchema, { value: "abc" }),
  );
  const ser = createBinarySerialization(StringValueSchema, undefined);

  it("should serialize", function () {
    const bytes = ser.serialize(goldenMessage);
    expect(bytes).toEqual(goldenBytes);
  });

  it("should parse", function () {
    const message = ser.parse(goldenBytes);
    expect(equals(StringValueSchema, goldenMessage, message)).toBeTrue();
  });

  describe("parsing invalid data", function () {
    it("should raise connect error", function () {
      try {
        ser.parse(new Uint8Array([0xde]));
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        const c = ConnectError.from(e);
        expect(c.message).toBe("[internal] parse binary: premature EOF");
      }
    });
  });

  describe("serializing invalid data", function () {
    it("should raise connect error", function () {
      const ser = createBinarySerialization(UInt32ValueSchema, undefined);
      const f = create(UInt32ValueSchema, { value: -1 });
      try {
        ser.serialize(f);
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        const c = ConnectError.from(e);
        expect(c.message).toBe(
          "[internal] serialize binary: invalid uint32: -1",
        );
      }
    });
  });
});

describe("createJsonSerialization()", function () {
  const goldenMessage = create(StringValueSchema, { value: "abc" });
  const goldenBytes = new TextEncoder().encode(`"abc"`);
  const ser = createJsonSerialization(StringValueSchema, undefined);

  it("should serialize", function () {
    const bytes = ser.serialize(goldenMessage);
    expect(bytes).toEqual(goldenBytes);
  });

  it("should parse", function () {
    const message = ser.parse(goldenBytes);
    expect(equals(StringValueSchema, goldenMessage, message)).toBeTrue();
  });

  describe("parsing invalid data", function () {
    it("should raise connect error", function () {
      try {
        ser.parse(new Uint8Array([0xde]));
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        const c = ConnectError.from(e);
        expect(c.message).toMatch(
          /^\[invalid_argument] cannot decode message google.protobuf.StringValue from JSON: Unexpected token/,
        );
      }
    });
  });

  describe("serializing invalid data", function () {
    it("should raise connect error", function () {
      const f = clone(StringValueSchema, goldenMessage);
      f.value = new Error() as unknown as string;
      try {
        ser.serialize(f);
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        const c = ConnectError.from(e);
        expect(c.message).toBe(
          "[internal] cannot encode field google.protobuf.StringValue.value to JSON: expected string, got object",
        );
      }
    });
  });
});

describe("limitSerialization()", function () {
  const ser: Serialization<string> = {
    serialize(data: string): Uint8Array {
      return new TextEncoder().encode(data);
    },
    parse(data: Uint8Array): string {
      return new TextDecoder().decode(data);
    },
  };
  it("limits serialize", function () {
    const limitedSer = limitSerialization(ser, {
      readMaxBytes: 0xffffffff,
      writeMaxBytes: 3,
    });
    expect(() => limitedSer.serialize("abcdef")).toThrowError(
      ConnectError,
      "[resource_exhausted] message size 6 is larger than configured writeMaxBytes 3",
    );
    expect(() =>
      limitedSer.parse(new TextEncoder().encode("abcdef")),
    ).not.toThrowError();
  });
  it("limits parse", function () {
    const limitedSer = limitSerialization(ser, {
      readMaxBytes: 3,
      writeMaxBytes: 0xffffffff,
    });
    expect(() => limitedSer.serialize("abcdef")).not.toThrowError();
    expect(() =>
      limitedSer.parse(new TextEncoder().encode("abcdef")),
    ).toThrowError(
      ConnectError,
      "[resource_exhausted] message size 6 is larger than configured readMaxBytes 3",
    );
  });
});

describe("getJsonOptions()", function () {
  it("sets ignoreUnknownFields to true if not already set on options object", function () {
    const opts = getJsonOptions({ alwaysEmitImplicit: true });
    expect(opts.ignoreUnknownFields).toBeTrue();
  });
  it("sets ignoreUnknownFields to true if undefined is passed", function () {
    const opts = getJsonOptions(undefined);
    expect(opts.ignoreUnknownFields).toBeTrue();
  });
  it("doesn't change ignoreUnknownFields if already set", function () {
    const opts = getJsonOptions({ ignoreUnknownFields: false });
    expect(opts.ignoreUnknownFields).toBeFalse();
  });
});
