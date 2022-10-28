// Copyright 2021-2022 Buf Technologies, Inc.
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

import { createEnvelopeReadableStream } from "@bufbuild/connect-web";

// TODO remove this file after connect-web has migrated to connect-core

/**
 * Create a WHATWG ReadableStream from a Uint8Array.
 */
function webReadableStreamFromBytes(
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

function encodeEnvelopes(
  ...messageAndFlags: Array<{ data: Uint8Array; flags?: number }>
): Uint8Array {
  const len = messageAndFlags.reduce((p, c) => p + c.data.length + 5, 0);
  const env = new Uint8Array(len);
  let o = 0;
  for (const { data, flags } of messageAndFlags) {
    env[o] = flags ?? 0; // first byte is flags
    for (let len = data.length, i = 4; i > 0; i--) {
      env[o + i] = len % 256; // 4 bytes message length
      len >>>= 8;
    }
    env.set(data, o + 5);
    o += data.length + 5;
  }
  return env;
}

describe("createEnvelopeReadableStream()", () => {
  it("reads empty stream", async () => {
    const reader = createEnvelopeReadableStream(
      webReadableStreamFromBytes(new Uint8Array(0))
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
      webReadableStreamFromBytes(encodeEnvelopes(...input))
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
            "expected only a single pull on the underlying stream"
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
      webReadableStreamFromBytes(encodeEnvelopes(...input))
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
