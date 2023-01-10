// Copyright 2021-2023 Buf Technologies, Inc.
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

import { trailerParse, trailerSerialize } from "./trailer.js";

describe("trailerParse()", () => {
  it("parses very simple case", () => {
    const h = trailerParse(new TextEncoder().encode("foo: bar\r\n"));
    expect(h.get("foo")).toBe("bar");
  });
  it("parses empty", () => {
    const h = trailerParse(new TextEncoder().encode(""));
    expect(countFields(h)).toBe(0);
  });
  it("trims values", () => {
    const h = trailerParse(new TextEncoder().encode("foo:bar \r\n"));
    expect(h.get("foo")).toBe("bar");
  });
  it("does not require last newline", () => {
    const h = trailerParse(new TextEncoder().encode("foo: bar"));
    expect(h.get("foo")).toBe("bar");
  });
  it("appends", () => {
    const h = trailerParse(new TextEncoder().encode("foo: a\r\nfoo: b\r\n"));
    expect(h.get("foo")).toBe("a, b");
  });
});

describe("trailerSerialize()", () => {
  it("serializes empty", () => {
    const trailer = new Headers();
    const data = trailerSerialize(trailer);
    expect(new TextDecoder().decode(data)).toBe("");
  });
  it("Headers trims whitespace", () => {
    const trailer = new Headers({
      foo: "bar ",
    });
    expect(trailer.get("foo")).toBe("bar");
    const data = trailerSerialize(trailer);
    expect(new TextDecoder().decode(data)).toBe("foo: bar\r\n");
  });
  it("serializes lowercase field names", () => {
    const trailer = new Headers({
      Foo: "bar ",
    });
    const data = trailerSerialize(trailer);
    expect(new TextDecoder().decode(data)).toBe("foo: bar\r\n");
  });
});

describe("roundtrip", () => {
  it("should work", () => {
    const a = new Headers({
      foo: "a, b",
      bar: "123",
    });
    const b = trailerParse(trailerSerialize(a));
    expect(countFields(b)).toBe(2);
    expect(b.get("foo")).toBe("a, b");
    expect(b.get("bar")).toBe("123");
  });
  it("happens to preserve non-ascii", () => {
    const a = new Headers({
      foo: "bär",
    });
    const b = trailerParse(trailerSerialize(a));
    expect(countFields(b)).toBe(1);
    expect(b.get("foo")).toBe("bär");
  });
});

function countFields(h: Headers): number {
  let numKeys = 0;
  h.forEach(() => numKeys++);
  return numKeys;
}
