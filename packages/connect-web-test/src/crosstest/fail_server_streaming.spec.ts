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
} from "../gen/grpc/testing/messages_pb.js";
import { interop } from "../helpers/interop.js";

describe("fail_server_streaming", () => {
  function expectError(err: unknown) {
    expect(err).toBeInstanceOf(ConnectError);
    if (err instanceof ConnectError) {
      expect(err.code).toEqual(Code.ResourceExhausted);
      expect(err.rawMessage).toEqual(interop.nonASCIIErrMsg);
      const details = err.findDetails(ErrorDetail);
      expect(details).toEqual([interop.errorDetail]);
    }
  }
  const request = new StreamingOutputCallRequest();
  describeTransports((transport) => {
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const response of client.failStreamingOutputCall(request)) {
          expect(response)
            .withContext("did not expect any response message")
            .toBeUndefined();
        }
      } catch (e) {
        expectError(e);
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      client.failStreamingOutputCall(
        request,
        (response) => {
          expect(response)
            .withContext("did not expect any response message")
            .toBeUndefined();
        },
        (err: ConnectError | undefined) => {
          expectError(err);
          done();
        },
      );
    });
  });
});
