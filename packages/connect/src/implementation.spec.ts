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

import {
  createHandlerContext,
  createMethodImplSpec,
} from "./implementation.js";
import type {
  BiDiStreamingImpl,
  ClientStreamingImpl,
  ServerStreamingImpl,
  UnaryImpl,
} from "./method-implementation.js";
import { Int32Value, MethodKind, StringValue } from "@bufbuild/protobuf";

const TestService = {
  typeName: "handwritten.TestService",
  methods: {
    biDiStreaming: {
      name: "BiDiStreaming",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.BiDiStreaming,
    },
    clientStreaming: {
      name: "ClientStreaming",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ClientStreaming,
    },
    serverStreaming: {
      name: "ServerStreaming",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ServerStreaming,
    },
    unary: {
      name: "Unary",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.Unary,
    },
  },
} as const;

describe("createHandlerContext()", function () {
  const standardOptions = {
    service: TestService,
    method: TestService.methods.unary,
    protocolName: "foo",
    requestMethod: "GET",
  };

  describe("signal", function () {
    it("should have a default value", function () {
      const ctx = createHandlerContext({ ...standardOptions });
      expect(ctx.signal).toBeDefined();
      expect(ctx.signal.aborted).toBeFalse();
    });
    it("should trigger on timeout", function () {
      const ctx = createHandlerContext({
        ...standardOptions,
        timeoutMs: 0,
      });
      expect(ctx.signal.aborted).toBeTrue();
      expect(String(ctx.signal.reason)).toBe(
        "ConnectError: [deadline_exceeded] the operation timed out",
      );
    });
    it("should trigger on request signal", function () {
      const ctx = createHandlerContext({
        ...standardOptions,
        requestSignal: AbortSignal.abort("request-signal"),
      });
      expect(ctx.signal.aborted).toBeTrue();
      expect(ctx.signal.reason).toBe("request-signal");
    });
    it("should trigger on shutdown signal", function () {
      const ctx = createHandlerContext({
        ...standardOptions,
        shutdownSignal: AbortSignal.abort("shutdown-signal"),
      });
      expect(ctx.signal.aborted).toBeTrue();
      expect(ctx.signal.reason).toBe("shutdown-signal");
    });
    it("should trigger on abort", function () {
      const ctx = createHandlerContext({ ...standardOptions });
      ctx.abort("test-reason");
      expect(ctx.signal.aborted).toBeTrue();
      expect(ctx.signal.reason).toBe("test-reason");
    });
  });

  describe("timeout()", function () {
    it("should return undefined without a timeout", function () {
      const ctx = createHandlerContext({ ...standardOptions });
      expect(ctx.timeoutMs()).toBeUndefined();
    });
    it("should return remaining timeout", function () {
      const ctx = createHandlerContext({
        ...standardOptions,
        timeoutMs: 1000,
      });
      expect(ctx.timeoutMs()).toBeDefined();
      expect(ctx.timeoutMs()).toBeLessThanOrEqual(1000);
      expect(ctx.timeoutMs()).toBeGreaterThanOrEqual(990);
    });
  });

  it("should surface passed service, method, protocolName, requestMethod", function () {
    const ctx = createHandlerContext({
      ...standardOptions,
    });
    expect(ctx.service).toBe(TestService);
    expect(ctx.method).toBe(TestService.methods.unary);
    expect(ctx.protocolName).toBe("foo");
    expect(ctx.requestMethod).toBe("GET");
  });
  it("should surface passed headers and trailers", function () {
    const ctx = createHandlerContext({
      ...standardOptions,
      requestHeader: { foo: "request" },
      responseHeader: { foo: "response" },
      responseTrailer: { foo: "trailer" },
    });
    expect(ctx.requestHeader.get("foo")).toBe("request");
    expect(ctx.responseHeader.get("foo")).toBe("response");
    expect(ctx.responseTrailer.get("foo")).toBe("trailer");
  });
});

