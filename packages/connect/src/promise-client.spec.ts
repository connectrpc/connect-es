// Copyright 2021-2025 The Connect Authors
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

describe("createUnaryFn()", function () {
  it("passes the context values to interceptors", async () => {
    const input = create(Int32ValueSchema, { value: 1 });

    const output = create(StringValueSchema, { value: "yield 1" });
    let interceptorCalled = false;

    const transport = createRouterTransport(
      ({ service }) => {
        service(TestService, {
          unaryMethod: (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
            _input: Int32Value,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
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
                expect(req.contextValues.get(kString)).toBe("bar");
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
    expect(isMessage(res, StringValueSchema));
    expect(res.value).toEqual(output.value);
    expect(interceptorCalled).toBe(true);
  });
});

describe("createClientStreamingFn()", function () {
  it("works as expected on the happy path", async () => {
    const input = create(Int32ValueSchema, { value: 1 });

    const output = create(StringValueSchema, { value: "yield 1" });

    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        clientStream: (
          // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
          _input: AsyncIterable<Int32Value>,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
          _context: HandlerContext,
        ) => Promise.resolve(output),
      });
    });
    const fn = createClientStreamingFn(
      transport,
      TestService.method.clientStream,
    );
    const res = await fn(
      // eslint-disable-next-line @typescript-eslint/require-await
      (async function* () {
        yield input;
      })(),
    );
    expect(isMessage(res, StringValueSchema));
    expect(res.value).toEqual(output.value);
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
            _input: AsyncIterable<Int32Value>,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
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
                expect(req.contextValues.get(kString)).toBe("bar");
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
      // eslint-disable-next-line @typescript-eslint/require-await
      (async function* () {
        yield input;
      })(),
      {
        contextValues: createContextValues().set(kString, "bar"),
      },
    );
    expect(isMessage(res, StringValueSchema));
    expect(res.value).toEqual(output.value);
    expect(interceptorCalled).toBe(true);
  });
  it("closes the request iterable when response is received", async () => {
    const output = create(StringValueSchema, { value: "yield 1" });
    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        clientStream: async (input: AsyncIterable<Int32Value>) => {
          for await (const next of input) {
            expect(next.value).toBe(1);
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
      // eslint-disable-next-line @typescript-eslint/require-await
      (async function* () {
        try {
          yield { value: 1 };
          fail("expected early return");
        } finally {
          reqItrClosed = true;
        }
      })(),
    );
    expect(isMessage(res, StringValueSchema));
    expect(res.value).toEqual(output.value);
    expect(reqItrClosed).toBe(true);
  });
  it("closes the request iterable when response is received", async () => {
    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        clientStream: async (input: AsyncIterable<Int32Value>) => {
          for await (const next of input) {
            expect(next.value).toBe(1);
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
      // eslint-disable-next-line @typescript-eslint/require-await
      (async function* () {
        try {
          yield { value: 1 };
          fail("expected early return");
        } finally {
          reqItrClosed = true;
        }
      })(),
    );
    await expectAsync(res).toBeRejectedWith(
      new ConnectError("foo", Code.Internal),
    );
    expect(reqItrClosed).toBe(true);
  });
});

describe("createServerStreamingFn()", function () {
  it("works as expected on the happy path", async () => {
    const output = [
      create(StringValueSchema, { value: "input1" }),
      create(StringValueSchema, { value: "input2" }),
      create(StringValueSchema, { value: "input3" }),
    ];

    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
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
    expect(receivedMessages).toEqual(output);
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
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
                expect(req.contextValues.get(kString)).toBe("bar");
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
    expect(receivedMessages).toEqual(output);
    expect(interceptorCalled).toBeTrue();
  });
  it("doesn't support throw/return on the returned response", function () {
    const fn = createServerStreamingFn(
      createRouterTransport(({ service }) => {
        service(TestService, {
          serverStream: () => createAsyncIterable([]),
        });
      }),
      TestService.method.serverStream,
    );
    const it = fn({})[Symbol.asyncIterator]();
    expect(it.throw).not.toBeDefined(); // eslint-disable-line  @typescript-eslint/unbound-method
    expect(it.return).not.toBeDefined(); // eslint-disable-line  @typescript-eslint/unbound-method
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
            expect(thing.value).toBe(values[bidiIndex]);
            bidiIndex += 1;
            yield create(StringValueSchema, { value: thing.value.toString() });
          }
        },
      });
    });
    const fn = createBiDiStreamingFn(transport, TestService.method.bidiStream);

    let index = 0;
    for await (const res of fn(input)) {
      expect(res).toEqual(
        create(StringValueSchema, { value: values[index].toString() }),
      );
      index += 1;
    }
    expect(index).toBe(3);
    expect(bidiIndex).toBe(3);
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
              expect(thing.value).toBe(values[bidiIndex]);
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
                expect(req.contextValues.get(kString)).toBe("bar");
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
      expect(res).toEqual(
        create(StringValueSchema, { value: values[index].toString() }),
      );
      index += 1;
    }
    expect(index).toBe(3);
    expect(bidiIndex).toBe(3);
    expect(interceptorCalled).toBeTrue();
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
      expect(res).toEqual(create(StringValueSchema, { value: "yield 123" }));
      count += 1;
    }
    expect(count).toBe(1);
    expect(await input[Symbol.asyncIterator]().next()).toEqual({
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
        expect(res).toEqual(create(StringValueSchema, { value: "yield 123" }));
        count += 1;
      }
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      expect((e as ConnectError).code).toBe(Code.Internal);
      expect((e as ConnectError).rawMessage).toBe("foo");
    }
    expect(count).toBe(1);
    expect(await input[Symbol.asyncIterator]().next()).toEqual({
      done: true,
      value: undefined,
    });
  });
  it("doesn't support throw/return on the returned response", function () {
    const fn = createBiDiStreamingFn(
      createRouterTransport(({ service }) => {
        service(TestService, {
          bidiStream: () => createAsyncIterable([]),
        });
      }),
      TestService.method.bidiStream,
    );
    const it = fn(createAsyncIterable([]))[Symbol.asyncIterator]();
    expect(it.throw).not.toBeDefined(); // eslint-disable-line  @typescript-eslint/unbound-method
    expect(it.return).not.toBeDefined(); // eslint-disable-line  @typescript-eslint/unbound-method
  });
});
