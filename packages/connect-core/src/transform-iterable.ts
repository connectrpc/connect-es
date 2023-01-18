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
import type { EnvelopedMessage, ParsedEnvelopedMessage } from "./envelope.js";
import type { Serialization } from "./serialization.js";
import { compressedFlag, Compression } from "./compression.js";

/**
 * A function that takes an asynchronous iterable as an input, and returns a
 * transformed asynchronous iterable.
 *
 * The following function is a simple implementation that yields the input:
 *
 * ```ts
 * async function* t<T>(input) {
 *   yield* input;
 * }
 * ```
 *
 * The following function takes fetch responses as an input, and yields the
 * text body of each:
 *
 * ```ts
 * async function* t<T>(input: AsyncIterable<Response>): AsyncIterable<string> {
 *   for await (const r of input) {
 *     yield await r.text();
 *   }
 * }
 * ```
 *
 * The function may accept an AbortSignal.
 */
export type AsyncIterableTransformer<I, O = I> = (
  data: AsyncIterable<I>,
  options?: TransformOptions
) => AsyncIterable<O>;

interface TransformOptions {
  signal?: AbortSignal;
}

/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2>(
  iterable: AsyncIterable<T1>,
  transform: AsyncIterableTransformer<T1, T2>,
  options?: TransformOptions
): AsyncIterable<T2>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  options?: TransformOptions
): AsyncIterable<T3>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  options?: TransformOptions
): AsyncIterable<T4>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  transform4: AsyncIterableTransformer<T4, T5>,
  options?: TransformOptions
): AsyncIterable<T5>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  transform4: AsyncIterableTransformer<T4, T5>,
  transform5: AsyncIterableTransformer<T5, T6>,
  options?: TransformOptions
): AsyncIterable<T6>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  transform4: AsyncIterableTransformer<T4, T5>,
  transform5: AsyncIterableTransformer<T5, T6>,
  transform6: AsyncIterableTransformer<T6, T7>,
  options?: TransformOptions
): AsyncIterable<T7>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  transform4: AsyncIterableTransformer<T4, T5>,
  transform5: AsyncIterableTransformer<T5, T6>,
  transform6: AsyncIterableTransformer<T6, T7>,
  transform7: AsyncIterableTransformer<T7, T8>,
  options?: TransformOptions
): AsyncIterable<T8>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  transform4: AsyncIterableTransformer<T4, T5>,
  transform5: AsyncIterableTransformer<T5, T6>,
  transform6: AsyncIterableTransformer<T6, T7>,
  transform7: AsyncIterableTransformer<T7, T8>,
  transform8: AsyncIterableTransformer<T8, T9>,
  options?: TransformOptions
): AsyncIterable<T9>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  transform4: AsyncIterableTransformer<T4, T5>,
  transform5: AsyncIterableTransformer<T5, T6>,
  transform6: AsyncIterableTransformer<T6, T7>,
  transform7: AsyncIterableTransformer<T7, T8>,
  transform8: AsyncIterableTransformer<T8, T9>,
  transform9: AsyncIterableTransformer<T9, T10>,
  options?: TransformOptions
): AsyncIterable<T10>;
// prettier-ignore
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  transform4: AsyncIterableTransformer<T4, T5>,
  transform5: AsyncIterableTransformer<T5, T6>,
  transform6: AsyncIterableTransformer<T6, T7>,
  transform7: AsyncIterableTransformer<T7, T8>,
  transform8: AsyncIterableTransformer<T8, T9>,
  transform9: AsyncIterableTransformer<T9, T10>,
  transform10: AsyncIterableTransformer<T10, T11>,
  options?: TransformOptions
): AsyncIterable<T11>;
// prettier-ignore
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransformer<T1, T2>,
  transform2: AsyncIterableTransformer<T2, T3>,
  transform3: AsyncIterableTransformer<T3, T4>,
  transform4: AsyncIterableTransformer<T4, T5>,
  transform5: AsyncIterableTransformer<T5, T6>,
  transform6: AsyncIterableTransformer<T6, T7>,
  transform7: AsyncIterableTransformer<T7, T8>,
  transform8: AsyncIterableTransformer<T8, T9>,
  transform9: AsyncIterableTransformer<T9, T10>,
  transform10: AsyncIterableTransformer<T10, T11>,
  transform11: AsyncIterableTransformer<T11, T12>,
  options?: TransformOptions
): AsyncIterable<T12>;
export async function* transformAsyncIterable<I, O>(
  iterable: AsyncIterable<I>,
  ...rest: (AsyncIterableTransformer<unknown> | TransformOptions | undefined)[]
): AsyncIterable<O> {
  let it: AsyncIterable<unknown> = iterable;
  const [transforms, opt] = pickTransforms(rest);
  for (const t of transforms) {
    it = t(it, opt);
  }
  opt?.signal?.throwIfAborted();
  for await (const item of it) {
    opt?.signal?.throwIfAborted();
    yield item as O;
  }
}

