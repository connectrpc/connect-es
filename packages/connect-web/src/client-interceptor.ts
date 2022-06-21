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
  AnyMessage,
  Message,
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";

// TODO document
export type Interceptor<
  I extends Message<I> = any,
  O extends Message<O> = any
> = (next: AnyFn<I, O>) => AnyFn<I, O>;

type AnyFn<I extends Message<I> = any, O extends Message<O> = any> = (
  req: UnaryRequest<I>
) => Promise<UnaryResponse<O> | StreamResponse<O>>;

// TODO document
export interface UnaryRequest<I extends Message<I> = AnyMessage> {
  readonly stream: false;
  readonly service: ServiceType;
  readonly method: MethodInfo<I, AnyMessage>;
  readonly url: string;
  readonly init: Exclude<RequestInit, "body" | "headers" | "signal">;
  readonly signal: AbortSignal;
  readonly header: Headers;
  readonly message: I;
}

// TODO document
export interface UnaryResponse<O extends Message<O> = AnyMessage> {
  readonly stream: false;
  readonly service: ServiceType;
  readonly method: MethodInfo<AnyMessage, O>;
  readonly header: Headers;
  readonly message: O;
  readonly trailer: Headers;
}

// TODO document
export interface StreamResponse<O extends Message<O> = AnyMessage> {
  readonly stream: true;
  readonly service: ServiceType;
  readonly method: MethodInfo<AnyMessage, O>;
  readonly header: Headers;

  // cancel(reason?: any): Promise<void>;
  read(): Promise<ReadableStreamDefaultReadResult<O>>;

  readonly trailer: Headers;
}

// TODO document
export function runUnary<I extends Message<I>, O extends Message<O>>(
  req: UnaryRequest<I>,
  next: UnaryFn<I, O>,
  interceptors?: Interceptor[]
): Promise<UnaryResponse<O>> {
  if (interceptors) {
    next = applyInterceptors(next, interceptors) as UnaryFn<I, O>;
  }
  return next(req);
}

type UnaryFn<I extends Message<I> = any, O extends Message<O> = any> = (
  req: UnaryRequest<I>
) => Promise<UnaryResponse<O>>;

// TODO document
export function runServerStream<I extends Message<I>, O extends Message<O>>(
  req: UnaryRequest<I>,
  next: ServerStreamFn<I, O>,
  interceptors?: Interceptor[]
): Promise<StreamResponse<O>> {
  if (interceptors) {
    next = applyInterceptors(next, interceptors) as ServerStreamFn<I, O>;
  }
  return next(req);
}

type ServerStreamFn<I extends Message<I> = any, O extends Message<O> = any> = (
  req: UnaryRequest<I>
) => Promise<StreamResponse<O>>;

function applyInterceptors(next: AnyFn, interceptors: Interceptor[]): AnyFn {
  return interceptors
    .concat()
    .reverse()
    .reduce((n, i) => i(n), next);
}
