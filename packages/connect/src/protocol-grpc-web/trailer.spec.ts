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
import { trailerParse, trailerSerialize } from "./trailer.js";

describe("trailerParse()", () => {
  it("parses very simple case", () => {
    const h = trailerParse(new TextEncoder().encode("foo: bar\r\n"));
    assert.strictEqual(h.get("foo"), "bar");
  });
  it("parses empty", () => {
    const h = trailerParse(new TextEncoder().encode(""));
    assert.strictEqual(countFields(h), 0);
  });
  it("trims values", () => {
    const h = trailerParse(new TextEncoder().encode("foo:bar \r\n"));
    assert.strictEqual(h.get("foo"), "bar");
  });
  it("does not require last newline", () => {
    const h = trailerParse(new TextEncoder().encode("foo: bar"));
    assert.strictEqual(h.get("foo"), "bar");
  });
  it("appends", () => {
    const h = trailerParse(new TextEncoder().encode("foo: a\r\nfoo: b\r\n"));
    assert.strictEqual(h.get("foo"), "a, b");
  });
});

describe("trailerSerialize()", () => {
  it("serializes empty", () => {
    const trailer = new Headers();
    const data = trailerSerialize(trailer);
    assert.strictEqual(new TextDecoder().decode(data), "");
  });
  it("Headers trims whitespace", () => {
    const trailer = new Headers({
      foo: "bar ",
    });
    assert.strictEqual(trailer.get("foo"), "bar");
    const data = trailerSerialize(trailer);
    assert.strictEqual(new TextDecoder().decode(data), "foo: bar\r\n");
  });
  it("serializes lowercase field names", () => {
    const trailer = new Headers({
      Foo: "bar ",
    });
    const data = trailerSerialize(trailer);
    assert.strictEqual(new TextDecoder().decode(data), "foo: bar\r\n");
  });
});

describe("trailer roundtrip", () => {
  it("should work", () => {
    const a = new Headers({
      foo: "a, b",
      bar: "123",
    });
    const b = trailerParse(trailerSerialize(a));
    assert.strictEqual(countFields(b), 2);
    assert.strictEqual(b.get("foo"), "a, b");
    assert.strictEqual(b.get("bar"), "123");
  });
  it("happens to preserve non-ascii", () => {
    const a = new Headers({
      foo: "bär",
    });
    const b = trailerParse(trailerSerialize(a));
    assert.strictEqual(countFields(b), 1);
    assert.strictEqual(b.get("foo"), "bär");
  });
});

function countFields(h: Headers): number {
  let numKeys = 0;
  // biome-ignore lint/complexity/noForEach: Headers is not iterable, and we don't have access to entries()
  h.forEach(() => numKeys++);
  return numKeys;
}
