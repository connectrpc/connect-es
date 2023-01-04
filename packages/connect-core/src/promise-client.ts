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
import { ConnectError, connectErrorFromReason } from "./connect-error.js";
import { Code } from "./code.js";

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

/**
 * ClientStreamCall represents an ongoing client-streaming RPC.
 *
 * Messages can be transmitted by calling send(). When all messages are
 * transmitted, call close(), then receive() to receive the single server
 * response message.
 */
export interface ClientStreamCall<I, O> {
  /**
   * Transmit a message to the server.
   *
   * Resolves to `false` if it was not possible to transmit the message, for
   * example because the server has terminated the connection.
   */
  send(input: I): Promise<boolean>;

  /**
   * Close the input stream, signalling to the server that the client is not
   * going to send any more messages.
   *
   * Resolves to `false` if it was not possible to close the input stream, for
   * example because the server has terminated the connection.
   */
  close(): Promise<boolean>;

  /**
   * If send() or close() failed and resolved to `false`, this property
   * contains the underlying error.
   */
  sendError: ConnectError | undefined;

  /**
   * Receive the single response message from the server. If the server sends
   * an error instead of a message, the error will be raised when calling this
   * method.
   */
  receive(): Promise<O>;
}

/**
 * ClientBiDiCall represents an ongoing bi-directional streaming RPC.
 *
 * Messages can be transmitted by calling send(). When all messages are
 * transmitted, call close(). Response messages can be received with
 * receiveAll() - or individually with receive().
 *
 * If the protocol and the connection permits, sending and receiving messages
 * can be interleaved.
 */
export interface ClientBiDiCall<I, O> {
  /**
   * Transmit a message to the server.
   *
   * Resolves to `false` if it was not possible to transmit the message, for
   * example because the server has terminated the connection.
   */
  send(input: I): Promise<boolean>;

  /**
   * Close the input stream, signalling to the server that the client is not
   * going to send any more messages.
   *
   * Resolves to `false` if it was not possible to close the input stream, for
   * example because the server has terminated the connection.
   */
  close(): Promise<boolean>;

  /**
   * If send() or close() failed and resolved to `false`, this property
   * contains the underlying error.
   */
  sendError: ConnectError | undefined;

  /**
   * Receive a single response message from the server. If the server sends an
   * error instead of a message, the error will be raised when calling this
   * method. If the server has stopped sending messages, `null` is returned.
   */
  receive(): Promise<O | null>;

  /**
   * Receive all response messages from the server as an async iterable. A
   * `for await` loop can be used to iterate over the response messages,
   * similar to the result of a server-streaming call.
   */
  receiveAll(): AsyncIterable<O>;
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

export function createServerStreamingFn<
  I extends Message<I>,
  O extends Message<O>
>(
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
              try {
                await conn.send(input);
                await conn.close();
              } catch (e) {
                if (connectErrorFromReason(e).code == Code.Aborted) {
                  // We do not want intentional errors from the server to be shadowed
                  // by client-side errors.
                  // This can occur if the server has written a response with an error
                  // and has ended the connection. This response may already sit in a
                  // buffer on the client, while it is still writing to the request
                  // body.
                  // We rely on the Transport to raise a code "aborted" in this case,
                  // and ignore this error.
                } else {
                  throw e;
                }
              }
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
 * ClientStreamFn is the method signature for a client streaming method of a
 * PromiseClient.
 */
type ClientStreamingFn<I extends Message<I>, O extends Message<O>> = (
  options?: CallOptions
) => Promise<ClientStreamCall<PartialMessage<I>, O>>;

export function createClientStreamingFn<
  I extends Message<I>,
  O extends Message<O>
>(
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
    return <ClientStreamCall<PartialMessage<I>, O>>{
      async send(input): Promise<boolean> {
        try {
          await conn.send(input);
          return true;
        } catch (e) {
          this.sendError = connectErrorFromReason(e);
          return false;
        }
      },
      async close(): Promise<boolean> {
        try {
          await conn.close();
          return true;
        } catch (e) {
          this.sendError = connectErrorFromReason(e);
          return false;
        }
      },
      sendError: undefined,
      async receive(): Promise<O> {
        const r = await conn.read();
        if (r.done) {
          throw new ConnectError(
            "protocol error: missing response message",
            Code.Internal
          );
        }
        return r.value;
      },
    };
  };
}

/**
 * BiDiStreamFn is the method signature for a bi-directional streaming method
 * of a PromiseClient.
 */
type BiDiStreamingFn<I extends Message<I>, O extends Message<O>> = (
  options?: CallOptions
) => Promise<ClientBiDiCall<PartialMessage<I>, O>>;

export function createBiDiStreamingFn<
  I extends Message<I>,
  O extends Message<O>
>(
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
    return <ClientBiDiCall<PartialMessage<I>, O>>{
      async send(input) {
        try {
          await conn.send(input);
          return true;
        } catch (e) {
          this.sendError = connectErrorFromReason(e);
          return false;
        }
      },
      async close(): Promise<boolean> {
        try {
          await conn.close();
          return true;
        } catch (e) {
          this.sendError = connectErrorFromReason(e);
          return false;
        }
      },
      sendError: undefined,
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
