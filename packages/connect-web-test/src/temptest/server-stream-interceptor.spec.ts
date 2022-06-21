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

import {
  createConnectTransport,
  makeCallbackClient,
  makePromiseClient,
} from "@bufbuild/connect-web";
import {
  temptestserverBaseUrl,
  temptestserverTransports,
} from "./temptestserver.js";
import { TestService } from "../gen/testing/v1/test_connectweb.js";
import { ServerStreamingHappyRequest } from "../gen/testing/v1/test_pb.js";
import type { Interceptor } from "@bufbuild/connect-web";
import { listHeaderKeys } from "../util/list-header-keys.js";

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
    }
    return res;
  };
}

const wantLog = [
  "outer sending request message",
  "inner sending request message",
  "inner response received with headers: joined-values-head, separate-values-head, single-value-head",
  "outer response received with headers: joined-values-head, separate-values-head, single-value-head",
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
  "inner response stream done with trailers: joined-values, separate-values, single-value",
  "outer response stream done with trailers: joined-values, separate-values, single-value",
] as const;

const req = new ServerStreamingHappyRequest({
  value: 123,
});

describe("server stream interceptors", () => {
  for (const [name, transportFactory] of Object.entries(
    temptestserverTransports
  )) {
    it(`via ${name} and promise client`, async () => {
      const log: string[] = [];
      const transport = transportFactory({
        interceptors: [
          makeLoggingInterceptor("outer", log),
          makeLoggingInterceptor("inner", log),
        ],
      });
      const client = makePromiseClient(TestService, transport);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _response of await client.serverStreamingHappy(req)) {
        //
      }
      expect(log).toEqual(wantLog);
    });
    it(`via ${name} and callback client`, (done) => {
      const log: string[] = [];
      const transport = createConnectTransport({
        baseUrl: temptestserverBaseUrl,
        interceptors: [
          makeLoggingInterceptor("outer", log),
          makeLoggingInterceptor("inner", log),
        ],
      });
      const client = makeCallbackClient(TestService, transport);
      client.serverStreamingHappy(
        req,
        () => void 0,
        () => {
          expect(log).toEqual(wantLog);
          done();
        }
      );
    });
  }
});
