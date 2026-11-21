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

import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

type AbortCallback = (signal: AbortSignal) => void;

const signalListeners = new WeakMap<
  AbortSignal,
  {
    callbacks: Set<AbortCallback>;
    onAbort: () => void;
  }
>();

function addAbortListener(signal: AbortSignal, callback: AbortCallback): void {
  let entry = signalListeners.get(signal);
  if (entry === undefined) {
    const callbacks = new Set<AbortCallback>();
    const onAbort = () => {
      signalListeners.delete(signal);
      try {
        for (const cb of callbacks) {
          cb(signal);
        }
      } finally {
        callbacks.clear();
      }
    };
    entry = { callbacks, onAbort };
    signalListeners.set(signal, entry);
    signal.addEventListener("abort", onAbort, { once: true });
  }
  entry.callbacks.add(callback);
}

function removeAbortListener(
  signal: AbortSignal,
  callback: AbortCallback,
): void {
  const entry = signalListeners.get(signal);
  if (entry === undefined) {
    return;
  }
  entry.callbacks.delete(callback);
  if (entry.callbacks.size === 0) {
    signalListeners.delete(signal);
    signal.removeEventListener("abort", entry.onAbort);
  }
}

/**
 * Create an AbortController that is automatically aborted if one of the given
 * signals is aborted.
 *
 * For convenience, the linked AbortSignals can be undefined.
 *
 * If the controller or any of the signals is aborted, all event listeners are
 * removed.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createLinkedAbortController(
  ...signals: (AbortSignal | undefined)[]
): AbortController {
  const controller = new AbortController();

  const inputSignals: AbortSignal[] = [];
  for (const signal of signals) {
    if (signal === undefined) {
      continue;
    }
    if (signal.aborted) {
      controller.abort(getAbortSignalReason(signal));
      return controller;
    }
    inputSignals.push(signal);
  }

  if (inputSignals.length === 0) {
    return controller;
  }

  const onInputAbort: AbortCallback = (signal) => {
    cleanup();
    if (!controller.signal.aborted) {
      controller.abort(getAbortSignalReason(signal));
    }
  };

  const cleanup = () => {
    controller.signal.removeEventListener("abort", cleanup);
    for (const signal of inputSignals) {
      removeAbortListener(signal, onInputAbort);
    }
  };

  controller.signal.addEventListener("abort", cleanup, { once: true });
  for (const signal of inputSignals) {
    addAbortListener(signal, onInputAbort);
  }

  return controller;
}

/**
 * Create a deadline signal. The returned object contains an AbortSignal, but
 * also a cleanup function to stop the timer, which must be called once the
 * calling code is no longer interested in the signal.
 *
 * Ideally, we would simply use AbortSignal.timeout(), but it is not widely
 * available yet.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createDeadlineSignal(timeoutMs: number | undefined): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const listener = () => {
    controller.abort(
      new ConnectError("the operation timed out", Code.DeadlineExceeded),
    );
  };
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  if (timeoutMs !== undefined) {
    if (timeoutMs <= 0) listener();
    else timeoutId = setTimeout(listener, timeoutMs);
  }
  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timeoutId),
  };
}

/**
 * Returns the reason why an AbortSignal was aborted. Returns undefined if the
 * signal has not been aborted.
 *
 * The property AbortSignal.reason is not widely available. This function
 * returns an AbortError if the signal is aborted, but reason is undefined.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function getAbortSignalReason(signal: AbortSignal): unknown {
  if (!signal.aborted) {
    return undefined;
  }
  if (signal.reason !== undefined) {
    return signal.reason;
  }
  // AbortSignal.reason is available in Node.js v16, v18, and later,
  // and in all browsers since early 2022.
  const e = new Error("This operation was aborted");
  e.name = "AbortError";
  return e;
}

/**
 * Settles like the promise, or with onAbort's result if the signal aborts first.
 */
export function raceSignal<T, U>(
  promise: Promise<T>,
  signal: AbortSignal,
  onAbort: () => U | PromiseLike<U>,
): Promise<T | U> {
  return new Promise<T | U>((resolve, reject) => {
    const listener = () => resolve(onAbort());
    if (signal.aborted) {
      listener();
    } else {
      signal.addEventListener("abort", listener);
    }
    promise
      .finally(() => signal.removeEventListener("abort", listener))
      .then(resolve, reject);
  });
}
