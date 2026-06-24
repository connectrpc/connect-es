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
import { create, isMessage, toBinary } from "@bufbuild/protobuf";
import type {
  UniversalClientFn,
  UniversalClientRequest,
  UniversalClientResponse,
} from "../protocol/universal.js";
import type { Compression } from "../protocol/index.js";
import {
  createAsyncIterable,
  readAllBytes,
} from "../protocol/async-iterable.js";
import { ConnectError } from "../connect-error.js";
import { createTransport } from "./transport.js";
import { encodeEnvelope } from "../protocol/envelope.js";
import { createEndStreamSerialization, endStreamFlag } from "./end-stream.js";
import { Code } from "../code.js";
import {
  contentTypeStreamProto,
  contentTypeUnaryJson,
  contentTypeUnaryProto,
} from "./content-type.js";
import { errorToJsonBytes } from "./error-json.js";
import { createHandlerFactory } from "./handler-factory.js";
import { createMethodImplSpec } from "../implementation.js";
import { createUniversalHandlerClient } from "../protocol/index.js";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import type { StringValue } from "@bufbuild/protobuf/wkt";
import {
  ApiSchema,
  Int32ValueSchema,
  MethodOptions_IdempotencyLevel,
  MethodSchema,
  StringValueSchema,
} from "@bufbuild/protobuf/wkt";

