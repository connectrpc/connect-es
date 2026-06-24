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
import { create, toBinary, type DescMethod } from "@bufbuild/protobuf";
import type { MethodImpl } from "../implementation.js";
import { createMethodImplSpec } from "../implementation.js";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import type { UniversalHandlerOptions } from "../protocol/index.js";
import {
  createAsyncIterable,
  createUniversalHandlerClient,
  encodeEnvelope,
  pipeTo,
  sinkAll,
} from "../protocol/index.js";
import { createHandlerFactory } from "./handler-factory.js";
import { createTransport } from "./transport.js";
import { requestHeader } from "./request-header.js";
import { contentTypeProto } from "./content-type.js";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";

describe("createHandlerFactory()", () => {
  const testService = createServiceDesc({
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

  function setupTestHandler<M extends DescMethod>(
    method: M,
    opt: Partial<UniversalHandlerOptions>,
    impl: MethodImpl<M>,
  ) {
    const h = createHandlerFactory(opt)(createMethodImplSpec(method, impl));
    const t = createTransport({
      httpClient: createUniversalHandlerClient([h]),
      baseUrl: "https://example.com",
      readMaxBytes: 0xffffff,
      writeMaxBytes: 0xffffff,
      compressMinBytes: 0xffffff,
      useBinaryFormat: true,
      interceptors: [],
      acceptCompression: [],
      sendCompression: null,
    });
    return {
      method: method,
      handler: h,
      transport: t,
    };
  }

  describe("returned handler", () => {
    it("should surface headers for unary", async () => {
      const { transport, method } = setupTestHandler(
        testService.method.unary,
        {},
        (req, ctx) => {
          ctx.responseHeader.set("implementation-called", "yes");
          return { value: req.value.toString(10) };
        },
      );
      const r = await transport.unary(
        method,
        undefined,
        undefined,
        undefined,
        create(Int32ValueSchema, { value: 123 }),
      );
      assert.strictEqual(r.header.get("implementation-called"), "yes");
      assert.strictEqual(r.message.value, "123");
    });

    it("should surface headers for server-streaming", async () => {
      const { transport, method } = setupTestHandler(
        testService.method.serverStreaming,
        {},
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (req, ctx) {
          ctx.responseHeader.set("implementation-called", "yes");
          yield { value: req.value.toString(10) };
        },
      );
      const r = await transport.stream(
        method,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([create(Int32ValueSchema, { value: 123 })]),
      );
      assert.strictEqual(r.header.get("implementation-called"), "yes");
      const all = await pipeTo(r.message, sinkAll());
      assert.strictEqual(all.length, 1);
      assert.strictEqual(all[0].value, "123");
    });
    it("should propagate errors back to the handler", async () => {
      let resolve: (e: unknown) => void;
      const catchError = new Promise<unknown>((r) => {
        resolve = r;
      });
      let abortResolve: () => void;
      const abortCalled = new Promise<void>((r) => {
        abortResolve = r;
      });
      const { handler } = setupTestHandler(
        testService.method.serverStreaming,
        {},
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (req, { signal }) {
          signal.addEventListener("abort", abortResolve);
          try {
            yield { value: `${req.value}` };
            assert.fail("expected error");
          } catch (e: unknown) {
            resolve?.(e);
          }
        },
      );

      const res = await handler({
        httpVersion: "2.0",
        url: handler.requestPath,
        method: "POST",
        header: new Headers({
          "content-type": contentTypeProto,
        }),
        body: createAsyncIterable([
          encodeEnvelope(
            0,
            toBinary(Int32ValueSchema, create(Int32ValueSchema, { value: 1 })),
          ),
        ]),
        signal: new AbortController().signal,
      });
      assert.notStrictEqual(res.body, undefined);
      const it = res.body?.[Symbol.asyncIterator]();
      await it?.next();
      const writeError = new Error("write error");
      await it?.throw?.(writeError).catch(() => {});
      assert.deepStrictEqual(await catchError, writeError);
      await abortCalled;
    });
  });

  describe("deadlines", () => {
    it("should trigger handler context signal", async () => {
      const timeoutMs = 1;
      let handlerContextSignal: AbortSignal | undefined;
      const { handler, method } = setupTestHandler(
        testService.method.unary,
        {},
        async (req, ctx) => {
          handlerContextSignal = ctx.signal;
          for (;;) {
            await new Promise((r) => setTimeout(r, 1));
            ctx.signal.throwIfAborted();
          }
        },
      );
      await handler({
        httpVersion: "2.0",
        method: "POST",
        url: `https://example.com/${method.parent.typeName}/${method.name}`,
        header: requestHeader(true, timeoutMs, undefined, true),
        body: createAsyncIterable([encodeEnvelope(0, new Uint8Array(0))]),
        signal: new AbortController().signal,
      });
      assert.notStrictEqual(handlerContextSignal, undefined);
      assert.strictEqual(handlerContextSignal?.aborted, true);
      assert.ok(handlerContextSignal?.reason instanceof ConnectError);
      assert.strictEqual(
        ConnectError.from(handlerContextSignal?.reason).message,
        "[deadline_exceeded] the operation timed out",
      );
    });
    describe("exceeding configured maxTimeoutMs", () => {
      it("should raise an error with code INVALID_ARGUMENT", async () => {
        const maxTimeoutMs = 1000;
        const timeoutMs = 2000;
        let implementationCalled = false;
        const { transport, method } = setupTestHandler(
          testService.method.unary,
          {
            maxTimeoutMs,
          },
          async () => {
            implementationCalled = true;
            return Promise.resolve(create(StringValueSchema));
          },
        );
        await assert.rejects(
          transport.unary(
            method,
            undefined,
            timeoutMs,
            undefined,
            create(Int32ValueSchema),
          ),
          (e) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[invalid_argument] timeout 2000ms must be <= 1000",
            );
            return true;
          },
        );
        assert.strictEqual(
          implementationCalled,
          false,
          "did not expect implementation to be called",
        );
      });
    });
  });

  describe("shutdown", () => {
    it("should raise the abort reason", async () => {
      const shutdown = new AbortController();
      const { transport, method } = setupTestHandler(
        testService.method.unary,
        {
          shutdownSignal: shutdown.signal,
        },
        async (_req, ctx) => {
          shutdown.abort(new ConnectError("shutting down", Code.Unavailable));
          assert.ok(ctx.signal.aborted);
          ctx.signal.throwIfAborted();
          return Promise.resolve(create(StringValueSchema));
        },
      );
      await assert.rejects(
        transport.unary(
          method,
          undefined,
          undefined,
          undefined,
          create(Int32ValueSchema),
        ),
        (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(
            e.message,
            "[unavailable] shutting down",
          );
          return true;
        },
      );
    });
  });

  describe("request abort signal", () => {
    it("should trigger handler context signal", async () => {
      let handlerContextSignal: AbortSignal | undefined;
      const { handler, method } = setupTestHandler(
        testService.method.unary,
        {},
        async (req, ctx) => {
          handlerContextSignal = ctx.signal;
          for (;;) {
            await new Promise((r) => setTimeout(r, 1));
            ctx.signal.throwIfAborted();
          }
        },
      );
      const ac = new AbortController();
      const resPromise = handler({
        httpVersion: "2.0",
        method: "POST",
        url: `https://example.com/${method.parent.typeName}/${method.name}`,
        header: requestHeader(true, undefined, undefined, true),
        body: createAsyncIterable([encodeEnvelope(0, new Uint8Array(0))]),
        signal: ac.signal,
      });
      ac.abort("test-reason");
      await resPromise;
      assert.notStrictEqual(handlerContextSignal, undefined);
      assert.strictEqual(handlerContextSignal?.aborted, true);
      assert.strictEqual(handlerContextSignal?.reason, "test-reason");
    });
  });
});
