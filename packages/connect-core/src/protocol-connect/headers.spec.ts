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

// Utility function to compare two header objects
export function compare(h1: Headers, h2: Headers): boolean {
  const h1Els: string[][] = [],
    h2Els: string[][] = [];
  h1.forEach((value, key) => {
    h1Els.push([key, value]);
  });
  h2.forEach((value, key) => {
    h2Els.push([key, value]);
  });

  for (let i = 0; i < h1Els.length; i++) {
    const key1 = h1Els[i][0];
    const key2 = h2Els[i][0];
    const val1 = h1Els[i][1];
    const val2 = h2Els[i][1];
    if (key1 !== key2 || val1 !== val2) {
      return false;
    }
  }
  return true;
}

describe("headers()", function () {
  let headers: Headers;
  beforeEach(() => {
    headers = new Headers({
      "Content-Type": "application/connect",
    });
  });
  it("get()", function () {
    expect(headers.get("Content-Type")).toEqual("application/connect");
    expect(headers.get("content-type")).toEqual("application/connect");
  });
  it("forEach()", function () {
    headers.forEach((value, key) => {
      // Note all keys are lowercase when iterating over them
      expect(key).toEqual("content-type");
      expect(value).toEqual("application/connect");
    });
  });
  it("has()", function () {
    expect(headers.has("Content-Type")).toBeTrue();
    expect(headers.has("content-type")).toBeTrue();
  });
  it("case-insensitive equality()", function () {
    expect(
      compare(
        headers,
        new Headers({
          "Content-Type": "application/connect",
        })
      )
    ).toBeTrue();

    expect(
      compare(
        headers,
        new Headers({
          "content-type": "application/connect",
        })
      )
    ).toBeTrue();
  });
});

describe("headers from headers()", function () {
  let headers: Headers;
  beforeEach(() => {
    const base = new Headers({
      "Content-Type": "application/connect",
    });

    headers = new Headers(base);
  });
  it("get()", function () {
    expect(headers.get("Content-Type")).toEqual("application/connect");
    expect(headers.get("content-type")).toEqual("application/connect");
  });
  it("forEach()", function () {
    headers.forEach((value, key) => {
      // Note all keys are lowercase when iterating over them
      expect(key).toEqual("content-type");
      expect(value).toEqual("application/connect");
    });
  });
  it("has()", function () {
    expect(headers.has("Content-Type")).toBeTrue();
    expect(headers.has("content-type")).toBeTrue();
  });
  it("case-insensitive equality()", function () {
    expect(
      compare(
        headers,
        new Headers({
          "Content-Type": "application/connect",
        })
      )
    ).toBeTrue();

    expect(
      compare(
        headers,
        new Headers({
          "content-type": "application/connect",
        })
      )
    ).toBeTrue();
  });
});
