import {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  MethodKind,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type * as grpc from "@grpc/grpc-js";

/**
 * Create service definition for @grpc/grpc-js from generated connect
 * service metadata.
 *
 * The result is identical to a generated @grpc/grpc-js
 * client.
 */
export function createGrpcMethodDefinitions<T extends ServiceType>(
  service: T,
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>
): Record<string, grpc.MethodDefinition<AnyMessage, AnyMessage>> {
  const def: Record<string, grpc.MethodDefinition<AnyMessage, AnyMessage>> = {};
  for (const localName of Object.keys(service.methods)) {
    def[localName] = createGrpcMethodDefinition(
      service,
      localName,
      binaryOptions
    );
  }
  return def;
}

/**
 * Create a method definition for @grpc/grpc-js from generated connect
 * service metadata.
 */
export function createGrpcMethodDefinition<
  T extends ServiceType,
  M extends keyof T["methods"]
>(
  service: T,
  methodLocalName: M,
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>
): grpc.MethodDefinition<AnyMessage, AnyMessage> {
  const info = service.methods[methodLocalName as string];
  return {
    path: `/${service.typeName}/${info.name}`,
    originalName: info.name,
    requestStream:
      info.kind === MethodKind.ClientStreaming ||
      info.kind === MethodKind.BiDiStreaming,
    responseStream:
      info.kind === MethodKind.ServerStreaming ||
      info.kind === MethodKind.BiDiStreaming,
    requestSerialize(value: AnyMessage | PartialMessage<AnyMessage>): Buffer {
      const message = value instanceof info.I ? value : new info.I(value);
      const bytes = message.toBinary(binaryOptions);
      return Buffer.from(bytes);
    },
    requestDeserialize(bytes: Buffer): AnyMessage {
      return info.I.fromBinary(bytes, binaryOptions);
    },
    responseSerialize(value: AnyMessage | PartialMessage<AnyMessage>): Buffer {
      const message = value instanceof info.O ? value : new info.O(value);
      const bytes = message.toBinary(binaryOptions);
      return Buffer.from(bytes);
    },
    responseDeserialize(bytes: Buffer): AnyMessage {
      return info.O.fromBinary(bytes, binaryOptions);
    },
  };
}
