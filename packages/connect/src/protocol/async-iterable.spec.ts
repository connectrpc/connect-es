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

import { describe, it, beforeEach } from "node:test";
import * as assert from "node:assert";
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

describe("slowly consuming an async iterable", () => {
  it("should propagate backpressure to source", async () => {
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
        assert.notStrictEqual(chunk, undefined); // only to satisfy type checks
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
    assert.ok(sourceElapsedMs >= consumeElapsedMs - leniency);
    assert.ok(sourceElapsedMs <= consumeElapsedMs + leniency);
  });
});

describe("pipe()", () => {
  it("should apply transforms", async () => {
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
    assert.strictEqual(sum, 9);
  });

  describe("with error-raising consumer", () => {
    const sourceLog: string[] = [];
    const consumerLog: string[] = [];
    beforeEach(() => {
      sourceLog.splice(0);
      consumerLog.splice(0);
    });

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

    it("should not propagate error to source by default, and leave it dangling", async () => {
      const iterable = pipe(source(), noopTransform, {
        // propagateDownStreamError: false <- default
      });
      await consumeWithError(iterable);
      assert.deepStrictEqual(sourceLog, ["yield a"]);
      assert.deepStrictEqual(consumerLog, [
        "received a",
        "threw DOWNSTREAM_ERROR",
        "done",
      ]);
    });
    it("should propagate error to source with propagateDownStreamError: true", async () => {
      const iterable = pipe(source(), noopTransform, {
        propagateDownStreamError: true,
      });
      await consumeWithError(iterable);
      assert.deepStrictEqual(sourceLog, [
        "yield a",
        "saw DOWNSTREAM_ERROR",
        "finally",
      ]);
      assert.deepStrictEqual(consumerLog, [
        "received a",
        "threw DOWNSTREAM_ERROR",
        "done",
      ]);
    });
  });
  it("should propagate returns", async () => {
    let returned = false;
    const iterable = pipe(
      // eslint-disable-next-line @typescript-eslint/require-await
      (async function* () {
        try {
          yield 1;
          assert.fail("expected early return");
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
    assert.deepStrictEqual(await it.next(), { done: false, value: 2 });
    await it.return?.();
    assert.ok(returned);
  });
});

describe("pipeTo()", () => {
  it("should pipe iterable to sink", async () => {
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
    assert.strictEqual(sum, 6);
  });
  it("should apply transforms", async () => {
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
    assert.strictEqual(sum, 9);
  });

  describe("with error-raising sink", () => {
    const sourceLog: string[] = [];
    beforeEach(() => {
      sourceLog.splice(0);
    });

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
        assert.notStrictEqual(chunk, undefined); // only to satisfy type checks
        throw "SINK_ERROR";
      }
    }

    async function* noopTransform(
      iterable: AsyncIterable<string>,
    ): AsyncIterable<string> {
      yield* iterable;
    }

    it("should not propagate error to source by default, and leave it dangling", async () => {
      await assert.rejects(
        pipeTo(source(), noopTransform, errorRaisingSink, {
          // propagateDownStreamError: false <- default
        }),
        (e) => {
          assert.strictEqual(e, "SINK_ERROR");
          return true;
        },
      );
      assert.deepStrictEqual(sourceLog, ["yield a"]);
    });
    it("should propagate error to source with propagateDownStreamError: true", async () => {
      await assert.rejects(
        pipeTo(source(), noopTransform, errorRaisingSink, {
          propagateDownStreamError: true,
        }),
        (e) => {
          assert.strictEqual(e, "SINK_ERROR");
          return true;
        },
      );
      assert.deepStrictEqual(sourceLog, [
        "yield a",
        "saw SINK_ERROR",
        "finally",
      ]);
    });
  });
});

describe("makeIterableAbortable()", () => {
  const sourceLog: string[] = [];
  beforeEach(() => {
    sourceLog.splice(0);
  });
  describe("with simple source", () => {
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
    it("should abort source", async () => {
      const abortable = makeIterableAbortable(source());
      for await (const chunk of abortable) {
        assert.strictEqual(chunk, "a");
        const state = await abortable.abort("ERR");
        assert.strictEqual(state, "rethrown");
      }
      assert.deepStrictEqual(sourceLog, ["yield a", "saw ERR", "finally"]);
    });
  });
  describe("with error swallowing source", () => {
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
    it("should abort source", async () => {
      const abortable = makeIterableAbortable(source());
      for await (const chunk of abortable) {
        assert.strictEqual(chunk, "a");
        const state = await abortable.abort("ERR");
        assert.strictEqual(state, "completed");
      }
      assert.deepStrictEqual(sourceLog, [
        "yield a",
        "swallowed ERR",
        "finally",
      ]);
    });
  });
  describe("with error-catching source", () => {
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
    it("should abort source and ignore result for downstream error", async () => {
      const abortable = makeIterableAbortable(source());
      for await (const chunk of abortable) {
        assert.strictEqual(chunk, "a");
        const state = await abortable.abort("ERR");
        assert.strictEqual(state, "caught");
      }
      assert.deepStrictEqual(sourceLog, ["yield a", "caught ERR", "finally"]);
    });
  });

  describe("with pipe()", () => {
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
    it("should abort source", async () => {
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
        assert.strictEqual(chunk, "a");
        const state = await abortable.abort("ERR");
        assert.strictEqual(state, "rethrown");
      }
      assert.deepStrictEqual(sourceLog, ["yield a", "saw ERR", "finally"]);
    });
  });
});

describe("transforming asynchronous iterables", () => {
  describe("envelope serialization", () => {
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
      serialize(data: string): Uint8Array<ArrayBuffer> {
        return new TextEncoder().encode(data);
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data);
      },
    };
    describe("transformSerializeEnvelope()", () => {
      it("should serialize to envelopes", async () => {
        const it = pipe(
          createAsyncIterable(goldenItems),
          transformSerializeEnvelope(fakeSerialization),
        );
        const got = await readAll(it);
        assert.deepStrictEqual(got, goldenEnvelopes);
      });
    });
    describe("transformParseEnvelope()", () => {
      it("should parse from envelopes", async () => {
        const it = pipe(
          createAsyncIterable(goldenEnvelopes),
          transformParseEnvelope(fakeSerialization),
        );
        const got = await readAll(it);
        assert.deepStrictEqual(got, goldenItems);
      });
    });
  });

  describe("envelope serialization with end", () => {
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
      serialize(data: string): Uint8Array<ArrayBuffer> {
        return new TextEncoder().encode(data);
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data);
      },
    };
    const endSerialization: Serialization<string> = {
      serialize(data: string): Uint8Array<ArrayBuffer> {
        return new TextEncoder().encode(data + ".");
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data).slice(0, -1);
      },
    };

    describe("transformSerializeEnvelope()", () => {
      it("should serialize to envelopes", async () => {
        const it = pipe(
          createAsyncIterable(goldenItems),
          transformSerializeEnvelope(serialization, endFlag, endSerialization),
        );
        const got = await readAll(it);
        assert.deepStrictEqual(got, goldenEnvelopes);
      });
    });

    describe("transformParseEnvelope()", () => {
      const envelopesWithoutEndFlag = goldenEnvelopes.slice(0, 2);
      const itemsWithoutEndFlag = goldenItems
        .slice(0, 2)
        .map((item) => item.value);
      it("should parse from envelopes", async () => {
        const it = pipe(
          createAsyncIterable(goldenEnvelopes),
          transformParseEnvelope(serialization, endFlag, endSerialization),
        );
        const got = await readAll(it);
        assert.deepStrictEqual(got, goldenItems);
      });
      describe("with endStreamFlag but endCompression omitted", () => {
        it("should skip unexpected end flag", async () => {
          const it = pipe(
            createAsyncIterable(goldenEnvelopes),
            transformParseEnvelope(serialization, endFlag),
          );
          const got = await readAll(it);
          assert.deepStrictEqual(got, itemsWithoutEndFlag);
        });
        it("should still parse to T", async () => {
          const it = pipe(
            createAsyncIterable(envelopesWithoutEndFlag),
            transformParseEnvelope(serialization, endFlag),
          );
          const got = await readAll(it);
          assert.deepStrictEqual(got, itemsWithoutEndFlag);
        });
      });
      describe("with endStreamFlag and endCompression null", () => {
        it("should raise error on unexpected end flag", async () => {
          const it = pipe(
            createAsyncIterable(goldenEnvelopes),
            transformParseEnvelope(serialization, endFlag, null),
          );
          await assert.rejects(readAll(it), (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[invalid_argument] unexpected end flag",
            );
            return true;
          });
        });
        it("should still parse to T", async () => {
          const it = pipe(
            createAsyncIterable(envelopesWithoutEndFlag),
            transformParseEnvelope(serialization, endFlag, null),
          );
          const got = await readAll(it);
          assert.deepStrictEqual(got, itemsWithoutEndFlag);
        });
      });
    });
  });

  describe("joining and splitting envelopes", () => {
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

    describe("transformJoinEnvelopes()", () => {
      it("should join envelopes", async () => {
        const it = pipe(
          createAsyncIterable(goldenEnvelopes),
          transformJoinEnvelopes(),
        );
        const gotBytes = await readAllBytes(it);
        assert.deepStrictEqual(gotBytes, goldenBytes);
      });
    });

    describe("transformSplitEnvelope()", () => {
      it("should split envelopes", async () => {
        const it = pipe(
          createAsyncIterableBytes(goldenBytes),
          transformSplitEnvelope(Number.MAX_SAFE_INTEGER),
        );
        const got = await readAll(it);
        assert.deepStrictEqual(got, goldenEnvelopes);
      });
      it("should honor readMaxBytes", async () => {
        const it = pipe(
          createAsyncIterableBytes(goldenBytes),
          transformSplitEnvelope(3),
        );
        await assert.rejects(readAll(it), (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(
            e.message,
            "[resource_exhausted] message size 4 is larger than configured readMaxBytes 3",
          );
          return true;
        });
      });
    });
  });

  describe("(de-)compressing envelopes", () => {
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

    describe("transformCompressEnvelope()", () => {
      it("should compress envelopes", async () => {
        const it = pipe(
          createAsyncIterable(uncompressedEnvelopes),
          transformCompressEnvelope(compressionReverse, 0),
        );
        const gotEnvelopes = await readAll(it);
        assert.deepStrictEqual(gotEnvelopes, compressedEnvelopes);
      });
      it("should throw on compressed input", async () => {
        const it = pipe(
          createAsyncIterable(compressedEnvelopes),
          transformCompressEnvelope(compressionReverse, 0),
        );
        await assert.rejects(readAll(it), (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(
            e.message,
            "[internal] invalid envelope, already compressed",
          );
          return true;
        });
      });
      it("should honor compressMinBytes", async () => {
        const it = pipe(
          createAsyncIterable(uncompressedEnvelopes),
          transformCompressEnvelope(compressionReverse, 5),
        );
        const gotEnvelopes = await readAll(it);
        assert.deepStrictEqual(gotEnvelopes, uncompressedEnvelopes);
      });
      describe("with null compression", () => {
        it("should not compress", async () => {
          const it = pipe(
            createAsyncIterable(uncompressedEnvelopes),
            transformCompressEnvelope(null, 0),
          );
          const gotEnvelopes = await readAll(it);
          assert.deepStrictEqual(gotEnvelopes, uncompressedEnvelopes);
        });
        it("should throw on compressed input", async () => {
          const it = pipe(
            createAsyncIterable(compressedEnvelopes),
            transformCompressEnvelope(compressionReverse, 0),
          );
          await assert.rejects(readAll(it), (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[internal] invalid envelope, already compressed",
            );
            return true;
          });
        });
      });
    });

    describe("transformDecompressEnvelope()", () => {
      it("should decompress envelopes", async () => {
        const it = pipe(
          createAsyncIterable(compressedEnvelopes),
          transformDecompressEnvelope(
            compressionReverse,
            Number.MAX_SAFE_INTEGER,
          ),
        );
        const gotEnvelopes = await readAll(it);
        assert.deepStrictEqual(gotEnvelopes, uncompressedEnvelopes);
      });
      it("should not decompress uncompressed envelopes", async () => {
        const it = pipe(
          createAsyncIterable(uncompressedEnvelopes),
          transformDecompressEnvelope(
            compressionReverse,
            Number.MAX_SAFE_INTEGER,
          ),
        );
        const gotEnvelopes = await readAll(it);
        assert.deepStrictEqual(gotEnvelopes, uncompressedEnvelopes);
      });
      it("should pass readMaxBytes to compression", async () => {
        const it = pipe(
          createAsyncIterable(compressedEnvelopes),
          transformDecompressEnvelope(compressionReverse, 3),
        );
        await assert.rejects(readAll(it), (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(
            e.message,
            "[resource_exhausted] message is larger than configured readMaxBytes 3 after decompression",
          );
          return true;
        });
      });
      describe("with null compression", () => {
        it("should not decompress uncompressed envelopes", async () => {
          const it = pipe(
            createAsyncIterable(uncompressedEnvelopes),
            transformDecompressEnvelope(null, Number.MAX_SAFE_INTEGER),
          );
          const gotEnvelopes = await readAll(it);
          assert.deepStrictEqual(gotEnvelopes, uncompressedEnvelopes);
        });
        it("should raise error on compressed envelope", async () => {
          const it = pipe(
            createAsyncIterable(compressedEnvelopes),
            transformDecompressEnvelope(null, Number.MAX_SAFE_INTEGER),
          );
          await assert.rejects(readAll(it), (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[internal] received compressed envelope, but do not know how to decompress",
            );
            return true;
          });
        });
      });
    });
  });

  describe("error handling", () => {
    const goldenItems = ["a", "b", "c"];
    const serialization: Serialization<string> = {
      serialize(data: string): Uint8Array<ArrayBuffer> {
        if (data === "c") {
          throw new ConnectError("cannot serialize 'c'", Code.Internal);
        }
        return new TextEncoder().encode(data);
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data);
      },
    };

    it("should raise error when unhandled", async () => {
      const it = pipe(
        createAsyncIterable(goldenItems),
        transformSerializeEnvelope(serialization),
      );
      await assert.rejects(readAll(it), (e) => {
        assert.ok(e instanceof ConnectError);
        assert.strictEqual(e.code, Code.Internal);
        assert.strictEqual(e.rawMessage, "cannot serialize 'c'");
        assert.strictEqual(e.cause, undefined);
        return true;
      });
    });

    describe("transformCatch()", () => {
      it("should catch error", async () => {
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
        assert.deepStrictEqual(result, goldenEnvelopes);
      });
    });
  });

  describe("combined transform round-trip", () => {
    const endFlag = 0b10000000;
    const goldenItemsWithEnd = [
      { value: "a", end: false },
      { value: "b", end: false },
      { value: "end", end: true },
    ];
    const serialization: Serialization<string> = {
      serialize(data: string): Uint8Array<ArrayBuffer> {
        return new TextEncoder().encode(data);
      },
      parse(data: Uint8Array): string {
        return new TextDecoder().decode(data);
      },
    };
    const endSerialization: Serialization<string> = {
      serialize(data: string): Uint8Array<ArrayBuffer> {
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

    it("should serialize, compress, join, split, decompress, and parse", async () => {
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
      assert.deepStrictEqual(result, goldenItemsWithEnd);
    });
  });

  describe("transformReadAllBytes()", () => {
    const goldenBytes = new Uint8Array([
      0xde, 0xad, 0xbe, 0xef, 0xde, 0xad, 0xbe, 0xef, 0xde, 0xad, 0xbe, 0xef,
      0xde, 0xad, 0xbe, 0xef,
    ]);
    it("should read all bytes", async () => {
      const it = pipe(
        createAsyncIterableBytes(goldenBytes),
        transformReadAllBytes(Number.MAX_SAFE_INTEGER),
      );
      const got = await readAllBytes(it);
      assert.deepStrictEqual(got, goldenBytes);
    });
    it("should honor readMaxBytes", async () => {
      const it = pipe(
        createAsyncIterableBytes(goldenBytes),
        transformReadAllBytes(4),
      );
      await assert.rejects(readAllBytes(it), (e) => {
        assert.ok(e instanceof ConnectError);
        assert.strictEqual(
          e.message,
          "[resource_exhausted] message size is larger than configured readMaxBytes 4",
        );
        return true;
      });
    });
    describe("with length hint", () => {
      describe("that matches actual length", () => {
        it("should read without error", async () => {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(
              Number.MAX_SAFE_INTEGER,
              goldenBytes.byteLength,
            ),
          );
          const got = await readAllBytes(it);
          assert.deepStrictEqual(got, goldenBytes);
        });
      });
      describe("that exceeds readMaxBytes", () => {
        it("should error", async () => {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(4, 5),
          );
          await assert.rejects(readAllBytes(it), (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[resource_exhausted] message size 5 is larger than configured readMaxBytes 4",
            );
            return true;
          });
        });
      });
      describe("that is not an integer", () => {
        it("should ignore length hint", async () => {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(100, 100.75),
          );
          const got = await readAllBytes(it);
          assert.deepStrictEqual(got, goldenBytes);
        });
      });
      describe("that is NaN", () => {
        it("should ignore length hint", async () => {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(Number.MAX_SAFE_INTEGER, Number.NaN),
          );
          const got = await readAllBytes(it);
          assert.deepStrictEqual(got, goldenBytes);
        });
      });
      describe("that is negative", () => {
        it("should ignore length hint", async () => {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(Number.MAX_SAFE_INTEGER, -10),
          );
          const got = await readAllBytes(it);
          assert.deepStrictEqual(got, goldenBytes);
        });
      });
      describe("that is larger than the actual length", () => {
        it("should error", async () => {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(
              Number.MAX_SAFE_INTEGER,
              goldenBytes.byteLength + 100,
            ),
          );
          await assert.rejects(readAllBytes(it), (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[invalid_argument] protocol error: promised 116 bytes, received 16",
            );
            return true;
          });
        });
      });
      describe("that is smaller than the actual length", () => {
        it("should error", async () => {
          const it = pipe(
            createAsyncIterableBytes(goldenBytes),
            transformReadAllBytes(
              Number.MAX_SAFE_INTEGER,
              goldenBytes.byteLength - 10,
            ),
          );
          await assert.rejects(readAllBytes(it), (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[invalid_argument] protocol error: promised 6 bytes, received 8",
            );
            return true;
          });
        });
      });
    });
  });
});

