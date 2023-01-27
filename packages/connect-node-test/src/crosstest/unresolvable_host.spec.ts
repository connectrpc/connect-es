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
  Code,
  ConnectError,
  connectErrorFromReason,
  createCallbackClient,
  createConnectTransport,
  createGrpcTransport,
  createGrpcWebTransport,
  createPromiseClient,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";

// TODO(TCN-1068) fix broken unresolvable_host tests
describe("unresolvable_host", function () {
  const optionsHttp2 = {
    baseUrl: "https://unresolvable-host.some.domain",
    httpVersion: "2" as const,
  };
  const optionsHttp1 = {
    baseUrl: "https://unresolvable-host.some.domain",
    httpVersion: "1.1" as const,
  };
  const transports = [
    [
      "@bufbuild/connect-node (gRPC-web, http2)",
      createGrpcWebTransport(optionsHttp2),
    ],
    [
      "@bufbuild/connect-node (gRPC-web, http)",
      createGrpcTransport(optionsHttp1),
    ],
    [
      "@bufbuild/connect-node (Connect, http2)",
      createConnectTransport(optionsHttp2),
    ],
    [
      "@bufbuild/connect-node (Connect, http)",
      createConnectTransport(optionsHttp1),
    ],
    ["@bufbuild/connect-node (gRPC, http2)", createGrpcTransport(optionsHttp2)],
    ["@bufbuild/connect-node (gRPC, http)", createGrpcTransport(optionsHttp1)],
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
        xdescribe("for server-streaming", function () {
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
        xdescribe("for client-streaming", function () {
          it("should raise code unavailable", async function () {
            try {
              const s = await client.streamingInputCall();
              let ok: boolean;
              ok = await s.send({});
              expect(ok).toBeFalse();
              expect(s.sendError).toBeInstanceOf(ConnectError);
              ok = await s.send({});
              expect(ok).toBeFalse();
              expect(s.sendError).toBeInstanceOf(ConnectError);
              ok = await s.close();
              expect(ok).toBeFalse();
              expect(s.sendError).toBeInstanceOf(ConnectError);
              const res = await s.receive();
              fail("expected error");
              expect(res).toBeUndefined();
            } catch (e) {
              expect(e).toBeInstanceOf(ConnectError);
              const err = connectErrorFromReason(e);
              expect(err.code).toBe(Code.Unavailable);
            }
          });
        });
        xdescribe("for bidi-streaming", function () {
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
        xdescribe("for server-streaming", function () {
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
        xdescribe("for client-streaming", function () {
          it("should raise code unavailable", function () {
            // TODO(TCN-568, TCN-679) add methods for client-streaming and bidi-streaming
          });
        });
        xdescribe("for bidi-streaming", function () {
          it("should raise code unavailable", function () {
            // TODO(TCN-568, TCN-679) add methods for client-streaming and bidi-streaming
          });
        });
      });
    });
  }
});
