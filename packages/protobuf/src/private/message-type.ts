import {
  DynamicMessage,
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
export function makeMessageType<T extends Message = DynamicMessage>(
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
