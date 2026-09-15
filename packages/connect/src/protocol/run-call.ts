// Copyright 2021-2026 The Connect Authors
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

import type {
  DescMessage,
  MessageInitShape,
  MessageShape,
} from "@bufbuild/protobuf";
import type {
  Interceptor,
  StreamRequest,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
} from "../interceptor.js";
import { applyInterceptors } from "../interceptor.js";
import { ConnectError } from "../connect-error.js";
import {
  createDeadlineSignal,
  createLinkedAbortController,
  getAbortSignalReason,
} from "./signals.js";
import { normalize, normalizeIterable } from "./normalize.js";
import { Code } from "../code.js";

/**
 * UnaryFn represents the client-side invocation of a unary RPC - a method
 * that takes a single input message, and responds with a single output
 * message.
 * A Transport implements such a function, and makes it available to
 * interceptors.
 */
type UnaryFn<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> = (req: UnaryRequest<I, O>) => Promise<UnaryResponse<I, O>>;

/**
 * Runs a unary method with the given interceptors. Note that this function
 * is only used when implementing a Transport.
 */
export function runUnaryCall<
  I extends DescMessage,
  O extends DescMessage,
>(opt: {
  req: Omit<UnaryRequest<I, O>, "signal" | "message"> & {
    message: MessageInitShape<I>;
  };
  next: UnaryFn<I, O>;
  timeoutMs?: number;
  signal?: AbortSignal;
  interceptors?: Interceptor[];
}): Promise<UnaryResponse<I, O>> {
  const next = applyInterceptors(opt.next, opt.interceptors);
  const [signal, abort, done] = setupSignal(opt);
  const req = {
    ...opt.req,
    message: normalize(opt.req.method.input, opt.req.message),
    signal,
  };
  return next(req).then((res) => {
    done();
    return res;
  }, abort);
}

/**
 * StreamingFn represents the client-side invocation of a streaming RPC - a
 * method that takes zero or more input messages, and responds with zero or
 * more output messages.
 * A Transport implements such a function, and makes it available to
 * interceptors.
 */
type StreamingFn<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> = (req: StreamRequest<I, O>) => Promise<StreamResponse<I, O>>;

/**
 * Runs a server-streaming method with the given interceptors. Note that this
 * function is only used when implementing a Transport.
 */
export async function runStreamingCall<
  I extends DescMessage,
  O extends DescMessage,
