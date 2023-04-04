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

import {
  Int32Value,
  Message,
  MethodKind,
  StringValue,
} from "@bufbuild/protobuf";
import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";
import { createHandlerFactory } from "./handler-factory.js";
import { createMethodImplSpec } from "../implementation.js";
import type { HandlerContext, MethodImpl } from "../implementation.js";
import type { UniversalHandlerOptions } from "../protocol/index.js";
import { errorFromJsonBytes } from "./error-json.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { endStreamFromJson } from "./end-stream.js";
import {
  createAsyncIterableBytes,
  readAllBytes,
} from "../protocol/async-iterable-helper.spec.js";

describe("createHandlerFactory()", function () {
  const testService: ServiceType = {
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
  } as const;

  function stub<M extends MethodInfo>(
    opt: {
      service?: ServiceType;
      method?: M;
      impl?: MethodImpl<M>;
    } & Partial<UniversalHandlerOptions>
  ) {
    const method = opt.method ?? testService.methods.foo;
    let implDefault: MethodImpl<M>;
    switch (method.kind) {
      case MethodKind.Unary:
        // eslint-disable-next-line @typescript-eslint/require-await
        implDefault = async function (req: Message, ctx: HandlerContext) {
          ctx.responseHeader.set("stub-handler", "1");
          return new ctx.method.O();
        } as unknown as MethodImpl<M>;
        break;
      case MethodKind.ServerStreaming:
        // eslint-disable-next-line @typescript-eslint/require-await
        implDefault = async function* (req: Message, ctx: HandlerContext) {
          ctx.responseHeader.set("stub-handler", "1");
          yield new ctx.method.O();
        } as unknown as MethodImpl<M>;
        break;
      case MethodKind.ClientStreaming:
      case MethodKind.BiDiStreaming:
        implDefault = function (
          // eslint-disable-next-line
          req: AsyncIterable<Message>,
          // eslint-disable-next-line
          ctx: HandlerContext
        ) {
          throw new Error("not implemented");
        } as unknown as MethodImpl<M>;
        break;
    }
    const spec = createMethodImplSpec(
      opt.service ?? testService,
      method,
      opt.impl ?? implDefault
    );
    const f = createHandlerFactory(opt);
    return f(spec);
  }

  describe("requireConnectProtocolHeader", function () {
    describe("with unary RPC", function () {
      const h = stub({ requireConnectProtocolHeader: true });
      it("should raise error for missing header", async function () {
        const res = await h({
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
        const res = await h({
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
      const h = stub({
        requireConnectProtocolHeader: true,
        method: testService.methods.bar,
      });
      it("should raise error for missing header", async function () {
        const res = await h({
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
        const res = await h({
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
