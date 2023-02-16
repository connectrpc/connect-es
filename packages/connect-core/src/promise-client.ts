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
  MethodInfo,
  MethodInfoBiDiStreaming,
  MethodInfoClientStreaming,
  MethodInfoServerStreaming,
  MethodInfoUnary,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { Message, MethodKind } from "@bufbuild/protobuf";
import type { Transport } from "./transport.js";
import { makeAnyClient } from "./any-client.js";
import type { CallOptions } from "./call-options.js";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import { createAsyncIterable } from "./async-iterable.js";

// prettier-ignore
/**
 * PromiseClient is a simple client that supports unary and server-streaming
 * methods. Methods will produce a promise for the response message,
 * or an asynchronous iterable of response messages.
 */
export type PromiseClient<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: PartialMessage<I>, options?: CallOptions) => Promise<O>
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: PartialMessage<I>, options?: CallOptions) => AsyncIterable<O>
  : T["methods"][P] extends MethodInfoClientStreaming<infer I, infer O> ? (request: AsyncIterable<PartialMessage<I>>, options?: CallOptions) => Promise<O>
  : T["methods"][P] extends MethodInfoBiDiStreaming<infer I, infer O>   ? (request: AsyncIterable<PartialMessage<I>>, options?: CallOptions) => AsyncIterable<O>
  : never;
};

/**
 * Create a PromiseClient for the given service, invoking RPCs through the
 * given transport.
 */
export function createPromiseClient<T extends ServiceType>(
  service: T,
  transport: Transport
) {
  return makeAnyClient(service, (method) => {
    switch (method.kind) {
      case MethodKind.Unary:
        return createUnaryFn(transport, service, method);
      case MethodKind.ServerStreaming:
        return createServerStreamingFn(transport, service, method);
      case MethodKind.ClientStreaming:
        return createClientStreamingFn(transport, service, method);
      case MethodKind.BiDiStreaming:
        return createBiDiStreamingFn(transport, service, method);
      default:
        return null;
    }
  }) as PromiseClient<T>;
}

/**
 * UnaryFn is the method signature for a unary method of a PromiseClient.
 */
type UnaryFn<I extends Message<I>, O extends Message<O>> = (
  request: PartialMessage<I>,
  options?: CallOptions
) => Promise<O>;

function createUnaryFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): UnaryFn<I, O> {
  return async function (input, options) {
    console.log("unary func2");
    const response = await transport.unary(
      service,
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers,
      input
    );
    console.log("unary func2 done");
    options?.onHeader?.(response.header);
    options?.onTrailer?.(response.trailer);
    return response.message;
  };
}

/**
 * ServerStreamingFn is the method signature for a server-streaming method of
 * a PromiseClient.
 */
type ServerStreamingFn<I extends Message<I>, O extends Message<O>> = (
  request: PartialMessage<I>,
  options?: CallOptions
) => AsyncIterable<O>;

export function createServerStreamingFn<
  I extends Message<I>,
  O extends Message<O>
>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): ServerStreamingFn<I, O> {
  return async function* (input, options): AsyncIterable<O> {
    const inputMessage =
      input instanceof method.I ? input : new method.I(input);
    const response = await transport.stream<I, O>(
      service,
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers,
      createAsyncIterable([inputMessage])
    );
    options?.onHeader?.(response.header);
    yield* response.message;
    options?.onTrailer?.(response.trailer);
  };
}

/**
 * ClientStreamFn is the method signature for a client streaming method of a
 * PromiseClient.
 */
type ClientStreamingFn<I extends Message<I>, O extends Message<O>> = (
  request: AsyncIterable<PartialMessage<I>>,
  options?: CallOptions
) => Promise<O>;

export function createClientStreamingFn<
  I extends Message<I>,
  O extends Message<O>
>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): ClientStreamingFn<I, O> {
  return async function (
    request: AsyncIterable<PartialMessage<I>>,
    options?: CallOptions
  ): Promise<O> {
    async function* input() {
      for await (const partial of request) {
        yield partial instanceof method.I ? partial : new method.I(partial);
      }
    }
    const response = await transport.stream<I, O>(
      service,
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers,
      input()
    );
    options?.onHeader?.(response.header);
    let singleMessage: O | undefined;
    for await (const message of response.message) {
      singleMessage = message;
    }
    if (!singleMessage) {
      throw new ConnectError(
        "protocol error: missing response message",
        Code.Internal
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
type BiDiStreamingFn<I extends Message<I>, O extends Message<O>> = (
  request: AsyncIterable<PartialMessage<I>>,
  options?: CallOptions
) => AsyncIterable<O>;

export function createBiDiStreamingFn<
  I extends Message<I>,
  O extends Message<O>
>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): BiDiStreamingFn<I, O> {
  return async function* (
    request: AsyncIterable<PartialMessage<I>>,
    options?: CallOptions
  ): AsyncIterable<O> {
    async function* input() {
      for await (const partial of request) {
        yield partial instanceof method.I ? partial : new method.I(partial);
      }
    }
    const response = await transport.stream<I, O>(
      service,
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers,
      input()
    );
    options?.onHeader?.(response.header);
    yield* response.message;
    options?.onTrailer?.(response.trailer);
  };
}
