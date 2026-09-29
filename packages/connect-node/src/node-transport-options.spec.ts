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

import { beforeEach, describe, it } from "node:test";
import * as assert from "node:assert";
import { createHash } from "node:crypto";
import * as http from "node:http";
import * as http2 from "node:http2";
import { createClient, createConnectRouter } from "@connectrpc/connect";
import type { Transport } from "@connectrpc/connect";
import { assertByteStreamRequest } from "@connectrpc/connect/protocol";
import type { UniversalClientFn } from "@connectrpc/connect/protocol";
import { createConnectTransport } from "./connect-transport.js";
import { createGrpcTransport } from "./grpc-transport.js";
import { createGrpcWebTransport } from "./grpc-web-transport.js";
import { validateNodeTransportOptions } from "./node-transport-options.js";
import type { NodeHttp2ClientSessionManager } from "./node-universal-client.js";
import {
  universalRequestFromNodeRequest,
  universalResponseToNodeResponse,
} from "./node-universal-handler.js";
import type {
  NodeServerRequest,
  NodeServerResponse,
} from "./node-universal-handler.js";
import { useNodeServer } from "./use-node-server-helper.spec.js";
import { ElizaService } from "./testdata/gen/connectrpc/eliza/v1/eliza_pb.js";

describe("validateNodeTransportOptions()", () => {
  for (const httpVersion of ["1.1", "2"] as const) {
    it(`should use the client returned by wrapHttpClient for HTTP ${httpVersion}`, () => {
      const wrapped: UniversalClientFn = () =>
        Promise.reject(new Error("not implemented"));
      const received: UniversalClientFn[] = [];
      const opt = validateNodeTransportOptions({
        httpVersion,
        baseUrl: "https://example.com",
        wrapHttpClient(httpClient) {
          received.push(httpClient);
          return wrapped;
        },
      });
      assert.strictEqual(received.length, 1);
      assert.notStrictEqual(received[0], wrapped);
      assert.strictEqual(opt.httpClient, wrapped);
      assert.strictEqual("wrapHttpClient" in opt, false);
    });
  }
  it("should pass a client that uses the given session manager to wrapHttpClient", async () => {
    const requests: string[] = [];
    const sessionManager: NodeHttp2ClientSessionManager = {
      authority: "https://example.com",
      request(method, path) {
        requests.push(`${method} ${path}`);
        return Promise.reject(new Error("no connection"));
      },
      notifyResponseByteRead() {
        //
      },
    };
    const received: UniversalClientFn[] = [];
    validateNodeTransportOptions({
      httpVersion: "2",
      baseUrl: "https://example.com",
      sessionManager,
      wrapHttpClient(httpClient) {
        received.push(httpClient);
        return httpClient;
      },
    });
    assert.strictEqual(received.length, 1);
    await assert.rejects(
      received[0]({
        url: "https://example.com/foo",
        method: "POST",
        header: new Headers(),
      }),
      /no connection/,
    );
    assert.deepStrictEqual(requests, ["POST /foo"]);
  });
});

