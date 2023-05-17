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
  MethodIdempotency,
  MethodKind,
  StringValue,
} from "@bufbuild/protobuf";
import type {
  UniversalClientFn,
  UniversalClientRequest,
  UniversalClientResponse,
} from "../protocol/universal.js";
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
  contentTypeUnaryProto,
} from "./content-type.js";
import type { Transport } from "../transport.js";
import { errorToJsonBytes } from "./error-json.js";

const TestService = {
  typeName: "TestService",
  methods: {
    unary: {
      name: "Unary",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.Unary,
    },
    unaryNoSideEffects: {
      name: "UnaryNoSideEffects",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    server: {
      name: "Server",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ServerStreaming,
    },
    client: {
      name: "Client",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ClientStreaming,
    },
    biDi: {
      name: "BiDi",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.BiDiStreaming,
    },
  },
} as const;

describe("Connect transport", function () {
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
  describe("against server responding with unexpected content type", function () {
    let httpRequestAborted = false;
    let transport: Transport = null as unknown as Transport;
    beforeEach(function () {
      httpRequestAborted = false;
      transport = createTransport({
        httpClient(
          request: UniversalClientRequest
        ): Promise<UniversalClientResponse> {
          request.signal?.addEventListener(
            "abort",
            () => (httpRequestAborted = true)
          );
          return Promise.resolve({
            status: 200,
            header: new Headers({
              "Content-Type": "application/csv",
            }),
            body: createAsyncIterable([]),
            trailer: new Headers(),
          });
        },
        ...defaultOptions,
      });
    });
    it("should cancel the HTTP request for unary", async function () {
      try {
        await transport.unary(
          TestService,
          TestService.methods.unary,
          undefined,
          undefined,
          undefined,
          {}
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          '[invalid_argument] unexpected response content type "application/csv"'
        );
      }
      expect(httpRequestAborted).toBeTrue();
    });
    it("should cancel the HTTP request for server-streaming", async function () {
      try {
        await transport.stream(
          TestService,
          TestService.methods.unary,
          undefined,
          undefined,
          undefined,
          createAsyncIterable([])
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          '[invalid_argument] unexpected response content type "application/csv"'
        );
      }
      expect(httpRequestAborted).toBeTrue();
    });
  });
  describe("against server responding with an error", function () {
    describe("for unary", function () {
      let httpRequestAborted = false;
      const t = createTransport({
        httpClient(
          request: UniversalClientRequest
        ): Promise<UniversalClientResponse> {
          request.signal?.addEventListener(
            "abort",
            () => (httpRequestAborted = true)
          );
          return Promise.resolve({
            status: 429,
            header: new Headers({
              "Content-Type": contentTypeUnaryProto,
            }),
            body: createAsyncIterable([
              errorToJsonBytes(
                new ConnectError("foo", Code.ResourceExhausted),
                {}
              ),
            ]),
            trailer: new Headers(),
          });
        },
        ...defaultOptions,
      });
      it("should cancel the HTTP request", async function () {
        try {
          await t.unary(
            TestService,
            TestService.methods.unary,
            undefined,
            undefined,
            undefined,
            {}
          );
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe("[resource_exhausted] foo");
        }
        expect(httpRequestAborted).toBeTrue();
      });
    });
    describe("for server-streaming", function () {
      let httpRequestAborted = false;
      const t = createTransport({
        httpClient(
          request: UniversalClientRequest
        ): Promise<UniversalClientResponse> {
          request.signal?.addEventListener(
            "abort",
            () => (httpRequestAborted = true)
          );
          return Promise.resolve({
            status: 200,
            header: new Headers({
              "Content-Type": contentTypeStreamProto,
            }),
            body: createAsyncIterable([
              encodeEnvelope(0, new StringValue({ value: "abc" }).toBinary()),
              encodeEnvelope(
                endStreamFlag,
                createEndStreamSerialization({}).serialize({
                  metadata: new Headers(),
                  error: new ConnectError("foo", Code.ResourceExhausted),
                })
              ),
            ]),
            trailer: new Headers(),
          });
        },
        ...defaultOptions,
      });
      it("should cancel the HTTP request", async function () {
        const res = await t.stream(
          TestService,
          TestService.methods.server,
          undefined,
          undefined,
          undefined,
          createAsyncIterable([])
        );
        const messagesReceived: StringValue[] = [];
        try {
          for await (const m of res.message) {
            messagesReceived.push(m);
          }
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe("[resource_exhausted] foo");
        }
        expect(messagesReceived.length).toBe(1);
        expect(httpRequestAborted).toBeTrue();
      });
    });
  });

  describe("useHttpGet", function () {
    const httpClientResponse: UniversalClientResponse = {
      status: 200,
      header: new Headers({
        "Content-Type": contentTypeUnaryProto,
      }),
      body: createAsyncIterable([new StringValue({ value: "abc" }).toBinary()]),
      trailer: new Headers(),
    };
    const expectGet: UniversalClientFn = async (request) => {
      expect(request.method).toBe("GET");
      expect(request.url).toBe(
        "http://example.com/TestService/UnaryNoSideEffects?connect=v1&encoding=proto&base64=1&message=CHs"
      );
      // no headers
      const headerFields: string[] = [];
      request.header.forEach((_, key) => headerFields.push(key));
      expect(headerFields).toEqual([]);
      // no body
      const body = await readAllBytes(request.body, Number.MAX_SAFE_INTEGER);
      expect(body.byteLength).toBe(0);
      return httpClientResponse;
    };
    const expectPost: UniversalClientFn = async (request) => {
      expect(request.method).toBe("POST");
      expect(new URL(request.url).search).toBe("");
      const body = await readAllBytes(request.body, Number.MAX_SAFE_INTEGER);
      expect(body.byteLength).toBeGreaterThan(0);
      return httpClientResponse;
    };
    describe("disabled", function () {
      it("should issue POST for eligible RPC", async function () {
        const t = createTransport({
          ...defaultOptions,
          httpClient: expectPost,
        });
        await t.unary(
          TestService,
          TestService.methods.unaryNoSideEffects,
          undefined,
          undefined,
          undefined,
          new Int32Value({ value: 123 })
        );
      });
    });
    describe("enabled", function () {
      it("should issue GET for eligible RPC", async function () {
        const t = createTransport({
          ...defaultOptions,
          useHttpGet: true,
          httpClient: expectGet,
        });
        await t.unary(
          TestService,
          TestService.methods.unaryNoSideEffects,
          undefined,
          undefined,
          undefined,
          new Int32Value({ value: 123 })
        );
      });
      it("should issue POST for RPC with side effects", async function () {
        const t = createTransport({
          ...defaultOptions,
          useHttpGet: true,
          httpClient: expectPost,
        });
        await t.unary(
          TestService,
          TestService.methods.unary,
          undefined,
          undefined,
          undefined,
          new Int32Value({ value: 123 })
        );
      });
    });
  });
});
