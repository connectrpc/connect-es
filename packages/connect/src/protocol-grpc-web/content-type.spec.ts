// Copyright 2021-2026 The Connect Authors
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

import { describe, it } from "node:test";
import * as assert from "node:assert";
import {
  parseContentType,
  contentTypeJson,
  contentTypeProto,
} from "./content-type.js";

describe("parseContentType()", () => {
  it("should parse", () => {
    assert.deepStrictEqual(parseContentType(contentTypeProto), {
      text: false,
      binary: true,
    });
    assert.deepStrictEqual(parseContentType(contentTypeJson), {
      text: false,
      binary: false,
    });
    assert.deepStrictEqual(parseContentType("application/grpc-web"), {
      text: false,
      binary: true,
    });
    assert.deepStrictEqual(parseContentType("application/grpc-WEB"), {
      text: false,
      binary: true,
    });
    assert.deepStrictEqual(parseContentType("application/grpc-web+proto"), {
      text: false,
      binary: true,
    });
    assert.deepStrictEqual(parseContentType("application/grpc-web+json"), {
      text: false,
      binary: false,
    });
    assert.deepStrictEqual(
      parseContentType("application/grpc-web+json;charset=utf8"),
      {
        text: false,
        binary: false,
      },
    );
    assert.deepStrictEqual(
      parseContentType("application/grpc-web+json; charset=utf-8"),
      { text: false, binary: false },
    );
    assert.deepStrictEqual(parseContentType("application/grpc-web-text"), {
      text: true,
      binary: true,
    });
    assert.deepStrictEqual(
      parseContentType("application/grpc-web-text+proto"),
      {
        text: true,
        binary: true,
      },
    );
    assert.deepStrictEqual(parseContentType("application/grpc-web-text+json"), {
      text: true,
      binary: false,
    });
    assert.deepStrictEqual(
      parseContentType("application/grpc-web-text+json;charset=utf8"),
      { text: true, binary: false },
    );
    assert.deepStrictEqual(
      parseContentType("application/grpc-web-text+json; charset=utf-8"),
      { text: true, binary: false },
    );
    assert.strictEqual(parseContentType("application/octet-stream"), undefined);
    assert.strictEqual(
      parseContentType("application/grpc-web+json;charset=iso-8859-1"),
      undefined,
    );
    assert.strictEqual(
      parseContentType("application/grpc-web+thrift"),
      undefined,
    );
    assert.strictEqual(
      parseContentType("application/connect+thrift"),
      undefined,
    );
  });
});
