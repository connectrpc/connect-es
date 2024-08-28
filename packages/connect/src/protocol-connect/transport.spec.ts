// Copyright 2021-2024 The Connect Authors
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
  proto3,
  ScalarType,
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
  contentTypeUnaryJson,
  contentTypeUnaryProto,
} from "./content-type.js";
import { errorToJsonBytes } from "./error-json.js";
import { createHandlerFactory } from "./handler-factory.js";
import { createMethodImplSpec } from "../implementation.js";
import { createUniversalHandlerClient } from "../protocol/index.js";

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
  describe("against server responding with an error", function () {
    describe("for unary", function () {
      let httpRequestAborted = false;
      const getUnaryTransport = (opts: { contentType: string }) => {
        return createTransport({
          httpClient(
            request: UniversalClientRequest,
          ): Promise<UniversalClientResponse> {
            request.signal?.addEventListener(
              "abort",
              () => (httpRequestAborted = true),
            );
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
      it("should cancel the HTTP request and not parse the body", async function () {
        const t = getUnaryTransport({ contentType: contentTypeUnaryProto });
        try {
          await t.unary(
            TestService,
            TestService.methods.unary,
            undefined,
            undefined,
            undefined,
            {},
          );
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          // Body should not be parsed because the Content-Type response header is not application/json
          expect(ConnectError.from(e).code).toBe(Code.Unavailable);
          expect(ConnectError.from(e).message).toBe("[unavailable] HTTP 429");
        }
        expect(httpRequestAborted).toBeTrue();
      });
      it("should cancel the HTTP request and parse the body", async function () {
        const t = getUnaryTransport({ contentType: contentTypeUnaryJson });
        try {
          await t.unary(
            TestService,
            TestService.methods.unary,
            undefined,
            undefined,
            undefined,
            {},
          );
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          // Body should be parsed because the Content-Type response header is application/json
          expect(ConnectError.from(e).code).toBe(Code.ResourceExhausted);
          expect(ConnectError.from(e).message).toBe("[resource_exhausted] foo");
        }
        expect(httpRequestAborted).toBeTrue();
      });
    });
    describe("for server-streaming", function () {
      let httpRequestAborted = false;
      const t = createTransport({
        httpClient(
          request: UniversalClientRequest,
        ): Promise<UniversalClientResponse> {
          request.signal?.addEventListener(
            "abort",
            () => (httpRequestAborted = true),
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
                }),
              ),
            ]),
            trailer: new Headers(),
          });
        },
        ...defaultTransportOptions,
      });
      it("should cancel the HTTP request", async function () {
        const res = await t.stream(
          TestService,
          TestService.methods.server,
          undefined,
          undefined,
          undefined,
          createAsyncIterable([]),
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
    // eslint-disable-next-line @typescript-eslint/require-await
    const expectGet: UniversalClientFn = async (request) => {
      expect(request.method).toBe("GET");
      expect(request.url).toBe(
        "http://example.com/TestService/UnaryNoSideEffects?connect=v1&encoding=proto&base64=1&message=CHs",
      );
      // no headers
      const headerFields: string[] = [];
      request.header.forEach((_, key) => headerFields.push(key));
      expect(headerFields).toEqual(["user-agent"]);
      // no body
      expect(request.body).toBeUndefined();
      return httpClientResponse;
    };
    const expectPost: UniversalClientFn = async (request) => {
      expect(request.method).toBe("POST");
      expect(new URL(request.url).search).toBe("");
      expect(request.body).toBeDefined();
      if (request.body !== undefined) {
        const body = await readAllBytes(request.body, Number.MAX_SAFE_INTEGER);
        expect(body.byteLength).toBeGreaterThan(0);
      }
      return httpClientResponse;
    };
    describe("disabled", function () {
      it("should issue POST for eligible RPC", async function () {
        const t = createTransport({
          ...defaultTransportOptions,
          httpClient: expectPost,
        });
        await t.unary(
          TestService,
          TestService.methods.unaryNoSideEffects,
          undefined,
          undefined,
          undefined,
          new Int32Value({ value: 123 }),
        );
      });
    });
    describe("enabled", function () {
      it("should issue GET for eligible RPC", async function () {
        const t = createTransport({
          ...defaultTransportOptions,
          useHttpGet: true,
          httpClient: expectGet,
        });
        await t.unary(
          TestService,
          TestService.methods.unaryNoSideEffects,
          undefined,
          undefined,
          undefined,
          new Int32Value({ value: 123 }),
        );
      });
      it("should issue POST for RPC with side effects", async function () {
        const t = createTransport({
          ...defaultTransportOptions,
          useHttpGet: true,
          httpClient: expectPost,
        });
        await t.unary(
          TestService,
          TestService.methods.unary,
          undefined,
          undefined,
          undefined,
          new Int32Value({ value: 123 }),
        );
      });
    });
  });

  describe("against server with new JSON field in response", function () {
    const OldService = {
      typeName: "OldService",
      methods: {
        unary: {
          name: "Unary",
          I: StringValue,
          O: proto3.makeMessageType("TestMessage", [
            { no: 1, name: "a", kind: "scalar", T: ScalarType.STRING },
          ]),
          kind: MethodKind.Unary,
        },
      },
    } as const;
    const NewService = {
      typeName: "OldService",
      methods: {
        unary: {
          name: "Unary",
          I: StringValue,
          O: proto3.makeMessageType("TestMessage", [
            { no: 1, name: "a", kind: "scalar", T: ScalarType.STRING },
            { no: 2, name: "b", kind: "scalar", T: ScalarType.STRING },
          ]),
          kind: MethodKind.Unary,
        },
      },
    } as const;

    const h = createHandlerFactory({})(
      createMethodImplSpec(
        NewService,
        NewService.methods.unary,
        (_req, ctx) => {
          return new ctx.method.O({
            a: "A",
            b: "B",
          });
        },
      ),
    );
    const httpClient = createUniversalHandlerClient([h]);

    it("should ignore unknown field by default", async function () {
      const t = createTransport({
        ...defaultTransportOptions,
        httpClient,
        useBinaryFormat: false,
      });
      const res = await t.unary(
        OldService,
        OldService.methods.unary,
        undefined,
        undefined,
        undefined,
        {},
      );
      expect(res.message).toBeInstanceOf(OldService.methods.unary.O);
    });
    it("should reject unknown field if explicitly asked for", async function () {
      const t = createTransport({
        ...defaultTransportOptions,
        httpClient,
        useBinaryFormat: false,
        jsonOptions: { ignoreUnknownFields: false },
      });
      try {
        await t.unary(
          OldService,
          OldService.methods.unary,
          undefined,
          undefined,
          undefined,
          {},
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe(
          '[invalid_argument] cannot decode message TestMessage from JSON: key "b" is unknown',
        );
      }
    });
  });
  // Special handling of set-cookie is available since Node.js v20.0.0,
  // v18.14.1, v16.19.1, but not in headers-polyfill 3.1.2.
  // Also see https://github.com/nodejs/undici/releases/tag/v5.19.0
  if ("getSetCookie" in new Headers()) {
    describe("when there is support for set-cookie", function () {
      // eslint-disable-next-line @typescript-eslint/require-await
      const setMultiValueHeaders: UniversalClientFn = async () => {
        return {
          status: 200,
          header: new Headers({
            "Content-Type": contentTypeUnaryProto,
            "set-cookie": "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
            "Set-Cookie": "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
          }),
          body: createAsyncIterable([
            new StringValue({ value: "abc" }).toBinary(),
          ]),
          trailer: new Headers(),
        };
      };
      it("should produce the correct array of values in the response", async function () {
        const t = createTransport({
          ...defaultTransportOptions,
          httpClient: setMultiValueHeaders,
        });
        const res = await t.unary(
          TestService,
          TestService.methods.unary,
          undefined,
          undefined,
          undefined,
          {},
        );
        expect(res.header.getSetCookie()).toEqual([
          "a=a; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
          "b=b; Expires=Wed, 21 Oct 2015 07:28:00 GMT",
        ]);
      });
    });
  }
});
