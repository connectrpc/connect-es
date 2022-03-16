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

import { makeProtoRuntime } from "./private/proto-runtime.js";
import { makeBinaryFormatProto3 } from "./private/binary-format-proto3.js";
import { makeJsonFormatProto3 } from "./private/json-format-proto3.js";
import { makeUtilCommon } from "./private/util-common.js";
import { FieldListSource, InternalFieldList } from "./private/field-list.js";
import type { FieldList } from "./field-list.js";
import type { AnyMessage, Message } from "./message.js";
import { scalarDefaultValue } from "./private/scalars.js";
import { FieldInfo, ScalarType } from "./field.js";
import { InternalOneofInfo } from "./private/field.js";
import { makeFieldName, makeJsonName } from "./private/names.js";

/**
 * Provides functionality for messages defined with the proto3 syntax.
 */
export const proto3 = makeProtoRuntime(
  "proto3",
  makeJsonFormatProto3(),
  makeBinaryFormatProto3(),
  {
    ...makeUtilCommon(),
    newFieldList(fields: FieldListSource): FieldList {
      return new InternalFieldList(fields, normalizeFieldInfosProto3);
    },
    initFields(target: Message): void {
      for (const member of target.getType().fields.byMember()) {
        if (member.opt) {
          continue;
        }
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
          case "enum":
            t[name] = 0;
            break;
          case "map":
            t[name] = {};
            break;
          case "scalar":
            t[name] = scalarDefaultValue(member.T); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
            break;
          case "message":
            // message fields are always optional in proto3
            break;
        }
      }
    },
  }
);

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */

function normalizeFieldInfosProto3(fieldInfos: FieldListSource): FieldInfo[] {
  const r: FieldInfo[] = [];
  let o: InternalOneofInfo | undefined;
  for (const field of typeof fieldInfos == "function"
    ? fieldInfos()
    : fieldInfos) {
    const f = field as any;
    f.localName = makeFieldName(field.name, field.oneof !== undefined);
    f.jsonName = field.jsonName ?? makeJsonName(field.name);
    f.repeated = field.repeated ?? false;
    // From the proto3 language guide:
    // > In proto3, repeated fields of scalar numeric types are packed by default.
    // This information is incomplete - according to the conformance tests, BOOL
    // and ENUM are packed by default as well. This means only STRING and BYTES
    // are not packed by default, which makes sense because they are length-delimited.
    f.packed =
      field.packed ??
      (field.kind == "enum" ||
        (field.kind == "scalar" &&
          field.T != ScalarType.BYTES &&
          field.T != ScalarType.STRING));
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
