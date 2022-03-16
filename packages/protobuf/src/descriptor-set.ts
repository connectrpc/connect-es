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
  DescriptorProto,
  EnumDescriptorProto,
  EnumValueDescriptorProto,
  FieldDescriptorProto,
  OneofDescriptorProto,
} from "./google/protobuf/descriptor_pb.js";
import {
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FileDescriptorProto,
  MethodDescriptorProto,
  MethodOptions_IdempotencyLevel,
  ServiceDescriptorProto,
} from "./google/protobuf/descriptor_pb.js";
import { assert } from "./private/assert.js";
import { ScalarType } from "./field.js";
import { MethodIdempotency, MethodKind } from "./service-type.js";

/**
 * DescriptorSet wraps a set of google.protobuf.FileDescriptorProto,
 * asserting basic expectations and providing hierarchical information.
 *
 * Note that all types are kept by their fully qualified type name
 * with a leading dot.
 */
export class DescriptorSet implements UnresolvedSet {
  readonly enums: Record<string, UnresolvedEnum | undefined> = {};
  readonly messages: Record<string, UnresolvedMessage | undefined> = {};
  readonly services: Record<string, UnresolvedService | undefined> = {};

  /**
   * May raise an error on invalid descriptors.
   */
  add(...files: FileDescriptorProto[]): void {
    for (const file of files) {
      newFile(file, this);
    }
  }

  listEnums(): UnresolvedEnum[] {
    return Object.values(this.enums).filter(isDefined);
  }

  listMessages(): UnresolvedMessage[] {
    return Object.values(this.messages).filter(isDefined);
  }

  listServices(): UnresolvedService[] {
    return Object.values(this.services).filter(isDefined);
  }
}

function isDefined<T>(v: T | undefined): v is T {
  return v !== undefined;
}

interface UnresolvedSet {
  readonly enums: Record<string, UnresolvedEnum | undefined>;
  readonly messages: Record<string, UnresolvedMessage | undefined>;
  readonly services: Record<string, UnresolvedService | undefined>;
}

const fieldTypeToScalarType: Record<
  FieldDescriptorProto_Type,
  ScalarType | undefined
> = {
  [FieldDescriptorProto_Type.DOUBLE]: ScalarType.DOUBLE,
  [FieldDescriptorProto_Type.FLOAT]: ScalarType.FLOAT,
  [FieldDescriptorProto_Type.INT64]: ScalarType.INT64,
  [FieldDescriptorProto_Type.UINT64]: ScalarType.UINT64,
  [FieldDescriptorProto_Type.INT32]: ScalarType.INT32,
  [FieldDescriptorProto_Type.FIXED64]: ScalarType.FIXED64,
  [FieldDescriptorProto_Type.FIXED32]: ScalarType.FIXED32,
  [FieldDescriptorProto_Type.BOOL]: ScalarType.BOOL,
  [FieldDescriptorProto_Type.STRING]: ScalarType.STRING,
  [FieldDescriptorProto_Type.GROUP]: undefined,
  [FieldDescriptorProto_Type.MESSAGE]: undefined,
  [FieldDescriptorProto_Type.BYTES]: ScalarType.BYTES,
  [FieldDescriptorProto_Type.UINT32]: ScalarType.UINT32,
  [FieldDescriptorProto_Type.ENUM]: undefined,
  [FieldDescriptorProto_Type.SFIXED32]: ScalarType.SFIXED32,
  [FieldDescriptorProto_Type.SFIXED64]: ScalarType.SFIXED64,
  [FieldDescriptorProto_Type.SINT32]: ScalarType.SINT32,
  [FieldDescriptorProto_Type.SINT64]: ScalarType.SINT64,
};

interface File {
  readonly proto: FileDescriptorProto;
  readonly syntax: "proto3" | "proto2";
  readonly name: string; // name of the file, excluding the .proto suffix
  toString(): string;
}

function newFile(proto: FileDescriptorProto, ds: UnresolvedSet): File {
  assert(proto.name, `missing file descriptor name`);
  if (proto.syntax !== undefined && proto.syntax !== "proto3") {
    throw new Error(`invalid descriptor: unsupported syntax: ${proto.syntax}`);
  }
  const file: File = {
    proto,
    syntax: proto.syntax === "proto3" ? "proto3" : "proto2",
    name: proto.name.endsWith(".proto")
      ? proto.name.substring(-".proto".length)
      : proto.name,
    toString(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
      return `file ${this.proto.name}`;
    },
  };
  for (const messageType of proto.messageType) {
    newMessage(messageType, undefined, file, ds);
  }
  for (const enumType of proto.enumType) {
    newEnum(enumType, undefined, file, ds);
  }
  for (const extension of proto.extension) {
    newExtension(extension, undefined, file, ds);
  }
  for (const service of proto.service) {
    newService(service, file, ds);
  }
  return file;
}

