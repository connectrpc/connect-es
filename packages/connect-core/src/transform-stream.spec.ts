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

import {
  transformCompress,
  transformDecompress,
  transformJoin,
  transformParse,
  transformSerialize,
  transformSplit,
} from "./transform-stream.js";
import type { Compression } from "./compression.js";
import type { Serialization } from "./serialization.js";
import type { EnvelopedMessage } from "./envelope.js";
import { ConnectError, connectErrorFromReason } from "./connect-error.js";
import { Code } from "./code.js";
import {
  createReadableByteStream,
  createReadableStream,
  node16WhatwgStreamPolyfill,
  readAll,
  readAllBytes,
} from "./whatwg-stream-helper.spec.js";

node16WhatwgStreamPolyfill();

describe("transforming WHATWG streams", () => {
  describe("serialization", function () {
    const goldenItems = ["a", "b", "c"];
    const goldenEnvelopes = [
      {
        data: new TextEncoder().encode("a"),
        flags: 0b00000000,
      },
      {
        data: new TextEncoder().encode("b"),
        flags: 0b00000000,
      },
      {
        data: new TextEncoder().encode("c"),
        flags: 0b00000000,
      },
    ];
    const fakeSerialization: Serialization<string> = {
      serialize(data: string): Uint8Array {
        return new TextEncoder().encode(data);
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data);
      },
    };
    describe("transformSerialize()", function () {
      it("should serialize to envelopes", async function () {
        const stream = createReadableStream(goldenItems).pipeThrough(
          transformSerialize(fakeSerialization),
          {}
        );
        const got = await readAll(stream);
        expect(got).toEqual(goldenEnvelopes);
      });
    });
    describe("transformParse()", function () {
      it("should parse from envelopes", async function () {
        const stream = createReadableStream(goldenEnvelopes).pipeThrough(
          transformParse(fakeSerialization),
          {}
        );
        const got = await readAll(stream);
        expect(got).toEqual(goldenItems);
      });
    });
  });

  describe("serialization with end", function () {
    const endFlag = 0b10000000;
    const goldenItems = [
      { value: "a", end: false },
      { value: "b", end: false },
      { value: "end", end: true },
    ];
    const goldenEnvelopes = [
      {
        data: new TextEncoder().encode("a"),
        flags: 0b00000000,
      },
      {
        data: new TextEncoder().encode("b"),
        flags: 0b00000000,
      },
      {
        data: new TextEncoder().encode("end."),
        flags: endFlag,
      },
    ];
    const serialization: Serialization<string> = {
      serialize(data: string): Uint8Array {
        return new TextEncoder().encode(data);
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data);
      },
    };
    const endSerialization: Serialization<string> = {
      serialize(data: string): Uint8Array {
        return new TextEncoder().encode(data + ".");
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data).slice(0, -1);
      },
    };

    describe("transformSerialize()", function () {
      it("should serialize to envelopes", async function () {
        const stream = createReadableStream(goldenItems).pipeThrough(
          transformSerialize(serialization, endFlag, endSerialization),
          {}
        );
        const got = await readAll(stream);
        expect(got).toEqual(goldenEnvelopes);
      });
    });

    describe("transformParse()", function () {
      it("should parse from envelopes", async function () {
        const stream = createReadableStream(goldenEnvelopes).pipeThrough(
          transformParse(serialization, endFlag, endSerialization),
          {}
        );
        const got = await readAll(stream);
        expect(got).toEqual(goldenItems);
      });
      it("should raise error on unexpected end flag", async function () {
        const stream = createReadableStream(goldenEnvelopes).pipeThrough(
          transformParse(serialization, endFlag, null),
          {}
        );
        try {
          await readAll(stream);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).message).toBe(
            "[invalid_argument] unexpected end flag"
          );
        }
      });
    });
  });

  describe("joining and splitting envelopes", function () {
    const goldenEnvelopes: EnvelopedMessage[] = [
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
    const goldenBytes = new Uint8Array([
      0x0, 0x0, 0x0, 0x0, 0x4, 0xde, 0xad, 0xbe, 0xef, 0x0, 0x0, 0x0, 0x0, 0x4,
      0xde, 0xad, 0xbe, 0xe0, 0x80, 0x0, 0x0, 0x0, 0x4, 0xde, 0xad, 0xbe, 0xe1,
    ]);

    describe("transformJoin()", function () {
      it("should join envelopes", async function () {
        const stream = createReadableStream(goldenEnvelopes).pipeThrough(
          transformJoin(Number.MAX_SAFE_INTEGER),
          {}
        );
        const gotBytes = await readAllBytes(stream);
        expect(gotBytes).toEqual(goldenBytes);
      });
      it("should honor writeMaxBytes", async function () {
        const stream = createReadableStream(goldenEnvelopes).pipeThrough(
          transformJoin(3),
          {}
        );
        try {
          await readAll(stream);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).message).toBe(
            "[resource_exhausted] message size 4 is larger than configured writeMaxBytes 3"
          );
        }
      });
    });

    describe("transformSplit()", function () {
      it("should split envelopes", async function () {
        const stream = createReadableByteStream(goldenBytes).pipeThrough(
          transformSplit(Number.MAX_SAFE_INTEGER),
          {}
        );
        const got = await readAll(stream);
        expect(got).toEqual(goldenEnvelopes);
      });
      it("should honor readMaxBytes", async function () {
        const stream = createReadableByteStream(goldenBytes).pipeThrough(
          transformSplit(3),
          {}
        );
        try {
          await readAll(stream);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).message).toBe(
            "[resource_exhausted] message size 4 is larger than configured readMaxBytes 3"
          );
        }
      });
    });
  });

  describe("(de-)compressing envelopes", function () {
    const uncompressedEnvelopes: EnvelopedMessage[] = [
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
    const compressedEnvelopes: EnvelopedMessage[] = [
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xef].reverse()),
        flags: 0b00000001,
      },
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xe0].reverse()),
        flags: 0b00000001,
      },
      {
        data: new Uint8Array([0xde, 0xad, 0xbe, 0xe1].reverse()),
        flags: 0b10000001,
      },
    ];
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
              Code.ResourceExhausted
            )
          );
        }
        const b = new Uint8Array(bytes.byteLength);
        b.set(bytes, 0);
        return Promise.resolve(b.reverse());
      },
    };

    describe("transformCompress()", function () {
      it("should compress envelopes", async function () {
        const stream = createReadableStream(uncompressedEnvelopes).pipeThrough(
          transformCompress(compressionReverse, Number.MAX_SAFE_INTEGER, 0),
          {}
        );
        const gotEnvelopes = await readAll(stream);
        expect(gotEnvelopes).toEqual(compressedEnvelopes);
      });
      it("should throw on compressed input", async function () {
        const stream = createReadableStream(compressedEnvelopes).pipeThrough(
          transformCompress(compressionReverse, 3, 0),
          {}
        );
        try {
          await readAll(stream);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).message).toBe(
            "[internal] invalid envelope, already compressed"
          );
        }
      });
      it("should honor compressMinBytes", async function () {
        const stream = createReadableStream(uncompressedEnvelopes).pipeThrough(
          transformCompress(compressionReverse, Number.MAX_SAFE_INTEGER, 5),
          {}
        );
        const gotEnvelopes = await readAll(stream);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      it("should honor writeMaxBytes for the compressed message", async function () {
        const compressionTo5Bytes: Compression = {
          name: "fake",
          compress(bytes) {
            const b = new Uint8Array(5);
            b.set(bytes, 0);
            return Promise.resolve(b);
          },
          decompress() {
            throw "unimplemented";
          },
        };
        const stream = createReadableStream(uncompressedEnvelopes).pipeThrough(
          transformCompress(compressionTo5Bytes, 4, 0),
          {}
        );
        try {
          await readAll(stream);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).message).toBe(
            "[resource_exhausted] message size 5 is larger than configured writeMaxBytes 4"
          );
        }
      });
    });

    describe("transformDecompress()", function () {
      it("should decompress envelopes", async function () {
        const stream = createReadableStream(compressedEnvelopes).pipeThrough(
          transformDecompress(compressionReverse, Number.MAX_SAFE_INTEGER),
          {}
        );
        const gotEnvelopes = await readAll(stream);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      it("should not decompress uncompressed envelopes", async function () {
        const stream = createReadableStream(uncompressedEnvelopes).pipeThrough(
          transformDecompress(compressionReverse, Number.MAX_SAFE_INTEGER),
          {}
        );
        const gotEnvelopes = await readAll(stream);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      it("should pass readMaxBytes to compression", async function () {
        const stream = createReadableStream(compressedEnvelopes).pipeThrough(
          transformDecompress(compressionReverse, 3),
          {}
        );
        try {
          await readAll(stream);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).message).toBe(
            "[resource_exhausted] message is larger than configured readMaxBytes 3 after decompression"
          );
        }
      });
    });
  });

  describe("combined transform round-trip", function () {
    const endFlag = 0b10000000;
    const goldenItemsWithEnd = [
      { value: "a", end: false },
      { value: "b", end: false },
      { value: "end", end: true },
    ];
    const serialization: Serialization<string> = {
      serialize(data: string): Uint8Array {
        return new TextEncoder().encode(data);
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data);
      },
    };
    const endSerialization: Serialization<string> = {
      serialize(data: string): Uint8Array {
        return new TextEncoder().encode(data + ".");
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data).slice(0, -1);
      },
    };
    const compressionRevers: Compression = {
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
              Code.ResourceExhausted
            )
          );
        }
        const b = new Uint8Array(bytes.byteLength);
        b.set(bytes, 0);
        return Promise.resolve(b.reverse());
      },
    };

    it("should serialize, compress, join, split, decompress, and parse", async function () {
      const stream = createReadableStream(goldenItemsWithEnd)
        .pipeThrough(
          transformSerialize(serialization, endFlag, endSerialization),
          {}
        )
        .pipeThrough(
          transformCompress(compressionRevers, Number.MAX_SAFE_INTEGER, 0),
          {}
        )
        .pipeThrough(transformJoin(Number.MAX_SAFE_INTEGER), {})
        .pipeThrough(transformSplit(Number.MAX_SAFE_INTEGER), {})
        .pipeThrough(
          transformDecompress(compressionRevers, Number.MAX_SAFE_INTEGER),
          {}
        )
        .pipeThrough(
          transformParse(serialization, endFlag, endSerialization),
          {}
        );
      const result = await readAll(stream);
      expect(result).toEqual(goldenItemsWithEnd);
    });
  });
});
