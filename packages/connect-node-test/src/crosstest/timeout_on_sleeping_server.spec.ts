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

import type { CallOptions } from "@bufbuild/connect";
import {
  Code,
  ConnectError,
  connectErrorFromReason,
  createCallbackClient,
  createPromiseClient,
} from "@bufbuild/connect";
import { TestService } from "../gen/connectrpc/conformance/v1/test_connect.js";
import { StreamingOutputCallRequest } from "../gen/connectrpc/conformance/v1/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";

describe("timeout_on_sleeping_server", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  const request = new StreamingOutputCallRequest({
    payload: {
      body: new Uint8Array(271828).fill(0),
    },
    responseParameters: [
      {
        size: 31415,
        intervalUs: 50 * 1000, // 50ms
      },
    ],
  });
  const options: CallOptions = {
    timeoutMs: 5,
  };
  // TODO(TCN-761) support deadlines in connect-es handlers
  servers.describeTransportsExcluding(
    [
      "@bufbuild/connect-node (gRPC, binary, http2) against @bufbuild/connect-node (h2)",
      "@bufbuild/connect-node (gRPC, binary, http2) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC, JSON, http2) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC, binary, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC, JSON, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, JSON, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (Connect, binary, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (Connect, JSON, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (Connect, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (Connect, JSON, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http2) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC-web, JSON, http2) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC-web, binary, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC-web, JSON, http2, gzip) against @bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (gRPC-web, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC-web, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http, gzip against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-express (h1)",
    ],
    (transport) => {
      it("with promise client", async function () {
        const client = createPromiseClient(TestService, transport());
        try {
          for await (const response of client.streamingOutputCall(
            request,
            options
          )) {
            fail(
              `expecting no response from sleeping server, got: ${response.toJsonString()}`
            );
          }
          fail("expected to catch an error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(connectErrorFromReason(e).code).toBe(Code.DeadlineExceeded);
        }
      });
      it("with callback client", function (done) {
        const client = createCallbackClient(TestService, transport());
        client.streamingOutputCall(
          request,
          (response) => {
            fail(
              `expecting no response from sleeping server, got: ${response.toJsonString()}`
            );
          },
          (err: ConnectError | undefined) => {
            expect(err?.code).toBe(Code.DeadlineExceeded);
            done();
          },
          options
        );
      });
    }
  );

  afterAll(async () => await servers.stop());
});
