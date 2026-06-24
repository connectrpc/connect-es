// Copyright 2021-2026 The Connect Authors
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

import { describe, it } from "node:test";
import * as assert from "node:assert";
import { createAsyncIterable } from "./async-iterable.js";
import { normalize, normalizeIterable } from "./normalize.js";
import { create, isMessage, protoInt64 } from "@bufbuild/protobuf";
import { readAll } from "./async-iterable-helper.spec.js";
import { TimestampSchema } from "@bufbuild/protobuf/wkt";

describe("normalize()", () => {
  it("should normalize from object literal", () => {
    const normal = normalize(TimestampSchema, {
      nanos: 123,
    });
    assert.ok(isMessage(normal, TimestampSchema));
    assert.strictEqual(normal.nanos, 123);
    assert.strictEqual(normal.seconds, protoInt64.parse(0));
  });
  it("should not modify instance of the normal type", () => {
    const original = create(TimestampSchema);
    const normal = normalize(TimestampSchema, original);
    assert.strictEqual(normal, original);
  });
});

describe("normalizeIterable()", () => {
  it("should normalize from object literal", async () => {
    const input = [{ nanos: 123 }, { nanos: 456 }];
    const normal = await readAll(
      normalizeIterable(TimestampSchema, createAsyncIterable(input)),
    );
    assert.strictEqual(normal.length, 2);
    assert.ok(isMessage(normal[0], TimestampSchema));
    assert.strictEqual(normal[0].nanos, 123);
    assert.strictEqual(normal[0].seconds, protoInt64.parse(0));
    assert.ok(isMessage(normal[1], TimestampSchema));
    assert.strictEqual(normal[1].nanos, 456);
    assert.strictEqual(normal[1].seconds, protoInt64.parse(0));
  });
  it("should not modify instance of the normal type", async () => {
    const input = [create(TimestampSchema), create(TimestampSchema)];
    const normal = await readAll(
      normalizeIterable(TimestampSchema, createAsyncIterable(input)),
    );
    assert.strictEqual(normal.length, 2);
    assert.strictEqual(normal[0], input[0]);
    assert.strictEqual(normal[1], input[1]);
  });
});
