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

import { afterEach, beforeEach, describe, it } from "node:test";
import * as assert from "node:assert";
import {
  BidiStreamRequestSchema,
  BidiStreamResponseSchema,
  ClientStreamRequestSchema,
  ClientStreamResponseSchema,
  ConformanceService,
  ServerStreamRequestSchema,
  ServerStreamResponseSchema,
} from "@connectrpc/connect-conformance";
import { Code, ConnectError } from "@connectrpc/connect";
import {
  createAsyncIterable,
  createEnvelopeReadableStream,
  encodeEnvelope,
} from "@connectrpc/connect/protocol";
import { endStreamFlag } from "@connectrpc/connect/protocol-connect";
import {
  trailerFlag,
  trailerSerialize,
} from "@connectrpc/connect/protocol-grpc-web";
import { create, fromBinary, toBinary } from "@bufbuild/protobuf";
import type { DescMessage, MessageShape } from "@bufbuild/protobuf";
import { createConnectTransport } from "./connect-transport.js";
import { createGrpcWebTransport } from "./grpc-web-transport.js";

/**
 * Parses all enveloped messages from request body bytes.
 */
async function parseRequestMessages<Desc extends DescMessage>(
  desc: Desc,
  bytes: Uint8Array<ArrayBuffer>,
): Promise<MessageShape<Desc>[]> {
  const reader = createEnvelopeReadableStream(
    new Response(bytes).body as ReadableStream<Uint8Array>,
  ).getReader();
  const messages: MessageShape<Desc>[] = [];
  for (;;) {
    const r = await reader.read();
    if (r.done) {
      break;
    }
    assert.strictEqual(r.value.flags, 0);
    messages.push(fromBinary(desc, r.value.data));
  }
  return messages;
}

