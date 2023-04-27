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

import type { CommonTransportOptions } from "@bufbuild/connect/protocol";
import { compressionBrotli, compressionGzip } from "./compression.js";
import { createNodeHttpClient } from "./node-universal-client.js";
import type { NodeHttpClientOptions } from "./node-universal-client.js";
import { validateReadWriteMaxBytes } from "@bufbuild/connect/protocol";

/**
 * Options that are common to all client transports for Node.js.
 */
type CommonNodeTransportOptions = NodeHttpClientOptions &
  Partial<Omit<CommonTransportOptions, "baseUrl">> &
  Pick<CommonTransportOptions, "baseUrl">;

/**
 * Asserts that the options are within sane limits, and returns default values
 * where no value is provided.
 *
 * @internal
 */
export function validateNodeTransportOptions(
  options: CommonNodeTransportOptions
) {
  return {
    ...options,
    httpClient: options.httpClient ?? createNodeHttpClient(options),
    useBinaryFormat: options.useBinaryFormat ?? true,
    interceptors: options.interceptors ?? [],
    sendCompression: options.sendCompression ?? null,
    acceptCompression: options.acceptCompression ?? [
      compressionGzip,
      compressionBrotli,
    ],
    ...validateReadWriteMaxBytes(
      options.readMaxBytes,
      options.writeMaxBytes,
      options.compressMinBytes
    ),
  };
}
