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

import { createAsyncIterable } from "./async-iterable.js";
import { normalize, normalizeIterable } from "./normalize.js";
import { create, isMessage, protoInt64 } from "@bufbuild/protobuf";
import { readAll } from "./async-iterable-helper.spec.js";
import { TimestampSchema } from "@bufbuild/protobuf/wkt";

describe("normalize()", function () {
  it("should normalize from object literal", function () {
    const normal = normalize(TimestampSchema, {
      nanos: 123,
    });
    expect(isMessage(normal, TimestampSchema)).toBeTrue();
    expect(normal.nanos).toBe(123);
    expect(normal.seconds).toBe(protoInt64.parse(0));
  });
  it("should not modify instance of the normal type", function () {
    const original = create(TimestampSchema);
    const normal = normalize(TimestampSchema, original);
    expect(normal).toBe(original);
  });
});

describe("normalizeIterable()", function () {
  it("should normalize from object literal", async function () {
    const input = [{ nanos: 123 }, { nanos: 456 }];
    const normal = await readAll(
      normalizeIterable(TimestampSchema, createAsyncIterable(input)),
    );
    expect(normal.length).toBe(2);
    expect(isMessage(normal[0], TimestampSchema)).toBeTrue();
    expect(normal[0].nanos).toBe(123);
    expect(normal[0].seconds).toBe(protoInt64.parse(0));
    expect(isMessage(normal[1], TimestampSchema)).toBeTrue();
    expect(normal[1].nanos).toBe(456);
    expect(normal[1].seconds).toBe(protoInt64.parse(0));
  });
  it("should not modify instance of the normal type", async function () {
    const input = [create(TimestampSchema), create(TimestampSchema)];
    const normal = await readAll(
      normalizeIterable(TimestampSchema, createAsyncIterable(input)),
    );
    expect(normal.length).toBe(2);
    expect(normal[0]).toBe(input[0]);
    expect(normal[1]).toBe(input[1]);
  });
});
