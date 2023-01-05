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

import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { createTestServers } from "../helpers/testserver.js";
import { createMethodUrl } from "@bufbuild/connect-core";
import { http2Request } from "../helpers/http2-request.js";
import type { MethodInfo } from "@bufbuild/protobuf";

describe("unsupported media type", () => {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeServers(
    ["@bufbuild/connect-node (h2c)", "connect-go (h2)"],
    (server, serverName) => {
      function req(method: MethodInfo, type: string) {
        const url = createMethodUrl(server.getUrl(), TestService, method);
        if (serverName == "connect-go (h2)") {
          return http2Request(
            "POST",
            url,
            { "content-type": type },
            undefined,
            {
              rejectUnauthorized: false, // TODO set up cert for go server correctly
            }
          );
        }
        return http2Request("POST", url, { "content-type": type });
      }

      describe("unary method", function () {
        const reqUnary = req.bind(null, TestService.methods.unaryCall);
        it("should raise HTTP 415 for random media type", async () => {
          const res = await reqUnary("text/csv");
          expect(res.status).toBe(415);
          expect(res.body.byteLength).toBe(0);
        });
        it("should raise HTTP 415 for streaming media type", async () => {
          const res = await reqUnary("application/connect+proto");
          expect(res.status).toBe(415);
          expect(res.body.byteLength).toBe(0);
        });
      });
      describe("streaming method", function () {
        const reqStreaming = req.bind(
          null,
          TestService.methods.streamingInputCall
        );
        it("should raise HTTP 415 for random media type", async () => {
          const res = await reqStreaming("text/csv");
          expect(res.status).toBe(415);
          expect(res.body.byteLength).toBe(0);
        });
        it("should raise HTTP 415 for unary media type", async () => {
          const res = await reqStreaming("application/proto");
          expect(res.status).toBe(415);
          expect(res.body.byteLength).toBe(0);
        });
      });
    }
  );

  afterAll(async () => await servers.stop());
});
