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

import type {
  JsonFormat,
  JsonObject,
  JsonValue,
  JsonWriteOptions,
} from "../json-format.js";
import { wrapField } from "./field-wrapper.js";
import type { FieldInfo } from "../field.js";
import { assert } from "./assert.js";
import { makeJsonFormatCommon } from "./json-format-common.js";
import type { Message } from "../message.js";

/* eslint-disable no-case-declarations, @typescript-eslint/restrict-plus-operands,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */

export function makeJsonFormatProto2(): JsonFormat {
  return makeJsonFormatCommon((writeEnum, writeScalar) => {
    return function writeField(
      field: FieldInfo,
      value: any,
      options: JsonWriteOptions
    ): JsonValue | undefined {
      if (field.kind == "map") {
        const jsonObj: JsonObject = {};
        switch (field.V.kind) {
          case "scalar":
            for (const [entryKey, entryValue] of Object.entries(value)) {
              const val = writeScalar(field.V.T, entryValue, true);
              assert(val !== undefined);
              jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
            }
            break;
          case "message":
            for (const [entryKey, entryValue] of Object.entries(value)) {
              // JSON standard allows only (double quoted) string as property key
              jsonObj[entryKey.toString()] = (entryValue as Message).toJson(
                options
              );
            }
            break;
          case "enum":
            const enumType = field.V.T;
            for (const [entryKey, entryValue] of Object.entries(value)) {
              assert(entryValue === undefined || typeof entryValue == "number");
              const val = writeEnum(
                enumType,
                entryValue as number,
                true,
                options.enumAsInteger
              );
              assert(val !== undefined);
              jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
            }
            break;
        }
        return options.emitDefaultValues || Object.keys(jsonObj).length > 0
          ? jsonObj
          : undefined;
      } else if (field.repeated) {
        const jsonArr: JsonValue[] = [];
        switch (field.kind) {
          case "scalar":
            for (let i = 0; i < value.length; i++) {
              jsonArr.push(writeScalar(field.T, value[i], true) as JsonValue);
            }
            break;
          case "enum":
            for (let i = 0; i < value.length; i++) {
              jsonArr.push(
                writeEnum(
                  field.T,
                  value[i],
                  true,
                  options.enumAsInteger
                ) as JsonValue
              );
            }
            break;
          case "message":
            for (let i = 0; i < value.length; i++) {
              jsonArr.push(value[i].toJson(options));
            }
            break;
        }
        return options.emitDefaultValues || jsonArr.length > 0
          ? jsonArr
          : undefined;
      } else {
        // In contrast to proto3, we raise an error if a non-optional (proto2 required)
        // field is missing a value.
        if (value === undefined) {
          if (!field.oneof && !field.opt) {
            throw `required field not set`;
          }
          return undefined;
        }
        switch (field.kind) {
          case "scalar":
            // In contrast to proto3, we do not skip intrinsic default values.
            // Explicit default values are not special cased either.
            return writeScalar(field.T, value, true);
          case "enum":
            // In contrast to proto3, we do not skip intrinsic default values.
            // Explicit default values are not special cased either.
            return writeEnum(field.T, value, true, options.enumAsInteger);
          case "message":
            return wrapField(field.T, value).toJson(options);
        }
      }
    };
  });
}
