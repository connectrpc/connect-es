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

import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";

/**
 * Enveloped-Message
 */
export interface EnvelopedMessage {
  /**
   * Envelope-Flags, a set of 8 bitwise flags.
   */
  flags: number;

  /**
   * Raw data of the message that was enveloped.
   */
  data: Uint8Array;
}

export function encodeEnvelopes(...envelopes: EnvelopedMessage[]): Uint8Array {
  const target = new ArrayBuffer(
    envelopes.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.data.length + 5,
      0
    )
  );
  let offset = 0;
  for (const m of envelopes) {
    offset += encodeEnvelope(m, target, offset);
  }
  return new Uint8Array(target);
}

function encodeEnvelope(
  envelope: EnvelopedMessage,
  target: ArrayBuffer,
  byteOffset: number
): number {
  const len = envelope.data.length + 5;
  const bytes = new Uint8Array(target, byteOffset, len);
  bytes[0] = envelope.flags; // first byte is flags
  for (let l = envelope.data.length, i = 4; i > 0; i--) {
    bytes[i] = l % 256; // 4 bytes message length
    l >>>= 8;
  }
  bytes.set(envelope.data, 5);
  return len;
}

/**
 * Create a ReadableStream of enveloped messages from a ReadableStream of bytes.
 *
 * Ideally, this would simply be a TransformStream, but ReadableStream.pipeThrough
 * does not have the necessary availability at this time.
 */
export function createEnvelopeReadableStream(
  stream: ReadableStream<Uint8Array>
): ReadableStream<EnvelopedMessage> {
  let reader: ReadableStreamDefaultReader<Uint8Array>;
  let buffer = new Uint8Array(0);
  function append(chunk: Uint8Array): void {
    const n = new Uint8Array(buffer.length + chunk.length);
    n.set(buffer);
    n.set(chunk, buffer.length);
    buffer = n;
  }
  return new ReadableStream<EnvelopedMessage>({
    start() {
      reader = stream.getReader();
    },
    async pull(controller): Promise<void> {
      let header: { length: number; flags: number } | undefined = undefined;
      for (;;) {
        if (header === undefined && buffer.byteLength >= 5) {
          let length = 0;
          for (let i = 1; i < 5; i++) {
            length = (length << 8) + buffer[i];
          }
          header = { flags: buffer[0], length };
        }
        const result = await reader.read();
        if (result.done) {
          break;
        }
        append(result.value);
        if (header !== undefined && buffer.byteLength >= header.length + 5) {
          break;
        }
      }
      if (header === undefined) {
        if (buffer.byteLength == 0) {
          controller.close();
          return;
        }
        controller.error(
          new ConnectError("premature end of stream", Code.DataLoss)
        );
        return;
      }
      const data = buffer.subarray(5, 5 + header.length);
      buffer = buffer.subarray(5 + header.length);
      controller.enqueue({
        flags: header.flags,
        data,
      });
    },
  });
}

/**
 * A function that reads one EnvelopedMessage per call from the given stream.
 */
export type EnvelopeReader = () => Promise<EnvelopedMessage | null>;

/**
 * Create a function that reads one EnvelopedMessage per call from the given
 * stream.
 */
export function createEnvelopeReader(
  stream: ReadableStream<Uint8Array>
): EnvelopeReader {
  const reader = stream.getReader();
  let buffer = new Uint8Array(0);
  function append(chunk: Uint8Array): void {
    const n = new Uint8Array(buffer.length + chunk.length);
    n.set(buffer);
    n.set(chunk, buffer.length);
    buffer = n;
  }
  return async function readEnvelopedMessage(): Promise<EnvelopedMessage | null> {
    let header: { length: number; flags: number } | undefined = undefined;
    for (;;) {
      if (header === undefined && buffer.byteLength >= 5) {
        let length = 0;
        for (let i = 1; i < 5; i++) {
          length = (length << 8) + buffer[i];
        }
        header = { flags: buffer[0], length };
      }
      const result = await reader.read();
      if (result.done) {
        break;
      }
      append(result.value);
      if (header !== undefined && buffer.byteLength >= header.length + 5) {
        break;
      }
    }
    if (header === undefined) {
      if (buffer.byteLength == 0) {
        return null;
      }
      throw new ConnectError("premature end of stream", Code.DataLoss);
    }
    const data = buffer.subarray(5, 5 + header.length);
    buffer = buffer.subarray(5 + header.length);
    return {
      flags: header.flags,
      data,
    };
  };
}
