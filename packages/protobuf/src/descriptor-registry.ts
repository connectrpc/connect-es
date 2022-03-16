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

import type { FileDescriptorProto } from "./google/protobuf/descriptor_pb.js";
import { assert } from "./private/assert.js";
import type { MessageType } from "./message-type.js";
import { proto3 } from "./proto3.js";
import { proto2 } from "./proto2.js";
import type { PartialFieldInfo } from "./field.js";
import { ScalarType } from "./field.js";
import type { EnumType, EnumValueInfo } from "./enum.js";
import { DescriptorSet } from "./descriptor-set.js";
import { protoInt64 } from "./proto-int64.js";
import type {
  IEnumTypeRegistry,
  IMessageTypeRegistry,
  IServiceTypeRegistry,
} from "./type-registry.js";
import type { MethodInfo, ServiceType } from "./service-type.js";
import { makeMethodName } from "./private/names.js";
import { Timestamp } from "./google/protobuf/timestamp_pb.js";
import { Duration } from "./google/protobuf/duration_pb.js";
import { Any } from "./google/protobuf/any_pb.js";
import { Empty } from "./google/protobuf/empty_pb.js";
import { FieldMask } from "./google/protobuf/field_mask_pb.js";
import {
  ListValue,
  NullValue,
  Struct,
  Value,
} from "./google/protobuf/struct_pb.js";
import { getEnumType } from "./private/enum.js";
import {
  BoolValue,
  BytesValue,
  DoubleValue,
  FloatValue,
  Int32Value,
  Int64Value,
  StringValue,
  UInt32Value,
  UInt64Value,
} from "./google/protobuf/wrappers_pb.js";

// well-known message types with specialized JSON representation
const wkMessages = [
  Any,
  Duration,
  Empty,
  FieldMask,
  Struct,
  Value,
  ListValue,
  Timestamp,
  Duration,
  DoubleValue,
  FloatValue,
  Int64Value,
  Int32Value,
  UInt32Value,
  UInt64Value,
  BoolValue,
  StringValue,
  BytesValue,
];

// well-known enum types with specialized JSON representation
const wkEnums = [getEnumType(NullValue)];

/**
 * DescriptorRegistry is a type registry that dynamically creates types
 * from a set of google.protobuf.FileDescriptorProto.
 *
 * By default, all well-known types with a specialized JSON representation
 * are replaced with their generated counterpart in this package.
 */
export class DescriptorRegistry
  implements IMessageTypeRegistry, IEnumTypeRegistry, IServiceTypeRegistry
{
  private readonly ds: DescriptorSet;

  private readonly enums: Record<string, EnumType | undefined> = {};
  private readonly messages: Record<string, MessageType | undefined> = {};
  private readonly services: Record<string, ServiceType | undefined> = {};

  constructor(descriptorSet?: DescriptorSet, replaceWkt = true) {
    this.ds = descriptorSet ?? new DescriptorSet();
    if (replaceWkt) {
      for (const mt of wkMessages) {
        this.messages["." + mt.typeName] = mt;
      }
      for (const et of wkEnums) {
        this.enums["." + et.typeName] = et;
      }
    }
  }

  /**
   * May raise an error on invalid descriptors.
   */
  add(...files: FileDescriptorProto[]): void {
    this.ds.add(...files);
  }

  /**
   * May raise an error on invalid descriptors.
   */
  findEnum(typeName: string): EnumType | undefined {
    const protoTypeName = "." + typeName;
    const existing = this.enums[protoTypeName];
    if (existing) {
      return existing;
    }
    const raw = this.ds.enums[protoTypeName];
    if (!raw) {
      return undefined;
    }
    const runtime = raw.file.syntax == "proto3" ? proto3 : proto2;
    const type = runtime.makeEnumType(
      typeName,
      raw.values.map(
        (u): EnumValueInfo => ({
          no: u.number,
          name: u.name,
        })
      ),
      {}
    );
    this.enums[protoTypeName] = type;
    return type;
  }

  /**
   * May raise an error on invalid descriptors.
   */
  findMessage(typeName: string): MessageType | undefined {
    const protoTypeName = "." + typeName;
    const existing = this.messages[protoTypeName];
    if (existing) {
      return existing;
    }
    const raw = this.ds.messages[protoTypeName];
    if (!raw) {
      return undefined;
    }
    const runtime = raw.file.syntax == "proto3" ? proto3 : proto2;
    const fields: PartialFieldInfo[] = [];
    const type = runtime.makeMessageType(typeName, () => fields, {
      localName: makeTypeLocalName(raw),
    });
    this.messages[protoTypeName] = type;
    for (const field of raw.fields.map((f) => f.resolve(this.ds))) {
      const fieldInfo = makeFieldInfo(field, this);
      fields.push(fieldInfo);
    }
    return type;
  }

  /**
   * May raise an error on invalid descriptors.
   */
  findService(typeName: string): ServiceType | undefined {
    const protoTypeName = "." + typeName;
    const existing = this.services[protoTypeName];
    if (existing) {
      return existing;
    }
    const raw = this.ds.services[protoTypeName];
    if (!raw) {
      return undefined;
    }
    const methods: Record<string, MethodInfo> = {};
    for (const u of raw.methods) {
      const it = this.findMessage(u.inputTypeName);
      const ot = this.findMessage(u.outputTypeName);
      assert(it, `message "${u.inputTypeName}" for ${u.toString()} not found`);
      assert(
        ot,
        `output message "${u.outputTypeName}" for ${u.toString()} not found`
      );
      const m = {
        name: u.name,
        localName: makeMethodName(u.name),
        I: it,
        O: ot,
        kind: u.kind,
        idempotency: u.idempotency,
        options: {},
      };
      methods[m.localName] = m;
    }
    return (this.services[protoTypeName] = {
      typeName: raw.typeName,
      methods,
    });
  }
}

