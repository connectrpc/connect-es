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
import { Empty } from "@bufbuild/protobuf";
import { createTestServers } from "../helpers/testserver.js";

describe("unimplemented_server_streaming_method", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransports((transport, transportName) => {
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      const request = new Empty();
      try {
        for await (const response of client.unimplementedStreamingOutputCall(
          request,
        )) {
          fail(`expecting no response, got: ${response.toJsonString()}`);
        }
        fail("expected to catch an error");
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectError);
        expect(ConnectError.from(e).code).toBe(Code.Unimplemented);
        if (transportName.includes("against grpc-go")) {
          expect(ConnectError.from(e).message).toBe(
            "[unimplemented] method UnimplementedStreamingOutputCall not implemented",
          );
        } else {
          expect(ConnectError.from(e).message).toBe(
            "[unimplemented] connectrpc.conformance.v1.TestService.UnimplementedStreamingOutputCall is not implemented",
          );
        }
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      const request = new Empty();
      client.unimplementedStreamingOutputCall(
        request,
        (response) => {
          fail(`expecting no response, got: ${response.toJsonString()}`);
        },
        (err: ConnectError | undefined) => {
          expect(err?.code).toBe(Code.Unimplemented);
          if (transportName.includes("against grpc-go")) {
            expect(err?.message).toBe(
              "[unimplemented] method UnimplementedStreamingOutputCall not implemented",
            );
          } else {
            expect(err?.message).toBe(
              "[unimplemented] connectrpc.conformance.v1.TestService.UnimplementedStreamingOutputCall is not implemented",
            );
          }
          done();
        },
      );
    });
  });

  afterAll(async () => await servers.stop());
});
