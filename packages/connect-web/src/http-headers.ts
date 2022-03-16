// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { Message } from "@bufbuild/protobuf";
import type { MessageType } from "@bufbuild/protobuf";
import { base64decode } from "./base64.js";
import type { BinaryReadOptions } from "@bufbuild/protobuf";

export function percentDecodeHeader(value: string): string {
  return decodeURIComponent(value);
}

/**
 * Throws on invalid base-64 data, or on message parsing.
 */
export function parseBinaryHeader(value: string): Uint8Array;
export function parseBinaryHeader<T extends Message<T>>(
  value: string,
  type: MessageType<T>,
  options?: Partial<BinaryReadOptions>
): T;
export function parseBinaryHeader<T extends Message<T>>(
  value: string,
  type?: MessageType<T>,
  options?: Partial<BinaryReadOptions>
): Uint8Array | T {
  const bytes = base64decode(value);
  if (type) {
    return type.fromBinary(bytes, options);
  }
  return bytes;
}
