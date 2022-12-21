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
  AnyMessage,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type { Transport } from "./transport.js";
import { ConnectError } from "./connect-error.js";
import {
  Interceptor,
  runStreaming,
  runUnary,
  StreamingConn,
  StreamingRequest,
  UnaryRequest,
  UnaryResponse,
} from "./interceptor.js";
import { createMethodUrl } from "./create-method-url.js";

interface StubTransportOptions {
  interceptors?: Interceptor[];
  unaryResponseHeader?: HeadersInit;
  unaryResponseTrailer?: HeadersInit;
  streamSend?: (null | ConnectError)[];
  streamClose?: null | ConnectError;
  streamRead?: (null | ConnectError)[];
  streamResponseHeader?: HeadersInit;
  streamResponseTrailer?: HeadersInit;
}

export function stubTransport(options: StubTransportOptions): Transport {
  return {
    unary(service, method, signal, timeoutMs, header, message) {
      return runUnary(
        createUnaryRequest(options, service, method, signal, header, message),
        (req) =>
          Promise.resolve(createUnaryResponse(options, service, method, req)),
        options.interceptors
      );
    },
    stream(service, method, signal, timeoutMs, header) {
      return runStreaming(
        createStreamingRequest(options, service, method, signal, header),
        (req) => Promise.resolve(createStreamingConn(options, req)),
        options.interceptors
      );
    },
  };
}

/**
 * Create a request with a single message.
 */
function createUnaryRequest<T extends Message<T>>(
  stub: StubTransportOptions,
  service: ServiceType,
  method: MethodInfo<T, AnyMessage>,
  signal: AbortSignal | undefined,
  header: HeadersInit | undefined,
  message: PartialMessage<T>
): UnaryRequest<T> {
  signal = signal ?? new AbortController().signal;
  return {
    stream: false,
    service,
    method,
    url: createMethodUrl("", service, method),
    init: {},
    signal,
    header: new Headers(header ?? {}),
    message: new method.I(message),
  };
}

/**
 * Create a response with a single message with default values.
 */
function createUnaryResponse<I extends Message<I>, O extends Message<O>>(
  stub: StubTransportOptions,
  service: ServiceType,
  method: MethodInfo<I, O>,
  request: UnaryRequest // eslint-disable-line @typescript-eslint/no-unused-vars
): UnaryResponse<O> {
  return {
    stream: false,
    service,
    method,
    header: new Headers(stub.unaryResponseHeader),
    message: new method.O(),
    trailer: new Headers(stub.unaryResponseTrailer),
  };
}

function createStreamingRequest<I extends Message<I>, O extends Message<O>>(
  stub: StubTransportOptions,
  service: ServiceType,
  method: MethodInfo<I, O>,
  signal: AbortSignal | undefined,
  header: HeadersInit | undefined
): StreamingRequest<I, O> {
  return {
    stream: true,
    service,
    method,
    url: createMethodUrl("", service, method),
    init: {},
    signal: signal ?? new AbortController().signal,
    header: new Headers(header),
  };
}

/**
 * Create a streaming response with three messages with default values.
 */
function createStreamingConn<I extends Message<I>, O extends Message<O>>(
  stub: StubTransportOptions,
  request: StreamingRequest<I, O>
): StreamingConn<I, O> {
  const streamRead = stub.streamRead ?? [null];
  const responseHeader = defer<Headers>();
  const responseTrailer = defer<Headers>();
  return {
    service: request.service,
    method: request.method,
    stream: true as const,
    send() {
      if (stub.streamSend === undefined) {
        return Promise.resolve();
      }
      const r = stub.streamSend.shift();
      if (r === null) {
        return Promise.resolve();
      }
      if (r === undefined) {
        return Promise.reject("stub transport ran out of stream send results");
      }
      return Promise.reject(r);
    },
    close() {
      if (this.closed) {
        throw new ConnectError("cannot send, stream is already closed");
      }
      this.closed = true;
      if (stub.streamClose === undefined) {
        return Promise.resolve();
      }
      if (stub.streamClose === null) {
        return Promise.resolve();
      }
      return Promise.reject(stub.streamClose);
    },
    closed: false,
    responseHeader,
    async read() {
      if (stub.streamResponseHeader !== undefined) {
        responseHeader.resolve(new Headers(stub.streamResponseHeader));
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
      const r = streamRead.shift();
      if (r === undefined) {
        if (stub.streamResponseTrailer !== undefined) {
          responseTrailer.resolve(new Headers(stub.streamResponseTrailer));
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        return {
          done: true as const,
          value: undefined,
        };
      }
      if (r === null) {
        return {
          done: false as const,
          value: new request.method.O(),
        };
      }
      throw r;
    },
    responseTrailer,
  };
}

function defer<T>(): Promise<T> & Ctrl<T> {
  let res: ((v: T | PromiseLike<T>) => void) | undefined = undefined;
  let rej: ((reason?: unknown) => void) | undefined;
  const p = new Promise<T>((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  void p.catch(() => {
    // We want to provide several promises that are typically awaited
    // by the user one after the other.
    // If we reject one of the promises before it is awaited by the user,
    // some runtimes may report an unhandled promise rejection.
    // We are attaching this error handler to avoid the warnings.
  });
  const c: Ctrl<T> = {
    resolve(v) {
      res?.(v);
    },
    reject(reason) {
      rej?.(reason);
    },
  };
  return Object.assign(p, c);
}

type Ctrl<T> = {
  resolve(v: T | PromiseLike<T>): void;
  reject(reason?: unknown): void;
};
