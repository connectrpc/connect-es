import type { JsonFormat, JsonValue } from "../json-format.js";
import type { BinaryFormat } from "../binary-format.js";
import type { DynamicMessage } from "../message.js";
import type { Message } from "../message.js";
import type { EnumType, EnumValueInfo } from "../enum.js";
import type { MessageType } from "../message-type.js";
import type { FieldListSource } from "./field-list.js";
import type { EnumObject } from "./enum.js";
import { getEnumType, makeEnumType } from "./enum.js";
import type { Util } from "./util.js";
import { makeMessageType } from "./message-type.js";
import { makeServiceType } from "./service-type.js";

/**
 * A facade that provides serialization and other internal functionality.
 */
export interface ProtoRuntime {
  readonly syntax: string;
  readonly json: JsonFormat;
  readonly bin: BinaryFormat;
  readonly util: Util;

  /**
   * Create a message type at runtime, without generating code.
   */
  makeMessageType<T extends Message = DynamicMessage>(
    typeName: string,
    fields: FieldListSource,
    opt?: {
      localName?: string;
      options?: { readonly [extensionName: string]: JsonValue };
    }
  ): MessageType<T>;

  /**
   * Create an enum type at runtime, without generating code.
   */
  makeEnumType(
    typeName: string,
    values: EnumValueInfo[],
    opt?: {
      options?: { readonly [extensionName: string]: JsonValue };
    }
  ): EnumType;

  /**
   * Get reflection information from a generated enum.
   * If this function is called on something other than a generated
   * enum, it raises an error.
   */
  getEnumType(enumObject: EnumObject): EnumType;

  /**
   * Create a service type ad runtime.
   */
  makeServiceType: typeof makeServiceType;
}

export function makeProtoRuntime(
  syntax: string,
  json: JsonFormat,
  bin: BinaryFormat,
  util: Util
): ProtoRuntime {
  return {
    syntax,
    json,
    bin,
    util,
    makeMessageType(
      typeName: string,
      fields: FieldListSource,
      opt?: {
        localName?: string;
        options?: { readonly [extensionName: string]: JsonValue };
      }
    ) {
      return makeMessageType(this, typeName, fields, opt);
    },
    makeEnumType,
    getEnumType,
    makeServiceType,
  };
}
