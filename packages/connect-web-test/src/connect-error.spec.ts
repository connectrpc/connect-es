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

import { ConnectError, Code } from "@bufbuild/connect-web";

describe("ConnectError", function () {
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
  });
});
