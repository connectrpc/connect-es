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

import { proto3, ScalarType } from "@bufbuild/protobuf";
import { decodeBinaryHeader, encodeBinaryHeader } from "./http-headers.js";
import { node16FetchHeadersPolyfill } from "./node16-polyfill-helper.spec.js";

node16FetchHeadersPolyfill();

// prettier-ignore
const M = proto3.makeMessageType("handwritten.M", [
  { no: 1, name: "a", kind: "scalar", T: ScalarType.STRING },
  { no: 2, name: "b", kind: "scalar", T: ScalarType.FIXED32 },
  { no: 3, name: "c", kind: "scalar", T: ScalarType.BOOL }
]);

describe("encodeBinaryHeader()", function () {
  it("accepts unicode string", () => {
    const input = "👋";
    const encoded = encodeBinaryHeader(input);
    expect(encoded).toEqual("8J+Riw==");
  });
  it("accepts Uint8Array", () => {
    const input = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    const encoded = encodeBinaryHeader(input);
    expect(encoded).toEqual("3q2+7w==");
  });
  it("accepts message", () => {
    const input = new M({
      a: "abc",
      b: 456,
      c: true,
    });
    const encoded = encodeBinaryHeader(input);
    expect(encoded).toEqual("CgNhYmMVyAEAABgB");
  });
});

describe("decodeBinaryHeader()", function () {
  it("decodes Uint8Array", () => {
    const decoded = decodeBinaryHeader("3q2+7w==");
    expect(decoded).toBeInstanceOf(Uint8Array);
    expect(decoded).toEqual(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
  });
  it("decodes message", () => {
    const decoded = decodeBinaryHeader("CgNhYmMVyAEAABgB", M);
    expect(decoded).toEqual(
      new M({
        a: "abc",
        b: 456,
        c: true,
      })
    );
  });
  it("throws error on invalid base64 input", () => {
    const encoded = "not-base-64-😞";
    expect(() => decodeBinaryHeader(encoded)).toThrowError(
      "[data_loss] invalid base64 string."
    );
  });
  it("throws error on invalid message input", () => {
    expect(() => decodeBinaryHeader("3q2+7w==", M)).toThrowError(
      "[data_loss] premature EOF"
    );
  });
});
