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

import { createCallbackClient, createPromiseClient } from "@bufbuild/connect";
import type { Interceptor } from "@bufbuild/connect";
import { TestService } from "../gen/grpc/testing/test_connect.js";
import { SimpleRequest } from "../gen/grpc/testing/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";

const ensureGetRequest: Interceptor = (next) => async (req) => {
  const res = await next(req);
  expect(res.header.has("request-protocol")).toBeTrue();
  if (res.header.get("request-protocol") === "connect") {
    expect(res.header.has("get-request")).toBeTrue();
  }
  return res;
};

describe("cacheable_unary", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransportsExcluding(
    // connect-node servers currently do not support HTTP GET.
    [
      "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, binary, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (Connect, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, JSON, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (Connect, JSON, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC-web, binary, http, gzip against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC-web, binary, http2) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC-web, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC-web, JSON, http2) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC-web, JSON, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, binary, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC, binary, http2) against @bufbuild/connect-node (h2)",
      "@bufbuild/connect-node (gRPC, binary, http2) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC, JSON, http2) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC, JSON, https) against @bufbuild/connect-node (h1 + tls)",
    ],
    (transportFactory) => {
      const request = new SimpleRequest({
        responseSize: 1024,
        payload: {
          body: new Uint8Array(1024).fill(0),
        },
      });
      it("with promise client", async function () {
        const transport = transportFactory({
          useHttpGet: true,
          interceptors: [ensureGetRequest],
        });
        const client = createPromiseClient(TestService, transport);
        const response = await client.cacheableUnaryCall(request);
        expect(response.payload).toBeDefined();
        expect(response.payload?.body.length).toEqual(request.responseSize);
      });
      it("with callback client", function (done) {
        const transport = transportFactory({
          useHttpGet: true,
          interceptors: [ensureGetRequest],
        });
        const client = createCallbackClient(TestService, transport);
        client.cacheableUnaryCall(request, (err, response) => {
          expect(err).toBeUndefined();
          expect(response.payload).toBeDefined();
          expect(response.payload?.body.length).toEqual(request.responseSize);
          done();
        });
      });
    }
  );

  afterAll(async () => await servers.stop());
});
