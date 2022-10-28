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
  createCallbackClient,
  createPromiseClient,
  connectErrorDetails,
  Code,
} from "@bufbuild/connect-web-next";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { describeTransports } from "../helpers/describe-transports.js";
import { crosstestTransports } from "../helpers/crosstestserver.js";
import { ErrorDetail } from "../gen/grpc/testing/messages_pb.js";

describe("fail_unary", () => {
  function expectError(err: unknown, transportName: string) {
    const expectedErrorDetail = new ErrorDetail({
      reason: "soirée 🎉",
      domain: "connect-crosstest",
    });
    expect(err).toBeInstanceOf(ConnectError);
    if (err instanceof ConnectError) {
      expect(err.code).toEqual(Code.ResourceExhausted);
      expect(err.rawMessage).toEqual("soirée 🎉");
      // the experimental gRPC transport does not implement error details
      if (transportName !== "gRPC transport") {
        const details = connectErrorDetails(err, ErrorDetail);
        expect(details.length).toEqual(1);
        expect(details[0]).toBeInstanceOf(ErrorDetail);
        if (details[0] instanceof ErrorDetail) {
          expect(expectedErrorDetail.equals(details[0])).toBeTrue();
        }
      }
    }
  }
  describeTransports(crosstestTransports, (transport, transportName) => {
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport);
      try {
        await client.failUnaryCall({});
        fail("expected to catch an error");
      } catch (e) {
        expectError(e, transportName);
      }
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport);
      client.failUnaryCall({}, (err: ConnectError | undefined) => {
        expectError(err, transportName);
        done();
      });
    });
  });
});
