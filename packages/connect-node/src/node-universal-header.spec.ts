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

import * as http from "http";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./node-universal-header.js";

describe("nodeHeaderToWebHeader()", function () {
  it("should accept empty node header", function () {
    const h = nodeHeaderToWebHeader({});
    let numHeaders = 0;
    h.forEach(() => numHeaders++);
    expect(numHeaders).toBe(0);
  });
  it("should skip HTTP/2 pseudo-headers", function () {
    const h = nodeHeaderToWebHeader({
      ":path": "ignore",
    });
    let numHeaders = 0;
    h.forEach(() => numHeaders++);
    expect(numHeaders).toBe(0);
  });
  it("should skip undefined values", function () {
    const h = nodeHeaderToWebHeader({
      undef: undefined,
    });
    let numHeaders = 0;
    h.forEach(() => numHeaders++);
    expect(numHeaders).toBe(0);
  });
  it("should accept string, string[], and number", function () {
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

describe("webHeaderToNodeHeaders()", function () {
  it("should accept object literal", () => {
    const h = webHeaderToNodeHeaders({
      foo: "bar",
      Custom: "a, b",
      custom: "c",
    });
    expect(h["custom"]).toEqual(["a, b", "c"]);
    expect(h["foo"]).toBe("bar");
  });
  it("should accept Headers object", () => {
    const input = new Headers({
      foo: "bar",
      Custom: "a, b",
      custom: "c",
    });
    const h = webHeaderToNodeHeaders(input);
    expect(h["custom"]).toEqual("a, b, c");
    expect(h["foo"]).toBe("bar");
  });
  it("should accept array of name-value pairs", () => {
    const h = webHeaderToNodeHeaders([
      ["custom", "a"],
      ["Custom", "b"],
      ["foo", "bar"],
    ]);
    expect(h["custom"]).toEqual(["a", "b"]);
    expect(h["foo"]).toBe("bar");
  });
  if ("getSetCookie" in new Headers()) {
    // Special handling of set-cookie is available since Node.js v20.0.0,
    // v18.14.1, v16.19.1, but not in headers-polyfill 3.1.2.
    // Also see https://github.com/nodejs/undici/releases/tag/v5.19.0
    describe("with support for set-cookie", function () {
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
        input.append(
          "set-cookie",
          "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        );
        input.append(
          "Set-Cookie",
          "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        );
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
  }
  it("should accept default node headers", function () {
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
