// Copyright 2021-2022 Buf Technologies, Inc.
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
  StatusCode,
  statusCodeFromString,
  statusCodeToString,
} from "@bufbuild/connect-web";

describe("statusCodeFromString", function () {
  it("parses PermissionDenied", () => {
    const got = statusCodeFromString("PermissionDenied");
    expect(got).toBe(StatusCode.PermissionDenied);
  });
  it("parses permission_denied", () => {
    const got = statusCodeFromString("permission_denied");
    expect(got).toBe(StatusCode.PermissionDenied);
  });
  it("does not parse permissiondenied", () => {
    const got = statusCodeFromString("permissiondenied");
    expect(got).toBeUndefined();
  });
});

describe("statusCodeToString", function () {
  it("PermissionDenied is permission_denied", () => {
    const got = statusCodeToString(StatusCode.PermissionDenied);
    expect(got).toBe("permission_denied");
  });
  it("PermissionDenied is permission_denied in snake_case", () => {
    const got = statusCodeToString(StatusCode.PermissionDenied, "snake_case");
    expect(got).toBe("permission_denied");
  });
  it("PermissionDenied is PermissionDenied in PascalCase", () => {
    const got = statusCodeToString(StatusCode.PermissionDenied, "PascalCase");
    expect(got).toBe("PermissionDenied");
  });
});
