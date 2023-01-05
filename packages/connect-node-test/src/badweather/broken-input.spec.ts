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

import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { createTestServers } from "../helpers/testserver.js";
import {
  Code,
  connectEndStreamFromJson,
  connectErrorFromJson,
  createMethodUrl,
} from "@bufbuild/connect-core";
import { http2Request } from "../helpers/http2-request.js";
import type { MethodInfo } from "@bufbuild/protobuf";
import type * as http2 from "http2";

describe("broken input", () => {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  // TODO(TCN-785) add @bufbuild/connect-node
  // TODO(TCN-785) cover gRPC and gRPC-web
  // TODO(TCN-785) cover invalid protobuf binary input
  servers.describeServers(["connect-go (h2)"], (server, serverName) => {
    async function req(method: MethodInfo, type: string, body: Uint8Array) {
      const url = createMethodUrl(server.getUrl(), TestService, method);
      const opt: http2.SecureClientSessionOptions = {};
      if (serverName == "connect-go (h2)") {
        opt.rejectUnauthorized = false; // TODO set up cert for go server correctly
      }
      return await http2Request(
        "POST",
        url,
        { "content-type": type },
        body,
        opt
      );
    }

    describe("Connect unary", function () {
      const reqUnary = async (type: string, body: Uint8Array) =>
        req(TestService.methods.unaryCall, type, body).then((res) => ({
          status: res.status,
          error: connectErrorFromJson(
            JSON.parse(new TextDecoder().decode(res.body)) // eslint-disable-line @typescript-eslint/no-unsafe-argument
          ),
        }));
      it("should raise HTTP 400 for invalid JSON", async () => {
        const body = new TextEncoder().encode("this is not json");
        const { status, error } = await reqUnary("application/json", body);
        expect(status).toBe(400);
        expect(error.code).toBe(Code.InvalidArgument);
        if (serverName == "@bufbuild/connect-node (h2c)") {
          expect(error.rawMessage).toBe(
            "json format: Unexpected token h in JSON at position 1"
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
        const reqStreaming = async (type: string, body: Uint8Array) =>
          req(method, type, body).then((res) => ({
            status: res.status,
            endStream: connectEndStreamFromJson(res.body.subarray(5)),
          }));
        it("should raise HTTP 400 for for invalid JSON", async () => {
          const json = new TextEncoder().encode("this is not json");
          const body = new Uint8Array(json.byteLength + 5);
          body.set(json, 5);
          const v = new DataView(body.buffer, body.byteOffset, body.byteLength);
          v.setUint8(0, 0b00000000); // first byte is flags
          v.setUint32(1, json.byteLength); // 4 bytes message length
          const { status, endStream } = await reqStreaming(
            "application/connect+json",
            body
          );
          expect(status).toBe(200);
          expect(endStream.error?.code).toBe(Code.InvalidArgument);
          if (serverName == "@bufbuild/connect-node (h2c)") {
            expect(endStream.error?.rawMessage).toBe(
              "json format: Unexpected token h in JSON at position 1"
            );
          }
        });
        it("should raise HTTP 400 for 0 message length", async () => {
          const body = new Uint8Array(5);
          const v = new DataView(body.buffer, body.byteOffset, body.byteLength);
          v.setUint8(0, 0b00000000); // first byte is flags
          v.setUint32(1, 1024); // 4 bytes message length
          const { status, endStream } = await reqStreaming(
            "application/connect+proto",
            body
          );
          expect(status).toBe(200);
          expect(endStream.error?.code).toBe(Code.InvalidArgument);
          expect(endStream.error?.rawMessage).toBe(
            "protocol error: promised 1024 bytes in enveloped message, got 0 bytes"
          );
        });
        it("should raise HTTP 400 for short message", async () => {
          const body = new Uint8Array(6);
          const v = new DataView(body.buffer, body.byteOffset, body.byteLength);
          v.setUint8(0, 0b00000000); // first byte is flags
          v.setUint32(1, 1024); // 4 bytes message length
          const { status, endStream } = await reqStreaming(
            "application/connect+proto",
            body
          );
          expect(status).toBe(200);
          expect(endStream.error?.code).toBe(Code.InvalidArgument);
          expect(endStream.error?.rawMessage).toMatch(
            "^protocol error: promised 1024 bytes in enveloped message, got (1|less) bytes"
          );
        });
        it("should raise HTTP 400 for short envelope", async () => {
          const body = new Uint8Array(1);
          const v = new DataView(body.buffer, body.byteOffset, body.byteLength);
          v.setUint8(0, 0b00000000); // first byte is flags
          const { status, endStream } = await reqStreaming(
            "application/connect+proto",
            body
          );
          expect(status).toBe(200);
          expect(endStream.error?.code).toBe(Code.InvalidArgument);
          expect(endStream.error?.rawMessage).toMatch(
            "^protocol error: incomplete envelope"
          );
        });
      });
    }
  });

  afterAll(async () => await servers.stop());
});
