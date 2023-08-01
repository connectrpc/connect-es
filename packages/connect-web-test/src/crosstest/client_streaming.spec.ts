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

import { createPromiseClient } from "@bufbuild/connect";
import { Payload, PayloadType } from "../gen/grpc/testing/messages_pb.js";
import { TestService } from "../gen/grpc/testing/test_connect.js";
import { describeTransports } from "../helpers/crosstestserver.js";

describe("client_streaming", function () {
  describeTransports((transport) => {
    const sizes = [31415, 9, 2653, 58979];
    it("with promise client", async function () {
      async function* input() {
        for (const size of sizes) {
          yield {
            payload: new Payload({
              body: new Uint8Array(size),
              type: PayloadType.COMPRESSABLE,
            }),
          };
        }
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
      const client = createPromiseClient(TestService, transport());
      const { aggregatedPayloadSize } = await client.streamingInputCall(
        input()
      );
      expect(aggregatedPayloadSize).toBe(sizes.reduce((p, c) => p + c, 0));
    });
  });
});
