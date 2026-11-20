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
import { setImmediate } from "node:timers/promises";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";
import { createTransport } from "./transport.js";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import type {
  UniversalWebSocketClientFn,
  UniversalWebSocketClientRequest,
} from "../protocol/universal-websocket.js";

const TestService = createServiceDesc({
  typeName: "TestService",
  method: {
    unary: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "unary",
    },
    bidi: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "bidi_streaming",
    },
  },
});

interface FakeServer {
  protocol?: string;
  extensions?: string;
  messages?: (string | Uint8Array)[];
}

function createFakeClient(server: FakeServer = {}) {
  const requests: UniversalWebSocketClientRequest[] = [];
  const sent: (string | Uint8Array)[] = [];
  const closeCodes: number[] = [];
  const closeReasons: (string | undefined)[] = [];

  const webSocketClient: UniversalWebSocketClientFn = (request) => {
    requests.push(request);

    let end = (): void => {};
    const ended = new Promise<void>((resolve) => {
      end = resolve;
    });
    request.signal?.addEventListener("abort", end);

    async function* readMessages() {
      for (const message of server.messages ?? []) {
        yield message;
      }

      await ended;
    }

    return Promise.resolve({
      protocol: server.protocol ?? request.protocols[0],
      extensions: server.extensions ?? "",
      messages: readMessages(),
      closed: new Promise<number>(() => {}),
      send: (data) => {
        sent.push(data);
      },
      close: (closeCode, reason) => {
        closeCodes.push(closeCode);
        closeReasons.push(reason);
        end();
      },
    });
  };

  return { webSocketClient, requests, sent, closeCodes, closeReasons };
}

describe("createTransport()", () => {
  const options = {
    baseUrl: "https://example.com/api",
    useBinaryFormat: false,
  };

  function unary(fake: ReturnType<typeof createFakeClient>) {
    return createTransport({ ...options, ...fake }).unary(
      TestService.method.unary,
      undefined,
      undefined,
      undefined,
      { value: 1 },
    );
  }

  it("should reject a unary call with no message", async () => {
    const fake = createFakeClient({ messages: ["M[]", "S{}"] });

    await assert.rejects(
      unary(fake),
      (e) => e instanceof ConnectError && e.code === Code.Unimplemented,
    );
  });

  const invalidRequests: [string, string, HeadersInit][] = [
    ["a reserved header", options.baseUrl, { Cookie: "a=b" }],
    ["a base URL with another scheme", "ftp://example.com", {}],
  ];
  for (const [name, baseUrl, header] of invalidRequests) {
    it(`should not open a connection for ${name}`, async () => {
      const fake = createFakeClient();

      await assert.rejects(
        createTransport({ ...options, ...fake, baseUrl }).unary(
          TestService.method.unary,
          undefined,
          undefined,
          header,
          { value: 1 },
        ),
        (e) => e instanceof ConnectError && e.code === Code.Internal,
      );
      assert.strictEqual(fake.requests.length, 0);
    });
  }

  it("should close with 3102 when the request stream fails", async () => {
    const fake = createFakeClient({ messages: ["M[]"] });
    // biome-ignore lint/correctness/useYield: the stream fails before a message
    async function* failingRequests(): AsyncIterable<{ value: number }> {
      throw new ConnectError("failed", Code.Aborted);
    }
    const response = await createTransport({ ...options, ...fake }).stream(
      TestService.method.bidi,
      undefined,
      undefined,
      undefined,
      failingRequests(),
    );

    await assert.rejects(
      response.message[Symbol.asyncIterator]().next(),
      (e) => e instanceof ConnectError && e.code === Code.Aborted,
    );
    assert.deepStrictEqual(fake.sent, ["M[]"]);
    assert.deepStrictEqual(fake.closeCodes, [3102]);
  });

  it("should close with 3102 when the server selects another subprotocol", async () => {
    const fake = createFakeClient({ protocol: "" });

    await assert.rejects(
      unary(fake),
      (e) => e instanceof ConnectError && e.code === Code.Internal,
    );
    assert.deepStrictEqual(fake.closeCodes, [3102]);
    assert.deepStrictEqual(fake.closeReasons, [
      'protocol error: unexpected subprotocol ""',
    ]);
  });

  const sharedContextExtensions = [
    "permessage-deflate; server_no_context_takeover",
    "permessage-deflate; x=client_no_context_takeover/server_no_context_takeover",
    "x; client_no_context_takeover; server_no_context_takeover, permessage-deflate",
  ];
  for (const extensions of sharedContextExtensions) {
    it(`should close with 3102 for the extensions "${extensions}"`, async () => {
      const fake = createFakeClient({ extensions });

      await assert.rejects(
        unary(fake),
        (e) => e instanceof ConnectError && e.code === Code.Internal,
      );
      assert.deepStrictEqual(fake.closeCodes, [3102]);
    });
  }

  it("should accept compression without context takeover in any case", async () => {
    const fake = createFakeClient({
      extensions:
        "permessage-deflate; Client_No_Context_Takeover; server_no_context_takeover",
      messages: ["M[]", 'B"a"', "S{}"],
    });

    assert.strictEqual((await unary(fake)).message.value, "a");
  });

  const webSocketUrls: [string, string][] = [
    ["ws://example.com", "ws://example.com/TestService/Unary"],
    [
      "https://example.com/api/?key=a/b",
      "wss://example.com/api/TestService/Unary?key=a%2Fb&connect-timeout-ms=5000",
    ],
    [
      "https://example.com/api?connect-timeout-ms=1#fragment",
      "wss://example.com/api/TestService/Unary?connect-timeout-ms=5000",
    ],
  ];
  for (const [baseUrl, url] of webSocketUrls) {
    it(`should open ${url} for the base URL ${baseUrl}`, async () => {
      const fake = createFakeClient({ messages: ["M[]", 'B"a"', "S{}"] });
      await createTransport({ ...options, ...fake, baseUrl }).unary(
        TestService.method.unary,
        undefined,
        url.includes("?") ? 5000 : undefined,
        undefined,
        { value: 1 },
      );

      assert.strictEqual(fake.requests[0].url, url);
    });
  }

  it("should send nothing after the server ends the stream", async () => {
    let release = (): void => {};
    const released = new Promise<void>((resolve) => {
      release = resolve;
    });
    async function* requests() {
      yield { value: 1 };
      await released;
      yield { value: 2 };
    }
    const fake = createFakeClient({ messages: ["M[]", "S{}"] });
    const response = await createTransport({ ...options, ...fake }).stream(
      TestService.method.bidi,
      undefined,
      undefined,
      undefined,
      requests(),
    );
    for await (const _ of response.message) {
      // Reads to the end of the stream.
    }
    release();
    await setImmediate();

    assert.deepStrictEqual(fake.sent, ["M[]", "B1"]);
    assert.deepStrictEqual(fake.closeCodes, [1000]);
  });
});
