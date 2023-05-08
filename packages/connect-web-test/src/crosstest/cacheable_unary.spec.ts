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

import { createCallbackClient, createPromiseClient } from "@bufbuild/connect";
import type { Interceptor } from "@bufbuild/connect";
import { TestService } from "../gen/grpc/testing/test_connect.js";
import { describeTransports } from "../helpers/crosstestserver.js";
import { SimpleRequest } from "../gen/grpc/testing/messages_pb.js";

const ensureGetRequest: Interceptor = (next) => async (req) => {
  const res = await next(req);
  expect(res.header.has("request-protocol")).toBeTrue();
  if (res.header.get("request-protocol") === "connect") {
    expect(res.header.has("get-request")).toBeTrue();
  }
  return res;
};

describe("cacheable_unary", function () {
  describeTransports((transportFactory) => {
    const request = new SimpleRequest({
      responseSize: 1,
      payload: {
        body: new Uint8Array(1).fill(0),
      },
    });
    it("with promise client", async function () {
      const transport = transportFactory({
        useHttpGet: true,
        interceptors: [ensureGetRequest],
      });
      const client = createPromiseClient(TestService, transport);
      const response = await client.cacheableUnaryCall(request);
      expect(response.payload).toBeDefined();
      expect(response.payload?.body.length).toEqual(request.responseSize);
    });
    it("with callback client", function (done) {
      const transport = transportFactory({
        useHttpGet: true,
        interceptors: [ensureGetRequest],
      });
      const client = createCallbackClient(TestService, transport);
      client.cacheableUnaryCall(request, (err, response) => {
        expect(err).toBeUndefined();
        expect(response.payload).toBeDefined();
        expect(response.payload?.body.length).toEqual(request.responseSize);
        done();
      });
    });
  });
});
