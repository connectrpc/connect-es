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
import { createAsyncQueue } from "./async-queue.js";

describe("createAsyncQueue()", () => {
  it("should read buffered items in order before it ends", async () => {
    const queue = createAsyncQueue<string>();

    queue.push("first");
    queue.push("second");
    queue.end();

    assert.deepStrictEqual(await queue.next(), { done: false, value: "first" });
    assert.deepStrictEqual(await queue.next(), {
      done: false,
      value: "second",
    });
    assert.deepStrictEqual(await queue.next(), {
      done: true,
      value: undefined,
    });
  });

  it("should drop items pushed after it ended", async () => {
    const queue = createAsyncQueue<string>();

    queue.end();
    queue.push("late");

    assert.deepStrictEqual(await queue.next(), {
      done: true,
      value: undefined,
    });
  });

  it("should give a waiting reader the next pushed item", async () => {
    const queue = createAsyncQueue<string>();

    const result = queue.next();
    queue.push("first");

    assert.deepStrictEqual(await result, { done: false, value: "first" });
  });

  it("should end a waiting reader", async () => {
    const queue = createAsyncQueue<string>();

    const result = queue.next();
    queue.end();

    assert.deepStrictEqual(await result, { done: true, value: undefined });
  });
});
