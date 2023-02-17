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

/**
 * An interceptor can add logic to clients, similar to the decorators
 * or middleware you may have seen in other libraries. Interceptors may
 * mutate the request and response, catch errors and retry/recover, emit
 * logs, or do nearly everything else.
 *
 * For a simple example, the following interceptor logs all requests:
 *
 * ```ts
 * const logger: Interceptor = (next) => async (req) => {
 *   console.log(`sending message to ${req.url}`);
 *   return await next(req);
 * };
 * ```
 *
 * You can think of interceptors like a layered onion. A request initiated
 * by a client goes through the outermost layer first. In the center, the
 * actual HTTP request is run by the transport. The response then comes back
 * through all layers and is returned to the client.
 *
 * To implement that layering, Interceptors are functions that wrap a call
 * invocation. In an array of interceptors, the interceptor at the end of
 * the array is applied first.
 */
export type Interceptor = (next: AnyFn) => AnyFn;

/**
 * AnyFn represents the client-side invocation of an RPC. Interceptors can wrap
 * this invocation, add request headers, and wrap parts of the request or
 * response to inspect and log.
 */
type AnyFn = (
  req: UnaryRequest | StreamRequest
) => Promise<UnaryResponse | StreamResponse>;

/**
 * UnaryFn represents the client-side invocation of a unary RPC - a method
 * that takes a single input message, and responds with a single output
 * message.
 * A Transport implements such a function, and makes it available to
 * interceptors.
 */
type UnaryFn<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
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
  O extends Message<O> = AnyMessage
> = (req: StreamRequest<I, O>) => Promise<StreamResponse<I, O>>;

/**
 * UnaryRequest is used in interceptors to represent a request with a
 * single input message.
 */
export interface UnaryRequest<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> extends RequestCommon<I, O> {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * StreamingRequest.
   */
  readonly stream: false;

  /**
   * The input message that will be transmitted.
   */
  readonly message: I;
}

/**
 * UnaryResponse is used in interceptors to represent a response with
 * a single output message.
 */
export interface UnaryResponse<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> extends ResponseCommon<I, O> {
  /**
   * The `stream` property discriminates between UnaryResponse and
   * StreamingConn.
   */
  readonly stream: false;

  /**
   * The received output message.
   */
  readonly message: O;
}

/**
 * StreamRequest is used in interceptors to represent a request that has
 * zero or more input messages, and zero or more output messages.
 */
export interface StreamRequest<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> extends RequestCommon<I, O> {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * StreamingRequest.
   */
  readonly stream: true;

  /**
   * The input messages that will be transmitted.
   */
  readonly message: AsyncIterable<I>;
}

/**
 * StreamResponse is used in interceptors to represent an ongoing call that has
 * zero or more input messages, and zero or more output messages.
 */
export interface StreamResponse<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> extends ResponseCommon<I, O> {
  /**
   * The `stream` property discriminates between UnaryResponse and
   * StreamingConn.
   */
  readonly stream: true;

  /**
   * The output messages.
   */
  readonly message: AsyncIterable<O>;
}

interface RequestCommon<I extends Message<I>, O extends Message<O>> {
  /**
   * Metadata related to the service that is being called.
   */
  readonly service: ServiceType;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: MethodInfo<I, O>;

  /**
   * The URL the request is going to hit.
   */
  readonly url: string;

  /**
   * Optional parameters to the fetch API.
   */
  readonly init: Exclude<RequestInit, "body" | "headers" | "signal">;

  /**
   * The AbortSignal for the current call.
   */
  readonly signal: AbortSignal;

  /**
   * Headers that will be sent along with the request.
   */
  readonly header: Headers;
}

interface ResponseCommon<I extends Message<I>, O extends Message<O>> {
  /**
   * Metadata related to the service that is being called.
   */
  readonly service: ServiceType;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: MethodInfo<I, O>;

  /**
   * Headers received from the response.
   */
  readonly header: Headers;

  /**
   * Trailers received from the response.
   * Note that trailers are only populated when the entirety of the response
   * has been read.
   */
  readonly trailer: Headers;
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
      next as any // eslint-disable-line @typescript-eslint/no-explicit-any
    ) as T;
}

/**
 * Runs a unary method with the given interceptors. Note that this function
 * is only used when implementing a Transport.
 */
export function runUnary<I extends Message<I>, O extends Message<O>>(
  req: UnaryRequest<I, O>,
  next: UnaryFn<I, O>,
  interceptors: Interceptor[] | undefined
): Promise<UnaryResponse<I, O>> {
  if (interceptors) {
    next = applyInterceptors(next, interceptors);
  }
  return next(req);
}

/**
 * Runs a server-streaming method with the given interceptors. Note that this
 * function is only used when implementing a Transport.
 */
export function runStreaming<I extends Message<I>, O extends Message<O>>(
  req: StreamRequest<I, O>,
  next: StreamingFn<I, O>,
  interceptors: Interceptor[] | undefined
): Promise<StreamResponse<I, O>> {
  if (interceptors) {
    next = applyInterceptors(next, interceptors);
  }
  return next(req);
}
