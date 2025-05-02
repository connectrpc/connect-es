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
  MessageInitShape,
  MessageShape,
  DescMethodBiDiStreaming,
  DescMethodClientStreaming,
  DescMethodServerStreaming,
  DescMethodUnary,
} from "@bufbuild/protobuf";
import type { Transport } from "./transport.js";
import { makeAnyClient } from "./any-client.js";
import type { CallOptions } from "./call-options.js";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";
import type { StreamResponse } from "./interceptor.js";

// biome-ignore format: type should not be formatted
/**
 * Client is a simple client that supports unary and server-streaming
 * methods. Methods will produce a promise for the response message,
 * or an asynchronous iterable of response messages.
 */
export type Client<Desc extends DescService> = {
  [P in keyof Desc["method"]]:
  Desc["method"][P] extends DescMethodUnary<infer I, infer O> ? (request: MessageInitShape<I>, options?: CallOptions) => Promise<MessageShape<O>>
  : Desc["method"][P] extends DescMethodServerStreaming<infer I, infer O> ? (request: MessageInitShape<I>, options?: CallOptions) => AsyncIterable<MessageShape<O>>
  : Desc["method"][P] extends DescMethodClientStreaming<infer I, infer O> ? (request: AsyncIterable<MessageInitShape<I>>, options?: CallOptions) => Promise<MessageShape<O>>
  : Desc["method"][P] extends DescMethodBiDiStreaming<infer I, infer O> ? (request: AsyncIterable<MessageInitShape<I>>, options?: CallOptions) => AsyncIterable<MessageShape<O>>
  : never;
};

/**
 * Create a Client for the given service, invoking RPCs through the
 * given transport.
 */
export function createClient<T extends DescService>(
  service: T,
  transport: Transport,
) {
  return makeAnyClient(service, (method) => {
    switch (method.methodKind) {
      case "unary":
        return createUnaryFn(transport, method);
      case "server_streaming":
        return createServerStreamingFn(transport, method);
      case "client_streaming":
        return createClientStreamingFn(transport, method);
      case "bidi_streaming":
        return createBiDiStreamingFn(transport, method);
      default:
        return null;
    }
  }) as Client<T>;
}

/**
 * UnaryFn is the method signature for a unary method of a PromiseClient.
 */
type UnaryFn<I extends DescMessage, O extends DescMessage> = (
  request: MessageInitShape<I>,
  options?: CallOptions,
) => Promise<MessageShape<O>>;

export function createUnaryFn<I extends DescMessage, O extends DescMessage>(
  transport: Transport,
  method: DescMethodUnary<I, O>,
): UnaryFn<I, O> {
  return async (input, options) => {
    const response = await transport.unary(
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers,
      input,
      options?.contextValues,
    );
    options?.onHeader?.(response.header);
    options?.onTrailer?.(response.trailer);
    return response.message;
  };
}

/**
 * ServerStreamingFn is the method signature for a server-streaming method of
 * a PromiseClient.
 */
type ServerStreamingFn<I extends DescMessage, O extends DescMessage> = (
  request: MessageInitShape<I>,
  options?: CallOptions,
) => AsyncIterable<MessageShape<O>>;

export function createServerStreamingFn<
  I extends DescMessage,
  O extends DescMessage,
>(
  transport: Transport,
  method: DescMethodServerStreaming<I, O>,
): ServerStreamingFn<I, O> {
  return (input, options): AsyncIterable<MessageShape<O>> =>
    handleStreamResponse(
      transport.stream(
        method,
        options?.signal,
        options?.timeoutMs,
        options?.headers,
        createAsyncIterable([input]),
        options?.contextValues,
      ),
      options,
    );
}

/**
 * ClientStreamFn is the method signature for a client streaming method of a
 * PromiseClient.
 */
type ClientStreamingFn<I extends DescMessage, O extends DescMessage> = (
  request: AsyncIterable<MessageInitShape<I>>,
  options?: CallOptions,
) => Promise<MessageShape<O>>;

export function createClientStreamingFn<
  I extends DescMessage,
  O extends DescMessage,
>(
  transport: Transport,
  method: DescMethodClientStreaming<I, O>,
): ClientStreamingFn<I, O> {
  return async (
    request: AsyncIterable<MessageInitShape<I>>,
    options?: CallOptions,
  ): Promise<MessageShape<O>> => {
    const response = await transport.stream(
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers,
      request,
      options?.contextValues,
    );
    options?.onHeader?.(response.header);
    let singleMessage: MessageShape<O> | undefined;
    let count = 0;
    for await (const message of response.message) {
      singleMessage = message;
      count++;
    }
    if (!singleMessage) {
      throw new ConnectError(
        "protocol error: missing response message",
        Code.Unimplemented,
      );
    }
    if (count > 1) {
      throw new ConnectError(
        "protocol error: received extra messages for client streaming method",
        Code.Unimplemented,
      );
    }
    options?.onTrailer?.(response.trailer);
    return singleMessage;
  };
}

/**
 * BiDiStreamFn is the method signature for a bi-directional streaming method
 * of a PromiseClient.
 */
type BiDiStreamingFn<I extends DescMessage, O extends DescMessage> = (
  request: AsyncIterable<MessageInitShape<I>>,
  options?: CallOptions,
) => AsyncIterable<MessageShape<O>>;

export function createBiDiStreamingFn<
  I extends DescMessage,
  O extends DescMessage,
>(
  transport: Transport,
  method: DescMethodBiDiStreaming<I, O>,
): BiDiStreamingFn<I, O> {
  return (
    request: AsyncIterable<MessageInitShape<I>>,
    options?: CallOptions,
  ): AsyncIterable<MessageShape<O>> =>
    handleStreamResponse(
      transport.stream(
        method,
        options?.signal,
        options?.timeoutMs,
        options?.headers,
        request,
        options?.contextValues,
      ),
      options,
    );
}

function handleStreamResponse<I extends DescMessage, O extends DescMessage>(
  stream: Promise<StreamResponse<I, O>>,
  options?: CallOptions,
): AsyncIterable<MessageShape<O>> {
  const it = (async function* () {
    const response = await stream;
    options?.onHeader?.(response.header);
    yield* response.message;
    options?.onTrailer?.(response.trailer);
  })()[Symbol.asyncIterator]();
  // Create a new iterable to omit throw/return.
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => it.next(),
    }),
  };
}
