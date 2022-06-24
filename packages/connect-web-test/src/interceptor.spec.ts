// Copyright 2021-2022 Buf Technologies, Inc.
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

import { crosstestTransports } from "./helpers/crosstestserver.js";
import {
  encodeBinaryHeader,
  createCallbackClient,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { TestService } from "./gen/grpc/testing/test_connectweb.js";
import type { Interceptor } from "@bufbuild/connect-web";
import { listHeaderKeys } from "./helpers/list-header-keys.js";
import { StreamingOutputCallRequest } from "./gen/grpc/testing/messages_pb.js";
import type { CallOptions } from "@bufbuild/connect-web";

function makeLoggingInterceptor(name: string, log: string[]): Interceptor {
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
  ];
  return (next) => async (req) => {
    log.push(`${name} sending request message`);
    const res = await next(req);
    const headerKeys = listHeaderKeys(res.header)
      .filter((value) => !fieldsToIgnore.includes(value))
      .join(", ");
    log.push(`${name} response received with headers: ${headerKeys}`);
    if (res.stream) {
      return {
        ...res,
        async read() {
          const r = await res.read();
          if (!r.done) {
            log.push(`${name} response stream received message`);
          } else {
            const trailerKeys = listHeaderKeys(res.trailer)
              .filter((value) => !fieldsToIgnore.includes(value))
              .join(", ");
            log.push(
              `${name} response stream done with trailers: ${trailerKeys}`
            );
          }
          return r;
        },
      };
    } else {
      const trailerKeys = listHeaderKeys(res.trailer)
        .filter((value) => !fieldsToIgnore.includes(value))
        .join(", ");
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
        new Uint8Array([0xab, 0xab, 0xab])
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
  for (const [name, transportFactory] of Object.entries(crosstestTransports)) {
    it(`via ${name} and promise client`, async () => {
      const log: string[] = [];
      const client = createPromiseClient(
        TestService,
        transportFactory({
          interceptors: [
            makeLoggingInterceptor("outer", log),
            makeLoggingInterceptor("inner", log),
          ],
        })
      );
      await client.unaryCall(
        {
          responseSize: 314159,
          payload: {
            body: new Uint8Array(271828).fill(0),
          },
        },
        options
      );
      expect(log).toEqual(wantLog);
    });
    it(`via ${name} and callback client`, (done) => {
      const log: string[] = [];
      const client = createCallbackClient(
        TestService,
        transportFactory({
          interceptors: [
            makeLoggingInterceptor("outer", log),
            makeLoggingInterceptor("inner", log),
          ],
        })
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
        options
      );
    });
  }
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
        new Uint8Array([0xab, 0xab, 0xab])
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
  for (const [name, transportFactory] of Object.entries(crosstestTransports)) {
    it(`via ${name} and promise client`, async () => {
      const log: string[] = [];
      const transport = transportFactory({
        interceptors: [
          makeLoggingInterceptor("outer", log),
          makeLoggingInterceptor("inner", log),
        ],
      });
      const client = createPromiseClient(TestService, transport);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _response of client.streamingOutputCall(
        request,
        options
      )) {
        //
      }
      expect(log).toEqual(wantLog);
    });
    it(`via ${name} and callback client`, (done) => {
      const log: string[] = [];
      const transport = transportFactory({
        interceptors: [
          makeLoggingInterceptor("outer", log),
          makeLoggingInterceptor("inner", log),
        ],
      });
      const client = createCallbackClient(TestService, transport);
      client.streamingOutputCall(
        request,
        () => void 0,
        () => {
          expect(log).toEqual(wantLog);
          done();
        },
        options
      );
    });
  }
});
