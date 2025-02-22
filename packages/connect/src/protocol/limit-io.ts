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

import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

/**
 * At most, allow ~4GiB to be received or sent per message.
 * zlib used by Node.js caps maxOutputLength at this value. It also happens to
 * be the maximum theoretical message size supported by protobuf-es.
 */
const maxReadMaxBytes = 0xffffffff;
const maxWriteMaxBytes = maxReadMaxBytes;

/**
 * The default value for the compressMinBytes option. The CPU cost of compressing
 * very small messages usually isn't worth the small reduction in network I/O, so
 * the default value is 1 kibibyte.
 */
const defaultCompressMinBytes = 1024;

/**
 * Asserts that the options writeMaxBytes, readMaxBytes, and compressMinBytes
 * are within sane limits, and returns default values where no value is
 * provided.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function validateReadWriteMaxBytes(
  readMaxBytes: number | undefined,
  writeMaxBytes: number | undefined,
  compressMinBytes: number | undefined,
) {
  writeMaxBytes ??= maxWriteMaxBytes;
  readMaxBytes ??= maxReadMaxBytes;
  compressMinBytes ??= defaultCompressMinBytes;
  if (writeMaxBytes < 1 || writeMaxBytes > maxWriteMaxBytes) {
    throw new ConnectError(
      `writeMaxBytes ${writeMaxBytes} must be >= 1 and <= ${maxWriteMaxBytes}`,
      Code.Internal,
    );
  }
  if (readMaxBytes < 1 || readMaxBytes > maxReadMaxBytes) {
    throw new ConnectError(
      `readMaxBytes ${readMaxBytes} must be >= 1 and <= ${maxReadMaxBytes}`,
      Code.Internal,
    );
  }
  return {
    readMaxBytes,
    writeMaxBytes,
    compressMinBytes,
  };
}

/**
 * Raise an error ResourceExhausted if more than writeMaxByte are written.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function assertWriteMaxBytes(
  writeMaxBytes: number,
  bytesWritten: number,
): void {
  if (bytesWritten > writeMaxBytes) {
    throw new ConnectError(
      `message size ${bytesWritten} is larger than configured writeMaxBytes ${writeMaxBytes}`,
      Code.ResourceExhausted,
    );
  }
}

/**
 * Raise an error ResourceExhausted if more than readMaxBytes are read.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function assertReadMaxBytes(
  readMaxBytes: number,
  bytesRead: number,
  totalSizeKnown = false,
): void {
  if (bytesRead > readMaxBytes) {
    let message = `message size is larger than configured readMaxBytes ${readMaxBytes}`;
    if (totalSizeKnown) {
      message = `message size ${bytesRead} is larger than configured readMaxBytes ${readMaxBytes}`;
    }
    throw new ConnectError(message, Code.ResourceExhausted);
  }
}
