import { makeProtoRuntime } from "./private/proto-runtime.js";
import { makeBinaryFormatProto2 } from "./private/binary-format-proto2.js";
import { makeUtilCommon } from "./private/util-common.js";
import { FieldListSource, InternalFieldList } from "./private/field-list.js";
import type { FieldList } from "./field-list.js";
import type { AnyMessage, Message } from "./message.js";
import type { FieldInfo } from "./field.js";
import { InternalOneofInfo } from "./private/field.js";
import { makeFieldName, makeJsonName } from "./private/names.js";
import { makeJsonFormatProto2 } from "./private/json-format-proto2.js";

/**
 * Provides functionality for messages defined with the proto2 syntax.
 */
export const proto2 = makeProtoRuntime(
  "proto2",
  makeJsonFormatProto2(),
  makeBinaryFormatProto2(),
  {
    ...makeUtilCommon(),
    newFieldList(fields: FieldListSource): FieldList {
      return new InternalFieldList(fields, normalizeFieldInfosProto2);
    },
    initFields(target: Message): void {
      for (const member of target.getType().fields.byMember()) {
        const name = member.localName,
          t = target as AnyMessage;
        if (member.repeated) {
          t[name] = [];
          continue;
        }
        switch (member.kind) {
          case "oneof":
            t[name] = { case: undefined };
            break;
          case "map":
            t[name] = {};
            break;
          case "scalar":
          case "enum":
          case "message":
            // In contrast to proto3, enum and scalar fields have no intrinsic default value,
            // only an optional explicit default value.
            // Unlike proto3 intrinsic default values, proto2 explicit default values are not
            // set on construction, because they are not omitted on the wire. If we did set
            // default values on construction, a deserialize-serialize round-trip would add
            // fields to a message.
            break;
        }
      }
    },
  }
);

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */

function normalizeFieldInfosProto2(fieldInfos: FieldListSource): FieldInfo[] {
  const r: FieldInfo[] = [];
  let o: InternalOneofInfo | undefined;
  for (const field of typeof fieldInfos == "function"
    ? fieldInfos()
    : fieldInfos) {
    const f = field as any;
    f.localName = makeFieldName(field.name, field.oneof !== undefined);
    f.jsonName = field.jsonName ?? makeJsonName(field.name);
    f.repeated = field.repeated ?? false;
    // In contrast to proto3, repeated fields are unpacked except when explicitly specified.
    f.packed = field.packed ?? false;
    // We do not surface options at this time
    // f.options = field.options ?? emptyReadonlyObject;
    if (field.oneof !== undefined) {
      const ooname =
        typeof field.oneof == "string" ? field.oneof : field.oneof.name;
      if (!o || o.name != ooname) {
        o = new InternalOneofInfo(ooname);
      }
      f.oneof = o;
      o.addField(f);
    }
    r.push(f);
  }
  return r;
}
