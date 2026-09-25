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
import { runStreamingCall, runUnaryCall } from "./run-call.js";
import type {
  Interceptor,
  StreamRequest,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
} from "../interceptor.js";
import { createAsyncIterable } from "./async-iterable.js";
import { createContextValues } from "../context-values.js";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";

const TestService = createServiceDesc({
  typeName: "TestService",
  method: {
    unary: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "unary",
    },
    serverStreaming: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "server_streaming",
    },
  },
});

describe("runUnaryCall()", () => {
  function makeReq() {
    return {
      stream: false as const,
      service: TestService,
      method: TestService.method.unary,
      requestMethod: "POST",
      url: `https://example.com/TestService/Unary`,
      header: new Headers(),
      message: { value: 123 },
      contextValues: createContextValues(),
    };
  }

  function makeRes(
    req: UnaryRequest<typeof Int32ValueSchema, typeof StringValueSchema>,
  ) {
    return <UnaryResponse<typeof Int32ValueSchema, typeof StringValueSchema>>{
      stream: false,
      service: TestService,
      method: TestService.method.unary,
      header: new Headers(),
      message: create(StringValueSchema, {
        value: req.message.value.toString(10),
      }),
      trailer: new Headers(),
    };
  }
  it("should return the response", async () => {
    const res = await runUnaryCall<
      typeof Int32ValueSchema,
      typeof StringValueSchema
    >({
      timeoutMs: undefined,
      signal: undefined,
      interceptors: [],
      req: makeReq(),
      async next(req) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return makeRes(req);
      },
    });
    assert.strictEqual(res.message.value, "123");
  });
  it("should trigger the signal when done", async () => {
    let signal: AbortSignal | undefined;
    await runUnaryCall<typeof Int32ValueSchema, typeof StringValueSchema>({
      req: makeReq(),
      async next(req) {
        signal = req.signal;
        await new Promise((resolve) => setTimeout(resolve, 1));
        return makeRes(req);
      },
    });
    assert.strictEqual(signal?.aborted, true);
  });
  it("should raise Code.Canceled on user abort", async () => {
    const userAbort = new AbortController();
    const resPromise = runUnaryCall<
      typeof Int32ValueSchema,
      typeof StringValueSchema
    >({
      signal: userAbort.signal,
      req: makeReq(),
      async next(req) {
        for (;;) {
          await new Promise((resolve) => setTimeout(resolve, 1));
          req.signal.throwIfAborted();
        }
      },
    });
    userAbort.abort();
    await assert.rejects(resPromise, {
      message: "[canceled] This operation was aborted",
    });
  });
  it("should raise Code.DeadlineExceeded on timeout", async () => {
    const resPromise = runUnaryCall<
      typeof Int32ValueSchema,
      typeof StringValueSchema
    >({
      timeoutMs: 1,
      req: makeReq(),
      async next(req) {
        for (;;) {
          await new Promise((resolve) => setTimeout(resolve, 1));
          req.signal.throwIfAborted();
        }
      },
    });
    await assert.rejects(resPromise, {
      message: "[deadline_exceeded] the operation timed out",
    });
  });
});

