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

import { ConnectError } from "@connectrpc/connect";
import { compressionBrotli, compressionGzip } from "@connectrpc/connect-node";
import * as zlib from "zlib";

describe("compression", () => {
  const payload = new TextEncoder().encode(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  );

  const table = [
    { compression: compressionGzip, payloadCompressed: zlib.gzipSync(payload) },
    {
      compression: compressionBrotli,
      payloadCompressed: zlib.brotliCompressSync(payload),
    },
  ];

  for (const { compression, payloadCompressed } of table) {
    describe(compression.name, function () {
      it("should compress", async () => {
        const b = await compression.compress(payload);
        expect(b.length < payload.length).toBeTrue();
      });
      it("should decompress", async () => {
        const b = await compression.decompress(payloadCompressed, 0xffffffff);
        const equal = payload.every((value, index) => b[index] === value);
        expect(equal).toBeTrue();
      });
      it("should decompress zero-length payload", async () => {
        const b = await compression.decompress(new Uint8Array(0), 0xffffffff);
        expect(b.byteLength).toBe(0);
      });
      it("should raise resource_exhausted if maxReadBytes exceeded", async () => {
        try {
          await compression.decompress(payloadCompressed, 2);
          fail("excepted an error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[resource_exhausted] message is larger than configured readMaxBytes 2 after decompression",
          );
        }
      });
      it("should raise invalid_argument on invalid input", async () => {
        try {
          await compression.decompress(
            new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
            0xffffffff,
          );
          fail("excepted an error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[invalid_argument] decompression failed",
          );
        }
      });
      it("should raise internal error on excessive readMaxBytes", async () => {
        try {
          await compression.decompress(
            new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
            Number.MAX_SAFE_INTEGER,
          );
          fail("excepted an error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[internal] decompression failed",
          );
        }
      });
    });
  }
});
