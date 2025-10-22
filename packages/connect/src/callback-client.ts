// Copyright 2021-2025 The Connect Authors
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

import { create } from "@bufbuild/protobuf";
import type {
  DescService,
  DescMessage,
  MessageInitShape,
  MessageShape,
  DescMethodServerStreaming,
  DescMethodStreaming,
  DescMethodUnary,
} from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import type { Transport } from "./transport.js";
import { Code } from "./code.js";
import { makeAnyClient } from "./any-client.js";
import type { CallOptions } from "./call-options.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";

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
 * cancel function, ConnectErrors with the code Canceled are
 * silently discarded.
 *
 * CallbackClient is most convenient for use in React effects, where
 * a function returned by the effect is called when the effect is
 * torn down.
 */
export type CallbackClient<Desc extends DescService> = {
  [P in keyof Desc["method"]]: Desc["method"][P] extends DescMethodUnary<
    infer I,
    infer O
  >
    ? (
        request: MessageInitShape<I>,
        callback: (
          error: ConnectError | undefined,
          response: MessageShape<O>,
        ) => void,
        options?: CallOptions,
      ) => CancelFn
    : Desc["method"][P] extends DescMethodServerStreaming<infer I, infer O>
      ? (
          request: MessageInitShape<I>,
          messageCallback: (response: MessageShape<O>) => void,
          closeCallback: (error: ConnectError | undefined) => void,
          options?: CallOptions,
        ) => CancelFn
      : never;
};

type CancelFn = () => void;

/**
 * Create a CallbackClient for the given service, invoking RPCs through the
 * given transport.
 */
export function createCallbackClient<T extends DescService>(
  service: T,
  transport: Transport,
) {
  return makeAnyClient(
    service,
    (method: DescMethodUnary | DescMethodStreaming) => {
      switch (method.methodKind) {
        case "unary":
          return createUnaryFn(transport, method);
        case "server_streaming":
          return createServerStreamingFn(transport, method);
        default:
          return null;
      }
    },
  ) as CallbackClient<T>;
}

/**
 * UnaryFn is the method signature for a unary method of a CallbackClient.
 */
type UnaryFn<I extends DescMessage, O extends DescMessage> = (
  request: MessageInitShape<I>,
  callback: (
    error: ConnectError | undefined,
    response: MessageShape<O> | undefined,
  ) => void,
  options?: CallOptions,
) => CancelFn;

function createUnaryFn<I extends DescMessage, O extends DescMessage>(
  transport: Transport,
  method: DescMethodUnary<I, O>,
): UnaryFn<I, O> {
  return (requestMessage, callback, options) => {
    const abort = new AbortController();
    options = wrapSignal(abort, options);
    transport
      .unary(
        method,
        abort.signal,
        options.timeoutMs,
        options.headers,
        requestMessage,
        options.contextValues,
      )
      .then(
        (response) => {
          options.onHeader?.(response.header);
          options.onTrailer?.(response.trailer);
          callback(undefined, response.message);
        },
        (reason) => {
          const err = ConnectError.from(reason, Code.Internal);
          if (err.code === Code.Canceled && abort.signal.aborted) {
            // As documented, discard Canceled errors if canceled by the user.
            return;
          }
          callback(err, create(method.output));
        },
      );
    return () => abort.abort();
  };
}

/**
 * ServerStreamingFn is the method signature for a server-streaming method of
 * a CallbackClient.
 */
type ServerStreamingFn<I extends DescMessage, O extends DescMessage> = (
  request: MessageInitShape<I>,
  onResponse: (response: MessageShape<O>) => void,
  onClose: (error: ConnectError | undefined) => void,
  options?: CallOptions,
) => CancelFn;

function createServerStreamingFn<I extends DescMessage, O extends DescMessage>(
  transport: Transport,
  method: DescMethodServerStreaming<I, O>,
): ServerStreamingFn<I, O> {
  return (input, onResponse, onClose, options) => {
    const abort = new AbortController();
    async function run() {
      options = wrapSignal(abort, options);
      const response = await transport.stream(
        method,
        options.signal,
        options.timeoutMs,
        options.headers,
        createAsyncIterable([input]),
        options.contextValues,
      );
      options.onHeader?.(response.header);
      for await (const message of response.message) {
        onResponse(message);
      }
      options.onTrailer?.(response.trailer);
      onClose(undefined);
    }
    run().catch((reason) => {
      const err = ConnectError.from(reason, Code.Internal);
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
  options: CallOptions | undefined,
): CallOptions {
  if (options?.signal) {
    options.signal.addEventListener("abort", () => abort.abort());
    if (options.signal.aborted) {
      abort.abort();
    }
  }
  return { ...options, signal: abort.signal };
}
