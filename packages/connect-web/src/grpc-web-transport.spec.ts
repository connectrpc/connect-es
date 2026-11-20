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
import {
  ConformanceService,
  ServerStreamResponseSchema,
} from "@connectrpc/connect-conformance";
import {
  Code,
  ConnectError,
  createClient,
  type Interceptor,
} from "@connectrpc/connect";
import { encodeEnvelope } from "@connectrpc/connect/protocol";
import { trailerFlag } from "@connectrpc/connect/protocol-grpc-web";
import { create, toBinary } from "@bufbuild/protobuf";
import { createGrpcWebTransport } from "./grpc-web-transport.js";

describe("gRPC-web transport", () => {
  describe("server-streaming response body", () => {
    const message = encodeEnvelope(
      0,
      toBinary(ServerStreamResponseSchema, create(ServerStreamResponseSchema)),
    );
    const trailer = encodeEnvelope(
      trailerFlag,
      new TextEncoder().encode("grpc-status: 0\r\n"),
    );
    function concat(...chunks: Uint8Array[]): Uint8Array<ArrayBuffer> {
      const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
      let offset = 0;
      for (const c of chunks) {
        out.set(c, offset);
        offset += c.length;
      }
      return out;
    }
    async function readStream(
      body: Uint8Array<ArrayBuffer>,
      interceptors: Interceptor[] = [],
    ): Promise<unknown> {
      const transport = createGrpcWebTransport({
        baseUrl: "https://example.com",
        interceptors,
        fetch: () =>
          Promise.resolve(
            new Response(body, {
              headers: { "Content-Type": "application/grpc-web+proto" },
            }),
          ),
      });
      const client = createClient(ConformanceService, transport);
      try {
        for await (const _ of client.serverStream({})) {
          // consume the stream
        }
      } catch (e) {
        return e;
      }
      return undefined;
    }
    it("should raise a ConnectError for a missing trailer", async () => {
      const err = await readStream(concat(message));
      assert.ok(err instanceof ConnectError, `got ${String(err)}`);
      assert.strictEqual(err.code, Code.Internal);
      assert.strictEqual(err.rawMessage, "protocol error: missing trailer");
    });
    it("should raise a ConnectError to interceptors", async () => {
      let seen: unknown;
      const interceptor: Interceptor = (next) => async (req) => {
        const res = await next(req);
        if (!res.stream) {
          return res;
        }
        return {
          ...res,
          message: (async function* () {
            try {
              yield* res.message;
            } catch (e) {
              seen = e;
              throw e;
            }
          })(),
        };
      };
      await readStream(concat(message), [interceptor]);
      assert.ok(seen instanceof ConnectError, `got ${String(seen)}`);
      assert.strictEqual(seen.code, Code.Internal);
    });
    it("should raise a ConnectError for an extra trailer", async () => {
      const err = await readStream(concat(message, trailer, trailer));
      assert.ok(err instanceof ConnectError, `got ${String(err)}`);
      assert.strictEqual(err.code, Code.InvalidArgument);
      assert.strictEqual(
        err.rawMessage,
        "protocol error: received extra trailer",
      );
    });
    it("should raise a ConnectError for a message after the trailer", async () => {
      const err = await readStream(concat(message, trailer, message));
      assert.ok(err instanceof ConnectError, `got ${String(err)}`);
      assert.strictEqual(err.code, Code.InvalidArgument);
      assert.strictEqual(
        err.rawMessage,
        "protocol error: received extra message after trailer",
      );
    });
  });
});
