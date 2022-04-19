import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  MethodInfoBiDiStreaming,
  MethodInfoClientStreaming,
  MethodInfoServerStreaming,
  MethodInfoUnary,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type * as grpc from "@grpc/grpc-js";
import { makeGrpcServiceDefinition } from "./grpc-definitions.js";

// prettier-ignore
/**
 * GrpcServiceImplementation is identical to a generated @grpc/grpc-js
 * service interface, but derived from generated connect service
 * metadata.
 */
export type GrpcServiceImplementation<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? grpc.handleUnaryCall<I, PartialMessage<O>>
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? grpc.handleServerStreamingCall<I, PartialMessage<O>>
  : T["methods"][P] extends MethodInfoClientStreaming<infer I, infer O> ? grpc.handleClientStreamingCall<I, PartialMessage<O>>
  : T["methods"][P] extends MethodInfoBiDiStreaming<infer I, infer O>   ? grpc.handleBidiStreamingCall<I, PartialMessage<O>>
  : never;
};

/**
 * addGrpcService adds the provided service implementation to the
 * provided @grpc/grpc-js server.
 */
export function addGrpcService<T extends ServiceType>(
  grpcServer: grpc.Server,
  service: T,
  implementation: GrpcServiceImplementation<T>,
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>
): void {
  const definition = makeGrpcServiceDefinition(service, binaryOptions);
  grpcServer.addService(definition, implementation);
}
