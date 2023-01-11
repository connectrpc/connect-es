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

import * as zlib from "zlib";
import { promisify } from "util";
import { Code, ConnectError } from "@bufbuild/connect-core";
import { getNodeErrorProps } from "./private/node-error.js";

export interface Compression {
  name: string;
  compress: (bytes: Uint8Array) => Promise<Uint8Array>;
  decompress: (bytes: Uint8Array, readMaxBytes: number) => Promise<Uint8Array>;
}

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);
const brotliCompress = promisify(zlib.brotliCompress);
const brotliDecompress = promisify(zlib.brotliDecompress);

/**
 * compressedFlag indicates that the data in a EnvelopedMessage is
 * compressed. It has the same meaning in the gRPC-Web, gRPC-HTTP2,
 * and Connect protocols.
 */
export const compressedFlag = 0b00000001;

export const compressionGzip: Compression = {
  name: "gzip",
  compress(bytes) {
    return gzip(bytes, {});
  },
  decompress(bytes, readMaxBytes) {
    return wrapZLibErrors(
      gunzip(bytes, {
        maxOutputLength: readMaxBytes,
      }),
      readMaxBytes
    );
  },
};

export const compressionBrotli: Compression = {
  name: "brotli",
  compress(bytes) {
    return brotliCompress(bytes, {});
  },
  decompress(bytes, readMaxBytes) {
    return wrapZLibErrors(
      brotliDecompress(bytes, {
        maxOutputLength: readMaxBytes,
      }),
      readMaxBytes
    );
  },
};

function wrapZLibErrors<T>(
  promise: Promise<T>,
  readMaxBytes: number
): Promise<T> {
  return promise.catch((e) => {
    const { code } = getNodeErrorProps(e);
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (code) {
      case "ERR_BUFFER_TOO_LARGE":
        e = new ConnectError(
          `message is larger than configured readMaxBytes ${readMaxBytes} after decompression`,
          Code.ResourceExhausted
        );
        break;
      case "Z_DATA_ERROR":
      case "ERR_PADDING_2":
        e = new ConnectError(
          "decompression failed",
          Code.InvalidArgument,
          undefined,
          undefined,
          e
        );
        break;
      default:
        e = new ConnectError(
          "decompression failed",
          Code.Internal,
          undefined,
          undefined,
          e
        );
        break;
    }
    return Promise.reject(e);
  });
}
