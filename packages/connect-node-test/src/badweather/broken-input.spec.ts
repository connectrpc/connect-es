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

import { TestService } from "../gen/grpc/testing/test_connect.js";
import { createTestServers } from "../helpers/testserver.js";
import { Code, ConnectError } from "@bufbuild/connect";
import { createMethodUrl } from "@bufbuild/connect/protocol";
import {
  endStreamFromJson,
  codeFromHttpStatus,
  errorFromJsonBytes,
} from "@bufbuild/connect/protocol-connect";
import { http2Request } from "../helpers/http2-request.js";

describe("broken input", () => {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeServers(
    ["connect-go (h2)", "@bufbuild/connect-node (h2c)"],
    (server, serverName) => {
      const rejectUnauthorized = serverName !== "connect-go (h2)"; // TODO set up cert for go server correctly

      describe("Connect unary", function () {
        it("should raise HTTP 400 for invalid JSON", async () => {
          const unaryRequest = async (body: Uint8Array) =>
            http2Request({
              body,
              rejectUnauthorized,
              url: createMethodUrl(
                server.getUrl(),
                TestService,
                TestService.methods.unaryCall
              ),
              method: "POST",
              ctype: "application/json",
              headers: { "Connect-Protocol-Version": "1" },
            }).then((res) => {
              return {
                status: res.status,
                error: errorFromJsonBytes(
                  res.body,
                  undefined,
                  new ConnectError(
                    `HTTP ${res.status}`,
                    codeFromHttpStatus(res.status)
                  )
                ),
              };
            });
          const { status, error } = await unaryRequest(
            new TextEncoder().encode("this is not json")
          );
          expect(status).toBe(400);
          expect(error.code).toBe(Code.InvalidArgument);
          if (serverName == "@bufbuild/connect-node (h2c)") {
            expect(error.rawMessage).toMatch(
              /^cannot decode grpc.testing.SimpleRequest from JSON: Unexpected token '?h'?.*JSON/
            );
          }
        });
      });

      for (const method of [
        TestService.methods.streamingInputCall,
        TestService.methods.streamingOutputCall,
        TestService.methods.fullDuplexCall,
      ]) {
        describe(`Connect streaming ${method.name}`, function () {
          const streamingRequest = async (body: Uint8Array) =>
            http2Request({
              body,
              rejectUnauthorized,
              url: createMethodUrl(server.getUrl(), TestService, method),
              method: "POST",
              ctype: "application/connect+json",
              headers: { "Connect-Protocol-Version": "1" },
            }).then((res) => ({
              status: res.status,
              endStream: endStreamFromJson(res.body.subarray(5)),
            }));
          it("should raise HTTP 400 for for invalid JSON", async () => {
            const json = new TextEncoder().encode("this is not json");
            const body = new Uint8Array(json.byteLength + 5);
            body.set(json, 5);
            const v = new DataView(
              body.buffer,
              body.byteOffset,
              body.byteLength
            );
            v.setUint8(0, 0b00000000); // first byte is flags
            v.setUint32(1, json.byteLength); // 4 bytes message length
            const { status, endStream } = await streamingRequest(body);
            expect(status).toBe(200);
            expect(endStream.error?.code).toBe(Code.InvalidArgument);
            if (serverName == "@bufbuild/connect-node (h2c)") {
              // Error messages tend to change across Node versions. Should this happen again, this link is useful to
              // build the correct RegExp:  https://regex101.com/r/By9VEN/1
              expect(endStream.error?.rawMessage).toMatch(
                /^cannot decode grpc.testing.Streaming(Input|Output)CallRequest from JSON: Unexpected token '?h'?.*JSON/
              );
            }
          });
          it("should raise HTTP 400 for 0 message length", async () => {
            const body = new Uint8Array(5);
            const v = new DataView(
              body.buffer,
              body.byteOffset,
              body.byteLength
            );
            v.setUint8(0, 0b00000000); // first byte is flags
            v.setUint32(1, 1024); // 4 bytes message length
            const { status, endStream } = await streamingRequest(body);
            expect(status).toBe(200);
            expect(endStream.error?.code).toBe(Code.InvalidArgument);
            expect(endStream.error?.rawMessage).toBe(
              "protocol error: promised 1024 bytes in enveloped message, got 0 bytes"
            );
          });
          it("should raise HTTP 400 for short message", async () => {
            const body = new Uint8Array(6);
            const v = new DataView(
              body.buffer,
              body.byteOffset,
              body.byteLength
            );
            v.setUint8(0, 0b00000000); // first byte is flags
            v.setUint32(1, 1024); // 4 bytes message length
            const { status, endStream } = await streamingRequest(body);
            expect(status).toBe(200);
            expect(endStream.error?.code).toBe(Code.InvalidArgument);
            expect(endStream.error?.rawMessage).toMatch(
              "^protocol error: promised 1024 bytes in enveloped message, got (1|less) bytes"
            );
          });
          it("should raise HTTP 400 for short envelope", async () => {
            const body = new Uint8Array(1);
            const v = new DataView(
              body.buffer,
              body.byteOffset,
              body.byteLength
            );
            v.setUint8(0, 0b00000000); // first byte is flags
            const { status, endStream } = await streamingRequest(body);
            expect(status).toBe(200);
            expect(endStream.error?.code).toBe(Code.InvalidArgument);
            expect(endStream.error?.rawMessage).toMatch(
              "^protocol error: incomplete envelope"
            );
          });
        });
      }
    }
  );

  afterAll(async () => await servers.stop());
});
