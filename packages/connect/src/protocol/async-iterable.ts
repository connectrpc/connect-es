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

import type { Message, MessageType, PartialMessage } from "@bufbuild/protobuf";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import type { EnvelopedMessage } from "./envelope.js";
import {
  encodeEnvelope,
  envelopeCompress,
  envelopeDecompress,
} from "./envelope.js";
import type { Serialization } from "./serialization.js";
import type { Compression } from "./compression.js";
import { assertReadMaxBytes } from "./limit-io.js";

/**
 * A function that takes an asynchronous iterable as a source, and returns a
 * transformed asynchronous iterable.
 *
 * The following function is a simple no-op implementation that yields every
 * element from the source:
 *
 * ```ts
 * async function* t<T>(input) {
 *   yield* input;
 * }
 * ```
 *
 * The following function takes fetch responses as a source, and yields the
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
 * Transformation functions can be passed to pipe() and pipeTo().
 *
 * @private Internal code, does not follow semantic versioning.
 */
export type AsyncIterableTransform<I, O = I> = (
  data: AsyncIterable<I>
) => AsyncIterable<O>;

/**
 * A function that takes an asynchronous iterable as a source and consumes it
 * to the end, optionally returning a cumulative value.
 *
 * Sinks are the used with pipeTo().
 *
 * @private Internal code, does not follow semantic versioning.
 */
export type AsyncIterableSink<T, R = void> = (
  iterable: AsyncIterable<T>
) => Promise<R>;

/**
 * Options for pipe() and pipeTo().
 *
 * @private Internal code, does not follow semantic versioning.
 */
interface PipeOptions {
  /**
   * Set to true to abort the source iterable on downstream errors.
   * The source iterable must not swallow errors raised by yield.
   *
   * Why? If iterators are chained, any error raised by the source or any
   * transform travels down the stream. But if an error happens downstream, the
   * source and transformations are left dangling:
   *
   * ```ts
   * async function source*() {
   *   const conn = await dbConn();
   *   yield await conn.query("SELECT 1"); // consumed downstream
   *   yield await conn.query("SELECT 2"); // never consumed
   *   conn.close(); // never runs
   * }
   * for await (const element of source()) {
   *   // let's say we try to write the element to disk, but the disk is full
   *   throw "err";
   * }
   * ```
   *
   * If this option is set to true, an error raised by the sink function given
   * to pipeTo() will raise the same error in the source iterable.
   *
   * ```ts
   * async function source*() {
   *   const conn = await dbConn();
   *   try {
   *     yield await conn.query("SELECT 1"); // consumed downstream
   *     yield await conn.query("SELECT 2"); // never consumed
   *   } finally {
   *     conn.close(); // runs!
   *   }
   * }
   * await pipeTo(source(), async iterable => {
   *   for await (const element of source()) {
   *     // let's say we try to write the element to disk, but the disk is full
   *     throw "err";
   *   }
   * }, { propagateDownStreamError: true });
   * ```
   *
   * If this option is set to true with pipe(), the downstream consumer of the
   * iterable returned by pipe() can abort the source iterable by calling throw()
   * on the iterator.
   */
  propagateDownStreamError?: boolean;
}

/**
 * ParsedEnvelopedMessage is the deserialized counterpart to an
 * EnvelopedMessage.
 *
 * It is either a deserialized message M, or a deserialized end-of-stream
 * message E, typically distinguished by a flag on an enveloped message.
 *
 * @private Internal code, does not follow semantic versioning.
 */
type ParsedEnvelopedMessage<M, E> =
  | { end: false; value: M }
  | { end: true; value: E };

