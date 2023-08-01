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

import { Code, ConnectError, createPromiseClient } from "@bufbuild/connect";
import { TestService } from "../gen/grpc/testing/test_connect.js";
import {
  PayloadType,
  StreamingOutputCallRequest,
} from "../gen/grpc/testing/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";
import { interop } from "../helpers/interop.js";

describe("cancel_after_first_response", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  function expectError(err: unknown) {
    expect(err).toBeInstanceOf(ConnectError);
    if (err instanceof ConnectError) {
      expect(err.code).toBe(Code.Canceled);
      expect(err.message).toBe("[canceled] This operation was aborted");
    }
  }

  servers.describeTransportsExcluding(
    [
      // All following Transports run over HTTP/1, which cannot support full-duplex.
      "@bufbuild/connect-node (Connect, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (Connect, JSON, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (Connect, binary, http) against connect-go (h1)",
      "@bufbuild/connect-node (Connect, binary, http, gzip) against connect-go (h1)",
      "@bufbuild/connect-node (Connect, JSON, http) against connect-go (h1)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against connect-go (h1)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, JSON, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC, binary, https) against connect-go (h1)",
      "@bufbuild/connect-node (gRPC, JSON, https) against connect-go (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against connect-go (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against connect-go (h1)",
      "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC-web, binary, https) against @bufbuild/connect-node (h1 + tls)",
      "@bufbuild/connect-node (gRPC-web, binary, https) against connect-go (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, https) against connect-go (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against connect-go (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-express (h1)",
      "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-express (h1)",
    ],
    (transport) => {
      const servers = createTestServers();
      beforeAll(async () => await servers.start());
      it("with promise client", async function () {
        const client = createPromiseClient(TestService, transport());
        const ac = new AbortController();

        async function* input() {
          yield new StreamingOutputCallRequest({
            payload: interop.makeServerPayload(PayloadType.COMPRESSABLE, 8),
            responseParameters: [{ size: 8 }],
          });
          await new Promise((resolve) => setTimeout(resolve, 1));
          yield new StreamingOutputCallRequest({
            payload: interop.makeServerPayload(PayloadType.COMPRESSABLE, 8),
            responseParameters: [{ size: 8 }],
          });
          await new Promise((resolve) => setTimeout(resolve, 1));
          yield new StreamingOutputCallRequest({
            payload: interop.makeServerPayload(PayloadType.COMPRESSABLE, 16),
            responseParameters: [{ size: 16 }],
          });
          await new Promise((resolve) => setTimeout(resolve, 1));
          yield new StreamingOutputCallRequest({
            payload: interop.makeServerPayload(PayloadType.COMPRESSABLE, 32),
            responseParameters: [{ size: 32 }],
          });
        }

        try {
          for await (const res of client.fullDuplexCall(input(), {
            signal: ac.signal,
          })) {
            expect(res).toBeDefined();
            ac.abort();
          }
          fail("expected error");
        } catch (e) {
          expectError(e);
        }
      });
    },
  );

  afterAll(async () => await servers.stop());
});
