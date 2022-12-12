// Copyright 2021-2022 Buf Technologies, Inc.
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

import { grpcParseContentType } from "./grpc-parse-content-type.js";

describe("grpcParseContentType()", function () {
  it("should parse", function () {
    expect(grpcParseContentType("application/grpc")).toEqual({
      binary: true,
    });
    expect(grpcParseContentType("application/GRPC")).toEqual({
      binary: true,
    });
    expect(grpcParseContentType("application/grpc+proto")).toEqual({
      binary: true,
    });
    expect(grpcParseContentType("application/grpc+json")).toEqual({
      binary: false,
    });
    expect(grpcParseContentType("application/grpc+json;charset=utf8")).toEqual({
      binary: false,
    });
    expect(
      grpcParseContentType("application/grpc+json; charset=utf-8")
    ).toEqual({ binary: false });
    expect(grpcParseContentType("application/octet-stream")).toBeUndefined();
    expect(
      grpcParseContentType("application/grpc-web+json;charset=iso-8859-1")
    ).toBeUndefined();
    expect(grpcParseContentType("application/grpc-web+thrift")).toBeUndefined();
  });
});
