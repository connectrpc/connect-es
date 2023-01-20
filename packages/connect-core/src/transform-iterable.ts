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
 */
export type AsyncIterableTransform<I, O = I> = (
  data: AsyncIterable<I>,
  options?: PipeOptions
) => AsyncIterable<O>;

/**
 * A function that takes an asynchronous iterable as an input and consumes it
 * to the end, optionally returning a cumulative value.
 */
export type AsyncIterableSink<T, R = void> = (
  iterable: AsyncIterable<T>
) => Promise<R>;

interface PipeOptions {
  signal?: AbortSignal;
}

/**
 * Takes an asynchronous iterable as an input, and passes it to a sink.
 */
export function pipeTo<T1, T2>(
  iterable: AsyncIterable<T1>,
  sink: AsyncIterableSink<T1, T2>,
  options?: PipeOptions
): Promise<T2>;
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3>(
  iterable: AsyncIterable<T1>,
  transform: AsyncIterableTransform<T1, T2>,
  sink: AsyncIterableSink<T2, T3>,
  options?: PipeOptions
): Promise<T3>;
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  sink: AsyncIterableSink<T3, T4>,
  options?: PipeOptions
): Promise<T4>;
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4, T5>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  sink: AsyncIterableSink<T4, T5>,
  options?: PipeOptions
): Promise<T5>;
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4, T5, T6>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  sink: AsyncIterableSink<T5, T6>,
  options?: PipeOptions
): Promise<T6>;
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4, T5, T6, T7>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  sink: AsyncIterableSink<T6, T7>,
  options?: PipeOptions
): Promise<T7>;
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4, T5, T6, T7, T8>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  sink: AsyncIterableSink<T7, T8>,
  options?: PipeOptions
): Promise<T8>;
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  sink: AsyncIterableSink<T8, T9>,
  options?: PipeOptions
): Promise<T9>;
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  transform8: AsyncIterableTransform<T8, T9>,
  sink: AsyncIterableSink<T9, T10>,
  options?: PipeOptions
): Promise<T10>;
// prettier-ignore
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  transform8: AsyncIterableTransform<T8, T9>,
  transform9: AsyncIterableTransform<T9, T10>,
  sink: AsyncIterableSink<T10, T11>,
  options?: PipeOptions
): Promise<T11>;
// prettier-ignore
/**
 * Takes an asynchronous iterable as an input, applies transformations, and
 * passes it to a sink.
 */
export function pipeTo<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  transform8: AsyncIterableTransform<T8, T9>,
  transform9: AsyncIterableTransform<T9, T10>,
  transform10: AsyncIterableTransform<T10, T11>,
  sink: AsyncIterableSink<T11, T12>,
  options?: PipeOptions
): Promise<T12>;
export function pipeTo(
  iterable: AsyncIterable<unknown>,
  ...rest: unknown[]
): Promise<unknown> {
  let opt: PipeOptions | undefined;
  if (typeof rest[rest.length - 1] != "function") {
    opt = rest.pop() as PipeOptions;
  }
  const sink = rest.pop() as AsyncIterableSink<unknown>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const it = transformAsyncIterable(iterable, ...rest, opt);
  return sink(it);
}

/**
 * Creates an AsyncIterableSink that concatenates all elements from the input.
 */
export function sinkAll<T>(): AsyncIterableSink<T, T[]> {
  return async function (iterable: AsyncIterable<T>) {
    const all: T[] = [];
    for await (const chunk of iterable) {
      all.push(chunk);
    }
    return all;
  };
}

/**
 * Creates an AsyncIterableSink that concatenates all chunks from the input into
 * a single Uint8Array.
 */
export function sinkAllBytes(
  readMaxBytes: number,
  lengthHint?: number | string | null
): AsyncIterableSink<Uint8Array, Uint8Array> {
  return async function (iterable: AsyncIterable<Uint8Array>) {
    return await readAllBytes(iterable, readMaxBytes, lengthHint);
  };
}

