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

describe("Connect validateResponse()", function () {
  describe("with unary", function () {
    const methodKind = MethodKind.Unary;
    it("should be successful for HTTP 200", function () {
      const r = validateResponse(methodKind, 200, new Headers());
      expect(r.isUnaryError).toBeFalse();
      expect(r.unaryError).toBeUndefined();
    });
    it("should return error for HTTP 204", function () {
      const r = validateResponse(methodKind, 204, new Headers());
      expect(r.isUnaryError).toBeTrue();
      expect(r.unaryError?.message).toBe("[unknown] HTTP 204");
    });
    it("should return error for HTTP error status", function () {
      const r = validateResponse(methodKind, 400, new Headers());
      expect(r.isUnaryError).toBeTrue();
      expect(r.unaryError?.message).toBe("[invalid_argument] HTTP 400");
    });
    it("should include headers as error metadata", function () {
      const r = validateResponse(methodKind, 204, new Headers({ Foo: "Bar" }));
      expect(r.unaryError?.metadata.get("Foo")).toBe("Bar");
    });
  });
  describe("with streaming", function () {
    const methodKind = MethodKind.ServerStreaming;
    it("should be successful for HTTP 200", function () {
      const r = validateResponse(methodKind, 200, new Headers());
      expect(r.isUnaryError).toBeFalse();
      expect(r.unaryError).toBeUndefined();
    });
    it("should throw error for HTTP error status", function () {
      try {
        validateResponse(methodKind, 400, new Headers());
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          "[invalid_argument] HTTP 400"
        );
      }
    });
    it("should include headers as error metadata", function () {
      try {
        validateResponse(methodKind, 400, new Headers({ Foo: "Bar" }));
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).metadata.get("Foo")).toBe("Bar");
      }
    });
  });
});
