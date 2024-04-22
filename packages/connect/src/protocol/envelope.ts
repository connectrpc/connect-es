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

import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { compressedFlag } from "./compression.js";
import type { Compression } from "./compression.js";

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
        if (header !== undefined && buffer.byteLength >= header.length + 5) {
          break;
        }
        const result = await reader.read();
        if (result.done) {
          break;
        }
        append(result.value);
      }
      if (header === undefined) {
        if (buffer.byteLength == 0) {
          controller.close();
          return;
        }
        controller.error(
          new ConnectError("premature end of stream", Code.DataLoss),
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
export function encodeEnvelope(flags: number, data: Uint8Array): Uint8Array {
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
export function encodeEnvelopes(...envelopes: EnvelopedMessage[]): Uint8Array {
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
