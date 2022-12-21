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
  // TODO(TCN-568, TCN-679) add methods for client-streaming and bidi-streaming
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

/**
 * UnaryFn is the method signature for a unary method of a CallbackClient.
 */
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

/**
 * ServerStreamingFn is the method signature for a server-streaming method of
 * a CallbackClient.
 */
type ServerStreamingFn<I extends Message<I>, O extends Message<O>> = (
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
      const conn = await transport.stream(
        service,
        method,
        options.signal,
        options.timeoutMs,
        options.headers
      );
      try {
        await conn.send(requestMessage);
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
      options.onHeader?.(await conn.responseHeader);
      let result = await conn.read();
      while (!result.done) {
        onResponse(result.value);
        result = await conn.read();
      }
      options.onTrailer?.(await conn.responseTrailer);
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
