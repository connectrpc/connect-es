// Copyright 2021-2024 The Connect Authors
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

import { Code, ConnectError } from "@connectrpc/connect";
import type { Compression } from "@connectrpc/connect/protocol";

export const compressionGzip = createCompression("gzip");
export const compressionDeflate = {
  ...createCompression("deflate-raw"),
  name: "deflate",
};

function createCompression(name: CompressionFormat): Compression {
  return {
    name,
    async compress(data: Uint8Array) {
      const stream = new CompressionStream(name);
      await writeAll(stream.writable, data);
      return await readAll(stream.readable, undefined);
    },
    async decompress(bytes, readMaxBytes) {
      if (bytes.length == 0) {
        return new Uint8Array(0);
      }
      const stream = new DecompressionStream(name);
      await writeAll(stream.writable, bytes);
      return await readAll(stream.readable, readMaxBytes);
    },
  };
}

async function writeAll(stream: WritableStream, data: Uint8Array) {
  const writer = stream.getWriter();
  await writer.ready;
  await writer.write(data);
  await writer.ready;
  await writer.close();
}

async function readAll(
  stream: ReadableStream,
  readMaxBytes: number | undefined,
) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const next = await reader.read();
    if (next.value !== undefined) {
      chunks.push(next.value as Uint8Array);
      length += (next.value as Uint8Array).length;
    }
    if (readMaxBytes !== undefined && length > readMaxBytes) {
      throw new ConnectError(
        `message is larger than configured readMaxBytes ${readMaxBytes} after decompression`,
        Code.ResourceExhausted,
      );
    }
    if (next.done) {
      break;
    }
  }
  const out = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}
