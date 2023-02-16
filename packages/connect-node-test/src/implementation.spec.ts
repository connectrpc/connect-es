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
  HandlerContext,
  unimplementService,
} from "@bufbuild/connect-node";
import { TestService } from "./gen/grpc/testing/test_connect.js";
import { Empty } from "./gen/grpc/testing/empty_pb.js";

describe("unimplementService()", function () {
  it("should create methods for each RPC", function () {
    const i = unimplementService(TestService, {});
    expect(Object.keys(i).sort()).toEqual(
      Object.keys(TestService.methods).sort()
    );
  });
  it("should throw unimplemented connect error from method", async function () {
    const i = unimplementService(TestService, {});
    try {
      await i.emptyCall(new Empty(), null as unknown as HandlerContext);
      fail("expected error to be thrown");
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      expect(connectErrorFromReason(e).message).toBe(
        "[unimplemented] grpc.testing.TestService.EmptyCall is not implemented"
      );
    }
  });
});
