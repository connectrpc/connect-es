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

import { Code } from "./code.js";
import { ConnectError } from "./connect-error.js";
import type { EnvelopedMessage } from "./envelope.js";
import type { Serialization } from "./serialization.js";
import { compressedFlag, Compression } from "./compression.js";

/**
 * ParsedEnvelopedMessage is the deserialized counterpart to an
 * EnvelopedMessage.
 *
 * It is either a deserialized message M, or a deserialized end-of-stream
 * message E, typically distinguished by a flag on an enveloped message.
 */
export type ParsedEnvelopedMessage<M, E> =
  | { end: false; value: M }
  | { end: true; value: E };

/**
 * Creates a WHATWG TransformStream that takes a specified type as input,
 * and serializes it as an enveloped messages.
 *
 * Note that this function has an override that lets the input stream
 * distinguish between regular messages, and end-of-stream messages, as used
 * by the RPP-web and Connect protocols.
 */
export function transformSerialize<T>(
  serialization: Serialization<T>
): TransformStream<T, EnvelopedMessage>;
/**
 * Creates a WHATWG TransformStream that takes a value or special end type, and
 * serializes it as an enveloped message.
 *
 * For example, an input with { end: true, value: ... } is serialized using
 * the given endSerialization, and the resulting enveloped message has the
 * given endStreamFlag.
 *
 * An input with { end: false, value: ... } is serialized using the given
 * serialization, and the resulting enveloped message does not have the given
 * endStreamFlag.
 */
export function transformSerialize<T, E>(
  serialization: Serialization<T>,
  endStreamFlag: number,
  endSerialization: Serialization<E>
): TransformStream<ParsedEnvelopedMessage<T, E>, EnvelopedMessage>;
export function transformSerialize<T, E>(
  serialization: Serialization<T>,
  endStreamFlag?: number,
  endSerialization?: Serialization<E>
):
  | TransformStream<T, EnvelopedMessage>
  | TransformStream<ParsedEnvelopedMessage<T, E>, EnvelopedMessage> {
  if (endStreamFlag === undefined || endSerialization === undefined) {
    return new TransformStream<T, EnvelopedMessage>({
      transform(chunk, controller) {
        let value: Uint8Array;
        try {
          value = serialization.serialize(chunk);
        } catch (e) {
          return controller.error(
            new ConnectError(
              "failed to serialize message",
              Code.Internal,
              undefined,
              undefined,
              e
            )
          );
        }
        controller.enqueue({ flags: 0, data: value });
      },
    });
  }
  return new TransformStream<ParsedEnvelopedMessage<T, E>, EnvelopedMessage>({
    transform(chunk, controller) {
      let data: Uint8Array;
      let flags = 0;
      if (chunk.end) {
        flags = flags | endStreamFlag;
        try {
          data = endSerialization.serialize(chunk.value);
        } catch (e) {
          return controller.error(
            new ConnectError(
              "failed to serialize end",
              Code.Internal,
              undefined,
              undefined,
              e
            )
          );
        }
      } else {
        try {
          data = serialization.serialize(chunk.value);
        } catch (e) {
          return controller.error(
            new ConnectError(
              "failed to serialize message",
              Code.Internal,
              undefined,
              undefined,
              e
            )
          );
        }
      }
      controller.enqueue({ flags, data });
    },
  });
}

/**
 * Creates a WHATWG TransformStream that takes enveloped messages as input,
 * parses the envelope payload and outputs the result.
 *
 * Note that this function has overrides that let the stream distinguish
 * between regular messages, and end-of-stream messages, as used by the
 * gRPP-web and Connect protocols.
 */
export function transformParse<T>(
  serialization: Serialization<T>
): TransformStream<EnvelopedMessage, T>;
/**
 * Creates a WHATWG TransformStream that takes an enveloped message as input,
 * and outputs a ParsedEnvelopedMessage.
 *
 * For example, if the given endStreamFlag is set for an input envelope, its
 * payload is parsed using the given endSerialization, and an object with
 * { end: true, value: ... } is returned.
 *
 * If the endStreamFlag is not set, the payload is parsed using the given
 * serialization, and an object with { end: false, value: ... } is returned.
 */
