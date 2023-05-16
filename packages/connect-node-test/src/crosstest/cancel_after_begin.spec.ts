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

import { Code, ConnectError, createPromiseClient } from "@bufbuild/connect";
import { TestService } from "../gen/grpc/testing/test_connect.js";
import { PayloadType } from "../gen/grpc/testing/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";

describe("cancel_after_begin", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  function expectError(err: unknown) {
    expect(err).toBeInstanceOf(ConnectError);
    if (err instanceof ConnectError) {
      expect(err.code === Code.Canceled).toBeTrue();
    }
  }

  servers.describeTransports((transport) => {
    const servers = createTestServers();
    beforeAll(async () => await servers.start());
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      const controller = new AbortController();
      async function* input() {
        yield {
          payload: {
            body: new Uint8Array(),
            type: PayloadType.COMPRESSABLE,
          },
        };
        await new Promise((resolve) => setTimeout(resolve, 1));
        controller.abort();
        yield {
          payload: {
            body: new Uint8Array(),
            type: PayloadType.COMPRESSABLE,
          },
        };
      }
      try {
        await client.streamingInputCall(input(), {
          signal: controller.signal,
        });
        fail("expected error");
      } catch (e) {
        expectError(e);
      }
    });
  });

  afterAll(async () => await servers.stop());
});