/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2>(
  iterable: AsyncIterable<T1>,
  transform: AsyncIterableTransform<T1, T2>,
  options?: PipeOptions
): AsyncIterable<T2>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  options?: PipeOptions
): AsyncIterable<T3>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  options?: PipeOptions
): AsyncIterable<T4>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  options?: PipeOptions
): AsyncIterable<T5>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  options?: PipeOptions
): AsyncIterable<T6>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  options?: PipeOptions
): AsyncIterable<T7>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  options?: PipeOptions
): AsyncIterable<T8>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  transform8: AsyncIterableTransform<T8, T9>,
  options?: PipeOptions
): AsyncIterable<T9>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  transform8: AsyncIterableTransform<T8, T9>,
  transform9: AsyncIterableTransform<T9, T10>,
  options?: PipeOptions
): AsyncIterable<T10>;
// prettier-ignore
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  transform8: AsyncIterableTransform<T8, T9>,
  transform9: AsyncIterableTransform<T9, T10>,
  transform10: AsyncIterableTransform<T10, T11>,
  options?: PipeOptions
): AsyncIterable<T11>;
// prettier-ignore
/**
 * Apply one or more transformations to an asynchronous iterable.
 */
export function transformAsyncIterable<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  transform5: AsyncIterableTransform<T5, T6>,
  transform6: AsyncIterableTransform<T6, T7>,
  transform7: AsyncIterableTransform<T7, T8>,
  transform8: AsyncIterableTransform<T8, T9>,
  transform9: AsyncIterableTransform<T9, T10>,
  transform10: AsyncIterableTransform<T10, T11>,
  transform11: AsyncIterableTransform<T11, T12>,
  options?: PipeOptions
): AsyncIterable<T12>;
export async function* transformAsyncIterable<I, O>(
  iterable: AsyncIterable<I>,
  ...rest: (AsyncIterableTransform<unknown> | PipeOptions | undefined)[]
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
  rest: (AsyncIterableTransform<unknown> | PipeOptions | undefined)[]
): [AsyncIterableTransform<unknown>[], PipeOptions | undefined] {
  let opt: PipeOptions | undefined;
  if (typeof rest[rest.length - 1] != "function") {
    opt = rest.pop() as PipeOptions;
  }
  return [rest as AsyncIterableTransform<unknown>[], opt];
}

/**
 * Creates an AsyncIterableTransform that catches any error in the source, and
 * passes it to the given catchError function.
 *
 * The value returned from the catchError function is yielded as the last
 * element in the transformed iterable.
 *
 * If the function returns undefined, no element is yielded.
 */
export function transformCatch<T>(
  catchError: TransformCatchErrorFn<T>
): AsyncIterableTransform<T> {
  return async function* (iterable) {
    try {
      for await (const chunk of iterable) {
        yield chunk;
      }
    } catch (e) {
      const caught = await catchError(e);
      if (caught !== undefined) {
        yield caught;
      }
    }
  };
}

type TransformCatchErrorFn<C> =
  | ((reason: unknown) => C | undefined)
  | ((reason: unknown) => Promise<C | undefined>);

/**
 * Creates an AsyncIterableTransform that appends a value.
 *
 * The element to append is provided by a function. If the function returns
 * undefined, no element is appended.
 */
export function transformAppend<T>(
  provide: TransformXpendProvide<T>
): AsyncIterableTransform<Awaited<T>> {
  return async function* (iterable) {
    for await (const chunk of iterable) {
      yield chunk;
    }
    const append = await provide();
    if (append !== undefined) {
      yield append;
    }
  };
}

/**
 * Creates an AsyncIterableTransform that prepends an element.
 *
 * The element to prepend is provided by a function. If the function returns
 * undefined, no element is appended.
 */
