// Copyright 2021-2025 The Connect Authors
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

import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { compressedFlag } from "./compression.js";
import type { Compression } from "./compression.js";
import { assertReadMaxBytes } from "./limit-io.js";

/**
 * Represents an Enveloped-Message of the Connect protocol.
 * https://connectrpc.com/docs/protocol#streaming-rpcs
 *
 * @private Internal code, does not follow semantic versioning.
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

/**
 * Decodes chunks of raw bytes into enveloped messages.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export type EnvelopeDecoder = {
  /**
   * Decode enveloped messages.
   *
   * If the chunk is incomplete, buffer for subsequent calls.
   *
   * If a message exceeds `readMaxBytes`, raise an error. The decoder must be
   * discarded.
   */
  decode(chunk: Uint8Array): EnvelopedMessage[];

  /**
   * Size of the buffer. Use this property to check for incomplete data.
   */
  readonly byteLength: number;

  /**
   * Maximum size for individual messages.
   */
  readonly readMaxBytes: number;
};

/**
 * Create an EnvelopeDecoder. The `readMaxBytes` argument limits the maximum
 * size for individual messages.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createEnvelopeDecoder(readMaxBytes: number): EnvelopeDecoder {
  return new EnvelopeDecoderImpl(readMaxBytes);
}

class EnvelopeDecoderImpl implements EnvelopeDecoder {
  private readonly header: Uint8Array;
  private readonly headerView: DataView;
  private readonly buf: Uint8Array[];
  private env: EnvelopedMessage | undefined;

  constructor(public readonly readMaxBytes: number) {
    // Envelope headers are 5 bytes: 1 byte for flags, 4 bytes message length
    this.header = new Uint8Array(5);
    this.headerView = new DataView(this.header.buffer);
    this.buf = [];
  }

  get byteLength(): number {
    return this.buf.reduce((a, b) => a + b.byteLength, 0);
  }

  decode(chunk: Uint8Array): EnvelopedMessage[] {
    this.buf.push(chunk);
    const envs: EnvelopedMessage[] = [];
    for (;;) {
      let env = this.pop();
      if (!env) {
        break;
      }
      envs.push(env);
    }
    return envs;
  }

  // consume an enveloped message
  pop(): EnvelopedMessage | undefined {
    if (!this.env) {
      this.env = this.head();
      if (!this.env) {
        return undefined;
      }
    }
    if (this.cons(this.env.data)) {
      const env = this.env;
      this.env = undefined;
      return env;
    }
    return undefined;
  }

  // consume header
  head(): EnvelopedMessage | undefined {
    if (!this.cons(this.header)) {
      return undefined;
    }
    const flags = this.headerView.getUint8(0); // first byte is flags
    const length = this.headerView.getUint32(1); // 4 bytes message length
    assertReadMaxBytes(this.readMaxBytes, length, true);
    return {
      flags,
      data: new Uint8Array(length),
    };
  }

  // consume from buffer, fill target
  cons(target: Uint8Array): boolean {
    const wantLength = target.byteLength;
    if (this.byteLength < wantLength) {
      return false;
    }
    let offset = 0;
    while (offset < wantLength) {
      const chunk = this.buf.shift() as Uint8Array; // we check length above
      if (chunk.byteLength > wantLength - offset) {
        target.set(chunk.subarray(0, wantLength - offset), offset);
        this.buf.unshift(chunk.subarray(wantLength - offset));
        offset += wantLength - offset;
      } else {
        target.set(chunk, offset);
        offset += chunk.byteLength;
      }
    }
    return true;
  }
}

/**
 * Create a WHATWG ReadableStream of enveloped messages from a ReadableStream
 * of bytes.
 *
 * Ideally, this would simply be a TransformStream, but ReadableStream.pipeThrough
 * does not have the necessary availability at this time.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createEnvelopeReadableStream(
  stream: ReadableStream<Uint8Array>,
): ReadableStream<EnvelopedMessage> {
  let reader: ReadableStreamDefaultReader<Uint8Array>;
  const buffer = createEnvelopeDecoder(0xffffffff);
  return new ReadableStream<EnvelopedMessage>({
    start() {
      reader = stream.getReader();
    },
    async pull(controller): Promise<void> {
      let enqueuedOnce = false;
      while (!enqueuedOnce) {
        const result = await reader.read();
        if (result.done) {
          if (buffer.byteLength > 0) {
            controller.error(
              new ConnectError(
                "protocol error: incomplete envelope",
                Code.InvalidArgument,
              ),
            );
          }
          controller.close();
        } else {
          for (const env of buffer.decode(result.value)) {
            controller.enqueue(env);
            enqueuedOnce = true;
          }
        }
      }
    },
  });
}

/**
 * Compress an EnvelopedMessage.
 *
 * Raises Internal if an enveloped message is already compressed.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export async function envelopeCompress(
  envelope: EnvelopedMessage,
  compression: Compression | null,
  compressMinBytes: number,
): Promise<EnvelopedMessage> {
  let { flags, data } = envelope;
  if ((flags & compressedFlag) === compressedFlag) {
    throw new ConnectError(
      "invalid envelope, already compressed",
      Code.Internal,
    );
  }
  if (compression && data.byteLength >= compressMinBytes) {
    data = await compression.compress(data);
    flags = flags | compressedFlag;
  }
  return { data, flags };
}

/**
 * Decompress an EnvelopedMessage.
 *
 * Raises InvalidArgument if an envelope is compressed, but compression is null.
 *
 * Relies on the provided Compression to raise ResourceExhausted if the
 * *decompressed* message size is larger than readMaxBytes. If the envelope is
 * not compressed, readMaxBytes is not honored.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export async function envelopeDecompress(
  envelope: EnvelopedMessage,
  compression: Compression | null,
  readMaxBytes: number,
): Promise<EnvelopedMessage> {
  let { flags, data } = envelope;
  if ((flags & compressedFlag) === compressedFlag) {
    if (!compression) {
      throw new ConnectError(
        "received compressed envelope, but do not know how to decompress",
        Code.Internal,
      );
    }
    data = await compression.decompress(data, readMaxBytes);
    flags = flags ^ compressedFlag;
  }
  return { data, flags };
}

/**
 * Encode a single enveloped message.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function encodeEnvelope(
  flags: number,
  data: Uint8Array,
): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(data.length + 5);
  bytes.set(data, 5);
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  v.setUint8(0, flags); // first byte is flags
  v.setUint32(1, data.length); // 4 bytes message length
  return bytes;
}

/**
 * Encode a set of enveloped messages.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function encodeEnvelopes(
  ...envelopes: EnvelopedMessage[]
): Uint8Array<ArrayBuffer> {
  const len = envelopes.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.data.length + 5,
    0,
  );
  const bytes = new Uint8Array(len);
  const v = new DataView(bytes.buffer);
  let offset = 0;
  for (const e of envelopes) {
    v.setUint8(offset, e.flags); // first byte is flags
    v.setUint32(offset + 1, e.data.length); // 4 bytes message length
    bytes.set(e.data, offset + 5);
    offset += e.data.length + 5;
  }
  return bytes;
}