function concat(...chunks: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const result = new Uint8Array(chunks.reduce((n, c) => n + c.byteLength, 0));
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

/**
 * Creates a fetch function that records the request and responds with the
 * given body. Like a half-duplex fetch, it reads the request body to
 * completion before responding.
 */
function recordingFetch(body: Uint8Array<ArrayBuffer>, contentType: string) {
  const calls: {
    url: string;
    init: RequestInit & { duplex?: string };
    requestBody: Uint8Array<ArrayBuffer>;
  }[] = [];
  const fetch: typeof globalThis.fetch = async (input, init) => {
    assert.ok(typeof input == "string");
    const requestBody = new Uint8Array(
      await new Request(input, {
        method: "POST",
        body: init?.body,
        duplex: "half",
      } as RequestInit).arrayBuffer(),
    );
    calls.push({ url: input, init: init ?? {}, requestBody });
    return new Response(body, { headers: { "Content-Type": contentType } });
  };
  return { calls, fetch };
}

describe("streaming request bodies", () => {
  describe("with Connect transport", () => {
    const responseBody = concat(
      encodeEnvelope(
        0,
        toBinary(
          ClientStreamResponseSchema,
          create(ClientStreamResponseSchema, {
            payload: { data: new Uint8Array([1, 2, 3]) },
          }),
        ),
      ),
      encodeEnvelope(endStreamFlag, new TextEncoder().encode("{}")),
    );
    it("should send client-streaming request messages as a ReadableStream", async () => {
      const { calls, fetch } = recordingFetch(
        responseBody,
        "application/connect+proto",
      );
      const transport = createConnectTransport({
        baseUrl: "https://example.com",
        useBinaryFormat: true,
        fetch,
      });
      const res = await transport.stream(
        ConformanceService.method.clientStream,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([
          create(ClientStreamRequestSchema, {
            requestData: new Uint8Array([1]),
          }),
          create(ClientStreamRequestSchema, {
            requestData: new Uint8Array([2]),
          }),
        ]),
      );
      const received: Uint8Array[] = [];
      for await (const m of res.message) {
        received.push(m.payload?.data ?? new Uint8Array());
      }
      assert.deepStrictEqual(received, [new Uint8Array([1, 2, 3])]);
      assert.strictEqual(calls.length, 1);
      assert.strictEqual(calls[0].init.duplex, "half");
      const sent = await parseRequestMessages(
        ClientStreamRequestSchema,
        calls[0].requestBody,
      );
      assert.deepStrictEqual(
        sent.map((m) => m.requestData),
        [new Uint8Array([1]), new Uint8Array([2])],
      );
    });
    it("should send server-streaming request message as bytes", async () => {
      const serverStreamResponseBody = concat(
        encodeEnvelope(
          0,
          toBinary(
            ServerStreamResponseSchema,
            create(ServerStreamResponseSchema),
          ),
        ),
        encodeEnvelope(endStreamFlag, new TextEncoder().encode("{}")),
      );
      const { calls, fetch } = recordingFetch(
        serverStreamResponseBody,
        "application/connect+proto",
      );
      const transport = createConnectTransport({
        baseUrl: "https://example.com",
        useBinaryFormat: true,
        fetch,
      });
      const res = await transport.stream(
        ConformanceService.method.serverStream,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([create(ServerStreamRequestSchema)]),
      );
      for await (const _ of res.message) {
        // drain
      }
      assert.strictEqual(calls.length, 1);
      assert.strictEqual(calls[0].init.duplex, undefined);
      assert.ok(calls[0].init.body instanceof Uint8Array);
    });
  });

  describe("with gRPC-web transport", () => {
    const responseBody = concat(
      encodeEnvelope(
        0,
        toBinary(
          BidiStreamResponseSchema,
          create(BidiStreamResponseSchema, {
            payload: { data: new Uint8Array([1]) },
          }),
        ),
      ),
      encodeEnvelope(
        0,
        toBinary(
          BidiStreamResponseSchema,
          create(BidiStreamResponseSchema, {
            payload: { data: new Uint8Array([2]) },
          }),
        ),
      ),
      encodeEnvelope(
        trailerFlag,
        trailerSerialize(new Headers({ "grpc-status": "0" })),
      ),
    );
    it("should send bidi-streaming request messages as a ReadableStream", async () => {
      const { calls, fetch } = recordingFetch(
        responseBody,
        "application/grpc-web+proto",
      );
      const transport = createGrpcWebTransport({
        baseUrl: "https://example.com",
        fetch,
      });
      const res = await transport.stream(
        ConformanceService.method.bidiStream,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([
          create(BidiStreamRequestSchema, {
            requestData: new Uint8Array([1]),
          }),
          create(BidiStreamRequestSchema, {
            requestData: new Uint8Array([2]),
          }),
          create(BidiStreamRequestSchema, {
            requestData: new Uint8Array([3]),
          }),
        ]),
      );
      const received: Uint8Array[] = [];
      for await (const m of res.message) {
        received.push(m.payload?.data ?? new Uint8Array());
      }
      assert.deepStrictEqual(received, [
        new Uint8Array([1]),
        new Uint8Array([2]),
      ]);
      assert.strictEqual(calls.length, 1);
      assert.strictEqual(calls[0].init.duplex, "half");
      const sent = await parseRequestMessages(
        BidiStreamRequestSchema,
        calls[0].requestBody,
      );
      assert.deepStrictEqual(
        sent.map((m) => m.requestData),
        [new Uint8Array([1]), new Uint8Array([2]), new Uint8Array([3])],
      );
    });
  });

  describe("without support for streaming request bodies", () => {
    let originRequest: typeof Request;
    beforeEach(() => {
      originRequest = globalThis.Request;
      // Mimic a fetch implementation that ignores the duplex option, and
      // converts a ReadableStream body to a string.
      globalThis.Request = class extends originRequest {
        constructor(input: RequestInfo | URL, init?: RequestInit) {
          super(input, {
            ...init,
            body:
              init?.body instanceof ReadableStream
                ? "[object ReadableStream]"
                : init?.body,
          });
        }
      };
    });
    afterEach(() => {
      globalThis.Request = originRequest;
    });
    it("should raise an error for client-streaming calls", async () => {
      let fetchCalled = false;
      const transport = createConnectTransport({
        baseUrl: "https://example.com",
        fetch: () => {
          fetchCalled = true;
          return Promise.reject(new Error("unexpected call"));
        },
      });
      await assert.rejects(
        transport.stream(
          ConformanceService.method.clientStream,
          undefined,
          undefined,
          undefined,
          createAsyncIterable([create(ClientStreamRequestSchema)]),
        ),
        (err: unknown) => {
          assert.ok(err instanceof ConnectError);
          assert.strictEqual(err.code, Code.Unimplemented);
          assert.match(err.rawMessage, /streaming request bodies/);
          return true;
        },
      );
      assert.strictEqual(fetchCalled, false);
    });
    it("should still make server-streaming calls", async () => {
      const { calls, fetch } = recordingFetch(
        concat(
          encodeEnvelope(
            0,
            toBinary(
              ServerStreamResponseSchema,
              create(ServerStreamResponseSchema),
            ),
          ),
          encodeEnvelope(endStreamFlag, new TextEncoder().encode("{}")),
        ),
        "application/connect+proto",
      );
      const transport = createConnectTransport({
        baseUrl: "https://example.com",
        useBinaryFormat: true,
        fetch,
      });
      const res = await transport.stream(
        ConformanceService.method.serverStream,
        undefined,
        undefined,
        undefined,
        createAsyncIterable([create(ServerStreamRequestSchema)]),
      );
      for await (const _ of res.message) {
        // drain
      }
      assert.strictEqual(calls.length, 1);
    });
  });
});