describe("createWritableIterable()", () => {
  it("works like a regular iterable on the happy path", async () => {
    const wIterable = createWritableIterable<number>();
    let readCount = 0;
    const read = (async () => {
      for await (const next of wIterable) {
        assert.strictEqual(next, readCount);
        readCount++;
      }
    })();
    const writCount = 5;
    for (let i = 0; i < writCount; i++) {
      await wIterable.write(i);
    }
    wIterable.close();
    await read;
    assert.strictEqual(readCount, writCount);
  });
  it("write is interrupted when read fails", async () => {
    const wIterable = createWritableIterable<number>();
    const read = (async () => {
      const itr = wIterable[Symbol.asyncIterator]();
      const next = await itr.next();
      if (next.done === true) {
        assert.fail("expected at least one value");
      } else {
        assert.deepStrictEqual(await itr.throw?.(new Error("read failed")), {
          done: true,
          value: undefined,
        });
      }
      // All further calls to next should also result in done results.
      assert.deepStrictEqual(await itr.next(), {
        done: true,
        value: undefined,
      });
    })();
    await assert.rejects(wIterable.write(1));
    await assert.rejects(wIterable.write(2));
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
        assert.strictEqual(next, readCount);
        readCount++;
      }
    })();
    wIterable.close();
    await read;
    assert.strictEqual(readCount, writCount);
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
      assert.strictEqual(
        reads.find((r) => r.done === true),
        undefined,
      );
      assert.deepStrictEqual(
        reads.map((r) => r.value),
        [...Array(writCount).keys()],
      );
      assert.deepStrictEqual(await itr.next(), {
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
      assert.strictEqual(
        reads.find((r) => r.done === true),
        undefined,
      );
      assert.deepStrictEqual(
        reads.map((r) => r.value),
        [...Array(writCount).keys()],
      );
      assert.deepStrictEqual(await itr.next(), {
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
    assert.deepStrictEqual(
      await Promise.allSettled(writes),
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
    assert.deepStrictEqual(
      await Promise.allSettled(writes),
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
    await assert.rejects(wIterable.write(1), (err) => {
      assert.deepStrictEqual(err, readError);
      return true;
    });
    await read;
  });
  it("resolves already written value and rejects future writes on return", async () => {
    const wIterable = createWritableIterable<number>();
    const read = (async () => {
      const itr = wIterable[Symbol.asyncIterator]();
      const next = await itr.next();
      if (next.done === true) {
        assert.fail("expected at least one value");
      } else {
        assert.strictEqual(next.value, 1);
        assert.deepStrictEqual(await itr.return?.(), {
          done: true,
          value: undefined,
        });
      }
      // All further calls to next should also result in done results.
      assert.deepStrictEqual(await itr.next(), {
        done: true,
        value: undefined,
      });
    })();
    await wIterable.write(1);
    await assert.rejects(wIterable.write(2));
    await read;
  });
});