function pickTransforms(
  rest: (AsyncIterableTransformer<unknown> | TransformOptions | undefined)[]
): [AsyncIterableTransformer<unknown>[], TransformOptions | undefined] {
  let opt: TransformOptions | undefined;
  if (typeof rest[rest.length - 1] != "function") {
    opt = rest.pop() as TransformOptions;
  }
  return [rest as AsyncIterableTransformer<unknown>[], opt];
}

type TransformCatchErrorFn<C> =
  | ((reason: unknown) => C)
  | ((reason: unknown) => Promise<C>);

/**
 * Creates an IterableTransform that catches any error in the source, and
 * replaces it with the value returned from the given catchError function.
 *
 * Once an error is caught, the value returned from catchError is the last
 * value in the transformed iterable.
 */
export function transformCatch<T, C = T>(
  catchError: TransformCatchErrorFn<C>
): AsyncIterableTransformer<T, T | C> {
  return async function* (iterable) {
    try {
      for await (const chunk of iterable) {
        yield chunk;
      }
    } catch (e) {
      yield await catchError(e);
    }
  };
}

/**
 * Creates an IterableTransform that takes a specified type as input,
 * and serializes it as an enveloped messages.
 *
 * Note that this function has an override that lets the input stream
 * distinguish between regular messages, and end-of-stream messages, as used
 * by the RPP-web and Connect protocols.
 */
export function transformSerialize<T>(
  serialization: Serialization<T>
): AsyncIterableTransformer<T, EnvelopedMessage>;
/**
 * Creates an IterableTransform that takes a value or special end type, and
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
): AsyncIterableTransformer<ParsedEnvelopedMessage<T, E>, EnvelopedMessage>;
export function transformSerialize<T, E>(
  serialization: Serialization<T>,
  endStreamFlag?: number,
  endSerialization?: Serialization<E>
):
  | AsyncIterableTransformer<T, EnvelopedMessage>
  | AsyncIterableTransformer<ParsedEnvelopedMessage<T, E>, EnvelopedMessage> {
  if (endStreamFlag === undefined || endSerialization === undefined) {
    return async function* (iterable: AsyncIterable<T>) {
      for await (const chunk of iterable) {
        let data: Uint8Array;
        try {
          data = serialization.serialize(chunk);
        } catch (e) {
          throw new ConnectError(
            "failed to serialize message",
            Code.Internal,
            undefined,
            undefined,
            e
          );
        }
        yield { flags: 0, data };
      }
    };
  }
  return async function* (
    iterable: AsyncIterable<ParsedEnvelopedMessage<T, E>>
  ) {
    for await (const chunk of iterable) {
      let data: Uint8Array;
      let flags = 0;
      if (chunk.end) {
        flags = flags | endStreamFlag;
        try {
          data = endSerialization.serialize(chunk.value);
        } catch (e) {
          throw new ConnectError(
            "failed to serialize end",
            Code.Internal,
            undefined,
            undefined,
            e
          );
        }
      } else {
        try {
          data = serialization.serialize(chunk.value);
        } catch (e) {
          throw new ConnectError(
            "failed to serialize message",
            Code.Internal,
            undefined,
            undefined,
            e
          );
        }
      }
      yield { flags, data };
    }
  };
}

/**
 * Creates an IterableTransform that takes enveloped messages as input,
 * parses the envelope payload and outputs the result.
 *
 * Note that this function has overrides that let the stream distinguish
 * between regular messages, and end-of-stream messages, as used by the
 * gRPP-web and Connect protocols.
 */
