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
  Interceptor,
  StreamResponse,
  UnaryRequest,
} from "@bufbuild/connect-web";
import {
  createPromiseClient,
  runServerStream,
  runUnary,
  Transport,
  UnaryResponse,
} from "@bufbuild/connect-web";
import type {
  AnyMessage,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { TestService } from "./gen/grpc/testing/test_connectweb.js";
import {
  SimpleResponse,
  StreamingOutputCallResponse,
} from "./gen/grpc/testing/messages_pb.js";

// TODO remove this file after connect-web has migrated to connect-core

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

  /**
   * Create a streaming response with three messages with default values.
   */
  function createStreamResponse<T extends Message<T>>(
    service: ServiceType,
    method: MethodInfo<AnyMessage, T>
  ): StreamResponse<T> {
    const responses = [new method.O(), new method.O(), new method.O()];
    return {
      stream: true,
      service,
      method,
      header: new Headers(),
      read() {
        const value = responses.pop();
        return Promise.resolve(value ? { done: false, value } : { done: true });
      },
      trailer: new Headers(),
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

          // This is the UnaryFn that will be wrapped by interceptors:
          (_req) => Promise.resolve(createUnaryResponse(service, method)), // eslint-disable-line @typescript-eslint/no-unused-vars
          interceptors
        );
      },
      serverStream(service, method, signal, timeoutMs, header, message) {
        signal = signal ?? new AbortController().signal;
        return runServerStream(
          createUnaryRequest(service, method, signal, header, message),
          // This is the ServerStreamFn that will be wrapped by interceptors:
          (_req) => Promise.resolve(createStreamResponse(service, method)), // eslint-disable-line @typescript-eslint/no-unused-vars
          interceptors
        );
      },
    };
  }

  const stubTransport = createStubTransport();
  const client = createPromiseClient(TestService, stubTransport);
  it("should return the default message for unary", async () => {
    const res = await client.unaryCall({});
    expect(res).toBeDefined();
    expect(res).toBeInstanceOf(SimpleResponse);
  });
  it("should return the default message for server-streaming 3 times", async () => {
    let responseCount = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const res of client.streamingOutputCall({})) {
      expect(res).toBeInstanceOf(StreamingOutputCallResponse);
      responseCount++;
    }
    expect(responseCount).toBe(3);
  });
});
