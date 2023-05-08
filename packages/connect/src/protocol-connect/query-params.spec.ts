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

import { parseQueryRaw, decodeQueryRaw } from "./query-params.js";

describe("parseQueryRaw()", function () {
  it("should parse empty query strings", () => {
    expect(parseQueryRaw("")).toEqual(new Map());
    expect(parseQueryRaw("?")).toEqual(new Map());
    expect(parseQueryRaw("a")).toEqual(new Map()); // invalid, is ignored
  });
  it("should handle basic query strings", () => {
    expect(parseQueryRaw("?a")).toEqual(new Map([["a", ""]]));
    expect(parseQueryRaw("?a=")).toEqual(new Map([["a", ""]]));
    expect(parseQueryRaw("?a=1")).toEqual(new Map([["a", "1"]]));
    expect(parseQueryRaw("?a=1&b")).toEqual(
      new Map([
        ["a", "1"],
        ["b", ""],
      ])
    );
    expect(parseQueryRaw("?a=1&b=")).toEqual(
      new Map([
        ["a", "1"],
        ["b", ""],
      ])
    );
    expect(parseQueryRaw("?a=1&b=2")).toEqual(
      new Map([
        ["a", "1"],
        ["b", "2"],
      ])
    );
    expect(parseQueryRaw("?connect=v1&message={}")).toEqual(
      new Map([
        ["connect", "v1"],
        ["message", "{}"],
      ])
    );
  });
  it("should not decode url encoding", () => {
    expect(parseQueryRaw("?a=1%20&b=2%20")).toEqual(
      new Map([
        ["a", "1%20"],
        ["b", "2%20"],
      ])
    );
  });
  it("should handle malformed query strings", () => {
    expect(parseQueryRaw("?=0&a")).toEqual(
      new Map([
        ["", "0"],
        ["a", ""],
      ])
    );
    expect(parseQueryRaw("?===")).toEqual(new Map([["", "=="]]));
  });
});

describe("decodeQueryRaw()", function () {
  it("should parse basic url encoding", () => {
    expect(decodeQueryRaw("%20")).toEqual(new TextEncoder().encode(" "));
    expect(decodeQueryRaw("test%e2%84%a2")).toEqual(
      new TextEncoder().encode("test™")
    );
    expect(decodeQueryRaw("test%E2%84%A2")).toEqual(
      new TextEncoder().encode("test™")
    );
  });
});
