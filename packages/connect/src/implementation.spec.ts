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
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";
import { createHandlerContext } from "./implementation.js";
import { createServiceDesc } from "./descriptor-helper.spec.js";

const TestService = createServiceDesc({
  typeName: "handwritten.TestService",
  method: {
    unary: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "unary",
    },
  },
});

describe("createHandlerContext()", () => {
  const standardOptions = {
    service: TestService,
    method: TestService.method.unary,
    protocolName: "foo",
    requestMethod: "GET",
    url: "https://example.com/foo",
  };

  describe("signal", () => {
    it("should have a default value", () => {
      const ctx = createHandlerContext({ ...standardOptions });
      assert.notStrictEqual(ctx.signal, undefined);
      assert.ok(!ctx.signal.aborted);
    });
    it("should trigger on timeout", () => {
      const ctx = createHandlerContext({
        ...standardOptions,
        timeoutMs: 0,
      });
      assert.ok(ctx.signal.aborted);
      assert.strictEqual(
        String(ctx.signal.reason),
        "ConnectError: [deadline_exceeded] the operation timed out",
      );
    });
    it("should trigger on request signal", () => {
      const ctx = createHandlerContext({
        ...standardOptions,
        requestSignal: AbortSignal.abort("request-signal"),
      });
      assert.ok(ctx.signal.aborted);
      assert.strictEqual(ctx.signal.reason, "request-signal");
    });
    it("should trigger on shutdown signal", () => {
      const ctx = createHandlerContext({
        ...standardOptions,
        shutdownSignal: AbortSignal.abort("shutdown-signal"),
      });
      assert.ok(ctx.signal.aborted);
      assert.strictEqual(ctx.signal.reason, "shutdown-signal");
    });
    it("should trigger on abort", () => {
      const ctx = createHandlerContext({ ...standardOptions });
      ctx.abort("test-reason");
      assert.ok(ctx.signal.aborted);
      assert.strictEqual(ctx.signal.reason, "test-reason");
    });
    it("should reuse a default AbortError reason when aborted without a reason", () => {
      const ctx1 = createHandlerContext({ ...standardOptions });
      const ctx2 = createHandlerContext({ ...standardOptions });
      ctx1.abort();
      ctx2.abort();
      assert.ok(ctx1.signal.aborted);
      assert.ok(ctx2.signal.aborted);
      assert.strictEqual(ctx1.signal.reason, ctx2.signal.reason);
      assert.ok(ctx1.signal.reason instanceof Error);
      assert.strictEqual(ctx1.signal.reason.name, "AbortError");
      assert.strictEqual(
        ctx1.signal.reason.message,
        "This operation was aborted",
      );
    });
    it("should preserve explicit falsy abort reasons and ignore subsequent aborts", () => {
      const ctxFalsy = createHandlerContext({ ...standardOptions });
      ctxFalsy.abort(null);
      assert.ok(ctxFalsy.signal.aborted);
      assert.strictEqual(ctxFalsy.signal.reason, null);

      const ctxFirst = createHandlerContext({ ...standardOptions });
      ctxFirst.abort("first-reason");
      ctxFirst.abort();
      assert.strictEqual(ctxFirst.signal.reason, "first-reason");
    });
  });

  describe("timeout()", () => {
    it("should return undefined without a timeout", () => {
      const ctx = createHandlerContext({ ...standardOptions });
      assert.strictEqual(ctx.timeoutMs(), undefined);
    });
    it("should return remaining timeout", (t) => {
      t.mock.timers.enable({ apis: ["Date", "setTimeout"] });
      const ctx = createHandlerContext({
        ...standardOptions,
        timeoutMs: 1000,
      });
      assert.strictEqual(ctx.timeoutMs(), 1000);
      t.mock.timers.tick(100);
      assert.strictEqual(ctx.timeoutMs(), 900);
    });
  });

  it("should surface passed service, method, protocolName, requestMethod", () => {
    const ctx = createHandlerContext({
      ...standardOptions,
    });
    assert.strictEqual(ctx.service, TestService);
    assert.strictEqual(ctx.method, TestService.method.unary);
    assert.strictEqual(ctx.protocolName, "foo");
    assert.strictEqual(ctx.requestMethod, "GET");
  });
  it("should surface passed headers and trailers", () => {
    const ctx = createHandlerContext({
      ...standardOptions,
      requestHeader: { foo: "request" },
      responseHeader: { foo: "response" },
      responseTrailer: { foo: "trailer" },
    });
    assert.strictEqual(ctx.requestHeader.get("foo"), "request");
    assert.strictEqual(ctx.responseHeader.get("foo"), "response");
    assert.strictEqual(ctx.responseTrailer.get("foo"), "trailer");
  });
});
