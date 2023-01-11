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
  ReadableStream as NodeReadableStream,
  TransformStream as NodeTransformStream,
  WritableStream as NodeWritableStream,
} from "stream/web";

/**
 * Make the WHATWG stream implementation of Node.js v16 available in the global
 * scope.
 */
export function node16WhatwgStreamPolyfill() {
  // node >= v16 has an implementation for WHATWG streams, but doesn't expose
  // them in the global scope, nor globalThis.
  if (typeof globalThis.ReadableStream !== "function") {
    globalThis.ReadableStream =
      NodeReadableStream as unknown as typeof ReadableStream;
  }
  if (typeof globalThis.WritableStream !== "function") {
    globalThis.WritableStream =
      NodeWritableStream as unknown as typeof WritableStream;
  }
  if (typeof globalThis.TransformStream !== "function") {
    globalThis.TransformStream =
      NodeTransformStream as unknown as typeof TransformStream;
  }
}

/**
 * Create a WHATWG ReadableStream from a Uint8Array for usage in tests.
 */
export function createReadableByteStream(
  bytes: Uint8Array,
  chunkSize = 2,
  delay = 5
) {
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

/**
 * Create a WHATWG ReadableStream from an array of items for usage in tests.
 */
export function createReadableStream<T>(
  items: T[],
  delay = 2
): ReadableStream<T> {
  const source = items.concat();
  return new ReadableStream<T>({
    async pull(controller) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const item = source.shift();
      if (item !== undefined) {
        controller.enqueue(item);
        return;
      }
      controller.close();
    },
  });
}

/**
 * Read all items from a WHATWG ReadableStream for usage in tests.
 */
export async function readAll<T>(stream: ReadableStream<T>): Promise<T[]> {
  const reader = stream.getReader();
  const values: T[] = [];
  for (;;) {
    const r = await reader.read();
    if (r.done) {
      break;
    }
    values.push(r.value);
  }
  return values;
}

/**
 * Read all byte chunks from a WHATWG ReadableStream and concatenate them.
 * For usage in tests.
 */
export async function readAllBytes(
  stream: ReadableStream<Uint8Array>
): Promise<Uint8Array> {
  return (await readAll(stream)).reduce((p, c) => {
    const n = new Uint8Array(p.byteLength + c.byteLength);
    n.set(p, 0);
    n.set(c, p.byteLength);
    return n;
  }, new Uint8Array(0));
}