/**
 * Takes an asynchronous iterable as a source, and passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipeTo<T1, T2>(
  iterable: AsyncIterable<T1>,
  sink: AsyncIterableSink<T1, T2>,
  options?: PipeOptions
): Promise<T2>;
/**
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipeTo<T1, T2, T3>(
  iterable: AsyncIterable<T1>,
  transform: AsyncIterableTransform<T1, T2>,
  sink: AsyncIterableSink<T2, T3>,
  options?: PipeOptions
): Promise<T3>;
/**
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipeTo<T1, T2, T3, T4>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  sink: AsyncIterableSink<T3, T4>,
  options?: PipeOptions
): Promise<T4>;
/**
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
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
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
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
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
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
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
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
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
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
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
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
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
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
 * Takes an asynchronous iterable as a source, applies transformations, and
 * passes it to a sink.
 *
 * @private Internal code, does not follow semantic versioning.
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
  source: AsyncIterable<unknown>,
  ...rest: unknown[]
): Promise<unknown> {
  const [transforms, sink, opt] = pickTransformsAndSink(rest);

  let iterable = source;
  let abortable: Abortable | undefined;
  if (opt?.propagateDownStreamError === true) {
    iterable = abortable = makeIterableAbortable(iterable);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  iterable = pipe(iterable, ...transforms, { propagateDownStreamError: false });

  return sink(iterable).catch((reason) => {
    if (abortable) {
      return abortable.abort(reason).then(() => Promise.reject(reason));
    }
    return Promise.reject(reason);
  });
}

// pick transforms, the sink, and options from the pipeTo() rest parameter
function pickTransformsAndSink(
  rest: unknown[]
): [
  AsyncIterableTransform<unknown>[],
  AsyncIterableSink<unknown>,
  PipeOptions | undefined
] {
  let opt: PipeOptions | undefined;
  if (typeof rest[rest.length - 1] != "function") {
    opt = rest.pop() as PipeOptions;
  }
  const sink = rest.pop() as AsyncIterableSink<unknown>;
  return [rest as AsyncIterableTransform<unknown>[], sink, opt];
}

/**
 * Creates an AsyncIterableSink that concatenates all elements from the input.
 *
 * @private Internal code, does not follow semantic versioning.
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
 *
 * The iterable raises an error if the more than readMaxBytes are read.
 *
 * An optional length hint can be provided to optimize allocation and validation.
 * If more or less bytes are present in the source that the length hint indicates,
 * and error is raised.
 * If the length hint is larger than readMaxBytes, an error is raised.
 * If the length hint is not a positive integer, it is ignored.
 *
 * @private Internal code, does not follow semantic versioning.
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
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2>(
  iterable: AsyncIterable<T1>,
  transform: AsyncIterableTransform<T1, T2>,
  options?: PipeOptions
): AsyncIterable<T2>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  options?: PipeOptions
): AsyncIterable<T3>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  options?: PipeOptions
): AsyncIterable<T4>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4, T5>(
  iterable: AsyncIterable<T1>,
  transform1: AsyncIterableTransform<T1, T2>,
  transform2: AsyncIterableTransform<T2, T3>,
  transform3: AsyncIterableTransform<T3, T4>,
  transform4: AsyncIterableTransform<T4, T5>,
  options?: PipeOptions
): AsyncIterable<T5>;
/**
 * Apply one or more transformations to an asynchronous iterable.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4, T5, T6>(
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
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4, T5, T6, T7>(
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
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8>(
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
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
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
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
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
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
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
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
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
export async function* pipe<I, O>(
  source: AsyncIterable<I>,
  ...rest: (AsyncIterableTransform<unknown> | PipeOptions | undefined)[]
): AsyncIterable<O> {
  const [transforms, opt] = pickTransforms(rest);
  let abortable: Abortable | undefined;
  let iterable: AsyncIterable<unknown> = source;
  if (opt?.propagateDownStreamError === true) {
    iterable = abortable = makeIterableAbortable(iterable);
  }
  for (const t of transforms) {
    iterable = t(iterable);
  }
  const it = iterable[Symbol.asyncIterator]();
  for (;;) {
    const r = await it.next();
    if (r.done === true) {
      break;
    }
    if (!abortable) {
      yield r.value as O;
      continue;
    }
    try {
      yield r.value as O;
    } catch (e) {
      await abortable.abort(e); // propagate downstream error to the source
      throw e;
    }
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
 * Creates an AsyncIterableTransform that catches any error from the input, and
 * passes it to the given catchError function.
 *
 * The catchError function may return a final value.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformCatch<T>(
  catchError: TransformCatchErrorFn<T>
): AsyncIterableTransform<T> {
  return async function* (iterable) {
    // we deliberate avoid a for-await loop because we only want to catch upstream
    // errors, not downstream errors (yield).
    const it = iterable[Symbol.asyncIterator]();
    for (;;) {
      let r: IteratorResult<T>;
      try {
        r = await it.next();
      } catch (e) {
        const caught = await catchError(e);
        if (caught !== undefined) {
          yield caught;
        }
        break;
      }
      if (r.done === true) {
        break;
      }
      yield r.value;
    }
  };
}

type TransformCatchErrorFn<C> =
  | ((reason: unknown) => void)
  | ((reason: unknown) => C | undefined)
  | ((reason: unknown) => Promise<C | undefined>);

/**
 * Creates an AsyncIterableTransform that catches any error from the input, and
 * passes it to the given function. Unlike transformCatch(), the given function
 * is also called when no error is raised.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformCatchFinally<T>(
  catchFinally: TransformCatchFinallyFn<T>
): AsyncIterableTransform<T> {
  return async function* (iterable) {
    // we deliberate avoid a for-await loop because we only want to catch upstream
    // errors, not downstream errors (yield).
    let err: unknown | undefined;
    const it = iterable[Symbol.asyncIterator]();
    for (;;) {
      let r: IteratorResult<T>;
      try {
        r = await it.next();
      } catch (e) {
        err = e;
        break;
      }
      if (r.done === true) {
        break;
      }
      yield r.value;
    }
    const caught = await catchFinally(err);
    if (caught !== undefined) {
      yield caught;
    }
  };
}

type TransformCatchFinallyFn<C> =
  | ((reason: unknown | undefined) => void)
  | ((reason: unknown | undefined) => C | undefined)
  | ((reason: unknown | undefined) => Promise<C | undefined>);

/**
 * Creates an AsyncIterableTransform that appends a value.
 *
 * The element to append is provided by a function. If the function returns
 * undefined, no element is appended.
 *
 * @private Internal code, does not follow semantic versioning.
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
 *
 * @private Internal code, does not follow semantic versioning.
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
 * The iterable raises an error if the more than readMaxBytes are read.
 *
 * An optional length hint can be provided to optimize allocation and validation.
 * If more or less bytes are present in the source that the length hint indicates,
 * and error is raised.
 * If the length hint is larger than readMaxBytes, an error is raised.
 * If the length hint is not a positive integer, it is ignored.
 *
 * @private Internal code, does not follow semantic versioning.
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
 * Creates an AsyncIterableTransform that takes partial protobuf messages of the
 * specified message type as input, and yields full instances.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformNormalizeMessage<T extends Message<T>>(
  messageType: MessageType<T>
): AsyncIterableTransform<T | PartialMessage<T>, T> {
  return async function* (iterable) {
    for await (const chunk of iterable) {
      if (chunk instanceof messageType) {
        yield chunk;
      } else {
        yield new messageType(chunk as PartialMessage<T>);
      }
    }
  };
}

/**
 * Creates an AsyncIterableTransform that takes a specified type as input,
 * and serializes it as an enveloped messages.
 *
 * Note that this function has an override that lets the input stream
 * distinguish between regular messages, and end-of-stream messages, as used
 * by the RPP-web and Connect protocols.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformSerializeEnvelope<T>(
  serialization: Serialization<T>
): AsyncIterableTransform<T, EnvelopedMessage>;
/**
 * Creates an AsyncIterableTransform that takes a value or special end type, and
 * serializes it as an enveloped message.
 *
 * For example, a source with { end: true, value: ... } is serialized using
 * the given endSerialization, and the resulting enveloped message has the
 * given endStreamFlag.
 *
 * A source with { end: false, value: ... } is serialized using the given
 * serialization, and the resulting enveloped message does not have the given
 * endStreamFlag.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformSerializeEnvelope<T, E>(
  serialization: Serialization<T>,
  endStreamFlag: number,
  endSerialization: Serialization<E>
): AsyncIterableTransform<ParsedEnvelopedMessage<T, E>, EnvelopedMessage>;
export function transformSerializeEnvelope<T, E>(
  serialization: Serialization<T>,
  endStreamFlag?: number,
  endSerialization?: Serialization<E>
):
  | AsyncIterableTransform<T, EnvelopedMessage>
  | AsyncIterableTransform<ParsedEnvelopedMessage<T, E>, EnvelopedMessage> {
  if (endStreamFlag === undefined || endSerialization === undefined) {
    return async function* (
      iterable: AsyncIterable<T>
    ): AsyncIterable<EnvelopedMessage> {
      for await (const chunk of iterable) {
        const data = serialization.serialize(chunk);
        yield { flags: 0, data };
      }
    };
  }
  return async function* (
    iterable: AsyncIterable<ParsedEnvelopedMessage<T, E>>
  ): AsyncIterable<EnvelopedMessage> {
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
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformParseEnvelope<T>(
  serialization: Serialization<T>
): AsyncIterableTransform<EnvelopedMessage, T>;
/**
 * Creates an AsyncIterableTransform that takes enveloped messages as input,
 * parses the envelope payload and outputs the result.
 *
 * Note that this override will look for the given endStreamFlag, and silently
 * ignore envelopes with this flag.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformParseEnvelope<T>(
  serialization: Serialization<T>,
  endStreamFlag: number
): AsyncIterableTransform<EnvelopedMessage, T>;
/**
 * Creates an AsyncIterableTransform that takes enveloped messages as input,
 * parses the envelope payload and outputs the result.
 *
 * Note that this override will look for the given endStreamFlag, and raise
 * and error if it is set.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformParseEnvelope<T>(
  serialization: Serialization<T>,
  endStreamFlag: number,
  endSerialization: null
): AsyncIterableTransform<EnvelopedMessage, T>;
/**
 * Creates an AsyncIterableTransform that takes an enveloped message as input,
 * and outputs a ParsedEnvelopedMessage.
 *
 * For example, if the given endStreamFlag is set for a source envelope, its
 * payload is parsed using the given endSerialization, and an object with
 * { end: true, value: ... } is returned.
 *
 * If the endStreamFlag is not set, the payload is parsed using the given
 * serialization, and an object with { end: false, value: ... } is returned.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformParseEnvelope<T, E>(
  serialization: Serialization<T>,
  endStreamFlag: number,
  endSerialization: Serialization<E>
): AsyncIterableTransform<EnvelopedMessage, ParsedEnvelopedMessage<T, E>>;
export function transformParseEnvelope<T, E>(
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
        if (endSerialization === null) {
          throw new ConnectError("unexpected end flag", Code.InvalidArgument);
        }
        // skips end-of-stream envelope
        continue;
      }
      yield serialization.parse(data);
    }
  };
}

/**
 * Creates an AsyncIterableTransform that takes enveloped messages as a source,
 * and compresses them if they are larger than compressMinBytes.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformCompressEnvelope(
  compression: Compression | null,
  compressMinBytes: number
): AsyncIterableTransform<EnvelopedMessage, EnvelopedMessage> {
  return async function* (iterable) {
    for await (const env of iterable) {
      yield await envelopeCompress(env, compression, compressMinBytes);
    }
  };
}

/**
 * Creates an AsyncIterableTransform that takes enveloped messages as a source,
 * and decompresses them using the given compression.
 *
 * The iterable raises an error if the decompressed payload of an enveloped
 * message is larger than readMaxBytes, or if no compression is provided.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformDecompressEnvelope(
  compression: Compression | null,
  readMaxBytes: number
): AsyncIterableTransform<EnvelopedMessage, EnvelopedMessage> {
  return async function* (iterable) {
    for await (const env of iterable) {
      yield await envelopeDecompress(env, compression, readMaxBytes);
    }
  };
}

/**
 * Create an AsyncIterableTransform that takes enveloped messages as a source,
 * and joins them into a stream of raw bytes.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformJoinEnvelopes(): AsyncIterableTransform<
  EnvelopedMessage,
  Uint8Array
> {
  return async function* (iterable) {
    for await (const { flags, data } of iterable) {
      yield encodeEnvelope(flags, data);
    }
  };
}

/**
 * Create an AsyncIterableTransform that takes raw bytes as a source, and splits
 * them into enveloped messages.
 *
 * The iterable raises an error
 * - if the payload of an enveloped message is larger than readMaxBytes,
 * - if the stream ended before an enveloped message fully arrived,
 * - or if the stream ended with extraneous data.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformSplitEnvelope(
  readMaxBytes: number
): AsyncIterableTransform<Uint8Array, EnvelopedMessage> {
  // append chunk to buffer, returning updated buffer
  function append(buffer: Uint8Array, chunk: Uint8Array): Uint8Array {
    const n = new Uint8Array(buffer.byteLength + chunk.byteLength);
    n.set(buffer);
    n.set(chunk, buffer.length);
    return n;
  }

  // tuple 0: envelope, or undefined if incomplete
  // tuple 1: remainder of the buffer
  function shiftEnvelope(
    buffer: Uint8Array,
    header: { length: number; flags: number }
  ): [EnvelopedMessage | undefined, Uint8Array] {
    if (buffer.byteLength < 5 + header.length) {
      return [undefined, buffer];
    }
    return [
      { flags: header.flags, data: buffer.subarray(5, 5 + header.length) },
      buffer.subarray(5 + header.length),
    ];
  }

  // undefined: header is incomplete
  function peekHeader(
    buffer: Uint8Array
  ): { length: number; flags: number } | undefined {
    if (buffer.byteLength < 5) {
      return undefined;
    }
    const view = new DataView(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength
    );
    const length = view.getUint32(1); // 4 bytes message length
    const flags = view.getUint8(0); // first byte is flags
    return { length, flags };
  }

  return async function* (iterable): AsyncIterable<EnvelopedMessage> {
    let buffer = new Uint8Array(0);
    for await (const chunk of iterable) {
      buffer = append(buffer, chunk);
      for (;;) {
        const header = peekHeader(buffer);
        if (!header) {
          break;
        }
        assertReadMaxBytes(readMaxBytes, header.length, true);
        let env: EnvelopedMessage | undefined;
        [env, buffer] = shiftEnvelope(buffer, header);
        if (!env) {
          break;
        }
        yield env;
      }
    }
    if (buffer.byteLength > 0) {
      const header = peekHeader(buffer);
      let message = "protocol error: incomplete envelope";
      if (header) {
        message = `protocol error: promised ${
          header.length
        } bytes in enveloped message, got ${buffer.byteLength - 5} bytes`;
      }
      throw new ConnectError(message, Code.InvalidArgument);
    }
  };
}

/**
 * Reads all bytes from the source, and concatenates them to a single Uint8Array.
 *
 * Raises an error if:
 * - more than readMaxBytes are read
 * - lengthHint is a positive integer, but larger than readMaxBytes
 * - lengthHint is a positive integer, and the source contains more or less bytes
 *   than promised
 *
 * @private Internal code, does not follow semantic versioning.
 */
