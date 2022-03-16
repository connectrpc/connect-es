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

import type { FieldList } from "./field-list.js";
import type { ProtoRuntime } from "./private/proto-runtime.js";
import type { JsonReadOptions, JsonValue } from "./json-format.js";
import type { BinaryReadOptions } from "./binary-format.js";
import type {
  AnyMessage,
  Message,
  PartialMessage,
  PlainMessage,
} from "./message.js";
import type { FieldWrapper } from "./private/field-wrapper.js";

/**
 * MessageType represents a protobuf message. It provides:
 * - a constructor that produces an instance of the message
 * - metadata for reflection-based operations
 * - common functionality like serialization
 */
export interface MessageType<T extends Message<T> = AnyMessage> {
  /**
   * Create a new instance of this type.
   */
  new (data?: PartialMessage<T>): T;

  /**
   * The fully qualified name of the message.
   */
  readonly typeName: string;

  /**
   * Field metadata.
   */
  readonly fields: FieldList;

  /**
   * Provides serialization and other functionality.
   */
  readonly runtime: ProtoRuntime;

  // We do not surface options at this time
  // readonly options: OptionsMap;

  /**
   * When used as a field, unwrap this message to a simple value.
   */
  readonly fieldWrapper?: FieldWrapper<T>;

  /**
   * Parse serialized binary data.
   */
  fromBinary(data: Uint8Array, options?: Partial<BinaryReadOptions>): T;

  /**
   * Parse a JSON object.
   */
  fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): T;

  /**
   * Parse a JSON string.
   */
  fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): T;

  /**
   * Returns true if the given arguments have equal field values, recursively.
   */
  equals(
    a: T | PlainMessage<T> | undefined,
    b: T | PlainMessage<T> | undefined
  ): boolean;
}
