// Copyright 2021-2024 The Connect Authors
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

/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { create } from "@bufbuild/protobuf";
import { useNodeServer } from "./use-node-server-helper.spec.js";
import * as http2 from "node:http2";
import { connectNodeAdapter } from "./connect-node-adapter.js";
import { createPromiseClient } from "@connectrpc/connect";
import type { Transport } from "@connectrpc/connect";
import { createTransport as createGrpcTransport } from "@connectrpc/connect/protocol-grpc";
import { createTransport as createGrpcWebTransport } from "@connectrpc/connect/protocol-grpc-web";
import { validateNodeTransportOptions } from "./node-transport-options.js";
import {
  ElizaService,
  IntroduceResponseSchema,
} from "./testdata/gen/connectrpc/eliza/v1/eliza_pb.js";

describe("Calls should fail with code internal on RST_STREAM no_error before trailers are received", function () {
  let firstMessage: ReturnType<typeof createCompleter<void>>;
  let rstStream: ReturnType<typeof createCompleter<void>>;
  beforeEach(function () {
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
        .catch(fail);
    }),
  );
  async function testRstStream(transport: Transport) {
    const client = createPromiseClient(ElizaService, transport);
    const it = client.introduce({ name: "1" })[Symbol.asyncIterator]();
    const first = await it.next();
    expect(first.done).toBeFalse();
    expect(first.value).toEqual(
      create(IntroduceResponseSchema, { sentence: "foo" }),
    );
    await expectAsync(it.next()).toBeRejected();
  }
  it("for gRPC Transport", async function () {
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
  it("for gRPC Transport", async function () {
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

function createCompleter<T>() {
  let resolve: (_: T | PromiseLike<T>) => void;
  let reject: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}
