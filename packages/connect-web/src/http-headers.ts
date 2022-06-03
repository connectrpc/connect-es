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

import type { BinaryReadOptions, MessageType } from "@bufbuild/protobuf";
import { Message, protoBase64 } from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { StatusCode } from "./status-code.js";

/**
 * Encode a single binary header value according to the gRPC
 * specification.
 *
 * Binary headers names end with `-bin`, and can contain arbitrary
 * base64-encoded binary data.
 */
export function encodeBinaryHeader(
  value: Uint8Array | ArrayBufferLike | Message
): string {
  let bytes: Uint8Array;
  if (value instanceof Message) {
    bytes = value.toBinary();
  } else {
    bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  }
  return protoBase64.enc(bytes);
}

/**
 * Decode a single binary header value according to the gRPC
 * specification.
 *
 * Binary headers names end with `-bin`, and can contain arbitrary
 * base64-encoded binary data.
 *
 * Note that duplicate header names may have their values joined
 * with a `,` as the delimiter, so you most likely will want to
 * split by `,` first.
 *
 * If this function detects invalid base-64 encoding, or invalid
 * binary message data, it throws a ConnectError with status
 * DataLoss.
 */
export function decodeBinaryHeader(value: string): Uint8Array;
export function decodeBinaryHeader<T extends Message<T>>(
  value: string,
  type: MessageType<T>,
  options?: Partial<BinaryReadOptions>
): T;
export function decodeBinaryHeader<T extends Message<T>>(
  value: string,
  type?: MessageType<T>,
  options?: Partial<BinaryReadOptions>
): Uint8Array | T {
  try {
    const bytes = protoBase64.dec(value);
    if (type) {
      return type.fromBinary(bytes, options);
    }
    return bytes;
  } catch (e) {
    throw new ConnectError(
      e instanceof Error ? e.message : String(e),
      StatusCode.DataLoss
    );
  }
}
