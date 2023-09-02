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
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";
import { MethodKind } from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import type {
  BiDiStreamingImpl,
  ClientStreamingImpl,
  HandlerContext,
  MethodImpl,
  ServerStreamingImpl,
  UnaryImpl,
} from "./method-implementation.js";
import {
  createDeadlineSignal,
  createLinkedAbortController,
} from "./protocol/signals.js";
import type {
  InterceptorImpl,
  UniversalInterceptor,
} from "./protocol/universal-interceptor.js";

// prettier-ignore
/**
 * ServiceImpl is the interface of the implementation of a service.
 */
export type ServiceImpl<T extends ServiceType> = {
  [P in keyof T["methods"]]: MethodImpl<T["methods"][P]>;
};

/**
 * Options for creating a HandlerContext.
 */
interface HandlerContextInit {
  service: ServiceType;
  method: MethodInfo;
  protocolName: string;
  requestMethod: string;
  timeoutMs?: number;
  shutdownSignal?: AbortSignal;
  requestSignal?: AbortSignal;
  requestHeader?: HeadersInit;
  responseHeader?: HeadersInit;
  responseTrailer?: HeadersInit;
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
  };
}

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
  impl: MethodImpl<M>,
  interceptors: UniversalInterceptor[],
): MethodImplSpec {
  const interceptions = getMatchingInterceptors(method, interceptors);
  return {
    kind: method.kind,
    service,
    method,
    impl: chain(interceptions, impl),
  } as MethodImplSpec;
}

function getMatchingInterceptors<M extends MethodInfo>(
  method: M,
  interceptors: UniversalInterceptor[],
): InterceptorImpl<M>[] {
  return (
    interceptors
      .map((i) => {
        switch (method.kind) {
          case MethodKind.BiDiStreaming:
            return i.biDiStreaming;
          case MethodKind.ClientStreaming:
            return i.clientStreaming;
          case MethodKind.ServerStreaming:
            return i.serverStreaming;
          case MethodKind.Unary:
            return i.unary;
          default:
            return undefined;
        }
      })
      // We need to cast here because TS can't see that we're narrowing M based
      // on MethodKind.
      .filter(exists) as InterceptorImpl<M>[]
  );
}

function chain<M extends MethodInfo>(
  remaining: InterceptorImpl<M>[],
  impl: MethodImpl<M>,
): MethodImpl<M> {
  if (remaining.length === 0) {
    return impl;
  } else {
    const head = remaining[0];
    const rest = remaining.slice(1);
    const chained = (...args: Parameters<MethodImpl<M>>) => {
      return head(...args, chain(rest, impl));
    };
    // TS seems to dislike this cast, no idea why
    return chained as unknown as MethodImpl<M>;
  }
}

/**
 * Create an ServiceImplSpec - a user-provided service implementation wrapped
 * with metadata.
 */
export function createServiceImplSpec<T extends ServiceType>(
  service: T,
  impl: Partial<ServiceImpl<T>>,
  interceptors: UniversalInterceptor[],
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
    s.methods[localName] = createMethodImplSpec(
      service,
      methodInfo,
      fn,
      interceptors,
    );
  }
  return s;
}

function exists<T>(v: T | null | undefined): v is T {
  if (v === null || v === undefined) {
    return false;
  } else {
    return true;
  }
}
