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
import { Code } from "./code.js";
import { codeFromString, codeToString } from "./protocol-connect/index.js";

describe("codeFromString", () => {
  it("parses as expected", () => {
    assert.strictEqual(codeFromString("canceled"), Code.Canceled);
    assert.strictEqual(codeFromString("unknown"), Code.Unknown);
    assert.strictEqual(
      codeFromString("invalid_argument"),
      Code.InvalidArgument,
    );
    assert.strictEqual(
      codeFromString("deadline_exceeded"),
      Code.DeadlineExceeded,
    );
    assert.strictEqual(codeFromString("not_found"), Code.NotFound);
    assert.strictEqual(codeFromString("already_exists"), Code.AlreadyExists);
    assert.strictEqual(
      codeFromString("permission_denied"),
      Code.PermissionDenied,
    );
    assert.strictEqual(
      codeFromString("resource_exhausted"),
      Code.ResourceExhausted,
    );
    assert.strictEqual(
      codeFromString("failed_precondition"),
      Code.FailedPrecondition,
    );
    assert.strictEqual(codeFromString("aborted"), Code.Aborted);
    assert.strictEqual(codeFromString("out_of_range"), Code.OutOfRange);
    assert.strictEqual(codeFromString("unimplemented"), Code.Unimplemented);
    assert.strictEqual(codeFromString("internal"), Code.Internal);
    assert.strictEqual(codeFromString("unavailable"), Code.Unavailable);
    assert.strictEqual(codeFromString("data_loss"), Code.DataLoss);
    assert.strictEqual(codeFromString("unauthenticated"), Code.Unauthenticated);
  });
  it("does not parse PermissionDenied", () => {
    const got = codeFromString("PermissionDenied");
    assert.strictEqual(got, undefined);
  });
  it("does not parse permissiondenied", () => {
    const got = codeFromString("permissiondenied");
    assert.strictEqual(got, undefined);
  });
});

describe("codeToString", () => {
  it("stringifies as expected", () => {
    assert.strictEqual(codeToString(Code.Canceled), "canceled");
    assert.strictEqual(codeToString(Code.Unknown), "unknown");
    assert.strictEqual(codeToString(Code.InvalidArgument), "invalid_argument");
    assert.strictEqual(
      codeToString(Code.DeadlineExceeded),
      "deadline_exceeded",
    );
    assert.strictEqual(codeToString(Code.NotFound), "not_found");
    assert.strictEqual(codeToString(Code.AlreadyExists), "already_exists");
    assert.strictEqual(
      codeToString(Code.PermissionDenied),
      "permission_denied",
    );
    assert.strictEqual(
      codeToString(Code.ResourceExhausted),
      "resource_exhausted",
    );
    assert.strictEqual(
      codeToString(Code.FailedPrecondition),
      "failed_precondition",
    );
    assert.strictEqual(codeToString(Code.Aborted), "aborted");
    assert.strictEqual(codeToString(Code.OutOfRange), "out_of_range");
    assert.strictEqual(codeToString(Code.Unimplemented), "unimplemented");
    assert.strictEqual(codeToString(Code.Internal), "internal");
    assert.strictEqual(codeToString(Code.Unavailable), "unavailable");
    assert.strictEqual(codeToString(Code.DataLoss), "data_loss");
    assert.strictEqual(codeToString(Code.Unauthenticated), "unauthenticated");
  });
});
