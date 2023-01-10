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

import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MessageType,
  MethodInfo,
  PartialMessage,
} from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";

/**
 * Serialization provides methods to serialize or parse data with a certain
 * format.
 */
export interface Serialization<T> {
  serialize: (data: T) => Uint8Array;

  parse: (data: Uint8Array) => T;
}

/**
 * Options for createBinarySerialization()
 */
export type BinarySerializationOptions = Partial<
  BinaryReadOptions & BinaryWriteOptions
>;

/**
 * Creates a Serialization object for serializing the given protobuf message
 * with the protobuf binary format.
 */
export function createBinarySerialization<T extends Message<T>>(
  messageType: MessageType<T>,
  options: BinarySerializationOptions | undefined
): Serialization<T> {
  return {
    parse(data: Uint8Array): T {
      try {
        return messageType.fromBinary(data, options);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`parse binary: ${m}`, Code.InvalidArgument);
      }
    },
    serialize(data: T): Uint8Array {
      try {
        return data.toBinary(options);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`serialize binary: ${m}`, Code.Internal);
      }
    },
  };
}

/**
 * Options for createJsonSerialization()
 */
export type JsonSerializationOptions = Partial<
  JsonReadOptions & JsonWriteOptions
> & {
  textEncoder?: { encode(input?: string): Uint8Array };
  textDecoder?: { decode(input?: Uint8Array): string };
};

/**
 * Creates a Serialization object for serializing the given protobuf message
 * with the protobuf canonical JSON encoding.
 */
export function createJsonSerialization<T extends Message<T>>(
  messageType: MessageType<T>,
  options: JsonSerializationOptions | undefined
): Serialization<T> {
  const textEncoder = options?.textEncoder ?? new TextEncoder();
  const textDecoder = options?.textDecoder ?? new TextDecoder();
  return {
    parse(data: Uint8Array): T {
      try {
        const json = textDecoder.decode(data);
        return messageType.fromJsonString(json, options);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(m, Code.InvalidArgument);
      }
    },
    serialize(data: T): Uint8Array {
      try {
        const json = data.toJsonString(options);
        return textEncoder.encode(json);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(m, Code.Internal);
      }
    },
  };
}

/**
 * Returns functions to normalize and serialize the input message
 * of an RPC, and to parse the output message of an RPC.
 */
export function createClientMethodSerializers<
  I extends Message<I>,
  O extends Message<O>
>(
  method: MethodInfo<I, O>,
  useBinaryFormat: boolean,
  jsonOptions?: JsonSerializationOptions,
  binaryOptions?: BinarySerializationOptions
) {
  function normalize(input: PartialMessage<I>): I {
    return input instanceof method.I ? input : new method.I(input);
  }
  const input = useBinaryFormat
    ? createBinarySerialization(method.I, binaryOptions)
    : createJsonSerialization(method.I, jsonOptions);
  const output = useBinaryFormat
    ? createBinarySerialization(method.O, binaryOptions)
    : createJsonSerialization(method.O, jsonOptions);
  return { normalize, parse: output.parse, serialize: input.serialize };
}
