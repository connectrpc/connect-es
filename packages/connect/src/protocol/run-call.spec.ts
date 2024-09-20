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

import { create } from "@bufbuild/protobuf";
import { runStreamingCall, runUnaryCall } from "./run-call.js";
import type {
  StreamRequest,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
} from "../interceptor.js";
import { createAsyncIterable } from "./async-iterable.js";
import { createContextValues } from "../context-values.js";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";

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

describe("runUnaryCall()", function () {
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
  it("should return the response", async function () {
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
    expect(res.message.value).toBe("123");
  });
  it("should trigger the signal when done", async function () {
    let signal: AbortSignal | undefined;
    await runUnaryCall<typeof Int32ValueSchema, typeof StringValueSchema>({
      req: makeReq(),
      async next(req) {
        signal = req.signal;
        await new Promise((resolve) => setTimeout(resolve, 1));
        return makeRes(req);
      },
    });
    expect(signal?.aborted).toBeTrue();
  });
  it("should raise Code.Canceled on user abort", async function () {
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
    await expectAsync(resPromise).toBeRejectedWithError(
      "[canceled] This operation was aborted",
    );
  });
  it("should raise Code.DeadlineExceeded on timeout", async function () {
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
    await expectAsync(resPromise).toBeRejectedWithError(
      "[deadline_exceeded] the operation timed out",
    );
  });
});

describe("runStreamingCall()", function () {
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

  it("should return the response", async function () {
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
    expect(values).toEqual(["1", "2", "3"]);
    const it = req.message[Symbol.asyncIterator]();
    expect(await it.next()).toEqual({ done: true, value: undefined });
    // Check to see if response iterator doesn't provide throw/return.
    const resIt = res.message[Symbol.asyncIterator]();
    expect(resIt.throw).not.toBeDefined(); // eslint-disable-line  @typescript-eslint/unbound-method
    expect(resIt.return).not.toBeDefined(); // eslint-disable-line  @typescript-eslint/unbound-method
  });
  it("should trigger the signal when done", async function () {
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
      expect(m).toBeDefined();
    }
    expect(signal?.aborted).toBeTrue();
    const it = req.message[Symbol.asyncIterator]();
    expect(await it.next()).toEqual({ done: true, value: undefined });
  });
  it("should raise Code.Canceled on user abort", async function () {
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
    await expectAsync(resPromise).toBeRejectedWithError(
      "[canceled] This operation was aborted",
    );
    const it = req.message[Symbol.asyncIterator]();
    expect(await it.next()).toEqual({ done: true, value: undefined });
  });
  it("should raise Code.DeadlineExceeded on timeout", async function () {
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
    await expectAsync(resPromise).toBeRejectedWithError(
      "[deadline_exceeded] the operation timed out",
    );
    const it = req.message[Symbol.asyncIterator]();
    expect(await it.next()).toEqual({ done: true, value: undefined });
  });
  it("should propagate the error thrown in next", async function () {
    const req = makeReq();
    let reqError: Error | undefined;
    req.message = {
      [Symbol.asyncIterator]() {
        return {
          next() {
            fail("unexpected call");
            throw new Error("unexpected call");
          },
          throw(e) {
            reqError = e as Error;
            return Promise.reject({ done: true, value: undefined });
          },
        };
      },
    };
    await expectAsync(
      runStreamingCall<typeof Int32ValueSchema, typeof StringValueSchema>({
        req: req,
        next() {
          return Promise.reject(new Error("foo"));
        },
      }),
    ).toBeRejectedWithError("[unknown] foo");
    expect(reqError?.message).toEqual("[unknown] foo");
  });
});
