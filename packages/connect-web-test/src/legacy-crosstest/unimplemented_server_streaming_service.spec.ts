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
  connectErrorFromReason,
  createCallbackClient,
  createPromiseClient,
  Code,
} from "@bufbuild/connect-web";
import { UnimplementedService } from "../gen/grpc/testing/test_connectweb.js";
import { describeLegacyTransports } from "../helpers/legacy-crosstestserver.js";
import { Empty } from "../gen/grpc/testing/empty_pb.js";

describe("unimplemented_server_streaming_service", function () {
  const request = new Empty();
  describeLegacyTransports((transport) => {
    it("with promise client", async function () {
      const client = createPromiseClient(UnimplementedService, transport());
      try {
        for await (const response of client.unimplementedStreamingOutputCall(
          request
        )) {
          fail(`expecting no response, got: ${response.toJsonString()}`);
        }
        fail("expected to catch an error");
      } catch (e) {
        expect(connectErrorFromReason(e).code).toEqual(Code.Unimplemented);
        expect(e).toBeInstanceOf(ConnectError);
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(UnimplementedService, transport());
      client.unimplementedStreamingOutputCall(
        request,
        (response) => {
          fail(`expecting no response, got: ${response.toJsonString()}`);
        },
        (err: ConnectError | undefined) => {
          expect(err?.code).toEqual(Code.Unimplemented);
          done();
        }
      );
    });
  });
});
