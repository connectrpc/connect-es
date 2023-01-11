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
 * compressedFlag indicates that the data in a EnvelopedMessage is
 * compressed. It has the same meaning in the gRPC-Web, gRPC-HTTP2,
 * and Connect protocols.
 */
export const compressedFlag = 0b00000001;

/**
 * Compression provides methods to compress and decompress data with
 * a certain compression algorithm.
 */
export interface Compression {
  /**
   * The name of the compression algorithm.
   */
  name: string;

  /**
   * Compress a chunk of data.
   */
  compress: (bytes: Uint8Array) => Promise<Uint8Array>;

  /**
   * Decompress a chunk of data.
   *
   * Raises a ConnectError with Code.InvalidArgument if the decompressed
   * size exceeds readMaxBytes.
   */
  decompress: (bytes: Uint8Array, readMaxBytes: number) => Promise<Uint8Array>;
}
