// Copyright 2021-2022 Buf Technologies, Inc.
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
  ConnectError,
  createCallbackClient,
  createPromiseClient,
  Code,
} from "@bufbuild/connect-web";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { describeTransports } from "../helpers/describe-transports.js";
import { crosstestTransports } from "../helpers/crosstestserver.js";
import { StreamingOutputCallRequest } from "../gen/grpc/testing/messages_pb.js";
import type { CallOptions } from "@bufbuild/connect-web/src/transport";

describe("timeout_on_sleeping_server", function () {
  const request = new StreamingOutputCallRequest({
    payload: {
      body: new Uint8Array(271828).fill(0),
    },
    responseParameters: [
      {
        size: 31415,
        intervalUs: 5000,
      },
    ],
  });
  const options: CallOptions = {
    timeoutMs: 1, // 1ms
  };
  function expectError(err: unknown) {
    expect(err).toBeInstanceOf(ConnectError);
    if (err instanceof ConnectError) {
      // We expect this to be DEADLINE_EXCEEDED, however envoy is monitoring the stream timeout
      // and will return an HTTP status code 408 when stream max duration time reached, which
      // cannot be translated to a connect error code, so connect-web client throws an Unknown.
      expect(
        err.code === Code.Unknown || err.code === Code.DeadlineExceeded
      ).toBeTrue();
    }
  }
  describeTransports(crosstestTransports, (transport) => {
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport);
      try {
        for await (const response of await client.streamingOutputCall(
          request,
          options
        )) {
          fail(
            `expecting no response from sleeping server, got: ${response.toJsonString()}`
          );
        }
        fail("expected to catch an error");
      } catch (e) {
        expectError(e);
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport);
      client.streamingOutputCall(
        request,
        (response) => {
          fail(
            `expecting no response from sleeping server, got: ${response.toJsonString()}`
          );
        },
        (err: ConnectError | undefined) => {
          expectError(err);
          done();
        },
        options
      );
    });
  });
});
