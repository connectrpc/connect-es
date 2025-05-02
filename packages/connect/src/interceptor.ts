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
  DescMessage,
  DescService,
  MessageShape,
  DescMethodStreaming,
  DescMethodUnary,
} from "@bufbuild/protobuf";
import type { ContextValues } from "./context-values.js";

/**
 * An interceptor can add logic to clients or servers, similar to the decorators
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
 * Similarly, a request received by a server goes through the outermost layer
 * first. In the center, the actual HTTP request is received by the handler. The
 * response then comes back through all layers and is returned to the client.
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
  req: UnaryRequest | StreamRequest,
) => Promise<UnaryResponse | StreamResponse>;

/**
 * UnaryRequest is used in interceptors to represent a request with a
 * single input message.
 */
export interface UnaryRequest<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> extends RequestCommon {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * StreamingRequest.
   */
  readonly stream: false;

  /**
   * The input message that will be transmitted.
   */
  readonly message: MessageShape<I>;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: DescMethodUnary<I, O>;
}

/**
 * UnaryResponse is used in interceptors to represent a response with
 * a single output message.
 */
export interface UnaryResponse<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> extends ResponseCommon {
  /**
   * The `stream` property discriminates between UnaryResponse and
   * StreamingConn.
   */
  readonly stream: false;

  /**
   * The received output message.
   */
  readonly message: MessageShape<O>;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: DescMethodUnary<I, O>;
}

/**
 * StreamRequest is used in interceptors to represent a request that has
 * zero or more input messages, and zero or more output messages.
 */
export interface StreamRequest<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> extends RequestCommon {
  /**
   * The `stream` property discriminates between UnaryRequest and
   * StreamingRequest.
   */
  readonly stream: true;

  /**
   * The input messages that will be transmitted.
   */
  readonly message: AsyncIterable<MessageShape<I>>;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: DescMethodStreaming<I, O>;
}

/**
 * StreamResponse is used in interceptors to represent an ongoing call that has
 * zero or more input messages, and zero or more output messages.
 */
export interface StreamResponse<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> extends ResponseCommon {
  /**
   * The `stream` property discriminates between UnaryResponse and
   * StreamingConn.
   */
  readonly stream: true;

  /**
   * The output messages.
   */
  readonly message: AsyncIterable<MessageShape<O>>;

  /**
   * Metadata related to the service method that is being called.
   */
  readonly method: DescMethodStreaming<I, O>;
}

/**
 * @private
 */
export interface RequestCommon {
  /**
   * Metadata related to the service that is being called.
   */
  readonly service: DescService;

  /**
   * HTTP method of the request. Server-side interceptors may use this value
   * to identify Connect GET requests.
   */
  readonly requestMethod: string;

  /**
   * The URL the request is going to hit for the clients or the
   * URL received by the server.
   */
  readonly url: string;

  /**
   * The AbortSignal for the current call.
   */
  readonly signal: AbortSignal;

  /**
   * Headers that will be sent along with the request.
   */
  readonly header: Headers;

  /**
   * The context values for the current call.
   */
  readonly contextValues: ContextValues;
}

/**
 * @private
 */
export interface ResponseCommon {
  /**
   * Metadata related to the service that is being called.
   */
  readonly service: DescService;

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
export function applyInterceptors<T>(
  next: T,
  interceptors: Interceptor[] | undefined,
): T {
  if (!interceptors) {
    return next;
  }
  for (const i of interceptors.concat().reverse()) {
    next = i(next as AnyFn) as T;
  }
  return next;
}
