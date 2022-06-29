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
  MethodInfo,
  MethodInfoServerStreaming,
  MethodInfoUnary,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { Message, MethodKind } from "@bufbuild/protobuf";
import type { Transport } from "./transport.js";
import { makeAnyClient } from "./any-client.js";
import type { StreamResponse } from "./interceptor.js";
import type { CallOptions } from "./call-options.js";

// This type returns the keys of an object where the right hand side
// DOESN'T match never.
type FilterOutNever<T> = {
  [P in keyof T]: T[P] extends never ? never : P;
}[keyof T];

// prettier-ignore
type PromiseClientBase<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: PartialMessage<I>, options?: CallOptions) => Promise<O>
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: PartialMessage<I>, options?: CallOptions) => AsyncIterable<O>
  : never;
};

/**
 * PromiseClient is a simple client that supports unary and server-streaming
 * methods. Methods will produce a promise for the response message,
 * or an asynchronous iterable of response messages.
 */
export type PromiseClient<Service extends ServiceType> = {
  [P in FilterOutNever<
    PromiseClientBase<Service>
  >]: PromiseClientBase<Service>[P];
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
      default:
        return null;
    }
  }) as PromiseClient<T>;
}

type UnaryFn<I extends Message<I>, O extends Message<O>> = (
  request: PartialMessage<I>,
  options?: CallOptions
) => Promise<O>;

function createUnaryFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): UnaryFn<I, O> {
  return async function (requestMessage, options) {
    const response = await transport.unary(
      service,
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers,
      requestMessage
    );
    options?.onHeader?.(response.header);
    options?.onTrailer?.(response.trailer);
    return response.message;
  };
}

type ServerStreamingFn<I extends Message<I>, O extends Message<O>> = (
  request: PartialMessage<I>,
  options?: CallOptions
) => AsyncIterable<O>;

function createServerStreamingFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): ServerStreamingFn<I, O> {
  return function (requestMessage, options): AsyncIterable<O> {
    let streamResponse: StreamResponse<O> | undefined;
    return {
      [Symbol.asyncIterator](): AsyncIterator<O> {
        return {
          async next() {
            if (!streamResponse) {
              streamResponse = await transport.serverStream(
                service,
                method,
                options?.signal,
                options?.timeoutMs,
                options?.headers,
                requestMessage
              );
              options?.onHeader?.(streamResponse.header);
            }
            const result = await streamResponse.read();
            if (result.done) {
              options?.onTrailer?.(streamResponse.trailer);
              return {
                done: true,
                value: undefined,
              };
            }
            return {
              done: false,
              value: result.value,
            };
          },
        };
      },
    };
  };
}
