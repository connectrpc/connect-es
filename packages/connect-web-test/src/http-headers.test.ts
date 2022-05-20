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

import { decodeBinaryHeader, encodeBinaryHeader } from "@bufbuild/connect-web";
import { proto3, ScalarType } from "@bufbuild/protobuf";

// prettier-ignore
const M = proto3.makeMessageType("handwritten.M", [
  { no: 1, name: "a", kind: "scalar", T: ScalarType.STRING },
  { no: 2, name: "b", kind: "scalar", T: ScalarType.FIXED32 },
  { no: 3, name: "c", kind: "scalar", T: ScalarType.BOOL }
]);

describe("encode / decode binary header", function () {
  it("handles Uint8Array", () => {
    const input = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    const encoded = encodeBinaryHeader(input);
    expect(encoded).toEqual("3q2+7w==");
    const decoded = decodeBinaryHeader(encoded);
    expect(decoded).toEqual(input);
  });
  it("handles Message", () => {
    const input = new M({
      a: "abc",
      b: 456,
      c: true,
    });
    const encoded = encodeBinaryHeader(input);
    expect(encoded).toEqual("CgNhYmMVyAEAABgB");
    const decoded = decodeBinaryHeader(encoded, M);
    expect(decoded).toEqual(input);
  });
});

describe("decodeBinaryHeader()", () => {
  it("throws error on invalid base64 input", () => {
    const encoded = "not-base-64-😞";
    expect(() => decodeBinaryHeader(encoded)).toThrowError(
      "[DataLoss] invalid base64 string."
    );
  });
  it("throws error on invalid message input", () => {
    expect(() => decodeBinaryHeader("3q2+7w==", M)).toThrowError(
      "[DataLoss] premature EOF"
    );
  });
});
