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
import type { ConnectError } from "./connect-error.js";
import type { Transport } from "./transport.js";
import { Code } from "./code.js";
import { makeAnyClient } from "./any-client.js";
import { connectErrorFromReason } from "./connect-error.js";
import type { CallOptions } from "./call-options.js";

// prettier-ignore
/**
 * CallbackClient is a simple client that supports unary and server
 * streaming methods. Methods take callback functions, which will be
 * called when a response message arrives, or an error occurs.
 *
 * Client methods return a function that cancels the call. This is a
 * convenient alternative to creating a AbortController and passing
 * its AbortSignal as an option to the method.
 *
 * If a call is cancelled by an AbortController or by the returned
 * cancel-function, ConnectErrors with the code Canceled are
 * silently discarded.
 *
 * CallbackClient is most convenient for use in React effects, where
 * a function returned by the effect is called when the effect is
 * torn down.
 */
export type CallbackClient<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: PartialMessage<I>, callback: (error: ConnectError | undefined, response: O) => void, options?: CallOptions) => CancelFn
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: PartialMessage<I>, messageCallback: (response: O) => void, closeCallback: (error: ConnectError | undefined) => void, options?: CallOptions) => CancelFn
  : never;
};

type CancelFn = () => void;

/**
 * Create a CallbackClient for the given service, invoking RPCs through the
 * given transport.
 */
export function createCallbackClient<T extends ServiceType>(
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
  }) as CallbackClient<T>;
}

type UnaryFn<I extends Message<I>, O extends Message<O>> = (
  request: PartialMessage<I>,
  callback: (error: ConnectError | undefined, response: O) => void,
  options?: CallOptions
) => CancelFn;

function createUnaryFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): UnaryFn<I, O> {
  return function (requestMessage, callback, options) {
    const abort = new AbortController();
    options = wrapSignal(abort, options);
    transport
      .unary(
        service,
        method,
        abort.signal,
        options.timeoutMs,
        options.headers,
        requestMessage
      )
      .then(
        (response) => {
          options?.onHeader?.(response.header);
          options?.onTrailer?.(response.trailer);
          callback(undefined, response.message);
        },
        (reason) => {
          const err = connectErrorFromReason(reason, Code.Internal);
          if (err.code === Code.Canceled && abort.signal.aborted) {
            // As documented, discard Canceled errors if canceled by the user.
            return;
          }
          callback(err, new method.O());
        }
      );
    return () => abort.abort();
  };
}

type ServerStreamingFn<I extends Message, O extends Message> = (
  request: PartialMessage<I>,
  onResponse: (response: O) => void,
  onClose: (error: ConnectError | undefined) => void,
  options?: CallOptions
) => CancelFn;

function createServerStreamingFn<I extends Message<I>, O extends Message<O>>(
  transport: Transport,
  service: ServiceType,
  method: MethodInfo<I, O>
): ServerStreamingFn<I, O> {
  return function (requestMessage, onResponse, onClose, options) {
    const abort = new AbortController();
    async function run() {
      options = wrapSignal(abort, options);
      const streamResponse = await transport.serverStream(
        service,
        method,
        options.signal,
        options.timeoutMs,
        options.headers,
        requestMessage
      );
      options.onHeader?.(streamResponse.header);
      let result = await streamResponse.read();
      while (!result.done) {
        onResponse(result.value);
        result = await streamResponse.read();
      }
      options.onTrailer?.(streamResponse.trailer);
      onClose(undefined);
    }
    run().catch((reason) => {
      const err = connectErrorFromReason(reason, Code.Internal);
      if (err.code === Code.Canceled && abort.signal.aborted) {
        // As documented, discard Canceled errors if canceled by the user,
        // but do invoke the close-callback.
        onClose(undefined);
      } else {
        onClose(err);
      }
    });
    return () => abort.abort();
  };
}

function wrapSignal(
  abort: AbortController,
  options: CallOptions | undefined
): CallOptions {
  if (options?.signal) {
    options.signal.addEventListener("abort", () => abort.abort());
    if (options.signal.aborted) {
      abort.abort();
    }
  }
  return { ...options, signal: abort.signal };
}
