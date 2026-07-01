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

import { afterEach, beforeEach, describe, it, mock } from "node:test";
import * as assert from "node:assert";
import {
  ConformanceService,
  UnaryRequestSchema,
  UnaryResponseSchema,
} from "@connectrpc/connect-conformance";
import { createConnectTransport } from "./connect-transport.js";
import { createGrpcWebTransport } from "./grpc-web-transport.js";
import { create, toBinary, toJsonString } from "@bufbuild/protobuf";

describe("custom fetch", () => {
  let originFetch: typeof fetch;
  beforeEach(() => {
    originFetch = globalThis.fetch;
  });
  afterEach(() => {
    globalThis.fetch = originFetch;
  });

  describe("with Connect transport", () => {
    it("should only call Response#json with the JSON format", async () => {
      const response = new Response(
        toJsonString(UnaryResponseSchema, create(UnaryResponseSchema)),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const arrayBufferSpy = mock.method(response, "arrayBuffer");
      const jsonSpy = mock.method(response, "json");
      const transport = createConnectTransport({
        baseUrl: "https://example.com",
        fetch: () => Promise.resolve(response),
      });
      await transport.unary(
        ConformanceService.method.unary,
        undefined,
        undefined,
        undefined,
        create(UnaryRequestSchema),
      );
      assert.strictEqual(jsonSpy.mock.callCount(), 1);
      assert.strictEqual(arrayBufferSpy.mock.callCount(), 0);
    });
    it("should only call Response#arrayBuffer with the binary format on the happy path", async () => {
      const response = new Response(
        toBinary(UnaryResponseSchema, create(UnaryResponseSchema)),
        {
          headers: {
            "Content-Type": "application/proto",
          },
        },
      );
      const arrayBufferSpy = mock.method(response, "arrayBuffer");
      const jsonSpy = mock.method(response, "json");
      const transport = createConnectTransport({
        fetch: () => Promise.resolve(response),
        baseUrl: "https://example.com",
        useBinaryFormat: true,
      });
      await transport.unary(
        ConformanceService.method.unary,
        undefined,
        undefined,
        undefined,
        create(UnaryRequestSchema),
      );
      assert.strictEqual(jsonSpy.mock.callCount(), 0);
      assert.strictEqual(arrayBufferSpy.mock.callCount(), 1);
    });
    it("should call Response#json with the binary format for an error response", async () => {
      const response = new Response(
        JSON.stringify({
          code: "permission_denied",
          message: "foobar",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const arrayBufferSpy = mock.method(response, "arrayBuffer");
      const jsonSpy = mock.method(response, "json");
      const transport = createConnectTransport({
        fetch: () => Promise.resolve(response),
        baseUrl: "https://example.com",
        useBinaryFormat: true,
      });
      await assert.rejects(
        transport.unary(
          ConformanceService.method.unary,
          undefined,
          undefined,
          undefined,
          create(UnaryRequestSchema),
        ),
        /\[permission_denied] foobar/,
      );
      assert.strictEqual(jsonSpy.mock.callCount(), 1);
      assert.strictEqual(arrayBufferSpy.mock.callCount(), 0);
    });
    it("should should defer resolving fetch until calling endpoint", async () => {
      const response = new Response(
        toJsonString(UnaryResponseSchema, create(UnaryResponseSchema)),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const arrayBufferSpy = mock.method(response, "arrayBuffer");
      const jsonSpy = mock.method(response, "json");
      const transport = createConnectTransport({
        baseUrl: "https://example.com",
      });
      // Patch globalThis.fetch to mimic a polyfill or patch
      globalThis.fetch = () => Promise.resolve(response);
      await transport.unary(
        ConformanceService.method.unary,
        undefined,
        undefined,
        undefined,
        create(UnaryRequestSchema),
      );
      assert.strictEqual(jsonSpy.mock.callCount(), 1);
      assert.strictEqual(arrayBufferSpy.mock.callCount(), 0);
    });
  });
  describe("with gRPC-web transport", () => {
    it("should should defer resolving fetch until calling endpoint", async () => {
      const response = new Response(
        toJsonString(UnaryResponseSchema, create(UnaryResponseSchema)),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      mock.method(response, "arrayBuffer");
      mock.method(response, "json");
      const transport = createGrpcWebTransport({
        baseUrl: "https://example.com",
        useBinaryFormat: false,
      });
      // Patch globalThis.fetch to mimic a polyfill or patch
      globalThis.fetch = () =>
        Promise.reject("test-error-raised-from-patched-fetch");
      await assert.rejects(
        transport.unary(
          ConformanceService.method.unary,
          undefined,
          undefined,
          undefined,
          create(UnaryRequestSchema),
        ),
        /test-error-raised-from-patched-fetch/,
      );
    });
  });
});
