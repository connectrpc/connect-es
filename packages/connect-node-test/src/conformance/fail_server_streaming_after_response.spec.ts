// Copyright 2021-2023 The Connect Authors
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
  Code,
  ConnectError,
  createCallbackClient,
  createPromiseClient,
} from "@connectrpc/connect";
import { TestService } from "../gen/connectrpc/conformance/v1/test_connect.js";
import {
  ErrorDetail,
  StreamingOutputCallRequest,
  StreamingOutputCallResponse,
} from "../gen/connectrpc/conformance/v1/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";
import { interop } from "../helpers/interop.js";

describe("fail_server_streaming_after_response", () => {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  function expectError(err: unknown) {
    expect(err).toBeInstanceOf(ConnectError);
    if (err instanceof ConnectError) {
      expect(err.code).toEqual(Code.ResourceExhausted);
      expect(err.rawMessage).toEqual(interop.nonASCIIErrMsg);
      const details = err.findDetails(ErrorDetail);
      expect(details).toEqual([interop.errorDetail]);
    }
  }
  const request = new StreamingOutputCallRequest({
    responseParameters: [
      { size: 64, intervalUs: 0 },
      { size: 64, intervalUs: 0 },
      { size: 64, intervalUs: 0 },
    ],
  });
  servers.describeTransports((transport) => {
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      const receivedResponses: StreamingOutputCallResponse[] = [];
      try {
        for await (const response of client.failStreamingOutputCall(request)) {
          receivedResponses.push(response);
        }
      } catch (e) {
        // we expect to receive all messages we asked for
        expect(receivedResponses.length).toEqual(
          request.responseParameters.length,
        );
        // we expect an error at the end
        expectError(e);
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      const receivedResponses: StreamingOutputCallResponse[] = [];
      client.failStreamingOutputCall(
        request,
        (response) => {
          receivedResponses.push(response);
        },
        (err: ConnectError | undefined) => {
          // we expect to receive all messages we asked for
          expect(receivedResponses.length).toEqual(
            request.responseParameters.length,
          );
          // we expect an error at the end
          expectError(err);
          done();
        },
      );
    });
  });

  afterAll(async () => await servers.stop());
});
