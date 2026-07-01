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
import { create, isMessage } from "@bufbuild/protobuf";
import {
  createBiDiStreamingFn,
  createClientStreamingFn,
  createServerStreamingFn,
  createUnaryFn,
} from "./promise-client.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";
import { createRouterTransport } from "./router-transport.js";
import type { HandlerContext } from "./implementation.js";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import { createContextKey, createContextValues } from "./context-values.js";
import { createServiceDesc } from "./descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";
import type { Int32Value, StringValue } from "@bufbuild/protobuf/wkt";

const TestService = createServiceDesc({
  typeName: "handwritten.TestService",
  method: {
    unaryMethod: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "unary",
    },
    clientStream: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "client_streaming",
    },
    serverStream: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "server_streaming",
    },
    bidiStream: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "bidi_streaming",
    },
  },
});

const kString = createContextKey("foo");

describe("createUnaryFn()", () => {
  it("passes the context values to interceptors", async () => {
    const input = create(Int32ValueSchema, { value: 1 });

    const output = create(StringValueSchema, { value: "yield 1" });
    let interceptorCalled = false;

    const transport = createRouterTransport(
      ({ service }) => {
        service(TestService, {
          unaryMethod: (_input: Int32Value, _context: HandlerContext) =>
            Promise.resolve(output),
        });
      },
      {
        transport: {
          interceptors: [
            (next) => {
              return (req) => {
                interceptorCalled = true;
                assert.strictEqual(req.contextValues.get(kString), "bar");
                return next(req);
              };
            },
          ],
        },
      },
    );
    const fn = createUnaryFn(transport, TestService.method.unaryMethod);
    const res = await fn(input, {
      contextValues: createContextValues().set(kString, "bar"),
    });
    assert.ok(isMessage(res, StringValueSchema));
    assert.strictEqual(res.value, output.value);
    assert.ok(interceptorCalled);
  });
});

describe("createClientStreamingFn()", () => {
  it("works as expected on the happy path", async () => {
    const input = create(Int32ValueSchema, { value: 1 });

    const output = create(StringValueSchema, { value: "yield 1" });

    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        clientStream: (
          _input: AsyncIterable<Int32Value>,
          _context: HandlerContext,
        ) => Promise.resolve(output),
      });
    });
    const fn = createClientStreamingFn(
      transport,
      TestService.method.clientStream,
    );
    const res = await fn(
      (async function* () {
        yield input;
      })(),
    );
    assert.ok(isMessage(res, StringValueSchema));
    assert.strictEqual(res.value, output.value);
  });
  it("passes the context values to interceptors", async () => {
    const input = create(Int32ValueSchema, { value: 1 });

    const output = create(StringValueSchema, { value: "yield 1" });
    const kString = createContextKey("foo");
    let interceptorCalled = false;

    const transport = createRouterTransport(
      ({ service }) => {
        service(TestService, {
          clientStream: (
            _input: AsyncIterable<Int32Value>,
            _context: HandlerContext,
          ) => Promise.resolve(output),
        });
      },
      {
        transport: {
          interceptors: [
            (next) => {
              return (req) => {
                interceptorCalled = true;
                assert.strictEqual(req.contextValues.get(kString), "bar");
                return next(req);
              };
            },
          ],
        },
      },
    );
    const fn = createClientStreamingFn(
      transport,
      TestService.method.clientStream,
    );
    const res = await fn(
      (async function* () {
        yield input;
      })(),
      {
        contextValues: createContextValues().set(kString, "bar"),
      },
    );
    assert.ok(isMessage(res, StringValueSchema));
    assert.strictEqual(res.value, output.value);
    assert.ok(interceptorCalled);
  });
  it("closes the request iterable when response is received", async () => {
    const output = create(StringValueSchema, { value: "yield 1" });
    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        clientStream: async (input: AsyncIterable<Int32Value>) => {
          for await (const next of input) {
            assert.strictEqual(next.value, 1);
            return output;
          }
          throw new ConnectError(
            "expected at least 1 value",
            Code.InvalidArgument,
          );
        },
      });
    });
    const fn = createClientStreamingFn(
      transport,
      TestService.method.clientStream,
    );
    let reqItrClosed = false;
    const res = await fn(
      (async function* () {
        try {
          yield { value: 1 };
          assert.fail("expected early return");
        } finally {
          reqItrClosed = true;
        }
      })(),
    );
    assert.ok(isMessage(res, StringValueSchema));
    assert.strictEqual(res.value, output.value);
    assert.ok(reqItrClosed);
  });
  it("closes the request iterable when response is received", async () => {
    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        clientStream: async (input: AsyncIterable<Int32Value>) => {
          for await (const next of input) {
            assert.strictEqual(next.value, 1);
            throw new ConnectError("foo", Code.Internal);
          }
          throw new ConnectError(
            "expected at least 1 value",
            Code.InvalidArgument,
          );
        },
      });
    });
    const fn = createClientStreamingFn(
      transport,
      TestService.method.clientStream,
    );
    let reqItrClosed = false;
    const res = fn(
      (async function* () {
        try {
          yield { value: 1 };
          assert.fail("expected early return");
        } finally {
          reqItrClosed = true;
        }
      })(),
    );
    await assert.rejects(res, {
      code: Code.Internal,
      rawMessage: "foo",
      isWireError: true,
    });
    assert.ok(reqItrClosed);
  });
});