export function transformParse<T>(
  serialization: Serialization<T>
): AsyncIterableTransformer<EnvelopedMessage, T>;
/**
 * Creates an IterableTransform that takes enveloped messages as input,
 * parses the envelope payload and outputs the result.
 *
 * Note that this override will look for the given endStreamFlag, and raise
 * and error if it is set.
 */
export function transformParse<T>(
  serialization: Serialization<T>,
  endStreamFlag: number,
  endSerialization: null
): AsyncIterableTransformer<EnvelopedMessage, T>;
/**
 * Creates an IterableTransform that takes an enveloped message as input,
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
): AsyncIterableTransformer<EnvelopedMessage, ParsedEnvelopedMessage<T, E>>;
export function transformParse<T, E>(
  serialization: Serialization<T>,
  endStreamFlag?: number,
  endSerialization?: null | Serialization<E>
):
  | AsyncIterableTransformer<EnvelopedMessage, T>
  | AsyncIterableTransformer<EnvelopedMessage, ParsedEnvelopedMessage<T, E>> {
  // code path always yields ParsedEnvelopedMessage<T, E>
  if (endSerialization && endStreamFlag !== undefined) {
    return async function* (
      iterable: AsyncIterable<EnvelopedMessage>
    ): AsyncIterable<ParsedEnvelopedMessage<T, E>> {
      for await (const { flags, data } of iterable) {
        if ((flags & endStreamFlag) === endStreamFlag) {
          let value: E;
          try {
            value = endSerialization.parse(data);
          } catch (e) {
            throw new ConnectError(
              "failed to parse end",
              Code.InvalidArgument,
              undefined,
              undefined,
              e
            );
          }
          yield { value, end: true };
        } else {
          let value: T;
          try {
            value = serialization.parse(data);
          } catch (e) {
            throw new ConnectError(
              "failed to serialize message",
              Code.Internal,
              undefined,
              undefined,
              e
            );
          }
          yield { value, end: false };
        }
      }
    };
  }
  // code path always yields T
  return async function* (
    iterable: AsyncIterable<EnvelopedMessage>
  ): AsyncIterable<T> {
    for await (const { flags, data } of iterable) {
      if (
        endStreamFlag !== undefined &&
        (flags & endStreamFlag) === endStreamFlag
      ) {
        throw new ConnectError("unexpected end flag", Code.InvalidArgument);
      }
      let value: T;
      try {
        value = serialization.parse(data);
      } catch (e) {
        throw new ConnectError(
          "failed to serialize message",
          Code.Internal,
          undefined,
          undefined,
          e
        );
      }
      yield value;
    }
  };
}

/**
 * Creates an IterableTransform that takes enveloped messages as input, and
 * compresses them if they are larger than compressMinBytes.
 *
 * An error is raised if an enveloped message is already compressed, or if
 * the compressed payload is larger than writeMaxBytes.
 *
 * If compression is null, an error is raised if the uncompressed payload is
 * larger than writeMaxBytes.
 */
export function transformCompress(
  compression: Compression | null,
  writeMaxBytes: number,
  compressMinBytes: number
): AsyncIterableTransformer<EnvelopedMessage, EnvelopedMessage> {
  return async function* (iterable) {
    for await (let { flags, data } of iterable) {
      if ((flags & compressedFlag) === compressedFlag) {
        throw new ConnectError(
          "invalid envelope, already compressed",
          Code.Internal
        );
      }
      if (compression && data.byteLength >= compressMinBytes) {
        data = await compression.compress(data);
        flags = flags | compressedFlag;
      }
      if (data.byteLength > writeMaxBytes) {
        throw new ConnectError(
          `message size ${data.byteLength} is larger than configured writeMaxBytes ${writeMaxBytes}`,
          Code.ResourceExhausted
        );
      }
      yield { data, flags };
    }
  };
}

