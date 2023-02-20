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

import {
  connectErrorDetails,
  connectErrorFromReason,
  createCallbackClient,
  createPromiseClient,
  Code,
  decodeBinaryHeader,
  encodeBinaryHeader,
} from "@bufbuild/connect-web";

describe("deprecated API", function () {
  it("should be exported", function () {
    expect(createCallbackClient).toBeDefined();
    expect(createPromiseClient).toBeDefined();
    expect(connectErrorDetails).toBeDefined();
    expect(connectErrorFromReason).toBeDefined();
    expect(Code).toBeDefined();
    expect(encodeBinaryHeader).toBeDefined();
    expect(decodeBinaryHeader).toBeDefined();
  });
});