interface UnresolvedEnum {
  readonly proto: EnumDescriptorProto;
  readonly file: File;
  readonly parent: UnresolvedMessage | undefined;
  readonly name: string;
  readonly typeName: string; // fully qualified type name
  readonly protoTypeName: string; // fully qualified name with a leading dot
  readonly values: UnresolvedEnumValue[];

  toString(): string;
}

function newEnum(
  proto: EnumDescriptorProto,
  parent: UnresolvedMessage | undefined,
  file: File,
  us: UnresolvedSet
): UnresolvedEnum {
  assert(proto.name, `invalid descriptor: missing enum descriptor name`);
  let protoTypeName: string;
  if (parent) {
    protoTypeName = `${parent.protoTypeName}.${proto.name}`;
  } else if (file.proto.package !== undefined) {
    protoTypeName = `.${file.proto.package}.${proto.name}`;
  } else {
    protoTypeName = `.${proto.name}`;
  }
  const values: UnresolvedEnumValue[] = [];
  const enumT = {
    proto,
    file,
    parent,
    name: proto.name,
    protoTypeName,
    typeName: protoTypeName.startsWith(".")
      ? protoTypeName.substring(1)
      : protoTypeName,
    values,
    toString(): string {
      return `enum ${this.typeName}`;
    },
  };
  us.enums[enumT.protoTypeName] = enumT;
  for (const value of proto.value) {
    values.push(newEnumValue(value, enumT));
  }
  return enumT;
}

interface UnresolvedEnumValue {
  readonly proto: EnumValueDescriptorProto;
  readonly parent: UnresolvedEnum;
  readonly name: string;
  readonly number: number;

  toString(): string;
}

function newEnumValue(
  proto: EnumValueDescriptorProto,
  parent: UnresolvedEnum
): UnresolvedEnumValue {
  assert(proto.name, `invalid descriptor: missing enum value descriptor name`);
  assert(
    proto.number !== undefined,
    `invalid descriptor: missing enum value descriptor number`
  );
  return {
    proto,
    name: proto.name,
    number: proto.number,
    parent,
    toString(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
      return `enum value ${this.parent.typeName}.${this.proto.name}`;
    },
  };
}

interface UnresolvedMessage {
  readonly proto: DescriptorProto;
  readonly file: File;
  readonly parent: UnresolvedMessage | undefined;
  readonly name: string;
  readonly typeName: string; // fully qualified type name
  readonly protoTypeName: string; // fully qualified name with a leading dot
  readonly fields: UnresolvedField[];
  readonly oneofs: UnresolvedOneof[]; // excluding synthetic oneofs for proto3 optional
  readonly nestedEnums: UnresolvedEnum[];
  readonly nestedMessages: UnresolvedMessage[]; // excluding synthetic messages like map entries
  readonly nestedExtensions: UnresolvedExtension[];

  toString(): string;
}

function newMessage(
  proto: DescriptorProto,
  parent: UnresolvedMessage | undefined,
  file: File,
  us: UnresolvedSet
): UnresolvedMessage {
  assert(proto.name, `invalid descriptor: missing name`);
  const nestedMessages: UnresolvedMessage[] = [];
  const fields: UnresolvedField[] = [];
  const oneofs: UnresolvedOneof[] = [];
  const nestedEnums: UnresolvedEnum[] = [];
  const nestedExtensions: UnresolvedExtension[] = [];
  let protoTypeName: string;
  if (parent) {
    protoTypeName = `${parent.protoTypeName}.${proto.name}`;
  } else if (file.proto.package !== undefined) {
    protoTypeName = `.${file.proto.package}.${proto.name}`;
  } else {
    protoTypeName = `.${proto.name}`;
  }
  const message = {
    proto,
    file,
    parent,
    name: proto.name,
    typeName: protoTypeName.startsWith(".")
      ? protoTypeName.substring(1)
      : protoTypeName,
    protoTypeName,
    fields,
    oneofs,
    nestedEnums,
    nestedMessages,
    nestedExtensions,
    toString(): string {
      return `message ${this.typeName}`;
    },
  };
  us.messages[message.protoTypeName] = message;
  for (const nestedType of proto.nestedType) {
    nestedMessages.push(newMessage(nestedType, message, file, us));
  }
  for (const oneofDecl of proto.oneofDecl) {
    oneofs.push(newOneof(oneofDecl, message, file));
  }
  for (const field of proto.field) {
    let oneof: UnresolvedOneof | undefined = undefined;
    if (field.oneofIndex !== undefined) {
      oneof = oneofs[field.oneofIndex];
      assert(
        oneof,
        `invalid descriptor: oneof declaration index ${
          field.oneofIndex
        } specified by field #${field.number ?? -1} not found`
      );
    }
    fields.push(newField(field, message, oneof));
  }
  for (const enumType of proto.enumType) {
    nestedEnums.push(newEnum(enumType, message, file, us));
  }
  for (const extension of proto.extension) {
    nestedExtensions.push(newExtension(extension, message, file, us));
  }
  return message;
}