describe("runStreamingCall()", () => {
  function makeReq() {
    return {
      stream: true as const,
      service: TestService,
      method: TestService.method.serverStreaming,
      requestMethod: "POST",
      url: `https://example.com/TestService/ServerStreaming`,
      header: new Headers(),
      message: createAsyncIterable([{ value: 1 }, { value: 2 }, { value: 3 }]),
      contextValues: createContextValues(),
    };
  }

  function makeRes(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: StreamRequest<typeof Int32ValueSchema, typeof StringValueSchema>,
  ) {
    return <StreamResponse<typeof Int32ValueSchema, typeof StringValueSchema>>{
      stream: true,
      service: TestService,
      method: TestService.method.serverStreaming,
      header: new Headers(),
      message: createAsyncIterable([
        create(StringValueSchema, { value: "1" }),
        create(StringValueSchema, { value: "2" }),
        create(StringValueSchema, { value: "3" }),
      ]),
      trailer: new Headers(),
    };
  }

  it("should return the response", async () => {
    const req = makeReq();
    const res = await runStreamingCall<
      typeof Int32ValueSchema,
      typeof StringValueSchema
    >({
      timeoutMs: undefined,
      signal: undefined,
      interceptors: [],
      req: req,
      async next(req) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        return makeRes(req);
      },
    });
    const values: string[] = [];
    for await (const m of res.message) {
      values.push(m.value);
    }
    assert.deepStrictEqual(values, ["1", "2", "3"]);
    const it = req.message[Symbol.asyncIterator]();
    assert.deepStrictEqual(await it.next(), { done: true, value: undefined });
    const resIt = res.message[Symbol.asyncIterator]();
    assert.strictEqual(typeof resIt.throw, "function");
    assert.strictEqual(typeof resIt.return, "function");
  });
  it("should trigger the signal when done", async () => {
    let signal: AbortSignal | undefined;
    const req = makeReq();
    const res = await runStreamingCall<
      typeof Int32ValueSchema,
      typeof StringValueSchema
    >({
      req: req,
      async next(req) {
        signal = req.signal;
        await new Promise((resolve) => setTimeout(resolve, 1));
        return makeRes(req);
      },
    });
    for await (const m of res.message) {
      assert.notStrictEqual(m, undefined);
    }
    assert.strictEqual(signal?.aborted, true);
    const it = req.message[Symbol.asyncIterator]();
    assert.deepStrictEqual(await it.next(), { done: true, value: undefined });
  });
  it("should raise Code.Canceled on user abort", async () => {
    const userAbort = new AbortController();
    const req = makeReq();
    const resPromise = runStreamingCall<
      typeof Int32ValueSchema,
      typeof StringValueSchema
    >({
      signal: userAbort.signal,
      req: req,
      async next(req) {
        for (;;) {
          await new Promise((resolve) => setTimeout(resolve, 1));
          req.signal.throwIfAborted();
        }
      },
    });
    userAbort.abort();
    await assert.rejects(resPromise, {
      message: "[canceled] This operation was aborted",
    });
    const it = req.message[Symbol.asyncIterator]();
    assert.deepStrictEqual(await it.next(), { done: true, value: undefined });
  });
  it("should not pull messages after the user aborts", async () => {
    const userAbort = new AbortController();
    let didPullAfterAbort = false;
    const res = await runStreamingCall<
      typeof Int32ValueSchema,
      typeof StringValueSchema
    >({
      signal: userAbort.signal,
      req: makeReq(),
      next: (req) =>
        Promise.resolve({
          ...makeRes(req),
          message: (async function* () {
            yield create(StringValueSchema, { value: "1" });
            didPullAfterAbort = true;
            yield create(StringValueSchema, { value: "2" });
          })(),
        }),
    });
    const it = res.message[Symbol.asyncIterator]();

    await it.next();
    userAbort.abort();

    await assert.rejects(it.next(), {
      message: "[canceled] This operation was aborted",
    });
    assert.ok(!didPullAfterAbort);
  });
  it("should raise Code.DeadlineExceeded on timeout", async () => {
    const req = makeReq();
    const resPromise = runStreamingCall<
      typeof Int32ValueSchema,
      typeof StringValueSchema
    >({
      timeoutMs: 1,
      req: req,
      async next(req) {
        for (;;) {
          await new Promise((resolve) => setTimeout(resolve, 1));
          req.signal.throwIfAborted();
        }
      },
    });
    await assert.rejects(resPromise, {
      message: "[deadline_exceeded] the operation timed out",
    });
    const it = req.message[Symbol.asyncIterator]();
    assert.deepStrictEqual(await it.next(), { done: true, value: undefined });
  });
  it("should propagate the error thrown in next", async () => {
    const req = makeReq();
    let reqError: Error | undefined;
    req.message = {
      [Symbol.asyncIterator]() {
        return {
          next() {
            assert.fail("unexpected call");
            throw new Error("unexpected call");
          },
          throw(e) {
            reqError = e as Error;
            return Promise.reject({ done: true, value: undefined });
          },
        };
      },
    };
    await assert.rejects(
      runStreamingCall<typeof Int32ValueSchema, typeof StringValueSchema>({
        req: req,
        next() {
          return Promise.reject(new Error("foo"));
        },
      }),
      { message: "[unknown] foo" },
    );
    assert.strictEqual(reqError?.message, "[unknown] foo");
  });

  describe("response lifecycle", () => {
    function trace(outcomes: (Code | undefined)[]): Interceptor {
      return (next) => async (req) => {
        const res = await next(req);
        if (!res.stream) {
          return res;
        }
        return {
          ...res,
          message: (async function* () {
            let code: Code | undefined;
            try {
              yield* res.message;
            } catch (e) {
              code = ConnectError.from(e).code;
              throw e;
            } finally {
              outcomes.push(code);
            }
          })(),
        };
      };
    }

    it("lets an interceptor retry failed setup without closing the request", async () => {
      let attempts = 0;
      const outcomes: (Code | undefined)[] = [];
      const res = await runStreamingCall({
        req: makeReq(),
        interceptors: [
          trace(outcomes),
          (next) => async (req) => {
            try {
              return await next(req);
            } catch (reason) {
              assert.ok(reason instanceof ConnectError);
              assert.strictEqual(reason.code, Code.Unavailable);
              return next(req);
            }
          },
        ],
        async next(req) {
          attempts++;
          if (attempts === 1) {
            throw new ConnectError("try again", Code.Unavailable);
          }
          assert.strictEqual(req.signal.aborted, false);
          const input = [];
          for await (const message of req.message) {
            input.push(message.value);
          }
          assert.deepStrictEqual(input, [1, 2, 3]);
          return makeRes(req);
        },
      });
      const values = [];
      for await (const message of res.message) {
        values.push(message.value);
      }
      assert.deepStrictEqual(values, ["1", "2", "3"]);
      assert.strictEqual(attempts, 2);
      assert.deepStrictEqual(outcomes, [undefined]);
    });

    it("lets an interceptor recover from response and cleanup errors", async () => {
      const sourceError = new ConnectError("read failed", Code.Unavailable);
      sourceError.details = [
        { type: Int32ValueSchema.typeName, value: Uint8Array.of(8, 7) },
      ];
      let returned = 0;
      const outcomes: (Code | undefined)[] = [];
      const res = await runStreamingCall({
        req: makeReq(),
        interceptors: [
          trace(outcomes),
          (next) => async (req) => {
            const res = await next(req);
            if (!res.stream) {
              return res;
            }
            return {
              ...res,
              message: (async function* () {
                try {
                  yield* res.message;
                } catch (reason) {
                  assert.strictEqual(reason, sourceError);
                  yield create(StringValueSchema, { value: "fallback" });
                }
              })(),
            };
          },
        ],
        async next(req) {
          return {
            ...makeRes(req),
            message: {
              [Symbol.asyncIterator]: () => ({
                next: () => Promise.reject(sourceError),
                return: () => {
                  returned++;
                  return Promise.reject(new Error("cleanup failed"));
                },
              }),
            },
          };
        },
      });
      const values = [];
      for await (const message of res.message) {
        values.push(message.value);
      }
      assert.deepStrictEqual(values, ["fallback"]);
      assert.strictEqual(returned, 1);
      assert.deepStrictEqual(outcomes, [undefined]);
    });

    it("closes an early return successfully without pulling another message", async () => {
      const outcomes: (Code | undefined)[] = [];
      let reads = 0;
      let closed = false;
      const req = makeReq();
      const res = await runStreamingCall({
        req,
        interceptors: [trace(outcomes)],
        async next(request) {
          const response = makeRes(request);
          return {
            ...response,
            message: (async function* () {
              try {
                for await (const message of response.message) {
                  reads++;
                  yield message;
                }
              } finally {
                closed = true;
              }
            })(),
          };
        },
      });
      assert.strictEqual(reads, 0);
      for await (const message of res.message) {
        assert.strictEqual(message.value, "1");
        break;
      }
      assert.deepStrictEqual(outcomes, [undefined]);
      assert.strictEqual(closed, true);
      assert.strictEqual(reads, 1);
      const it = res.message[Symbol.asyncIterator]();
      await it.return?.();
      assert.deepStrictEqual(await it.next(), { done: true, value: undefined });
      assert.deepStrictEqual(await req.message[Symbol.asyncIterator]().next(), {
        done: true,
        value: undefined,
      });
      assert.deepStrictEqual(outcomes, [undefined]);
    });

    for (const action of ["string abort", "error abort", "deadline"] as const) {
      it(`finalizes a parked interceptor on ${action} and retains the error`, async (t) => {
        t.mock.timers.enable({ apis: ["setTimeout"] });
        const controller = new AbortController();
        const outcomes: (Code | undefined)[] = [];
        const code =
          action === "deadline" ? Code.DeadlineExceeded : Code.Canceled;
        const res = await runStreamingCall({
          req: makeReq(),
          signal: controller.signal,
          timeoutMs: 100,
          interceptors: [trace(outcomes)],
          async next(req) {
            return makeRes(req);
          },
        });
        const it = res.message[Symbol.asyncIterator]();
        assert.strictEqual((await it.next()).value.value, "1");
        assert.deepStrictEqual(outcomes, []);
        if (action === "deadline") {
          t.mock.timers.tick(100);
        } else {
          controller.abort(
            action === "string abort" ? "stopped" : new Error("stopped"),
          );
        }
        await new Promise((resolve) => setImmediate(resolve));
        assert.deepStrictEqual(outcomes, [code]);
        await it.return?.();
        await assert.rejects(it.next(), { code });
        assert.deepStrictEqual(outcomes, [code]);
      });
    }

    it("cancels a pending read before waiting for response cleanup", async () => {
      let readStarted = () => {};
      const reading = new Promise<void>((resolve) => {
        readStarted = resolve;
      });
      let releaseCleanup = () => {};
      const cleanup = new Promise<void>((resolve) => {
        releaseCleanup = resolve;
      });
      let signal: AbortSignal | undefined;
      const outcomes: (Code | undefined)[] = [];
      const res = await runStreamingCall({
        req: makeReq(),
        interceptors: [trace(outcomes)],
        async next(req) {
          signal = req.signal;
          return {
            ...makeRes(req),
            message: (async function* () {
              try {
                readStarted();
                await new Promise<void>((resolve) =>
                  req.signal.addEventListener("abort", () => resolve(), {
                    once: true,
                  }),
                );
              } finally {
                await cleanup;
              }
            })(),
          };
        },
      });
      const it = res.message[Symbol.asyncIterator]();
      assert.ok(it.return, "response iterator must provide return()");
      const pending = assert.rejects(it.next(), { code: Code.Canceled });
      await reading;
      const closing = it.return();
      try {
        assert.ok(signal?.aborted);
        assert.ok(signal.reason instanceof ConnectError);
        assert.strictEqual(signal.reason.code, Code.Canceled);
      } finally {
        releaseCleanup();
      }
      await Promise.all([pending, closing]);
      await assert.rejects(it.next(), { code: Code.Canceled });
      assert.deepStrictEqual(outcomes, [Code.Canceled]);
    });
  });
});
