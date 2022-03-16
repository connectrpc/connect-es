// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { JsonFormat, JsonValue } from "../json-format.js";
import type { BinaryFormat } from "../binary-format.js";
import type { AnyMessage } from "../message.js";
import type { Message } from "../message.js";
import type { EnumType, EnumValueInfo } from "../enum.js";
import type { MessageType } from "../message-type.js";
import type { FieldListSource } from "./field-list.js";
import type { EnumObject } from "./enum.js";
import { getEnumType, makeEnumType } from "./enum.js";
import type { Util } from "./util.js";
import { makeMessageType } from "./message-type.js";

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
  makeMessageType<T extends Message<T> = AnyMessage>(
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
  };
}
