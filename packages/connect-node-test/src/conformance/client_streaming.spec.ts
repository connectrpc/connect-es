// Copyright 2021-2024 The Connect Authors
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

import { createPromiseClient } from "@connectrpc/connect";
import { TestService } from "../gen/connectrpc/conformance/v1/test_connect.js";
import { PayloadType } from "../gen/connectrpc/conformance/v1/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";
import { interop } from "../helpers/interop.js";

describe("client_streaming", () => {
  const sizes = [31415, 9, 2653, 58979];
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransports((transport) => {
    it("with promise client", async function () {
      async function* input() {
        for (const size of sizes) {
          yield {
            payload: interop.makeServerPayload(PayloadType.COMPRESSABLE, size),
            expectCompressed: false,
          };
        }
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
      const client = createPromiseClient(TestService, transport());
      const { aggregatedPayloadSize } = await client.streamingInputCall(
        input(),
      );
      expect(aggregatedPayloadSize).toBe(sizes.reduce((p, c) => p + c, 0));
    });
  });

  afterAll(async () => await servers.stop());
});
