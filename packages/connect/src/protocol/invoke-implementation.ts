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

import type { DescMessage, MessageShape } from "@bufbuild/protobuf";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import type { HandlerContext, MethodImplSpec } from "../implementation.js";
import { createAsyncIterable } from "./async-iterable.js";
import type { AsyncIterableTransform } from "./async-iterable.js";
import { normalize, normalizeIterable } from "./normalize.js";
import type {
  Interceptor,
  RequestCommon,
  ResponseCommon,
  StreamRequest,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
} from "../interceptor.js";
import { applyInterceptors } from "../interceptor.js";
import type { DescMethodStreaming } from "../types.js";

/**
 * Invoke a user-provided implementation of a unary RPC. Returns a normalized
 * output message.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export async function invokeUnaryImplementation<
  I extends DescMessage,
  O extends DescMessage,
>(
  spec: MethodImplSpec<I, O> & { kind: "unary" },
  context: HandlerContext,
  input: MessageShape<I>,
  interceptors: Interceptor[],
): Promise<MessageShape<O>> {
  const anyFn = async (
    req: UnaryRequest<I, O>,
  ): Promise<UnaryResponse<I, O>> => {
    return {
      message: normalize(
        spec.method.output,
        await spec.impl(req.message, mergeRequest(context, req)),
      ),
      stream: false,
      method: spec.method,
      ...responseCommon(context, spec),
    };
  };
  const next = applyInterceptors(anyFn, interceptors);
  const { message, header, trailer } = await next({
    stream: false,
    message: input,
    method: spec.method,
    ...requestCommon(context, spec),
  });
  copyHeaders(header, context.responseHeader);
  copyHeaders(trailer, context.responseTrailer);
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
  I extends DescMessage,
  O extends DescMessage,
>(
  spec: MethodImplSpec<I, O>,
  context: HandlerContext,
  interceptors: Interceptor[],
): AsyncIterableTransform<MessageShape<I>, MessageShape<O>> {
  switch (spec.kind) {
    case "unary":
      return async function* unary(input: AsyncIterable<MessageShape<I>>) {
        yield await invokeUnaryImplementation(
          spec,
          context,
          await ensureSingle(input, "unary"),
          interceptors,
        );
      };
    case "server_streaming": {
      return function serverStreaming(input: AsyncIterable<MessageShape<I>>) {
        return invokeStreamImplementation(
          spec,
          context,
          input,
          interceptors,
          async (req: StreamRequest<I, O>): Promise<StreamResponse<I, O>> => {
            const output = normalizeIterable(
              spec.method.output,
              spec.impl(
                await ensureSingle(input, "server-streaming"),
                mergeRequest(context, req),
              ),
            );
            return {
              stream: true,
              message: output,
              method: spec.method as DescMethodStreaming<I, O>,
              ...responseCommon(context, spec),
            };
          },
        );
      };
    }
    case "client_streaming": {
      return function clientStreaming(input: AsyncIterable<MessageShape<I>>) {
        return invokeStreamImplementation(
          spec,
          context,
          input,
          interceptors,
          async (req: StreamRequest<I, O>): Promise<StreamResponse<I, O>> => {
            return {
              message: createAsyncIterable([
                normalize(
                  spec.method.output,
                  await spec.impl(req.message, mergeRequest(context, req)),
                ),
              ]),
              stream: true,
              method: spec.method as DescMethodStreaming<I, O>,
              ...responseCommon(context, spec),
            };
          },
        );
      };
    }
    case "bidi_streaming":
      return function biDiStreaming(input: AsyncIterable<MessageShape<I>>) {
        return invokeStreamImplementation(
          spec,
          context,
          input,
          interceptors,
          (req: StreamRequest<I, O>): Promise<StreamResponse<I, O>> => {
            return Promise.resolve({
              message: normalizeIterable(
                spec.method.output,
                spec.impl(req.message, mergeRequest(context, req)),
              ),
              stream: true,
              method: spec.method as DescMethodStreaming<I, O>,
              ...responseCommon(context, spec),
            });
          },
        );
      };
  }
}

async function* invokeStreamImplementation<
  I extends DescMessage,
  O extends DescMessage,
>(
  spec: MethodImplSpec<I, O>,
  context: HandlerContext,
  input: AsyncIterable<MessageShape<I>>,
  interceptors: Interceptor[],
  anyFn: (req: StreamRequest<I, O>) => Promise<StreamResponse<I, O>>,
): AsyncIterable<MessageShape<O>> {
  const next = applyInterceptors(anyFn, interceptors);
  const { message, header, trailer } = await next({
    stream: true,
    message: input,
    method: spec.method as DescMethodStreaming<I, O>,
    ...requestCommon(context, spec),
  });
  copyHeaders(header, context.responseHeader);
  yield* message;
  copyHeaders(trailer, context.responseTrailer);
}

async function ensureSingle<T>(
  iterable: AsyncIterable<T>,
  method: string,
): Promise<T> {
  const it = iterable[Symbol.asyncIterator]();
  const first = await it.next();
  if (first.done === true) {
    throw new ConnectError(
      `protocol error: missing input message for ${method} method`,
      Code.Unimplemented,
    );
  }
  const second = await it.next();
  if (second.done !== true) {
    throw new ConnectError(
      `protocol error: received extra input message for ${method} method`,
      Code.Unimplemented,
    );
  }
  return first.value;
}

function requestCommon(
  context: HandlerContext,
  spec: MethodImplSpec,
): RequestCommon {
  return {
    requestMethod: context.requestMethod,
    url: context.url,
    signal: context.signal,
    header: context.requestHeader,
    service: spec.method.parent,
    contextValues: context.values,
  };
}

function responseCommon(
  context: HandlerContext,
  spec: MethodImplSpec,
): ResponseCommon {
  return {
    service: spec.method.parent,
    header: context.responseHeader,
    trailer: context.responseTrailer,
  };
}

function mergeRequest(
  context: HandlerContext,
  req: RequestCommon,
): HandlerContext {
  return {
    ...context,
    service: req.service,
    requestHeader: req.header,
    signal: req.signal,
    values: req.contextValues,
  };
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
