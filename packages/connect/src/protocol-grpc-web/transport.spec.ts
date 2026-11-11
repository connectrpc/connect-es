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

import { describe, it, beforeEach } from "node:test";
import * as assert from "node:assert";
import { create, toBinary } from "@bufbuild/protobuf";
import type { Transport } from "../transport.js";
import { createTransport } from "./transport.js";
import type {
  UniversalClientRequest,
  UniversalClientResponse,
} from "../protocol/index.js";
import { createAsyncIterable, encodeEnvelope } from "../protocol/index.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { trailerFlag, trailerSerialize } from "./trailer.js";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";
import type { StringValue } from "@bufbuild/protobuf/wkt";

const TestService = createServiceDesc({
  typeName: "TestService",
  method: {
    unary: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "unary",
    },
    server: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "server_streaming",
    },
    client: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "client_streaming",
    },
    biDi: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "bidi_streaming",
    },
  },
});

describe("gRPC-web transport", () => {
  const defaultOptions = {
    baseUrl: "http://example.com",
    interceptors: [],
    acceptCompression: [],
    compressMinBytes: 0,
    readMaxBytes: 0xffffff,
    sendCompression: null,
    useBinaryFormat: true,
    writeMaxBytes: 0xffffff,
  };
  describe("against server responding with an error", () => {
    let httpRequestAborted = false;
    let transport: Transport = null as unknown as Transport;
    beforeEach(() => {
      httpRequestAborted = false;
      transport = createTransport({
        httpClient(
          request: UniversalClientRequest,
        ): Promise<UniversalClientResponse> {
          request.signal?.addEventListener("abort", () => {
            httpRequestAborted = true;
          });
          return Promise.resolve({
            status: 200,
            header: new Headers({
              "Content-Type": "application/grpc-web+proto",
            }),
            body: createAsyncIterable([
              encodeEnvelope(
                0,
                toBinary(
                  StringValueSchema,
                  create(StringValueSchema, { value: "abc" }),
                ),
              ),
              encodeEnvelope(
                trailerFlag,
                trailerSerialize(
                  new Headers({
                    "grpc-status": Code.ResourceExhausted.toString(),
                    "grpc-message": "foo",
                  }),
                ),
              ),
            ]),
            trailer: new Headers(),
          });
        },
        ...defaultOptions,
      });
    });
    it("should cancel the HTTP request for unary", async () => {
      await assert.rejects(
        transport.unary(
          TestService.method.unary,
          undefined,
          undefined,
          undefined,
          {},
        ),
        (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(e.message, "[resource_exhausted] foo");
          return true;
        },
      );
      assert.ok(httpRequestAborted);
    });
    it("should cancel the HTTP request for server-streaming", async () => {
      const res = await transport.stream(
        TestService.method.server,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([]),
      );
      const messagesReceived: StringValue[] = [];
      await assert.rejects(
        (async () => {
          for await (const m of res.message) {
            messagesReceived.push(m);
          }
        })(),
        (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(e.message, "[resource_exhausted] foo");
          return true;
        },
      );
      assert.strictEqual(messagesReceived.length, 1);
      assert.ok(httpRequestAborted);
    });
  });
  describe("stream response trailers", () => {
    function streamWithResponse(header: Headers, body: Uint8Array[]) {
      const transport = createTransport({
        httpClient(): Promise<UniversalClientResponse> {
          return Promise.resolve({
            status: 200,
            header,
            body: createAsyncIterable(body),
            trailer: new Headers(),
          });
        },
        ...defaultOptions,
      });
      return transport.stream(
        TestService.method.biDi,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([]),
      );
    }
    async function drain(iterable: AsyncIterable<unknown>) {
      const messages: unknown[] = [];
      for await (const m of iterable) {
        messages.push(m);
      }
      return messages;
    }
    it("should populate trailers from headers of a successful trailers-only response", async () => {
      const res = await streamWithResponse(
        new Headers({
          "Content-Type": "application/grpc-web+proto",
          "grpc-status": "0",
          "x-custom-header": "foo",
          "x-custom-trailer": "bar",
        }),
        [],
      );
      assert.deepStrictEqual(await drain(res.message), []);
      assert.strictEqual(res.header.get("x-custom-header"), "foo");
      assert.strictEqual(res.header.get("x-custom-trailer"), "bar");
      assert.strictEqual(res.trailer.get("grpc-status"), "0");
      assert.strictEqual(res.trailer.get("x-custom-header"), "foo");
      assert.strictEqual(res.trailer.get("x-custom-trailer"), "bar");
    });
    it("should reject a trailers-only response with a body", async () => {
      const res = await streamWithResponse(
        new Headers({
          "Content-Type": "application/grpc-web+proto",
          "grpc-status": "0",
          "x-custom-trailer": "bar",
        }),
        [
          encodeEnvelope(
            0,
            toBinary(
              StringValueSchema,
              create(StringValueSchema, { value: "abc" }),
            ),
          ),
        ],
      );
      await assert.rejects(drain(res.message), (e) => {
        assert.ok(e instanceof ConnectError);
        assert.strictEqual(e.code, Code.InvalidArgument);
        assert.strictEqual(
          e.rawMessage,
          "protocol error: extra data for trailers-only",
        );
        return true;
      });
      assert.strictEqual(res.trailer.has("x-custom-trailer"), false);
    });
    it("should populate trailers only from the trailer envelope of a regular response", async () => {
      const res = await streamWithResponse(
        new Headers({
          "Content-Type": "application/grpc-web+proto",
          "x-custom-header": "foo",
        }),
        [
          encodeEnvelope(
            trailerFlag,
            trailerSerialize(
              new Headers({
                "grpc-status": "0",
                "x-custom-trailer": "bar",
              }),
            ),
          ),
        ],
      );
      assert.deepStrictEqual(await drain(res.message), []);
      assert.strictEqual(res.header.get("x-custom-header"), "foo");
      assert.strictEqual(res.trailer.get("x-custom-trailer"), "bar");
      assert.strictEqual(res.trailer.has("x-custom-header"), false);
    });
  });
});
