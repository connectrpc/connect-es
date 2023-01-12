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
      // Fails on all versions of Node
      // expect(key).toEqual("Content-Type");
      expect(value).toEqual("application/connect");
    });
  });
  it("has()", function () {
    expect(headers.has("Content-Type")).toBeTrue();
    expect(headers.has("content-type")).toBeTrue();
  });
  it("equality()", function () {
    expect(headers).toEqual(
      new Headers({
        "Content-Type": "application/connect",
      })
    );
    // Fails on Node <= 17
    expect(headers).toEqual(
      new Headers({
        "content-type": "application/connect",
      })
    );
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
    headers.forEach((value) => {
      // Fails on all versions of Node
      // expect(key).toEqual("Content-Type");
      expect(value).toEqual("application/connect");
    });
  });
  it("has()", function () {
    expect(headers.has("Content-Type")).toBeTrue();
    expect(headers.has("content-type")).toBeTrue();
  });
  it("equality()", function () {
    // Fails on Node <= 17
    expect(headers).toEqual(
      new Headers({
        "Content-Type": "application/connect",
      })
    );
    expect(headers).toEqual(
      new Headers({
        "content-type": "application/connect",
      })
    );
  });
});
