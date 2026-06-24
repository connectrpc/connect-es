// Copyright 2021-2026 The Connect Authors
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

import { describe, it } from "node:test";
import * as assert from "node:assert";
import { create } from "@bufbuild/protobuf";
import { createContextKey } from "../context-values.js";
import { createAsyncIterable, pipe } from "./async-iterable.js";
import { transformInvokeImplementation } from "./invoke-implementation.js";
import {
  createHandlerContext,
  createMethodImplSpec,
} from "../implementation.js";
import type { MethodImplSpec } from "../implementation.js";
import { readAll } from "./async-iterable-helper.spec.js";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";
import type { Int32Value, StringValue } from "@bufbuild/protobuf/wkt";

const TestService = createServiceDesc({
  typeName: "handwritten.TestService",
  method: {
    unary: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "unary",
    },
    clientStreaming: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "client_streaming",
    },
    serverStreaming: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "server_streaming",
    },
    bidiStreaming: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "bidi_streaming",
    },
  },
});

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
      method: TestService.method.unary,
    });
    context.values.set(kFoo, "bar");
    const output = transformInvokeImplementation(
      createMethodImplSpec(
        TestService.method.unary,
        (_, { responseHeader, responseTrailer }) => {
          responseHeader.set("Key", "bar");
          responseTrailer.set("TKey", "tbar");
          return { value: "foo" };
        },
      ) as unknown as MethodImplSpec<
        typeof Int32ValueSchema,
        typeof StringValueSchema
      > & {
        kind: "unary";
      },
      context,
      [
        (next) => async (req) => {
          assert.ok(!req.stream);
          assert.strictEqual(req.requestMethod, "POST");
          assert.deepStrictEqual(req.service, TestService);
          assert.strictEqual(req.header.get("Key"), "Value");
          assert.strictEqual(req.url, "https://example.com/foo");
          assert.deepStrictEqual(req.method, TestService.method.unary);
          assert.strictEqual(context.values.get(kFoo), "bar");
          req.header.set("Key", "bar");
          const res = await next(req);
          assert.ok(!res.stream);
          assert.deepStrictEqual(res.service, TestService);
          assert.strictEqual(res.header.get("Key"), "bar");
          assert.deepStrictEqual(res.method, TestService.method.unary);
          res.header.set("Key", "baz");
          return { ...res, trailer: new Headers({ TKey: "tfoo" }) };
        },
        (next) => async (req) => {
          assert.strictEqual(req.header.get("Key"), "bar");
          return next(req);
        },
      ],
    )(createAsyncIterable([create(Int32ValueSchema, { value: 1 })]));
    assert.deepStrictEqual(await readAll(output), [
      create(StringValueSchema, { value: "foo" }),
    ]);
    assert.strictEqual(context.responseHeader.get("Key"), "baz");
    assert.strictEqual(context.responseTrailer.get("TKey"), "tfoo");
  });
  it("should apply interceptors to client streaming calls", async () => {
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.method.unary,
    });
    context.values.set(kFoo, "bar");
    const output = transformInvokeImplementation(
      createMethodImplSpec(
        TestService.method.clientStreaming,
        async (req, { responseHeader, responseTrailer }) => {
          for await (const next of req) {
            assert.strictEqual(next.value, 2);
          }
          responseHeader.set("Key", "bar");
          responseTrailer.set("TKey", "tbar");
          return { value: "foo" };
        },
      ) as unknown as MethodImplSpec<
        typeof Int32ValueSchema,
        typeof StringValueSchema
      > & {
        kind: "client_streaming";
      },
      context,
      [
        (next) => async (req) => {
          assert.ok(req.stream);
          assert.strictEqual(req.requestMethod, "POST");
          assert.deepStrictEqual(req.service, TestService);
          assert.strictEqual(req.header.get("Key"), "Value");
          assert.strictEqual(req.url, "https://example.com/foo");
          assert.deepStrictEqual(
            req.method,
            TestService.method.clientStreaming,
          );
          assert.strictEqual(context.values.get(kFoo), "bar");
          req.header.set("Key", "bar");
          if (req.stream) {
            req = {
              ...req,
              // Change the value before passing it on
              message: pipe(req.message, async function* (it) {
                for await (const next of it) {
                  (next as Int32Value).value = 2;
                  yield next;
                }
              }),
            };
          }
          const res = await next(req);
          assert.ok(res.stream);
          assert.deepStrictEqual(res.service, TestService);
          assert.strictEqual(res.header.get("Key"), "bar");
          assert.deepStrictEqual(
            res.method,
            TestService.method.clientStreaming,
          );
          res.header.set("Key", "baz");
          return { ...res, trailer: new Headers({ TKey: "tfoo" }) };
        },
        (next) => async (req) => {
          assert.strictEqual(req.header.get("Key"), "bar");
          return next(req);
        },
      ],
    )(createAsyncIterable([create(Int32ValueSchema, { value: 1 })]));
    assert.deepStrictEqual(await readAll(output), [
      create(StringValueSchema, { value: "foo" }),
    ]);
    assert.strictEqual(context.responseHeader.get("Key"), "baz");
    assert.strictEqual(context.responseTrailer.get("TKey"), "tfoo");
  });
  it("should apply interceptors to server streaming calls", async () => {
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.method.unary,
    });
    context.values.set(kFoo, "bar");
    const output = transformInvokeImplementation(
      createMethodImplSpec(
        TestService.method.serverStreaming,
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (req, { responseHeader, responseTrailer }) {
          assert.strictEqual(req.value, 2); // Comes from the interceptor
          responseHeader.set("Key", "bar");
          responseTrailer.set("TKey", "tbar");
          yield { value: "foo" };
        },
      ) as unknown as MethodImplSpec<
        typeof Int32ValueSchema,
        typeof StringValueSchema
      > & {
        kind: "server_streaming";
      },
      context,
      [
        (next) => async (req) => {
          assert.ok(req.stream);
          assert.strictEqual(req.requestMethod, "POST");
          assert.deepStrictEqual(req.service, TestService);
          assert.strictEqual(req.header.get("Key"), "Value");
          assert.strictEqual(req.url, "https://example.com/foo");
          assert.deepStrictEqual(
            req.method,
            TestService.method.serverStreaming,
          );
          assert.strictEqual(context.values.get(kFoo), "bar");
          req.header.set("Key", "bar");
          if (req.stream) {
            req = {
              ...req,
              // Change the value before passing it on
              message: pipe(req.message, async function* (it) {
                for await (const next of it) {
                  (next as Int32Value).value = 2;
                  yield next;
                }
              }),
            };
          }
          const res = await next(req);
          const responses = [];
          for await (const next of res.message as AsyncIterable<StringValue>) {
            responses.push(next);
          }
          assert.ok(res.stream);
          assert.deepStrictEqual(res.service, TestService);
          assert.strictEqual(res.header.get("Key"), "bar");
          assert.deepStrictEqual(
            res.method,
            TestService.method.serverStreaming,
          );
          res.header.set("Key", "baz");
          return {
            ...res,
            trailer: new Headers({ TKey: "tfoo" }),
            message: createAsyncIterable(responses),
          } as typeof res;
        },
        (next) => async (req) => {
          assert.strictEqual(req.header.get("Key"), "bar");
          return next(req);
        },
      ],
    )(createAsyncIterable([create(Int32ValueSchema, { value: 1 })]));
    assert.deepStrictEqual(await readAll(output), [
      create(StringValueSchema, { value: "foo" }),
    ]);
    assert.strictEqual(context.responseHeader.get("Key"), "baz");
    assert.strictEqual(context.responseTrailer.get("TKey"), "tfoo");
  });
  it("should apply interceptors to bidi streaming calls", async () => {
    const context = createHandlerContext({
      ...handlerInit,
      method: TestService.method.unary,
    });
    context.values.set(kFoo, "bar");
    const output = transformInvokeImplementation(
      createMethodImplSpec(
        TestService.method.bidiStreaming,
        async function* (req, { responseHeader, responseTrailer }) {
          let reqCount = 0;
          for await (const next of req) {
            assert.strictEqual(next.value, 2);
            reqCount++;
          }
          assert.strictEqual(reqCount, 2);
          responseHeader.set("Key", "bar");
          responseTrailer.set("TKey", "tbar");
          yield { value: "foo" };
        },
      ) as unknown as MethodImplSpec<
        typeof Int32ValueSchema,
        typeof StringValueSchema
      > & {
        kind: "bidi_streaming";
      },
      context,
      [
        (next) => async (req) => {
          assert.ok(req.stream);
          assert.strictEqual(req.requestMethod, "POST");
          assert.deepStrictEqual(req.service, TestService);
          assert.strictEqual(req.header.get("Key"), "Value");
          assert.strictEqual(req.url, "https://example.com/foo");
          assert.deepStrictEqual(req.method, TestService.method.bidiStreaming);
          assert.strictEqual(context.values.get(kFoo), "bar");
          req.header.set("Key", "bar");
          if (req.stream) {
            req = {
              ...req,
              // Change the value before passing it on
              message: pipe(req.message, async function* (it) {
                for await (const next of it) {
                  (next as Int32Value).value = 2;
                  yield next;
                }
              }),
            };
          }
          const res = await next(req);
          const responses = [];
          for await (const next of res.message as AsyncIterable<StringValue>) {
            responses.push(next);
          }
          assert.ok(res.stream);
          assert.deepStrictEqual(res.service, TestService);
          assert.strictEqual(res.header.get("Key"), "bar");
          assert.deepStrictEqual(res.method, TestService.method.bidiStreaming);
          res.header.set("Key", "baz");
          return {
            ...res,
            trailer: new Headers({ TKey: "tfoo" }),
            message: createAsyncIterable(responses),
          } as typeof res;
        },
        (next) => async (req) => {
          assert.strictEqual(req.header.get("Key"), "bar");
          return next(req);
        },
      ],
    )(
      createAsyncIterable([
        create(Int32ValueSchema, { value: 1 }),
        create(Int32ValueSchema, { value: 3 }),
      ]),
    );
    assert.deepStrictEqual(await readAll(output), [
      create(StringValueSchema, { value: "foo" }),
    ]);
    assert.strictEqual(context.responseHeader.get("Key"), "baz");
    assert.strictEqual(context.responseTrailer.get("TKey"), "tfoo");
  });
});
