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
  ClientCallOptions,
  ClientRequest,
  ClientResponse,
} from "./client-transport.js";
import type {
  AnyMessage,
  Message,
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";

/**
 * ClientInterceptor gives you access to the request and response objects
 * provided by a ClientTransport.
 */
/** @deprecated */
export type ClientInterceptor = (
  service: ServiceType,
  method: MethodInfo,
  options: Readonly<ClientCallOptions>,
  request: ClientRequest,
  response: ClientResponse
) => [ClientRequest, ClientResponse];

// TODO
export interface UnaryRequest<I extends Message<I> = AnyMessage> {
  readonly service: ServiceType;
  readonly method: MethodInfo<I, AnyMessage>;
  readonly url: string;
  readonly init: Exclude<RequestInit, "body" | "headers" | "signal">;
  readonly signal: AbortSignal;
  readonly header: Headers;
  readonly message: I;
}

// TODO
export interface UnaryResponse<O extends Message<O> = AnyMessage> {
  readonly service: ServiceType;
  readonly method: MethodInfo<AnyMessage, O>;
  readonly header: Headers;
  readonly message: O;
  readonly trailer: Headers;
}

// TODO
export type UnaryFn<I extends Message<I> = any, O extends Message<O> = any> = (
  req: UnaryRequest<I>
) => Promise<UnaryResponse<O>>;

// TODO
export type UnaryInterceptor<
  I extends Message<I> = any,
  O extends Message<O> = any
> = (next: UnaryFn<I, O>) => UnaryFn<I, O>;

// TODO
export function runUnary<I extends Message<I>, O extends Message<O>>(
  unaryRequest: UnaryRequest<I>,
  unaryFn: UnaryFn<I, O>,
  interceptors?: UnaryInterceptor[]
): Promise<UnaryResponse<O>> {
  let next = unaryFn;
  if (interceptors) {
    next = interceptors
      .concat()
      .reverse()
      .reduce((n, i) => i(n), next);
  }
  return next(unaryRequest);
}
