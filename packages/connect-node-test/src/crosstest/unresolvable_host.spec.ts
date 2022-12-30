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
  createPromiseClient,
  // createConnectHttp2Transport,
  // createGrpcWebHttp2Transport,
  // createGrpcHttp2Transport,
  createCallbackClient,
  createConnectHttpTransport,
  // createGrpcWebHttpTransport,
  // createGrpcHttpTransport,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";

fdescribe("unresolvable_host", function () {
  const options = { baseUrl: "https://unresolvable-host.some.domain" };
  const transports = [
    // [
    //   "@bufbuild/connect-node (gRPC-web, http2)",
    //   createGrpcWebHttp2Transport(options),
    // ],
    // [
    //   "@bufbuild/connect-node (gRPC-web, http)",
    //   createGrpcWebHttpTransport(options),
    // ],
    // [
    //   "@bufbuild/connect-node (Connect, http2)",
    //   createConnectHttp2Transport(options),
    // ],
    [
      "@bufbuild/connect-node (Connect, http)",
      createConnectHttpTransport(options),
    ],
    // ["@bufbuild/connect-node (gRPC, http2)", createGrpcHttp2Transport(options)],
    // ["@bufbuild/connect-node (gRPC, http)", createGrpcHttpTransport(options)],
  ] as const;
  for (const [name, transport] of transports) {
    describe(`${name} against unresolvable domain`, function () {
      describe("with promise client", function () {
        const client = createPromiseClient(TestService, transport);
        describe("for unary", function () {
          it("should raise code unavailable", async function () {
            try {
              await client.unaryCall({});
              fail("expected an error");
            } catch (e) {
              expect(e).toBeInstanceOf(ConnectError);
              const err = connectErrorFromReason(e);
              expect(err.code).toBe(Code.Unavailable);
            }
          });
        });
        describe("for server-streaming", function () {
          it("should raise code unavailable", async function () {
            try {
              for await (const res of client.streamingOutputCall({})) {
                fail("expected to catch an error");
                expect(res).toBeDefined(); // only to satisfy type checks
              }
              fail("expected to catch an error");
            } catch (e) {
              expect(e).toBeInstanceOf(ConnectError);
              const err = connectErrorFromReason(e);
              expect(err.code).toBe(Code.Unavailable);
            }
          });
        });
        describe("for client-streaming", function () {
          fit("should raise code unavailable", async function () {
            try {
              const s = await client.streamingInputCall();
              fail("expected to catch an error");
              await s.send({});
              await s.send({});
              await s.close();
              const res = await s.receive();
              expect(res).toBeUndefined();
            } catch (e) {
              expect(e).toBeInstanceOf(ConnectError);
              const err = connectErrorFromReason(e);
              expect(err.code).toBe(Code.Unavailable);
            }
          });
        });
        describe("for bidi-streaming", function () {
          it("should raise code unavailable", async function () {
            try {
              const s = await client.fullDuplexCall();
              fail("expected to catch an error");
              await s.send({});
              await s.send({});
              await s.close();
              for await (const res of s.receiveAll()) {
                expect(res).toBeDefined(); // only to satisfy type checks
              }
            } catch (e) {
              expect(e).toBeInstanceOf(ConnectError);
              const err = connectErrorFromReason(e);
              expect(err.code).toBe(Code.Unavailable);
            }
          });
        });
      });
      describe("with callback client", function () {
        const client = createCallbackClient(TestService, transport);
        describe("for unary", function () {
          it("should raise code unavailable", function (done) {
            client.unaryCall({}, (error) => {
              expect(error?.code).toBe(Code.Unavailable);
              done();
            });
          });
        });
        describe("for server-streaming", function () {
          it("should raise code unavailable", function (done) {
            client.streamingOutputCall(
              {},
              () => {
                fail("expected error");
              },
              (error) => {
                expect(error?.code).toBe(Code.Unavailable);
                done();
              }
            );
          });
        });
        describe("for client-streaming", function () {
          xit("should raise code unavailable", function () {
            // TODO(TCN-568, TCN-679) add methods for client-streaming and bidi-streaming
          });
        });
        describe("for bidi-streaming", function () {
          xit("should raise code unavailable", function () {
            // TODO(TCN-568, TCN-679) add methods for client-streaming and bidi-streaming
          });
        });
      });
    });
  }
});
