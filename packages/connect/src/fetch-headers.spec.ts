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

export {}; // Required to transpile this file with isolatedModules

describe("Fetch API Headers", function () {
  let headers: Headers;
  beforeEach(() => {
    headers = new Headers({
      "Content-Type": "application/connect+json",
    });
  });
  it("get()", function () {
    expect(headers.get("Content-Type")).toEqual("application/connect+json");
    expect(headers.get("content-type")).toEqual("application/connect+json");
  });
  it("forEach()", function () {
    headers.forEach((value, key) => {
      // Note all keys are lowercase when iterating over them
      expect(key).toEqual("content-type");
      expect(value).toEqual("application/connect+json");
    });
  });
  it("has()", function () {
    expect(headers.has("Content-Type")).toBeTrue();
    expect(headers.has("content-type")).toBeTrue();
  });
});
