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

import {
  createCallbackClient,
  createPromiseClient,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { StreamingOutputCallRequest } from "../gen/grpc/testing/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";

describe("empty_stream", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransports((transport) => {
    const request = new StreamingOutputCallRequest();
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      try {
        for await (const response of client.streamingOutputCall(request)) {
          fail(
            `expecting no response in the empty stream, got: ${response.toJsonString()}`
          );
        }
      } catch (e) {
        fail(`expecting no error in the empty stream, got: ${String(e)}`);
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      client.streamingOutputCall(
        request,
        () => {
          fail("expecting no response in the empty stream");
        },
        (err) => {
          expect(err).toBeUndefined();
          done();
        }
      );
    });
  });

  afterAll(async () => await servers.stop());
});
