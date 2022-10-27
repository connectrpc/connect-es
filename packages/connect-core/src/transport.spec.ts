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

import {
  AnyMessage,
  Message,
  MethodInfo,
  MethodKind,
  PartialMessage,
  ServiceType,
  Struct,
} from "@bufbuild/protobuf";
import { Empty } from "@bufbuild/protobuf";
import type { Interceptor, StreamingConn, StreamingRequest, UnaryRequest, UnaryResponse } from "./interceptor.js";
import type { Transport } from "./transport.js";
import { runStreaming, runUnary } from "./interceptor.js";
import { createPromiseClient } from "./promise-client.js";

// TODO cover client streams

describe("custom stub transport", () => {
  /**
   * Create a request with a single message.
   */
  function createUnaryRequest<T extends Message<T>>(
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
      url: "fake",
      init: {},
      signal,
      header: new Headers(header ?? {}),
      message: new method.I(message),
    };
  }

  /**
   * Create a response with a single message with default values.
   */
  function createUnaryResponse<T extends Message<T>>(
    service: ServiceType,
    method: MethodInfo<AnyMessage, T>
  ): UnaryResponse<T> {
    return {
      stream: false,
      service,
      method,
      header: new Headers(),
      message: new method.O(),
      trailer: new Headers(),
    };
  }

  function createStreamingInit<I extends Message<I>, O extends Message<O>>(
    service: ServiceType,
    method: MethodInfo<I, O>,
    signal: AbortSignal | undefined,
    header: HeadersInit | undefined,
  ): StreamingRequest<I,O> {
    return {
      stream: true,
      service,
      method,
      url: "fake",
      init: {},
      signal: signal ?? new AbortController().signal,
      requestHeader: new Headers(header),
    };
  }

  /**
   * Create a streaming response with three messages with default values.
   */
  function createStreamingConn<I extends Message<I>, O extends Message<O>>(
    service: ServiceType,
    method: MethodInfo<I, O>,
    signal: AbortSignal | undefined,
    header: HeadersInit | undefined,
  ): StreamingConn<I,O> {
    const responses = [new method.O(), new method.O(), new method.O()];
    return {
      ...createStreamingInit(service, method, signal, header),
      send(message: PartialMessage<I>): Promise<void> {
        return Promise.resolve();
      },
      close(): Promise<void> {
        return Promise.resolve();
      },
      closed: false,
      responseHeader: Promise.resolve(new Headers()),
      read() {
        const value = responses.pop();
        return Promise.resolve(value ? { done: false, value } : { done: true });
      },
      responseTrailer: Promise.resolve(new Headers()),
    };
  }

  /**
   * Create a stub transport that only returns default response messages.
   */
  function createStubTransport(interceptors?: Interceptor[]): Transport {
    return {
      unary(service, method, signal, timeoutMs, header, message) {
        return runUnary(
          createUnaryRequest(service, method, signal, header, message),
          (_req) => Promise.resolve(createUnaryResponse(service, method)), // eslint-disable-line @typescript-eslint/no-unused-vars
          interceptors
        );
      },
      stream(service, method, signal, timeoutMs, header) {
        return runStreaming(
          createStreamingInit(service, method, signal, header),
          (_req) => Promise.resolve(createStreamingConn(service, method, signal, header)), // eslint-disable-line @typescript-eslint/no-unused-vars
          interceptors
        );
      },
    };
  }

  const TestService = {
    typeName: "handwritten.TestService",
    methods: {
      foo: {
        name: "Foo",
        I: Empty,
        O: Struct,
        kind: MethodKind.Unary,
      },
      bar: {
        name: "Foo",
        I: Empty,
        O: Struct,
        kind: MethodKind.ServerStreaming,
      },
    },
  } as const;

  const stubTransport = createStubTransport();
  const client = createPromiseClient(TestService, stubTransport);
  it("should return the default message for unary", async () => {
    const res = await client.foo({});
    expect(res).toBeDefined();
    expect(res).toBeInstanceOf(Struct);
  });
  it("should return the default message for server-streaming 3 times", async () => {
    let responseCount = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const res of client.bar({})) {
      expect(res).toBeInstanceOf(Struct);
      responseCount++;
    }
    expect(responseCount).toBe(3);
  });
});
