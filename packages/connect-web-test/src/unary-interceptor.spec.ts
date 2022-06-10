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

import { baseUrl, crosstestTransports } from "./util/crosstestserver.js";
import type { UnaryInterceptor } from "@bufbuild/connect-web";
import {
  createConnectTransport,
  makePromiseClient,
} from "@bufbuild/connect-web";
import { SimpleRequest } from "./gen/grpc/testing/messages_pb.js";
import { TestService } from "./gen/grpc/testing/test_connectweb.js";
import { makeCallbackClient } from "@bufbuild/connect-web";

function makeLoggingInterceptor(name: string, log: string[]): UnaryInterceptor {
  return (next) => async (req) => {
    log.push(`${name} sending request message`);
    const res = await next(req);
    log.push(`${name} response received`);
    return res;
  };
}

describe("unary interceptors", () => {
  for (const [name, transportFactory] of Object.entries(crosstestTransports)) {
    it(`via ${name} and promise client`, async () => {
      const log: string[] = [];
      const client = makePromiseClient(
        TestService,
        transportFactory([
          makeLoggingInterceptor("outer", log),
          makeLoggingInterceptor("inner", log),
        ])
      );
      await client.unaryCall({
        responseSize: 314159,
        payload: {
          body: new Uint8Array(271828).fill(0),
        },
      });
      expect(log).toEqual([
        "outer sending request message",
        "inner sending request message",
        "inner response received",
        "outer response received",
      ]);
    });
    it(`via ${name} and callback client`, () => {
      const log: string[] = [];
      const client = makeCallbackClient(
        TestService,
        transportFactory([
          makeLoggingInterceptor("outer", log),
          makeLoggingInterceptor("inner", log),
        ])
      );
      client.unaryCall(
        {
          responseSize: 314159,
          payload: {
            body: new Uint8Array(271828).fill(0),
          },
        },
        () => {
          expect(log).toEqual([
            "outer sending request message",
            "inner sending request message",
            "inner response received",
            "outer response received",
          ]);
        }
      );
    });
  }
});

describe("unary interceptors", function () {
  const req = new SimpleRequest({
    responseSize: 314159,
    payload: {
      body: new Uint8Array(271828).fill(0),
    },
  });
  it("work with Connect transport", async function () {
    const log: string[] = [];
    const transport = createConnectTransport({
      baseUrl,
      unaryInterceptors: [
        makeLoggingInterceptor("outer", log),
        makeLoggingInterceptor("inner", log),
      ],
    });
    const client = makePromiseClient(TestService, transport);
    await client.unaryCall(req);
    expect(log).toEqual([
      "outer sending request message",
      "inner sending request message",
      "inner response received",
      "outer response received",
    ]);
  });
});
