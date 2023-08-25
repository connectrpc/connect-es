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

import { Message, MethodKind } from "@bufbuild/protobuf";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import type { HandlerContext, MethodImplSpec } from "../implementation.js";
import type { AsyncIterableTransform } from "./async-iterable.js";
import { normalize, normalizeIterable } from "./normalize.js";

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
): Promise<O> {
  const output = await spec.impl(input, context);
  return normalize(spec.method.O, output);
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
        yield normalize(spec.method.O, await spec.impl(input1.value, context));
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
        yield* normalizeIterable(
          spec.method.O,
          spec.impl(input1.value, context),
        );
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
        yield normalize(spec.method.O, await spec.impl(input, context));
      };
    }
    case MethodKind.BiDiStreaming:
      return function biDiStreaming(input: AsyncIterable<I>) {
        return normalizeIterable(spec.method.O, spec.impl(input, context));
      };
  }
}
