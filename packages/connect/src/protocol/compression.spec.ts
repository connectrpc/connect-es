// Copyright 2021-2025 The Connect Authors
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

import { compressionNegotiate } from "./compression.js";
import type { Compression } from "./compression.js";
import { ConnectError } from "../connect-error.js";

describe("compressionNegotiate()", () => {
  const compressionA: Compression = {
    name: "a",
    compress: (bytes) => Promise.resolve(new Uint8Array(bytes)),
    decompress: (bytes) => Promise.resolve(new Uint8Array(bytes)),
  };
  const compressionB: Compression = {
    ...compressionA,
    name: "b",
  };

  describe("no encoding or accept-encoding specified", () => {
    const r = compressionNegotiate(
      [compressionA, compressionB],
      null,
      null,
      "accept-encoding",
    );
    it("should return null for request and response compression", () => {
      expect(r.error).toBeUndefined();
      expect(r.request).toBeNull();
      expect(r.response).toBeNull();
    });
  });

  describe("accept-encoding specified, but no encoding set", () => {
    const r = compressionNegotiate(
      [compressionA, compressionB],
      null,
      "z,b,a,f",
      "accept-encoding",
    );
    it("should return request compression null", () => {
      expect(r.error).toBeUndefined();
      expect(r.request).toBeNull();
    });
    it("should use first accepted compression for the response", () => {
      expect(r.error).toBeUndefined();
      expect(r.response).toBe(compressionB);
    });
  });

  describe("encoding specified, but no accept-encoding", () => {
    const r = compressionNegotiate(
      [compressionA, compressionB],
      "a",
      null,
      "accept-encoding",
    );
    it("should return request encoding", () => {
      expect(r.error).toBeUndefined();
      expect(r.request).toBe(compressionA);
      expect(r.response).toBe(compressionA);
    });
  });

  describe("no supported accept-encoding specified", () => {
    const r = compressionNegotiate(
      [compressionA, compressionB],
      "a",
      "x,y,z",
      "accept-encoding",
    );
    it("should return response compression null", () => {
      expect(r.error).toBeUndefined();
      expect(r.request).toBe(compressionA);
      expect(r.response).toBeNull();
    });
  });

  describe("unsupported encoding set", () => {
    const r = compressionNegotiate(
      [compressionA, compressionB],
      "z",
      "a,b",
      "accept-encoding",
    );
    it("should return error", () => {
      expect(r.error).toBeInstanceOf(ConnectError);
      if (r.error instanceof ConnectError) {
        expect(r.error.message).toBe(
          '[unimplemented] unknown compression "z": supported encodings are a,b',
        );
      }
      expect(r.request).toBe(null);
    });
    it("should still use first accepted compression for the response", () => {
      expect(r.response).toBe(compressionA);
    });
  });
});
