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

export async function* createAsyncIterableBytes(
  bytes: Uint8Array,
  chunkSize = 2,
  delay = 5
): AsyncIterable<Uint8Array> {
  let offset = 0;
  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    const end = Math.min(offset + chunkSize, bytes.byteLength);
    yield bytes.slice(offset, end);
    offset = end;
    if (offset === bytes.length) {
      break;
    }
  }
}

export async function readAll<T>(it: AsyncIterable<T>): Promise<T[]> {
  const all: T[] = [];
  for await (const item of it) {
    all.push(item);
  }
  return all;
}

export async function readAllBytes(
  it: AsyncIterable<Uint8Array>
): Promise<Uint8Array> {
  return (await readAll(it)).reduce((p, c) => {
    const n = new Uint8Array(p.byteLength + c.byteLength);
    n.set(p, 0);
    n.set(c, p.byteLength);
    return n;
  }, new Uint8Array(0));
}
