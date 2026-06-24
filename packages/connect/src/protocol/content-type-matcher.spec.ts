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
import { contentTypeMatcher } from "./content-type-matcher.js";

describe("contentTypeMatcher()", () => {
  it("matches multiple regular expressions as expected", () => {
    const matcher = contentTypeMatcher(/a/, /b/);
    assert.ok(matcher("a"));
    assert.ok(matcher("b"));
    assert.ok(!matcher("c"));
    assert.ok(!matcher("d"));
  });
  it("matches multiple content type matchers as expected", () => {
    const matcher = contentTypeMatcher(
      contentTypeMatcher(/a/, /b/),
      contentTypeMatcher(/c/),
    );
    assert.ok(matcher("a"));
    assert.ok(matcher("b"));
    assert.ok(matcher("c"));
    assert.ok(!matcher("d"));
  });
});
