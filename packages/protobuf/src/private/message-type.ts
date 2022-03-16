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

import {
  AnyMessage,
  Message,
  PartialMessage,
  PlainMessage,
} from "../message.js";
import type { FieldListSource } from "./field-list.js";
import type { JsonReadOptions, JsonValue } from "../json-format.js";
import type { MessageType } from "../message-type.js";
import type { BinaryReadOptions } from "../binary-format.js";
import type { ProtoRuntime } from "./proto-runtime.js";

/**
 * Create a new message type using the given runtime.
 */
export function makeMessageType<T extends Message<T> = AnyMessage>(
  runtime: ProtoRuntime,
  typeName: string,
  fields: FieldListSource,
  opt?: {
    localName?: string;
    // We do not surface options at this time
    // options?: { readonly [extensionName: string]: JsonValue };
  }
): MessageType<T> {
  const localName =
    opt?.localName ?? typeName.substring(typeName.lastIndexOf(".") + 1);
  const type = {
    [localName]: function (this: T, data?: PartialMessage<T>) {
      runtime.util.initFields(this);
      runtime.util.initPartial(data, this);
    },
  }[localName] as unknown as MessageType<T>;
  Object.setPrototypeOf(type.prototype, new Message<T>());
  Object.assign<MessageType<T>, Omit<MessageType<T>, "new">>(type, {
    runtime,
    typeName,
    fields: runtime.util.newFieldList(fields),
    fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): T {
      return new type().fromBinary(bytes, options);
    },
    fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): T {
      return new type().fromJson(jsonValue, options);
    },
    fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): T {
      return new type().fromJsonString(jsonString, options);
    },
    equals(
      a: T | PlainMessage<T> | undefined,
      b: T | PlainMessage<T> | undefined
    ): boolean {
      return runtime.util.equals(type, a, b);
    },
  });
  return type;
}
