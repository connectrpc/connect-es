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

import {
  createAsyncIterable,
  createWritableIterable,
  makeIterableAbortable,
  pipe,
  pipeTo,
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
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import type { EnvelopedMessage } from "./envelope.js";
import type { Compression } from "./compression.js";
import {
  createAsyncIterableBytes,
  readAll,
  readAllBytes,
} from "./async-iterable-helper.spec.js";

describe("slowly consuming an async iterable", function () {
  it("should propagate backpressure to source", async function () {
    const sourceDelayMs = 0;
    const consumerDelayMs = 50;
    let sourceElapsedMs = -1;
    let consumeElapsedMs = -1;

    async function* source() {
      const tsStart = Date.now();
      await new Promise((resolve) => setTimeout(resolve, sourceDelayMs));
      yield "a";
      await new Promise((resolve) => setTimeout(resolve, sourceDelayMs));
      yield "b";
      await new Promise((resolve) => setTimeout(resolve, sourceDelayMs));
      yield "c";
      sourceElapsedMs = Date.now() - tsStart;
    }

    async function slowConsume(source: AsyncIterable<string>) {
      const tsStart = Date.now();
      for await (const chunk of source) {
        expect(chunk).toBeDefined(); // only to satisfy type checks
        await new Promise((resolve) => setTimeout(resolve, consumerDelayMs));
      }
      consumeElapsedMs = Date.now() - tsStart;
    }

    await slowConsume(source());

    // We expect the source to wait for the consumer, so both should run for
    // about the same time (3 x 50ms = ~150ms).
    // We have to be a bit lenient to account for the time it takes run the
    // actual code, and variance introduced by setTimeout.
    const leniency = 50;
    expect(sourceElapsedMs).toBeGreaterThanOrEqual(consumeElapsedMs - leniency);
    expect(sourceElapsedMs).toBeLessThanOrEqual(consumeElapsedMs + leniency);
  });
});

describe("pipe()", function () {
  it("should apply transforms", async function () {
    const iterable = pipe(
      createAsyncIterable([1, 2, 3]),
      async function* addOne(iterable) {
        for await (const chunk of iterable) {
          yield chunk + 1;
        }
      },
    );
    let sum = 0;
    for await (const chunk of iterable) {
      sum += chunk;
    }
    expect(sum).toBe(9);
  });

  describe("with error-raising consumer", function () {
    const sourceLog: string[] = [];
    beforeEach(function () {
      sourceLog.splice(0);
    });

    // eslint-disable-next-line @typescript-eslint/require-await
    async function* source() {
      try {
        sourceLog.push("yield a");
        yield "a";
        sourceLog.push("yield b");
        yield "b";
      } catch (e) {
        sourceLog.push("saw " + String(e));
        throw e;
      } finally {
        sourceLog.push("finally");
      }
    }

    const consumerLog: string[] = [];
    beforeEach(function () {
      consumerLog.splice(0);
    });

    async function consumeWithError(
      iterable: AsyncIterable<unknown>,
    ): Promise<void> {
      const it = iterable[Symbol.asyncIterator]();
      for (;;) {
        const result = await it.next();
        if (result.done === true) {
          consumerLog.push("done");
          break;
        }
        consumerLog.push("received " + String(result.value));
        if (it.throw === undefined) {
          throw new Error("iterable does not implement throw()");
        }
        await it.throw("DOWNSTREAM_ERROR").catch((e) => {
          if (e !== "DOWNSTREAM_ERROR") {
            throw e;
          }
        });
        consumerLog.push("threw DOWNSTREAM_ERROR");
      }
    }

    async function* noopTransform(
      iterable: AsyncIterable<string>,
    ): AsyncIterable<string> {
      yield* iterable;
    }

    it("should not propagate error to source by default, and leave it dangling", async function () {
      const iterable = pipe(source(), noopTransform, {
        // propagateDownStreamError: false <- default
      });
      await consumeWithError(iterable);
      expect(sourceLog).toEqual(["yield a"]);
      expect(consumerLog).toEqual([
        "received a",
        "threw DOWNSTREAM_ERROR",
        "done",
      ]);
    });
    it("should propagate error to source with propagateDownStreamError: true", async function () {
      const iterable = pipe(source(), noopTransform, {
        propagateDownStreamError: true,
      });
      await consumeWithError(iterable);
      expect(sourceLog).toEqual(["yield a", "saw DOWNSTREAM_ERROR", "finally"]);
      expect(consumerLog).toEqual([
        "received a",
        "threw DOWNSTREAM_ERROR",
        "done",
      ]);
    });
  });
  it("should propagate returns", async function () {
    let returned = false;
    const iterable = pipe(
      // eslint-disable-next-line @typescript-eslint/require-await
      (async function* () {
        try {
          yield 1;
          fail("expected early return");
          yield 2;
        } finally {
          returned = true;
        }
      })(),
      async function* (iterable) {
        for await (const next of iterable) {
          yield next * 2;
        }
      },
      { propagateDownStreamError: true },
    );
    const it = iterable[Symbol.asyncIterator]();
    expect(await it.next()).toEqual({ done: false, value: 2 });
    await it.return?.();
    expect(returned).toBe(true);
  });
});

describe("pipeTo()", function () {
  it("should pipe iterable to sink", async function () {
    const sum = await pipeTo(
      createAsyncIterable([1, 2, 3]),
      async (iterable) => {
        let sum = 0;
        for await (const chunk of iterable) {
          sum += chunk;
        }
        return sum;
      },
    );
    expect(sum).toBe(6);
  });
  it("should apply transforms", async function () {
    const sum = await pipeTo(
      createAsyncIterable([1, 2, 3]),
      async function* addOne(iterable) {
        for await (const chunk of iterable) {
          yield chunk + 1;
        }
      },
      async (iterable) => {
        let sum = 0;
        for await (const chunk of iterable) {
          sum += chunk;
        }
        return sum;
      },
    );
    expect(sum).toBe(9);
  });

  describe("with error-raising sink", function () {
    const sourceLog: string[] = [];
    beforeEach(function () {
      sourceLog.splice(0);
    });

    // eslint-disable-next-line @typescript-eslint/require-await
    async function* source() {
      try {
        sourceLog.push("yield a");
        yield "a";
        sourceLog.push("yield b");
        yield "b";
      } catch (e) {
        sourceLog.push("saw " + String(e));
        throw e;
      } finally {
        sourceLog.push("finally");
      }
    }

    async function errorRaisingSink(iterable: AsyncIterable<string>) {
      for await (const chunk of iterable) {
        expect(chunk).toBeDefined(); // only to satisfy type checks
        throw "SINK_ERROR";
      }
    }

    async function* noopTransform(
      iterable: AsyncIterable<string>,
    ): AsyncIterable<string> {
      yield* iterable;
    }

    it("should not propagate error to source by default, and leave it dangling", async function () {
      try {
        await pipeTo(source(), noopTransform, errorRaisingSink, {
          // propagateDownStreamError: false <- default
        });
        fail("expected error");
      } catch (e) {
        expect(e).toBe("SINK_ERROR");
      }
      expect(sourceLog).toEqual(["yield a"]);
    });
    it("should propagate error to source with propagateDownStreamError: true", async function () {
      try {
        await pipeTo(source(), noopTransform, errorRaisingSink, {
          propagateDownStreamError: true,
        });
        fail("expected error");
      } catch (e) {
        expect(e).toBe("SINK_ERROR");
      }
      expect(sourceLog).toEqual(["yield a", "saw SINK_ERROR", "finally"]);
    });
  });
});

describe("makeIterableAbortable()", function () {
  const sourceLog: string[] = [];
  beforeEach(function () {
    sourceLog.splice(0);
  });
  describe("with simple source", function () {
    // eslint-disable-next-line @typescript-eslint/require-await
    async function* source() {
      try {
        sourceLog.push("yield a");
        yield "a";
        sourceLog.push("yield b");
        yield "b";
      } catch (e) {
        sourceLog.push("saw " + String(e));
        throw e;
      } finally {
        sourceLog.push("finally");
      }
    }
    it("should abort source", async function () {
      const abortable = makeIterableAbortable(source());
      for await (const chunk of abortable) {
        expect(chunk).toBe("a");
        const state = await abortable.abort("ERR");
        expect(state).toBe("rethrown");
      }
      expect(sourceLog).toEqual(["yield a", "saw ERR", "finally"]);
    });
  });
  describe("with error swallowing source", function () {
    // eslint-disable-next-line @typescript-eslint/require-await
    async function* source() {
      try {
        sourceLog.push("yield a");
        yield "a";
        sourceLog.push("yield b");
        yield "b";
      } catch (e) {
        sourceLog.push("swallowed " + String(e));
      } finally {
        sourceLog.push("finally");
      }
    }
    it("should abort source", async function () {
      const abortable = makeIterableAbortable(source());
      for await (const chunk of abortable) {
        expect(chunk).toBe("a");
        const state = await abortable.abort("ERR");
        expect(state).toBe("completed");
      }
      expect(sourceLog).toEqual(["yield a", "swallowed ERR", "finally"]);
    });
  });
  describe("with error-catching source", function () {
    // eslint-disable-next-line @typescript-eslint/require-await
    async function* source() {
      try {
        sourceLog.push("yield a");
        yield "a";
        sourceLog.push("yield b");
        yield "b";
      } catch (e) {
        sourceLog.push("caught " + String(e));
        yield "result for downstream error";
      } finally {
        sourceLog.push("finally");
      }
    }
    it("should abort source and ignore result for downstream error", async function () {
      const abortable = makeIterableAbortable(source());
      for await (const chunk of abortable) {
        expect(chunk).toBe("a");
        const state = await abortable.abort("ERR");
        expect(state).toBe("caught");
      }
      expect(sourceLog).toEqual(["yield a", "caught ERR", "finally"]);
    });
  });

  describe("with pipe()", function () {
    // eslint-disable-next-line @typescript-eslint/require-await
    async function* source() {
      try {
        sourceLog.push("yield a");
        yield "a";
        sourceLog.push("yield b");
        yield "b";
      } catch (e) {
        sourceLog.push("saw " + String(e));
        throw e;
      } finally {
        sourceLog.push("finally");
      }
    }
    it("should abort source", async function () {
      const iterable = pipe(
        source(),
        async function* noopTransform(
          iterable: AsyncIterable<string>,
        ): AsyncIterable<string> {
          yield* iterable;
        },
        { propagateDownStreamError: true },
      );
      const abortable = makeIterableAbortable(iterable);
      for await (const chunk of abortable) {
        expect(chunk).toBe("a");
        const state = await abortable.abort("ERR");
        expect(state).toBe("rethrown");
      }
      expect(sourceLog).toEqual(["yield a", "saw ERR", "finally"]);
    });
  });
});

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
          transformSerializeEnvelope(fakeSerialization),
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenEnvelopes);
      });
    });
    describe("transformParseEnvelope()", function () {
      it("should parse from envelopes", async function () {
        const it = pipe(
          createAsyncIterable(goldenEnvelopes),
          transformParseEnvelope(fakeSerialization),
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
          transformSerializeEnvelope(serialization, endFlag, endSerialization),
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenEnvelopes);
      });
    });

    describe("transformParseEnvelope()", function () {
      const envelopesWithoutEndFlag = goldenEnvelopes.slice(0, 2);
      const itemsWithoutEndFlag = goldenItems
        .slice(0, 2)
        .map((item) => item.value);
      it("should parse from envelopes", async function () {
        const it = pipe(
          createAsyncIterable(goldenEnvelopes),
          transformParseEnvelope(serialization, endFlag, endSerialization),
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenItems);
      });
      describe("with endStreamFlag but endCompression omitted", function () {
        it("should skip unexpected end flag", async function () {
          const it = pipe(
            createAsyncIterable(goldenEnvelopes),
            transformParseEnvelope(serialization, endFlag),
          );
          const got = await readAll(it);
          expect(got).toEqual(itemsWithoutEndFlag);
        });
        it("should still parse to T", async function () {
          const it = pipe(
            createAsyncIterable(envelopesWithoutEndFlag),
            transformParseEnvelope(serialization, endFlag),
          );
          const got = await readAll(it);
          expect(got).toEqual(itemsWithoutEndFlag);
        });
      });
      describe("with endStreamFlag and endCompression null", function () {
        it("should raise error on unexpected end flag", async function () {
          const it = pipe(
            createAsyncIterable(goldenEnvelopes),
            transformParseEnvelope(serialization, endFlag, null),
          );
          try {
            await readAll(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(ConnectError.from(e).message).toBe(
              "[invalid_argument] unexpected end flag",
            );
          }
        });
        it("should still parse to T", async function () {
          const it = pipe(
            createAsyncIterable(envelopesWithoutEndFlag),
            transformParseEnvelope(serialization, endFlag, null),
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
          transformJoinEnvelopes(),
        );
        const gotBytes = await readAllBytes(it);
        expect(gotBytes).toEqual(goldenBytes);
      });
    });

    describe("transformSplitEnvelope()", function () {
      it("should split envelopes", async function () {
        const it = pipe(
          createAsyncIterableBytes(goldenBytes),
          transformSplitEnvelope(Number.MAX_SAFE_INTEGER),
        );
        const got = await readAll(it);
        expect(got).toEqual(goldenEnvelopes);
      });
      it("should honor readMaxBytes", async function () {
        const it = pipe(
          createAsyncIterableBytes(goldenBytes),
          transformSplitEnvelope(3),
        );
        try {
          await readAll(it);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[resource_exhausted] message size 4 is larger than configured readMaxBytes 3",
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
              Code.ResourceExhausted,
            ),
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
          transformCompressEnvelope(compressionReverse, 0),
        );
        const gotEnvelopes = await readAll(it);
        expect(gotEnvelopes).toEqual(compressedEnvelopes);
      });
      it("should throw on compressed input", async function () {
        const it = pipe(
          createAsyncIterable(compressedEnvelopes),
          transformCompressEnvelope(compressionReverse, 0),
        );
        try {
          await readAll(it);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[internal] invalid envelope, already compressed",
          );
        }
      });
      it("should honor compressMinBytes", async function () {
        const it = pipe(
          createAsyncIterable(uncompressedEnvelopes),
          transformCompressEnvelope(compressionReverse, 5),
        );
        const gotEnvelopes = await readAll(it);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      describe("with null compression", function () {
        it("should not compress", async function () {
          const it = pipe(
            createAsyncIterable(uncompressedEnvelopes),
            transformCompressEnvelope(null, 0),
          );
          const gotEnvelopes = await readAll(it);
          expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
        });
        it("should throw on compressed input", async function () {
          const it = pipe(
            createAsyncIterable(compressedEnvelopes),
            transformCompressEnvelope(compressionReverse, 0),
          );
          try {
            await readAll(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(ConnectError.from(e).message).toBe(
              "[internal] invalid envelope, already compressed",
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
            Number.MAX_SAFE_INTEGER,
          ),
        );
        const gotEnvelopes = await readAll(it);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      it("should not decompress uncompressed envelopes", async function () {
        const it = pipe(
          createAsyncIterable(uncompressedEnvelopes),
          transformDecompressEnvelope(
            compressionReverse,
            Number.MAX_SAFE_INTEGER,
          ),
        );
        const gotEnvelopes = await readAll(it);
        expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
      });
      it("should pass readMaxBytes to compression", async function () {
        const it = pipe(
          createAsyncIterable(compressedEnvelopes),
          transformDecompressEnvelope(compressionReverse, 3),
        );
        try {
          await readAll(it);
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[resource_exhausted] message is larger than configured readMaxBytes 3 after decompression",
          );
        }
      });
      describe("with null compression", function () {
        it("should not decompress uncompressed envelopes", async function () {
          const it = pipe(
            createAsyncIterable(uncompressedEnvelopes),
            transformDecompressEnvelope(null, Number.MAX_SAFE_INTEGER),
          );
          const gotEnvelopes = await readAll(it);
          expect(gotEnvelopes).toEqual(uncompressedEnvelopes);
        });
        it("should raise error on compressed envelope", async function () {
          const it = pipe(
            createAsyncIterable(compressedEnvelopes),
            transformDecompressEnvelope(null, Number.MAX_SAFE_INTEGER),
          );
          try {
            await readAll(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(ConnectError.from(e).message).toBe(
              "[invalid_argument] received compressed envelope, but do not know how to decompress",
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
        transformSerializeEnvelope(serialization),
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

    describe("transformCatch()", function () {
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
          transformSerializeEnvelope(serialization),
          transformCatch<EnvelopedMessage>(() => {
            return {
              flags: 0,
              data: new TextEncoder().encode("ERROR"),
            };
          }),
        );
        const result = await readAll(it);
        expect(result).toEqual(goldenEnvelopes);
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

    it("should serialize, compress, join, split, decompress, and parse", async function () {
      const it = pipe(
        createAsyncIterable(goldenItemsWithEnd),
        transformSerializeEnvelope(serialization, endFlag, endSerialization),
        transformCompressEnvelope(compressionReverse, 0),
        transformJoinEnvelopes(),
        transformSplitEnvelope(Number.MAX_SAFE_INTEGER),
        transformDecompressEnvelope(
          compressionReverse,
          Number.MAX_SAFE_INTEGER,
        ),
        transformParseEnvelope(serialization, endFlag, endSerialization),
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
        transformReadAllBytes(Number.MAX_SAFE_INTEGER),
      );
      const got = await readAllBytes(it);
      expect(got).toEqual(goldenBytes);
    });
    it("should honor readMaxBytes", async function () {
      const it = pipe(
        createAsyncIterableBytes(goldenBytes),
        transformReadAllBytes(4),
      );
      try {
        await readAllBytes(it);
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          "[resource_exhausted] message size is larger than configured readMaxBytes 4",
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
              goldenBytes.byteLength,
            ),
          );
          const got = await readAllBytes(it);
          expect(got).toEqual(goldenBytes);
        });
      });
      describe("that exceeds readMaxBytes", function () {
        it("should error", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(4, 5),
          );
          try {
            await readAllBytes(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(ConnectError.from(e).message).toBe(
              "[resource_exhausted] message size 5 is larger than configured readMaxBytes 4",
            );
          }
        });
      });
      describe("that is not an integer", function () {
        it("should ignore length hint", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(100, 100.75),
          );
          const got = await readAllBytes(it);
          expect(got).toEqual(goldenBytes);
        });
      });
      describe("that is NaN", function () {
        it("should ignore length hint", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(Number.MAX_SAFE_INTEGER, Number.NaN),
          );
          const got = await readAllBytes(it);
          expect(got).toEqual(goldenBytes);
        });
      });
      describe("that is negative", function () {
        it("should ignore length hint", async function () {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(Number.MAX_SAFE_INTEGER, -10),
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
              goldenBytes.byteLength + 100,
            ),
          );
          try {
            await readAllBytes(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(ConnectError.from(e).message).toBe(
              "[invalid_argument] protocol error: promised 116 bytes, received 16",
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
              goldenBytes.byteLength - 10,
            ),
          );
          try {
            await readAllBytes(it);
            fail("expected error");
          } catch (e) {
            expect(e).toBeInstanceOf(ConnectError);
            expect(ConnectError.from(e).message).toBe(
              "[invalid_argument] protocol error: promised 6 bytes, received 8",
            );
          }
        });
      });
    });
  });
});

describe("createWritableIterable()", function () {
  it("works like a regular iterable on the happy path", async () => {
    const wIterable = createWritableIterable<number>();
    let readCount = 0;
    const read = (async () => {
      for await (const next of wIterable) {
        expect(next).toBe(readCount);
        readCount++;
      }
    })();
    const writCount = 5;
    for (let i = 0; i < writCount; i++) {
      await wIterable.write(i);
    }
    wIterable.close();
    await read;
    expect(readCount).toEqual(writCount);
  });
  it("write is interrupted when read fails", async () => {
    const wIterable = createWritableIterable<number>();
    const read = (async () => {
      const itr = wIterable[Symbol.asyncIterator]();
      const next = await itr.next();
      if (next.done === true) {
        fail("expected at least one value");
      } else {
        expect(await itr.throw?.(new Error("read failed"))).toEqual({
          done: true,
          value: undefined,
        });
      }
      // All further calls to next should also result in done results.
      expect(await itr.next()).toEqual({
        done: true,
        value: undefined,
      });
    })();
    await expectAsync(wIterable.write(1)).toBeRejected();
    await expectAsync(wIterable.write(2)).toBeRejected();
    await read;
  });
  it("queues writes", async () => {
    const wIterable = createWritableIterable<number>();
    const writCount = 50;
    const writes = [];
    for (let i = 0; i < writCount; i++) {
      writes.push(wIterable.write(i));
    }
    let readCount = 0;
    const read = (async () => {
      for await (const next of wIterable) {
        expect(next).toBe(readCount);
        readCount++;
      }
    })();
    wIterable.close();
    await read;
    expect(readCount).toEqual(writCount);
    await Promise.all(writes);
  });
  it("queues reads", async () => {
    const wIterable = createWritableIterable<number>();
    const writCount = 50;
    const read = (async () => {
      const itr = wIterable[Symbol.asyncIterator]();
      const readPromises: Promise<IteratorResult<number, number>>[] = [];
      for (let i = 0; i < writCount; i++) {
        readPromises.push(itr.next());
      }
      const reads = await Promise.all(readPromises);
      expect(reads.find((r) => r.done === true)).toBeUndefined();
      expect(reads.map((r) => r.value)).toEqual([...Array(writCount).keys()]);
      await expectAsync(itr.next()).toBeResolvedTo({
        done: true,
        value: undefined,
      });
    })();
    for (let i = 0; i < writCount; i++) {
      await wIterable.write(i);
    }
    wIterable.close();
    await read;
  });
  it("queues reads and writes", async () => {
    const wIterable = createWritableIterable<number>();
    const writCount = 50;
    const read = (async () => {
      const itr = wIterable[Symbol.asyncIterator]();
      const readPromises: Promise<IteratorResult<number, number>>[] = [];
      for (let i = 0; i < writCount; i++) {
        readPromises.push(itr.next());
      }
      const reads = await Promise.all(readPromises);
      expect(reads.find((r) => r.done === true)).toBeUndefined();
      expect(reads.map((r) => r.value)).toEqual([...Array(writCount).keys()]);
      await expectAsync(itr.next()).toBeResolvedTo({
        done: true,
        value: undefined,
      });
    })();
    const writes: Promise<void>[] = [];
    for (let i = 0; i < writCount; i++) {
      writes.push(wIterable.write(i));
    }
    wIterable.close();
    await Promise.all(writes);
    await read;
  });
  it("queued writes are rejected when reader throws", async () => {
    const wIterable = createWritableIterable<number>();
    const writes = [];
    for (let i = 0; i < 50; i++) {
      writes.push(wIterable.write(i));
    }
    wIterable.close();
    const readError = new Error("read failed");
    const read = (async () => {
      const it = wIterable[Symbol.asyncIterator]();
      await it.throw?.(readError);
    })();
    await read;
    expect(await Promise.allSettled(writes)).toEqual(
      new Array(50).fill({ status: "rejected", reason: readError }),
    );
  });
  it("queued writes are rejected when reader calls return", async () => {
    const wIterable = createWritableIterable<number>();
    const writes = [];
    for (let i = 0; i < 50; i++) {
      writes.push(wIterable.write(i));
    }
    wIterable.close();
    const read = (async () => {
      const it = wIterable[Symbol.asyncIterator]();
      await it.return?.();
    })();
    await read;
    expect(await Promise.allSettled(writes)).toEqual(
      new Array(50).fill({
        status: "rejected",
        reason: new Error("cannot write, consumer called return"),
      }),
    );
  });
  it("throw before first write stops writes", async () => {
    const wIterable = createWritableIterable<number>();
    const readError = new Error("read failed");
    const read = (async () => {
      const it = wIterable[Symbol.asyncIterator]();
      await it.throw?.(readError);
    })();
    await expectAsync(wIterable.write(1)).toBeRejectedWith(readError);
    await read;
  });
  it("resolves already written value and rejects future writes on return", async () => {
    const wIterable = createWritableIterable<number>();
    const read = (async () => {
      const itr = wIterable[Symbol.asyncIterator]();
      const next = await itr.next();
      if (next.done === true) {
        fail("expected at least one value");
      } else {
        expect(next.value).toEqual(1);
        expect(await itr.return?.()).toEqual({
          done: true,
          value: undefined,
        });
      }
      // All further calls to next should also result in done results.
      expect(await itr.next()).toEqual({
        done: true,
        value: undefined,
      });
    })();
    await expectAsync(wIterable.write(1)).toBeResolved();
    await expectAsync(wIterable.write(2)).toBeRejected();
    await read;
  });
});