const TestService = createServiceDesc({
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

describe("Connect transport", () => {
  const defaultTransportOptions = {
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
    describe("for unary", () => {
      let httpRequestAborted = false;
      const getUnaryTransport = (opts: { contentType: string }) => {
        return createTransport({
          httpClient(
            request: UniversalClientRequest,
          ): Promise<UniversalClientResponse> {
            request.signal?.addEventListener("abort", () => {
              httpRequestAborted = true;
            });
            return Promise.resolve({
              status: 429,
              header: new Headers({
                "Content-Type": opts.contentType,
              }),
              body: createAsyncIterable([
                errorToJsonBytes(
                  new ConnectError("foo", Code.ResourceExhausted),
                  {},
                ),
              ]),
              trailer: new Headers(),
            });
          },
          ...defaultTransportOptions,
        });
      };
      it("should cancel the HTTP request and not parse the body", async () => {
        const t = getUnaryTransport({ contentType: contentTypeUnaryProto });
        await assert.rejects(
          t.unary(
            TestService.method.unary,
            undefined,
            undefined,
            undefined,
            {},
          ),
          (e) => {
            assert.ok(e instanceof ConnectError);
            // Body should not be parsed because the Content-Type response header is not application/json
            assert.strictEqual(e.code, Code.Unavailable);
            assert.strictEqual(
              e.message,
              "[unavailable] HTTP 429",
            );
            return true;
          },
        );
        assert.ok(httpRequestAborted);
      });
      it("should cancel the HTTP request and parse the body", async () => {
        const t = getUnaryTransport({ contentType: contentTypeUnaryJson });
        await assert.rejects(
          t.unary(
            TestService.method.unary,
            undefined,
            undefined,
            undefined,
            {},
          ),
          (e) => {
            assert.ok(e instanceof ConnectError);
            // Body should be parsed because the Content-Type response header is application/json
            assert.strictEqual(
              e.code,
              Code.ResourceExhausted,
            );
            assert.strictEqual(
              e.message,
              "[resource_exhausted] foo",
            );
            return true;
          },
        );
        assert.ok(httpRequestAborted);
      });
    });
    describe("for server-streaming", () => {
      let httpRequestAborted = false;
      const t = createTransport({
        httpClient(
          request: UniversalClientRequest,
        ): Promise<UniversalClientResponse> {
          request.signal?.addEventListener("abort", () => {
            httpRequestAborted = true;
          });
          return Promise.resolve({
            status: 200,
            header: new Headers({
              "Content-Type": contentTypeStreamProto,
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
                endStreamFlag,
                createEndStreamSerialization({}).serialize({
                  metadata: new Headers(),
                  error: new ConnectError("foo", Code.ResourceExhausted),
                }),
              ),
            ]),
            trailer: new Headers(),
          });
        },
        ...defaultTransportOptions,
      });
      it("should cancel the HTTP request", async () => {
        const res = await t.stream(
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
            assert.strictEqual(
              e.message,
              "[resource_exhausted] foo",
            );
            return true;
          },
        );
        assert.strictEqual(messagesReceived.length, 1);
        assert.ok(httpRequestAborted);
      });
    });
  });

  describe("useHttpGet", () => {
    const httpClientResponse: UniversalClientResponse = {
      status: 200,
      header: new Headers({
        "Content-Type": contentTypeUnaryProto,
      }),
      body: createAsyncIterable([
        toBinary(
          StringValueSchema,
          create(StringValueSchema, { value: "abc" }),
        ),
      ]),
      trailer: new Headers(),
    };
    // eslint-disable-next-line @typescript-eslint/require-await
    const expectGet: UniversalClientFn = async (request) => {
      assert.strictEqual(request.method, "GET");
      assert.strictEqual(
        request.url,
        "http://example.com/TestService/UnaryNoSideEffects?connect=v1&base64=1&encoding=proto&message=CHs",
      );
      // no headers
      const headerFields: string[] = [];
      request.header.forEach((_, key) => headerFields.push(key));
      assert.deepStrictEqual(headerFields, ["user-agent"]);
      // no body
      assert.strictEqual(request.body, undefined);
      return httpClientResponse;
    };
    const expectPost: UniversalClientFn = async (request) => {
      assert.strictEqual(request.method, "POST");
      assert.strictEqual(new URL(request.url).search, "");
      assert.notStrictEqual(request.body, undefined);
      if (request.body !== undefined) {
        const body = await readAllBytes(request.body, Number.MAX_SAFE_INTEGER);
        assert.ok(body.byteLength > 0);
      }
      return httpClientResponse;
    };
    describe("disabled", () => {
      it("should issue POST for eligible RPC", async () => {
        const t = createTransport({
          ...defaultTransportOptions,
          httpClient: expectPost,
        });
        await t.unary(
          TestService.method.unaryNoSideEffects,
          undefined,
          undefined,
          undefined,
          create(Int32ValueSchema, { value: 123 }),
        );
      });
    });
    describe("enabled", () => {
      it("should issue GET for eligible RPC", async () => {
        const t = createTransport({
          ...defaultTransportOptions,
          useHttpGet: true,
          httpClient: expectGet,
        });
        await t.unary(
          TestService.method.unaryNoSideEffects,
          undefined,
          undefined,
          undefined,
          create(Int32ValueSchema, { value: 123 }),
        );
      });
      it("should order all five query parameters per the Query-Get rule when compression is enabled", async () => {
        const identityGzip: Compression = {
          name: "gzip",
          compress: (bytes) => Promise.resolve(new Uint8Array(bytes)),
          decompress: (bytes) => Promise.resolve(new Uint8Array(bytes)),
        };
        // eslint-disable-next-line @typescript-eslint/require-await
        const expectGetWithCompression: UniversalClientFn = async (request) => {
          assert.strictEqual(request.method, "GET");
          assert.strictEqual(
            request.url,
            "http://example.com/TestService/UnaryNoSideEffects?connect=v1&base64=1&compression=gzip&encoding=proto&message=CHs",
          );
          return httpClientResponse;
        };
        const t = createTransport({
          ...defaultTransportOptions,
          useHttpGet: true,
          sendCompression: identityGzip,
          httpClient: expectGetWithCompression,
        });
        await t.unary(
          TestService.method.unaryNoSideEffects,
          undefined,
          undefined,
          undefined,
          create(Int32ValueSchema, { value: 123 }),
        );
      });
      it("should issue POST for RPC with side effects", async () => {
        const t = createTransport({
          ...defaultTransportOptions,
          useHttpGet: true,
          httpClient: expectPost,
        });
        await t.unary(
          TestService.method.unary,
          undefined,
          undefined,
          undefined,
          create(Int32ValueSchema, { value: 123 }),
        );
      });
    });
  });

  describe("against server with new JSON field in response", () => {
    const OldService = createServiceDesc({
      typeName: "Service",
      method: {
        unary: {
          input: StringValueSchema,
          output: ApiSchema,
          methodKind: "unary",
        },
      },
    });
    const NewService = createServiceDesc({
      typeName: "Service",
      method: {
        unary: {
          input: StringValueSchema,
          output: MethodSchema,
          methodKind: "unary",
        },
      },
    });

    const h = createHandlerFactory({})(
      createMethodImplSpec(NewService.method.unary, () => {
        return create(MethodSchema, {
          name: "A",
          responseStreaming: true,
        });
      }),
    );
    const httpClient = createUniversalHandlerClient([h]);

    it("should ignore unknown field by default", async () => {
      const t = createTransport({
        ...defaultTransportOptions,
        httpClient,
        useBinaryFormat: false,
      });
      const res = await t.unary(
        OldService.method.unary,
        undefined,
        undefined,
        undefined,
        {},
      );
      assert.strictEqual(
        isMessage(res.message, OldService.method.unary.output),
        true,
      );
    });
    it("should reject unknown field if explicitly asked for", async () => {
      const t = createTransport({
        ...defaultTransportOptions,
        httpClient,
        useBinaryFormat: false,
        jsonOptions: { ignoreUnknownFields: false },
      });
      await assert.rejects(
        t.unary(OldService.method.unary, undefined, undefined, undefined, {}),
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

  describe("special handling of set-cookie", () => {
    // Special handling of set-cookie is available since Node.js v22.0.0, v20.0.0, and v18.14.1.
    // eslint-disable-next-line @typescript-eslint/require-await
    const setMultiValueHeaders: UniversalClientFn = async () => {
      return {
        status: 200,
        header: new Headers({
          "Content-Type": contentTypeUnaryProto,
          "set-cookie": "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
          "Set-Cookie": "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        }),
        body: createAsyncIterable([]),
        trailer: new Headers(),
      };
    };
    it("should produce the correct array of values in the response", async () => {
      const t = createTransport({
        ...defaultTransportOptions,
        httpClient: setMultiValueHeaders,
      });
      const res = await t.unary(
        TestService.method.unary,
        undefined,
        undefined,
        undefined,
        {},
      );
      assert.deepStrictEqual(res.header.getSetCookie(), [
        "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
      ]);
    });
  });
});