export function transformParse<T>(
  serialization: Serialization<T>,
  endStreamFlag: number,
  endSerialization: null
): TransformStream<EnvelopedMessage, T>;
/**
 * Creates a WHATWG TransformStream that takes an enveloped message as input,
 * and outputs a ParsedEnvelopedMessage.
 *
 * For example, if the given endStreamFlag is set for an input envelope, its
 * payload is parsed using the given endSerialization, and an object with
 * { end: true, value: ... } is returned.
 *
 * If the endStreamFlag is not set, the payload is parsed using the given
 * serialization, and an object with { end: false, value: ... } is returned.
 */
export function transformParse<T, E>(
  serialization: Serialization<T>,
  endStreamFlag: number,
  endSerialization: Serialization<E>
): TransformStream<EnvelopedMessage, ParsedEnvelopedMessage<T, E>>;
export function transformParse<T, E>(
  serialization: Serialization<T>,
  endStreamFlag?: number,
  endSerialization?: null | Serialization<E>
):
  | TransformStream<EnvelopedMessage, T>
  | TransformStream<EnvelopedMessage, ParsedEnvelopedMessage<T, E>> {
  if (endStreamFlag === undefined || endSerialization === undefined) {
    return new TransformStream<EnvelopedMessage, T>({
      transform(chunk, controller) {
        let value: T;
        try {
          value = serialization.parse(chunk.data);
        } catch (e) {
          return controller.error(
            new ConnectError(
              "failed to parse message",
              Code.Internal,
              undefined,
              undefined,
              e
            )
          );
        }
        controller.enqueue(value);
      },
    });
  }
  return new TransformStream<EnvelopedMessage, ParsedEnvelopedMessage<T, E>>({
    transform(chunk, controller) {
      const { flags, data } = chunk;
      if ((flags & endStreamFlag) === endStreamFlag) {
        if (endSerialization === null) {
          return controller.error(
            new ConnectError("unexpected end flag", Code.InvalidArgument)
          );
        }
        let value: E;
        try {
          value = endSerialization.parse(data);
        } catch (e) {
          return controller.error(
            new ConnectError(
              "failed to parse end",
              Code.InvalidArgument,
              undefined,
              undefined,
              e
            )
          );
        }
        return controller.enqueue({ value, end: true });
      }
      let value: T;
      try {
        value = serialization.parse(data);
      } catch (e) {
        return controller.error(
          new ConnectError(
            "failed to parse message",
            Code.InvalidArgument,
            undefined,
            undefined,
            e
          )
        );
      }
      controller.enqueue({ value, end: false });
    },
  });
}

/**
 * Creates a WHATWG TransformStream that takes enveloped messages as input, and
 * compresses them if they are larger than compressMinBytes.
 *
 * An error is raised if an enveloped message is already compressed, or if
 * the compressed payload is larger than writeMaxBytes.
 */
export function transformCompress(
  compression: Compression,
  writeMaxBytes: number,
  compressMinBytes: number
): TransformStream<EnvelopedMessage, EnvelopedMessage> {
  return new TransformStream<EnvelopedMessage, EnvelopedMessage>({
    async transform(chunk, controller) {
      let { flags, data } = chunk;
      if ((flags & compressedFlag) === compressedFlag) {
        return controller.error(
          new ConnectError(
            "invalid envelope, already compressed",
            Code.Internal
          )
        );
      }
      if (data.byteLength < compressMinBytes) {
        return controller.enqueue(chunk);
      }
      data = await compression.compress(data);
      if (data.byteLength > writeMaxBytes) {
        return controller.error(
          new ConnectError(
            `message size ${data.byteLength} is larger than configured writeMaxBytes ${writeMaxBytes}`,
            Code.ResourceExhausted
          )
        );
      }
      flags = flags | compressedFlag;
      controller.enqueue({ data, flags });
    },
  });
}

