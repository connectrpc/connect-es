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
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type { StreamResponse, UnaryResponse } from "./client-interceptor.js";

/**
 * ClientTransport represents the underlying transport for a client.
 * A transport implements a protocol, such as gRPC-web, and allows for the
 * concrete clients to be independent of the protocol.
 */
export interface ClientTransport {
  unary<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage>(
    service: ServiceType,
    method: MethodInfo<I, O>,
    signal: AbortSignal | undefined,
    timeoutMs: number | undefined,
    header: HeadersInit | undefined,
    message: PartialMessage<I>
  ): Promise<UnaryResponse<O>>;

  serverStream<
    I extends Message<I> = AnyMessage,
    O extends Message<O> = AnyMessage
  >(
    service: ServiceType,
    method: MethodInfo<I, O>,
    signal: AbortSignal | undefined,
    timeoutMs: number | undefined,
    header: HeadersInit | undefined,
    message: PartialMessage<I>
  ): Promise<StreamResponse<O>>;
}

/**
 * Options for a call. Each client method accepts an optional argument
 * with this interface.
 */
export interface ClientCallOptions {
  /**
   * Timeout in milliseconds.
   */
  timeoutMs?: number;

  /**
   * Custom headers to send with the request.
   */
  headers?: HeadersInit;

  /**
   * An optional AbortSignal to cancel the call.
   * If cancelled, an error with Code.Canceled is raised.
   */
  signal?: AbortSignal;

  /**
   * Called when response headers are received.
   */
  onHeader?(headers: Headers): void;

  /**
   * Called when response trailers are received.
   */
  onTrailer?(trailers: Headers): void;
}
