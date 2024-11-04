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

import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import { createMethodUrl } from "./create-method-url.js";

describe("createMethodUrl()", function () {
  const testService = createServiceDesc({
    typeName: "example.Service",
    method: {
      method: {
        input: Int32ValueSchema,
        output: StringValueSchema,
        methodKind: "unary",
      },
    },
  });
  it("should create the expected URL", function () {
    const url = createMethodUrl(
      "https://example.com",
      testService.method.method,
    );
    expect(url.toString()).toEqual(
      "https://example.com/example.Service/Method",
    );
  });
  it("should accept empty string as baseUrl", function () {
    const url = createMethodUrl("", testService.method.method);
    expect(url.toString()).toEqual("/example.Service/Method");
  });
  it("should accept '/' as baseUrl", function () {
    const url = createMethodUrl("/", testService.method.method);
    expect(url.toString()).toEqual("/example.Service/Method");
  });
  it("should handle protocol-relative baseUrl", function () {
    const url = createMethodUrl("//example.com", testService.method.method);
    expect(url.toString()).toEqual("//example.com/example.Service/Method");
  });
  it("should not duplicating slashes", function () {
    const url = createMethodUrl(
      "https://example.com/",
      testService.method.method,
    );
    expect(url.toString()).toEqual(
      "https://example.com/example.Service/Method",
    );
  });
  it("should merge paths", function () {
    const url = createMethodUrl(
      "https://example.com/twirp",
      testService.method.method,
    );
    expect(url.toString()).toEqual(
      "https://example.com/twirp/example.Service/Method",
    );
  });
  it("should merge paths without duplicating slashes", function () {
    const url = createMethodUrl(
      "https://example.com/twirp/",
      testService.method.method,
    );
    expect(url.toString()).toEqual(
      "https://example.com/twirp/example.Service/Method",
    );
  });
});
