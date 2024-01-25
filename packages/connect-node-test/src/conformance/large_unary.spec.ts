// Copyright 2021-2024 The Connect Authors
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

import { createCallbackClient, createPromiseClient } from "@connectrpc/connect";
import { TestService } from "../gen/connectrpc/conformance/v1/test_connect.js";
import { SimpleRequest } from "../gen/connectrpc/conformance/v1/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";

describe("large_unary", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransports((transport) => {
    const request = new SimpleRequest({
      responseSize: 314159,
      payload: {
        body: new Uint8Array(271828).fill(0),
      },
    });
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      const response = await client.unaryCall(request);
      expect(response.payload).toBeDefined();
      expect(response.payload?.body.length).toEqual(request.responseSize);
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      client.unaryCall(request, (err, response) => {
        expect(err).toBeUndefined();
        expect(response.payload).toBeDefined();
        expect(response.payload?.body.length).toEqual(request.responseSize);
        done();
      });
    });
  });

  afterAll(async () => await servers.stop());
});
