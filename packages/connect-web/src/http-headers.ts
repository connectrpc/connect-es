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
