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

import {
  createHandlerContext,
  createMethodImplSpec,
} from "./implementation.js";
import type { MethodImplSpec } from "./implementation.js";
import { Int32Value, MethodKind, StringValue } from "@bufbuild/protobuf";
import { createAsyncIterable } from "./protocol/async-iterable.js";
import { createContextKey } from "./context-values.js";

const TestService = {
  typeName: "handwritten.TestService",
  methods: {
    unary: {
      name: "Unary",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.Unary,
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
    bidiStreaming: {
      name: "BidiStreaming",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.BiDiStreaming,
    },
  },
} as const;

describe("createHandlerContext()", function () {
  const standardOptions = {
    service: TestService,
    method: TestService.methods.unary,
    protocolName: "foo",
    requestMethod: "GET",
    url: "https://example.com/foo",
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

describe("createMethodImplSpec()", () => {
  const kFoo = createContextKey("foo");
  const handlerInit = {
    service: TestService,
    url: "https://example.com/foo",
    protocolName: "connect",
    requestMethod: "POST",
    requestHeader: {
      Key: "Value",
    },
  };
  it("should apply interceptors to unary calls", async () => {
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.unary,
      (_, { responseHeader, responseTrailer }) => {
        responseHeader.set("Key", "bar");
        responseTrailer.set("TKey", "tbar");
        return { value: "foo" };
      },
      [
        (next) => async (req) => {
          expect(req.stream).toEqual(false);
          expect(req.init.method).toEqual("POST");
          expect(req.service).toEqual(TestService);
          expect(req.header.get("Key")).toEqual("Value");
          expect(req.url).toEqual("https://example.com/foo");
          expect(req.method).toEqual(TestService.methods.unary);
          expect(context.values.get(kFoo)).toEqual("bar");
          req.header.set("Key", "bar");
          const res = await next(req);
          expect(res.stream).toEqual(false);
          expect(res.service).toEqual(TestService);
          expect(res.header.get("Key")).toEqual("bar");
          expect(res.method).toEqual(TestService.methods.unary);
          res.header.set("Key", "baz");
          return res;
        },
        (next) => async (req) => {
          expect(req.header.get("Key")).toEqual("bar");
          return next(req);
        },
      ],
    ) as MethodImplSpec<Int32Value, StringValue> & {
      kind: MethodKind.Unary;
    };
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.methods.unary,
    });
    context.values.set(kFoo, "bar");
    const res = await spec.impl(new Int32Value({ value: 1 }), context);
    expect(res).toEqual(new StringValue({ value: "foo" }));
    expect(context.responseHeader.get("Key")).toEqual("baz");
    expect(context.responseTrailer.get("TKey")).toEqual("tbar");
  });
  it("should apply interceptors to client streaming calls", async () => {
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.clientStreaming,
      // eslint-disable-next-line @typescript-eslint/require-await
      async (_, { responseHeader, responseTrailer }) => {
        responseHeader.set("Key", "bar");
        responseTrailer.set("TKey", "tbar");
        return { value: "foo" };
      },
      [
        (next) => async (req) => {
          expect(req.stream).toEqual(true);
          expect(req.init.method).toEqual("POST");
          expect(req.service).toEqual(TestService);
          expect(req.header.get("Key")).toEqual("Value");
          expect(req.url).toEqual("https://example.com/foo");
          expect(req.method).toEqual(TestService.methods.clientStreaming);
          expect(context.values.get(kFoo)).toEqual("bar");
          req.header.set("Key", "bar");
          const res = await next(req);
          expect(res.stream).toEqual(false);
          expect(res.service).toEqual(TestService);
          expect(res.header.get("Key")).toEqual("bar");
          expect(res.method).toEqual(TestService.methods.clientStreaming);
          res.header.set("Key", "baz");
          return res;
        },
        (next) => async (req) => {
          expect(req.header.get("Key")).toEqual("bar");
          return next(req);
        },
      ],
    ) as MethodImplSpec<Int32Value, StringValue> & {
      kind: MethodKind.ClientStreaming;
    };
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.methods.clientStreaming,
    });
    context.values.set(kFoo, "bar");
    const res = await spec.impl(
      createAsyncIterable([new Int32Value({ value: 1 })]),
      context,
    );
    expect(res).toEqual(new StringValue({ value: "foo" }));
    expect(context.responseHeader.get("Key")).toEqual("baz");
    expect(context.responseTrailer.get("TKey")).toEqual("tbar");
  });
  it("should apply interceptors to server streaming calls", async () => {
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.serverStreaming,
      // eslint-disable-next-line @typescript-eslint/require-await
      async function* (_, { responseHeader, responseTrailer }) {
        responseHeader.set("Key", "bar");
        responseTrailer.set("TKey", "tbar");
        yield { value: "foo" };
      },
      [
        (next) => async (req) => {
          expect(req.stream).toEqual(false);
          expect(req.init.method).toEqual("POST");
          expect(req.service).toEqual(TestService);
          expect(req.header.get("Key")).toEqual("Value");
          expect(req.url).toEqual("https://example.com/foo");
          expect(req.method).toEqual(TestService.methods.serverStreaming);
          expect(context.values.get(kFoo)).toEqual("bar");
          req.header.set("Key", "bar");
          const res = await next(req);
          const responses = [];
          for await (const next of res.message as AsyncIterable<StringValue>) {
            responses.push(next);
          }
          expect(res.stream).toEqual(true);
          expect(res.service).toEqual(TestService);
          expect(res.header.get("Key")).toEqual("bar");
          expect(res.method).toEqual(TestService.methods.serverStreaming);
          res.header.set("Key", "baz");
          return {
            ...res,
            message: createAsyncIterable(responses),
          } as typeof res;
        },
        (next) => async (req) => {
          expect(req.header.get("Key")).toEqual("bar");
          return next(req);
        },
      ],
    ) as MethodImplSpec<Int32Value, StringValue> & {
      kind: MethodKind.ServerStreaming;
    };
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.methods.serverStreaming,
    });
    context.values.set(kFoo, "bar");
    const res = spec.impl(new Int32Value({ value: 1 }), context);
    for await (const next of res) {
      expect(next).toEqual(new StringValue({ value: "foo" }));
    }
    expect(context.responseHeader.get("Key")).toEqual("baz");
    expect(context.responseTrailer.get("TKey")).toEqual("tbar");
  });
  it("should apply interceptors to bidi streaming calls", async () => {
    const spec = createMethodImplSpec(
      TestService,
      TestService.methods.bidiStreaming,
      // eslint-disable-next-line @typescript-eslint/require-await
      async function* (_, { responseHeader, responseTrailer }) {
        responseHeader.set("Key", "bar");
        responseTrailer.set("TKey", "tbar");
        yield { value: "foo" };
      },
      [
        (next) => async (req) => {
          expect(req.stream).toEqual(true);
          expect(req.init.method).toEqual("POST");
          expect(req.service).toEqual(TestService);
          expect(req.header.get("Key")).toEqual("Value");
          expect(req.url).toEqual("https://example.com/foo");
          expect(req.method).toEqual(TestService.methods.bidiStreaming);
          expect(context.values.get(kFoo)).toEqual("bar");
          req.header.set("Key", "bar");
          const res = await next(req);
          const responses = [];
          for await (const next of res.message as AsyncIterable<StringValue>) {
            responses.push(next);
          }
          expect(res.stream).toEqual(true);
          expect(res.service).toEqual(TestService);
          expect(res.header.get("Key")).toEqual("bar");
          expect(res.method).toEqual(TestService.methods.bidiStreaming);
          res.header.set("Key", "baz");
          return {
            ...res,
            message: createAsyncIterable(responses),
          } as typeof res;
        },
        (next) => async (req) => {
          expect(req.header.get("Key")).toEqual("bar");
          return next(req);
        },
      ],
    ) as MethodImplSpec<Int32Value, StringValue> & {
      kind: MethodKind.BiDiStreaming;
    };
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.methods.bidiStreaming,
    });
    context.values.set(kFoo, "bar");
    const res = spec.impl(
      createAsyncIterable([new Int32Value({ value: 1 })]),
      context,
    );
    for await (const next of res) {
      expect(next).toEqual(new StringValue({ value: "foo" }));
    }
    expect(context.responseHeader.get("Key")).toEqual("baz");
    expect(context.responseTrailer.get("TKey")).toEqual("tbar");
  });
});
