// Copyright 2021-2025 The Connect Authors
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
  MessageInitShape,
  DescMessage,
  DescService,
  DescMethod,
  MessageShape,
  DescMethodBiDiStreaming,
  DescMethodClientStreaming,
  DescMethodServerStreaming,
  DescMethodStreaming,
  DescMethodUnary,
} from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import {
  createDeadlineSignal,
  createLinkedAbortController,
} from "./protocol/signals.js";
import { createContextValues } from "./context-values.js";
import type { ContextValues } from "./context-values.js";

/**
 * ServiceImpl is the interface of the implementation of a service.
 */
export type ServiceImpl<Desc extends DescService> = {
  [P in keyof Desc["method"]]: MethodImpl<Desc["method"][P]>;
};

/**
 * MethodImpl is the signature of the implementation of an RPC.
 */
export type MethodImpl<M extends DescMethod> = M extends DescMethodUnary<
  infer I,
  infer O
>
  ? UnaryImpl<I, O>
  : M extends DescMethodServerStreaming<infer I, infer O>
    ? ServerStreamingImpl<I, O>
    : M extends DescMethodClientStreaming<infer I, infer O>
      ? ClientStreamingImpl<I, O>
      : M extends DescMethodBiDiStreaming<infer I, infer O>
        ? BiDiStreamingImpl<I, O>
        : never;

/**
 * Context for an RPC on the server. Every RPC implementation can accept a
 * HandlerContext as an argument to gain access to headers and service metadata.
 */
export interface HandlerContext {
  /**
   * Metadata for the method being called.
   */
  readonly method: DescMethod;

  /**
   * Metadata for the service being called.
   */
  readonly service: DescService;

  /**
   * An AbortSignal that triggers when the deadline is reached, or when an error
   * occurs that aborts processing of the request, but also when the RPC is
   * completed without error.
   *
   * The signal can be used to automatically cancel downstream calls.
   */
  readonly signal: AbortSignal;

  /**
   * If the current request has a timeout, this function returns the remaining
   * time.
   */
  readonly timeoutMs: () => number | undefined;

  /**
   * HTTP method of incoming request, usually "POST", but "GET" in the case of
   * Connect Get.
   */
  readonly requestMethod: string;

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

  /**
   * Name of the RPC protocol in use; one of "connect", "grpc" or "grpc-web".
   */
  readonly protocolName: string;

  /**
   * Per RPC context values that can be used to pass data to handlers.
   */
  readonly values: ContextValues;

  /**
   * The URL received by the server.
   */
  readonly url: string;
}

/**
 * Options for creating a HandlerContext.
 */
interface HandlerContextInit {
  service: DescService;
  method: DescMethod;
  protocolName: string;
  requestMethod: string;
  url: string;
  timeoutMs?: number;
  shutdownSignal?: AbortSignal;
  requestSignal?: AbortSignal;
  requestHeader?: HeadersInit;
  responseHeader?: HeadersInit;
  responseTrailer?: HeadersInit;
  contextValues?: ContextValues;
}

interface HandlerContextController extends HandlerContext {
  abort(reason?: unknown): void;
}

/**
 * Create a new HandlerContext.
 *
 * The context is usually automatically created by handlers, but if a service
 * implementation is used in unit tests, this function can be used to create
 * a context.
 */
export function createHandlerContext(
  init: HandlerContextInit,
): HandlerContextController {
  let timeoutMs: () => undefined | number;
  if (init.timeoutMs !== undefined) {
    const date = new Date(Date.now() + init.timeoutMs);
    timeoutMs = () => date.getTime() - Date.now();
  } else {
    timeoutMs = () => undefined;
  }
  const deadline = createDeadlineSignal(init.timeoutMs);
  const abortController = createLinkedAbortController(
    deadline.signal,
    init.requestSignal,
    init.shutdownSignal,
  );
  return {
    ...init,
    signal: abortController.signal,
    timeoutMs,
    requestHeader: new Headers(init.requestHeader),
    responseHeader: new Headers(init.responseHeader),
    responseTrailer: new Headers(init.responseTrailer),
    abort(reason?: unknown) {
      deadline.cleanup();
      abortController.abort(reason);
    },
    values: init.contextValues ?? createContextValues(),
  };
}

