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

import { MethodKind } from "@bufbuild/protobuf";
import { validateResponse } from "./validate-response.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

describe("validateResponse() Connect", function () {
  describe("with unary", function () {
    it("should be successful for HTTP 200 with proper unary JSON content type", function () {
      const r = validateResponse(
        MethodKind.Unary,
        200,
        new Headers({ "Content-Type": "application/json" })
      );
      expect(r.isUnaryError).toBeFalse();
      expect(r.unaryError).toBeUndefined();
    });
    it("should return error for HTTP 204", function () {
      const r = validateResponse(
        MethodKind.Unary,
        204,
        new Headers({ "Content-Type": "application/json" })
      );
      expect(r.isUnaryError).toBeTrue();
      expect(r.unaryError?.message).toBe("[unknown] HTTP 204");
    });
    it("should include headers as error metadata", function () {
      const r = validateResponse(
        MethodKind.Unary,
        204,
        new Headers({ "Content-Type": "application/json", Foo: "Bar" })
      );
      expect(r.unaryError?.metadata.get("Foo")).toBe("Bar");
    });
    it("should be successful for HTTP 200 with proper unary proto content type", function () {
      const r = validateResponse(
        MethodKind.Unary,
        200,
        new Headers({ "Content-Type": "application/proto" })
      );
      expect(r.isUnaryError).toBeFalse();
      expect(r.unaryError).toBeUndefined();
    });
    it("should throw error for HTTP error status with binary response body", function () {
      try {
        validateResponse(
          MethodKind.Unary,
          400,
          new Headers({
            "Content-Type": "application/proto",
          })
        );
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          "[invalid_argument] HTTP 400"
        );
      }
    });
    it("should return an error for HTTP error status if content type is JSON", function () {
      const result = validateResponse(
        MethodKind.Unary,
        400,
        new Headers({
          "Content-Type": "application/json",
        })
      );
      expect(result.isUnaryError).toBeTrue();
      expect(result.unaryError?.code).toBe(Code.InvalidArgument);
      expect(result.unaryError?.message).toBe("[invalid_argument] HTTP 400");
    });
    it("should throw error for content type application/csv", function () {
      try {
        validateResponse(
          MethodKind.Unary,
          200,
          new Headers({
            "Content-Type": "application/csv",
          })
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          '[invalid_argument] unexpected response content type "application/csv"'
        );
      }
    });
    it("should throw error for streaming content type for unary RPC", function () {
      try {
        validateResponse(
          MethodKind.Unary,
          200,
          new Headers({
            "Content-Type": "application/connect+proto",
          })
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          '[invalid_argument] unexpected response content type "application/connect+proto"'
        );
      }
    });
  });
  describe("with streaming", function () {
    it("should throw error for unary content type for streaming RPC", function () {
      try {
        validateResponse(
          MethodKind.BiDiStreaming,
          200,
          new Headers({
            "Content-Type": "application/proto",
          })
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          '[invalid_argument] unexpected response content type "application/proto"'
        );
      }
    });
    it("should include headers as error metadata", function () {
      try {
        validateResponse(
          MethodKind.BiDiStreaming,
          400,
          new Headers({
            "Content-Type": "application/connect+proto",
            Foo: "Bar",
          })
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).metadata.get("Foo")).toBe("Bar");
      }
    });
  });
});
