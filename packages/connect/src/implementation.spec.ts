// Copyright 2021-2025 The Connect Authors
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
      expect(ctx.signal).toBeDefined();
      expect(ctx.signal.aborted).toBeFalse();
    });
    it("should trigger on timeout", () => {
      const ctx = createHandlerContext({
        ...standardOptions,
        timeoutMs: 0,
      });
      expect(ctx.signal.aborted).toBeTrue();
      expect(String(ctx.signal.reason)).toBe(
        "ConnectError: [deadline_exceeded] the operation timed out",
      );
    });
    it("should trigger on request signal", () => {
      const ctx = createHandlerContext({
        ...standardOptions,
        requestSignal: AbortSignal.abort("request-signal"),
      });
      expect(ctx.signal.aborted).toBeTrue();
      expect(ctx.signal.reason).toBe("request-signal");
    });
    it("should trigger on shutdown signal", () => {
      const ctx = createHandlerContext({
        ...standardOptions,
        shutdownSignal: AbortSignal.abort("shutdown-signal"),
      });
      expect(ctx.signal.aborted).toBeTrue();
      expect(ctx.signal.reason).toBe("shutdown-signal");
    });
    it("should trigger on abort", () => {
      const ctx = createHandlerContext({ ...standardOptions });
      ctx.abort("test-reason");
      expect(ctx.signal.aborted).toBeTrue();
      expect(ctx.signal.reason).toBe("test-reason");
    });
  });

  describe("timeout()", () => {
    it("should return undefined without a timeout", () => {
      const ctx = createHandlerContext({ ...standardOptions });
      expect(ctx.timeoutMs()).toBeUndefined();
    });
    it("should return remaining timeout", () => {
      const ctx = createHandlerContext({
        ...standardOptions,
        timeoutMs: 1000,
      });
      expect(ctx.timeoutMs()).toBeDefined();
      expect(ctx.timeoutMs()).toBeLessThanOrEqual(1000);
      expect(ctx.timeoutMs()).toBeGreaterThanOrEqual(990);
    });
  });

  it("should surface passed service, method, protocolName, requestMethod", () => {
    const ctx = createHandlerContext({
      ...standardOptions,
    });
    expect(ctx.service).toBe(TestService);
    expect(ctx.method).toBe(TestService.method.unary);
    expect(ctx.protocolName).toBe("foo");
    expect(ctx.requestMethod).toBe("GET");
  });
  it("should surface passed headers and trailers", () => {
    const ctx = createHandlerContext({
      ...standardOptions,
      requestHeader: { foo: "request" },
      responseHeader: { foo: "response" },
      responseTrailer: { foo: "trailer" },
    });
    expect(ctx.requestHeader.get("foo")).toBe("request");
    expect(ctx.responseHeader.get("foo")).toBe("response");
    expect(ctx.responseTrailer.get("foo")).toBe("trailer");
  });
});
