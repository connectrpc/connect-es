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
  MethodKind,
  proto3,
  ScalarType,
  StringValue,
} from "@bufbuild/protobuf";
import type {
  UniversalClientRequest,
  UniversalClientResponse,
} from "../protocol/index.js";
import {
  createAsyncIterable,
  createUniversalHandlerClient,
  encodeEnvelope,
} from "../protocol/index.js";
import { ConnectError, connectErrorFromReason } from "../connect-error.js";
import type { Transport } from "../index.js";
import { Code, createMethodImplSpec } from "../index.js";
import { createTransport } from "./transport.js";
import { createEndStreamSerialization, endStreamFlag } from "./end-stream.js";
import {
  contentTypeStreamProto,
  contentTypeUnaryProto,
} from "./content-type.js";
import { errorToJsonBytes } from "./error-json.js";
import { createHandlerFactory } from "./handler-factory.js";

const TestService = {
  typeName: "TestService",
  methods: {
    unary: {
      name: "Unary",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.Unary,
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
        ...defaultTransportOptions,
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
        expect(connectErrorFromReason(e).message).toBe(
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
        expect(connectErrorFromReason(e).message).toBe(
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
        ...defaultTransportOptions,
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
          expect(connectErrorFromReason(e).message).toBe(
            "[resource_exhausted] foo"
          );
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
        ...defaultTransportOptions,
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
          expect(connectErrorFromReason(e).message).toBe(
            "[resource_exhausted] foo"
          );
        }
        expect(messagesReceived.length).toBe(1);
        expect(httpRequestAborted).toBeTrue();
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
        }
      )
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
        {}
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
          {}
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(connectErrorFromReason(e).message).toBe(
          '[invalid_argument] cannot decode message TestMessage from JSON: key "b" is unknown'
        );
      }
    });
  });
});
