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
import { Code, createMethodUrl } from "@bufbuild/connect-core";
import {
  connectEndStreamFromJson,
  connectErrorFromJson,
} from "@bufbuild/connect-core/protocol-connect";
import { http2Request } from "../helpers/http2-request.js";
import type { MethodInfo } from "@bufbuild/protobuf";
import type * as http from "http";
import type { JsonValue } from "@bufbuild/protobuf";

describe("unsupported content encoding", () => {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeServers(
    ["@bufbuild/connect-node (h2c)", "connect-go (h2)"],
    (server, serverName) => {
      function req(method: MethodInfo, headers: http.OutgoingHttpHeaders) {
        const url = createMethodUrl(server.getUrl(), TestService, method);
        if (serverName == "connect-go (h2)") {
          return http2Request("POST", url, headers, undefined, {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          });
        }
        return http2Request("POST", url, headers);
      }
      describe("Connect unary method", function () {
        const reqUnary = req.bind(null, TestService.methods.unaryCall);
        it("should raise code unimplemented for unsupported content-encoding", async () => {
          const res = await reqUnary({
            "content-type": "application/json",
            "content-encoding": "banana",
          });
          expect(res.status).toBe(404);
          const err = connectErrorFromJson(
            JSON.parse(new TextDecoder().decode(res.body)) as JsonValue
          );
          expect(err.code).toBe(Code.Unimplemented);
          expect(err.rawMessage).toMatch(
            /^unknown compression "banana": supported encodings are gzip(, [a-z]+)*$/
          );
        });
      });
      describe("Connect streaming method", function () {
        const reqStreaming = req.bind(
          null,
          TestService.methods.streamingInputCall
        );
        it("should raise code unimplemented for unsupported connect-content-encoding", async () => {
          const res = await reqStreaming({
            "content-type": "application/connect+json",
            "connect-content-encoding": "banana",
          });
          const endStream = connectEndStreamFromJson(res.body.subarray(5));
          expect(endStream.error?.code).toBe(Code.Unimplemented);
          expect(endStream.error?.rawMessage).toMatch(
            /^unknown compression "banana": supported encodings are gzip(, [a-z]+)*$/
          );
        });
      });
    }
  );

  afterAll(async () => await servers.stop());
});
