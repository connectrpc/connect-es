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
import { runInNewContext } from "node:vm";
import { create } from "@bufbuild/protobuf";
import { Code, ConnectError } from "@connectrpc/connect";
import {
  ConformanceService,
  UnaryRequestSchema,
} from "@connectrpc/connect-conformance";
import { createConnectTransport } from "./connect-transport.js";

describe("Connect transport", () => {
  function callUnary(response: Response) {
    const transport = createConnectTransport({
      baseUrl: "https://example.com",
      fetch: () => Promise.resolve(response),
    });
    return transport.unary(
      ConformanceService.method.unary,
      undefined,
      undefined,
      undefined,
      create(UnaryRequestSchema),
    );
  }

  describe("with a unary error response that has a JSON content type", () => {
    for (const { status, body, code } of [
      { status: 503, body: "", code: Code.Unavailable },
      { status: 503, body: "Service Unavailable", code: Code.Unavailable },
      { status: 429, body: "", code: Code.Unavailable },
      { status: 400, body: "Bad Request", code: Code.Internal },
    ]) {
      it(`should use the code of HTTP ${status} for the body ${JSON.stringify(body)}`, async () => {
        const response = new Response(body, {
          status,
          headers: { "Content-Type": "application/json", "X-Foo": "bar" },
        });
        await assert.rejects(callUnary(response), (e) => {
          assert.ok(e instanceof ConnectError);
          assert.strictEqual(e.code, code);
          assert.strictEqual(e.rawMessage, `HTTP ${status}`);
          assert.strictEqual(e.metadata.get("X-Foo"), "bar");
          return true;
        });
      });
    }
    it("should recognize a SyntaxError from another realm", async () => {
      const response = new Response(null, {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
      // A custom fetch may parse JSON in another realm, where the error is
      // not an instance of our SyntaxError.
      response.json = async () => runInNewContext("JSON.parse('')");
      await assert.rejects(callUnary(response), /\[unavailable] HTTP 503/);
    });
    it("should not replace a failure to read the body", async () => {
      const body = new ReadableStream({
        start(controller) {
          controller.error(new TypeError("connection lost"));
        },
      });
      const response = new Response(body, {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
      await assert.rejects(callUnary(response), /\[unknown] connection lost/);
    });
  });
});
