// Copyright 2021-2024 The Connect Authors
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

import { Message, MethodKind } from "@bufbuild/protobuf";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import type { HandlerContext, MethodImplSpec } from "../implementation.js";
import type { AsyncIterableTransform } from "./async-iterable.js";
import { normalize, normalizeIterable } from "./normalize.js";
import type {
  Interceptor,
  StreamRequest,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
} from "../interceptor.js";
import { applyInterceptors } from "../interceptor.js";

/**
 * Invoke a user-provided implementation of a unary RPC. Returns a normalized
 * output message.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export async function invokeUnaryImplementation<
  I extends Message<I>,
  O extends Message<O>,
>(
  spec: MethodImplSpec<I, O> & { kind: MethodKind.Unary },
  context: HandlerContext,
  input: I,
  interceptors: Interceptor[],
): Promise<O> {
  const anyFn = async (
    req: UnaryRequest<I, O>,
  ): Promise<UnaryResponse<I, O>> => {
    return {
      message: normalize(
        spec.method.O,
        await spec.impl(req.message, {
          ...context,
          service: req.service,
          method: req.method,
          requestHeader: req.header,
          values: req.contextValues,
          signal: req.signal,
        }),
      ),
      stream: false,
      service: req.service,
      method: req.method,
      header: context.responseHeader,
      trailer: context.responseTrailer,
    };
  };
  const next = applyInterceptors(anyFn, interceptors);
  const { message } = await next({
    init: {
      method: context.requestMethod,
    },
    message: input,
    url: context.url,
    signal: context.signal,
    service: spec.service,
    method: spec.method,
    header: context.requestHeader,
    contextValues: context.values,
    stream: false,
  });
  return message;
}

/**
 * Return an AsyncIterableTransform that invokes a user-provided implementation,
 * giving it input from an asynchronous iterable, and returning its output as an
 * asynchronous iterable.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function transformInvokeImplementation<
  I extends Message<I>,
  O extends Message<O>,
>(
  spec: MethodImplSpec<I, O>,
  context: HandlerContext,
  interceptors: Interceptor[],
): AsyncIterableTransform<I, O> {
  switch (spec.kind) {
    case MethodKind.Unary:
      return async function* unary(input: AsyncIterable<I>) {
        const inputIt = input[Symbol.asyncIterator]();
        const input1 = await inputIt.next();
        if (input1.done === true) {
          throw new ConnectError(
            "protocol error: missing input message for unary method",
            Code.InvalidArgument,
          );
        }
        const anyFn = async (
          req: UnaryRequest<I, O>,
        ): Promise<UnaryResponse<I, O>> => {
          return {
            message: normalize(
              spec.method.O,
              await spec.impl(req.message, {
                ...context,
                service: req.service,
                method: req.method,
                requestHeader: req.header,
                values: req.contextValues,
                signal: req.signal,
              }),
            ),
            stream: false,
            service: req.service,
            method: req.method,
            header: context.responseHeader,
            trailer: context.responseTrailer,
          };
        };
        const next = applyInterceptors(anyFn, interceptors);
        const { message, header, trailer } = await next({
          init: {
            method: context.requestMethod,
          },
          message: input1.value,
          url: context.url,
          signal: context.signal,
          service: spec.service,
          method: spec.method,
          header: context.requestHeader,
          contextValues: context.values,
          stream: false,
        });
        copyHeaders(header, context.responseHeader);
        copyHeaders(trailer, context.responseTrailer);
        yield message;
        const input2 = await inputIt.next();
        if (input2.done !== true) {
          throw new ConnectError(
            "protocol error: received extra input message for unary method",
            Code.InvalidArgument,
          );
        }
      };
    case MethodKind.ServerStreaming: {
      return async function* serverStreaming(input: AsyncIterable<I>) {
        const inputIt = input[Symbol.asyncIterator]();
        const input1 = await inputIt.next();
        if (input1.done === true) {
          throw new ConnectError(
            "protocol error: missing input message for server-streaming method",
            Code.InvalidArgument,
          );
        }
        const anyFn = async (
          req: UnaryRequest<I, O>,
          // eslint-disable-next-line @typescript-eslint/require-await
        ): Promise<StreamResponse<I, O>> => {
          return {
            message: normalizeIterable(
              spec.method.O,
              spec.impl(req.message, {
                ...context,
                service: req.service,
                method: req.method,
                requestHeader: req.header,
                values: req.contextValues,
                signal: req.signal,
              }),
            ),
            stream: true,
            service: req.service,
            method: req.method,
            header: context.responseHeader,
            trailer: context.responseTrailer,
          };
        };
        const next = applyInterceptors(anyFn, interceptors);
        const { message, header, trailer } = await next({
          init: {
            method: context.requestMethod,
          },
          message: input1.value,
          url: context.url,
          signal: context.signal,
          service: spec.service,
          method: spec.method,
          header: context.requestHeader,
          contextValues: context.values,
          stream: false,
        });
        copyHeaders(header, context.responseHeader);
        copyHeaders(trailer, context.responseTrailer);
        yield* message;
        const input2 = await inputIt.next();
        if (input2.done !== true) {
          throw new ConnectError(
            "protocol error: received extra input message for server-streaming method",
            Code.InvalidArgument,
          );
        }
      };
    }
    case MethodKind.ClientStreaming: {
      return async function* clientStreaming(input: AsyncIterable<I>) {
        const anyFn = async (
          req: StreamRequest<I, O>,
        ): Promise<UnaryResponse<I, O>> => {
          return {
            message: normalize(
              spec.method.O,
              await spec.impl(req.message, {
                ...context,
                service: req.service,
                method: req.method,
                requestHeader: req.header,
                values: req.contextValues,
                signal: req.signal,
              }),
            ),
            stream: false,
            service: req.service,
            method: req.method,
            header: context.responseHeader,
            trailer: context.responseTrailer,
          };
        };
        const next = applyInterceptors(anyFn, interceptors);
        const { message, header, trailer } = await next({
          init: {
            method: context.requestMethod,
          },
          message: input,
          url: context.url,
          signal: context.signal,
          service: spec.service,
          method: spec.method,
          header: context.requestHeader,
          contextValues: context.values,
          stream: true,
        });
        copyHeaders(header, context.responseHeader);
        copyHeaders(trailer, context.responseTrailer);
        yield message;
      };
    }
    case MethodKind.BiDiStreaming:
      return async function* biDiStreaming(input: AsyncIterable<I>) {
        const anyFn = async (
          req: StreamRequest<I, O>,
          // eslint-disable-next-line @typescript-eslint/require-await
        ): Promise<StreamResponse<I, O>> => {
          return {
            message: normalizeIterable(
              spec.method.O,
              spec.impl(req.message, {
                ...context,
                service: req.service,
                method: req.method,
                requestHeader: req.header,
                values: req.contextValues,
                signal: req.signal,
              }),
            ),
            stream: true,
            service: req.service,
            method: req.method,
            header: context.responseHeader,
            trailer: context.responseTrailer,
          };
        };
        const next = applyInterceptors(anyFn, interceptors);
        const { message, header, trailer } = await next({
          init: {
            method: context.requestMethod,
          },
          message: input,
          url: context.url,
          signal: context.signal,
          service: spec.service,
          method: spec.method,
          header: context.requestHeader,
          contextValues: context.values,
          stream: true,
        });
        copyHeaders(header, context.responseHeader);
        copyHeaders(trailer, context.responseTrailer);
        yield* message;
      };
  }
}

function copyHeaders(from: Headers, to: Headers) {
  if (from === to) {
    return;
  }
  to.forEach((_, key) => {
    to.delete(key);
  });
  from.forEach((value, key) => {
    to.set(key, value);
  });
}
