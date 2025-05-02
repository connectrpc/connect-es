// Copyright 2021-2025 The Connect Authors
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

import * as zlib from "node:zlib";
import { promisify } from "node:util";
import type { Compression } from "@connectrpc/connect/protocol";
import { Code, ConnectError } from "@connectrpc/connect";
import { getNodeErrorProps } from "./node-error.js";

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);
const brotliCompress = promisify(zlib.brotliCompress);
const brotliDecompress = promisify(zlib.brotliDecompress);

/**
 * The gzip compression algorithm, implemented with the Node.js built-in module
 * zlib. This value can be used for the `sendCompression` and `acceptCompression`
 * option of client transports, or for the `acceptCompression` option of server
 * plugins like `fastifyConnectPlugin` from @connectrpc/connect-fastify.
 */
export const compressionGzip: Compression = {
  name: "gzip",
  compress(bytes) {
    return gzip(bytes, {});
  },
  decompress(bytes, readMaxBytes) {
    if (bytes.length == 0) {
      return Promise.resolve(new Uint8Array(0));
    }
    return wrapZLibErrors(
      gunzip(bytes, {
        maxOutputLength: readMaxBytes,
      }),
      readMaxBytes,
    );
  },
};

/**
 * The brotli compression algorithm, implemented with the Node.js built-in module
 * zlib. This value can be used for the `sendCompression` and `acceptCompression`
 * option of client transports, or for the `acceptCompression` option of server
 * plugins like `fastifyConnectPlugin` from @connectrpc/connect-fastify.
 */
export const compressionBrotli: Compression = {
  name: "br",
  compress(bytes) {
    return brotliCompress(bytes, {});
  },
  decompress(bytes, readMaxBytes) {
    if (bytes.length == 0) {
      return Promise.resolve(new Uint8Array(0));
    }
    return wrapZLibErrors(
      brotliDecompress(bytes, {
        maxOutputLength: readMaxBytes,
      }),
      readMaxBytes,
    );
  },
};

function wrapZLibErrors<T>(
  promise: Promise<T>,
  readMaxBytes: number,
): Promise<T> {
  return promise.catch((e) => {
    const props = getNodeErrorProps(e);
    let code = Code.Internal;
    let message = "decompression failed";
    switch (props.code) {
      case "ERR_BUFFER_TOO_LARGE":
        code = Code.ResourceExhausted;
        message = `message is larger than configured readMaxBytes ${readMaxBytes} after decompression`;
        break;
      case "Z_DATA_ERROR":
      case "ERR_PADDING_2":
        code = Code.InvalidArgument;
        break;
      default:
        if (props.code?.startsWith("ERR__ERROR_FORMAT_")) {
          code = Code.InvalidArgument;
        }
        break;
    }
    return Promise.reject(
      new ConnectError(message, code, undefined, undefined, e),
    );
  });
}
