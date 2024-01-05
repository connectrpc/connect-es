// Copyright 2021-2024 The Connect Authors
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

import { validateReadWriteMaxBytes } from "./limit-io.js";

describe("validateReadWriteMaxBytes()", function () {
  it("should set defaults", function () {
    const o = validateReadWriteMaxBytes(undefined, undefined, undefined);
    expect(o).toEqual({
      readMaxBytes: 0xffffffff,
      writeMaxBytes: 0xffffffff,
      compressMinBytes: 1024,
    });
  });
  it("should accept inputs", function () {
    const o = validateReadWriteMaxBytes(666, 777, 888);
    expect(o).toEqual({
      readMaxBytes: 666,
      writeMaxBytes: 777,
      compressMinBytes: 888,
    });
  });
  it("should assert sane limits for readMaxBytes", function () {
    expect(() =>
      validateReadWriteMaxBytes(-1, undefined, undefined),
    ).toThrowError("[internal] readMaxBytes -1 must be >= 1 and <= 4294967295");
    expect(() =>
      validateReadWriteMaxBytes(0xffffffff + 1, undefined, undefined),
    ).toThrowError(
      "[internal] readMaxBytes 4294967296 must be >= 1 and <= 4294967295",
    );
  });
  it("should assert sane limits for writeMaxBytes", function () {
    expect(() =>
      validateReadWriteMaxBytes(undefined, -1, undefined),
    ).toThrowError(
      "[internal] writeMaxBytes -1 must be >= 1 and <= 4294967295",
    );
    expect(() =>
      validateReadWriteMaxBytes(undefined, 0xffffffff + 1, undefined),
    ).toThrowError(
      "[internal] writeMaxBytes 4294967296 must be >= 1 and <= 4294967295",
    );
  });
});
