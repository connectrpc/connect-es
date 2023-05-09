// Copyright 2021-2023 Buf Technologies, Inc.
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

import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";
import { Int32Value, MethodKind, StringValue } from "@bufbuild/protobuf";
import type { MethodImpl } from "../implementation.js";
import { createMethodImplSpec } from "../implementation.js";
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
import { findTrailerError } from "./trailer-status.js";
import { Code } from "../code.js";

describe("createHandlerFactory()", function () {
  const testService = {
    typeName: "TestService",
    methods: {
      foo: {
        name: "Foo",
        I: Int32Value,
        O: StringValue,
        kind: MethodKind.Unary,
      },
      bar: {
        name: "Bar",
        I: Int32Value,
        O: StringValue,
        kind: MethodKind.ServerStreaming,
      },
    },
  } satisfies ServiceType;
  function setupTestHandler<M extends MethodInfo>(
    method: M,
    opt: Partial<UniversalHandlerOptions>,
    impl: MethodImpl<M>
  ) {
    const h = createHandlerFactory(opt)(
      createMethodImplSpec(testService, method, impl)
    );
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
    it("should surface headers for unary", async function () {
      const { transport, service, method } = setupTestHandler(
        testService.methods.foo,
        {},
        (req, ctx) => {
          ctx.responseHeader.set("implementation-called", "yes");
          return { value: req.value.toString(10) };
        }
      );
      const r = await transport.unary(
        service,
        method,
        undefined,
        undefined,
        undefined,
        new Int32Value({ value: 123 })
      );
      expect(r.header.get("implementation-called")).toBe("yes");
      expect(r.message.value).toBe("123");
    });

    it("should surface headers for server-streaming", async function () {
      const { transport, service, method } = setupTestHandler(
        testService.methods.bar,
        {},
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (req, ctx) {
          ctx.responseHeader.set("implementation-called", "yes");
          yield { value: req.value.toString(10) };
        }
      );
      const r = await transport.stream(
        service,
        method,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([new Int32Value({ value: 123 })])
      );
      expect(r.header.get("implementation-called")).toBe("yes");
      const all = await pipeTo(r.message, sinkAll());
      expect(all.length).toBe(1);
      expect(all[0].value).toBe("123");
    });
  });

  describe("deadlines", function () {
    it("should raise an error with code DEADLINE_EXCEEDED if exceeded", async function () {
      const timeoutMs = 1;
      const { handler, service, method } = setupTestHandler(
        testService.methods.foo,
        {},
        async (req, ctx) => {
          await new Promise((r) => setTimeout(r, timeoutMs + 50));
          ctx.signal.throwIfAborted();
          return { value: req.value.toString(10) };
        }
      );
      const res = await handler({
        httpVersion: "2.0",
        method: "POST",
        url: new URL(`https://example.com/${service.typeName}/${method.name}`),
        header: requestHeader(true, timeoutMs, undefined),
        body: createAsyncIterable([encodeEnvelope(0, new Uint8Array(0))]),
        signal: new AbortController().signal,
      });
      expect(res.status).toBe(200);
      if (res.body instanceof Uint8Array) {
        for await (const b of res.body) {
          expect(b).toBeDefined();
        }
      }
      const err = findTrailerError(new Headers(res.trailer));
      expect(err?.code).toBe(Code.DeadlineExceeded);
      expect(err?.message).toBe("[deadline_exceeded] the operation timed out");
    });
  });
});
