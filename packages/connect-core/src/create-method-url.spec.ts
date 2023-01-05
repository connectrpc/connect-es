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

import { createMethodUrl } from "./create-method-url.js";

describe("createMethodUrl()", function () {
  it("should create the expected URL", function () {
    const url = createMethodUrl(
      "https://example.com",
      "example.Service",
      "Method"
    );
    expect(url.toString()).toEqual(
      "https://example.com/example.Service/Method"
    );
  });
  it("should accept empty string as baseUrl", function () {
    const url = createMethodUrl("", "example.Service", "Method");
    expect(url.toString()).toEqual("/example.Service/Method");
  });
  it("should accept '/' as baseUrl", function () {
    const url = createMethodUrl("/", "example.Service", "Method");
    expect(url.toString()).toEqual("/example.Service/Method");
  });
  it("should handle protocol-relative baseUrl", function () {
    const url = createMethodUrl("//example.com", "example.Service", "Method");
    expect(url.toString()).toEqual("//example.com/example.Service/Method");
  });
  it("should not duplicating slashes", function () {
    const url = createMethodUrl(
      "https://example.com/",
      "example.Service",
      "Method"
    );
    expect(url.toString()).toEqual(
      "https://example.com/example.Service/Method"
    );
  });
  it("should merge paths", function () {
    const url = createMethodUrl(
      "https://example.com/twirp",
      "example.Service",
      "Method"
    );
    expect(url.toString()).toEqual(
      "https://example.com/twirp/example.Service/Method"
    );
  });
  it("should merge paths without duplicating slashes", function () {
    const url = createMethodUrl(
      "https://example.com/twirp/",
      "example.Service",
      "Method"
    );
    expect(url.toString()).toEqual(
      "https://example.com/twirp/example.Service/Method"
    );
  });
});
