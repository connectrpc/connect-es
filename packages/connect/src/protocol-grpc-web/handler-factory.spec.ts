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

import { create, toBinary } from "@bufbuild/protobuf";
import type { MethodImpl } from "../implementation.js";
import { createMethodImplSpec } from "../implementation.js";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import type { MethodInfo } from "../types.js";
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

describe("createHandlerFactory()", function () {
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

  function setupTestHandler<M extends MethodInfo>(
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

  describe("returned handler", function () {
    it("should surface headers for unary", async function () {
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
      expect(r.header.get("implementation-called")).toBe("yes");
      expect(r.message.value).toBe("123");
    });

    it("should surface headers for server-streaming", async function () {
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
      expect(r.header.get("implementation-called")).toBe("yes");
      const all = await pipeTo(r.message, sinkAll());
      expect(all.length).toBe(1);
      expect(all[0].value).toBe("123");
    });
    it("should propagate errors back to the handler", async function () {
      let resolve: (e: unknown) => void;
      const catchError = new Promise<unknown>((r) => (resolve = r));
      let abortResolve: () => void;
      const abortCalled = new Promise<void>((r) => (abortResolve = r));
      const { handler } = setupTestHandler(
        testService.method.serverStreaming,
        {},
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (req, { signal }) {
          signal.addEventListener("abort", abortResolve);
          try {
            yield { value: `${req.value}` };
            fail("expected error");
          } catch (e: unknown) {
            resolve!(e);
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
      expect(res.body).toBeDefined();
      const it = res.body![Symbol.asyncIterator]();
      await it.next();
      const writeError = new Error("write error");
      await it.throw?.(writeError).catch(() => {});
      await expectAsync(catchError).toBeResolvedTo(writeError);
      await expectAsync(abortCalled).toBeResolved();
    });
  });

  describe("deadlines", function () {
    it("should trigger handler context signal", async function () {
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
      expect(handlerContextSignal).toBeDefined();
      expect(handlerContextSignal?.aborted).toBeTrue();
      expect(handlerContextSignal?.reason).toBeInstanceOf(ConnectError);
      expect(ConnectError.from(handlerContextSignal?.reason).message).toBe(
        "[deadline_exceeded] the operation timed out",
      );
    });
    describe("exceeding configured maxTimeoutMs", function () {
      it("should raise an error with code INVALID_ARGUMENT", async function () {
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
        try {
          await transport.unary(
            method,
            undefined,
            timeoutMs,
            undefined,
            create(Int32ValueSchema),
          );
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[invalid_argument] timeout 2000ms must be <= 1000",
          );
        }
        expect(implementationCalled)
          .withContext("did not expect implementation to be called")
          .toBeFalse();
      });
    });
  });

  describe("shutdown", function () {
    it("should raise the abort reason", async function () {
      const shutdown = new AbortController();
      const { transport, method } = setupTestHandler(
        testService.method.unary,
        {
          shutdownSignal: shutdown.signal,
        },
        async (_req, ctx) => {
          shutdown.abort(new ConnectError("shutting down", Code.Unavailable));
          expect(ctx.signal.aborted).toBeTrue();
          ctx.signal.throwIfAborted();
          return Promise.resolve(create(StringValueSchema));
        },
      );
      try {
        await transport.unary(
          method,
          undefined,
          undefined,
          undefined,
          create(Int32ValueSchema),
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          "[unavailable] shutting down",
        );
      }
    });
  });

  describe("request abort signal", function () {
    it("should trigger handler context signal", async function () {
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
      expect(handlerContextSignal).toBeDefined();
      expect(handlerContextSignal?.aborted).toBeTrue();
      expect(handlerContextSignal?.reason).toBe("test-reason");
    });
  });
});