export function transformPrepend<T>(
  provide: TransformXpendProvide<T>
): AsyncIterableTransform<Awaited<T>> {
  return async function* (iterable) {
    const prepend = await provide();
    if (prepend !== undefined) {
      yield prepend;
    }
    for await (const chunk of iterable) {
      yield chunk;
    }
  };
}

type TransformXpendProvide<T> = T extends undefined
  ? never
  : (() => T | undefined) | (() => Promise<T | undefined>);

/**
 * Creates an AsyncIterableTransform that reads all bytes from the input, and
 * concatenates them to a single Uint8Array.
 *
 * An optional length hint can be provided to optimize allocation. If the
 * length hint is not a positive integer, it is ignored.
 */
export function transformReadAllBytes(
  readMaxBytes: number,
  lengthHint?: number | string | null
): AsyncIterableTransform<Uint8Array> {
  return async function* (iterable) {
    yield await readAllBytes(iterable, readMaxBytes, lengthHint);
  };
}

/**
 * Creates an AsyncIterableTransform that takes a specified type as input,
 * and serializes it as an enveloped messages.
 *
 * Note that this function has an override that lets the input stream
 * distinguish between regular messages, and end-of-stream messages, as used
 * by the RPP-web and Connect protocols.
 */
export function transformSerialize<T>(
  serialization: Serialization<T>
): AsyncIterableTransform<T, EnvelopedMessage>;
/**
 * Creates an AsyncIterableTransform that takes a value or special end type, and
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
): AsyncIterableTransform<ParsedEnvelopedMessage<T, E>, EnvelopedMessage>;
export function transformSerialize<T, E>(
  serialization: Serialization<T>,
  endStreamFlag?: number,
  endSerialization?: Serialization<E>
):
  | AsyncIterableTransform<T, EnvelopedMessage>
  | AsyncIterableTransform<ParsedEnvelopedMessage<T, E>, EnvelopedMessage> {
  if (endStreamFlag === undefined || endSerialization === undefined) {
    return async function* (iterable: AsyncIterable<T>) {
      for await (const chunk of iterable) {
        yield { flags: 0, data: serialization.serialize(chunk) };
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
        data = endSerialization.serialize(chunk.value);
      } else {
        data = serialization.serialize(chunk.value);
      }
      yield { flags, data };
    }
  };
}

/**
 * Creates an AsyncIterableTransform that takes enveloped messages as input,
 * parses the envelope payload and outputs the result.
 *
 * Note that this function has overrides that let the stream distinguish
 * between regular messages, and end-of-stream messages, as used by the
 * gRPP-web and Connect protocols.
 */
export function transformParse<T>(
  serialization: Serialization<T>
): AsyncIterableTransform<EnvelopedMessage, T>;
/**
 * Creates an AsyncIterableTransform that takes enveloped messages as input,
 * parses the envelope payload and outputs the result.
 *
 * Note that this override will look for the given endStreamFlag, and raise
 * and error if it is set.
 */
export function transformParse<T>(
  serialization: Serialization<T>,
  endStreamFlag: number,
  endSerialization: null
): AsyncIterableTransform<EnvelopedMessage, T>;
/**
 * Creates an AsyncIterableTransform that takes an enveloped message as input,
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
): AsyncIterableTransform<EnvelopedMessage, ParsedEnvelopedMessage<T, E>>;
export function transformParse<T, E>(
  serialization: Serialization<T>,
  endStreamFlag?: number,
  endSerialization?: null | Serialization<E>
):
  | AsyncIterableTransform<EnvelopedMessage, T>
  | AsyncIterableTransform<EnvelopedMessage, ParsedEnvelopedMessage<T, E>> {
  // code path always yields ParsedEnvelopedMessage<T, E>
  if (endSerialization && endStreamFlag !== undefined) {
    return async function* (
      iterable: AsyncIterable<EnvelopedMessage>
    ): AsyncIterable<ParsedEnvelopedMessage<T, E>> {
      for await (const { flags, data } of iterable) {
        if ((flags & endStreamFlag) === endStreamFlag) {
          yield { value: endSerialization.parse(data), end: true };
        } else {
          yield { value: serialization.parse(data), end: false };
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
      yield serialization.parse(data);
    }
  };
}

/**
 * Creates an AsyncIterableTransform that takes enveloped messages as input, and
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
): AsyncIterableTransform<EnvelopedMessage, EnvelopedMessage> {
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
 * Creates an AsyncIterableTransform that takes enveloped messages as input, and
 * decompresses them using the given compression.
 *
 * Raises an error if an envelope is compressed, but compression is null.
 */
