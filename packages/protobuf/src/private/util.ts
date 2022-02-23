import type { FieldListSource } from "./field-list.js";
import type { FieldList } from "../field-list.js";
import type { EnumObject } from "./enum.js";
import type { JsonValue } from "../json-format.js";
import type { Message, PartialMessage, PlainMessage } from "../message.js";
import type { MessageType } from "../message-type.js";
import type { EnumValueInfo } from "../enum.js";

/**
 * Provides utilities used by generated code.
 * All methods are internal and are not safe to use, they may break with a
 * future release.
 */
export interface Util {
  /**
   * Create a field list
   */
  newFieldList(fields: FieldListSource): FieldList;

  /**
   * Sets reflection information on a generated enum.
   */
  setEnumType(
    enumObject: EnumObject,
    typeName: string,
    values: EnumValueInfo[],
    opt?: { options?: { readonly [extensionName: string]: JsonValue } }
  ): void;

  /**
   * Set default field values on the target message.
   */
  initFields(target: Message): void;

  /**
   * Set specified field values on the target message, recursively.
   */
  initPartial<T extends Message>(
    source: PartialMessage<T> | undefined,
    target: T
  ): void;

  /**
   * Compares two messages of the same type recursively.
   * Will also return true if both messages are `undefined`.
   */
  equals<T extends Message>(
    type: MessageType,
    a: T | PlainMessage<T> | undefined,
    b: T | PlainMessage<T> | undefined
  ): boolean;

  /**
   * Create a deep copy.
   */
  clone<T extends Message>(message: T): T;
}
