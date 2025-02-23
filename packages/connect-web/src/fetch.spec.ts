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

import {
  ConformanceService,
  UnaryRequestSchema,
  UnaryResponseSchema,
} from "@connectrpc/connect-conformance";
import { createConnectTransport } from "./connect-transport.js";
import { createGrpcWebTransport } from "./grpc-web-transport.js";
import { create, toBinary, toJsonString } from "@bufbuild/protobuf";

describe("custom fetch", function () {
  let originFetch: typeof fetch;
  beforeEach(() => (originFetch = globalThis.fetch));
  afterEach(() => (globalThis.fetch = originFetch));

  describe("with Connect transport", () => {
    it("should only call Response#json with the JSON format", async function () {
      const response = new Response(
        toJsonString(UnaryResponseSchema, create(UnaryResponseSchema)),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      spyOn(response, "arrayBuffer").and.callThrough();
      spyOn(response, "json").and.callThrough();
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
      expect(response.json).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(response.arrayBuffer).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
    });
    it("should only call Response#arrayBuffer with the binary format on the happy path", async function () {
      const response = new Response(
        toBinary(UnaryResponseSchema, create(UnaryResponseSchema)),
        {
          headers: {
            "Content-Type": "application/proto",
          },
        },
      );
      spyOn(response, "arrayBuffer").and.callThrough();
      spyOn(response, "json").and.callThrough();
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
      expect(response.json).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
      expect(response.arrayBuffer).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
    });
    it("should call Response#json with the binary format for an error response", async function () {
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
      spyOn(response, "arrayBuffer").and.callThrough();
      spyOn(response, "json").and.callThrough();
      const transport = createConnectTransport({
        fetch: () => Promise.resolve(response),
        baseUrl: "https://example.com",
        useBinaryFormat: true,
      });
      await expectAsync(
        transport.unary(
          ConformanceService.method.unary,
          undefined,
          undefined,
          undefined,
          create(UnaryRequestSchema),
        ),
      ).toBeRejectedWithError(/\[permission_denied] foobar/);
      expect(response.json).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(response.arrayBuffer).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
    });
    it("should should defer resolving fetch until calling endpoint", async function () {
      const response = new Response(
        toJsonString(UnaryResponseSchema, create(UnaryResponseSchema)),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      spyOn(response, "arrayBuffer").and.callThrough();
      spyOn(response, "json").and.callThrough();
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
      expect(response.json).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(response.arrayBuffer).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
    });
  });
  describe("with gRPC-web transport", () => {
    it("should should defer resolving fetch until calling endpoint", async function () {
      const response = new Response(
        toJsonString(UnaryResponseSchema, create(UnaryResponseSchema)),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      spyOn(response, "arrayBuffer").and.callThrough();
      spyOn(response, "json").and.callThrough();
      const transport = createGrpcWebTransport({
        baseUrl: "https://example.com",
        useBinaryFormat: false,
      });
      // Patch globalThis.fetch to mimic a polyfill or patch
      globalThis.fetch = () =>
        Promise.reject("test-error-raised-from-patched-fetch");
      await expectAsync(
        transport.unary(
          ConformanceService.method.unary,
          undefined,
          undefined,
          undefined,
          create(UnaryRequestSchema),
        ),
      ).toBeRejectedWithError(/test-error-raised-from-patched-fetch/);
    });
  });
});
