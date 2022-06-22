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
  BinaryReadOptions,
  BinaryWriteOptions,
  Message,
  MethodInfoBiDiStreaming,
  MethodInfoClientStreaming,
  MethodInfoServerStreaming,
  MethodInfoUnary,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import * as grpc from "@grpc/grpc-js";
import { makeGrpcServiceDefinition } from "./make-grpc-definition.nodeonly.js";

// prettier-ignore
/**
 * GrpcClient is identical to a generated @grpc/grpc-js client.
 */
export type GrpcClient<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? C<I, O>["unary"]
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? C<I, O>["serverStream"]
  : T["methods"][P] extends MethodInfoClientStreaming<infer I, infer O> ? C<I, O>["clientStream"]
  : T["methods"][P] extends MethodInfoBiDiStreaming<infer I, infer O>   ? C<I, O>["bidi"]
  : never;
};

/**
 * makeGrpcClient() creates a @grpc/grpc-js client from generated connect
 * service metadata. It is identical to a generated @grpc/grpc-js
 * client.
 */
export function makeGrpcClient<T extends ServiceType>(
  service: T,
  options: MakeGrpcClientOptions
): GrpcClient<T> {
  const grpcDefinitions = makeGrpcServiceDefinition(
    service,
    options.binaryOptions
  );
  const grpcClientCtor = grpc.makeGenericClientConstructor(
    grpcDefinitions,
    service.typeName
  );
  const grpcClient = new grpcClientCtor(
    options.address,
    options.channelCredentials,
    options.clientOptions
  ) as unknown;
  return grpcClient as GrpcClient<T>;
}

export interface MakeGrpcClientOptions {
  address: string;
  channelCredentials: grpc.ChannelCredentials;
  clientOptions?: grpc.ClientOptions;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

// prettier-ignore
/**
 * This interface contains a method signature for each method kind, matching
 * the method signature of a @grpc/grpc-js client.
 */
interface C<I extends Message<I>, O extends Message<O>> extends grpc.Client {
  unary(argument: PartialMessage<I>, callback: grpc.requestCallback<O>): grpc.ClientUnaryCall;
  unary(argument: PartialMessage<I>, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<O>): grpc.ClientUnaryCall;
  unary(argument: PartialMessage<I>, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<O>): grpc.ClientUnaryCall;
  serverStream(argument: PartialMessage<I>, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<O>;
  serverStream(argument: PartialMessage<I>, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<O>;
  clientStream(callback: grpc.requestCallback<O>): grpc.ClientWritableStream<I>;
  clientStream(metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<O>): grpc.ClientWritableStream<I>;
  clientStream(metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<O>): grpc.ClientWritableStream<I>;
  bidi(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<I, O>;
  bidi(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<I, O>;
}