interface UnresolvedField {
  readonly proto: FieldDescriptorProto;
  readonly number: number;
  readonly name: string;
  readonly type: FieldDescriptorProto_Type;
  readonly parent: UnresolvedMessage;
  readonly oneof: UnresolvedOneof | undefined;
  readonly optional: boolean; // whether the field is optional, regardless of syntax
  readonly packed: boolean; // pack this repeated field? true in case of `[packed = true]` and if packed by default because of proto3 semantics
  toString(): string;

  resolve(us: UnresolvedSet): ResolvedField;
}

function newField(
  proto: FieldDescriptorProto,
  parent: UnresolvedMessage,
  oneof: UnresolvedOneof | undefined
): UnresolvedField {
  assert(proto.name, `invalid descriptor: missing name`);
  assert(proto.number, `invalid descriptor: missing number`);
  assert(proto.type, `invalid descriptor: missing type`);
  let optional = false;
  let packed = proto.options?.packed === true;
  switch (parent.file.syntax) {
    case "proto2":
      optional =
        oneof === undefined &&
        proto.label === FieldDescriptorProto_Label.OPTIONAL;
      break;
    case "proto3":
      optional = proto.proto3Optional === true;
      switch (proto.type) {
        case FieldDescriptorProto_Type.DOUBLE:
        case FieldDescriptorProto_Type.FLOAT:
        case FieldDescriptorProto_Type.INT64:
        case FieldDescriptorProto_Type.UINT64:
        case FieldDescriptorProto_Type.INT32:
        case FieldDescriptorProto_Type.FIXED64:
        case FieldDescriptorProto_Type.FIXED32:
        case FieldDescriptorProto_Type.UINT32:
        case FieldDescriptorProto_Type.SFIXED32:
        case FieldDescriptorProto_Type.SFIXED64:
        case FieldDescriptorProto_Type.SINT32:
        case FieldDescriptorProto_Type.SINT64:
        case FieldDescriptorProto_Type.BOOL:
        case FieldDescriptorProto_Type.ENUM:
          // From the proto3 language guide:
          // > In proto3, repeated fields of scalar numeric types are packed by default.
          // This information is incomplete - according to the conformance tests, BOOL
          // and ENUM are packed by default as well. This means only STRING and BYTES
          // are not packed by default, which makes sense because they are length-delimited.
          packed = true;
          break;
        case FieldDescriptorProto_Type.STRING:
        case FieldDescriptorProto_Type.GROUP:
        case FieldDescriptorProto_Type.MESSAGE:
        case FieldDescriptorProto_Type.BYTES:
          assert(
            !packed,
            `invalid descriptor: ${
              FieldDescriptorProto_Type[proto.type]
            } cannot be packed`
          );
          break;
      }
      break;
  }
  const field: UnresolvedField = {
    proto,
    name: proto.name,
    number: proto.number,
    type: proto.type,
    parent,
    oneof: proto.proto3Optional === true ? undefined : oneof,
    optional,
    packed,
    toString(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
      return `field ${parent.typeName}.${proto.name}`;
    },
    resolve(us: UnresolvedSet): ResolvedField {
      return resolveField(this, us);
    },
  };
  if (oneof) {
    oneof.fields.push(field);
  }
  return field;
}

type ResolvedField =
  | (UnresolvedField & {
      repeated: boolean;
      readonly scalarType: ScalarType;
      readonly message: undefined;
      readonly enum: undefined;
      readonly map: undefined;
    })
  | (UnresolvedField & {
      repeated: boolean;
      readonly scalarType: undefined;
      readonly message: UnresolvedMessage;
      readonly enum: undefined;
      readonly map: undefined;
    })
  | (UnresolvedField & {
      repeated: boolean;
      readonly scalarType: undefined;
      readonly message: undefined;
      readonly enum: UnresolvedEnum;
      readonly map: undefined;
    })
  | (UnresolvedField & {
      repeated: false;
      readonly scalarType: undefined;
      readonly message: undefined;
      readonly enum: undefined;
      readonly map: Map;
    });

