// Copyright 2021-2026 The Connect Authors
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

import { describe, it } from "node:test";
import * as assert from "node:assert";
import { create } from "@bufbuild/protobuf";
import { Code, ConnectError } from "@connectrpc/connect";
import {
  ConformanceService,
  UnaryRequestSchema,
} from "@connectrpc/connect-conformance";
import { encodeEnvelope } from "@connectrpc/connect/protocol";
import { trailerFlag } from "@connectrpc/connect/protocol-grpc-web";
import { createGrpcWebTransport } from "./grpc-web-transport.js";

describe("gRPC-web transport", () => {
  describe("against server responding with an error status in the header and an empty trailer", () => {
    const transport = createGrpcWebTransport({
      baseUrl: "https://example.com",
      fetch: () =>
        Promise.resolve(
          new Response(encodeEnvelope(trailerFlag, new Uint8Array(0)), {
            headers: {
              "Content-Type": "application/grpc-web+proto",
              "grpc-status": Code.InvalidArgument.toString(),
              "grpc-message": "foo",
            },
          }),
        ),
    });
    it("should reject unary with the status from the header", async () => {
      await assert.rejects(
        transport.unary(
          ConformanceService.method.unary,
          undefined,
          undefined,
          undefined,
          create(UnaryRequestSchema),
        ),
        (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(e.code, Code.InvalidArgument);
          assert.strictEqual(e.rawMessage, "foo");
          return true;
        },
      );
    });
  });
});