describe("createServerStreamingFn()", () => {
  it("works as expected on the happy path", async () => {
    const output = [
      create(StringValueSchema, { value: "input1" }),
      create(StringValueSchema, { value: "input2" }),
      create(StringValueSchema, { value: "input3" }),
    ];

    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        serverStream: (_input: Int32Value, _context: HandlerContext) =>
          createAsyncIterable(output),
      });
    });

    const fn = createServerStreamingFn(
      transport,
      TestService.method.serverStream,
    );
    const receivedMessages: StringValue[] = [];
    const input = create(Int32ValueSchema, { value: 123 });
    for await (const res of fn(input)) {
      receivedMessages.push(res);
    }
    assert.deepStrictEqual(receivedMessages, output);
  });
  it("passes the context values to interceptors", async () => {
    const output = [
      create(StringValueSchema, { value: "input1" }),
      create(StringValueSchema, { value: "input2" }),
      create(StringValueSchema, { value: "input3" }),
    ];
    let interceptorCalled = false;
    const transport = createRouterTransport(
      ({ service }) => {
        service(TestService, {
          serverStream: (_input: Int32Value, _context: HandlerContext) =>
            createAsyncIterable(output),
        });
      },
      {
        transport: {
          interceptors: [
            (next) => {
              return (req) => {
                interceptorCalled = true;
                assert.strictEqual(req.contextValues.get(kString), "bar");
                return next(req);
              };
            },
          ],
        },
      },
    );

    const fn = createServerStreamingFn(
      transport,
      TestService.method.serverStream,
    );
    const receivedMessages: StringValue[] = [];
    const input = create(Int32ValueSchema, { value: 123 });
    for await (const res of fn(input, {
      contextValues: createContextValues().set(kString, "bar"),
    })) {
      receivedMessages.push(res);
    }
    assert.deepStrictEqual(receivedMessages, output);
    assert.ok(interceptorCalled);
  });
  it("doesn't support throw/return on the returned response", () => {
    const fn = createServerStreamingFn(
      createRouterTransport(({ service }) => {
        service(TestService, {
          serverStream: () => createAsyncIterable([]),
        });
      }),
      TestService.method.serverStream,
    );
    const it = fn({})[Symbol.asyncIterator]();
    assert.strictEqual(it.throw, undefined);
    assert.strictEqual(it.return, undefined);
  });
});

