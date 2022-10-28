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
import type { StreamingConn } from "./interceptor.js";
import type { CallOptions } from "./call-options.js";
import { ConnectError } from "./connect-error.js";

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
  : T["methods"][P] extends MethodInfoClientStreaming<infer I, infer O> ? (options?: CallOptions) => Promise<ClientStreamCall<PartialMessage<I>, O>>
  : T["methods"][P] extends MethodInfoBiDiStreaming<infer I, infer O>   ? (options?: CallOptions) => Promise<ClientBiDiCall<PartialMessage<I>, O>>
  : never;
};

// TODO update docs
export interface ClientStreamCall<I, O> {
  send(input: I): Promise<void>;

  close(): void;

  closed: boolean;

  receive(): Promise<O>;
}

// TODO update docs
export interface ClientBiDiCall<I, O> {
  send(input: I): Promise<void>;

  close(): void;

  closed: boolean;

  receiveAll(): AsyncIterable<O>;

  receive(): Promise<O | null>;
}

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
    const response = await transport.unary(
      service,
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers,
      input
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
type ServerStreamingFn<I extends Message<I>, O extends Message<O>> = (
  request: PartialMessage<I>,
  options?: CallOptions
) => AsyncIterable<O>;

function createServerStreamingFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): ServerStreamingFn<I, O> {
  return function (input, options): AsyncIterable<O> {
    let conn: StreamingConn<I, O> | undefined;
    return {
      [Symbol.asyncIterator](): AsyncIterator<O> {
        return {
          async next() {
            if (!conn) {
              conn = await transport.stream<I, O>(
                service,
                method,
                options?.signal,
                options?.timeoutMs,
                options?.headers
              );
              await conn.send(input);
              await conn.close();
              options?.onHeader?.(await conn.responseHeader);
            }
            const result = await conn.read();
            if (result.done) {
              options?.onTrailer?.(await conn.responseTrailer);
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

/**
 * ClientStreamFn is the method signature for a client streaming method of a PromiseClient.
 */
type ClientStreamingFn<I extends Message<I>, O extends Message<O>> = (
  options?: CallOptions
) => Promise<ClientStreamCall<PartialMessage<I>, O>>;

function createClientStreamingFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): ClientStreamingFn<I, O> {
  return async function (
    options?: CallOptions
  ): Promise<ClientStreamCall<PartialMessage<I>, O>> {
    const conn = await transport.stream<I, O>(
      service,
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers
    );
    void conn.responseHeader.then((value) => options?.onHeader?.(value));
    void conn.responseTrailer.then((value) => options?.onTrailer?.(value));
    return {
      send(input) {
        return conn.send(input);
      },
      close() {
        return conn.close();
      },
      get closed() {
        return conn.closed;
      },
      async receive(): Promise<O> {
        const r = await conn.read();
        if (r.done) {
          // TODO better error message
          throw new ConnectError("missing response message from transport");
        }
        return r.value;
      },
    };
  };
}

/**
 * BiDiStreamFn is the method signature for a bi-directional streaming method of a PromiseClient.
 */
type BiDiStreamingFn<I extends Message<I>, O extends Message<O>> = (
  options?: CallOptions
) => Promise<ClientBiDiCall<PartialMessage<I>, O>>;

function createBiDiStreamingFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): BiDiStreamingFn<I, O> {
  return async function (
    options?: CallOptions
  ): Promise<ClientBiDiCall<PartialMessage<I>, O>> {
    const conn = await transport.stream<I, O>(
      service,
      method,
      options?.signal,
      options?.timeoutMs,
      options?.headers
    );
    void conn.responseHeader.then((value) => options?.onHeader?.(value));
    void conn.responseTrailer.then((value) => options?.onTrailer?.(value));
    return {
      send(input) {
        return conn.send(input);
      },
      close() {
        return conn.close();
      },
      get closed() {
        return conn.closed;
      },
      receiveAll(): AsyncIterable<O> {
        return {
          [Symbol.asyncIterator](): AsyncIterator<O> {
            return {
              async next() {
                const result = await conn.read();
                if (result.done) {
                  options?.onTrailer?.(await conn.responseTrailer);
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
      },
      async receive(): Promise<O | null> {
        const r = await conn.read();
        return r.value ?? null;
      },
    };
  };
}
