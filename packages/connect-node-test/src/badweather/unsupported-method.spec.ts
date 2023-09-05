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

import { TestService } from "../gen/connectrpc/conformance/v1/test_connect.js";
import { createTestServers } from "../helpers/testserver.js";
import { createMethodUrl } from "@connectrpc/connect/protocol";
import { http2Request } from "../helpers/http2-request.js";

describe("unsupported method", () => {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeServers(
    ["@connectrpc/connect-node (h2c)", "connect-go (h2)"],
    (server, serverName) => {
      const rejectUnauthorized = serverName !== "connect-go (h2)"; // TODO set up cert for go server correctly

      describe("unary method", function () {
        it("should raise HTTP 405 Method Not Allowed for GET", async () => {
          const res = await http2Request({
            url: createMethodUrl(
              server.getUrl(),
              TestService,
              TestService.methods.unaryCall,
            ),
            method: "GET",
            ctype: "application/json",
            rejectUnauthorized,
          });
          expect(res.status).toBe(405);
          expect(res.body.byteLength).toBe(0);
        });
        it("should raise HTTP 405 Method Not Allowed for PUT", async () => {
          const res = await http2Request({
            url: createMethodUrl(
              server.getUrl(),
              TestService,
              TestService.methods.unaryCall,
            ),
            method: "PUT",
            ctype: "application/json",
            rejectUnauthorized,
          });
          expect(res.status).toBe(405);
          expect(res.body.byteLength).toBe(0);
        });
      });
    },
  );

  afterAll(async () => await servers.stop());
});
