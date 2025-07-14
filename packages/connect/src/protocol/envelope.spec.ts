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

import type { EnvelopedMessage } from "./envelope.js";
import {
  createEnvelopeReadableStream,
  encodeEnvelopes,
  envelopeCompress,
  envelopeDecompress,
} from "./envelope.js";
import type { Compression } from "./compression.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

/**
 * Create a WHATWG ReadableStream from a Uint8Array for usage in tests.
 */
function createReadableByteStream(bytes: Uint8Array, chunkSize = 2, delay = 5) {
  let offset = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const end = Math.min(offset + chunkSize, bytes.byteLength);
      controller.enqueue(bytes.slice(offset, end));
      offset = end;
      if (offset === bytes.length) {
        controller.close();
      }
    },
  });
}

describe("createEnvelopeReadableStream()", () => {
  it("reads empty stream", async () => {
    const reader = createEnvelopeReadableStream(
      createReadableByteStream(new Uint8Array(0)),
    ).getReader();
    const r = await reader.read();
    expect(r.done).toBeTrue();
    expect(r.value).toBeUndefined();
  });
  it("reads multiple messages", async () => {
    const input = [
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        flags: 0b00000000,
      },
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xe0]),
        flags: 0b00000000,
      },
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xe1]),
        flags: 0b10000000,
      },
    ];
    const reader = createEnvelopeReadableStream(
      createReadableByteStream(encodeEnvelopes(...input)),
    ).getReader();
    for (const want of input) {
      const r = await reader.read();
      expect(r.done).toBeFalse();
      expect(r.value).toBeDefined();
      expect(r.value?.flags).toBe(want.flags);
      expect(r.value?.data).toEqual(want.data);
    }
    const r = await reader.read();
    expect(r.done).toBeTrue();
  });
  it("reads multiple messages arriving at once", async () => {
    const input = [
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        flags: 0b00000000,
      },
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xe0]),
        flags: 0b00000000,
      },
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xe1]),
        flags: 0b10000000,
      },
    ];
    let sourceStreamPulls = 0;
    const sourceStream = new ReadableStream<Uint8Array>({
      pull(controller): Promise<void> {
        if (sourceStreamPulls > 0) {
          // This stream enqueues all envelopes at once, and our ReadableStream
          // for envelopes should return them all with subsequent calls to read()
          // without pulling from this underlying stream again.
          throw new Error(
            "expected only a single pull on the underlying stream",
          );
        }
        sourceStreamPulls++;
        controller.enqueue(encodeEnvelopes(...input));
        return Promise.resolve();
      },
    });
    const reader = createEnvelopeReadableStream(sourceStream).getReader();
    for (const want of input) {
      const r = await reader.read();
      expect(r.done).toBeFalse();
      expect(r.value).toBeDefined();
      expect(r.value?.flags).toBe(want.flags);
      expect(r.value?.data).toEqual(want.data);
    }
  });
  it("reads an EndStreamResponse out of usual order", async () => {
    const input = [
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        flags: 0b10000000,
      },
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xe1]),
        flags: 0b00000000,
      },
    ];
    const reader = createEnvelopeReadableStream(
      createReadableByteStream(encodeEnvelopes(...input)),
    ).getReader();
    for (const want of input) {
      const r = await reader.read();
      expect(r.done).toBeFalse();
      expect(r.value).toBeDefined();
      expect(r.value?.flags).toBe(want.flags);
      expect(r.value?.data).toEqual(want.data);
    }
    const r = await reader.read();
    expect(r.done).toBeTrue();
  });
});

describe("envelope compression", () => {
  const compressionReverse: Compression = {
    name: "fake",
    compress(bytes) {
      const b = new Uint8Array(bytes.byteLength);
      b.set(bytes, 0);
      return Promise.resolve(b.reverse());
    },
    decompress(bytes, readMaxBytes) {
      if (bytes.byteLength > readMaxBytes) {
        return Promise.reject(
          new ConnectError(
            `message is larger than configured readMaxBytes ${readMaxBytes} after decompression`,
            Code.ResourceExhausted,
          ),
        );
      }
      const b = new Uint8Array(bytes.byteLength);
      b.set(bytes, 0);
      return Promise.resolve(b.reverse());
    },
  };
  const uncompressedEnvelope: EnvelopedMessage = {
    flags: 0,
    data: new Uint8Array([0xde, 0xad, 0xbe, 0xe1]),
  };
  const compressedEnvelope: EnvelopedMessage = {
    flags: 0 | 0b00000001,
    data: new Uint8Array([0xde, 0xad, 0xbe, 0xe1].reverse()),
  };
  describe("envelopeDecompress()", () => {
    it("should decompress envelopes", async () => {
      const got = await envelopeDecompress(
        compressedEnvelope,
        compressionReverse,
        Number.MAX_SAFE_INTEGER,
      );
      expect(got).toEqual(uncompressedEnvelope);
    });
    it("should not decompress uncompressed envelopes", async () => {
      const got = await envelopeDecompress(
        uncompressedEnvelope,
        compressionReverse,
        Number.MAX_SAFE_INTEGER,
      );
      expect(got).toEqual(uncompressedEnvelope);
    });
    it("should pass readMaxBytes to compression", async () => {
      try {
        await envelopeDecompress(compressedEnvelope, compressionReverse, 3);
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          "[resource_exhausted] message is larger than configured readMaxBytes 3 after decompression",
        );
      }
    });
    it("should ignore readMaxBytes for uncompressed envelope", async () => {
      const got = await envelopeDecompress(
        uncompressedEnvelope,
        compressionReverse,
        0,
      );
      expect(got).toEqual(uncompressedEnvelope);
    });
    describe("with null compression", () => {
      it("should not decompress uncompressed envelopes", async () => {
        const got = await envelopeDecompress(
          uncompressedEnvelope,
          null,
          Number.MAX_SAFE_INTEGER,
        );
        expect(got).toEqual(uncompressedEnvelope);
      });
      it("should raise error on compressed envelope", async () => {
        try {
          await envelopeDecompress(
            compressedEnvelope,
            null,
            Number.MAX_SAFE_INTEGER,
          );
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[internal] received compressed envelope, but do not know how to decompress",
          );
        }
      });
      it("should ignore readMaxBytes", async () => {
        const got = await envelopeDecompress(uncompressedEnvelope, null, 0);
        expect(got).toEqual(uncompressedEnvelope);
      });
    });
  });

  describe("envelopeCompress()", () => {
    it("should compress uncompressed envelope", async () => {
      const got = await envelopeCompress(
        uncompressedEnvelope,
        compressionReverse,
        0,
      );
      expect(got).toEqual(compressedEnvelope);
    });
    it("should compress uncompressed envelope", async () => {
      const got = await envelopeCompress(
        uncompressedEnvelope,
        compressionReverse,
        0,
      );
      expect(got).toEqual(compressedEnvelope);
    });
    it("should throw on compressed input", async () => {
      try {
        await envelopeCompress(compressedEnvelope, compressionReverse, 0);
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          "[internal] invalid envelope, already compressed",
        );
      }
    });
    it("should honor compressMinBytes", async () => {
      const got = await envelopeCompress(uncompressedEnvelope, null, 5);
      expect(got).toEqual(uncompressedEnvelope);
    });
    describe("with null compression", () => {
      it("should not compress", async () => {
        const got = await envelopeCompress(uncompressedEnvelope, null, 0);
        expect(got).toEqual(uncompressedEnvelope);
      });
    });
  });
});