function makeTypeLocalName(type: UnresolvedEnum | UnresolvedMessage): string {
  const typeName = type.typeName;
  const packagePrefix = (type.file.proto.package ?? "") + ".";
  if (!typeName.startsWith(packagePrefix)) {
    return type.name;
  }
  return typeName.substring(packagePrefix.length).split(".").join("_");
}

interface Resolver {
  findEnum(typeName: string): EnumType | undefined;

  findMessage(typeName: string): MessageType | undefined;
}

type ResolvedField = ReturnType<
  Exclude<
    DescriptorSet["messages"][string],
    undefined
  >["fields"][number]["resolve"]
>;
type Map = Exclude<ResolvedField["map"], undefined>;
type UnresolvedMessage = Exclude<ResolvedField["message"], undefined>;
type UnresolvedEnum = Exclude<ResolvedField["enum"], undefined>;

function makeFieldInfo(
  field: ResolvedField,
  resolver: Resolver
): PartialFieldInfo {
  if (field.map !== undefined) {
    return makeMapFieldInfo(field, resolver);
  }
  if (field.message) {
    return makeMessageFieldInfo(field, resolver);
  }
  const fi: PartialFieldInfo = field.enum
    ? makeEnumFieldInfo(field, resolver)
    : makeScalarFieldInfo(field);
  fi.default = parseDefaultValue(field);
  return fi;
}

function makeMapFieldInfo(
  field: ResolvedField & { map: Map },
  resolver: Resolver
): PartialFieldInfo {
  const base = {
    kind: "map",
    name: field.name,
    no: field.number,
    K: field.map.key,
  } as const;
  if (field.map.value.message) {
    const messageType = resolver.findMessage(field.map.value.message.typeName);
    assert(
      messageType,
      `message "${
        field.map.value.message.typeName
      }" for ${field.toString()} not found`
    );
    return {
      ...base,
      V: {
        kind: "message",
        T: messageType,
      },
    };
  }
  if (field.map.value.enum) {
    const enumType = resolver.findEnum(field.map.value.enum.typeName);
    assert(
      enumType,
      `enum "${
        field.map.value.enum.typeName
      }" for ${field.toString()} not found`
    );
    return {
      ...base,
      V: {
        kind: "enum",
        T: enumType,
      },
    };
  }
  return {
    ...base,
    V: {
      kind: "scalar",
      T: field.map.value.scalarType,
    },
  };
}

function makeScalarFieldInfo(
  field: ResolvedField & { scalarType: ScalarType }
): PartialFieldInfo {
  const base = {
    no: field.number,
    name: field.name,
    kind: "scalar",
    T: field.scalarType,
  } as const;
  if (field.repeated) {
    return {
      ...base,
      repeated: true,
      packed: field.packed,
      oneof: undefined,
      T: field.scalarType,
    };
  }
  if (field.oneof) {
    return {
      ...base,
      oneof: field.oneof.name,
    };
  }
  if (field.optional) {
    return {
      ...base,
      opt: true,
    };
  }
  return base;
}

function makeMessageFieldInfo(
  field: ResolvedField & { message: UnresolvedMessage },
  resolver: Resolver
): PartialFieldInfo {
  const messageType = resolver.findMessage(field.message.typeName);
  assert(
    messageType,
    `message "${field.message.typeName}" for ${field.toString()} not found`
  );
  const base = {
    no: field.number,
    name: field.name,
    kind: "message",
    T: messageType,
  } as const;
  if (field.repeated) {
    return {
      ...base,
      repeated: true,
      packed: field.packed,
      oneof: undefined,
    };
  }
  if (field.oneof) {
    return {
      ...base,
      oneof: field.oneof.name,
    };
  }
  if (field.optional) {
    return {
      ...base,
      opt: true,
    };
  }
  return base;
}

