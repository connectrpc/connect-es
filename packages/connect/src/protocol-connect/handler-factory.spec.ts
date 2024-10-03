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

describe("createHandlerFactory()", function () {
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

  describe("returned handler", function () {
    it("should allow POST for unary RPC", function () {
      const { handler } = setupTestHandler(testService.method.unary, {}, () =>
        Promise.reject(),
      );
      expect(handler.allowedMethods).toEqual(["POST"]);
      expect(handler.protocolNames).toEqual(["connect"]);
    });
    it("should allow GET,POST for eligible RPC", function () {
      const { handler } = setupTestHandler(
        testService.method.unaryNoSideEffects,
        {},
        () => Promise.reject(),
      );
      expect(handler.allowedMethods).toEqual(["POST", "GET"]);
      expect(handler.protocolNames).toEqual(["connect"]);
    });
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
      expect(res.body).toBeDefined();
      const it = res.body![Symbol.asyncIterator]();
      await it.next();
      const writeError = new Error("write error");
      await it.throw?.(writeError).catch(() => {});
      await expectAsync(catchError).toBeResolvedTo(writeError);
      await expectAsync(abortCalled).toBeResolved();
    });
  });

  describe("requireConnectProtocolHeader", function () {
    describe("with unary RPC", function () {
      const { handler } = setupTestHandler(
        testService.method.unary,
        { requireConnectProtocolHeader: true },
        (req) => ({ value: req.value.toString(10) }),
      );
      it("should raise error for missing header", async function () {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: "https://example.com",
          header: new Headers({ "Content-Type": "application/json" }),
          body: 777,
          signal: new AbortController().signal,
        });
        expect(res.status).toBe(400);
        expect(res.body).toBeDefined();
        if (res.body !== undefined) {
          const body = await readAll(res.body);
          expect(body.length).toBe(1);
          const err = errorFromJsonBytes(
            body[0],
            undefined,
            new ConnectError("failed to parse connect err", Code.Internal),
          );
          expect(err.message).toBe(
            '[invalid_argument] missing required header: set Connect-Protocol-Version to "1"',
          );
        }
      });
      it("should raise error for wrong header", async function () {
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
        expect(res.status).toBe(400);
        expect(res.body).toBeDefined();
        if (res.body !== undefined) {
          const body = await readAll(res.body);
          expect(body.length).toBe(1);
          const err = errorFromJsonBytes(
            body[0],
            undefined,
            new ConnectError("failed to parse connect err", Code.Internal),
          );
          expect(err.message).toBe(
            '[invalid_argument] Connect-Protocol-Version must be "1": got "UNEXPECTED"',
          );
        }
      });
    });
    describe("with streaming RPC", function () {
      const { handler } = setupTestHandler(
        testService.method.serverStreaming,
        { requireConnectProtocolHeader: true },
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (req) {
          yield { value: req.value.toString(10) };
        },
      );
      it("should raise error for missing header", async function () {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: "https://example.com",
          header: new Headers({ "Content-Type": "application/connect+json" }),
          body: createAsyncIterable([new Uint8Array()]),
          signal: new AbortController().signal,
        });
        expect(res.status).toBe(200);
        expect(res.body).not.toBeInstanceOf(Uint8Array);
        expect(res.body).not.toBeUndefined();
        if (res.body !== undefined && Symbol.asyncIterator in res.body) {
          const end = endStreamFromJson(
            (await readAllBytes(res.body, Number.MAX_SAFE_INTEGER)).slice(5),
          );
          expect(end.error?.message).toBe(
            '[invalid_argument] missing required header: set Connect-Protocol-Version to "1"',
          );
        }
      });
      it("should raise error for wrong header", async function () {
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
        expect(res.status).toBe(200);
        expect(res.body).not.toBeInstanceOf(Uint8Array);
        expect(res.body).not.toBeUndefined();
        if (res.body !== undefined && Symbol.asyncIterator in res.body) {
          const end = endStreamFromJson(
            (await readAllBytes(res.body, Number.MAX_SAFE_INTEGER)).slice(5),
          );
          expect(end.error?.message).toBe(
            '[invalid_argument] Connect-Protocol-Version must be "1": got "UNEXPECTED"',
          );
        }
      });
    });
  });

  describe("deadlines", function () {
    describe("with unary RPC", function () {
      it("should raise an error with code DEADLINE_EXCEEDED if exceeded", async function () {
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
        expect(res.status).toBe(504);
        expect(res.body).toBeDefined();
        if (res.body !== undefined) {
          const err = errorFromJsonBytes(
            await readAllBytes(res.body, Number.MAX_SAFE_INTEGER),
            undefined,
            new ConnectError("error parse failed"),
          );
          expect(err.code).toBe(Code.DeadlineExceeded);
          expect(err.message).toBe(
            "[deadline_exceeded] the operation timed out",
          );
        }
      });
    });
    describe("with streaming RPC", function () {
      async function getLastEnvelope(res: UniversalServerResponse) {
        expect(res.body).toBeDefined();
        expect(res.body).not.toBeInstanceOf(Uint8Array);
        if (res.body !== undefined && Symbol.asyncIterator in res.body) {
          const envelopes = await pipeTo(
            res.body,
            transformSplitEnvelope(0xffffff),
            sinkAll(),
          );
          const last = envelopes.pop();
          expect(last).toBeDefined();
          return last;
        }
        return undefined;
      }

      it("should raise an error with code DEADLINE_EXCEEDED if exceeded", async function () {
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
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        if (res.body !== undefined) {
          const lastEnv = await getLastEnvelope(res);
          if (lastEnv !== undefined) {
            const end = endStreamFromJson(lastEnv.data);
            expect(end.error?.code).toBe(Code.DeadlineExceeded);
            expect(end.error?.message).toBe(
              "[deadline_exceeded] the operation timed out",
            );
          }
        }
      });
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
    describe("with unary RPC", function () {
      it("should trigger handler context signal", async function () {
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
        expect(handlerContextSignal).toBeDefined();
        expect(handlerContextSignal?.aborted).toBeTrue();
        expect(handlerContextSignal?.reason).toBe("test-reason");
      });
    });
    describe("with streaming RPC", function () {
      it("should trigger handler context signal", async function () {
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
        expect(handlerContextSignal).toBeDefined();
        expect(handlerContextSignal?.aborted).toBeTrue();
        expect(handlerContextSignal?.reason).toBe("test-reason");
      });
    });
  });

  describe("GET requests", function () {
    it("should be accepted for eligible RPC", async function () {
      const { handler, service, method } = setupTestHandler(
        testService.method.unaryNoSideEffects,
        {},
        // eslint-disable-next-line @typescript-eslint/require-await
        async (req, ctx) => {
          expect(ctx.requestMethod).toBe("GET");
          expect(ctx.protocolName).toBe("connect");
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
      expect(res.status).toBe(200);
    });
  });

  describe("receiving a new JSON field in a request", function () {
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

    it("should ignore unknown field by default", async function () {
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
      expect(isMessage(res.message, StringValueSchema)).toBeTrue();
    });
    it("should reject unknown field if explicitly asked for", async function () {
      const { transport } = setupTestHandler({
        jsonOptions: {
          ignoreUnknownFields: false,
        },
      });
      try {
        await transport.unary(
          NewService.method.unary,
          undefined,
          undefined,
          undefined,
          create(NewService.method.unary.input, {
            name: "A",
            responseStreaming: true,
          }),
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          '[invalid_argument] cannot decode message google.protobuf.Api from JSON: key "responseStreaming" is unknown',
        );
      }
    });
  });
});
