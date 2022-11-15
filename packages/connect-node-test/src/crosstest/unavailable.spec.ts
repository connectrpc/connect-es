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
  Code,
  ConnectError,
  connectErrorFromReason,
  createConnectHttp2Transport,
  createPromiseClient,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";

describe("unavailable", function () {
  it("for unary with promise client", async function () {
    const transport = createConnectHttp2Transport({
      baseUrl: "https://doesnotexist.buf.build",
    });
    const client = createPromiseClient(TestService, transport);
    try {
      await client.emptyCall({});
      fail("expected to catch an error");
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      expect(connectErrorFromReason(e).code).toBe(Code.Unavailable);
    }
  });
  it("for streaming with promise client", async function () {
    const transport = createConnectHttp2Transport({
      baseUrl: "https://doesnotexist.buf.build",
    });
    const client = createPromiseClient(TestService, transport);
    try {
      for await (const res of client.streamingOutputCall({})) {
        expect(res).toBeDefined(); // only to satisfy type checks
      }
      fail("expected to catch an error");
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      expect(connectErrorFromReason(e).code).toBe(Code.Unavailable);
    }
  });
});
