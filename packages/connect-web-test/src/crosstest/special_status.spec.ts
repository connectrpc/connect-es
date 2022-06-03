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

import {
  ConnectError,
  makeCallbackClient,
  makePromiseClient,
  StatusCode,
} from "@bufbuild/connect-web";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { describeTransports } from "../util/describe-transports.js";
import { crosstestTransports } from "../util/crosstestserver.js";
import { SimpleRequest } from "../gen/grpc/testing/messages_pb.js";

describe("special_status", function () {
  describeTransports(crosstestTransports, (transport) => {
    const TEST_STATUS_MESSAGE = `\t\ntest with whitespace\r\nand Unicode BMP ☺ and non-BMP 😈\t\n`;
    const req = new SimpleRequest({
      responseStatus: {
        code: StatusCode.Unknown,
        message: TEST_STATUS_MESSAGE,
      },
    });
    function expectError(err: unknown) {
      expect(err).toBeInstanceOf(ConnectError);
      if (err instanceof ConnectError) {
        expect(err.code).toEqual(StatusCode.Unknown);
        expect(err.rawMessage).toEqual(TEST_STATUS_MESSAGE);
      }
    }
    it("with promise client", async function () {
      const client = makePromiseClient(TestService, transport);
      try {
        await client.unaryCall(req);
        fail("expected to catch an error");
      } catch (e) {
        expectError(e);
      }
    });
    it("with callback client", function (done) {
      const client = makeCallbackClient(TestService, transport);
      client.unaryCall(req, (err: ConnectError | undefined) => {
        expectError(err);
        done();
      });
    });
  });
});
