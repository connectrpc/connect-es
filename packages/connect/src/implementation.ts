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
  Message,
  MessageType,
  MethodIdempotency,
  MethodInfo,
  MethodKind,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import { createLinkedAbortController } from "./protocol/linked-abort-controller.js";

// prettier-ignore
/**
 * ServiceImpl is the interface of the implementation of a service.
 */
export type ServiceImpl<T extends ServiceType> = {
  [P in keyof T["methods"]]: MethodImpl<T["methods"][P]>;
};

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

/**
 * Context for an RPC on the server. Every RPC implementation can accept a
 * HandlerContext as an argument to gain access to headers and service metadata.
 */
export interface HandlerContext {
  /**
   * Metadata for the method being called.
   */
  readonly method: MethodInfo;

  /**
   * Metadata for the service being called.
   */
  readonly service: ServiceType;

  /**
   * An AbortSignal to know when the connection with the client is closed.
   */
  readonly signal: AbortSignal;

  /**
   * Incoming request headers.
   */
  readonly requestHeader: Headers;

  /**
   * Outgoing response headers.
   *
   * For methods that return a stream, response headers must be set before
   * yielding the first response message.
   */
  readonly responseHeader: Headers;

  /**
   * Outgoing response trailers.
   */
  readonly responseTrailer: Headers;
}

/**
 * Create a new HandlerContext.
 */
export function createHandlerContext(
  spec: { service: ServiceType; method: MethodInfo },
  deadline: AbortSignal | undefined, // TODO
  signal: AbortSignal,
  requestHeader: HeadersInit,
  responseHeader: HeadersInit,
  responseTrailer: HeadersInit
): HandlerContext {
  const linkedAbortcontroller = createLinkedAbortController(deadline, signal);

  return {
    method: spec.method,
    service: spec.service,
    signal: linkedAbortcontroller.signal,
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
 * Wraps a user-provided implementation along with service and method
 * metadata in a discriminated union type.
 */
export type MethodImplSpec<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage> =
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
 * Wraps a user-provided service implementation and provides metadata.
 */
export type ServiceImplSpec = {
  service: ServiceType;
  methods: {
    [key: string]: MethodImplSpec;
  };
};

/**
 * Create an MethodImplSpec - a user-provided implementation for a method,
 * wrapped in a discriminated union type along with service and method metadata.
 */
export function createMethodImplSpec<M extends MethodInfo>(
  service: ServiceType,
  method: M,
  impl: MethodImpl<M>
): MethodImplSpec {
  return {
    kind: method.kind,
    service,
    method,
    impl,
  } as MethodImplSpec;
}

/**
 * Create an ServiceImplSpec - a user-provided service implementation wrapped
 * with metadata.
 */
export function createServiceImplSpec<T extends ServiceType>(
  service: T,
  impl: Partial<ServiceImpl<T>>
): ServiceImplSpec {
  const s: ServiceImplSpec = { service, methods: {} };
  for (const [localName, methodInfo] of Object.entries(service.methods)) {
    let fn: MethodImpl<typeof methodInfo> | undefined = impl[localName];
    if (typeof fn == "function") {
      fn = fn.bind(impl);
    } else {
      const message = `${service.typeName}.${methodInfo.name} is not implemented`;
      fn = function unimplemented() {
        throw new ConnectError(message, Code.Unimplemented);
      };
    }
    s.methods[localName] = createMethodImplSpec(service, methodInfo, fn);
  }
  return s;
}
