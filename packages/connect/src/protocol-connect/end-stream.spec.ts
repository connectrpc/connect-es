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
import type { JsonObject } from "@bufbuild/protobuf";
import { endStreamFromJson, endStreamToJson } from "./end-stream.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { errorToJson } from "./error-json.js";

describe("endStreamFromJson()", () => {
  it("should parse expected", () => {
    const json: JsonObject = {
      error: {
        code: "resource_exhausted",
        message: "my bad",
      },
      metadata: { foo: ["baz", "bar"] },
    };
    const endStream = endStreamFromJson(JSON.stringify(json));
    assert.strictEqual(endStream.metadata.get("foo"), "baz, bar");
    assert.strictEqual(endStream.error?.code, Code.ResourceExhausted);
    assert.strictEqual(endStream.error?.rawMessage, "my bad");
  });
  it("should raise protocol error on malformed metadata", () => {
    const json: JsonObject = {
      metadata: false,
    };
    assert.throws(() => endStreamFromJson(JSON.stringify(json)), {
      message: "[unknown] invalid end stream",
    });
  });
});

describe("endStreamToJson()", () => {
  it("should be {} in the most simple form", () => {
    const got = endStreamToJson(new Headers(), undefined, undefined);
    const want: JsonObject = {};
    assert.deepStrictEqual(got, want);
  });
  it("should serialize the error", () => {
    const err = new ConnectError("my bad", Code.ResourceExhausted);
    const got = endStreamToJson(new Headers(), err, undefined);
    const want: JsonObject = {
      error: errorToJson(err, undefined),
    };
    assert.deepStrictEqual(got, want);
  });
  it("should serialize metadata", () => {
    const got = endStreamToJson(
      new Headers({
        foo: "bar",
      }),
      undefined,
      undefined,
    );
    const want: JsonObject = {
      metadata: { foo: ["bar"] },
    };
    assert.deepStrictEqual(got, want);
  });
  it("should serialize metadata from the error", () => {
    const err = new ConnectError("my bad", Code.ResourceExhausted, {
      foo: "bar",
    });
    const got = endStreamToJson(new Headers(), err, undefined);
    const want: JsonObject = {
      error: errorToJson(err, undefined),
      metadata: { foo: ["bar"] },
    };
    assert.deepStrictEqual(got, want);
  });
  it("should append metadata from the error", () => {
    const err = new ConnectError("my bad", Code.ResourceExhausted, {
      foo: "bar",
    });
    const got = endStreamToJson(
      new Headers({
        foo: "baz",
      }),
      err,
      undefined,
    );
    const want: JsonObject = {
      error: errorToJson(err, undefined),
      metadata: { foo: ["baz, bar"] },
    };
    assert.deepStrictEqual(got, want);
  });
});
