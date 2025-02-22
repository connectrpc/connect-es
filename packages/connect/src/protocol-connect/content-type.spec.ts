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

import {
  contentTypeStreamJson,
  contentTypeStreamProto,
  contentTypeUnaryJson,
  contentTypeUnaryProto,
  parseContentType,
} from "./content-type.js";

describe("parseContentType()", function () {
  it("should parse", function () {
    expect(parseContentType("text/plain")).toBeUndefined();
    expect(parseContentType("text/plain; charset=utf-8")).toBeUndefined();
    expect(parseContentType(contentTypeUnaryJson)).toEqual({
      stream: false,
      binary: false,
    });
    expect(parseContentType(contentTypeUnaryProto)).toEqual({
      stream: false,
      binary: true,
    });
    expect(parseContentType(contentTypeStreamJson)).toEqual({
      stream: true,
      binary: false,
    });
    expect(parseContentType(contentTypeStreamProto)).toEqual({
      stream: true,
      binary: true,
    });
    expect(parseContentType("application/json")).toEqual({
      stream: false,
      binary: false,
    });
    expect(parseContentType("application/json;charset=utf8")).toEqual({
      stream: false,
      binary: false,
    });
    expect(parseContentType("application/json; charset=utf-8")).toEqual({
      stream: false,
      binary: false,
    });
    expect(parseContentType("application/proto")).toEqual({
      stream: false,
      binary: true,
    });
    expect(parseContentType("application/connect+json")).toEqual({
      stream: true,
      binary: false,
    });
    expect(parseContentType("application/connect+json;charset=utf8")).toEqual({
      stream: true,
      binary: false,
    });
    expect(parseContentType("application/connect+proto")).toEqual({
      stream: true,
      binary: true,
    });
  });
});
