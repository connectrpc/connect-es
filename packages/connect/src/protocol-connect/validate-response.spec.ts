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
import { ConnectError } from "../connect-error.js";
import { validateResponse } from "./validate-response.js";

describe("validateResponse() Connect", function () {
  it("should return unary error for HTTP error status", function () {
    const r = validateResponse(
      MethodKind.Unary,
      false,
      400,
      new Headers({
        "Content-Type": "application/proto",
      })
    );
    expect(r.isUnaryError).toBeTrue();
    expect(r.unaryError?.message).toBe("[invalid_argument] HTTP 400");
  });
  it("should throw error for content type application/csv", function () {
    try {
      validateResponse(
        MethodKind.Unary,
        false,
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
        false,
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
  it("should throw error for unary content type for streaming RPC", function () {
    try {
      validateResponse(
        MethodKind.BiDiStreaming,
        false,
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
});
