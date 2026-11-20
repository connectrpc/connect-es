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
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { decodeMetadata, validateMetadata } from "./metadata.js";

describe("decodeMetadata()", () => {
  it("should reject an entry that is not an array", () => {
    assert.throws(
      () => decodeMetadata('["x-test"]'),
      (e) => e instanceof ConnectError && e.code === Code.Internal,
    );
  });
});

describe("validateMetadata()", () => {
  it("should accept other keys with ASCII values", () => {
    validateMetadata(new Headers({ "acme-whitespace": "a b\tc~" }));
    validateMetadata(new Headers({ "acme-empty": "" }));
  });

  it("should reject reserved keys and values that are not ASCII", () => {
    const headers = [
      ["Cookie", "a=b"],
      ["sec-websocket-key", "a"],
      ["acme-tenant", "a\u0001b"],
      ["acme-tenant", "a\u007f"],
    ];
    for (const [key, value] of headers) {
      assert.throws(
        () => validateMetadata(new Headers({ [key]: value })),
        (e) => e instanceof ConnectError && e.code === Code.Internal,
        key,
      );
    }
  });
});
