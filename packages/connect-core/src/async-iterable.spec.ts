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
  pipe,
  transformCatch,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformParseEnvelope,
  transformReadAllBytes,
  transformSerializeEnvelope,
  transformSplitEnvelope,
} from "./async-iterable.js";
import type { Serialization } from "./serialization.js";
import {
  createAsyncIterable,
  createAsyncIterableBytes,
  readAll,
  readAllBytes,
} from "./async-iterable-helper.spec.js";
import { ConnectError, connectErrorFromReason } from "./connect-error.js";
import { Code } from "./code.js";
import type { EnvelopedMessage } from "./envelope.js";
import type { Compression } from "./compression.js";

describe("transforming asynchronous iterables", () => {
  describe("envelope serialization", function () {
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
    describe("transformSerializeEnvelope()", function () {
      it("should serialize to envelopes", async function () {
        const it = pipe(
          createAsyncIterable(goldenItems),
          transformSerializeEnvelope(fakeSerialization, Number.MAX_SAFE_INTEGER)
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenEnvelopes);
      });
    });
    describe("transformParseEnvelope()", function () {
      it("should parse from envelopes", async function () {
        const it = pipe(
          createAsyncIterable(goldenEnvelopes),
          transformParseEnvelope(fakeSerialization)
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenItems);
      });
    });
  });

  describe("envelope serialization with end", function () {
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

    describe("transformSerializeEnvelope()", function () {
      it("should serialize to envelopes", async function () {
        const it = pipe(
          createAsyncIterable(goldenItems),
          transformSerializeEnvelope(
            serialization,
            Number.MAX_SAFE_INTEGER,
            endFlag,
            endSerialization
          )
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenEnvelopes);
      });
    });

    describe("transformParseEnvelope()", function () {
      it("should parse from envelopes", async function () {
        const it = pipe(
          createAsyncIterable(goldenEnvelopes),
          transformParseEnvelope(serialization, endFlag, endSerialization)
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenItems);
      });
      describe("with endCompression null", function () {
        it("should raise error on unexpected end flag", async function () {
          const it = pipe(
            createAsyncIterable(goldenEnvelopes),
            transformParseEnvelope(serialization, endFlag, null)
          );
          try {
            await readAll(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(connectErrorFromReason(e).message).toBe(
              "[invalid_argument] unexpected end flag"
            );
          }
        });
        it("should still parse to T", async function () {
          const envelopesWithoutEndFlag = goldenEnvelopes.slice(0, 2);
          const itemsWithoutEndFlag = goldenItems
            .slice(0, 2)
            .map((item) => item.value);
          const it = pipe(
            createAsyncIterable(envelopesWithoutEndFlag),
            transformParseEnvelope(serialization, endFlag, null)
          );
          const got = await readAll(it);
          expect(got).toEqual(itemsWithoutEndFlag);
        });
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

    describe("transformJoinEnvelopes()", function () {
      it("should join envelopes", async function () {
        const it = pipe(
          createAsyncIterable(goldenEnvelopes),
          transformJoinEnvelopes()
        );
        const gotBytes = await readAllBytes(it);
        expect(gotBytes).toEqual(goldenBytes);
      });
    });

    describe("transformSplitEnvelope()", function () {
      it("should split envelopes", async function () {
        const it = pipe(
          createAsyncIterableBytes(goldenBytes),
          transformSplitEnvelope(Number.MAX_SAFE_INTEGER)
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenEnvelopes);
      });
      it("should honor readMaxBytes", async function () {
        const it = pipe(
          createAsyncIterableBytes(goldenBytes),
          transformSplitEnvelope(3)
        );
        try {
          await readAll(it);
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

    describe("transformCompressEnvelope()", function () {
      it("should compress envelopes", async function () {
        const it = pipe(
          createAsyncIterable(uncompressedEnvelopes),
          transformCompressEnvelope(compressionReverse, 0)
        );
        const gotEnvelopes = await readAll(it);
        expect(gotEnvelopes).toEqual(compressedEnvelopes);
      });
      it("should throw on compressed input", async function () {
        const it = pipe(
          createAsyncIterable(compressedEnvelopes),
          transformCompressEnvelope(compressionReverse, 0)
        );
        try {
          await readAll(it);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).message).toBe(
            "[internal] invalid envelope, already compressed"
          );
        }
      });
      it("should honor compressMinBytes", async function () {
        const it = pipe(
          createAsyncIterable(uncompressedEnvelopes),
          transformCompressEnvelope(compressionReverse, 5)
        );
        const gotEnvelopes = await readAll(it);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      describe("with null compression", function () {
        it("should not compress", async function () {
          const it = pipe(
            createAsyncIterable(uncompressedEnvelopes),
            transformCompressEnvelope(null, 0)
          );
          const gotEnvelopes = await readAll(it);
          expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
        });
        it("should throw on compressed input", async function () {
          const it = pipe(
            createAsyncIterable(compressedEnvelopes),
            transformCompressEnvelope(compressionReverse, 0)
          );
          try {
            await readAll(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(connectErrorFromReason(e).message).toBe(
              "[internal] invalid envelope, already compressed"
            );
          }
        });
      });
    });

    describe("transformDecompressEnvelope()", function () {
      it("should decompress envelopes", async function () {
        const it = pipe(
          createAsyncIterable(compressedEnvelopes),
          transformDecompressEnvelope(
            compressionReverse,
            Number.MAX_SAFE_INTEGER
          )
        );
        const gotEnvelopes = await readAll(it);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      it("should not decompress uncompressed envelopes", async function () {
        const it = pipe(
          createAsyncIterable(uncompressedEnvelopes),
          transformDecompressEnvelope(
            compressionReverse,
            Number.MAX_SAFE_INTEGER
          )
        );
        const gotEnvelopes = await readAll(it);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      it("should pass readMaxBytes to compression", async function () {
        const it = pipe(
          createAsyncIterable(compressedEnvelopes),
          transformDecompressEnvelope(compressionReverse, 3)
        );
        try {
          await readAll(it);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).message).toBe(
            "[resource_exhausted] message is larger than configured readMaxBytes 3 after decompression"
          );
        }
      });
      describe("with null compression", function () {
        it("should not decompress uncompressed envelopes", async function () {
          const it = pipe(
            createAsyncIterable(uncompressedEnvelopes),
            transformDecompressEnvelope(null, Number.MAX_SAFE_INTEGER)
          );
          const gotEnvelopes = await readAll(it);
          expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
        });
        it("should raise error on compressed envelope", async function () {
          const it = pipe(
            createAsyncIterable(compressedEnvelopes),
            transformDecompressEnvelope(null, Number.MAX_SAFE_INTEGER)
          );
          try {
            await readAll(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(connectErrorFromReason(e).message).toBe(
              "[invalid_argument] received compressed envelope, but do not know how to decompress"
            );
          }
        });
      });
    });
  });

  describe("error handling", function () {
    const goldenItems = ["a", "b", "c"];
    const serialization: Serialization<string> = {
      serialize(data: string): Uint8Array {
        if (data === "c") {
          throw new ConnectError("cannot serialize 'c'", Code.Internal);
        }
        return new TextEncoder().encode(data);
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data);
      },
    };

    it("should raise error when unhandled", async function () {
      const it = pipe(
        createAsyncIterable(goldenItems),
        transformSerializeEnvelope(serialization, Number.MAX_SAFE_INTEGER)
      );
      try {
        await readAll(it);
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        if (e instanceof ConnectError) {
          expect(e.code).toBe(Code.Internal);
          expect(e.rawMessage).toBe("cannot serialize 'c'");
          expect(e.cause).toBeUndefined();
        }
      }
    });

    it("should catch error", async function () {
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
          data: new TextEncoder().encode("ERROR"),
          flags: 0b00000000,
        },
      ];
      const it = pipe(
        createAsyncIterable(goldenItems),
        transformSerializeEnvelope(serialization, Number.MAX_SAFE_INTEGER),
        transformCatch<EnvelopedMessage>(() => {
          return {
            flags: 0,
            data: new TextEncoder().encode("ERROR"),
          };
        })
      );
      const result = await readAll(it);
      expect(result).toEqual(goldenEnvelopes);
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

    it("should serialize, compress, join, split, decompress, and parse", async function () {
      const it = pipe(
        createAsyncIterable(goldenItemsWithEnd),
        transformSerializeEnvelope(
          serialization,
          Number.MAX_SAFE_INTEGER,
          endFlag,
          endSerialization
        ),
        transformCompressEnvelope(compressionReverse, 0),
        transformJoinEnvelopes(),
        transformSplitEnvelope(Number.MAX_SAFE_INTEGER),
        transformDecompressEnvelope(
          compressionReverse,
          Number.MAX_SAFE_INTEGER
        ),
        transformParseEnvelope(serialization, endFlag, endSerialization)
      );
      const result = await readAll(it);
      expect(result).toEqual(goldenItemsWithEnd);
    });
  });

  describe("transformReadAllBytes()", function () {
    // prettier-ignore
    const goldenBytes = new Uint8Array([
      0xde, 0xad, 0xbe, 0xef,
      0xde, 0xad, 0xbe, 0xef,
      0xde, 0xad, 0xbe, 0xef,
      0xde, 0xad, 0xbe, 0xef
    ]);
    it("should read all bytes", async function () {
      const it = pipe(
        createAsyncIterableBytes(goldenBytes),
        transformReadAllBytes(Number.MAX_SAFE_INTEGER)
      );
      const got = await readAllBytes(it);
      expect(got).toEqual(goldenBytes);
    });
    it("should honor readMaxBytes", async function () {
      const it = pipe(
        createAsyncIterableBytes(goldenBytes),
        transformReadAllBytes(4)
      );
      try {
        await readAllBytes(it);
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(connectErrorFromReason(e).message).toBe(
          "[resource_exhausted] message size is larger than configured readMaxBytes 4"
        );
      }
    });
    describe("with length hint", function () {
      describe("that matches actual length", function () {
        it("should read without error", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(
              Number.MAX_SAFE_INTEGER,
              goldenBytes.byteLength
            )
          );
          const got = await readAllBytes(it);
          expect(got).toEqual(goldenBytes);
        });
      });
      describe("that exceeds readMaxBytes", function () {
        it("should error", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(4, 5)
          );
          try {
            await readAllBytes(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(connectErrorFromReason(e).message).toBe(
              "[resource_exhausted] message size 5 is larger than configured readMaxBytes 4"
            );
          }
        });
      });
      describe("that is not an integer", function () {
        it("should ignore length hint", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(100, 100.75)
          );
          const got = await readAllBytes(it);
          expect(got).toEqual(goldenBytes);
        });
      });
      describe("that is NaN", function () {
        it("should ignore length hint", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(Number.MAX_SAFE_INTEGER, Number.NaN)
          );
          const got = await readAllBytes(it);
          expect(got).toEqual(goldenBytes);
        });
      });
      describe("that is negative", function () {
        it("should ignore length hint", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(Number.MAX_SAFE_INTEGER, -10)
          );
          const got = await readAllBytes(it);
          expect(got).toEqual(goldenBytes);
        });
      });
      describe("that is larger than the actual length", function () {
        it("should error", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(
              Number.MAX_SAFE_INTEGER,
              goldenBytes.byteLength + 100
            )
          );
          try {
            await readAllBytes(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(connectErrorFromReason(e).message).toBe(
              "[invalid_argument] protocol error: promised 116 bytes, received 16"
            );
          }
        });
      });
      describe("that is smaller than the actual length", function () {
        it("should error", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(
              Number.MAX_SAFE_INTEGER,
              goldenBytes.byteLength - 10
            )
          );
          try {
            await readAllBytes(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(connectErrorFromReason(e).message).toBe(
              "[invalid_argument] protocol error: promised 6 bytes, received 8"
            );
          }
        });
      });
    });
  });
});
