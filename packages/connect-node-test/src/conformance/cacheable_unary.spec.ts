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

import { createCallbackClient, createPromiseClient } from "@connectrpc/connect";
import { TestService } from "../gen/grpc/testing/test_connect.js";
import { SimpleRequest } from "../gen/grpc/testing/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";

function ensureGetRequest(header: Headers) {
  expect(header.has("request-protocol")).toBeTrue();
  if (header.get("request-protocol") === "connect") {
    expect(header.has("get-request")).toBeTrue();
  }
}

describe("cacheable_unary", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransports((transportFactory) => {
    const request = new SimpleRequest({
      responseSize: 1024,
      payload: {
        body: new Uint8Array(1024).fill(0),
      },
    });
    it("with promise client", async function () {
      const transport = transportFactory({ useHttpGet: true });
      const client = createPromiseClient(TestService, transport);
      const response = await client.cacheableUnaryCall(request, {
        onHeader: ensureGetRequest,
      });
      expect(response.payload).toBeDefined();
      expect(response.payload?.body.length).toEqual(request.responseSize);
    });
    it("with callback client", function (done) {
      const transport = transportFactory({ useHttpGet: true });
      const client = createCallbackClient(TestService, transport);
      client.cacheableUnaryCall(
        request,
        (err, response) => {
          expect(err).toBeUndefined();
          expect(response.payload).toBeDefined();
          expect(response.payload?.body.length).toEqual(request.responseSize);
          done();
        },
        { onHeader: ensureGetRequest },
      );
    });
  });

  afterAll(async () => await servers.stop());
});
