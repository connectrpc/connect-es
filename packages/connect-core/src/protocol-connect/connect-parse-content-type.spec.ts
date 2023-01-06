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

import { connectParseContentType } from "./connect-parse-content-type.js";

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
  });
});
