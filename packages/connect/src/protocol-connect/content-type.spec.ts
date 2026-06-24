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
  contentTypeStreamJson,
  contentTypeStreamProto,
  contentTypeUnaryJson,
  contentTypeUnaryProto,
  parseContentType,
} from "./content-type.js";

describe("parseContentType()", () => {
  it("should parse", () => {
    assert.strictEqual(parseContentType("text/plain"), undefined);
    assert.strictEqual(
      parseContentType("text/plain; charset=utf-8"),
      undefined,
    );
    assert.deepStrictEqual(parseContentType(contentTypeUnaryJson), {
      stream: false,
      binary: false,
    });
    assert.deepStrictEqual(parseContentType(contentTypeUnaryProto), {
      stream: false,
      binary: true,
    });
    assert.deepStrictEqual(parseContentType(contentTypeStreamJson), {
      stream: true,
      binary: false,
    });
    assert.deepStrictEqual(parseContentType(contentTypeStreamProto), {
      stream: true,
      binary: true,
    });
    assert.deepStrictEqual(parseContentType("application/json"), {
      stream: false,
      binary: false,
    });
    assert.deepStrictEqual(parseContentType("application/json;charset=utf8"), {
      stream: false,
      binary: false,
    });
    assert.deepStrictEqual(
      parseContentType("application/json; charset=utf-8"),
      {
        stream: false,
        binary: false,
      },
    );
    assert.deepStrictEqual(parseContentType("application/proto"), {
      stream: false,
      binary: true,
    });
    assert.deepStrictEqual(parseContentType("application/connect+json"), {
      stream: true,
      binary: false,
    });
    assert.deepStrictEqual(
      parseContentType("application/connect+json;charset=utf8"),
      {
        stream: true,
        binary: false,
      },
    );
    assert.deepStrictEqual(parseContentType("application/connect+proto"), {
      stream: true,
      binary: true,
    });
  });
});