export async function readAllBytes(
  iterable: AsyncIterable<Uint8Array>,
  readMaxBytes: number,
  lengthHint?: number | string | null
): Promise<Uint8Array> {
  const [ok, hint] = parseLengthHint(lengthHint);
  if (ok) {
    if (hint > readMaxBytes) {
      assertReadMaxBytes(readMaxBytes, hint, true);
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
    assertReadMaxBytes(readMaxBytes, count);
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

// parse the lengthHint argument of readAllBytes()
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

/**
 * Wait for the first element of an iterable without modifying the iterable.
 * This consumes the first element, but pushes it back on the stack.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export async function untilFirst<T>(
  iterable: AsyncIterable<T>
): Promise<AsyncIterable<T>> {
  const it = iterable[Symbol.asyncIterator]();
  let first: IteratorResult<T> | null = await it.next();
  return {
    [Symbol.asyncIterator]() {
      const w: AsyncIterator<T> = {
        async next() {
          if (first !== null) {
            const n = first;
            first = null;
            return n;
          }
          return await it.next();
        },
      };
      if (it.throw !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- can't handle mutated object sensibly
        w.throw = (e: unknown) => it.throw!(e);
      }
      if (it.return !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-explicit-any -- can't handle mutated object sensibly
        w.return = (value?: any) => it.return!(value);
      }
      return w;
    },
  };
}

interface Abortable {
  /**
   * Abort the iterator.
   */
  readonly abort: (reason: unknown) => Promise<AbortState>;
}

type AbortState = "rethrown" | "completed" | "caught";

/**
 * Wrap the given iterable and return an iterable with an abort() method.
 *
 * This function exists purely for convenience. Where one would typically have
 * to access the iterator directly, advance through all elements, and call
 * AsyncIterator.throw() to notify the upstream iterable, this function allows
 * to use convenient for-await loops and still notify the upstream iterable:
 *
 * ```ts
 * const abortable = makeIterableAbortable(iterable);
 * for await (const ele of abortable) {
 *   await abortable.abort("ERR");
 * }
 * ```
 * There are a couple of limitations of this function:
 * - the given async iterable must implement throw
 * - the async iterable cannot be re-use
 * - if source catches errors and yields values for them, they are ignored, and
 *   the source may still dangle
 *
 * There are four possible ways an async function* can handle yield errors:
 * 1. don't catch errors at all - Abortable.abort() will resolve "rethrown"
 * 2. catch errors and rethrow - Abortable.abort() will resolve "rethrown"
 * 3. catch errors and return - Abortable.abort() will resolve "completed"
 * 4. catch errors and yield a value - Abortable.abort() will resolve "caught"
 *
 * Note that catching errors and yielding a value is problematic, and it should
 * be documented that this may leave the source in a dangling state.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function makeIterableAbortable<T>(
  iterable: AsyncIterable<T>
): AsyncIterable<T> & Abortable {
  const innerCandidate = iterable[Symbol.asyncIterator]();
  if (innerCandidate.throw === undefined) {
    throw new Error("AsyncIterable does not implement throw");
  }
  const inner = innerCandidate as Required<AsyncIterator<T>>;
  let aborted: { reason: unknown; state: Promise<AbortState> } | undefined;
  let resultPromise: Promise<IteratorResult<T>> | undefined;
  let it: AsyncIterator<T> = {
    next(): Promise<IteratorResult<T>> {
      resultPromise = inner.next().finally(() => {
        resultPromise = undefined;
      });
      return resultPromise;
    },
    throw(e?: unknown): Promise<IteratorResult<T>> {
      return inner.throw(e);
    },
  };
  if (innerCandidate.return === undefined) {
    it = {
      ...it,
      return(value?: unknown): Promise<IteratorResult<T>> {
        return inner.return(value);
      },
    };
  }
  let used = false;
  return {
    abort(reason: unknown): Promise<AbortState> {
      if (aborted) {
        return aborted.state;
      }
      const f = (): Promise<AbortState> => {
        return inner.throw(reason).then(
          (r) => (r.done === true ? "completed" : "caught"),
          () => "rethrown"
        );
      };
      if (resultPromise) {
        aborted = { reason, state: resultPromise.then(f, f) };
        return aborted.state;
      }
      aborted = { reason, state: f() };
      return aborted.state;
    },
    [Symbol.asyncIterator](): AsyncIterator<T> {
      if (used) {
        throw new Error("AsyncIterable cannot be re-used");
      }
      used = true;
      return it;
    },
  };
}

/**
 * WritableIterable is an AsyncIterable that can be used
 * to supply values imperatively to the consumer of the
 * AsyncIterable.
 */
export interface WritableIterable<T> extends AsyncIterable<T> {
  /**
   * Makes the payload available to the consumer of the
   * iterable.
   */
  write: (payload: T) => Promise<void>;
  /**
   * Closes the writer indicating to its consumer that no further
   * payloads will be received.
   *
   * Any writes that happen after close is called will return an error.
   */
  close: () => void;
}

/**
 * Create a new WritableIterable.
 */
export function createWritableIterable<T>(): WritableIterable<T> {
  // We start with two queues to capture the read and write attempts.
  //
  // The writes and reads each check of their counterpart is
  // already available and either interact/add themselves to the queue.
  const readQueue: ((result: IteratorResult<T, undefined>) => void)[] = [];
  const writeQueue: T[] = [];
  let err: unknown = undefined;
  let nextResolve: () => void;
  let nextReject: (err: unknown) => void;
  let nextPromise = new Promise<void>((resolve, reject) => {
    nextResolve = resolve;
    nextReject = reject;
  });
  let closed = false;
  // drain the readQueue in case of error/writer is closed by sending a
  // done result.
  function drain() {
    for (const next of readQueue.splice(0, readQueue.length)) {
      next({ done: true, value: undefined });
    }
  }
  return {
    close() {
      closed = true;
      drain();
    },
    async write(payload: T) {
      if (closed) {
        throw err ?? new Error("cannot write, WritableIterable already closed");
      }
      const read = readQueue.shift();
      if (read === undefined) {
        // We didn't find a pending read so we add the payload to the write queue.
        writeQueue.push(payload);
      } else {
        // We found a pending read so we respond with the payload.
        read({ done: false, value: payload });
        if (readQueue.length > 0) {
          // If there are more in the read queue we can mark the write as complete.
          // as the error reporting is not guaranteed to be sequential and therefore cannot
          // to linked to a specific write.
          return;
        }
      }
      // We await the next call for as many times as there are items in the queue + 1
      //
      // If there are no items in the write queue that means write happened and we just have
      // to wait for one more call likewise if we are the nth write in the queue we
      // have to wait for n writes to complete and one more.
      const limit = writeQueue.length + 1;
      for (let i = 0; i < limit; i++) {
        await nextPromise;
      }
    },
    [Symbol.asyncIterator](): AsyncIterator<T> {
      return {
        next() {
          // Resolve the nextPromise to indicate
          // pending writes that a read attempt has been made
          // after their write.
          //
          // We also need to reset the promise for future writes.
          nextResolve();
          nextPromise = new Promise<void>((resolve, reject) => {
            nextResolve = resolve;
            nextReject = reject;
          });
          const write = writeQueue.shift();
          if (write !== undefined) {
            // We found a pending write so response with the payload.
            return Promise.resolve({ done: false, value: write });
          }
          if (closed) {
            return Promise.resolve({ done: true, value: undefined });
          }
          // We return a promise immediately that is either resolved/rejected
          // as writes happen.
          let readResolve: (result: IteratorResult<T>) => void;
          const readPromise = new Promise<IteratorResult<T>>(
            (resolve) => (readResolve = resolve)
          );
          readQueue.push(readResolve!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
          return readPromise;
        },
        throw(throwErr: unknown) {
          err = throwErr;
          closed = true;
          writeQueue.splice(0, writeQueue.length);
          // This will reject all pending writes.
          nextReject(err);
          drain();
          return Promise.resolve({ done: true, value: undefined });
        },
        return() {
          closed = true;
          writeQueue.splice(0, writeQueue.length);
          nextResolve(); // Resolve once for the write awaiting confirmation.
          // Reject all future writes.
          nextPromise = Promise.reject(
            new Error("cannot write, consumer called return")
          ).catch(() => {
            // This is needed because there could be no more writes.
          });
          drain();
          return Promise.resolve({ done: true, value: undefined });
        },
      };
    },
  };
}

/**
 * Create an asynchronous iterable from an array.
 *
 * @private Internal code, does not follow semantic versioning.
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function* createAsyncIterable<T>(items: T[]): AsyncIterable<T> {
  yield* items;
}
