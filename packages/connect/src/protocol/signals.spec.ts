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

import { getEventListeners } from "node:events";
import { describe, it } from "node:test";
import * as assert from "node:assert";
import {
  createDeadlineSignal,
  createLinkedAbortController,
} from "./signals.js";

describe("createLinkedAbortController()", () => {
  it("should create an AbortController without any input", () => {
    const ac = createLinkedAbortController();
    assert.ok(!ac.signal.aborted);
  });
  it("should be aborted if one of the inputs is already aborted", () => {
    const aborted = AbortSignal.abort("test-reason");
    const nonAborted = new AbortController().signal;
    const ac = createLinkedAbortController(aborted, nonAborted);
    assert.ok(ac.signal.aborted);
    assert.strictEqual(ac.signal.reason, "test-reason");
  });
  it("should abort if one of the inputs aborts", () => {
    const a = new AbortController();
    const b = new AbortController();
    const c = new AbortController();
    const ac = createLinkedAbortController(a.signal, b.signal, c.signal);
    assert.ok(!ac.signal.aborted);
    b.abort();
    assert.ok(ac.signal.aborted);
  });
  it("should use the abort reason", () => {
    const a = new AbortController();
    const ac = createLinkedAbortController(a.signal);
    assert.ok(!ac.signal.aborted);
    a.abort("test-reason");
    assert.ok(ac.signal.aborted);
    assert.strictEqual(ac.signal.reason, "test-reason");
  });
  it("should attach only a single abort listener to a shared signal and remove it once all controllers abort", () => {
    const shared = new AbortController();
    const controllers = Array.from({ length: 10 }, () =>
      createLinkedAbortController(shared.signal),
    );
    assert.strictEqual(getEventListeners(shared.signal, "abort").length, 1);

    for (const ac of controllers.slice(0, -1)) {
      ac.abort();
    }
    assert.strictEqual(getEventListeners(shared.signal, "abort").length, 1);
    assert.ok(!controllers[controllers.length - 1].signal.aborted);

    controllers[controllers.length - 1].abort();
    assert.strictEqual(getEventListeners(shared.signal, "abort").length, 0);
  });
  it("should abort all linked controllers when a shared signal aborts and remove listeners from other linked signals", () => {
    const shared = new AbortController();
    const other1 = new AbortController();
    const other2 = new AbortController();
    const ac1 = createLinkedAbortController(shared.signal, other1.signal);
    const ac2 = createLinkedAbortController(shared.signal, other2.signal);

    assert.strictEqual(getEventListeners(shared.signal, "abort").length, 1);
    shared.abort("shutdown-reason");

    assert.ok(ac1.signal.aborted);
    assert.strictEqual(ac1.signal.reason, "shutdown-reason");
    assert.ok(ac2.signal.aborted);
    assert.strictEqual(ac2.signal.reason, "shutdown-reason");
    assert.strictEqual(getEventListeners(shared.signal, "abort").length, 0);
    assert.strictEqual(getEventListeners(other1.signal, "abort").length, 0);
    assert.strictEqual(getEventListeners(other2.signal, "abort").length, 0);
  });
  it("should still abort newly linked controllers after earlier ones finish on the same shared signal", () => {
    const shared = new AbortController();
    const ac1 = createLinkedAbortController(shared.signal);
    ac1.abort();
    assert.strictEqual(getEventListeners(shared.signal, "abort").length, 0);

    const ac2 = createLinkedAbortController(shared.signal);
    assert.strictEqual(getEventListeners(shared.signal, "abort").length, 1);
    shared.abort("late-shutdown");

    assert.ok(ac2.signal.aborted);
    assert.strictEqual(ac2.signal.reason, "late-shutdown");
    assert.strictEqual(getEventListeners(shared.signal, "abort").length, 0);
  });
  it("should not leave listeners attached when a later input signal is already aborted", () => {
    const nonAborted = new AbortController();
    const ac = createLinkedAbortController(
      nonAborted.signal,
      AbortSignal.abort("already"),
    );
    assert.ok(ac.signal.aborted);
    assert.strictEqual(ac.signal.reason, "already");
    assert.strictEqual(getEventListeners(nonAborted.signal, "abort").length, 0);
  });
  it("should handle duplicate input signals cleanly", () => {
    const a = new AbortController();
    const ac1 = createLinkedAbortController(a.signal, a.signal);
    assert.strictEqual(getEventListeners(a.signal, "abort").length, 1);
    ac1.abort();
    assert.strictEqual(getEventListeners(a.signal, "abort").length, 0);

    const ac2 = createLinkedAbortController(a.signal, a.signal);
    assert.strictEqual(getEventListeners(a.signal, "abort").length, 1);
    a.abort("dup");
    assert.ok(ac2.signal.aborted);
    assert.strictEqual(ac2.signal.reason, "dup");
    assert.strictEqual(getEventListeners(a.signal, "abort").length, 0);
  });
});

describe("createDeadlineSignal()", () => {
  describe("initially", () => {
    it("should not be aborted", () => {
      const d = createDeadlineSignal(100);
      assert.ok(!d.signal.aborted);
    });
    it("should not be aborted initially", () => {
      const d = createDeadlineSignal(100);
      assert.notStrictEqual(d.signal, undefined);
      assert.notStrictEqual(d.cleanup, undefined);
    });
  });
  describe("with 0 timeout", () => {
    it("should be aborted immediately", () => {
      const d = createDeadlineSignal(0);
      assert.ok(d.signal.aborted);
    });
  });
  describe("with -1 timeout", () => {
    it("should be aborted immediately", () => {
      const d = createDeadlineSignal(-1);
      assert.ok(d.signal.aborted);
    });
  });
  describe("with undefined timeout", () => {
    it("should still return a signal", () => {
      const d = createDeadlineSignal(undefined);
      assert.ok(!d.signal.aborted);
    });
  });
  it("should be aborted after timeout", async () => {
    const timeoutMs = 5;
    const d = createDeadlineSignal(timeoutMs);
    await new Promise((resolve) => setTimeout(resolve, timeoutMs + 25));
    assert.ok(d.signal.aborted);
    assert.strictEqual(
      String(d.signal.reason),
      "ConnectError: [deadline_exceeded] the operation timed out",
    );
  });
});
