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
  Code,
  ConnectError,
  createCallbackClient,
  createPromiseClient,
} from "@connectrpc/connect";
import { TestService } from "../gen/grpc/testing/test_connect.js";
import { describeTransports } from "../helpers/crosstestserver.js";
import {
  ErrorDetail,
  StreamingOutputCallRequest,
  StreamingOutputCallResponse,
} from "../gen/grpc/testing/messages_pb.js";
import { interop } from "../helpers/interop.js";

describe("fail_server_streaming_after_response", () => {
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
  describeTransports((transport) => {
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      const receivedResponses: StreamingOutputCallResponse[] = [];
      try {
        for await (const response of client.failStreamingOutputCall(request)) {
          receivedResponses.push(response);
        }
        fail("expected to catch an error");
      } catch (e) {
        expectError(e);
        expect(receivedResponses.length).toBe(
          request.responseParameters.length,
        );
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
          expectError(err);
          expect(receivedResponses.length).toBe(
            request.responseParameters.length,
          );
          done();
        },
      );
    });
  });
});
