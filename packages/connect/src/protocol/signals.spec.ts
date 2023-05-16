// Copyright 2021-2023 Buf Technologies, Inc.
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

import {
  createDeadlineSignal,
  createLinkedAbortController,
} from "./signals.js";

describe("createLinkedAbortController()", function () {
  it("should create an AbortController without any input", function () {
    const ac = createLinkedAbortController();
    expect(ac.signal.aborted).toBeFalse();
  });
  it("should be aborted if one of the inputs is already aborted", function () {
    const aborted = AbortSignal.abort("test-reason");
    const nonAborted = new AbortController().signal;
    const ac = createLinkedAbortController(aborted, nonAborted);
    expect(ac.signal.aborted).toBeTrue();
    expect(ac.signal.reason).toBe("test-reason");
  });
  it("should abort if one of the inputs aborts", function () {
    const a = new AbortController();
    const b = new AbortController();
    const c = new AbortController();
    const ac = createLinkedAbortController(a.signal, b.signal, c.signal);
    expect(ac.signal.aborted).toBeFalse();
    b.abort();
    expect(ac.signal.aborted).toBeTrue();
  });
  it("should use the abort reason", function () {
    const a = new AbortController();
    const ac = createLinkedAbortController(a.signal);
    expect(ac.signal.aborted).toBeFalse();
    a.abort("test-reason");
    expect(ac.signal.aborted).toBeTrue();
    expect(ac.signal.reason).toBe("test-reason");
  });
});

describe("createDeadlineSignal()", function () {
  describe("initially", function () {
    it("should not be aborted", function () {
      const d = createDeadlineSignal(100);
      expect(d.signal.aborted).toBeFalse();
    });
    it("should not be aborted initially", function () {
      const d = createDeadlineSignal(100);
      expect(d.signal).toBeDefined();
      expect(d.cleanup).toBeDefined();
    });
  });
  describe("with 0 timeout", function () {
    it("should be aborted immediately", function () {
      const d = createDeadlineSignal(0);
      expect(d.signal.aborted).toBeTrue();
    });
  });
  describe("with -1 timeout", function () {
    it("should be aborted immediately", function () {
      const d = createDeadlineSignal(-1);
      expect(d.signal.aborted).toBeTrue();
    });
  });
  describe("with undefined timeout", function () {
    it("should still return a signal", function () {
      const d = createDeadlineSignal(undefined);
      expect(d.signal.aborted).toBeFalse();
    });
  });
  it("should be aborted after timeout", async function () {
    const timeoutMs = 5;
    const d = createDeadlineSignal(timeoutMs);
    await new Promise((resolve) => setTimeout(resolve, timeoutMs + 25));
    expect(d.signal.aborted).toBeTrue();
    expect(String(d.signal.reason)).toEqual(
      "ConnectError: [deadline_exceeded] the operation timed out"
    );
  });
});
