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

import type {
  CallOptions,
  Interceptor,
  StreamResponse,
} from "@connectrpc/connect";
import {
  createCallbackClient,
  createPromiseClient,
  encodeBinaryHeader,
} from "@connectrpc/connect";
import { TestService } from "./gen/connectrpc/conformance/v1/test_connect.js";
import { StreamingOutputCallRequest } from "./gen/connectrpc/conformance/v1/messages_pb.js";
import { describeTransports } from "./helpers/crosstestserver.js";

function makeLoggingInterceptor(name: string, log: string[]): Interceptor {
  /**
   * Return all keys of a Headers object, without needing
   * DOM.iterable for Headers.keys().
   */
  function listHeaderKeys(header: Headers): string[] {
    const fieldsToIgnore = [
      "access-control-allow-origin",
      "access-control-expose-headers",
      "connect-accept-encoding",
      "grpc-accept-encoding",
      "grpc-message",
      "grpc-status",
      "content-type",
      "date",
      "transfer-encoding",
      "vary",
      "accept-encoding",
      "content-encoding",
      "content-length",
      "connection",
      "keep-alive",
      "access-control-allow-headers",
      "access-control-allow-methods",
      "access-control-max-age",
      "request-protocol",
    ];
    const keys: string[] = [];
    header.forEach((_, key) => {
      if (!fieldsToIgnore.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }

  async function* logStream(res: StreamResponse) {
    for await (const m of res.message) {
      log.push(`${name} response stream received message`);
      yield m;
    }
    yield* res.message;
    log.push(
      `${name} response stream done with trailers: ${listHeaderKeys(
        res.trailer,
      ).join(", ")}`,
    );
  }

  return (next) => async (req) => {
    log.push(`${name} sending request message`);
    const res = await next(req);
    const headerKeys = listHeaderKeys(res.header).join(", ");
    log.push(`${name} response received with headers: ${headerKeys}`);
    if (res.stream) {
      return {
        ...res,
        message: logStream(res),
      };
    } else {
      const trailerKeys = listHeaderKeys(res.trailer).join(", ");
      log.push(`${name} response done with trailers: ${trailerKeys}`);
    }
    return res;
  };
}

describe("unary interceptors", () => {
  const options: CallOptions = {
    headers: {
      "x-grpc-test-echo-initial": "test_initial_metadata_value",
      "x-grpc-test-echo-trailing-bin": encodeBinaryHeader(
        new Uint8Array([0xab, 0xab, 0xab]),
      ),
    },
  };
  const wantLog = [
    "outer sending request message",
    "inner sending request message",
    "inner response received with headers: x-grpc-test-echo-initial",
    "inner response done with trailers: x-grpc-test-echo-trailing-bin",
    "outer response received with headers: x-grpc-test-echo-initial",
    "outer response done with trailers: x-grpc-test-echo-trailing-bin",
  ] as const;

  describeTransports((transport) => {
    it("with promise client", async () => {
      const log: string[] = [];
      const client = createPromiseClient(
        TestService,
        transport({
          interceptors: [
            makeLoggingInterceptor("outer", log),
            makeLoggingInterceptor("inner", log),
          ],
        }),
      );
      await client.unaryCall(
        {
          responseSize: 314159,
          payload: {
            body: new Uint8Array(271828).fill(0),
          },
        },
        options,
      );
      expect(log).toEqual(wantLog);
    });
    it("with callback client", (done) => {
      const log: string[] = [];
      const client = createCallbackClient(
        TestService,
        transport({
          interceptors: [
            makeLoggingInterceptor("outer", log),
            makeLoggingInterceptor("inner", log),
          ],
        }),
      );
      client.unaryCall(
        {
          responseSize: 314159,
          payload: {
            body: new Uint8Array(271828).fill(0),
          },
        },
        () => {
          expect(log).toEqual(wantLog);
          done();
        },
        options,
      );
    });
  });
});

describe("server stream interceptors", () => {
  const sizes = [2, 4, 8, 16, 32];
  const request = new StreamingOutputCallRequest({
    responseParameters: sizes.map((size, index) => ({
      size,
      intervalUs: index * 10,
    })),
  });
  const options: CallOptions = {
    headers: {
      "x-grpc-test-echo-initial": "test_initial_metadata_value",
      "x-grpc-test-echo-trailing-bin": encodeBinaryHeader(
        new Uint8Array([0xab, 0xab, 0xab]),
      ),
    },
  };
  const wantLog = [
    "outer sending request message",
    "inner sending request message",
    "inner response received with headers: x-grpc-test-echo-initial",
    "outer response received with headers: x-grpc-test-echo-initial",
    "inner response stream received message",
    "outer response stream received message",
    "inner response stream received message",
    "outer response stream received message",
    "inner response stream received message",
    "outer response stream received message",
    "inner response stream received message",
    "outer response stream received message",
    "inner response stream received message",
    "outer response stream received message",
    "inner response stream done with trailers: x-grpc-test-echo-trailing-bin",
    "outer response stream done with trailers: x-grpc-test-echo-trailing-bin",
  ] as const;
  describeTransports((transport) => {
    it("with promise client", async () => {
      const log: string[] = [];
      const t = transport({
        interceptors: [
          makeLoggingInterceptor("outer", log),
          makeLoggingInterceptor("inner", log),
        ],
      });
      const client = createPromiseClient(TestService, t);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _response of client.streamingOutputCall(
        request,
        options,
      )) {
        //
      }
      expect(log).toEqual(wantLog);
    });
    it("with callback client", (done) => {
      const log: string[] = [];
      const t = transport({
        interceptors: [
          makeLoggingInterceptor("outer", log),
          makeLoggingInterceptor("inner", log),
        ],
      });
      const client = createCallbackClient(TestService, t);
      client.streamingOutputCall(
        request,
        () => void 0,
        () => {
          expect(log).toEqual(wantLog);
          done();
        },
        options,
      );
    });
  });
});