describe("createBiDiStreamingFn()", () => {
  it("works as expected on the happy path", async () => {
    const values = [123, 456, 789];

    const input = createAsyncIterable(
      values.map((value) => create(Int32ValueSchema, { value })),
    );

    let bidiIndex = 0;
    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        bidiStream: async function* (input: AsyncIterable<Int32Value>) {
          for await (const thing of input) {
            assert.strictEqual(thing.value, values[bidiIndex]);
            bidiIndex += 1;
            yield create(StringValueSchema, { value: thing.value.toString() });
          }
        },
      });
    });
    const fn = createBiDiStreamingFn(transport, TestService.method.bidiStream);

    let index = 0;
    for await (const res of fn(input)) {
      assert.deepStrictEqual(
        res,
        create(StringValueSchema, { value: values[index].toString() }),
      );
      index += 1;
    }
    assert.strictEqual(index, 3);
    assert.strictEqual(bidiIndex, 3);
  });
  it("passes the context values to interceptors", async () => {
    const values = [123, 456, 789];

    const input = createAsyncIterable(
      values.map((value) => create(Int32ValueSchema, { value })),
    );
    let interceptorCalled = false;
    let bidiIndex = 0;
    const transport = createRouterTransport(
      ({ service }) => {
        service(TestService, {
          bidiStream: async function* (input: AsyncIterable<Int32Value>) {
            for await (const thing of input) {
              assert.strictEqual(thing.value, values[bidiIndex]);
              bidiIndex += 1;
              yield create(StringValueSchema, {
                value: thing.value.toString(),
              });
            }
          },
        });
      },
      {
        transport: {
          interceptors: [
            (next) => {
              return (req) => {
                interceptorCalled = true;
                assert.strictEqual(req.contextValues.get(kString), "bar");
                return next(req);
              };
            },
          ],
        },
      },
    );
    const fn = createBiDiStreamingFn(transport, TestService.method.bidiStream);

    let index = 0;
    for await (const res of fn(input, {
      contextValues: createContextValues().set(kString, "bar"),
    })) {
      assert.deepStrictEqual(
        res,
        create(StringValueSchema, { value: values[index].toString() }),
      );
      index += 1;
    }
    assert.strictEqual(index, 3);
    assert.strictEqual(bidiIndex, 3);
    assert.ok(interceptorCalled);
  });
  it("closes the request iterable when response is received", async () => {
    const values = [123, 456, 789];

    const input = createAsyncIterable(
      values.map((value) => create(Int32ValueSchema, { value })),
    );
    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        bidiStream: async function* (input: AsyncIterable<Int32Value>) {
          for await (const next of input) {
            yield { value: `yield ${next.value}` };
            break;
          }
        },
      });
    });
    const fn = createBiDiStreamingFn(transport, TestService.method.bidiStream);

    let count = 0;
    for await (const res of fn(input)) {
      assert.deepStrictEqual(
        res,
        create(StringValueSchema, { value: "yield 123" }),
      );
      count += 1;
    }
    assert.strictEqual(count, 1);
    assert.deepStrictEqual(await input[Symbol.asyncIterator]().next(), {
      done: true,
      value: undefined,
    });
  });
  it("closes the request iterable when an error is thrown", async () => {
    const values = [123, 456, 789];

    const input = createAsyncIterable(
      values.map((value) => create(Int32ValueSchema, { value })),
    );
    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        bidiStream: async function* (input: AsyncIterable<Int32Value>) {
          for await (const next of input) {
            yield { value: `yield ${next.value}` };
            throw new ConnectError("foo", Code.Internal);
          }
        },
      });
    });
    const fn = createBiDiStreamingFn(transport, TestService.method.bidiStream);

    let count = 0;
    try {
      for await (const res of fn(input)) {
        assert.deepStrictEqual(
          res,
          create(StringValueSchema, { value: "yield 123" }),
        );
        count += 1;
      }
    } catch (e) {
      assert.ok(e instanceof ConnectError);
      assert.strictEqual((e as ConnectError).code, Code.Internal);
      assert.strictEqual((e as ConnectError).rawMessage, "foo");
    }
    assert.strictEqual(count, 1);
    assert.deepStrictEqual(await input[Symbol.asyncIterator]().next(), {
      done: true,
      value: undefined,
    });
  });
  it("doesn't support throw/return on the returned response", () => {
    const fn = createBiDiStreamingFn(
      createRouterTransport(({ service }) => {
        service(TestService, {
          bidiStream: () => createAsyncIterable([]),
        });
      }),
      TestService.method.bidiStream,
    );
    const it = fn(createAsyncIterable([]))[Symbol.asyncIterator]();
    assert.strictEqual(it.throw, undefined);
    assert.strictEqual(it.return, undefined);
  });
});