export function transformDecompress(
  compression: Compression | null,
  readMaxBytes: number
): AsyncIterableTransform<EnvelopedMessage, EnvelopedMessage> {
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
 * Create an AsyncIterableTransform that takes enveloped messages as input and
 * joins them into a stream of raw bytes.
 *
 * The TransformStream raises an error if the payload of an enveloped message
 * is larger than writeMaxBytes.
 */
export function transformJoin(
  writeMaxBytes: number
): AsyncIterableTransform<EnvelopedMessage, Uint8Array> {
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
 * Create an AsyncIterableTransform that takes raw bytes as input and splits them
 * into enveloped messages.
 *
 * The TransformStream raises an error
 * - if the payload of an enveloped message is larger than readMaxBytes,
 * - if the stream ended before an enveloped message fully arrived,
 * - or if the stream ended with extraneous data.
 */
export function transformSplit(
  readMaxBytes: number
): AsyncIterableTransform<Uint8Array, EnvelopedMessage> {
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
    if (buffer.byteLength > 0) {
      throw new ConnectError(
        `protocol error: received ${buffer.byteLength} extra bytes`,
        Code.InvalidArgument
      );
    }
  };
}

async function readAllBytes(
  iterable: AsyncIterable<Uint8Array>,
  readMaxBytes: number,
  lengthHint?: number | string | null
): Promise<Uint8Array> {
  const [ok, hint] = parseLengthHint(lengthHint);
  if (ok) {
    if (hint > readMaxBytes) {
      throw new ConnectError(
        `message size ${hint} is larger than configured readMaxBytes ${readMaxBytes}`,
        Code.ResourceExhausted
      );
    }
    const buffer = new Uint8Array(hint);
    let offset = 0;
    for await (const chunk of iterable) {
      if (offset + chunk.byteLength > hint) {
        throw new ConnectError(
          `protocol error: promised ${hint} bytes, received ${
            offset + chunk.byteLength
          }`,
          Code.InvalidArgument
        );
      }
      buffer.set(chunk, offset);
      offset += chunk.byteLength;
    }
    if (offset < hint) {
      throw new ConnectError(
        `protocol error: promised ${hint} bytes, received ${offset}`,
        Code.InvalidArgument
      );
    }
    return buffer;
  }
  const chunks: Uint8Array[] = [];
  let count = 0;
  for await (const chunk of iterable) {
    count += chunk.byteLength;
    if (count > readMaxBytes) {
      throw new ConnectError(
        `message size is larger than configured readMaxBytes ${readMaxBytes}`,
        Code.ResourceExhausted
      );
    }
    chunks.push(chunk);
  }
  const all = new Uint8Array(count);
  let offset = 0;
  for (let chunk = chunks.shift(); chunk; chunk = chunks.shift()) {
    all.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return all;
}

function parseLengthHint(
  lengthHint: number | string | null | undefined
): [boolean, number] {
  if (lengthHint === undefined || lengthHint === null) {
    return [false, 0];
  }
  const n =
    typeof lengthHint == "string" ? parseInt(lengthHint, 10) : lengthHint;
  if (!Number.isSafeInteger(n) || n < 0) {
    return [false, n];
  }
  return [true, n];
}
