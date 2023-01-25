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

import type { Serialization } from "./serialization.js";
import type { Compression } from "./compression.js";
import { encodeEnvelopes } from "./envelope.js";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import {
  createAsyncIterable,
  createAsyncIterableBytes,
  readAll,
  readAllBytes,
} from "./async-iterable-helper.spec.js";
import {
  pipe,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformSerializeEnvelope,
  transformSplitEnvelope,
  transformParseEnvelope,
} from "./async-iterable.js";

class Reader<T> {
  private it: AsyncIterable<T>;

  constructor(it: AsyncIterable<T>) {
    this.it = it;
  }
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return {
      next: async () => {
        for await (const item of this.it) {
          return { value: item };
        }
        return { value: "", done: true };
      },
    };
  }
}

// QueueElement represents an element in the writer queue, which consists of the payload being written as well as an
// associated resolve function to be invoked/resolved when the written element is read from the queue via the async
// iterator.
interface QueueElement<T> {
  payload: IteratorResult<T>;
  resolve?: () => void;
  reject?: (reason?: Error) => void;
}

class Writer<T> {
  private queue: QueueElement<T>[] = [];
  // Represents the resolve function of the promise returned by the async iterator if no values exist in the queue at
  // the time of request.  It is resolved when a value is successfully received into the queue.
  private queueResolve: ((val: IteratorResult<T>) => void) | undefined;
  private error: Error | undefined = undefined;

  async process(payload: IteratorResult<T, undefined>) {
    // // If the writer's internal error was set, then reject any attempts at processing a payload.
    if (this.error) {
      return Promise.reject(String(this.error));
    }
    // If there is an iterator resolver then a consumer of the async iterator is waiting on a value.  So resolve that
    // promise with the new value being sent and return a promise that is immediately resolved
    if (this.queueResolve) {
      this.queueResolve(payload);
      this.queueResolve = undefined;
      return Promise.resolve();
    }
    const elem: QueueElement<T> = {
      payload,
    };
    const prom = new Promise<void>((resolve, reject) => {
      elem.resolve = resolve;
      elem.reject = reject;
    });
    // Otherwise no one is waiting on a value yet so add it to the queue and return a promise that will be resolved
    // when someone reads this value
    this.queue.push(elem);

    return prom;
  }
  async send(payload: T) {
    return this.process({ value: payload, done: false });
  }
  async close() {
    return this.process({ value: undefined, done: true });
  }
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return {
      next: async () => {
        // If the writer's internal error was set, then reject any attempts at processing a payload.
        if (this.error) {
          return Promise.reject(String(this.error));
        }
        const elem = this.queue.shift();
        if (!elem) {
          // We don't have any payloads ready to be sent (i.e. the consumer of the iterator is consuming faster than
          // senders are sending).  So return a Promise ensuring we'll resolve it when we get something.
          return new Promise<IteratorResult<T>>((resolve) => {
            this.queueResolve = resolve;
          });
        }
        // Resolve the send promise on a successful send/close.
        if (elem.resolve) {
          elem.resolve();
        }
        return elem.payload;
      },
      throw: async (e: Error) => {
        this.error = e;
        // The reader of this iterator has failed with the given error.  So anything left in the queue should be
        // drained and rejected with the given error
        for (const item of this.queue) {
          if (item.reject) {
            item.reject(e);
          }
        }
        // this.queue = [];
        return new Promise<IteratorResult<T>>((resolve) => {
          resolve({ value: String(e), done: true });
        });
      },
    };
  }
}

