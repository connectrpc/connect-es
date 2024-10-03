// Copyright 2021-2024 The Connect Authors
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

import {
  fromBinary,
  fromJsonString,
  toBinary,
  toJsonString,
} from "@bufbuild/protobuf";
import type {
  MessageShape,
  BinaryReadOptions,
  BinaryWriteOptions,
  DescMessage,
  JsonReadOptions,
  JsonWriteOptions,
} from "@bufbuild/protobuf";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { assertReadMaxBytes, assertWriteMaxBytes } from "./limit-io.js";
import type { DescMethodStreaming, DescMethodUnary } from "../types.js";

/**
 * Serialization provides methods to serialize or parse data with a certain
 * format.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export interface Serialization<T> {
  /**
   * Serialize T. Raises a ConnectError with Code.Internal if an error occurs.
   */
  serialize: (data: T) => Uint8Array;

  /**
   * Parse T. Raises a ConnectError with Code.InvalidArgument if an error occurs.
   */
  parse: (data: Uint8Array) => T;
}

/**
 * Sets default JSON serialization options for connect-es.
 *
 * With standard protobuf JSON serialization, unknown JSON fields are
 * rejected by default. In connect-es, unknown JSON fields are ignored
 * by default.
 */
export function getJsonOptions(
  options: Partial<JsonReadOptions & JsonWriteOptions> | undefined,
) {
  const o = { ...options };
  o.ignoreUnknownFields ??= true;
  return o;
}

/**
 * Create an object that provides convenient access to request and response
 * message serialization for a given method.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createMethodSerializationLookup<
  I extends DescMessage,
  O extends DescMessage,
>(
  method: DescMethodUnary<I, O> | DescMethodStreaming<I, O>,
  binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions> | undefined,
  jsonOptions: Partial<JsonReadOptions & JsonWriteOptions> | undefined,
  limitOptions: {
    writeMaxBytes: number;
    readMaxBytes: number;
  },
): MethodSerializationLookup<I, O> {
  const inputBinary = limitSerialization(
    createBinarySerialization(method.input, binaryOptions),
    limitOptions,
  );
  const inputJson = limitSerialization(
    createJsonSerialization(method.input, jsonOptions),
    limitOptions,
  );
  const outputBinary = limitSerialization(
    createBinarySerialization(method.output, binaryOptions),
    limitOptions,
  );
  const outputJson = limitSerialization(
    createJsonSerialization(method.output, jsonOptions),
    limitOptions,
  );
  return {
    getI(useBinaryFormat) {
      return useBinaryFormat ? inputBinary : inputJson;
    },
    getO(useBinaryFormat) {
      return useBinaryFormat ? outputBinary : outputJson;
    },
  };
}

/**
 * MethodSerializationLookup provides convenient access to request and response
 * message serialization for a given method.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export interface MethodSerializationLookup<
  I extends DescMessage,
  O extends DescMessage,
> {
  /**
   * Get the JSON or binary serialization for the request message type.
   */
  getI(useBinaryFormat: boolean): Serialization<MessageShape<I>>;
  /**
   * Get the JSON or binary serialization for the response message type.
   */
  getO(useBinaryFormat: boolean): Serialization<MessageShape<O>>;
}

/**
 * Returns functions to normalize and serialize the input message
 * of an RPC, and to parse the output message of an RPC.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createClientMethodSerializers<
  I extends DescMessage,
  O extends DescMessage,
>(
  method: DescMethodUnary<I, O> | DescMethodStreaming<I, O>,
  useBinaryFormat: boolean,
  jsonOptions?: JsonSerializationOptions,
  binaryOptions?: BinarySerializationOptions,
) {
  const input = useBinaryFormat
    ? createBinarySerialization(method.input, binaryOptions)
    : createJsonSerialization(method.input, jsonOptions);
  const output = useBinaryFormat
    ? createBinarySerialization(method.output, binaryOptions)
    : createJsonSerialization(method.output, jsonOptions);
  return { parse: output.parse, serialize: input.serialize };
}

/**
 * Apply I/O limits to a Serialization object, returning a new object.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function limitSerialization<T>(
  serialization: Serialization<T>,
  limitOptions: {
    writeMaxBytes: number;
    readMaxBytes: number;
  },
): Serialization<T> {
  return {
    serialize(data) {
      const bytes = serialization.serialize(data);
      assertWriteMaxBytes(limitOptions.writeMaxBytes, bytes.byteLength);
      return bytes;
    },
    parse(data) {
      assertReadMaxBytes(limitOptions.readMaxBytes, data.byteLength, true);
      return serialization.parse(data);
    },
  };
}

/**
 * Options for createBinarySerialization()
 */
type BinarySerializationOptions = Partial<
  BinaryReadOptions & BinaryWriteOptions
>;

/**
 * Creates a Serialization object for serializing the given protobuf message
 * with the protobuf binary format.
 */
export function createBinarySerialization<Desc extends DescMessage>(
  desc: Desc,
  options: BinarySerializationOptions | undefined,
): Serialization<MessageShape<Desc>> {
  return {
    parse(data: Uint8Array): MessageShape<Desc> {
      try {
        return fromBinary(desc, data, options);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`parse binary: ${m}`, Code.Internal);
      }
    },
    serialize(data: MessageShape<Desc>): Uint8Array {
      try {
        return toBinary(desc, data, options);
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
type JsonSerializationOptions = Partial<JsonReadOptions & JsonWriteOptions> & {
  textEncoder?: { encode(input?: string): Uint8Array };
  textDecoder?: { decode(input?: Uint8Array): string };
};

/**
 * Creates a Serialization object for serializing the given protobuf message
 * with the protobuf canonical JSON encoding.
 *
 * By default, unknown fields are ignored.
 */
export function createJsonSerialization<Desc extends DescMessage>(
  desc: Desc,
  options: JsonSerializationOptions | undefined,
): Serialization<MessageShape<Desc>> {
  const textEncoder = options?.textEncoder ?? new TextEncoder();
  const textDecoder = options?.textDecoder ?? new TextDecoder();
  const o = getJsonOptions(options);
  return {
    parse(data: Uint8Array): MessageShape<Desc> {
      try {
        const json = textDecoder.decode(data);
        return fromJsonString(desc, json, o);
      } catch (e) {
        throw ConnectError.from(e, Code.InvalidArgument);
      }
    },
    serialize(data: MessageShape<Desc>): Uint8Array {
      try {
        const json = toJsonString(desc, data, o);
        return textEncoder.encode(json);
      } catch (e) {
        throw ConnectError.from(e, Code.Internal);
      }
    },
  };
}
