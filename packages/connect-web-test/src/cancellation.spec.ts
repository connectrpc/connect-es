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

import type { CallOptions } from "@connectrpc/connect";
import {
  Code,
  ConnectError,
  createCallbackClient,
  createPromiseClient,
} from "@connectrpc/connect";
<<<<<<< HEAD
import { describeTransports } from "./helpers/conformanceserver.js";
import { TestService } from "./gen/grpc/testing/test_connect.js";
=======
import { describeTransports } from "./helpers/crosstestserver.js";
import { TestService } from "./gen/connectrpc/conformance/v1/test_connect.js";
>>>>>>> main

describe("explicit cancellation with AbortController", function () {
  const abort = new AbortController();
  abort.abort();
  const options: Readonly<CallOptions> = {
    signal: abort.signal,
  };
  describeTransports((transport) => {
    describe("with promise client", () => {
      const client = createPromiseClient(TestService, transport());
      it("works for unary method", async () => {
        let caughtError = false;
        try {
          await client.unaryCall({}, options);
        } catch (e) {
          caughtError = true;
          expect(e).toBeInstanceOf(ConnectError);
          if (e instanceof ConnectError) {
            expect(e.code).toBe(Code.Canceled);
          }
        }
        expect(caughtError).toBeTrue();
      });
      it("works for server-streaming method", async () => {
        let caughtError = false;
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for await (const _res of client.streamingOutputCall({}, options)) {
            //
          }
        } catch (e) {
          caughtError = true;
          expect(e).toBeInstanceOf(ConnectError);
          if (e instanceof ConnectError) {
            expect(e.code).toBe(Code.Canceled);
          }
        }
        expect(caughtError).toBeTrue();
      });
    });
    describe("with callback client", () => {
      const client = createCallbackClient(TestService, transport());
      it("works for unary method", (done) => {
        client.unaryCall(
          {},
          () => {
            fail("expected callback client to swallow AbortError");
          },
          options,
        );
        setTimeout(done, 50);
      });
      it("works for unary method with returned cancel-fn", (done) => {
        const cancelFn = client.unaryCall(
          {},
          () => {
            fail("expected callback client to swallow AbortError");
          },
          options,
        );
        cancelFn();
        setTimeout(done, 50);
      });
      it("works for server-streaming method", (done) => {
        client.streamingOutputCall(
          {},
          () => {
            fail("expected call to cancel right away, but got message");
          },
          (error) => {
            expect(error).toBeUndefined();
          },
          options,
        );
        setTimeout(done, 50);
      });
      it("works for server-streaming method with returned cancel-fn", (done) => {
        const cancelFn = client.streamingOutputCall(
          {},
          () => {
            fail("expected call to cancel right away, but got message");
          },
          (error) => {
            expect(error).toBeUndefined();
          },
          options,
        );
        cancelFn();
        setTimeout(done, 50);
      });
    });
  });
});
