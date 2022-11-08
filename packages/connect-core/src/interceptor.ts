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

/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  AnyMessage,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";

import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";

// TODO update docs
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

// TODO update docs
type AnyFn = (
  req: UnaryRequest | StreamingRequest
) => Promise<UnaryResponse | StreamingConn>;

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
> = (req: UnaryRequest<I>) => Promise<UnaryResponse<O>>;

// TODO update docs
type StreamingFn<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> = (req: StreamingRequest<I, O>) => Promise<StreamingConn<I, O>>;

/**
 * UnaryRequest is used in interceptors to represent a request with a
 * single input message.
 */
export interface UnaryRequest<I extends Message<I> = AnyMessage> {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * other request types that may be added to this API in the future.
   *
   * TODO
   */
  readonly stream: false;

  /**
   * Metadata related to the service that is being called.
   */
  readonly service: ServiceType;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: MethodInfo<I, AnyMessage>;

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

  /**
   * The input message that will be transmitted.
   */
  readonly message: I;
}

/**
 * UnaryResponse is used in interceptors to represent a response with
 * a single output message.
 */
export interface UnaryResponse<O extends Message<O> = AnyMessage> {
  /**
   * The `stream` property discriminates between UnaryResponse and
   * StreamResponse.
   */
  readonly stream: false;

  /**
   * Metadata related to the service that is being called.
   */
  readonly service: ServiceType;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: MethodInfo<AnyMessage, O>;

  /**
   * Headers received from the response.
   */
  readonly header: Headers;

  /**
   * The received output message.
   */
  readonly message: O;

  /**
   * Trailers received from the response.
   */
  readonly trailer: Headers;
}

// TODO update docs
export interface StreamingRequest<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * other request types that may be added to this API in the future.
   * TODO update docs
   */
  readonly stream: true;

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

// TODO update docs
export interface StreamingConn<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * other request types that may be added to this API in the future.
   * TODO update docs
   */
  readonly stream: true;

  /**
   * Metadata related to the service that is being called.
   */
  readonly service: ServiceType;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: MethodInfo<I, O>;

  // TODO update docs
  send(message: PartialMessage<I>): Promise<void>;

  // TODO update docs
  close(): Promise<void>;

  // TODO make it a function to avoid the need for a getter?
  closed: boolean;

  readonly responseHeader: Promise<Headers>;

  /**
   * Reads a single output message from the response. The return value is a
   * promise, which fulfills/rejects with a result depending on the state of
   * the stream.
   *
   * The behavior is as follows:
   * 1. If a message was read successfully, the promise is fulfilled with an
   * object of the form `{value: O, done: false}`.
   * 2. If the end of the stream was reached, the promise is fulfilled with
   * `{value: undefined, done: true}`.
   * 3. If an error occurred, the response is rejected with this error.
   */
  read(): Promise<ReadableStreamReadResultLike<O>>;

  /**
   * Trailers received from the response.
   * Note that trailers are only populated if the entirety of the stream was
   * read.
   */
  readonly responseTrailer: Promise<Headers>;
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
      next as any
    ) as T;
}

/**
 * Runs a unary method with the given interceptors. Note that this function
 * is only used when implementing a Transport.
 */
export function runUnary<I extends Message<I>, O extends Message<O>>(
  req: UnaryRequest<I>,
  next: UnaryFn<I, O>,
  interceptors?: Interceptor[]
): Promise<UnaryResponse<O>> {
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
  req: StreamingRequest<I, O>,
  next: StreamingFn<I, O>,
  interceptors?: Interceptor[]
): Promise<StreamingConn<I, O>> {
  if (interceptors) {
    next = applyInterceptors(next, interceptors);
  }
  return next(req);
}
