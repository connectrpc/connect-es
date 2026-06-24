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
import {
  create,
  isMessage,
  toBinary,
  type DescMethod,
} from "@bufbuild/protobuf";
import { createHandlerFactory } from "./handler-factory.js";
import type { MethodImpl } from "../implementation.js";
import { createMethodImplSpec } from "../implementation.js";
import type {
  UniversalHandlerOptions,
  UniversalServerResponse,
} from "../protocol/index.js";
import {
  createAsyncIterable,
  createUniversalHandlerClient,
  encodeEnvelope,
  pipeTo,
  readAllBytes,
  sinkAll,
  transformSplitEnvelope,
} from "../protocol/index.js";
import { Code, ConnectError } from "../index.js";
import { errorFromJsonBytes } from "./error-json.js";
import { endStreamFromJson } from "./end-stream.js";
import { createTransport } from "./transport.js";
import { requestHeader } from "./request-header.js";
import { readAll } from "../protocol/async-iterable-helper.spec.js";
import { contentTypeStreamProto } from "./content-type.js";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import {
  ApiSchema,
  Int32ValueSchema,
  MethodOptions_IdempotencyLevel,
  MethodSchema,
  StringValueSchema,
} from "@bufbuild/protobuf/wkt";

describe("createHandlerFactory()", () => {
  const testService = createServiceDesc({
    typeName: "TestService",
    method: {
      unary: {
        input: Int32ValueSchema,
        output: StringValueSchema,
        methodKind: "unary",
      },
      unaryNoSideEffects: {
        input: Int32ValueSchema,
        output: StringValueSchema,
        methodKind: "unary",
        idempotency: MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS,
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
      service: testService,
      method: method,
      handler: h,
      transport: t,
    };
  }

  describe("returned handler", () => {
    it("should allow POST for unary RPC", () => {
      const { handler } = setupTestHandler(testService.method.unary, {}, () =>
        Promise.reject(),
      );
      assert.deepStrictEqual(handler.allowedMethods, ["POST"]);
      assert.deepStrictEqual(handler.protocolNames, ["connect"]);
    });
    it("should allow GET,POST for eligible RPC", () => {
      const { handler } = setupTestHandler(
        testService.method.unaryNoSideEffects,
        {},
        () => Promise.reject(),
      );
      assert.deepStrictEqual(handler.allowedMethods, ["POST", "GET"]);
      assert.deepStrictEqual(handler.protocolNames, ["connect"]);
    });
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
          "content-type": contentTypeStreamProto,
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

  describe("requireConnectProtocolHeader", () => {
    describe("with unary RPC", () => {
      const { handler } = setupTestHandler(
        testService.method.unary,
        { requireConnectProtocolHeader: true },
        (req) => ({ value: req.value.toString(10) }),
      );
      it("should raise error for missing header", async () => {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: "https://example.com",
          header: new Headers({ "Content-Type": "application/json" }),
          body: 777,
          signal: new AbortController().signal,
        });
        assert.strictEqual(res.status, 400);
        assert.notStrictEqual(res.body, undefined);
        if (res.body !== undefined) {
          const body = await readAll(res.body);
          assert.strictEqual(body.length, 1);
          const err = errorFromJsonBytes(
            body[0],
            undefined,
            new ConnectError("failed to parse connect err", Code.Internal),
          );
          assert.strictEqual(
            err.message,
            '[invalid_argument] missing required header: set Connect-Protocol-Version to "1"',
          );
        }
      });
      it("should raise error for wrong header", async () => {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: "https://example.com",
          header: new Headers({
            "Content-Type": "application/json",
            "Connect-Protocol-Version": "UNEXPECTED",
          }),
          body: 777,
          signal: new AbortController().signal,
        });
        assert.strictEqual(res.status, 400);
        assert.notStrictEqual(res.body, undefined);
        if (res.body !== undefined) {
          const body = await readAll(res.body);
          assert.strictEqual(body.length, 1);
          const err = errorFromJsonBytes(
            body[0],
            undefined,
            new ConnectError("failed to parse connect err", Code.Internal),
          );
          assert.strictEqual(
            err.message,
            '[invalid_argument] Connect-Protocol-Version must be "1": got "UNEXPECTED"',
          );
        }
      });
    });
    describe("with streaming RPC", () => {
      const { handler } = setupTestHandler(
        testService.method.serverStreaming,
        { requireConnectProtocolHeader: true },
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (req) {
          yield { value: req.value.toString(10) };
        },
      );
      it("should raise error for missing header", async () => {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: "https://example.com",
          header: new Headers({ "Content-Type": "application/connect+json" }),
          body: createAsyncIterable([new Uint8Array()]),
          signal: new AbortController().signal,
        });
        assert.strictEqual(res.status, 200);
        assert.ok(!(res.body instanceof Uint8Array));
        assert.notStrictEqual(res.body, undefined);
        if (res.body !== undefined && Symbol.asyncIterator in res.body) {
          const end = endStreamFromJson(
            (await readAllBytes(res.body, Number.MAX_SAFE_INTEGER)).slice(5),
          );
          assert.strictEqual(
            end.error?.message,
            '[invalid_argument] missing required header: set Connect-Protocol-Version to "1"',
          );
        }
      });
      it("should raise error for wrong header", async () => {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: "https://example.com",
          header: new Headers({
            "Content-Type": "application/connect+json",
            "Connect-Protocol-Version": "UNEXPECTED",
          }),
          body: createAsyncIterable([new Uint8Array()]),
          signal: new AbortController().signal,
        });
        assert.strictEqual(res.status, 200);
        assert.ok(!(res.body instanceof Uint8Array));
        assert.notStrictEqual(res.body, undefined);
        if (res.body !== undefined && Symbol.asyncIterator in res.body) {
          const end = endStreamFromJson(
            (await readAllBytes(res.body, Number.MAX_SAFE_INTEGER)).slice(5),
          );
          assert.strictEqual(
            end.error?.message,
            '[invalid_argument] Connect-Protocol-Version must be "1": got "UNEXPECTED"',
          );
        }
      });
    });
  });

  describe("deadlines", () => {
    describe("with unary RPC", () => {
      it("should raise an error with code DEADLINE_EXCEEDED if exceeded", async () => {
        const timeoutMs = 1;
        const { handler, service, method } = setupTestHandler(
          testService.method.unary,
          {},
          async (req, ctx) => {
            await new Promise((r) => setTimeout(r, timeoutMs + 50));
            ctx.signal.throwIfAborted();
            return { value: req.value.toString(10) };
          },
        );
        const res = await handler({
          httpVersion: "2.0",
          method: "POST",
          url: `https://example.com/${service.typeName}/${method.name}`,
          header: requestHeader(
            method.methodKind,
            true,
            timeoutMs,
            undefined,
            true,
          ),
          body: createAsyncIterable([new Uint8Array(0)]),
          signal: new AbortController().signal,
        });
        assert.strictEqual(res.status, 504);
        assert.notStrictEqual(res.body, undefined);
        if (res.body !== undefined) {
          const err = errorFromJsonBytes(
            await readAllBytes(res.body, Number.MAX_SAFE_INTEGER),
            undefined,
            new ConnectError("error parse failed"),
          );
          assert.strictEqual(err.code, Code.DeadlineExceeded);
          assert.strictEqual(
            err.message,
            "[deadline_exceeded] the operation timed out",
          );
        }
      });
    });
    describe("with streaming RPC", () => {
      async function getLastEnvelope(res: UniversalServerResponse) {
        assert.notStrictEqual(res.body, undefined);
        assert.ok(!(res.body instanceof Uint8Array));
        if (res.body !== undefined && Symbol.asyncIterator in res.body) {
          const envelopes = await pipeTo(
            res.body,
            transformSplitEnvelope(0xffffff),
            sinkAll(),
          );
          const last = envelopes.pop();
          assert.notStrictEqual(last, undefined);
          return last;
        }
        return undefined;
      }

      it("should raise an error with code DEADLINE_EXCEEDED if exceeded", async () => {
        const timeoutMs = 1;
        const { handler, service, method } = setupTestHandler(
          testService.method.serverStreaming,
          {},
          async function* (req, ctx) {
            await new Promise((r) => setTimeout(r, timeoutMs + 50));
            ctx.signal.throwIfAborted();
            yield { value: req.value.toString(10) };
          },
        );
        const res = await handler({
          httpVersion: "2.0",
          method: "POST",
          url: `https://example.com/${service.typeName}/${method.name}`,
          header: requestHeader(
            method.methodKind,
            true,
            timeoutMs,
            undefined,
            true,
          ),
          body: createAsyncIterable([encodeEnvelope(0, new Uint8Array(0))]),
          signal: new AbortController().signal,
        });
        assert.strictEqual(res.status, 200);
        assert.notStrictEqual(res.body, undefined);
        if (res.body !== undefined) {
          const lastEnv = await getLastEnvelope(res);
          if (lastEnv !== undefined) {
            const end = endStreamFromJson(lastEnv.data);
            assert.strictEqual(end.error?.code, Code.DeadlineExceeded);
            assert.strictEqual(
              end.error?.message,
              "[deadline_exceeded] the operation timed out",
            );
          }
        }
      });
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
          assert.strictEqual(e.message, "[unavailable] shutting down");
          return true;
        },
      );
    });
  });

  describe("request abort signal", () => {
    describe("with unary RPC", () => {
      it("should trigger handler context signal", async () => {
        let handlerContextSignal: AbortSignal | undefined;
        const { handler, service, method } = setupTestHandler(
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
          url: `https://example.com/${service.typeName}/${method.name}`,
          header: requestHeader(
            method.methodKind,
            true,
            undefined,
            undefined,
            true,
          ),
          body: createAsyncIterable([new Uint8Array(0)]),
          signal: ac.signal,
        });
        ac.abort("test-reason");
        await resPromise;
        assert.notStrictEqual(handlerContextSignal, undefined);
        assert.strictEqual(handlerContextSignal?.aborted, true);
        assert.strictEqual(handlerContextSignal?.reason, "test-reason");
      });
    });
    describe("with streaming RPC", () => {
      it("should trigger handler context signal", async () => {
        let handlerContextSignal: AbortSignal | undefined;
        const { handler, service, method } = setupTestHandler(
          testService.method.serverStreaming,
          {},
          // eslint-disable-next-line require-yield
          async function* (req, ctx) {
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
          url: `https://example.com/${service.typeName}/${method.name}`,
          header: requestHeader(
            method.methodKind,
            true,
            undefined,
            undefined,
            true,
          ),
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

  describe("GET requests", () => {
    it("should be accepted for eligible RPC", async () => {
      const { handler, service, method } = setupTestHandler(
        testService.method.unaryNoSideEffects,
        {},
        // eslint-disable-next-line @typescript-eslint/require-await
        async (req, ctx) => {
          assert.strictEqual(ctx.requestMethod, "GET");
          assert.strictEqual(ctx.protocolName, "connect");
          return { value: "abc" };
        },
      );
      const res = await handler({
        httpVersion: "2.0",
        method: "GET",
        url: `https://example.com/${service.typeName}/${method.name}?connect=v1&encoding=proto&base64=1&message=CHs`,
        header: new Headers(),
        body: createAsyncIterable([]),
        signal: new AbortController().signal,
      });
      assert.strictEqual(res.status, 200);
    });
  });

  describe("receiving a new JSON field in a request", () => {
    const OldService = createServiceDesc({
      typeName: "Service",
      method: {
        unary: {
          input: ApiSchema,
          output: StringValueSchema,
          methodKind: "unary",
        },
      },
    });
    const NewService = createServiceDesc({
      typeName: "Service",
      method: {
        unary: {
          input: MethodSchema,
          output: StringValueSchema,
          methodKind: "unary",
        },
      },
    });

    function setupTestHandler(opt: Partial<UniversalHandlerOptions>) {
      const h = createHandlerFactory(opt)(
        createMethodImplSpec(OldService.method.unary, () => {
          return create(StringValueSchema, { value: "server ok" });
        }),
      );
      const t = createTransport({
        httpClient: createUniversalHandlerClient([h]),
        baseUrl: "https://example.com",
        readMaxBytes: 0xffffff,
        writeMaxBytes: 0xffffff,
        compressMinBytes: 0xffffff,
        useBinaryFormat: false,
        interceptors: [],
        acceptCompression: [],
        sendCompression: null,
      });
      return {
        handler: h,
        transport: t,
      };
    }

    it("should ignore unknown field by default", async () => {
      const { transport } = setupTestHandler({
        jsonOptions: {},
      });
      const res = await transport.unary(
        NewService.method.unary,
        undefined,
        undefined,
        undefined,
        create(NewService.method.unary.input, {
          name: "A",
          responseStreaming: true,
        }),
      );
      assert.ok(isMessage(res.message, StringValueSchema));
    });
    it("should reject unknown field if explicitly asked for", async () => {
      const { transport } = setupTestHandler({
        jsonOptions: {
          ignoreUnknownFields: false,
        },
      });
      await assert.rejects(
        transport.unary(
          NewService.method.unary,
          undefined,
          undefined,
          undefined,
          create(NewService.method.unary.input, {
            name: "A",
            responseStreaming: true,
          }),
        ),
        (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(
            e.message,
            '[invalid_argument] cannot decode message google.protobuf.Api from JSON: key "responseStreaming" is unknown',
          );
          return true;
        },
      );
    });
  });
});
