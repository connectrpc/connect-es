// Copyright 2020-2022 Buf Technologies, Inc.
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
  Message,
  MessageType,
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";
import type { ConnectError } from "./connect-error.js";
import type { AnyMessage } from "@bufbuild/protobuf";

/**
 * ClientTransport represents the underlying transport for a client.
 * A transport implements a protocol, such as gRPC-web, and allows for the
 * concrete clients to be independent of the protocol.
 */
export interface ClientTransport {
  call<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage>(
    service: ServiceType,
    method: MethodInfo<I, O>,
    options: ClientCallOptions
  ): [ClientRequest<I>, ClientResponse<O>];
}

/**
 * A ClientCall is a function that will invoke one specific RPC.
 * The function is tied to a ClientTransport.
 *
 * This primitive is used by all concrete clients.
 */
export interface ClientCall<I extends Message<I>, O extends Message<O>> {
  (options?: ClientCallOptions): [ClientRequest<I>, ClientResponse<O>];
  localName: string;
  service: ServiceType;
  method: MethodInfo<I, O>;
  transport: ClientTransport;
}

/**
 * Options for a call. Each client method accepts an optional argument
 * with this interface.
 */
export interface ClientCallOptions {
  /**
   * Timeout in milliseconds.
   */
  timeout?: number;

  /**
   * Custom headers to send with the request.
   */
  headers?: HeadersInit;

  /**
   * An optional AbortSignal to cancel the call.
   * If cancelled, an error with StatusCode.Canceled is raised.
   */
  signal?: AbortSignal;
}

/**
 * Create a ClientCall for each method of the given service, using
 * the given transport.
 */
export function createClientTransportCalls(
  service: ServiceType,
  transport: ClientTransport
) {
  return Object.keys(service.methods).map((localName) =>
    createClientTransportCall(transport, service, localName)
  );
}

/**
 * Create a ClientCall for the given RPC - a function that will invoke the RPC
 * through the given transport when called.
 */
function createClientTransportCall<
  T extends ServiceType,
  N extends keyof T["methods"] & string
>(
  transport: ClientTransport,
  service: T,
  methodLocalName: N
): ClientCall<ServiceMethodInput<T, N>, ServiceMethodOutput<T, N>> {
  type I = ServiceMethodInput<T, N>;
  type O = ServiceMethodOutput<T, N>;
  const method = service.methods[methodLocalName] as MethodInfo<I, O>;
  return Object.assign(
    function (options?: ClientCallOptions) {
      return transport.call(service, method, options ?? {});
    },
    {
      localName: methodLocalName,
      service,
      method,
      transport,
    }
  );
}

/**
 * ClientRequest represents the sending half of a client.
 */
export interface ClientRequest<T extends Message<T> = AnyMessage> {
  readonly url: string;
  readonly init: Exclude<RequestInit, "body" | "headers" | "signal">;
  readonly abort: AbortSignal;
  readonly header: Headers;

  /**
   * Send the given request message. If this is the first message to be sent,
   * calling this method also sends request headers.
   */
  send(message: T, callback: ClientRequestCallback): void;
}

export type ClientRequestCallback = (error: ConnectError | undefined) => void;

/**
 * ClientResponse represents the receiving half of a client.
 */
export interface ClientResponse<T extends Message<T> = AnyMessage> {
  /**
   * Receive reads from the response. For every invocation, the callback is
   * guaranteed to be called at least once. One invocation will never produce
   * more than one message.
   */
  receive(handler: ClientResponseHandler<T>): void;
}

/**
 * ClientResponseHandler is the callback for the receiving half of a client.
 */
export interface ClientResponseHandler<T extends Message<T> = AnyMessage> {
  onHeader?(header: Headers): void;
  onMessage(message: T): void;
  onTrailer?(trailer: Headers): void;
  onClose(error?: ConnectError): void;
}

/**
 * A utility that sequentially reads all messages from the response, and calls
 * the callback for each of them.
 */
export function receiveAll<T extends Message<T>>(
  response: ClientResponse<T>,
  handler: ClientResponseHandler<T>
): void {
  response.receive({
    onHeader(header: Headers) {
      handler.onHeader?.(header);
    },
    onTrailer(trailer: Headers) {
      handler.onTrailer?.(trailer);
    },
    onMessage(message: T) {
      handler.onMessage(message);
      response.receive(this);
    },
    onClose(error?: ConnectError) {
      handler.onClose(error);
    },
  });
}

// extract the input type of a RPC
type ServiceMethodInput<
  T extends ServiceType,
  M extends keyof T["methods"]
> = T["methods"][M]["I"] extends MessageType<infer I>
  ? I extends Message<I>
    ? I
    : never
  : never;

// extract the output type of a RPC
type ServiceMethodOutput<
  T extends ServiceType,
  M extends keyof T["methods"]
> = T["methods"][M]["O"] extends MessageType<infer O>
  ? O extends Message<O>
    ? O
    : never
  : never;
