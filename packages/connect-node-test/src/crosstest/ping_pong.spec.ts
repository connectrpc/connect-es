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

import { createPromiseClient } from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { describeTransports } from "../helpers/describe-transports.js";
import { crosstestTransports } from "../helpers/crosstestserver.js";
import { PayloadType } from "../gen/grpc/testing/messages_pb.js";

describe("ping_pong", function () {
  describeTransports(crosstestTransports, (transport) => {
    const sizes = [31415, 9, 2653, 58979];
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport);
      const call = await client.fullDuplexCall();
      for (const size of sizes) {
        await call.send({
          payload: {
            body: new Uint8Array(size),
            type: PayloadType.COMPRESSABLE,
          },
          responseParameters: [
            {
              size: size,
            },
          ],
        });
        const res = await call.receive();
        expect(res).toBeDefined();
        expect(res?.payload).toBeDefined();
        expect(res?.payload?.type).toBe(PayloadType.COMPRESSABLE);
        expect(res?.payload?.body.byteLength).toBe(size);
      }
      call.close();
      const res = await call.receive();
      expect(res).toBeNull();
    });
    it("with callback client", function (done) {
      // TODO(TCN-679) need callback clients
      done();
    });
  });
});
