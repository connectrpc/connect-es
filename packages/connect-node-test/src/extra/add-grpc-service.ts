// Copyright 2021-2023 Buf Technologies, Inc.
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
import { createGrpcServiceDefinition } from "./create-grpc-definition.js";

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
  const definition = createGrpcServiceDefinition(service, binaryOptions);
  grpcServer.addService(definition, implementation);
}
