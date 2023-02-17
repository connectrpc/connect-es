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

import type {
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type { Transport } from "./transport.js";
import type { ConnectError } from "./connect-error.js";
import {
  Interceptor,
  runStreaming,
  runUnary,
  StreamResponse,
  StreamRequest,
  UnaryRequest,
  UnaryResponse,
} from "./interceptor.js";
import { createMethodUrl } from "./protocol/index.js";

interface StubTransportOptions {
  interceptors?: Interceptor[];
  unaryResponseHeader?: HeadersInit;
  unaryResponseTrailer?: HeadersInit;
  streamOutput?: (null | ConnectError)[]; // null for default message, ConnectError for error
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
    stream(service, method, signal, timeoutMs, header, input) {
      return runStreaming(
        createStreamingRequest(options, service, method, signal, header, input),
        (req) => Promise.resolve(createStreamingResponse(options, req)),
        options.interceptors
      );
    },
  };
}

/**
 * Create a request with a single message.
 */
function createUnaryRequest<I extends Message<I>, O extends Message<O>>(
  stub: StubTransportOptions,
  service: ServiceType,
  method: MethodInfo<I, O>,
  signal: AbortSignal | undefined,
  header: HeadersInit | undefined,
  message: PartialMessage<I>
): UnaryRequest<I, O> {
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
): UnaryResponse<I, O> {
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
  header: HeadersInit | undefined,
  input: AsyncIterable<I>
): StreamRequest<I, O> {
  return {
    stream: true,
    service,
    method,
    url: createMethodUrl("", service, method),
    init: {},
    signal: signal ?? new AbortController().signal,
    header: new Headers(header),
    message: input,
  };
}

/**
 * Create a streaming response with three messages with default values.
 */
function createStreamingResponse<I extends Message<I>, O extends Message<O>>(
  stub: StubTransportOptions,
  request: StreamRequest<I, O>
): StreamResponse<I, O> {
  const streamRead = stub.streamOutput ?? [null];
  const trailer = new Headers();
  // eslint-disable-next-line @typescript-eslint/require-await
  async function* output() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of request.message) {
      //
    }
    for (const nullOrConnectErr of streamRead) {
      if (nullOrConnectErr === null) {
        yield new request.method.O();
      } else {
        throw nullOrConnectErr;
      }
    }
    if (stub.streamResponseTrailer) {
      new Headers(stub.streamResponseTrailer).forEach((value, key) =>
        trailer.set(key, value)
      );
    }
  }
  return {
    stream: true as const,
    service: request.service,
    method: request.method,
    header: new Headers(stub.streamResponseHeader),
    trailer,
    message: output(),
  };
}
