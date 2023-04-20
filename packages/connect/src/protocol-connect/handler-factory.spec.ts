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
import { createHandlerFactory } from "./handler-factory.js";
import type { MethodImpl } from "../implementation.js";
import { createMethodImplSpec } from "../implementation.js";
import type { UniversalHandlerOptions } from "../protocol/index.js";
import {
  createAsyncIterable,
  createUniversalHandlerClient,
  pipeTo,
  sinkAll,
} from "../protocol/index.js";
import { ConnectError } from "../connect-error.js";
import {
  createAsyncIterableBytes,
  readAllBytes,
} from "../protocol/async-iterable-helper.spec.js";
import { Code } from "../code.js";
import { errorFromJsonBytes } from "./error-json.js";
import { endStreamFromJson } from "./end-stream.js";
import { createTransport } from "./transport.js";

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

  describe("requireConnectProtocolHeader", function () {
    describe("with unary RPC", function () {
      const { handler } = setupTestHandler(
        testService.methods.foo,
        { requireConnectProtocolHeader: true },
        (req) => ({ value: req.value.toString(10) })
      );
      it("should raise error for missing header", async function () {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: new URL("https://example.com"),
          header: new Headers({ "Content-Type": "application/json" }),
          body: 777,
        });
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Uint8Array);
        if (res.body instanceof Uint8Array) {
          const err = errorFromJsonBytes(
            res.body,
            undefined,
            new ConnectError("failed to parse connect err", Code.Internal)
          );
          expect(err.message).toBe(
            '[invalid_argument] missing required header: set Connect-Protocol-Version to "1"'
          );
        }
      });
      it("should raise error for wrong header", async function () {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: new URL("https://example.com"),
          header: new Headers({
            "Content-Type": "application/json",
            "Connect-Protocol-Version": "UNEXPECTED",
          }),
          body: 777,
        });
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Uint8Array);
        if (res.body instanceof Uint8Array) {
          const err = errorFromJsonBytes(
            res.body,
            undefined,
            new ConnectError("failed to parse connect err", Code.Internal)
          );
          expect(err.message).toBe(
            '[invalid_argument] Connect-Protocol-Version must be "1": got "UNEXPECTED"'
          );
        }
      });
    });
    describe("with streaming RPC", function () {
      const { handler } = setupTestHandler(
        testService.methods.bar,
        { requireConnectProtocolHeader: true },
        // eslint-disable-next-line @typescript-eslint/require-await
        async function* (req) {
          yield { value: req.value.toString(10) };
        }
      );
      it("should raise error for missing header", async function () {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: new URL("https://example.com"),
          header: new Headers({ "Content-Type": "application/connect+json" }),
          body: createAsyncIterableBytes(new Uint8Array()),
        });
        expect(res.status).toBe(200);
        expect(res.body).not.toBeInstanceOf(Uint8Array);
        expect(res.body).not.toBeUndefined();
        if (res.body !== undefined && Symbol.asyncIterator in res.body) {
          const end = endStreamFromJson(
            (await readAllBytes(res.body)).slice(5)
          );
          expect(end.error?.message).toBe(
            '[invalid_argument] missing required header: set Connect-Protocol-Version to "1"'
          );
        }
      });
      it("should raise error for wrong header", async function () {
        const res = await handler({
          httpVersion: "1.1",
          method: "POST",
          url: new URL("https://example.com"),
          header: new Headers({
            "Content-Type": "application/connect+json",
            "Connect-Protocol-Version": "UNEXPECTED",
          }),
          body: createAsyncIterableBytes(new Uint8Array()),
        });
        expect(res.status).toBe(200);
        expect(res.body).not.toBeInstanceOf(Uint8Array);
        expect(res.body).not.toBeUndefined();
        if (res.body !== undefined && Symbol.asyncIterator in res.body) {
          const end = endStreamFromJson(
            (await readAllBytes(res.body)).slice(5)
          );
          expect(end.error?.message).toBe(
            '[invalid_argument] Connect-Protocol-Version must be "1": got "UNEXPECTED"'
          );
        }
      });
    });
  });
});