/**
 * Creates an IterableTransform that takes enveloped messages as input, and
 * decompresses them using the given compression.
 *
 * Raises an error if an envelope is compressed, but compression is null.
 */
export function transformDecompress(
  compression: Compression | null,
  readMaxBytes: number
): AsyncIterableTransformer<EnvelopedMessage, EnvelopedMessage> {
  return async function* (iterable) {
    for await (let { flags, data } of iterable) {
      if ((flags & compressedFlag) !== compressedFlag) {
        yield { flags, data };
        continue;
      }
      if (!compression) {
        throw new ConnectError(
          "received compressed envelope, but do not know how to decompress",
          Code.InvalidArgument
        );
      }
      data = await compression.decompress(data, readMaxBytes);
      flags = flags ^ compressedFlag;
      yield { data, flags };
    }
  };
}

/**
 * Create an IterableTransform that takes enveloped messages as input and
 * joins them into a stream of raw bytes.
 *
 * The TransformStream raises an error if the payload of an enveloped message
 * is larger than writeMaxBytes.
 */
export function transformJoin(
  writeMaxBytes: number
): AsyncIterableTransformer<EnvelopedMessage, Uint8Array> {
  return async function* (iterable) {
    for await (const { flags, data } of iterable) {
      if (data.byteLength > writeMaxBytes) {
        throw new ConnectError(
          `message size ${data.byteLength} is larger than configured writeMaxBytes ${writeMaxBytes}`,
          Code.ResourceExhausted
        );
      }
      const bytes = new Uint8Array(data.byteLength + 5);
      bytes.set(data, 5);
      const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      v.setUint8(0, flags); // first byte is flags
      v.setUint32(1, data.byteLength); // 4 bytes message length
      yield bytes;
    }
  };
}

/**
 * Create an IterableTransform that takes raw bytes as input and splits them
 * into enveloped messages.
 *
 * The TransformStream raises an error
 * - if the payload of an enveloped message is larger than readMaxBytes,
 * - if the stream ended before an enveloped message fully arrived,
 * - or if the stream ended with extraneous data.
 */
export function transformSplit(
  readMaxBytes: number
): AsyncIterableTransformer<Uint8Array, EnvelopedMessage> {
  return async function* (iterable) {
    let buffer = new Uint8Array(0);
    let header: { length: number; flags: number } | undefined = undefined;
    for await (const chunk of iterable) {
      const g = new Uint8Array(buffer.byteLength + chunk.byteLength);
      g.set(buffer);
      g.set(chunk, buffer.byteLength);
      buffer = g;
      if (buffer.byteLength < 5) {
        continue;
      }
      if (header === undefined) {
        const v = new DataView(buffer.buffer, buffer.byteOffset, 5);
        const flags = v.getUint8(0); // first byte is flags
        const length = v.getUint32(1); // 4 bytes message length
        if (length > readMaxBytes) {
          throw new ConnectError(
            `message size ${length} is larger than configured readMaxBytes ${readMaxBytes}`,
            Code.ResourceExhausted
          );
        }
        header = { length, flags };
      }
      if (buffer.byteLength - 5 < header.length) {
        continue;
      }
      const data = buffer.subarray(5, 5 + header.length);
      buffer = buffer.subarray(5 + header.length);
      yield { flags: header.flags, data };
      header = undefined;
    }
    if (header) {
      throw new ConnectError(
        `protocol error: promised ${header.length} bytes in envelope, got ${
          buffer.byteLength - 5
        }`,
        Code.InvalidArgument
      );
    }
    if (buffer.byteLength) {
      throw new ConnectError(
        `protocol error: received ${buffer.byteLength} extra bytes`,
        Code.DataLoss
      );
    }
  };
}
