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

// TODO(TCN-761) implement, see https://github.com/bufbuild/connect-crosstest#test-suite
import {
  Code,
  ConnectError,
  createPromiseClient,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { PayloadType } from "../gen/grpc/testing/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";

// TODO
/*
  When we run the test individually against one or two servers the test past
  however, when ran against the entire test suite this test fails with an
  Unhandled promise rejection: AbortError: The operation was aborted, error.
  will investigate later on
*/
xdescribe("cancel_after_begin", function () {
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

    xit("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      const controller = new AbortController();
      const stream = await client.streamingInputCall({
        signal: controller.signal,
      });
      try {
        await stream.send({
          payload: {
            body: new Uint8Array(),
            type: PayloadType.COMPRESSABLE,
          },
        });
        controller.abort();
        stream.close();
      } catch (e) {
        expectError(e);
      }
    });
    xit("with callback client", function (done) {
      // TODO(TCN-679, TCN-568) need callback clients
      done();
    });
  });

  afterAll(async () => await servers.stop());
});
