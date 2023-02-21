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

import { TestService } from "../gen/grpc/testing/test_connect.js";
import { createTestServers } from "../helpers/testserver.js";
import { Code, ConnectError } from "@bufbuild/connect";
import { createMethodUrl } from "@bufbuild/connect/protocol";
import {
  codeFromHttpStatus,
  endStreamFromJson,
  errorFromJsonBytes,
} from "@bufbuild/connect/protocol-connect";
import { http2Request } from "../helpers/http2-request.js";

describe("unsupported content encoding", () => {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeServers(
    ["@bufbuild/connect-node (h2c)", "connect-go (h2)"],
    (server, serverName) => {
      const rejectUnauthorized = serverName !== "connect-go (h2)"; // TODO set up cert for go server correctly

      describe("Connect unary method", function () {
        it("should raise code unimplemented for unsupported content-encoding", async () => {
          const res = await http2Request({
            url: createMethodUrl(
              server.getUrl(),
              TestService,
              TestService.methods.unaryCall
            ),
            method: "POST",
            headers: {
              "content-type": "application/json",
              "content-encoding": "banana",
            },
            rejectUnauthorized,
          });
          expect(res.status).toBe(404);
          const err = errorFromJsonBytes(
            res.body,
            undefined,
            new ConnectError(
              `HTTP ${res.status}`,
              codeFromHttpStatus(res.status)
            )
          );
          expect(err.code).toBe(Code.Unimplemented);
          expect(err.rawMessage).toMatch(
            /^unknown compression "banana": supported encodings are gzip(,[a-z]+)*$/
          );
        });
      });
      describe("Connect streaming method", function () {
        it("should raise code unimplemented for unsupported connect-content-encoding", async () => {
          const res = await http2Request({
            url: createMethodUrl(
              server.getUrl(),
              TestService,
              TestService.methods.streamingInputCall
            ),
            method: "POST",
            headers: {
              "content-type": "application/connect+json",
              "connect-content-encoding": "banana",
            },
            rejectUnauthorized,
          });
          const endStream = endStreamFromJson(res.body.subarray(5));
          expect(endStream.error?.code).toBe(Code.Unimplemented);
          expect(endStream.error?.rawMessage).toMatch(
            /^unknown compression "banana": supported encodings are gzip(,[a-z]+)*$/
          );
        });
      });
    }
  );

  afterAll(async () => await servers.stop());
});
