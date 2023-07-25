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

/**
 * Takes a partial protobuf messages of the
 * specified message type as input, and yields full instances.
 */
export function normalizeMessage<T extends Message<T>>(
  input: AsyncIterable<PartialMessage<T>>,
  messageType: MessageType<T>
): AsyncIterable<T> {
  function transform(result: IteratorResult<PartialMessage<T>>) {
    if (result.done === true) {
      return result;
    }
    return {
      done: result.done,
      value:
        result.value instanceof messageType
          ? result.value
          : new messageType(result.value),
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const it = input[Symbol.asyncIterator]();
      const res: AsyncIterator<T> = {
        next: () => it.next().then(transform),
      };
      if (it.throw !== undefined) {
        res.throw = (e) => it.throw!(e).then(transform); // eslint-disable-line @typescript-eslint/no-non-null-assertion
      }
      if (it.return !== undefined) {
        res.return = (v) => it.return!(v).then(transform); // eslint-disable-line @typescript-eslint/no-non-null-assertion
      }
      return res;
    },
  };
}
