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

import { describe, it, beforeEach } from "node:test";
import * as assert from "node:assert";

describe("Fetch API Headers", () => {
  let headers: Headers;
  beforeEach(() => {
    headers = new Headers({
      "Content-Type": "application/connect+json",
    });
  });
  it("get()", () => {
    assert.strictEqual(headers.get("Content-Type"), "application/connect+json");
    assert.strictEqual(headers.get("content-type"), "application/connect+json");
  });
  it("forEach()", () => {
    headers.forEach((value, key) => {
      // Note all keys are lowercase when iterating over them
      assert.strictEqual(key, "content-type");
      assert.strictEqual(value, "application/connect+json");
    });
  });
  it("has()", () => {
    assert.ok(headers.has("Content-Type"));
    assert.ok(headers.has("content-type"));
  });
});
