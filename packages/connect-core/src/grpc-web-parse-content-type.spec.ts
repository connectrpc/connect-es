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

import { grpcWebParseContentType } from "./grpc-web-parse-content-type.js";

describe("grpcWebParseContentType()", function () {
  it("should parse", function () {
    expect(grpcWebParseContentType("application/grpc-web")).toEqual({
      text: false,
      binary: true,
    });
    expect(grpcWebParseContentType("application/grpc-WEB")).toEqual({
      text: false,
      binary: true,
    });
    expect(grpcWebParseContentType("application/grpc-web+proto")).toEqual({
      text: false,
      binary: true,
    });
    expect(grpcWebParseContentType("application/grpc-web+json")).toEqual({
      text: false,
      binary: false,
    });
    expect(
      grpcWebParseContentType("application/grpc-web+json;charset=utf8")
    ).toEqual({ text: false, binary: false });
    expect(
      grpcWebParseContentType("application/grpc-web+json; charset=utf-8")
    ).toEqual({ text: false, binary: false });
    expect(grpcWebParseContentType("application/grpc-web-text")).toEqual({
      text: true,
      binary: true,
    });
    expect(grpcWebParseContentType("application/grpc-web-text+proto")).toEqual({
      text: true,
      binary: true,
    });
    expect(grpcWebParseContentType("application/grpc-web-text+json")).toEqual({
      text: true,
      binary: false,
    });
    expect(
      grpcWebParseContentType("application/grpc-web-text+json;charset=utf8")
    ).toEqual({ text: true, binary: false });
    expect(
      grpcWebParseContentType("application/grpc-web-text+json; charset=utf-8")
    ).toEqual({ text: true, binary: false });
    expect(grpcWebParseContentType("application/octet-stream")).toBeUndefined();
    expect(
      grpcWebParseContentType("application/grpc-web+json;charset=iso-8859-1")
    ).toBeUndefined();
    expect(
      grpcWebParseContentType("application/grpc-web+thrift")
    ).toBeUndefined();
  });
});
