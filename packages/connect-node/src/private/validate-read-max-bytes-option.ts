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

import { Code, ConnectError } from "@bufbuild/connect-core";

const maxReadMaxBytes = 0xffffffff; // zlib caps maxOutputLength at this value

/**
 * @deprecated use compressionValidateOptions from @bufbuild/connect-core
 */
export function validateReadMaxBytesOption(
  readMaxBytes: number | undefined
): number {
  if (readMaxBytes === undefined) {
    return maxReadMaxBytes;
  }
  if (readMaxBytes < 1 || readMaxBytes > maxReadMaxBytes) {
    throw new ConnectError(
      `readMaxBytes ${readMaxBytes} must be >= 1 and <= ${maxReadMaxBytes}`,
      Code.Internal
    );
  }
  return readMaxBytes;
}
