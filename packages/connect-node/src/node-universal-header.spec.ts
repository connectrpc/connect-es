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

import type * as http from "node:http";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./node-universal-header.js";

describe("nodeHeaderToWebHeader()", () => {
  it("should accept empty node header", () => {
    const h = nodeHeaderToWebHeader({});
    let numHeaders = 0;
    // biome-ignore lint/complexity/noForEach: Headers is not iterable, and we don't have access to entries()
    h.forEach(() => numHeaders++);
    expect(numHeaders).toBe(0);
  });
  it("should skip HTTP/2 pseudo-headers", () => {
    const h = nodeHeaderToWebHeader({
      ":path": "ignore",
    });
    let numHeaders = 0;
    // biome-ignore lint/complexity/noForEach: Headers is not iterable, and we don't have access to entries()
    h.forEach(() => numHeaders++);
    expect(numHeaders).toBe(0);
  });
  it("should skip undefined values", () => {
    const h = nodeHeaderToWebHeader({
      undef: undefined,
    });
    let numHeaders = 0;
    // biome-ignore lint/complexity/noForEach: Headers is not iterable, and we don't have access to entries()
    h.forEach(() => numHeaders++);
    expect(numHeaders).toBe(0);
  });
  it("should accept string, string[], and number", () => {
    const h = nodeHeaderToWebHeader({
      string: "string",
      "string-array": ["a", "b", "c"],
      number: 123,
    });
    expect(h.get("string")).toBe("string");
    expect(h.get("string-array")).toBe("a, b, c");
    expect(h.get("number")).toBe("123");
  });
});

describe("webHeaderToNodeHeaders()", () => {
  it("should accept object literal", () => {
    const h = webHeaderToNodeHeaders({
      foo: "bar",
      Custom: "a, b",
      custom: "c",
    });
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    expect(h["custom"]).toEqual(["a, b", "c"]);
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    expect(h["foo"]).toBe("bar");
  });
  it("should accept Headers object", () => {
    const input = new Headers({
      foo: "bar",
      Custom: "a, b",
      custom: "c",
    });
    const h = webHeaderToNodeHeaders(input);
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    expect(h["custom"]).toEqual("a, b, c");
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    expect(h["foo"]).toBe("bar");
  });
  it("should accept array of name-value pairs", () => {
    const h = webHeaderToNodeHeaders([
      ["custom", "a"],
      ["Custom", "b"],
      ["foo", "bar"],
    ]);
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    expect(h["custom"]).toEqual(["a", "b"]);
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    expect(h["foo"]).toBe("bar");
  });
  describe("special handling of set-cookie", () => {
    // Special handling of set-cookie is available since Node.js v22.0.0, v20.0.0, and v18.14.1.
    it("should accept object literal", () => {
      const h = webHeaderToNodeHeaders({
        "set-cookie": "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        "Set-Cookie": "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
      });
      expect(h["set-cookie"]).toEqual([
        "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
      ]);
    });
    it("should accept Headers object", () => {
      const input = new Headers();
      input.append("set-cookie", "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT");
      input.append("Set-Cookie", "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT");
      const h = webHeaderToNodeHeaders(input);
      expect(h["set-cookie"]).toEqual([
        "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
      ]);
    });
    it("should accept array of name-value pairs", () => {
      const h = webHeaderToNodeHeaders([
        ["set-cookie", "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT"],
        ["Set-Cookie", "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT"],
      ]);
      expect(h["set-cookie"]).toEqual([
        "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
      ]);
    });
  });
  it("should accept default node headers", () => {
    const nodeDefaults: http.OutgoingHttpHeaders = {
      a: "a",
      b: ["b1", "b2"],
      c: 123,
    };
    const webHeaders: HeadersInit = [
      ["b", "web"],
      ["c", "456"],
      ["d", "d1"],
      ["d", "d2"],
    ];
    const h = webHeaderToNodeHeaders(webHeaders, nodeDefaults);
    expect(h).toEqual({
      a: "a",
      b: ["b1", "b2", "web"],
      c: ["123", "456"],
      d: ["d1", "d2"],
    });
  });
});