function makeEnumFieldInfo(
  field: ResolvedField & { enum: UnresolvedEnum },
  resolver: Resolver
): PartialFieldInfo {
  const enumType = resolver.findEnum(field.enum.typeName);
  assert(
    enumType,
    `message "${field.enum.typeName}" for ${field.toString()} not found`
  );
  const base = {
    no: field.number,
    name: field.name,
    kind: "enum",
    T: enumType,
  } as const;
  if (field.repeated) {
    return {
      ...base,
      repeated: true,
      packed: field.packed,
      oneof: undefined,
    };
  }
  if (field.oneof) {
    return {
      ...base,
      oneof: field.oneof.name,
    };
  }
  if (field.optional) {
    return {
      ...base,
      opt: true,
    };
  }
  return base;
}

function parseDefaultValue(
  field: ResolvedField
): number | boolean | string | bigint | Uint8Array | undefined {
  const d = field.proto.defaultValue;
  if (d === undefined) {
    return undefined;
  }
  if (field.enum) {
    const enumValue = field.enum.values.find((v) => v.name === d);
    assert(enumValue, `cannot parse ${field.toString()} default value: ${d}`);
    return enumValue.number;
  }
  if (field.scalarType) {
    switch (field.scalarType) {
      case ScalarType.STRING:
        return d;
      case ScalarType.BYTES: {
        const u = unescapeBytesDefaultValue(d);
        if (u === false) {
          throw new Error(
            `cannot parse ${field.toString()} default value: ${d}`
          );
        }
        return u;
      }
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        return protoInt64.parse(d);
      case ScalarType.UINT64:
      case ScalarType.FIXED64:
        return protoInt64.uParse(d);
      case ScalarType.DOUBLE:
      case ScalarType.FLOAT:
        switch (d) {
          case "inf":
            return Number.POSITIVE_INFINITY;
          case "-inf":
            return Number.NEGATIVE_INFINITY;
          case "nan":
            return Number.NaN;
          default:
            return parseFloat(d);
        }
      case ScalarType.BOOL:
        return Boolean(d);
      case ScalarType.INT32:
      case ScalarType.UINT32:
      case ScalarType.SINT32:
      case ScalarType.FIXED32:
      case ScalarType.SFIXED32:
        return parseInt(d, 10);
    }
  }
  return undefined;
}

// unescapeBytesDefaultValue parses a text-encoded default value (proto2) of a
// BYTES field.
function unescapeBytesDefaultValue(str: string): Uint8Array | false {
  const b: number[] = [];
  const input = {
    tail: str,
    c: "",
    next(): boolean {
      if (this.tail.length == 0) {
        return false;
      }
      this.c = this.tail[0];
      this.tail = this.tail.substring(1);
      return true;
    },
    take(n: number): string | false {
      if (this.tail.length >= n) {
        const r = this.tail.substring(0, n);
        this.tail = this.tail.substring(n);
        return r;
      }
      return false;
    },
  };
  while (input.next()) {
    switch (input.c) {
      case "\\":
        if (input.next()) {
          switch (input.c as string) {
            case "\\":
              b.push(input.c.charCodeAt(0));
              break;
            case "b":
              b.push(0x08);
              break;
            case "f":
              b.push(0x0c);
              break;
            case "n":
              b.push(0x0a);
              break;
            case "r":
              b.push(0x0d);
              break;
            case "t":
              b.push(0x09);
              break;
            case "v":
              b.push(0x0b);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 8);
              if (isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "x": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "u": {
              const s = input.c;
              const t = input.take(4);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (isNaN(n)) {
                return false;
              }
              const chunk = new Uint8Array(4);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, n, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
              break;
            }
            case "U": {
              const s = input.c;
              const t = input.take(8);
              if (t === false) {
                return false;
              }
              const tc = protoInt64.uEnc(s + t);
              const chunk = new Uint8Array(8);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, tc.lo, true);
              view.setInt32(4, tc.hi, true);
              b.push(
                chunk[0],
                chunk[1],
                chunk[2],
                chunk[3],
                chunk[4],
                chunk[5],
                chunk[6],
                chunk[7]
              );
              break;
            }
          }
        }
        break;
      default:
        b.push(input.c.charCodeAt(0));
    }
  }
  return new Uint8Array(b);
}
