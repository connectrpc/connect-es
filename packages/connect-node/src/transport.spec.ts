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
import { create, toBinary } from "@bufbuild/protobuf";
import { useNodeServer } from "./use-node-server-helper.spec.js";
import * as http2 from "node:http2";
import type * as net from "node:net";
import { connectNodeAdapter } from "./connect-node-adapter.js";
import { Code, ConnectError, createClient } from "@connectrpc/connect";
import type { Transport } from "@connectrpc/connect";
import { createTransport as createGrpcTransport } from "@connectrpc/connect/protocol-grpc";
import { createTransport as createGrpcWebTransport } from "@connectrpc/connect/protocol-grpc-web";
import { validateNodeTransportOptions } from "./node-transport-options.js";
import {
  ElizaService,
  IntroduceResponseSchema,
  SayResponseSchema,
} from "./testdata/gen/connectrpc/eliza/v1/eliza_pb.js";

describe("Calls should fail on RST_STREAM no_error before trailers are received", () => {
  let firstMessage: ReturnType<typeof createCompleter<void>>;
  let rstStream: ReturnType<typeof createCompleter<void>>;
  beforeEach(() => {
    firstMessage = createCompleter<void>();
    rstStream = createCompleter<void>();
  });
  const adaptor = connectNodeAdapter({
    routes({ rpc }) {
      rpc(ElizaService.method.introduce, async function* () {
        yield { sentence: "foo" };
        // Notify to send rst stream after a message.
        firstMessage.resolve();
        // Wait for rst stream to be sent before returning.
        // If we return early it will create a race.
        await rstStream.promise;
      });
    },
  });
  const server = useNodeServer(() =>
    http2.createServer((request, response) => {
      adaptor(request, response);
      firstMessage.promise
        .then(() => {
          response.stream.close(0, () => rstStream.resolve());
        })
        .catch(assert.fail);
    }),
  );
  async function testRstStream(transport: Transport) {
    const client = createClient(ElizaService, transport);
    const iterator = client.introduce({ name: "1" })[Symbol.asyncIterator]();
    const first = await iterator.next();
    assert.ok(!first.done);
    assert.deepStrictEqual(
      first.value,
      create(IntroduceResponseSchema, { sentence: "foo" }),
    );
    await assert.rejects(iterator.next());
  }
  it("for gRPC Transport", async () => {
    await testRstStream(
      createGrpcTransport({
        ...validateNodeTransportOptions({
          httpVersion: "2",
          baseUrl: server.getUrl(),
        }),
        baseUrl: server.getUrl(),
        httpClient: server.getClient(),
      }),
    );
  });
  it("for gRPC-Web Transport", async () => {
    await testRstStream(
      createGrpcWebTransport({
        ...validateNodeTransportOptions({
          httpVersion: "2",
          baseUrl: server.getUrl(),
        }),
        baseUrl: server.getUrl(),
        httpClient: server.getClient(),
      }),
    );
  });
});