describe("createMethodImplSpec()", function () {
  const context = createHandlerContext({
    service: TestService,
    method: TestService.methods.unary,
    protocolName: "foo",
    requestMethod: "GET",
  });

  it("should handle no interceptors", async function () {
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.unary,
      function (request) {
        expect(request.value).toBe(13);
        return new StringValue({ value: "response" });
      },
      [],
    );
    const impl = spec.impl as UnaryImpl<Int32Value, StringValue>;
    const response = await impl(new Int32Value({ value: 13 }), context);
    expect(response.value).toBe("response");
  });

  it("should chain in order", async function () {
    const state: { calls: number[] } = { calls: [] };
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.unary,
      function () {
        return new StringValue({ value: "response" });
      },
      [
        {
          unary: function (request, context, next) {
            state.calls.push(1);
            return next(request, context);
          },
        },
        {
          unary: function (request, context, next) {
            state.calls.push(2);
            return next(request, context);
          },
        },
      ],
    );
    const impl = spec.impl as UnaryImpl<Int32Value, StringValue>;
    await impl(new Int32Value({ value: 9 }), context);
    expect(state.calls).toEqual([1, 2]);
  });

  it("should override response", async function () {
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.unary,
      function () {
        return new StringValue({ value: "response" });
      },
      [
        {
          unary: async function (request, context, next) {
            return new StringValue({
              value: "saw " + (await next(request, context)).value,
            });
          },
        },
      ],
    );
    const impl = spec.impl as UnaryImpl<Int32Value, StringValue>;
    const response = await impl(new Int32Value({ value: 9 }), context);
    expect(response.value).toBe("saw response");
  });

  it("should support bidi streaming", async function () {
    const state: { calls: unknown[] } = { calls: [] };
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.biDiStreaming,
      async function* (requests) {
        for await (const request of requests) {
          yield new StringValue({ value: `response for ${request.value}` });
        }
      },
      [
        {
          biDiStreaming: async function* (requests, context, next) {
            const intercept = {
              async *[Symbol.asyncIterator]() {
                for await (const request of requests) {
                  state.calls.push(request.value);
                  yield request;
                }
              },
            };
            yield* next(intercept, context);
          },
        },
      ],
    );
    const impl = spec.impl as BiDiStreamingImpl<Int32Value, StringValue>;
    const requests = {
      // eslint-disable-next-line @typescript-eslint/require-await
      async *[Symbol.asyncIterator]() {
        yield new Int32Value({ value: 1 });
        yield new Int32Value({ value: 2 });
      },
    };
    const responses = [];
    for await (const response of impl(requests, context)) {
      responses.push(response.value);
    }
    expect(responses).toEqual(["response for 1", "response for 2"]);
  });

  it("should support client streaming", async function () {
    const state: { calls: unknown[] } = { calls: [] };
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.clientStreaming,
      async function (requests) {
        const values = [];
        for await (const request of requests) {
          values.push(request.value);
        }
        return new StringValue({ value: values.join(", ") });
      },
      [
        {
          clientStreaming: async function (requests, context, next) {
            const intercept = {
              async *[Symbol.asyncIterator]() {
                for await (const request of requests) {
                  state.calls.push(request.value);
                  yield request;
                }
              },
            };
            return next(intercept, context);
          },
        },
      ],
    );
    const impl = spec.impl as ClientStreamingImpl<Int32Value, StringValue>;
    const requests = {
      // eslint-disable-next-line @typescript-eslint/require-await
      async *[Symbol.asyncIterator]() {
        yield new Int32Value({ value: 1 });
        yield new Int32Value({ value: 2 });
      },
    };
    const response = await impl(requests, context);
    expect(response.value).toBe("1, 2");
  });

  it("should support server streaming", async function () {
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.serverStreaming,
      // eslint-disable-next-line @typescript-eslint/require-await
      async function* (request) {
        yield new StringValue({ value: `first ${request.value}` });
        yield new StringValue({ value: `second ${request.value}` });
      },
      [
        {
          serverStreaming: async function* (requests, context, next) {
            for await (const response of next(requests, context)) {
              yield new StringValue({ value: `saw ${response.value}` });
            }
          },
        },
      ],
    );
    const impl = spec.impl as ServerStreamingImpl<Int32Value, StringValue>;
    const responses = [];
    for await (const response of impl(new Int32Value({ value: 9 }), context)) {
      responses.push(response.value);
    }
    expect(responses).toEqual(["saw first 9", "saw second 9"]);
  });
});
