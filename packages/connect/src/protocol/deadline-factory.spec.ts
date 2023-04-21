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
  createDeadlineParser,
} from "./deadline-factory.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

describe("createDeadlineParser()", function () {
  describe("with invalid input", function () {
    const parseValue = () =>
      new ConnectError("not a timeout", Code.InvalidArgument);
    const parseDeadline = createDeadlineParser(parseValue, 99, undefined);
    it("should return an error", function () {
      const d = parseDeadline("foo");
      expect(d.error).toBeDefined();
      expect(d.error?.code).toBe(Code.InvalidArgument);
      expect(d.signal).toBeUndefined();
      expect(d.cleanup).toBeUndefined();
    });
  });
  describe("with max duration", function () {
    const parseDeadline = createDeadlineParser(() => 1000, 0, undefined);
    it("should raise error", function () {
      const d = parseDeadline("irrelevant");
      expect(d.error?.code).toBe(Code.InvalidArgument);
      expect(d.error?.message).toBe(
        "[invalid_argument] timeout 1000ms must be <= 0ms"
      );
      expect(d.signal).toBeUndefined();
      expect(d.cleanup).toBeUndefined();
    });
  });
});

describe("createDeadlineSignal()", function () {
  describe("initially", function () {
    it("should not be aborted", function () {
      const d = createDeadlineSignal(100, undefined);
      expect(d.signal.aborted).toBeFalse();
    });
    it("should not be aborted initially", function () {
      const d = createDeadlineSignal(100, undefined);
      expect(d.signal).toBeDefined();
      expect(d.cleanup).toBeDefined();
    });
  });
  describe("with aborted shutdown signal", function () {
    it("should be aborted immediately", function () {
      const s = new AbortController();
      s.abort();
      const d = createDeadlineSignal(100, s.signal);
      expect(d.signal.aborted).toBeTrue();
    });
  });
  describe("with 0 timeout", function () {
    it("should be aborted immediately", function () {
      const d = createDeadlineSignal(0, undefined);
      expect(d.signal.aborted).toBeTrue();
    });
  });
  it("should be aborted after timeout", async function () {
    const timeoutMs = 5;
    const d = createDeadlineSignal(timeoutMs, undefined);
    await new Promise((resolve) => setTimeout(resolve, timeoutMs + 25));
    expect(d.signal.aborted).toBeTrue();
    expect(String(d.signal.reason)).toEqual(
      "ConnectError: [deadline_exceeded] the operation timed out"
    );
  });
  it("should be aborted when shut down", async function () {
    const s = new AbortController();
    const d = createDeadlineSignal(100, s.signal);
    s.abort();
    await new Promise((resolve) => setTimeout(resolve, 25));
    expect(d.signal.aborted).toBeTrue();
    expect(String(d.signal.reason)).toEqual(
      "ConnectError: [unavailable] going away"
    );
  });
  it("should surface shutdown reason via cause", function () {
    const s = new AbortController();
    s.abort(new Error("cause"));
    const d = createDeadlineSignal(100, s.signal);
    expect(d.signal.aborted).toBeTrue();
    expect(String(d.signal.reason)).toEqual(
      "ConnectError: [unavailable] going away"
    );
    if (d.signal.reason instanceof ConnectError) {
      expect(d.signal.reason.cause).toEqual(new Error("cause"));
    }
  });
});
