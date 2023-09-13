// Copyright 2021-2023 The Connect Authors
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

import { Int32Value, MethodKind, StringValue } from "@bufbuild/protobuf";
import type { Transport } from "../transport.js";
import { createTransport } from "./transport.js";
import type {
  UniversalClientRequest,
  UniversalClientResponse,
} from "../protocol/index.js";
import { createAsyncIterable, encodeEnvelope } from "../protocol/index.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

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

describe("gRPC transport", function () {
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
  describe("against server responding with an error", function () {
    let httpRequestAborted = false;
    let transport: Transport = null as unknown as Transport;
    beforeEach(function () {
      httpRequestAborted = false;
      transport = createTransport({
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
              "Content-Type": "application/grpc+proto",
            }),
            body: createAsyncIterable([
              encodeEnvelope(0, new StringValue({ value: "abc" }).toBinary()),
            ]),
            trailer: new Headers({
              "grpc-status": Code.ResourceExhausted.toString(),
              "grpc-message": "foo",
            }),
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
          {},
        );
        fail("expected error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).message).toBe("[resource_exhausted] foo");
      }
      expect(httpRequestAborted).toBeTrue();
    });

    it("should cancel the HTTP request for server-streaming", async function () {
      const res = await transport.stream(
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
