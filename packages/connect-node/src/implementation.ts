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
  AnyMessage,
  MessageType,
  MethodIdempotency,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { MethodKind, Message } from "@bufbuild/protobuf";
import { Code, ConnectError } from "@bufbuild/connect-core";
import type { AsyncIterableTransform } from "@bufbuild/connect-core";

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
  readonly method: MethodInfo;
  readonly service: ServiceType;
  readonly requestHeader: Headers;
  readonly responseHeader: Headers;
  readonly responseTrailer: Headers;
}

// TODO document
export function createHandlerContext(
  spec: { service: ServiceType; method: MethodInfo },
  requestHeader: HeadersInit,
  responseHeader: HeadersInit,
  responseTrailer?: HeadersInit
): HandlerContext {
  return {
    method: spec.method,
    service: spec.service,
    requestHeader: new Headers(requestHeader),
    responseHeader: new Headers(responseHeader),
    responseTrailer: new Headers(responseTrailer),
  };
}

/**
 * UnaryImp is the signature of the implementation of a unary RPC.
 */
export type UnaryImpl<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => Promise<O | PartialMessage<O>> | O | PartialMessage<O>;

/**
 * ClientStreamingImpl is the signature of the implementation of a
 * client-streaming RPC.
 */
export type ClientStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => Promise<O | PartialMessage<O>>;

/**
 * ServerStreamingImpl is the signature of the implementation of a
 * server-streaming RPC.
 */
export type ServerStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => AsyncIterable<O | PartialMessage<O>>;

/**
 * BiDiStreamingImpl is the signature of the implementation of a bi-di
 * streaming RPC.
 */
export type BiDiStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => AsyncIterable<O | PartialMessage<O>>;

// prettier-ignore
/**
 * ImplSpec wraps a user-provided implementation along with service and method
 * metadata in a discriminated union type.
 */
export type ImplSpec<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage> =
  {
    service: ServiceType;
    method: MethodInfo<I, O>;
  }
  & (
  | { kind: MethodKind.Unary; impl: UnaryImpl<I, O> }
  | { kind: MethodKind.ServerStreaming; impl: ServerStreamingImpl<I, O> }
  | { kind: MethodKind.ClientStreaming; impl: ClientStreamingImpl<I, O> }
  | { kind: MethodKind.BiDiStreaming; impl: BiDiStreamingImpl<I, O> }
  );

/**
 * Create an ImplSpec - a user-provided implementation for a method, wrapped in
 * a discriminated union type along with service and method metadata.
 */
export function createImplSpec<M extends MethodInfo>(
  service: ServiceType,
  method: M,
  impl: MethodImpl<M>
): ImplSpec {
  return {
    kind: method.kind,
    service,
    method,
    impl,
  } as ImplSpec;
}

/**
 * Return an AsyncIterableTransform that invokes a user-provided implementation,
 * giving it input from an asynchronous iterable, and returning its output as an
 * asynchronous iterable.
 */
export function transformInvokeImplementation<
  I extends Message<I>,
  O extends Message<O>
>(spec: ImplSpec<I, O>, context: HandlerContext): AsyncIterableTransform<I, O> {
  function normalizeOutput(message: O | PartialMessage<O>) {
    if (message instanceof Message) {
      return message;
    }
    try {
      return new spec.method.O(message);
    } catch (e) {
      throw new ConnectError(
        `failed to normalize message ${spec.method.O.typeName}`,
        Code.Internal,
        undefined,
        undefined,
        e
      );
    }
  }
  switch (spec.kind) {
    case MethodKind.Unary:
      return async function* unary(input: AsyncIterable<I>) {
        const inputIt = input[Symbol.asyncIterator]();
        const input1 = await inputIt.next();
        if (input1.done === true) {
          throw new ConnectError(
            "protocol error: missing input message for unary method",
            Code.InvalidArgument
          );
        }
        yield normalizeOutput(await spec.impl(input1.value, context));
        const input2 = await inputIt.next();
        if (input2.done !== true) {
          throw new ConnectError(
            "protocol error: received extra input message for unary method",
            Code.InvalidArgument
          );
        }
      };
    case MethodKind.ServerStreaming: {
      return async function* serverStreaming(input: AsyncIterable<I>) {
        const inputIt = input[Symbol.asyncIterator]();
        const input1 = await inputIt.next();
        if (input1.done === true) {
          throw new ConnectError(
            "protocol error: missing input message for server-streaming method",
            Code.InvalidArgument
          );
        }
        for await (const o of spec.impl(input1.value, context)) {
          yield normalizeOutput(o);
        }
        const input2 = await inputIt.next();
        if (input2.done !== true) {
          throw new ConnectError(
            "protocol error: received extra input message for server-streaming method",
            Code.InvalidArgument
          );
        }
      };
    }
    case MethodKind.ClientStreaming: {
      return async function* clientStreaming(input: AsyncIterable<I>) {
        yield normalizeOutput(await spec.impl(input, context));
      };
    }
    case MethodKind.BiDiStreaming:
      return async function* biDiStreaming(input: AsyncIterable<I>) {
        for await (const o of spec.impl(input, context)) {
          yield normalizeOutput(o);
        }
      };
  }
}
