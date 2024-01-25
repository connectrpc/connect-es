// Copyright 2021-2024 The Connect Authors
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
import { Duration, protoInt64, Timestamp } from "@bufbuild/protobuf";
import { readAll } from "./async-iterable-helper.spec.js";

describe("normalize()", function () {
  it("should normalize from object literal", function () {
    const normal = normalize(Timestamp, {
      nanos: 123,
    });
    expect(normal).toBeInstanceOf(Timestamp);
    expect(normal.nanos).toBe(123);
    expect(normal.seconds).toBe(protoInt64.parse(0));
  });
  it("should normalize from different message type", function () {
    const normal = normalize(
      Timestamp,
      new Duration({
        nanos: 123,
      }),
    );
    expect(normal).toBeInstanceOf(Timestamp);
    expect(normal.nanos).toBe(123);
    expect(normal.seconds).toBe(protoInt64.parse(0));
  });
  it("should not modify instance of the normal type", function () {
    const original = new Timestamp();
    const normal = normalize(Timestamp, original);
    expect(normal).toBe(original);
  });
});

describe("normalizeIterable()", function () {
  it("should normalize from object literal", async function () {
    const input = [{ nanos: 123 }, { nanos: 456 }];
    const normal = await readAll(
      normalizeIterable(Timestamp, createAsyncIterable(input)),
    );
    expect(normal.length).toBe(2);
    expect(normal[0]).toBeInstanceOf(Timestamp);
    expect(normal[0].nanos).toBe(123);
    expect(normal[0].seconds).toBe(protoInt64.parse(0));
    expect(normal[1]).toBeInstanceOf(Timestamp);
    expect(normal[1].nanos).toBe(456);
    expect(normal[1].seconds).toBe(protoInt64.parse(0));
  });
  it("should normalize from different message type", async function () {
    const input = [new Duration({ nanos: 123 }), new Duration({ nanos: 456 })];
    const normal = await readAll(
      normalizeIterable(Timestamp, createAsyncIterable(input)),
    );
    expect(normal.length).toBe(2);
    expect(normal[0]).toBeInstanceOf(Timestamp);
    expect(normal[0].nanos).toBe(123);
    expect(normal[0].seconds).toBe(protoInt64.parse(0));
    expect(normal[1]).toBeInstanceOf(Timestamp);
    expect(normal[1].nanos).toBe(456);
    expect(normal[1].seconds).toBe(protoInt64.parse(0));
  });
  it("should not modify instance of the normal type", async function () {
    const input = [new Timestamp(), new Timestamp()];
    const normal = await readAll(
      normalizeIterable(Timestamp, createAsyncIterable(input)),
    );
    expect(normal.length).toBe(2);
    expect(normal[0]).toBe(input[0]);
    expect(normal[1]).toBe(input[1]);
  });
});
