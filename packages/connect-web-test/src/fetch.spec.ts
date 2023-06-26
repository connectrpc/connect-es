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

import { TestService } from "./gen/grpc/testing/test_connect.js";
import {
  SimpleRequest,
  SimpleResponse,
} from "./gen/grpc/testing/messages_pb.js";
import { createConnectTransport } from "@bufbuild/connect-web";

describe("custom fetch", function () {
  describe("with Connect transport", () => {
    it("should only call Response#json with the JSON format", async function () {
      const response = new Response(
        new SimpleResponse({ username: "donald" }).toJsonString(),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      spyOn(response, "arrayBuffer").and.callThrough();
      spyOn(response, "json").and.callThrough();
      const transport = createConnectTransport({
        baseUrl: "https://example.com",
        fetch: () => Promise.resolve(response),
      });
      await transport.unary(
        TestService,
        TestService.methods.unaryCall,
        undefined,
        undefined,
        undefined,
        new SimpleRequest()
      );
      expect(response.json).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(response.arrayBuffer).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
    });
    it("should only call Response#arrayBuffer with the binary format on the happy path", async function () {
      const response = new Response(
        new SimpleResponse({ username: "donald" }).toBinary(),
        {
          headers: {
            "Content-Type": "application/proto",
          },
        }
      );
      spyOn(response, "arrayBuffer").and.callThrough();
      spyOn(response, "json").and.callThrough();
      const transport = createConnectTransport({
        fetch: () => Promise.resolve(response),
        baseUrl: "https://example.com",
        useBinaryFormat: true,
      });
      await transport.unary(
        TestService,
        TestService.methods.unaryCall,
        undefined,
        undefined,
        undefined,
        new SimpleRequest()
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
        }
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
          TestService,
          TestService.methods.unaryCall,
          undefined,
          undefined,
          undefined,
          new SimpleRequest()
        )
      ).toBeRejectedWithError(/\[permission_denied] foobar/);
      expect(response.json).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(response.arrayBuffer).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
    });
    it("should support polyfills", async function () {
      const response = new Response(
        new SimpleResponse({ username: "donald" }).toJsonString(),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      spyOn(response, "arrayBuffer").and.callThrough();
      spyOn(response, "json").and.callThrough();
      const transport = createConnectTransport({
        baseUrl: "https://example.com",
      });
      const originFetch = globalThis.fetch;
      // Patch globalThis.fetch to mimic a polyfill
      globalThis.fetch = () => Promise.resolve(response);
      await transport.unary(
        TestService,
        TestService.methods.unaryCall,
        undefined,
        undefined,
        undefined,
        new SimpleRequest()
      );
      globalThis.fetch = originFetch;
      expect(response.json).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(response.arrayBuffer).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
    });
  });
});
