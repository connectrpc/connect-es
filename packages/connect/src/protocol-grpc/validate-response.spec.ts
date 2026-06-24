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
import { validateResponse } from "./validate-response.js";
import { ConnectError } from "../connect-error.js";

describe("gRPC validateResponse()", () => {
  function v(
    httpStatus: number,
    headers: Record<string, string>,
  ): ConnectError | undefined {
    try {
      const { headerError } = validateResponse(
        httpStatus,
        new Headers(headers),
      );
      if (headerError) {
        throw headerError;
      }
      return undefined;
    } catch (e) {
      if (e instanceof ConnectError) {
        return e;
      }
      throw e;
    }
  }

  it("should honor grpc-status field", () => {
    const e = v(200, {
      "grpc-status": "8",
      "content-type": "application/grpc+proto",
    });
    assert.strictEqual(e?.message, "[resource_exhausted]");
  });

  it("should honor grpc-message field", () => {
    const e = v(200, {
      "grpc-status": "8",
      "grpc-message": "out of space",
      "content-type": "application/grpc+proto",
    });
    assert.strictEqual(e?.message, "[resource_exhausted] out of space");
  });

  it("should include headers as error metadata with grpc-status", () => {
    const e = v(200, {
      "grpc-status": "8",
      Foo: "Bar",
      "content-type": "application/grpc+proto",
    });
    assert.strictEqual(e?.metadata.get("Foo"), "Bar");
  });

  it("should honor HTTP error code", () => {
    const e = v(429, { "Content-Type": "application/csv" });
    assert.strictEqual(e?.message, "[unavailable] HTTP 429");
  });

  it("should treat HTTP 204 as an error", () => {
    const e = v(204, {});
    assert.strictEqual(e?.message, `[unknown] HTTP 204`);
  });

  it("should include headers as error metadata with HTTP error code", () => {
    const e = v(429, { Foo: "Bar" });
    assert.strictEqual(e?.metadata.get("Foo"), "Bar");
  });

  it("should prefer HTTP error code over grpc-status field", () => {
    const e = v(401, { "grpc-status": "8" });
    assert.strictEqual(e?.message, "[unauthenticated] HTTP 401");
  });

  it("should not use grpc-message with a HTTP error code", () => {
    const e = v(401, { "grpc-status": "8", "grpc-message": "out of space" });
    assert.strictEqual(e?.message, "[unauthenticated] HTTP 401");
  });

  it("should return foundStatus for grpc-status OK", () => {
    const { foundStatus } = validateResponse(
      200,
      new Headers({
        "grpc-status": "0",
        "content-type": "application/grpc+proto",
      }),
    );
    assert.ok(foundStatus);
  });
});
