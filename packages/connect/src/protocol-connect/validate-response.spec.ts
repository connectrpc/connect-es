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

import { validateResponse } from "./validate-response.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

describe("Connect validateResponse()", () => {
  describe("with unary", () => {
    it("should be successful for HTTP 200 with proper unary JSON content type", () => {
      const r = validateResponse(
        "unary",
        false,
        200,
        new Headers({ "Content-Type": "application/json" }),
      );
      expect(r.isUnaryError).toBeFalse();
      expect(r.unaryError).toBeUndefined();
    });
    it("should return error for HTTP 204", () => {
      const r = validateResponse(
        "unary",
        false,
        204,
        new Headers({ "Content-Type": "application/json" }),
      );
      expect(r.isUnaryError).toBeTrue();
      expect(r.unaryError?.message).toBe("[unknown] HTTP 204");
    });
    it("should include headers as error metadata", () => {
      const r = validateResponse(
        "unary",
        false,
        204,
        new Headers({ "Content-Type": "application/json", Foo: "Bar" }),
      );
      expect(r.unaryError?.metadata.get("Foo")).toBe("Bar");
    });
    it("should be successful for HTTP 200 with proper unary proto content type", () => {
      const r = validateResponse(
        "unary",
        true,
        200,
        new Headers({ "Content-Type": "application/proto" }),
      );
      expect(r.isUnaryError).toBeFalse();
      expect(r.unaryError).toBeUndefined();
    });
    it("should throw error for HTTP error status with binary response body", () => {
      try {
        validateResponse(
          "unary",
          true,
          400,
          new Headers({
            "Content-Type": "application/proto",
          }),
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe("[internal] HTTP 400");
      }
    });
    it("should return an error for HTTP error status if content type is JSON", () => {
      const result = validateResponse(
        "unary",
        true,
        400,
        new Headers({
          "Content-Type": "application/json",
        }),
      );
      expect(result.isUnaryError).toBeTrue();
      expect(result.unaryError?.code).toBe(Code.Internal);
      expect(result.unaryError?.message).toBe("[internal] HTTP 400");
    });
  });
  describe("with streaming", () => {
    it("should include headers as error metadata", () => {
      try {
        validateResponse(
          "bidi_streaming",
          true,
          400,
          new Headers({
            "Content-Type": "application/connect+proto",
            Foo: "Bar",
          }),
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).metadata.get("Foo")).toBe("Bar");
      }
    });
  });
});