// These tests aim to model the usage of iterable transforms in clients and servers.
// Note that the tests were written as a proof of concept, and the coverage is
// incomplete (cancellation, backpressure, error handling, etc.).
describe("full story", function () {
  const readMaxBytes = 0xffffffff; // zlib caps maxOutputLength at this value
  const writeMaxBytes = readMaxBytes;
  const serialization: Serialization<string> = {
    serialize(data: string): Uint8Array {
      return new TextEncoder().encode(data);
    },
    parse(data: Uint8Array): string {
      return new TextDecoder().decode(data);
    },
  };
  const endSerialization: Serialization<"end"> = {
    serialize(data: string): Uint8Array {
      return new TextEncoder().encode(data + ".");
    },
    parse(data: Uint8Array): "end" {
      const t = new TextDecoder().decode(data).slice(0, -1);
      if (t !== "end") {
        throw new ConnectError(
          "serialize end: cannot parse",
          Code.InvalidArgument
        );
      }
      return t;
    },
  };
  const endFlag = 0b10000000;
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
  const goldenBytes = encodeEnvelopes(
    {
      flags: 0 | 0b00000001,
      data: new TextEncoder().encode("alpha").reverse(),
    },
    {
      flags: 0 | 0b00000001,
      data: new TextEncoder().encode("beta").reverse(),
    },
    {
      flags: 0 | 0b00000001 | endFlag,
      data: new TextEncoder().encode("end.").reverse(),
    }
  );
  type Payload<I, E> = { end: false; value: I } | { end: true; value: E };
  const goldenPayload: Payload<string, "end">[] = [
    { value: "alpha", end: false },
    { value: "beta", end: false },
    { value: "end", end: true },
  ];

  describe("write", function () {
    it("should write expected bytes", async function () {
      const it = pipe(
        createAsyncIterable(goldenPayload),
        transformSerializeEnvelope(
          serialization,
          writeMaxBytes,
          endFlag,
          endSerialization
        ),
        transformCompressEnvelope(compressionReverse, 0),
        transformJoinEnvelopes()
      );
      const all = await readAllBytes(it);
      expect(all).toEqual(goldenBytes);
    });
  });

  describe("read", function () {
    it("should read expected bytes", async function () {
      const it = pipe(
        createAsyncIterableBytes(goldenBytes),
        transformSplitEnvelope(readMaxBytes),
        transformDecompressEnvelope(compressionReverse, readMaxBytes),
        transformParseEnvelope(serialization, endFlag, endSerialization)
      );
      const all = await readAll(it);
      expect(all).toEqual(goldenPayload);
    });
  });

  describe("client integration", function () {
    let writer: Writer<Payload<string, "end">>;
    let writerIt: AsyncIterable<Uint8Array>;
    let readerIt: AsyncIterable<
      { end: false; value: string | "end" } | { end: true; value: "end" }
    >;
    beforeEach(() => {
      writer = new Writer<Payload<string, "end">>();
      writerIt = pipe(
        writer,
        transformSerializeEnvelope(
          serialization,
          writeMaxBytes,
          endFlag,
          endSerialization
        ),
        transformCompressEnvelope(compressionReverse, 0),
        transformJoinEnvelopes()
      );
      readerIt = pipe(
        new Reader(writerIt),
        transformSplitEnvelope(readMaxBytes),
        transformDecompressEnvelope(compressionReverse, readMaxBytes),
        transformParseEnvelope(serialization, endFlag, endSerialization)
      );
    });
    it("should correctly return results when caller waits properly", async function () {
      writer
        .send({ value: "alpha", end: false })
        .then(() => writer.send({ value: "beta", end: false }))
        .then(() => writer.send({ value: "gamma", end: false }))
        .then(() => writer.send({ value: "delta", end: false }))
        .finally(() => {
          void writer.close();
        });

      const resp = await readAll(readerIt);
      expect(resp).toEqual([
        { value: "alpha", end: false },
        { value: "beta", end: false },
        { value: "gamma", end: false },
        { value: "delta", end: false },
      ]);
    });
    it("should correctly return results when caller sends without waiting", async function () {
      // Writes all the payloads without awaiting and saves off promises from the writes
      const writes = Promise.all([
        writer.send({ value: "alpha", end: false }),
        writer.send({ value: "beta", end: false }),
        writer.send({ value: "gamma", end: false }),
        writer.send({ value: "delta", end: false }),
        writer.close(),
      ]);

      // Read all the written payloads
      const resp = await readAll(readerIt);

      // Await on the write promises now.  These should all be resolved since all payloads have been read.
      await writes;

      expect(resp).toEqual([
        { value: "alpha", end: false },
        { value: "beta", end: false },
        { value: "gamma", end: false },
        { value: "delta", end: false },
      ]);
    });
    it("should correctly behave when consumer fails and throw is invoked", async function () {
      // Send four total payloads, but don't close the writer.
      // successfulSends represents sends that are expected to succeed.
      const successfulSends = Promise.all([
        writer.send({ value: "alpha", end: false }),
      ]);
      const failedSends = Promise.all([
        writer.send({ value: "beta", end: false }),
        writer.send({ value: "gamma", end: false }),
        writer.send({ value: "delta", end: false }),
      ]);

      const resp: (
        | { end: false; value: string }
        | { end: true; value: "end" }
      )[] = [];
      try {
        // Iterate over the reader and purposely fail after the first read.
        for (;;) {
          const result = await readerIt[Symbol.asyncIterator]().next();
          resp.push(result.value as { end: false; value: string });
          throw "READER_ERROR";
        }
      } catch (e) {
        // Verify we got the first send only and then verify we caught the expected error.
        expect(resp).toEqual([{ value: "alpha", end: false }]);
        expect(e).toBe("READER_ERROR");
        // Then call the throw function on the writer to tell it an error has occurred.
        const it = writer[Symbol.asyncIterator]();
        if (it.throw) {
          await it.throw(e);
        }
      }

      // Verify that our expected successfulSends and failedSends resolved and rejected accordingly
      if (successfulSends) {
        successfulSends
          .then((result) => expect(result).toEqual([undefined]))
          .catch(() =>
            fail("expected successful writes were unexpectedly rejected")
          );
      }

      if (failedSends) {
        failedSends
          .then(() => fail("expected failed writes were unexpectedly resolved"))
          .catch((e) => expect(e).toBe("READER_ERROR"));
      }

      // At this point, the writer was closed courtesy of our call to .throw above, so no further
      // sends to the writer will succeed.
      // They will all be rejected with the error passed to throw.
      writer
        .send({ value: "omega", end: false })
        .then(() => fail("send was unexpectedly resolved."))
        .catch((e) => expect(e).toBe("READER_ERROR"));

      // The reader's internal writer is closed so any future reads will be rejected.
      readerIt[Symbol.asyncIterator]()
        .next()
        .then(() => fail("reads were unexpectedly resolved"))
        .catch((e) => expect(e).toBe("READER_ERROR"));
    });
  });

  describe("server integration", function () {
    const echoImplReceived: string[] = [];

    async function* echoImpl(
      input: AsyncIterable<string>
    ): AsyncIterable<string> {
      for await (const i of input) {
        echoImplReceived.push(i);
        yield i;
      }
    }

    beforeEach(function () {
      echoImplReceived.splice(0);
    });

    it("should echo expected bytes", async function () {
      const inputIt = pipe(
        createAsyncIterableBytes(goldenBytes),
        transformSplitEnvelope(readMaxBytes),
        transformDecompressEnvelope(compressionReverse, readMaxBytes),
        transformParseEnvelope(serialization, endFlag, endSerialization),
        async function* (iterable): AsyncIterable<string> {
          let endReceived = false;
          for await (const envelope of iterable) {
            if (envelope.end) {
              if (endReceived) {
                throw new Error("already received end");
              }
              endReceived = true;
              continue;
            }
            yield envelope.value;
          }
          if (!endReceived) {
            throw new Error("did not receive end");
          }
        }
      );

      const outputIt = pipe(
        echoImpl(inputIt),
        async function* (
          iterable: AsyncIterable<string>
        ): AsyncIterable<
          { end: false; value: string | "end" } | { end: true; value: "end" }
        > {
          for await (const message of iterable) {
            yield { end: false, value: message };
          }
          yield { end: true, value: "end" };
        },
        transformSerializeEnvelope(
          serialization,
          Number.MAX_SAFE_INTEGER,
          endFlag,
          endSerialization
        ),
        transformCompressEnvelope(compressionReverse, 0),
        transformJoinEnvelopes()
      );

      expect(await readAllBytes(outputIt)).toEqual(goldenBytes);

      // sanity check that the implementation was invoked
      expect(echoImplReceived).toEqual(["alpha", "beta"]);
    });
  });
});
