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
import { ConnectError } from "@connectrpc/connect";
import * as zlib from "node:zlib";
import { compressionBrotli, compressionGzip } from "./compression.js";

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
    describe(compression.name, () => {
      it("should compress", async () => {
        const b = await compression.compress(payload);
        assert.ok(b.length < payload.length);
      });
      it("should decompress", async () => {
        const b = await compression.decompress(payloadCompressed, 0xffffffff);
        const equal = payload.every((value, index) => b[index] === value);
        assert.ok(equal);
      });
      it("should decompress zero-length payload", async () => {
        const b = await compression.decompress(new Uint8Array(0), 0xffffffff);
        assert.strictEqual(b.byteLength, 0);
      });
      it("should raise resource_exhausted if maxReadBytes exceeded", async () => {
        await assert.rejects(
          compression.decompress(payloadCompressed, 2),
          (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[resource_exhausted] message is larger than configured readMaxBytes 2 after decompression",
            );
            return true;
          },
        );
      });
      it("should raise invalid_argument on invalid input", async () => {
        await assert.rejects(
          compression.decompress(
            new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
            0xffffffff,
          ),
          (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[invalid_argument] decompression failed",
            );
            return true;
          },
        );
      });
    });
  }
});
