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

import type { CallOptions } from "@connectrpc/connect";
import {
  Code,
  ConnectError,
  createCallbackClient,
  createPromiseClient,
} from "@connectrpc/connect";
import { TestService } from "../gen/grpc/testing/test_connect.js";
import { describeTransports } from "../helpers/crosstestserver.js";
import { StreamingOutputCallRequest } from "../gen/grpc/testing/messages_pb.js";

describe("timeout_on_sleeping_server", function () {
  const request = new StreamingOutputCallRequest({
    payload: {
      body: new Uint8Array(271828).fill(0),
    },
    responseParameters: [
      {
        size: 31415,
        intervalUs: 50 * 1000, // 50ms
      },
    ],
  });
  const options: CallOptions = {
    timeoutMs: 5,
  };
  describeTransports((transport) => {
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      try {
        for await (const response of client.streamingOutputCall(
          request,
          options,
        )) {
          fail(
            `expecting no response from sleeping server, got: ${response.toJsonString()}`,
          );
        }
        fail("expected to catch an error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).code).toBe(Code.DeadlineExceeded);
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      client.streamingOutputCall(
        request,
        (response) => {
          fail(
            `expecting no response from sleeping server, got: ${response.toJsonString()}`,
          );
        },
        (err: ConnectError | undefined) => {
          expect(err?.code).toBe(Code.DeadlineExceeded);
          done();
        },
        options,
      );
    });
  });
});
