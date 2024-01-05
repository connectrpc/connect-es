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

import { Int32Value, MethodKind, StringValue } from "@bufbuild/protobuf";
import type { Interceptor, StreamResponse } from "./interceptor.js";
import { createRouterTransport } from "./router-transport.js";
import type { HandlerContext } from "./implementation.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";

function makeLoggingInterceptor(name: string, log: string[]): Interceptor {
  return (next) => async (req) => {
    log.push(
      `${name} sending request with headers: ${listHeaderKeys(req.header)}`,
    );
    const res = await next(req);
    log.push(
      `${name} response received with headers: ${listHeaderKeys(res.header)}`,
    );
    if (res.stream) {
      return {
        ...res,
        message: logStream(res),
      };
    } else {
      log.push(
        `${name} response done with trailers: ${listHeaderKeys(res.trailer)}`,
      );
    }
    return res;
  };

  async function* logStream(res: StreamResponse) {
    for await (const m of res.message) {
      log.push(`${name} response stream received message`);
      yield m;
    }
    yield* res.message;
    log.push(
      `${name} response stream done with trailers: ${listHeaderKeys(
        res.trailer,
      )}`,
    );
  }

  /**
   * Return all keys of a Headers object, without needing
   * DOM.iterable for Headers.keys().
   */
  function listHeaderKeys(header: Headers): string {
    const fieldsToIgnore = [
      "connect-protocol-version",
      "content-type",
      "content-length",
      "user-agent",
    ];
    const keys: string[] = [];
    header.forEach((_, key) => {
      if (!fieldsToIgnore.includes(key)) {
        keys.push(key);
      }
    });
    return keys.join(", ");
  }
}

const TestService = {
  typeName: "handwritten.TestService",
  methods: {
    unary: {
      name: "Unary",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.Unary,
    },
    serverStream: {
      name: "ServerStream",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ServerStreaming,
    },
  },
} as const;

describe("unary interceptors", () => {
  const wantLog = [
    "outer sending request with headers: unary-request-header",
    "inner sending request with headers: unary-request-header",
    "inner response received with headers: unary-response-header",
    "inner response done with trailers: unary-response-trailer",
    "outer response received with headers: unary-response-header",
    "outer response done with trailers: unary-response-trailer",
  ] as const;

  it("promise client", async () => {
    const log: string[] = [];

    const transport = createRouterTransport(
      ({ service }) => {
        service(TestService, {
          unary: (request: Int32Value, context: HandlerContext) => {
            context.responseHeader.set(
              "unary-response-header",
              "response-header",
            );
            context.responseTrailer.set(
              "unary-response-trailer",
              "response-trailer",
            );
            return { value: request.value.toString() };
          },
        });
      },
      {
        transport: {
          interceptors: [
            makeLoggingInterceptor("outer", log),
            makeLoggingInterceptor("inner", log),
          ],
        },
      },
    );

    const response = await transport.unary(
      TestService,
      TestService.methods.unary,
      undefined,
      undefined,
      {
        "unary-request-header": "request-header",
      },
      { value: 9001 },
    );

    expect(response.message).toEqual(new StringValue({ value: "9001" }));
    expect(response.header.get("unary-response-header")).toEqual(
      "response-header",
    );
    expect(response.trailer.get("unary-response-trailer")).toEqual(
      "response-trailer",
    );

    expect(log).toEqual(wantLog);
  });
});

describe("stream interceptors", () => {
  const wantLog = [
    "outer sending request with headers: stream-request-header",
    "inner sending request with headers: stream-request-header",
    "inner response received with headers: stream-response-header",
    "outer response received with headers: stream-response-header",
    "inner response stream received message",
    "outer response stream received message",
    "inner response stream done with trailers: stream-response-trailer",
    "outer response stream done with trailers: stream-response-trailer",
  ] as const;
  it("promise client", async () => {
    const log: string[] = [];

    const transport = createRouterTransport(
      ({ service }) => {
        service(TestService, {
          serverStream: (request: Int32Value, context: HandlerContext) => {
            context.responseHeader.set(
              "stream-response-header",
              "response-header",
            );
            context.responseTrailer.set(
              "stream-response-trailer",
              "response-trailer",
            );
            return createAsyncIterable([{ value: request.value.toString() }]);
          },
        });
      },
      {
        transport: {
          interceptors: [
            makeLoggingInterceptor("outer", log),
            makeLoggingInterceptor("inner", log),
          ],
        },
      },
    );

    const response = await transport.stream(
      TestService,
      TestService.methods.serverStream,
      undefined,
      undefined,
      {
        "stream-request-header": "request-header",
      },
      createAsyncIterable([new Int32Value({ value: 42 })]),
    );

    for await (const message of response.message) {
      expect(message).toEqual(new StringValue({ value: "42" }));
    }

    expect(log).toEqual(wantLog);
    expect(response.header.get("stream-response-header")).toEqual(
      "response-header",
    );
    expect(response.trailer.get("stream-response-trailer")).toEqual(
      "response-trailer",
    );
  });
});
