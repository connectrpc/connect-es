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
  createRegistry,
  fromJson,
  isMessage,
  toJson,
} from "@bufbuild/protobuf";
import type { Message } from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import { BoolValueSchema, StructSchema } from "@bufbuild/protobuf/wkt";

class ConnectError2 extends Error {
  readonly code: Code;
  readonly metadata: Headers;
  details: Message[];
  readonly rawMessage: string;
  override name = "ConnectError";
  cause: unknown;

  constructor(
    message: string,
    code: Code = Code.Unknown,
    metadata?: HeadersInit,
    outgoingDetails?: Message[],
    cause?: unknown,
  ) {
    super(message);
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.metadata = new Headers(metadata ?? {});
    this.details = outgoingDetails ?? [];
    this.cause = cause;
  }
}

describe("ConnectError", () => {
  describe("constructor", () => {
    it("should have status unknown by default", () => {
      const e = new ConnectError("foo");
      assert.strictEqual(e.code, Code.Unknown);
      assert.strictEqual(e.message, "[unknown] foo");
      assert.strictEqual(e.rawMessage, "foo");
      assert.strictEqual(String(e), "ConnectError: [unknown] foo");
    });
    it("should take other status", () => {
      const e = new ConnectError("foo", Code.AlreadyExists);
      assert.strictEqual(e.code, Code.AlreadyExists);
      assert.strictEqual(e.message, "[already_exists] foo");
      assert.strictEqual(e.rawMessage, "foo");
      assert.strictEqual(String(e), "ConnectError: [already_exists] foo");
    });
    it("accepts metadata", () => {
      const e = new ConnectError("foo", Code.AlreadyExists, { foo: "bar" });
      assert.strictEqual(e.metadata.get("foo"), "bar");
    });
  });
  describe("findDetails()", () => {
    describe("on error without details", () => {
      const err = new ConnectError("foo");
      it("with empty TypeRegistry produces no details", () => {
        const details = err.findDetails(createRegistry());
        assert.strictEqual(details.length, 0);
      });
      it("with non-empty TypeRegistry produces no details", () => {
        const details = err.findDetails(createRegistry(StructSchema));
        assert.strictEqual(details.length, 0);
      });
      it("with MessageType produces no details", () => {
        const details = err.findDetails(StructSchema);
        assert.strictEqual(details.length, 0);
      });
    });
    describe("on error with Any details", () => {
      const err = new ConnectError("foo");
      err.details.push({
        desc: StructSchema,
        value: fromJson(StructSchema, {
          reason: "soirée 🎉",
          domain: "example.com",
        }),
      });
      it("with empty TypeRegistry produces no details", () => {
        const details = err.findDetails(createRegistry());
        assert.strictEqual(details.length, 0);
      });
      it("with non-empty TypeRegistry produces detail", () => {
        const details = err.findDetails(createRegistry(StructSchema));
        assert.strictEqual(details.length, 1);
      });
      it("with MessageType produces detail", () => {
        const details = err.findDetails(StructSchema);
        assert.strictEqual(details.length, 1);
        if (isMessage(details[0], StructSchema)) {
          const detail = toJson(StructSchema, details[0]) as Record<
            string,
            unknown
          >; // Otherwise TS can't compute the type in expect
          assert.deepStrictEqual(detail, {
            domain: "example.com",
            reason: "soirée 🎉",
          });
        } else {
          assert.fail();
        }
      });
      it("with multiple MessageTypes produces detail", () => {
        const details = err.findDetails(
          createRegistry(StructSchema, BoolValueSchema),
        );
        assert.strictEqual(details.length, 1);
        assert.ok(isMessage(details[0], StructSchema));
      });
    });
  });
  describe("from()", () => {
    it("accepts ConnectError as unknown", () => {
      const error: unknown = new ConnectError(
        "Not permitted",
        Code.PermissionDenied,
      );
      const got = ConnectError.from(error);
      assert.strictEqual(got as unknown, error);
      assert.strictEqual(got.code, Code.PermissionDenied);
      assert.strictEqual(got.rawMessage, "Not permitted");
      assert.strictEqual(got.cause, undefined);
    });
    it("accepts any Error", () => {
      const error: unknown = new Error("Not permitted");
      const got = ConnectError.from(error);
      assert.notStrictEqual(got as unknown, error);
      assert.strictEqual(got.code, Code.Unknown);
      assert.strictEqual(got.rawMessage, "Not permitted");
      assert.strictEqual(got.cause, error);
    });
    it("accepts string value", () => {
      const error: unknown = "Not permitted";
      const got = ConnectError.from(error);
      assert.strictEqual(got.code, Code.Unknown);
      assert.strictEqual(got.rawMessage, "Not permitted");
      assert.strictEqual(got.cause, error);
    });
    it("wraps AbortError with code canceled", () => {
      // abort() on AbortSignal aborts with a AbortError
      const error: unknown = new DOMException("foo", "AbortError");
      const got = ConnectError.from(error);
      assert.strictEqual(got.code, Code.Canceled);
      assert.strictEqual(got.rawMessage, "foo");
    });
    it("wraps TimeoutError with code canceled", () => {
      // AbortSignal.timeout() aborts with a TimeoutError
      const error: unknown = new DOMException("foo", "TimeoutError");
      const got = ConnectError.from(error);
      assert.strictEqual(got.code, Code.Canceled);
      assert.strictEqual(got.rawMessage, "foo");
    });
  });
  describe("instanceof", () => {
    it("works for the actual ConnectError", () => {
      assert.ok(new ConnectError("foo") instanceof ConnectError);
    });
    it("works for ConnectError like errors", () => {
      assert.ok(new ConnectError2("foo") instanceof ConnectError);
    });
    it("fails for other errors", () => {
      assert.ok(!(new Error("foo") instanceof ConnectError));
      assert.ok(!((null as unknown) instanceof ConnectError));
      assert.ok(!((undefined as unknown) instanceof ConnectError));
      assert.ok(!(("err" as unknown) instanceof ConnectError));
    });
  });
});

describe("assertConnectError() example", () => {
  /**
   * Asserts that the given reason is a ConnectError.
   * If the reason is not a ConnectError, or does not
   * have the wanted Code, rethrow it.
   */
  function assertConnectError(
    reason: unknown,
    ...codes: Code[]
  ): asserts reason is ConnectError {
    if (reason instanceof ConnectError) {
      if (codes.length === 0) {
        return;
      }
      if (codes.includes(reason.code)) {
        return;
      }
    }
    // reason is not a ConnectError, or does
    // not have the wanted Code - rethrow it.
    throw reason;
  }
  it("asserts ConnectError", () => {
    const err: unknown = new ConnectError("foo");
    assertConnectError(err);
    assert.strictEqual(err.rawMessage, "foo");
  });
  it("asserts ConnectError with Code", () => {
    const err: unknown = new ConnectError("foo", Code.PermissionDenied);
    assertConnectError(err, Code.PermissionDenied);
    assert.strictEqual(err.code, Code.PermissionDenied);
    assert.strictEqual(err.rawMessage, "foo");
  });
  it("rethrows non-ConnectErrors", () => {
    assert.throws(
      () => assertConnectError(true),
      (err) => err === true,
    );
  });
  it("rethrows ConnectError with unwanted Code", () => {
    const err: unknown = new ConnectError("foo", Code.PermissionDenied);
    assert.throws(
      () => assertConnectError(err, Code.InvalidArgument),
      (e) => e === err,
    );
  });
});
