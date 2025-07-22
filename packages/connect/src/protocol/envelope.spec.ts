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

import {
  createEnvelopeDecoder,
  encodeEnvelope,
  type EnvelopedMessage,
} from "./envelope.js";
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

describe("createEnvelopeDecoder()", () => {
  it("byteLength initially 0", () => {
    const buf = createEnvelopeDecoder(4);
    expect(buf.byteLength).toBe(0);
  });
  it("readMaxBytes", () => {
    const buf = createEnvelopeDecoder(444);
    expect(buf.readMaxBytes).toBe(444);
  });
  it("excessive message size", () => {
    {
      const buf = createEnvelopeDecoder(4);
      const chunk = encodeEnvelope(
        0b10000000,
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]),
      );
      expect(() => buf.decode(chunk)).toThrowError(
        /message size 5 is larger than configured readMaxBytes 4$/,
      );
    }
    {
      const buf = createEnvelopeDecoder(4);
      const chunk = encodeEnvelope(
        0b10000000,
        new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]),
      ).slice(0, 5);
      expect(() => buf.decode(chunk)).toThrowError(
        /message size 5 is larger than configured readMaxBytes 4$/,
      );
    }
  });
  it("decode exact size", () => {
    const buf = createEnvelopeDecoder(4);

    const chunk1 = encodeEnvelope(
      0b10000000,
      new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
    );
    const envelopes1 = buf.decode(chunk1);
    expect(buf.byteLength).toBe(0);
    expect(envelopes1.length).toBe(1);
    expect(envelopes1[0].flags).toBe(0b10000000);
    expect(envelopes1[0].data).toEqual(
      new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
    );

    const chunk2 = encodeEnvelope(
      0b00000001,
      new Uint8Array([0xde, 0xad, 0xbe, 0xe0]),
    );
    const envelopes2 = buf.decode(chunk2);
    expect(buf.byteLength).toBe(0);
    expect(envelopes2.length).toBe(1);
    expect(envelopes2[0].flags).toBe(0b00000001);
    expect(envelopes2[0].data).toEqual(
      new Uint8Array([0xde, 0xad, 0xbe, 0xe0]),
    );
  });
  it("decode remainder", () => {
    const buf = createEnvelopeDecoder(4);
    const data = encodeEnvelope(
      0b10000000,
      new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
    );
    const chunk1 = data.slice(0, 3);
    const chunk2 = data.slice(3, 6);
    const chunk3 = data.slice(6);

    const envelopes1 = buf.decode(chunk1);
    expect(buf.byteLength).toBe(3);
    expect(envelopes1.length).toBe(0);

    const envelopes2 = buf.decode(chunk2);
    expect(buf.byteLength).toBe(1);
    expect(envelopes2.length).toBe(0);

    const envelopes3 = buf.decode(chunk3);
    expect(buf.byteLength).toBe(0);
    expect(envelopes3.length).toBe(1);
    expect(envelopes3[0].flags).toBe(0b10000000);
    expect(envelopes3[0].data).toEqual(
      new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
    );
  });
  it("decode multiple", () => {
    const buf = createEnvelopeDecoder(4);
    const envelopes = buf.decode(
      encodeEnvelopes(
        { flags: 0b10000000, data: new Uint8Array([0xde, 0xad, 0xbe, 0xef]) },
        { flags: 0b00000001, data: new Uint8Array([0xde, 0xad, 0xbe, 0xe0]) },
      ),
    );
    expect(buf.byteLength).toBe(0);
    expect(envelopes.length).toBe(2);
    expect(envelopes[0].flags).toBe(0b10000000);
    expect(envelopes[0].data).toEqual(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
    expect(envelopes[1].flags).toBe(0b00000001);
    expect(envelopes[1].data).toEqual(new Uint8Array([0xde, 0xad, 0xbe, 0xe0]));
  });
});
