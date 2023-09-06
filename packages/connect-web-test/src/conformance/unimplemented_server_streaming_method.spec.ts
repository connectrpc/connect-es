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
  ConnectError,
  createCallbackClient,
  createPromiseClient,
  Code,
} from "@connectrpc/connect";
import { TestService } from "../gen/connectrpc/conformance/v1/test_connect.js";
import { describeTransports } from "../helpers/conformanceserver.js";
import { Empty } from "@bufbuild/protobuf";

describe("unimplemented_server_streaming_method", function () {
  function expectError(err: unknown) {
    expect(err).toBeInstanceOf(ConnectError);
    if (err instanceof ConnectError) {
      expect(err.code).toEqual(Code.Unimplemented);
    }
  }
  const request = new Empty();
  describeTransports((transport) => {
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      try {
        for await (const response of client.unimplementedStreamingOutputCall(
          request,
        )) {
          fail(`expecting no response, got: ${response.toJsonString()}`);
        }
        fail("expected to catch an error");
      } catch (e) {
        expectError(e);
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      client.unimplementedStreamingOutputCall(
        request,
        (response) => {
          fail(`expecting no response, got: ${response.toJsonString()}`);
        },
        (err: ConnectError | undefined) => {
          expectError(err);
          done();
        },
      );
    });
  });
});
