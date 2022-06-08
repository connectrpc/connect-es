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
import { MethodKind } from "@bufbuild/protobuf";
import type { ConnectError } from "./connect-error.js";
import { Message } from "@bufbuild/protobuf";
import {
  ClientTransport,
  receiveResponseUntilClose,
  ClientResponse,
  ClientCallOptions,
} from "./client-transport.js";
import type { MessageType } from "@bufbuild/protobuf";
import { makeAnyClient } from "./any-client.js";

// prettier-ignore
/**
 * PromiseClient is a simple client that supports unary and server-streaming
 * methods. Methods will produce a promise for the response message,
 * or an asynchronous iterable of response messages.
 */
export type PromiseClient<T extends ServiceType> = {
    [P in keyof T["methods"]]:
      T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: PartialMessage<I>, options?: ClientCallOptions) => Promise<O>
    : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: PartialMessage<I>, options?: ClientCallOptions) => Promise<AsyncIterable<O>>
    : never;
};

/**
 * Create a PromiseClient for the given service, invoking RPCs through the
 * given transport.
 */
export function makePromiseClient<T extends ServiceType>(
  service: T,
  transport: ClientTransport
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
  }) as PromiseClient<T>;
}

type UnaryFn<I extends Message<I>, O extends Message<O>> = (
  request: I | PartialMessage<I>,
  options?: ClientCallOptions
) => Promise<O>;

function createUnaryFn<I extends Message<I>, O extends Message<O>>(
  transport: ClientTransport,
  service: ServiceType,
  method: MethodInfo<I, O>
): UnaryFn<I, O> {
  return function (requestMessage, options) {
    return new Promise((resolve, reject) => {
      const [request, response] = transport.call(
        service,
        method,
        options ?? {}
      );
      request.send(messageFromPartial(requestMessage, method.I), (error) => {
        if (error) {
          reject(error);
        }
      });
      let singleMessage: O;
      receiveResponseUntilClose(response, {
        onMessage(message): void {
          singleMessage = message;
        },
        onClose(error?: ConnectError) {
          if (error) {
            reject(error);
          } else {
            resolve(singleMessage);
          }
        },
      });
    });
  };
}

type ServerStreamingFn<I extends Message<I>, O extends Message<O>> = (
  request: I | PartialMessage<I>,
  options?: ClientCallOptions
) => Promise<AsyncIterable<O>>;

function createServerStreamingFn<I extends Message<I>, O extends Message<O>>(
  transport: ClientTransport,
  service: ServiceType,
  method: MethodInfo<I, O>
): ServerStreamingFn<I, O> {
  return function (requestMessage, options) {
    const [request, response] = transport.call(service, method, options ?? {});
    return new Promise<AsyncIterable<O>>((resolve, reject) => {
      const message = messageFromPartial(requestMessage, method.I);
      request.send(message, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            [Symbol.asyncIterator](): AsyncIterator<O> {
              return createResponseMessageIterator(response);
            },
          });
        }
      });
    });
  };
}

function createResponseMessageIterator<T extends Message<T>>(
  response: ClientResponse<T>
): AsyncIterator<T> {
  return {
    next() {
      return new Promise((resolve, reject) => {
        response.receive({
          onMessage(message: T) {
            resolve({
              value: message,
              done: false,
            });
          },
          onClose(error?: ConnectError) {
            if (error) {
              reject(error);
            } else {
              resolve({
                value: undefined,
                done: true,
              });
            }
          },
        });
      });
    },
  };
}

function messageFromPartial<T extends Message<T>>(
  message: T | PartialMessage<T>,
  type: MessageType<T>
) {
  if (message instanceof type || message instanceof Message) {
    return message;
  }
  return new type(message);
}
