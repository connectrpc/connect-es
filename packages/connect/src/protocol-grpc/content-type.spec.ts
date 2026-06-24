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
  contentTypeProto,
  contentTypeJson,
} from "./content-type.js";

describe("parseContentType()", () => {
  it("should parse", () => {
    assert.deepStrictEqual(parseContentType(contentTypeProto), {
      binary: true,
    });
    assert.deepStrictEqual(parseContentType(contentTypeJson), {
      binary: false,
    });
    assert.deepStrictEqual(parseContentType("application/grpc"), {
      binary: true,
    });
    assert.deepStrictEqual(parseContentType("application/GRPC"), {
      binary: true,
    });
    assert.deepStrictEqual(parseContentType("application/grpc+proto"), {
      binary: true,
    });
    assert.deepStrictEqual(parseContentType("application/grpc+json"), {
      binary: false,
    });
    assert.deepStrictEqual(
      parseContentType("application/grpc+json;charset=utf8"),
      {
        binary: false,
      },
    );
    assert.deepStrictEqual(
      parseContentType("application/grpc+json; charset=utf-8"),
      {
        binary: false,
      },
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
  });
});
