// Copyright 2020-2022 Buf Technologies, Inc.
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

import type { BinaryReadOptions, BinaryWriteOptions } from "./binary-format.js";
import type {
  JsonReadOptions,
  JsonValue,
  JsonWriteOptions,
  JsonWriteStringOptions,
} from "./json-format.js";
import type { MessageType } from "./message-type.js";

/**
 * AnyMessage is an interface implemented by all messages. If you need to
 * handle messages of unknown type, this interface provides a convenient
 * index signature to access fields with message["fieldname"].
 */
export interface AnyMessage extends Message<AnyMessage> {
  [k: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
}

/**
 * Message is the base class of every message, generated, or created at
 * runtime.
 *
 * It is _not_ safe to extend this class. If you want to create a message at
 * run time, use proto3.makeMessageType().
 */
export class Message<T extends Message<T> = AnyMessage> {
  /**
   * Compare with a message of the same type.
   */
  equals(other: T | PlainMessage<T> | undefined): boolean {
    return this.getType().runtime.util.equals(this.getType(), this, other);
  }

  /**
   * Create a deep copy.
   */
  clone(): T {
    // return this.getType().runtime.util.clone(this);
    return this.getType().runtime.util.clone(this as unknown as T);
  }

  /**
   * Parse from binary data, merging fields.
   *
   * Repeated fields are appended. Map entries are added, overwriting
   * existing keys.
   *
   * If a message field is already present, it will be merged with the
   * new data.
   */
  fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): this {
    const type = this.getType(),
      format = type.runtime.bin,
      opt = format.makeReadOptions(options);
    format.readMessage(this, opt.readerFactory(bytes), bytes.byteLength, opt);
    return this;
  }

  /**
   * Parse a message from a JSON value.
   */
  fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): this {
    const type = this.getType(),
      format = type.runtime.json,
      opt = format.makeReadOptions(options);
    format.readMessage(type, jsonValue, opt, this as unknown as T);
    return this;
  }

  /**
   * Parse a message from a JSON string.
   */
  fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): this {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- assigning to JsonValue is safe here
    return this.fromJson(JSON.parse(jsonString), options);
  }

  /**
   * Serialize the message to binary data.
   */
  toBinary(options?: Partial<BinaryWriteOptions>): Uint8Array {
    const type = this.getType(),
      bin = type.runtime.bin,
      opt = bin.makeWriteOptions(options),
      writer = opt.writerFactory();
    bin.writeMessage(this, writer, opt);
    return writer.finish();
  }

  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(options?: Partial<JsonWriteOptions>): JsonValue {
    const type = this.getType(),
      json = type.runtime.json,
      opt = json.makeWriteOptions(options);
    return json.writeMessage(this, opt);
  }

  /**
   * Serialize the message to a JSON string.
   */
  toJsonString(options?: Partial<JsonWriteStringOptions>): string {
    const value = this.toJson(options);
    return JSON.stringify(value, null, options?.prettySpaces ?? 0);
  }

  /**
   * Retrieve the MessageType of this message - a singleton that represents
   * the protobuf message declaration and provides metadata for reflection-
   * based operations.
   */
  getType(): MessageType<T> {
    // Any class that extends Message _must_ provide a complete static
    // implementation of MessageType.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return Object.getPrototypeOf(this).constructor;
  }
}

/**
 * PlainMessage<T> strips all methods from a message, leaving only fields
 * and oneof groups.
 */
export type PlainMessage<T extends Message> = {
  // eslint-disable-next-line @typescript-eslint/ban-types -- we use `Function` to identify methods
  [P in keyof T as T[P] extends Function ? never : P]: T[P];
};

/**
 * PartialMessage<T> constructs a type from a message. The resulting type
 * only contains the protobuf field members of the message, and all of them
 * are optional.
 *
 * PartialMessage is similar to the built-in type Partial<T>, but recursive,
 * and respects `oneof` groups.
 */
export type PartialMessage<T extends Message> = {
  // eslint-disable-next-line @typescript-eslint/ban-types -- we use `Function` to identify methods
  [P in keyof T as T[P] extends Function ? never : P]?: PartialField<T[P]>;
};
// prettier-ignore
type PartialField<F> =
  F extends (Date | Uint8Array | bigint | boolean | string | number) ? F
  : F extends Array<infer U> ? Array<PartialField<U>>
  : F extends ReadonlyArray<infer U> ? ReadonlyArray<PartialField<U>>
  : F extends OneofSelectedMessage<infer C, infer V> ? {case: C; value: PartialMessage<V>}
  : F extends { case: string | undefined; value?: unknown; } ? F
  : F extends Message ? PartialMessage<F>
  : F extends {[key: string|number]: Message<infer U>} ? {[key: string|number]: PartialMessage<U>}
  : F ;

type OneofSelectedMessage<K extends string, M extends Message> = {
  case: K;
  value: M;
};
