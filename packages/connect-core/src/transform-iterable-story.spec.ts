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
import { encodeEnvelopes, ParsedEnvelopedMessage } from "./envelope.js";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import {
  createAsyncIterable,
  createAsyncIterableBytes,
  readAll,
  readAllBytes,
} from "./transform-iterable-helper.spec.js";
import {
  transformAsyncIterable,
  transformCompress,
  transformDecompress,
  transformJoin,
  transformSerialize,
  transformSplit,
  transformParse,
} from "./transform-iterable.js";

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

class Writer<T> {
  private queue: IteratorResult<T>[] = [];
  // Represents the resolve function of the promise returned by the async iterator if no values exist in the queue at
  // the time of request.  It is resolved when a value is successfully received into the queue.
  private queueResolver: ((val: IteratorResult<T>) => void) | undefined;
  // Represents the resolve function of the promise returned by send.  It is resolved when a value is successfully
  // read via the async iterator.
  private sendResolver: (() => void) | undefined;

  async process(item: IteratorResult<T, undefined>) {
    // If there is an iterator resolver then a consumer of the async iterator is waiting on a value.  So resolve that
    // promise with the new value being sent and return a promise that is immediately resolved
    if (this.queueResolver) {
      this.queueResolver(item);
      this.queueResolver = undefined;
      return new Promise<void>((resolve) => {
        resolve();
      });
    }
    // Otherwise no one is waiting on a value yet so add it to the queue and return a promise that will be resolved
    // when someone reads this value
    this.queue.push(item);
    return new Promise<void>((resolve) => {
      this.sendResolver = resolve;
    });
  }
  async send(item: T) {
    return this.process({ value: item, done: false });
  }
  async close() {
    return this.process({ value: undefined, done: true });
  }
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return {
      next: async () => {
        const payload = this.queue.shift();
        if (!payload) {
          // We don't have any payloads ready to be sent (i.e. the consumer of the iterator is consuming faster than
          // senders are sending).  So return a Promise ensuring we'll resolve it when we get something.
          return new Promise<IteratorResult<T>>((resolve) => {
            this.queueResolver = resolve;
          });
        }
        // Resolve the send promise on a successful send/close.
        if (this.sendResolver) {
          this.sendResolver();
          this.sendResolver = undefined;
        }
        return payload;
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
      const it = transformAsyncIterable(
        createAsyncIterable(goldenPayload),
        transformSerialize(serialization, endFlag, endSerialization),
        transformCompress(compressionReverse, writeMaxBytes, 0),
        transformJoin(writeMaxBytes)
      );
      const all = await readAllBytes(it);
      expect(all).toEqual(goldenBytes);
    });
  });

  describe("read", function () {
    it("should read expected bytes", async function () {
      const it = transformAsyncIterable(
        createAsyncIterableBytes(goldenBytes),
        transformSplit(readMaxBytes),
        transformDecompress(compressionReverse, readMaxBytes),
        transformParse(serialization, endFlag, endSerialization)
      );
      const all = await readAll(it);
      expect(all).toEqual(goldenPayload);
    });
  });

  describe("client integration", function () {
    it("should works", async function () {
      const writer = new Writer<Payload<string, "end">>();
      const writerIt = transformAsyncIterable(
        writer,
        transformSerialize(serialization, endFlag, endSerialization),
        transformCompress(compressionReverse, writeMaxBytes, 0),
        transformJoin(writeMaxBytes)
      );

      const reader = transformAsyncIterable(
        new Reader(writerIt),
        transformSplit(readMaxBytes),
        transformDecompress(compressionReverse, readMaxBytes),
        transformParse(serialization, endFlag, endSerialization)
      );

      writer
        .send({ value: "alpha", end: false })
        .then(() => writer.send({ value: "beta", end: false }))
        .then(() => writer.send({ value: "gamma", end: false }))
        .then(() => writer.send({ value: "delta", end: false }))
        .finally(() => {
          void writer.close();
        });

      const resp = await readAll(reader);
      expect(resp).toEqual([
        { value: "alpha", end: false },
        { value: "beta", end: false },
        { value: "gamma", end: false },
        { value: "delta", end: false },
      ]);
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
      const inputIt = transformAsyncIterable(
        createAsyncIterableBytes(goldenBytes),
        transformSplit(readMaxBytes),
        transformDecompress(compressionReverse, readMaxBytes),
        transformParse(serialization, endFlag, endSerialization),
        async function* (
          iterable: AsyncIterable<ParsedEnvelopedMessage<string, "end">>
        ): AsyncIterable<string> {
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

      const outputIt = transformAsyncIterable(
        echoImpl(inputIt),
        async function* (
          iterable: AsyncIterable<string>
        ): AsyncIterable<ParsedEnvelopedMessage<string, "end">> {
          for await (const message of iterable) {
            yield { end: false, value: message };
          }
          yield { end: true, value: "end" };
        },
        transformSerialize(serialization, endFlag, endSerialization),
        transformCompress(compressionReverse, writeMaxBytes, 0),
        transformJoin(writeMaxBytes)
      );

      expect(await readAllBytes(outputIt)).toEqual(goldenBytes);

      // sanity check that the implementation was invoked
      expect(echoImplReceived).toEqual(["alpha", "beta"]);
    });
  });
});