type Map = {
  key: Exclude<
    ScalarType,
    ScalarType.FLOAT | ScalarType.DOUBLE | ScalarType.BYTES
  >;
  value:
    | { enum: UnresolvedEnum; message: undefined; scalar: undefined }
    | { enum: undefined; message: UnresolvedMessage; scalar: undefined }
    | { enum: undefined; message: undefined; scalarType: ScalarType };
};

function resolveField(u: UnresolvedField, us: UnresolvedSet): ResolvedField {
  const repeated = u.proto.label === FieldDescriptorProto_Label.REPEATED;
  switch (u.type) {
    case FieldDescriptorProto_Type.MESSAGE:
    case FieldDescriptorProto_Type.GROUP: {
      assert(
        u.proto.typeName,
        `invalid descriptor: ${u.toString()} has type ${
          FieldDescriptorProto_Type[u.type]
        }, but type_name is unset`
      );
      const refMessage = us.messages[u.proto.typeName];
      assert(
        refMessage,
        `invalid descriptor: cannot find type_name "${
          u.proto.typeName
        }" specified by ${u.toString()}`
      );
      if (refMessage.proto.options?.mapEntry !== undefined) {
        return {
          ...u,
          repeated: false,
          scalarType: undefined,
          message: undefined,
          enum: undefined,
          map: resolveMap(refMessage, us),
        };
      }
      return {
        ...u,
        repeated,
        scalarType: undefined,
        message: refMessage,
        enum: undefined,
        map: undefined,
      };
    }
    case FieldDescriptorProto_Type.ENUM: {
      assert(
        u.proto.typeName,
        `invalid descriptor: ${u.toString()} has type ${
          FieldDescriptorProto_Type[u.type]
        }, but type_name is unset`
      );
      const refEnum = us.enums[u.proto.typeName];
      assert(
        refEnum,
        `invalid descriptor: cannot find type_name "${
          u.proto.typeName
        }" specified by ${u.toString()}`
      );
      return {
        ...u,
        repeated,
        scalarType: undefined,
        message: undefined,
        enum: refEnum,
        map: undefined,
      };
    }
    default: {
      const scalarType = fieldTypeToScalarType[u.type];
      assert(
        scalarType,
        `invalid descriptor: unable to convert google.protobuf.FieldDescriptorProto.Type ${
          FieldDescriptorProto_Type[u.type]
        } to ScalarType`
      );
      return {
        ...u,
        repeated,
        scalarType,
        message: undefined,
        enum: undefined,
        map: undefined,
      };
    }
  }
}

function resolveMap(mapEntry: UnresolvedMessage, us: UnresolvedSet): Map {
  assert(
    mapEntry.proto.options?.mapEntry,
    `invalid descriptor: expected ${mapEntry.toString()} to be a map entry`
  );
  assert(
    mapEntry.fields.length === 2,
    `invalid descriptor: map entry ${mapEntry.toString()} has ${
      mapEntry.fields.length
    } fields`
  );
  const uKeyField = mapEntry.fields.find((f) => f.proto.number === 1);
  assert(
    uKeyField,
    `invalid descriptor: map entry ${mapEntry.toString()} is missing key field`
  );
  const keyField = resolveField(uKeyField, us);
  assert(
    keyField.scalarType !== undefined &&
      keyField.scalarType !== ScalarType.BYTES &&
      keyField.scalarType !== ScalarType.FLOAT &&
      keyField.scalarType !== ScalarType.DOUBLE,
    `invalid descriptor: map entry ${mapEntry.toString()} has unexpected key type ${
      FieldDescriptorProto_Type[keyField.type]
    }`
  );
  const uValueField = mapEntry.fields.find((f) => f.proto.number === 2);
  assert(
    uValueField,
    `invalid descriptor: map entry ${mapEntry.toString()} is missing value field`
  );
  const valueField = resolveField(uValueField, us);
  if (valueField.scalarType !== undefined) {
    return {
      key: keyField.scalarType,
      value: {
        scalarType: valueField.scalarType,
        enum: undefined,
        message: undefined,
      },
    };
  }
  if (valueField.enum !== undefined) {
    return {
      key: keyField.scalarType,
      value: { scalar: undefined, enum: valueField.enum, message: undefined },
    };
  }
  if (valueField.message !== undefined) {
    return {
      key: keyField.scalarType,
      value: {
        scalar: undefined,
        enum: undefined,
        message: valueField.message,
      },
    };
  }
  throw new Error(
    `invalid descriptor: map entry ${mapEntry.toString()} has unexpected value type ${
      FieldDescriptorProto_Type[keyField.type]
    }`
  );
}

