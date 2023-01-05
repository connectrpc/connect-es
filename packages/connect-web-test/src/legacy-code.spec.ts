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

import { Code, codeFromString, codeToString } from "@bufbuild/connect-web";

// TODO remove this file after connect-web has migrated to connect-core

describe("codeFromString", function () {
  it("parses as expected", () => {
    expect(codeFromString("canceled")).toBe(Code.Canceled);
    expect(codeFromString("unknown")).toBe(Code.Unknown);
    expect(codeFromString("invalid_argument")).toBe(Code.InvalidArgument);
    expect(codeFromString("deadline_exceeded")).toBe(Code.DeadlineExceeded);
    expect(codeFromString("not_found")).toBe(Code.NotFound);
    expect(codeFromString("already_exists")).toBe(Code.AlreadyExists);
    expect(codeFromString("permission_denied")).toBe(Code.PermissionDenied);
    expect(codeFromString("resource_exhausted")).toBe(Code.ResourceExhausted);
    expect(codeFromString("failed_precondition")).toBe(Code.FailedPrecondition);
    expect(codeFromString("aborted")).toBe(Code.Aborted);
    expect(codeFromString("out_of_range")).toBe(Code.OutOfRange);
    expect(codeFromString("unimplemented")).toBe(Code.Unimplemented);
    expect(codeFromString("internal")).toBe(Code.Internal);
    expect(codeFromString("unavailable")).toBe(Code.Unavailable);
    expect(codeFromString("data_loss")).toBe(Code.DataLoss);
    expect(codeFromString("unauthenticated")).toBe(Code.Unauthenticated);
  });
  it("does not parse PermissionDenied", () => {
    const got = codeFromString("PermissionDenied");
    expect(got).toBeUndefined();
  });
  it("does not parse permissiondenied", () => {
    const got = codeFromString("permissiondenied");
    expect(got).toBeUndefined();
  });
});

describe("codeToString", function () {
  it("stringifies as expected", () => {
    expect(codeToString(Code.Canceled)).toBe("canceled");
    expect(codeToString(Code.Unknown)).toBe("unknown");
    expect(codeToString(Code.InvalidArgument)).toBe("invalid_argument");
    expect(codeToString(Code.DeadlineExceeded)).toBe("deadline_exceeded");
    expect(codeToString(Code.NotFound)).toBe("not_found");
    expect(codeToString(Code.AlreadyExists)).toBe("already_exists");
    expect(codeToString(Code.PermissionDenied)).toBe("permission_denied");
    expect(codeToString(Code.ResourceExhausted)).toBe("resource_exhausted");
    expect(codeToString(Code.FailedPrecondition)).toBe("failed_precondition");
    expect(codeToString(Code.Aborted)).toBe("aborted");
    expect(codeToString(Code.OutOfRange)).toBe("out_of_range");
    expect(codeToString(Code.Unimplemented)).toBe("unimplemented");
    expect(codeToString(Code.Internal)).toBe("internal");
    expect(codeToString(Code.Unavailable)).toBe("unavailable");
    expect(codeToString(Code.DataLoss)).toBe("data_loss");
    expect(codeToString(Code.Unauthenticated)).toBe("unauthenticated");
  });
});
