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
  AnyMessage,
  Message,
  MessageType,
  MethodIdempotency,
  MethodInfo,
  MethodKind,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { Code, ConnectError } from "@bufbuild/connect-core";

// prettier-ignore
/**
 * ServiceImpl is the interface of the implementation of a service.
 */
export type ServiceImpl<T extends ServiceType> = {
  [P in keyof T["methods"]]: MethodImpl<T["methods"][P]>;
};

/**
 * unimplementService() takes a partial service implementation,
 * and adds a method that throws a ConnectError with code unimplemented
 * for every missing method implementation.
 */
export function unimplementService<T extends ServiceType>(
  service: T,
  partialImp: Partial<ServiceImpl<T>>
): ServiceImpl<T> {
  const impl = partialImp as Record<string, MethodImpl<MethodInfo>>;
  for (const [localName, methodInfo] of Object.entries(service.methods)) {
    if (typeof impl[localName] != "function") {
      impl[localName] = () => {
        throw new ConnectError(
          `${service.typeName}.${methodInfo.name} is not implemented`,
          Code.Unimplemented
        );
      };
    }
  }
  return impl as ServiceImpl<T>;
}

// prettier-ignore
/**
 * MethodImpl is the signature of the implementation of an RPC.
 */
export type MethodImpl<M extends MI> =
    M extends MI<infer I, infer O, MethodKind.Unary>           ? UnaryImpl<I, O>
  : M extends MI<infer I, infer O, MethodKind.ServerStreaming> ? ServerStreamingImpl<I, O>
  : M extends MI<infer I, infer O, MethodKind.ClientStreaming> ? ClientStreamingImpl<I, O>
  : M extends MI<infer I, infer O, MethodKind.BiDiStreaming>   ? BiDiStreamingImpl<I, O>
  : never;

interface MI<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage,
  K extends MethodKind = MethodKind
> {
  readonly kind: K;
  readonly name: string;
  readonly I: MessageType<I>;
  readonly O: MessageType<O>;
  readonly idempotency?: MethodIdempotency;
}

// TODO document
export interface HandlerContext {
  method: MethodInfo;
  service: ServiceType;
  requestHeader: Headers;
  responseHeader: Headers;
  responseTrailer: Headers;
}

/**
 * UnaryImp is the signature of the implementation of a unary RPC.
 */
export type UnaryImpl<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => Promise<O> | Promise<PartialMessage<O>> | O | PartialMessage<O>;

/**
 * ClientStreamingImpl is the signature of the implementation of a
 * client-streaming RPC.
 */
export type ClientStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => Promise<O> | Promise<PartialMessage<O>>;

/**
 * ServerStreamingImpl is the signature of the implementation of a
 * server-streaming RPC.
 */
export type ServerStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => AsyncIterable<O> | AsyncIterable<PartialMessage<O>>;

/**
 * BiDiStreamingImpl is the signature of the implementation of a bi-di
 * streaming RPC.
 */
export type BiDiStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => AsyncIterable<O> | AsyncIterable<PartialMessage<O>>;
