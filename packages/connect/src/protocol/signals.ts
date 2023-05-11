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

  const sa = signals
    .filter((s) => s !== undefined)
    .concat(controller.signal) as AbortSignal[];

  for (const signal of sa) {
    signal.addEventListener("abort", onAbort);
  }

  function onAbort(this: AbortSignal) {
    if (!controller.signal.aborted) {
      controller.abort(getAbortSignalReason(this));
    }
    for (const signal of sa) {
      signal.removeEventListener("abort", onAbort);
    }
  }

  return controller;
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
