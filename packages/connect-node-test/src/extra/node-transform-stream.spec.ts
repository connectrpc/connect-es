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

import type { EnvelopedMessage, Serialization } from "@bufbuild/connect-core";
import { Readable, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
import {
  deserializeStream,
  transformSerialize,
} from "./node-transform-stream.js";

// Both Node.js and WHATWG streams have a concept of stream transformation.
// The main differences between both:
//
// 1. Node.js streams do not have TypeScript typings for chunks.
// 2. Node.js pipeline always starts with a readable and ends with a writable,
//    while WHATWG stream transforms happen on the readable side exclusively.
//
describe("transforming Node.js streams", function () {
  const fakeSerialization: Serialization<string> = {
    serialize(data: string): Uint8Array {
      return new TextEncoder().encode(data);
    },
    parse(data: Uint8Array): string {
      return new TextDecoder().decode(data);
    },
  };

  it("should serialize to envelopes", async function () {
    const s = createWritableStream<EnvelopedMessage>();
    await pipeline(
      createReadableStream(["a", "b", "c"]),
      transformSerialize(fakeSerialization),
      s
    );
    expect(s.getWrittenItems()).toEqual([
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
    ]);
  });

  it("should serialize and deserialize", async function () {
    const s = createWritableStream<string>();
    await pipeline(
      createReadableStream(["a", "b", "c"]),
      transformSerialize(fakeSerialization),
      deserializeStream(fakeSerialization),
      s
    );
    expect(s.getWrittenItems()).toEqual(["a", "b", "c"]);
  });
});

/**
 * Create a Node.js stream.Readable from an array of items for usage in tests.
 */
function createReadableStream<T>(items: T[]): Readable {
  const source = items.concat();
  return new Readable({
    objectMode: true,
    encoding: undefined,
    read() {
      const item = source.shift();
      if (item !== undefined) {
        this.push(item);
        return;
      }
      this.push(null);
    },
  });
}

/**
 * Create a Node.js stream.Writable from an array of items for usage in tests.
 */
function createWritableStream<T>() {
  const sink: T[] = [];
  let err: Error | null = null;
  const w = new Writable({
    decodeStrings: false,
    objectMode: true,
    defaultEncoding: undefined,
    write(
      chunk: unknown,
      encoding: BufferEncoding,
      callback: (error?: Error | null) => void
    ) {
      sink.push(chunk as T);
      callback(null);
    },
    destroy(error: Error | null, callback: (error: Error | null) => void) {
      err = error;
      callback(error);
    },
  });
  return Object.assign(w, {
    getWrittenItems(): T[] {
      if (err !== null) {
        throw err;
      }
      return sink;
    },
  });
}