/**
 * Creates a WHATWG TransformStream that takes enveloped messages as input, and
 * decompresses them using the given compression.
 */
export function transformDecompress(
  compression: Compression,
  readMaxBytes: number
): TransformStream<EnvelopedMessage, EnvelopedMessage> {
  return new TransformStream<EnvelopedMessage, EnvelopedMessage>({
    async transform(chunk, controller) {
      let { flags, data } = chunk;
      if ((flags & compressedFlag) !== compressedFlag) {
        return controller.enqueue(chunk);
      }
      data = await compression.decompress(data, readMaxBytes);
      flags = flags ^ compressedFlag;
      controller.enqueue({ data, flags });
    },
  });
}

/**
 * Create a WHATWG TransformStream that takes enveloped messages as input and
 * joins them into a stream of raw bytes.
 *
 * The TransformStream raises an error if the payload of an enveloped message
 * is larger than writeMaxBytes.
 */
export function transformJoin(
  writeMaxBytes: number
): TransformStream<EnvelopedMessage, Uint8Array> {
  return new TransformStream<EnvelopedMessage, Uint8Array>({
    transform(chunk, controller) {
      const { flags, data } = chunk;
      if (data.byteLength > writeMaxBytes) {
        return controller.error(
          new ConnectError(
            `message size ${data.byteLength} is larger than configured writeMaxBytes ${writeMaxBytes}`,
            Code.ResourceExhausted
          )
        );
      }
      const bytes = new Uint8Array(data.byteLength + 5);
      bytes.set(data, 5);
      const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      v.setUint8(0, flags); // first byte is flags
      v.setUint32(1, data.byteLength); // 4 bytes message length
      controller.enqueue(bytes);
    },
  });
}

/**
 * Create a WHATWG TransformStream that takes raw bytes as input and splits them
 * into enveloped messages.
 *
 * The TransformStream raises an error
 * - if the payload of an enveloped message is larger than readMaxBytes,
 * - if the stream ended before an enveloped message fully arrived,
 * - or if the stream ended with extraneous data.
 */
export function transformSplit(
  readMaxBytes: number
): TransformStream<Uint8Array, EnvelopedMessage> {
  let buffer = new Uint8Array(0);
  let header: { length: number; flags: number } | undefined = undefined;
  return new TransformStream<Uint8Array, EnvelopedMessage>({
    transform(chunk, controller) {
      const g = new Uint8Array(buffer.byteLength + chunk.byteLength);
      g.set(buffer);
      g.set(chunk, buffer.byteLength);
      buffer = g;
      if (buffer.byteLength < 5) {
        return;
      }
      if (!header) {
        const v = new DataView(buffer.buffer, buffer.byteOffset, 5);
        const flags = v.getUint8(0); // first byte is flags
        const length = v.getUint32(1); // 4 bytes message length
        if (length > readMaxBytes) {
          return controller.error(
            new ConnectError(
              `message size ${length} is larger than configured readMaxBytes ${readMaxBytes}`,
              Code.ResourceExhausted
            )
          );
        }
        header = { length, flags };
      }
      if (buffer.byteLength - 5 < header.length) {
        return;
      }
      const data = buffer.subarray(5, 5 + header.length);
      buffer = buffer.subarray(5 + header.length);
      controller.enqueue({ flags: header.flags, data });
      header = undefined;
    },
    flush(controller) {
      if (header) {
        controller.error(
          new ConnectError(
            `protocol error: promised ${header.length} bytes in envelope, got ${
              buffer.byteLength - 5
            }`,
            Code.InvalidArgument
          )
        );
        return;
      }
      if (buffer.byteLength) {
        controller.error(
          new ConnectError(
            `protocol error: received ${buffer.byteLength} extra bytes`,
            Code.DataLoss
          )
        );
        return;
      }
    },
  });
}
