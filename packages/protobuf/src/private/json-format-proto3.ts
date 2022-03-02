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

export function makeJsonFormatProto3(): JsonFormat {
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
              jsonArr.push(wrapField(field.T, value[i]).toJson(options));
            }
            break;
        }
        return options.emitDefaultValues || jsonArr.length > 0
          ? jsonArr
          : undefined;
      } else {
        switch (field.kind) {
          case "scalar":
            return writeScalar(
              field.T,
              value,
              !!field.oneof || field.opt || options.emitDefaultValues
            );
          case "enum":
            return writeEnum(
              field.T,
              value,
              !!field.oneof || field.opt || options.emitDefaultValues,
              options.enumAsInteger
            );
          case "message":
            return value !== undefined
              ? wrapField(field.T, value).toJson(options)
              : undefined;
        }
      }
    };
  });
}
