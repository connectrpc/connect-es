// Copyright 2021-2025 The Connect Authors
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
      expect(e.code).toBe(Code.Unknown);
      expect(e.message).toBe("[unknown] foo");
      expect(e.rawMessage).toBe("foo");
      expect(String(e)).toBe("ConnectError: [unknown] foo");
    });
    it("should take other status", () => {
      const e = new ConnectError("foo", Code.AlreadyExists);
      expect(e.code).toBe(Code.AlreadyExists);
      expect(e.message).toBe("[already_exists] foo");
      expect(e.rawMessage).toBe("foo");
      expect(String(e)).toBe("ConnectError: [already_exists] foo");
    });
    it("accepts metadata", () => {
      const e = new ConnectError("foo", Code.AlreadyExists, { foo: "bar" });
      expect(e.metadata.get("foo")).toBe("bar");
    });
  });
  describe("findDetails()", () => {
    describe("on error without details", () => {
      const err = new ConnectError("foo");
      it("with empty TypeRegistry produces no details", () => {
        const details = err.findDetails(createRegistry());
        expect(details.length).toBe(0);
      });
      it("with non-empty TypeRegistry produces no details", () => {
        const details = err.findDetails(createRegistry(StructSchema));
        expect(details.length).toBe(0);
      });
      it("with MessageType produces no details", () => {
        const details = err.findDetails(StructSchema);
        expect(details.length).toBe(0);
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
        expect(details.length).toBe(0);
      });
      it("with non-empty TypeRegistry produces detail", () => {
        const details = err.findDetails(createRegistry(StructSchema));
        expect(details.length).toBe(1);
      });
      it("with MessageType produces detail", () => {
        const details = err.findDetails(StructSchema);
        expect(details.length).toBe(1);
        if (isMessage(details[0], StructSchema)) {
          const detail = toJson(StructSchema, details[0]) as Record<
            string,
            unknown
          >; // Otherwise TS can't compute the type in expect
          expect(detail).toEqual({
            domain: "example.com",
            reason: "soirée 🎉",
          });
        } else {
          fail();
        }
      });
      it("with multiple MessageTypes produces detail", () => {
        const details = err.findDetails(
          createRegistry(StructSchema, BoolValueSchema),
        );
        expect(details.length).toBe(1);
        expect(isMessage(details[0], StructSchema)).toBeTrue();
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
      expect(got as unknown).toBe(error);
      expect(got.code).toBe(Code.PermissionDenied);
      expect(got.rawMessage).toBe("Not permitted");
      expect(got.cause).toBeUndefined();
    });
    it("accepts any Error", () => {
      const error: unknown = new Error("Not permitted");
      const got = ConnectError.from(error);
      expect(got as unknown).not.toBe(error);
      expect(got.code).toBe(Code.Unknown);
      expect(got.rawMessage).toBe("Not permitted");
      expect(got.cause).toBe(error);
    });
    it("accepts string value", () => {
      const error: unknown = "Not permitted";
      const got = ConnectError.from(error);
      expect(got.code).toBe(Code.Unknown);
      expect(got.rawMessage).toBe("Not permitted");
      expect(got.cause).toBe(error);
    });
    it("wraps AbortError with code canceled", () => {
      // abort() on AbortSignal aborts with a AbortError
      const error: unknown = new DOMException("foo", "AbortError");
      const got = ConnectError.from(error);
      expect(got.code).toBe(Code.Canceled);
      expect(got.rawMessage).toBe("foo");
    });
    it("wraps TimeoutError with code canceled", () => {
      // AbortSignal.timeout() aborts with a TimeoutError
      const error: unknown = new DOMException("foo", "TimeoutError");
      const got = ConnectError.from(error);
      expect(got.code).toBe(Code.Canceled);
      expect(got.rawMessage).toBe("foo");
    });
  });
  describe("instanceof", () => {
    it("works for the actual ConnectError", () => {
      expect(new ConnectError("foo")).toBeInstanceOf(ConnectError);
    });
    it("works for ConnectError like errors", () => {
      expect(new ConnectError2("foo")).toBeInstanceOf(ConnectError);
    });
    it("fails for other errors", () => {
      expect(new Error("foo")).not.toBeInstanceOf(ConnectError);
      expect(null).not.toBeInstanceOf(ConnectError);
      expect(undefined).not.toBeInstanceOf(ConnectError);
      expect("err").not.toBeInstanceOf(ConnectError);
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
    expect(err.rawMessage).toBe("foo");
  });
  it("asserts ConnectError with Code", () => {
    const err: unknown = new ConnectError("foo", Code.PermissionDenied);
    assertConnectError(err, Code.PermissionDenied);
    expect(err.code).toBe(Code.PermissionDenied);
    expect(err.rawMessage).toBe("foo");
  });
  it("rethrows non-ConnectErrors", () => {
    expect(() => assertConnectError(true)).toThrow(true);
  });
  it("rethrows ConnectError with unwanted Code", () => {
    const err: unknown = new ConnectError("foo", Code.PermissionDenied);
    expect(() => assertConnectError(err, Code.InvalidArgument)).toThrow(err);
  });
});
