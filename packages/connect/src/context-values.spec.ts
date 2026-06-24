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
import { createContextKey, createContextValues } from "./context-values.js";

describe("ContextValues", () => {
  it("should get default values", () => {
    const contextValues = createContextValues();
    const kString = createContextKey("default");
    assert.strictEqual(contextValues.get(kString), kString.defaultValue);
  });
  it("should set values", () => {
    const contextValues = createContextValues();
    const kString = createContextKey("default");
    contextValues.set(kString, "foo");
    assert.strictEqual(contextValues.get(kString), "foo");
  });
  it("should delete values", () => {
    const contextValues = createContextValues();
    const kString = createContextKey("default");
    contextValues.set(kString, "foo");
    contextValues.delete(kString);
    assert.strictEqual(contextValues.get(kString), kString.defaultValue);
  });
  it("should work with undefined values", () => {
    const contextValues = createContextValues();
    const kUndefined = createContextKey<string | undefined>("default");
    assert.strictEqual(contextValues.get(kUndefined), kUndefined.defaultValue);
    contextValues.set(kUndefined, undefined);
    assert.strictEqual(contextValues.get(kUndefined), undefined);
  });
  it("should be properties on the type", () => {
    const contextValues = createContextValues();
    const kString = createContextKey("default", { description: "string" });
    contextValues.set(kString, "foo");
    assert.strictEqual(
      (contextValues as unknown as Record<symbol, unknown>)[kString.id],
      "foo",
    );
  });
});
