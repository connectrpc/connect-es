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

import { Int32Value, StringValue, MethodKind } from "@bufbuild/protobuf";
import { createContextKey } from "../context-values.js";
import { createAsyncIterable } from "./async-iterable.js";
import { transformInvokeImplementation } from "./invoke-implementation.js";
import {
  createHandlerContext,
  createMethodImplSpec,
} from "../implementation.js";
import type { MethodImplSpec } from "../implementation.js";
import { readAll } from "./async-iterable-helper.spec.js";

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

describe("transformInvokeImplementation()", () => {
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
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.methods.unary,
    });
    context.values.set(kFoo, "bar");
    const output = transformInvokeImplementation(
      createMethodImplSpec(
        TestService,
        TestService.methods.unary,
        (_, { responseHeader, responseTrailer }) => {
          responseHeader.set("Key", "bar");
          responseTrailer.set("TKey", "tbar");
          return { value: "foo" };
        },
      ) as unknown as MethodImplSpec<Int32Value, StringValue> & {
        kind: MethodKind.Unary;
      },
      context,
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
          return { ...res, trailer: new Headers({ TKey: "tfoo" }) };
        },
        (next) => async (req) => {
          expect(req.header.get("Key")).toEqual("bar");
          return next(req);
        },
      ],
    )(createAsyncIterable([new Int32Value({ value: 1 })]));
    expect(await readAll(output)).toEqual([new StringValue({ value: "foo" })]);
    expect(context.responseHeader.get("Key")).toEqual("baz");
    expect(context.responseTrailer.get("TKey")).toEqual("tfoo");
  });
  it("should apply interceptors to client streaming calls", async () => {
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.methods.unary,
    });
    context.values.set(kFoo, "bar");
    const output = transformInvokeImplementation(
      createMethodImplSpec(
        TestService,
        TestService.methods.clientStreaming,
        // eslint-disable-next-line @typescript-eslint/require-await
        async (_, { responseHeader, responseTrailer }) => {
          responseHeader.set("Key", "bar");
          responseTrailer.set("TKey", "tbar");
          return { value: "foo" };
        },
      ) as unknown as MethodImplSpec<Int32Value, StringValue> & {
        kind: MethodKind.ClientStreaming;
      },
      context,
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
          return { ...res, trailer: new Headers({ TKey: "tfoo" }) };
        },
        (next) => async (req) => {
          expect(req.header.get("Key")).toEqual("bar");
          return next(req);
        },
      ],
    )(createAsyncIterable([new Int32Value({ value: 1 })]));
    expect(await readAll(output)).toEqual([new StringValue({ value: "foo" })]);
    expect(context.responseHeader.get("Key")).toEqual("baz");
    expect(context.responseTrailer.get("TKey")).toEqual("tfoo");
  });
  it("should apply interceptors to server streaming calls", async () => {
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.methods.unary,
    });
    context.values.set(kFoo, "bar");
    const output = transformInvokeImplementation(
      createMethodImplSpec(
        TestService,
        TestService.methods.serverStreaming,
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (_, { responseHeader, responseTrailer }) {
          responseHeader.set("Key", "bar");
          responseTrailer.set("TKey", "tbar");
          yield { value: "foo" };
        },
      ) as unknown as MethodImplSpec<Int32Value, StringValue> & {
        kind: MethodKind.ServerStreaming;
      },
      context,
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
            trailer: new Headers({ TKey: "tfoo" }),
            message: createAsyncIterable(responses),
          } as typeof res;
        },
        (next) => async (req) => {
          expect(req.header.get("Key")).toEqual("bar");
          return next(req);
        },
      ],
    )(createAsyncIterable([new Int32Value({ value: 1 })]));
    expect(await readAll(output)).toEqual([new StringValue({ value: "foo" })]);
    expect(context.responseHeader.get("Key")).toEqual("baz");
    expect(context.responseTrailer.get("TKey")).toEqual("tfoo");
  });
  it("should apply interceptors to bidi streaming calls", async () => {
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.methods.unary,
    });
    context.values.set(kFoo, "bar");
    const output = transformInvokeImplementation(
      createMethodImplSpec(
        TestService,
        TestService.methods.bidiStreaming,
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (_, { responseHeader, responseTrailer }) {
          responseHeader.set("Key", "bar");
          responseTrailer.set("TKey", "tbar");
          yield { value: "foo" };
        },
      ) as unknown as MethodImplSpec<Int32Value, StringValue> & {
        kind: MethodKind.BiDiStreaming;
      },
      context,
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
            trailer: new Headers({ TKey: "tfoo" }),
            message: createAsyncIterable(responses),
          } as typeof res;
        },
        (next) => async (req) => {
          expect(req.header.get("Key")).toEqual("bar");
          return next(req);
        },
      ],
    )(createAsyncIterable([new Int32Value({ value: 1 })]));
    expect(await readAll(output)).toEqual([new StringValue({ value: "foo" })]);
    expect(context.responseHeader.get("Key")).toEqual("baz");
    expect(context.responseTrailer.get("TKey")).toEqual("tfoo");
  });
});
