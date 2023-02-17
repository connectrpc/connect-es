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
import { TestService } from "../gen/grpc/testing/test_connect.js";
import { StreamingOutputCallRequest } from "../gen/grpc/testing/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";

describe("server_streaming", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransports((transport) => {
    const sizes = [31415, 9, 2653, 58979];
    const request = new StreamingOutputCallRequest({
      responseParameters: sizes.map((size, index) => ({
        size,
        intervalUs: index * 10,
      })),
    });
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      let responseCount = 0;
      for await (const response of client.streamingOutputCall(request)) {
        expect(response.payload).toBeDefined();
        expect(response.payload?.body.length).toEqual(sizes[responseCount]);
        responseCount++;
      }
      expect(responseCount).toEqual(sizes.length);
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      let responseCount = 0;
      client.streamingOutputCall(
        request,
        (response) => {
          expect(response.payload).toBeDefined();
          expect(response.payload?.body.length).toEqual(sizes[responseCount]);
          responseCount++;
        },
        (err) => {
          expect(err).toBeUndefined();
          expect(responseCount).toBe(sizes.length);
          done();
        }
      );
    });
  });

  afterAll(async () => await servers.stop());
});
