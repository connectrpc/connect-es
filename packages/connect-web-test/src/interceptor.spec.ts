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

import { baseUrl } from "./util/crosstestserver.js";
import type { ClientInterceptor } from "@bufbuild/connect-web";
import {
  createGrpcWebTransport,
  makePromiseClient,
} from "@bufbuild/connect-web";
import { TestService } from "./gen/grpc/testing/test_connectweb.js";

function makeLoggingInterceptor(
  name: string,
  log: string[]
): ClientInterceptor {
  return function (service, method, options, request, response) {
    return [
      {
        ...request,
        send(message, callback): void {
          log.push(`${name} sending request message`);
          request.send(message, callback);
        },
      },
      {
        ...response,
        receive(handler) {
          response.receive({
            onHeader(header) {
              log.push(`${name} response headers received`);
              handler.onHeader?.(header);
            },
            onMessage(message) {
              log.push(`${name} response message received`);
              handler.onMessage(message);
            },
            onTrailer(trailer) {
              log.push(`${name} response trailers received`);
              handler.onTrailer?.(trailer);
            },
            onClose(error) {
              log.push(`${name} response closed`);
              handler.onClose(error);
            },
          });
        },
      },
    ];
  };
}

describe("interceptors", function () {
  it("work with gRPC-web transport", async function () {
    const log: string[] = [];
    const transport = createGrpcWebTransport({
      baseUrl,
      interceptors: [
        makeLoggingInterceptor("outer", log),
        makeLoggingInterceptor("inner", log),
      ],
    });
    const client = makePromiseClient(TestService, transport);
    const asyncIterable = await client.streamingOutputCall({
      responseParameters: [
        {
          size: 1,
        },
      ],
    });
    for await (const _ of asyncIterable) {
      //
    }
    expect(log).toEqual([
      "outer sending request message",
      "inner sending request message",
      "inner response headers received",
      "outer response headers received",
      "inner response message received",
      "outer response message received",
      "inner response trailers received",
      "outer response trailers received",
      "inner response closed",
      "outer response closed",
    ]);
  });
});