>(opt: {
  req: Omit<StreamRequest<I, O>, "signal" | "message"> & {
    message: AsyncIterable<MessageInitShape<I>>;
  };
  next: StreamingFn<I, O>;
  timeoutMs?: number;
  signal?: AbortSignal;
  interceptors?: Interceptor[];
}): Promise<StreamResponse<I, O>> {
  const request = opt.req.message[Symbol.asyncIterator]();
  let requestReturned: Promise<IteratorResult<MessageInitShape<I>>> | undefined;
  let requestThrown: Promise<IteratorResult<MessageInitShape<I>>> | undefined;
  const requestIterator: Required<AsyncIterator<MessageInitShape<I>>> = {
    next: () => request.next(),
    return(value) {
      requestReturned ??= new Promise((resolve) =>
        resolve(request.return?.(value) ?? { done: true, value }),
      );
      return requestReturned;
    },
    throw(reason) {
      requestThrown ??= new Promise((resolve) =>
        resolve(request.throw?.(reason) ?? { done: true, value: undefined }),
      );
      return requestThrown;
    },
  };
  const [signal, abort, done] = setupSignal(opt);
  let state: "open" | "done" | "returned" | ConnectError = "open";
  let pendingReads = 0;
  let responseIterator: AsyncIterator<MessageShape<O>> | undefined;
  let closing: Promise<void> | undefined;

  function closeResponse(): Promise<void> {
    const it = responseIterator;
    if (it === undefined) {
      return Promise.resolve();
    }
    closing ??= Promise.resolve()
      .then(async () => {
        try {
          while ((await it.next()).done !== true) {
            // Discard buffered interceptor output to reach the closed source.
          }
        } finally {
          await it.return?.();
        }
      })
      .catch(() => {
        // Cleanup must not replace the terminal RPC error.
      });
    return closing;
  }

  function fail(reason: unknown): ConnectError {
    // Completion aborts the transport signal, but does not cancel queued reads.
    if (state === "done" || state === "returned") {
      return ConnectError.from(reason);
    }
    if (state instanceof ConnectError) {
      return state;
    }
    const error = signal.aborted
      ? ConnectError.from(getAbortSignalReason(signal), Code.Canceled)
      : ConnectError.from(reason);
    state = error;
    signal.removeEventListener("abort", onAbort);
    // Interrupt pending reads before waiting for iterator cleanup.
    void abort(error).catch(() => {});
    void requestIterator.throw(error).catch(() => {});
    void requestIterator.return().catch(() => {});
    void closeResponse();
    return error;
  }

  function onAbort() {
    fail(getAbortSignalReason(signal));
  }

  function checkSignal() {
    if (state !== "done" && state !== "returned" && signal.aborted) {
      throw fail(getAbortSignalReason(signal));
    }
    return state;
  }

  const req = {
    ...opt.req,
    message: normalizeIterable(opt.req.method.input, {
      [Symbol.asyncIterator]: () => requestIterator,
    }),
    signal,
  };
  signal.addEventListener("abort", onAbort);
  try {
    checkSignal();
    const next = applyInterceptors<StreamingFn<I, O>>(async (req) => {
      try {
        checkSignal();
        const res = await opt.next(req);
        return {
          ...res,
          message: (async function* () {
            const it = res.message[Symbol.asyncIterator]();
            let pendingSourceError: ConnectError | undefined;
            try {
              for (;;) {
                if (checkSignal() === "returned") {
                  return;
                }
                const result = await it.next();
                if (checkSignal() === "returned") {
                  return;
                }
                if (result.done === true) {
                  return;
                }
                yield result.value;
              }
            } catch (reason) {
              if (state !== "returned") {
                checkSignal();
                pendingSourceError = ConnectError.from(reason);
                throw pendingSourceError;
              }
            } finally {
              await Promise.resolve()
                .then(() => it.return?.())
                .catch((reason) => {
                  if (state !== "returned") {
                    checkSignal();
                    throw pendingSourceError ?? ConnectError.from(reason);
                  }
                });
            }
          })(),
        };
      } catch (reason) {
        // Interceptors may retry or recover ordinary transport errors.
        checkSignal();
        throw ConnectError.from(reason);
      }
    }, opt.interceptors);
    const res = await next(req);
    const it = res.message[Symbol.asyncIterator]();
    responseIterator = it;
    if (signal.aborted) {
      await closeResponse();
      checkSignal();
    }
    const iterator: AsyncIterator<MessageShape<O>> = {
      async next() {
        if (state instanceof ConnectError) {
          throw state;
        }
        if (state === "done" || state === "returned") {
          return { done: true, value: undefined };
        }
        pendingReads++;
        try {
          const result = await it.next();
          checkSignal();
          if (result.done === true && state === "open") {
            state = "done";
            signal.removeEventListener("abort", onAbort);
            done();
            void requestIterator.return().catch(() => {});
          }
          return result;
        } catch (reason) {
          throw fail(reason);
        } finally {
          pendingReads--;
        }
      },
      async return(value) {
        if (state === "open") {
          if (pendingReads === 0) {
            state = "returned";
            signal.removeEventListener("abort", onAbort);
            done();
            void requestIterator.return().catch(() => {});
          } else {
            fail(new ConnectError("the operation was canceled", Code.Canceled));
          }
        }
        if (state !== "done") {
          await closeResponse();
        }
        return { done: true, value };
      },
      async throw(reason) {
        if (state === "done" || state === "returned") {
          throw ConnectError.from(reason);
        }
        const error = fail(reason);
        await closeResponse();
        throw error;
      },
    };
    return {
      ...res,
      message: { [Symbol.asyncIterator]: () => iterator },
    };
  } catch (reason) {
    throw fail(reason);
  }
}

/**
 * Create an AbortSignal for Transport implementations. The signal is available
 * in UnaryRequest and StreamingRequest, and is triggered when the call is
 * aborted (via a timeout or explicit cancellation), errored (e.g. when reading
 * an error from the server from the wire), or finished successfully.
 *
 * Transport implementations can pass the signal to HTTP clients to ensure that
 * there are no unused connections leak.
 *
 * Returns a tuple:
 * [0]: The signal, which is also aborted if the optional deadline is reached.
 * [1]: Function to call if the Transport encountered an error.
 * [2]: Function to call if the Transport finished without an error.
 */
function setupSignal(opt: {
  timeoutMs?: number;
  signal?: AbortSignal;
}): [AbortSignal, (reason: unknown) => Promise<never>, () => void] {
  const { signal, cleanup } = createDeadlineSignal(opt.timeoutMs);
  const controller = createLinkedAbortController(opt.signal, signal);
  return [
    controller.signal,
    function abort(reason: unknown): Promise<never> {
      // We peek at the signal because fetch() will throw an error on abort
      // that discards the signal reason.
      const e = controller.signal.aborted
        ? ConnectError.from(
            getAbortSignalReason(controller.signal),
            Code.Canceled,
          )
        : ConnectError.from(reason);
      controller.abort(e);
      cleanup();
      return Promise.reject(e);
    },
    function done() {
      cleanup();
      controller.abort();
    },
  ];
}
