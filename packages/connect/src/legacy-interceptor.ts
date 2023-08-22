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

import type { AnyMessage, Message } from "@bufbuild/protobuf";
import type {
  Interceptor,
  StreamRequest,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
} from "./interceptor.js";

/**
 * Runs a unary method with the given interceptors. Note that this function
 * is only used when implementing a Transport.
 *
 * @deprecated Use runUnaryCall from @connectrpc/connect/protocol instead.
 */
export function runUnary<I extends Message<I>, O extends Message<O>>(
  req: UnaryRequest<I, O>,
  next: UnaryFn<I, O>,
  interceptors: Interceptor[] | undefined,
): Promise<UnaryResponse<I, O>> {
  if (interceptors) {
    next = applyInterceptors(next, interceptors);
  }
  return next(req);
}

/**
 * Runs a server-streaming method with the given interceptors. Note that this
 * function is only used when implementing a Transport.
 *
 * @deprecated Use runStreamingCall from @connectrpc/connect/protocol instead.
 */
export function runStreaming<I extends Message<I>, O extends Message<O>>(
  req: StreamRequest<I, O>,
  next: StreamingFn<I, O>,
  interceptors: Interceptor[] | undefined,
): Promise<StreamResponse<I, O>> {
  if (interceptors) {
    next = applyInterceptors(next, interceptors);
  }
  return next(req);
}

/**
 * applyInterceptors takes the given UnaryFn or ServerStreamingFn, and wraps
 * it with each of the given interceptors, returning a new UnaryFn or
 * ServerStreamingFn.
 */
function applyInterceptors<T>(next: T, interceptors: Interceptor[]): T {
  return interceptors
    .concat()
    .reverse()
    .reduce(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (n, i) => i(n),
      next as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    ) as T;
}

/**
 * UnaryFn represents the client-side invocation of a unary RPC - a method
 * that takes a single input message, and responds with a single output
 * message.
 * A Transport implements such a function, and makes it available to
 * interceptors.
 */
type UnaryFn<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage,
> = (req: UnaryRequest<I, O>) => Promise<UnaryResponse<I, O>>;

/**
 * StreamingFn represents the client-side invocation of a streaming RPC - a
 * method that takes zero or more input messages, and responds with zero or
 * more output messages.
 * A Transport implements such a function, and makes it available to
 * interceptors.
 */
type StreamingFn<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage,
> = (req: StreamRequest<I, O>) => Promise<StreamResponse<I, O>>;