describe("wrapHttpClient", () => {
  type WrapHttpClient = (httpClient: UniversalClientFn) => UniversalClientFn;

  // Test and server append to this log, so that tests can assert the order of
  // events on both sides.
  let log: string[] = [];
  // The server records the headers and the raw body bytes of each request.
  let serverRequests: { header: Headers; body: Uint8Array[] }[] = [];
  let firstMessageReceived = Promise.resolve();
  let resolveFirstMessageReceived: () => void = () => undefined;
  beforeEach(() => {
    log = [];
    serverRequests = [];
    firstMessageReceived = new Promise<void>((resolve) => {
      resolveFirstMessageReceived = resolve;
    });
  });

  const router = createConnectRouter();
  router.service(ElizaService, {
    say(req) {
      return { sentence: req.sentence };
    },
    async *introduce(req) {
      yield { sentence: req.name };
    },
    async *converse(requests) {
      for await (const req of requests) {
        log.push(`server receives ${req.sentence}`);
        resolveFirstMessageReceived();
        yield { sentence: req.sentence };
      }
    },
  });
  const uHandlers = new Map(router.handlers.map((h) => [h.requestPath, h]));

  function handleNodeRequest(req: NodeServerRequest, res: NodeServerResponse) {
    log.push("server receives headers");
    const uHandler = uHandlers.get(req.url ?? "");
    if (!uHandler) {
      res.writeHead(404);
      res.end();
      return;
    }
    const uReq = universalRequestFromNodeRequest(
      req,
      res,
      undefined,
      undefined,
    );
    assertByteStreamRequest(uReq);
    const body: Uint8Array[] = [];
    serverRequests.push({ header: uReq.header, body });
    void uHandler({ ...uReq, body: record(uReq.body, body) }).then((uRes) =>
      universalResponseToNodeResponse(uRes, res),
    );
  }

  // Reads the first chunk of the request body before it calls the wrapped
  // client, and adds a header with a digest of the chunk. The transports write
  // each message as one chunk, so this is the first message. Records every
  // chunk it passes on.
  function digestFirstChunk(sent: Uint8Array[]): WrapHttpClient {
    return (next) => async (req) => {
      assert.ok(req.body);
      const it = req.body[Symbol.asyncIterator]();
      const first = await it.next();
      assert.ok(first.done !== true);
      req.header.set("x-first-chunk-sha256", sha256(first.value));
      log.push("client sends headers");
      return next({
        ...req,
        body: record(
          (async function* () {
            yield first.value;
            for (
              let r = await it.next();
              r.done !== true;
              r = await it.next()
            ) {
              yield r.value;
            }
          })(),
          sent,
        ),
      });
    };
  }

  function assertServerReceivedAsSent(sent: Uint8Array[]) {
    assert.strictEqual(serverRequests.length, 1);
    const [received] = serverRequests;
    assert.strictEqual(
      received.header.get("x-first-chunk-sha256"),
      sha256(sent[0]),
    );
    assert.deepStrictEqual(Buffer.concat(received.body), Buffer.concat(sent));
  }

  function testTransport(
    createTransport: (baseUrl: string, wrap: WrapHttpClient) => Transport,
    getUrl: () => string,
    bidi: boolean,
  ) {
    it("should send a unary request through the returned client", async () => {
      const sent: Uint8Array[] = [];
      const client = createClient(
        ElizaService,
        createTransport(getUrl(), digestFirstChunk(sent)),
      );
      const res = await client.say({ sentence: "hello" });
      assert.strictEqual(res.sentence, "hello");
      assertServerReceivedAsSent(sent);
    });
    it("should send a server-streaming request through the returned client", async () => {
      const sent: Uint8Array[] = [];
      const client = createClient(
        ElizaService,
        createTransport(getUrl(), digestFirstChunk(sent)),
      );
      const sentences: string[] = [];
      for await (const res of client.introduce({ name: "hello" })) {
        sentences.push(res.sentence);
      }
      assert.deepStrictEqual(sentences, ["hello"]);
      assertServerReceivedAsSent(sent);
    });
    if (!bidi) {
      return;
    }
    it("should send headers when the returned client calls the wrapped client", async () => {
      const sent: Uint8Array[] = [];
      const client = createClient(
        ElizaService,
        createTransport(getUrl(), digestFirstChunk(sent)),
      );
      async function* input() {
        log.push("client yields 1");
        yield { sentence: "1" };
        // The second message only exists after the server received the first.
        await firstMessageReceived;
        log.push("client yields 2");
        yield { sentence: "2" };
      }
      const sentences: string[] = [];
      for await (const res of client.converse(input())) {
        sentences.push(res.sentence);
      }
      assert.deepStrictEqual(sentences, ["1", "2"]);
      assert.deepStrictEqual(log, [
        "client yields 1",
        "client sends headers",
        "server receives headers",
        "server receives 1",
        "client yields 2",
        "server receives 2",
      ]);
      assertServerReceivedAsSent(sent);
    });
  }

  describe("over HTTP/2", () => {
    const server = useNodeServer(() => http2.createServer(handleNodeRequest));
    describe("with the Connect transport", () => {
      testTransport(
        (baseUrl, wrapHttpClient) =>
          createConnectTransport({
            baseUrl,
            httpVersion: "2",
            idleConnectionTimeoutMs: 5,
            wrapHttpClient,
          }),
        () => server.getUrl(),
        true,
      );
    });
    describe("with the gRPC transport", () => {
      testTransport(
        (baseUrl, wrapHttpClient) =>
          createGrpcTransport({
            baseUrl,
            idleConnectionTimeoutMs: 5,
            wrapHttpClient,
          }),
        () => server.getUrl(),
        true,
      );
    });
    describe("with the gRPC-web transport", () => {
      testTransport(
        (baseUrl, wrapHttpClient) =>
          createGrpcWebTransport({
            baseUrl,
            httpVersion: "2",
            idleConnectionTimeoutMs: 5,
            wrapHttpClient,
          }),
        () => server.getUrl(),
        true,
      );
    });
  });

  describe("over HTTP/1.1", () => {
    const server = useNodeServer(() => http.createServer(handleNodeRequest));
    describe("with the Connect transport", () => {
      testTransport(
        (baseUrl, wrapHttpClient) =>
          createConnectTransport({
            baseUrl,
            httpVersion: "1.1",
            nodeOptions: { agent: new http.Agent({ keepAlive: false }) },
            wrapHttpClient,
          }),
        () => server.getUrl(),
        false,
      );
    });
    describe("with the gRPC-web transport", () => {
      testTransport(
        (baseUrl, wrapHttpClient) =>
          createGrpcWebTransport({
            baseUrl,
            httpVersion: "1.1",
            nodeOptions: { agent: new http.Agent({ keepAlive: false }) },
            wrapHttpClient,
          }),
        () => server.getUrl(),
        false,
      );
    });
  });
});

async function* record(
  iterable: AsyncIterable<Uint8Array>,
  chunks: Uint8Array[],
) {
  for await (const chunk of iterable) {
    chunks.push(chunk);
    yield chunk;
  }
}

function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}
