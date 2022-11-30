// Copyright 2021-2022 Buf Technologies, Inc.
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

import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import {
  Code,
  connectErrorFromReason,
  createPromiseClient,
} from "@bufbuild/connect-core";
import {
  createConnectHttp2Transport,
  createGrpcHttp2Transport,
  createGrpcWebHttp2Transport,
} from "@bufbuild/connect-node";

fdescribe("unavailable", () => {
  describe("Connect http2 client with an unresolvable domain", function () {
    const transport = createConnectHttp2Transport({
      baseUrl: "https://host.invalid",
    });
    const client = createPromiseClient(TestService, transport);
    it("should raise code unavailable", async function () {
      try {
        await client.unaryCall({});
        fail("expected an error");
      } catch (e) {
        const err = connectErrorFromReason(e);
        expect(err.code).toBe(Code.Unavailable);
      }
    });
  });

  describe("gRPC http2 client with an unresolvable domain", function () {
    const transport = createGrpcHttp2Transport({
      baseUrl: "https://host.invalid",
    });
    const client = createPromiseClient(TestService, transport);
    it("should raise code unavailable", async function () {
      try {
        await client.unaryCall({});
        fail("expected an error");
      } catch (e) {
        const err = connectErrorFromReason(e);
        expect(err.code).toBe(Code.Unavailable);
      }
    });
  });

  describe("gRPC-wen http2 client with an unresolvable domain", function () {
    const transport = createGrpcWebHttp2Transport({
      baseUrl: "https://host.invalid",
    });
    const client = createPromiseClient(TestService, transport);
    it("should raise code unavailable", async function () {
      try {
        await client.unaryCall({});
        fail("expected an error");
      } catch (e) {
        const err = connectErrorFromReason(e);
        expect(err.code).toBe(Code.Unavailable);
      }
    });
  });
});
