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

import { MethodKind } from "@bufbuild/protobuf";
import {
  connectExpectContentType,
  connectParseContentType,
} from "./connect-expect-content-type.js";
import { grpcWebParseContentType } from "./grpc-web-expect-content-type.js";

describe("connectParseContentType()", function () {
  it("should parse", function () {
    expect(connectParseContentType("application/json")).toEqual({
      stream: false,
      binary: false,
    });
    expect(connectParseContentType("application/json;charset=utf8")).toEqual({
      stream: false,
      binary: false,
    });
    expect(connectParseContentType("application/json; charset=utf-8")).toEqual({
      stream: false,
      binary: false,
    });
    expect(connectParseContentType("application/proto")).toEqual({
      stream: false,
      binary: true,
    });
    expect(connectParseContentType("application/connect+json")).toEqual({
      stream: true,
      binary: false,
    });
    expect(
      connectParseContentType("application/connect+json;charset=utf8")
    ).toEqual({ stream: true, binary: false });
    expect(connectParseContentType("application/connect+proto")).toEqual({
      stream: true,
      binary: true,
    });
    expect(grpcWebParseContentType("application/octet-stream")).toBeUndefined();
    expect(
      grpcWebParseContentType("application/json;charset=iso-8859-1")
    ).toBeUndefined();
    expect(
      grpcWebParseContentType("application/connect+thrift")
    ).toBeUndefined();
  });
});

describe("connectExpectContentType()", function () {
  describe("unary binary", () => {
    const [itAccepts, itRejects] = makeIt(MethodKind.Unary, true);
    itAccepts(["application/proto", "application/PROTO"]);
    itRejects([
      null,
      undefined as unknown as null,
      "application/json",
      "application/connect+proto",
    ]);
  });

  describe("unary json", () => {
    const [itAccepts, itRejects] = makeIt(MethodKind.Unary, false);
    itAccepts([
      "application/json",
      "Application/JSON",
      "application/json;charset=UTF8",
      "application/json; charset=utf-8",
    ]);
    itRejects([
      null,
      "application/proto",
      "application/connect+json",
      "application/connect+json;charset=ISO-8859-1",
    ]);
  });

  describe("stream binary", () => {
    const [itAccepts, itRejects] = makeIt(MethodKind.BiDiStreaming, true);
    itAccepts(["application/connect+proto", "application/connect+PROTO"]);
    itRejects([null, "application/proto", "application/connect+json"]);
  });

  describe("stream json", () => {
    const [itAccepts, itRejects] = makeIt(MethodKind.BiDiStreaming, false);
    itAccepts([
      "application/connect+json",
      "application/connect+JSON",
      "application/connect+json;charset=UTF8",
      "application/connect+json; charset=utf-8",
    ]);
    itRejects([
      null,
      "application/proto",
      "application/connect+proto",
      "application/connect+json;charset=ISO-8859-1",
    ]);
  });

  function makeIt(methodKind: MethodKind, binary: boolean) {
    function itAccepts(types: (string | null)[]) {
      for (const t of types) {
        it(`accepts ${String(t)}`, () => {
          expect(() =>
            connectExpectContentType(methodKind, binary, t)
          ).not.toThrowError();
        });
      }
    }
    function itRejects(types: (string | null)[]) {
      for (const t of types) {
        it(`rejects ${String(t)}`, () => {
          expect(() =>
            connectExpectContentType(methodKind, binary, t)
          ).toThrowError(
            `[internal] unexpected response content type ${String(t)}`
          );
        });
      }
    }
    return [itAccepts, itRejects];
  }
});
