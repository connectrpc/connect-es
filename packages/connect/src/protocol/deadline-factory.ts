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

import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

/**
 * A function that parses a timeout value, and creates a deadline.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export type ParseDeadlineFn = (timeoutValue: string | null) =>
  | {
      error: ConnectError;
      signal?: undefined;
      cleanup?: undefined;
    }
  | {
      error?: undefined;
      signal: AbortSignal;
      cleanup: () => void;
    };

/**
 * Create a function that parses a timeout value with the given parser function,
 * and creates a deadline.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createDeadlineParser(
  parser: (value: string | null) => number | undefined | ConnectError,
  maxDeadlineDurationMs: number,
  shutdownSignal: AbortSignal | undefined
): ParseDeadlineFn {
  return function parseDeadline(value: string | null) {
    const timeoutMs = parser(value);
    if (timeoutMs instanceof ConnectError) {
      return { error: timeoutMs };
    }
    if (timeoutMs !== undefined) {
      if (timeoutMs > maxDeadlineDurationMs) {
        return {
          error: new ConnectError(
            `timeout ${timeoutMs}ms must be <= ${maxDeadlineDurationMs}ms`,
            Code.InvalidArgument
          ),
        };
      }
    }
    return createDeadlineSignal(timeoutMs, shutdownSignal);
  };
}

/**
 * Create a deadline, a signal for an operation to end. The returned object
 * contains an AbortSignal, but also a cleanup function that must be called
 * once the calling code is no longer interested in the signal.
 *
 * Ideally, we would simply use AbortSignal.timeout(), but it is not widely
 * available yet, and we also want to chain a signal for graceful shutdown.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createDeadlineSignal(
  timeoutMs: number | undefined,
  shutdownSignal: AbortSignal | undefined
): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const cleanups: (() => void)[] = [];
  if (timeoutMs !== undefined) {
    const listener = () => controller.abort(errTimeout());
    if (timeoutMs <= 0) {
      listener();
    } else {
      const timeoutId = setTimeout(listener, timeoutMs);
      cleanups.push(() => clearTimeout(timeoutId));
    }
  }
  if (shutdownSignal) {
    const listener = () => controller.abort(errShutdown(shutdownSignal.reason));
    if (shutdownSignal.aborted) {
      listener();
    } else {
      shutdownSignal.addEventListener("abort", listener);
      cleanups.push(() =>
        shutdownSignal.removeEventListener("abort", listener)
      );
    }
  }
  polyfillThrowIfAborted(controller.signal, shutdownSignal);
  return {
    signal: controller.signal,
    cleanup: () => cleanups.map((fn) => fn()),
  };
}

function errTimeout() {
  return new ConnectError("the operation timed out", Code.DeadlineExceeded);
}

function errShutdown(cause?: unknown) {
  return new ConnectError(
    "going away",
    Code.Unavailable,
    undefined,
    undefined,
    cause
  );
}

// Polyfill missing throwIfAborted for Node.js < 17.3.0.
function polyfillThrowIfAborted(
  signal: AbortSignal,
  shutdownSignal: AbortSignal | undefined
) {
  if ("throwIfAborted" in signal) {
    return;
  }
  const s = signal as AbortSignal;
  s.throwIfAborted = function () {
    if (s.aborted) {
      // AbortSignal.reason was added in Node.js 17.2.0, we cannot rely on it either.
      throw (
        s.reason ??
        (shutdownSignal?.aborted === true ? errShutdown() : errTimeout())
      );
    }
  };
}
