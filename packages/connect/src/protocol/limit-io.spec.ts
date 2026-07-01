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
import { validateReadWriteMaxBytes } from "./limit-io.js";

describe("validateReadWriteMaxBytes()", () => {
  it("should set defaults", () => {
    const o = validateReadWriteMaxBytes(undefined, undefined, undefined);
    assert.deepStrictEqual(o, {
      readMaxBytes: 0xffffffff,
      writeMaxBytes: 0xffffffff,
      compressMinBytes: 1024,
    });
  });
  it("should accept inputs", () => {
    const o = validateReadWriteMaxBytes(666, 777, 888);
    assert.deepStrictEqual(o, {
      readMaxBytes: 666,
      writeMaxBytes: 777,
      compressMinBytes: 888,
    });
  });
  it("should assert sane limits for readMaxBytes", () => {
    assert.throws(() => validateReadWriteMaxBytes(-1, undefined, undefined), {
      message: "[internal] readMaxBytes -1 must be >= 1 and <= 4294967295",
    });
    assert.throws(
      () => validateReadWriteMaxBytes(0xffffffff + 1, undefined, undefined),
      {
        message:
          "[internal] readMaxBytes 4294967296 must be >= 1 and <= 4294967295",
      },
    );
  });
  it("should assert sane limits for writeMaxBytes", () => {
    assert.throws(() => validateReadWriteMaxBytes(undefined, -1, undefined), {
      message: "[internal] writeMaxBytes -1 must be >= 1 and <= 4294967295",
    });
    assert.throws(
      () => validateReadWriteMaxBytes(undefined, 0xffffffff + 1, undefined),
      {
        message:
          "[internal] writeMaxBytes 4294967296 must be >= 1 and <= 4294967295",
      },
    );
  });
});
