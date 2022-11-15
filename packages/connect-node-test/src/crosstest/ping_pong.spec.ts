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
import { PayloadType } from "../gen/grpc/testing/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";
import { interop } from "../helpers/interop.js";

describe("ping_pong", () => {
  const sizes = [31415, 9, 2653, 58979];
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransportsExcluding(
    [
      // This test does full duplex, receiving before it closes the input.
      // In this case, your connect fetch transport never issues the request.
      "connect fetch transport (binary) against Node.js (http)",
      "connect fetch transport (JSON) against Node.js (http)",
    ],
    (transport) => {
      it("with promise client", async function () {
        const client = createPromiseClient(TestService, transport());
        const stream = await client.fullDuplexCall();
        for (const size of sizes) {
          await stream.send({
            payload: interop.makeServerPayload(PayloadType.COMPRESSABLE, size),
            responseParameters: [
              {
                size,
                intervalUs: 0,
              },
            ],
          });
          const res = await stream.receive();
          expect(res?.payload?.body.length).toBe(size);
          expect(res?.payload?.type).toBe(PayloadType.COMPRESSABLE);
        }
        stream.close();
      });
      it("with callback client", function (done) {
        // TODO(TCN-679, TCN-568) need callback clients
        done();
      });
    }
  );

  afterAll(async () => await servers.stop());
});