/**
 * UnaryImp is the signature of the implementation of a unary RPC.
 */
export type UnaryImpl<I extends DescMessage, O extends DescMessage> = (
  request: MessageShape<I>,
  context: HandlerContext,
) => Promise<MessageInitShape<O>> | MessageInitShape<O>;

/**
 * ClientStreamingImpl is the signature of the implementation of a
 * client-streaming RPC.
 */
export type ClientStreamingImpl<
  I extends DescMessage,
  O extends DescMessage,
> = (
  requests: AsyncIterable<MessageShape<I>>,
  context: HandlerContext,
) => Promise<MessageInitShape<O>>;

/**
 * ServerStreamingImpl is the signature of the implementation of a
 * server-streaming RPC.
 */
export type ServerStreamingImpl<
  I extends DescMessage,
  O extends DescMessage,
> = (
  request: MessageShape<I>,
  context: HandlerContext,
) => AsyncIterable<MessageInitShape<O>>;

/**
 * BiDiStreamingImpl is the signature of the implementation of a bi-di
 * streaming RPC.
 */
export type BiDiStreamingImpl<I extends DescMessage, O extends DescMessage> = (
  requests: AsyncIterable<MessageShape<I>>,
  context: HandlerContext,
) => AsyncIterable<MessageInitShape<O>>;

// biome-ignore format: type should not be formatted
/**
 * Wraps a user-provided implementation along with service and method
 * metadata in a discriminated union type.
 */
export type MethodImplSpec<I extends DescMessage = DescMessage, O extends DescMessage = DescMessage> =
  | { kind: "unary";            impl: UnaryImpl<I, O>;            method: DescMethodUnary<I, O> }
  | { kind: "server_streaming"; impl: ServerStreamingImpl<I, O>;  method: DescMethodServerStreaming<I, O> }
  | { kind: "client_streaming"; impl: ClientStreamingImpl<I, O>;  method: DescMethodClientStreaming<I, O> }
  | { kind: "bidi_streaming";   impl: BiDiStreamingImpl<I, O>;    method: DescMethodBiDiStreaming<I, O> }
;

/**
 * Wraps a user-provided service implementation and provides metadata.
 */
export type ServiceImplSpec = {
  service: DescService;
  methods: {
    [key: string]: MethodImplSpec;
  };
};

/**
 * Create an MethodImplSpec - a user-provided implementation for a method,
 * wrapped in a discriminated union type along with service and method metadata.
 */
export function createMethodImplSpec<M extends DescMethod>(
  method: M,
  impl: MethodImpl<M>,
): MethodImplSpec {
  return {
    kind: method.methodKind,
    method,
    impl,
  } as MethodImplSpec;
}

/**
 * Create an ServiceImplSpec - a user-provided service implementation wrapped
 * with metadata.
 */
export function createServiceImplSpec<Desc extends DescService>(
  service: DescService,
  impl: Partial<ServiceImpl<Desc>>,
): ServiceImplSpec {
  const s: ServiceImplSpec = { service, methods: {} };
  for (const method of service.methods) {
    let fn: MethodImpl<DescMethodUnary | DescMethodStreaming> | undefined =
      impl[method.localName];
    if (typeof fn == "function") {
      fn = fn.bind(impl);
    } else {
      const message = `${service.typeName}.${method.name} is not implemented`;
      fn = function unimplemented() {
        throw new ConnectError(message, Code.Unimplemented);
      };
    }
    s.methods[method.localName] = createMethodImplSpec(
      method as DescMethodUnary | DescMethodStreaming,
      fn,
    );
  }
  return s;
}
