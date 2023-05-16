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

import type { BinaryReadOptions, MessageType } from "@bufbuild/protobuf";
import { Message, protoBase64 } from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";

/**
 * Encode a single binary header value according to the Connect
 * and gRPC specifications.
 *
 * This function accepts raw binary data from a buffer, a string
 * with UTF-8 text, or a protobuf message. It encodes the input
 * with unpadded base64 and returns a string that can be used for
 * a header whose name ends with `-bin`.
 */
export function encodeBinaryHeader(
  value: Uint8Array | ArrayBufferLike | Message | string
): string {
  let bytes: Uint8Array;
  if (value instanceof Message) {
    bytes = value.toBinary();
  } else if (typeof value == "string") {
    bytes = new TextEncoder().encode(value);
  } else {
    bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  }
  return protoBase64.enc(bytes).replace(/=+$/, "");
}

/**
 * Decode a single binary header value according to the Connect
 * and gRPC specifications.
 *
 * This function returns the raw binary data from a header whose
 * name ends with `-bin`. If given a message type in the second
 * argument, it deserializes a protobuf message. To decode a value
 * that contains unicode text, pass the raw binary data returned
 * from this function through TextDecoder.decode.
 *
 * Note that duplicate header names may have their values joined
 * with a `,` as the delimiter, so you most likely will want to
 * split by `,` first.
 *
 * If this function detects invalid base-64 encoding, or invalid
 * binary message data, it throws a ConnectError with code
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
    throw ConnectError.from(e, Code.DataLoss);
  }
}

/**
 * Merge two or more Headers objects by appending all fields from
 * all inputs to a new Headers object.
 */
export function appendHeaders(...headers: Headers[]): Headers {
  const h = new Headers();
  for (const e of headers) {
    e.forEach((value, key) => {
      h.append(key, value);
    });
  }
  return h;
}
