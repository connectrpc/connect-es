import type { DynamicMessage, Message } from "../message.js";
import type { BinaryFormat, BinaryWriteOptions } from "../binary-format.js";
import type { IBinaryWriter } from "../binary-encoding.js";
import { FieldInfo, ScalarType } from "../field.js";
import {
  makeBinaryFormatCommon,
  writeMapEntry,
  writeMessageField,
  writePacked,
  writeScalar,
} from "./binary-format-common.js";

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions, no-case-declarations, prefer-const */

export function makeBinaryFormatProto2(): BinaryFormat {
  return {
    ...makeBinaryFormatCommon(),
    writeMessage(
      message: Message,
      writer: IBinaryWriter,
      options: BinaryWriteOptions
    ): IBinaryWriter {
      const type = message.getType();
      let field: FieldInfo | undefined;
      try {
        for (field of type.fields.byNumber()) {
          let value, // this will be our field value, whether it is member of a oneof or not
            repeated = field.repeated,
            localName = field.localName;
          if (field.oneof) {
            const oneof = (message as DynamicMessage)[field.oneof.localName];
            if (oneof.case !== localName) {
              continue; // field is not selected, skip
            }
            value = oneof.value;
          } else {
            value = (message as DynamicMessage)[localName];
            // In contrast to proto3, we raise an error if a non-optional (proto2 required)
            // field is missing a value.
            if (value === undefined && !field.oneof && !field.opt) {
              throw new Error(
                `cannot encode field ${type.typeName}.${field.name} to JSON: required field not set`
              );
            }
          }
          switch (field.kind) {
            case "scalar":
            case "enum":
              let scalarType =
                field.kind == "enum" ? ScalarType.INT32 : field.T;
              if (repeated) {
                if (field.packed) {
                  writePacked(writer, scalarType, field.no, value);
                } else {
                  for (const item of value) {
                    writeScalar(writer, scalarType, field.no, item, true);
                  }
                }
              } else {
                if (value !== undefined) {
                  // In contrast to proto3, we do not skip intrinsic default values.
                  // Explicit default values are not special cased either.
                  writeScalar(writer, scalarType, field.no, value, true);
                }
              }
              break;
            case "message":
              if (repeated) {
                for (const item of value) {
                  writeMessageField(writer, options, field.T, field.no, item);
                }
              } else {
                writeMessageField(writer, options, field.T, field.no, value);
              }
              break;
            case "map":
              for (const [key, val] of Object.entries(value)) {
                writeMapEntry(writer, options, field, key, val);
              }
              break;
          }
        }
      } catch (e) {
        let m = field
          ? `cannot encode field ${type.typeName}.${field?.name} to binary`
          : `cannot encode message ${type.typeName} to binary`;
        let r = e instanceof Error ? e.message : String(e);
        throw new Error(m + (r.length > 0 ? `: ${r}` : ""));
      }
      if (options.writeUnknownFields) {
        this.writeUnknownFields(message, writer);
      }
      return writer;
    },
  };
}