describe("gRPC unary calls against a server that resets the stream with NO_ERROR before the response completed", () => {
  // A serialized gRPC message envelope for the response of ElizaService.say
  function sayResponseEnvelope(): Buffer {
    const payload = toBinary(
      SayResponseSchema,
      create(SayResponseSchema, { sentence: "you said: hi" }),
    );
    const envelope = Buffer.alloc(5 + payload.byteLength);
    envelope.writeUInt8(0, 0); // no compression
    envelope.writeUInt32BE(payload.byteLength, 1);
    envelope.set(payload, 5);
    return envelope;
  }

  function assertResetError(e: unknown): boolean {
    assert.ok(e instanceof ConnectError, String(e));
    // Without the truncation guard in the http/2 client, the protocol layer
    // fails parsing the truncated body with the misleading errors
    // "[invalid_argument] protocol error: incomplete envelope", or
    // "[internal] protocol error: missing status".
    assert.doesNotMatch(e.message, /incomplete envelope|missing status/);
    assert.strictEqual(e.code, Code.Unavailable);
    assert.match(e.message, /before trailers were received/);
    return true;
  }

  describe("mid message", () => {
    let rawSocket: net.Socket | undefined;
    const server = useNodeServer(() => {
      const s = http2.createServer();
      s.on("connection", (socket: net.Socket) => {
        rawSocket = socket;
      });
      s.on("stream", (stream) => {
        const id = stream.id ?? 0;
        stream.respond({
          ":status": 200,
          "content-type": "application/grpc+proto",
        });
        // Cut the response off in the middle of the message envelope, then
        // reset the stream with NO_ERROR via a raw RST_STREAM frame, like a
        // proxy that loses the connection to the backend.
        stream.write(sayResponseEnvelope().subarray(0, 3), () => {
          setImmediate(() => rawSocket?.write(rstStreamNoError(id)));
        });
      });
      return s;
    });
    it("should fail with Code.Unavailable, not with a protocol error", async () => {
      const transport = createGrpcTransport({
        ...validateNodeTransportOptions({
          httpVersion: "2",
          baseUrl: server.getUrl(),
        }),
        baseUrl: server.getUrl(),
        httpClient: server.getClient(),
      });
      const client = createClient(ElizaService, transport);
      await assert.rejects(client.say({ sentence: "hi" }), assertResetError);
    });
  });

  describe("before trailers", () => {
    const server = useNodeServer(() =>
      http2.createServer().on("stream", (stream) => {
        stream.respond(
          {
            ":status": 200,
            "content-type": "application/grpc+proto",
          },
          { waitForTrailers: true },
        );
        // Send the complete message, but close with NO_ERROR while trailers
        // are still outstanding. This sends an RST_STREAM frame with code
        // NO_ERROR without the END_STREAM flag ever being sent.
        stream.write(sayResponseEnvelope(), () =>
          stream.close(http2.constants.NGHTTP2_NO_ERROR),
        );
      }),
    );
    it("should fail with Code.Unavailable, not with a protocol error", async () => {
      const transport = createGrpcTransport({
        ...validateNodeTransportOptions({
          httpVersion: "2",
          baseUrl: server.getUrl(),
        }),
        baseUrl: server.getUrl(),
        httpClient: server.getClient(),
      });
      const client = createClient(ElizaService, transport);
      await assert.rejects(client.say({ sentence: "hi" }), assertResetError);
    });
  });
});

describe("gRPC unary calls against a server that responds with an HTTP error and no trailers", () => {
  const server = useNodeServer(() =>
    http2.createServer().on("stream", (stream) => {
      // A proxy or middlebox may answer with a plain HTTP error - a response
      // body ended with the END_STREAM flag, no gRPC trailers. The HTTP
      // status error must surface, not the missing-trailers guard in the
      // http/2 client.
      stream.respond({ ":status": 404, "content-type": "text/html" });
      stream.end("<html>not found</html>");
    }),
  );
  it("should fail with the HTTP status error, not with Code.Unavailable", async () => {
    const transport = createGrpcTransport({
      ...validateNodeTransportOptions({
        httpVersion: "2",
        baseUrl: server.getUrl(),
      }),
      baseUrl: server.getUrl(),
      httpClient: server.getClient(),
    });
    const client = createClient(ElizaService, transport);
    await assert.rejects(client.say({ sentence: "hi" }), (e: unknown) => {
      assert.ok(e instanceof ConnectError, String(e));
      assert.strictEqual(e.code, Code.Unimplemented);
      assert.match(e.message, /HTTP 404/);
      assert.doesNotMatch(e.message, /trailers/);
      return true;
    });
  });
});

/**
 * Returns a serialized RST_STREAM frame with error code NO_ERROR (0x0) for
 * the given stream, see https://www.rfc-editor.org/rfc/rfc9113#name-rst_stream
 */
function rstStreamNoError(streamId: number): Buffer {
  const frame = Buffer.alloc(13);
  frame.writeUIntBE(4, 0, 3); // payload length
  frame.writeUInt8(0x03, 3); // frame type RST_STREAM
  frame.writeUInt8(0, 4); // flags
  frame.writeUInt32BE(streamId, 5); // stream id
  frame.writeUInt32BE(0, 9); // error code NO_ERROR
  return frame;
}

function createCompleter<T>() {
  let resolve: (_: T | PromiseLike<T>) => void;
  let reject: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    // biome-ignore lint/style/noNonNullAssertion: acceptable in test
    resolve: resolve!,
    // biome-ignore lint/style/noNonNullAssertion: acceptable in test
    reject: reject!,
  };
}
