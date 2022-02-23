export { proto3 } from "./proto3.js";
export { proto2 } from "./proto2.js";
export { protoInt64 } from "./proto-int64.js";

export {
  Message,
  DynamicMessage,
  PartialMessage,
  PlainMessage,
} from "./message.js";

export type { FieldInfo } from "./field.js";
export type { FieldList } from "./field-list.js";
export { ScalarType } from "./field.js";

export type { MessageType } from "./message-type.js";
export type { EnumType, EnumValueInfo } from "./enum.js";
export type {
  ServiceType,
  MethodInfo,
  MethodInfoUnary,
  MethodInfoServerStreaming,
  MethodInfoClientStreaming,
  MethodInfoBiDiStreaming,
} from "./service-type.js";
export { MethodKind, MethodIdempotency } from "./service-type.js";
export { TypeRegistry, IMessageTypeRegistry } from "./type-registry.js";
export { DescriptorRegistry } from "./descriptor-registry.js";
export { DescriptorSet } from "./descriptor-set.js";

export { WireType, BinaryWriter, BinaryReader } from "./binary-encoding.js";
export type { IBinaryReader, IBinaryWriter } from "./binary-encoding.js";
export type {
  BinaryFormat,
  BinaryWriteOptions,
  BinaryReadOptions,
} from "./binary-format.js";

export {
  JsonFormat,
  JsonObject,
  JsonValue,
  JsonReadOptions,
  JsonWriteOptions,
  JsonWriteStringOptions,
} from "./json-format.js";

// ideally, we would export these types with sub-path exports:
export * from "./google/protobuf/compiler/plugin_pb.js";
export * from "./google/protobuf/api_pb.js";
export * from "./google/protobuf/any_pb.js";
export * from "./google/protobuf/descriptor_pb.js";
export * from "./google/protobuf/duration_pb.js";
export * from "./google/protobuf/empty_pb.js";
export * from "./google/protobuf/field_mask_pb.js";
export * from "./google/protobuf/source_context_pb.js";
export * from "./google/protobuf/struct_pb.js";
export * from "./google/protobuf/timestamp_pb.js";
export * from "./google/protobuf/type_pb.js";
export * from "./google/protobuf/wrappers_pb.js";
