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
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";

import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";

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
> = (req: StreamingRequest<I, O>) => Promise<StreamingConn<I, O>>;

/**
 * UnaryRequest is used in interceptors to represent a request with a
 * single input message.
 */
export interface UnaryRequest<I extends Message<I> = AnyMessage> {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * StreamingRequest.
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
   * StreamingConn.
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

/**
 * StreamingRequest is used in interceptors to represent a request that has
 * zero or more input messages, and zero or more output messages.
 */
export interface StreamingRequest<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * StreamingRequest.
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

/**
 * StreamingConn is used in interceptors to represent an ongoing call that has
 * zero or more input messages, and zero or more output messages.
 */
export interface StreamingConn<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> {
  /**
   * The `stream` property discriminates between UnaryResponse and
   * StreamingConn.
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
   * Transmits a single input message. It is up to clients to honor streaming
   * method semantics - for example, a server-streaming method only accepts a
   * single input message by definition.
   *
   * The Transport must raise a ConnectError with code "aborted" if send()
   * fails because the server has already ended the connection.
   */
  send(message: PartialMessage<I>): Promise<void>;

  /**
   * Close the stream of input messages, signalling to the server that the
   * client is not going to send any more messages.
   *
   * The Transport must raise a ConnectError with code "aborted" if close()
   * fails because the server has already ended the connection.
   */
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
      next as any // eslint-disable-line @typescript-eslint/no-explicit-any
    ) as T;
}

/**
 * Runs a unary method with the given interceptors. Note that this function
 * is only used when implementing a Transport.
 */
export function runUnary<I extends Message<I>, O extends Message<O>>(
  req: UnaryRequest<I>,
  next: UnaryFn<I, O>,
  interceptors: Interceptor[] | undefined
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
  interceptors: Interceptor[] | undefined
): Promise<StreamingConn<I, O>> {
  if (interceptors) {
    next = applyInterceptors(next, interceptors);
  }
  return next(req);
}
