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

/**
 * Creates a queue that buffers pushed items for a single reader.
 */
export function createAsyncQueue<T>(): {
  /**
   * Adds an item, or drops it once the queue has ended.
   */
  push(item: T): void;

  /**
   * Ends the queue once the items it already holds were read.
   */
  end(): void;

  /**
   * Reads the next item in the order they were pushed.
   */
  next(): Promise<IteratorResult<T, undefined>>;
} {
  const items: T[] = [];
  const done: IteratorResult<T, undefined> = { done: true, value: undefined };
  let didEnd = false;
  let wake: ((result: IteratorResult<T, undefined>) => void) | undefined;

  return {
    push(item) {
      if (didEnd) {
        return;
      }
      if (wake !== undefined) {
        wake({ done: false, value: item });
        wake = undefined;
        return;
      }
      items.push(item);
    },
    end() {
      didEnd = true;
      wake?.(done);
    },
    next() {
      if (items.length > 0) {
        return Promise.resolve({ done: false, value: items.shift() as T });
      }
      if (didEnd) {
        return Promise.resolve(done);
      }
      return new Promise((resolve) => {
        wake = resolve;
      });
    },
  };
}
