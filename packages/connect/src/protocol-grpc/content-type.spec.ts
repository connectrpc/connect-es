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
  parseContentType,
  contentTypeProto,
  contentTypeJson,
} from "./content-type.js";

describe("parseContentType()", () => {
  it("should parse", () => {
    expect(parseContentType(contentTypeProto)).toEqual({
      binary: true,
    });
    expect(parseContentType(contentTypeJson)).toEqual({
      binary: false,
    });
    expect(parseContentType("application/grpc")).toEqual({
      binary: true,
    });
    expect(parseContentType("application/GRPC")).toEqual({
      binary: true,
    });
    expect(parseContentType("application/grpc+proto")).toEqual({
      binary: true,
    });
    expect(parseContentType("application/grpc+json")).toEqual({
      binary: false,
    });
    expect(parseContentType("application/grpc+json;charset=utf8")).toEqual({
      binary: false,
    });
    expect(parseContentType("application/grpc+json; charset=utf-8")).toEqual({
      binary: false,
    });
    expect(parseContentType("application/octet-stream")).toBeUndefined();
    expect(
      parseContentType("application/grpc-web+json;charset=iso-8859-1"),
    ).toBeUndefined();
    expect(parseContentType("application/grpc-web+thrift")).toBeUndefined();
  });
});