interface UnresolvedOneof {
  readonly proto: OneofDescriptorProto;
  readonly name: string;
  readonly parent: UnresolvedMessage;
  readonly file: File;
  readonly fields: UnresolvedField[];

  toString(): string;
}

function newOneof(
  proto: OneofDescriptorProto,
  parent: UnresolvedMessage,
  file: File
): UnresolvedOneof {
  assert(proto.name, `invalid descriptor: missing oneof descriptor name`);
  return {
    proto,
    parent,
    file,
    fields: [],
    name: proto.name,
    toString(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
      return `oneof ${parent.typeName}.${proto.name}`;
    },
  };
}

interface UnresolvedExtension {
  readonly proto: FieldDescriptorProto;
  readonly parent: UnresolvedMessage | undefined;
  readonly file: File;
}

function newExtension(
  proto: FieldDescriptorProto,
  parent: UnresolvedMessage | undefined,
  file: File,
  us: UnresolvedSet // eslint-disable-line @typescript-eslint/no-unused-vars
): UnresolvedExtension {
  assert(proto.name, `invalid descriptor: missing field descriptor name`);
  return {
    proto,
    file,
    parent,
  };
}

interface UnresolvedService {
  readonly proto: ServiceDescriptorProto;
  readonly file: File;
  readonly methods: UnresolvedMethod[];
  readonly typeName: string;
  readonly protoTypeName: string;
  toString(): string;
}

function newService(
  proto: ServiceDescriptorProto,
  file: File,
  us: UnresolvedSet
): UnresolvedService {
  assert(proto.name, `invalid descriptor: missing service descriptor name`);
  let protoTypeName: string;
  if (file.proto.package !== undefined) {
    protoTypeName = `.${file.proto.package}.${proto.name}`;
  } else {
    protoTypeName = `.${proto.name}`;
  }
  const methods: UnresolvedMethod[] = [];
  const service: UnresolvedService = {
    proto,
    file,
    typeName: protoTypeName.startsWith(".")
      ? protoTypeName.substring(1)
      : protoTypeName,
    protoTypeName,
    methods,
    toString(): string {
      return `service ${this.typeName}`;
    },
  };
  for (const method of proto.method) {
    methods.push(newMethod(method, service));
  }
  us.services[service.protoTypeName] = service;
  return service;
}

interface UnresolvedMethod {
  readonly proto: MethodDescriptorProto;
  readonly parent: UnresolvedService;
  readonly name: string;
  readonly kind: MethodKind;
  readonly inputTypeName: string;
  readonly outputTypeName: string;
  readonly idempotency?: MethodIdempotency;
  toString(): string;
}

function newMethod(
  proto: MethodDescriptorProto,
  parent: UnresolvedService
): UnresolvedMethod {
  assert(proto.name, `invalid descriptor: missing method descriptor name`);
  assert(proto.inputType, `invalid descriptor: missing method input type`);
  assert(proto.outputType, `invalid descriptor: missing method output type`);
  let kind: MethodKind;
  if (proto.clientStreaming === true && proto.serverStreaming === true) {
    kind = MethodKind.BiDiStreaming;
  } else if (proto.clientStreaming === true) {
    kind = MethodKind.ClientStreaming;
  } else if (proto.serverStreaming === true) {
    kind = MethodKind.ServerStreaming;
  } else {
    kind = MethodKind.Unary;
  }
  let idempotency: MethodIdempotency | undefined;
  switch (proto.options?.idempotencyLevel) {
    case MethodOptions_IdempotencyLevel.IDEMPOTENT:
      idempotency = MethodIdempotency.Idempotent;
      break;
    case MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS:
      idempotency = MethodIdempotency.NoSideEffects;
      break;
    case MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN:
    case undefined:
      idempotency = undefined;
      break;
  }
  const inputTypeName = proto.inputType.startsWith(".")
    ? proto.inputType.substring(1)
    : proto.inputType;
  const outputTypeName = proto.outputType.startsWith(".")
    ? proto.outputType.substring(1)
    : proto.outputType;
  return {
    proto,
    parent,
    name: proto.name,
    kind,
    idempotency,
    inputTypeName,
    outputTypeName,
    toString(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
      return `rpc ${this.parent.typeName}.${proto.name}`;
    },
  };
}
