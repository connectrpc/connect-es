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
  decodeBinaryHeader,
  encodeBinaryHeader,
  makeCallbackClient,
  makePromiseClient,
} from "@bufbuild/connect-web";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { describeTransports } from "../util/describe-transports.js";
import { crosstestTransports } from "../util/crosstestserver.js";
import {
  SimpleRequest,
  SimpleResponse,
} from "../gen/grpc/testing/messages_pb.js";

describe("custom_metadata", function () {
  describeTransports(crosstestTransports, (transport) => {
    const size = 314159;
    const binaryValue = new Uint8Array([0xab, 0xab, 0xab]);
    const requestHeaders = {
      "x-grpc-test-echo-initial": "test_initial_metadata_value",
      "x-grpc-test-echo-trailing-bin": encodeBinaryHeader(binaryValue),
    };
    const req = new SimpleRequest({
      responseSize: size,
      payload: {
        body: new Uint8Array(271828).fill(0),
      },
    });
    function expectResponseSize(response: SimpleResponse) {
      expect(response.payload).toBeDefined();
      expect(response.payload?.body.length).toEqual(size);
    }
    function expectResponseHeaders(responseHeaders: Headers | undefined) {
      expect(responseHeaders?.get("x-grpc-test-echo-initial")).toBe(
        requestHeaders["x-grpc-test-echo-initial"]
      );
    }
    function expectResponseTrailers(responseTrailers: Headers | undefined) {
      const responseTrailerRaw = responseTrailers?.get(
        "x-grpc-test-echo-trailing-bin"
      );
      expect(responseTrailerRaw).toBeDefined();
      expect(responseTrailerRaw).not.toBeNull();
      if (responseTrailerRaw != null) {
        expect(decodeBinaryHeader(responseTrailerRaw)).toEqual(binaryValue);
      }
    }
    it("with promise client", async function () {
      const client = makePromiseClient(TestService, transport);
      let responseHeaders: Headers | undefined;
      let responseTrailers: Headers | undefined;
      const response = await client.unaryCall(req, {
        headers: requestHeaders,
        onHeader(header) {
          responseHeaders = header;
        },
        onTrailer(trailer) {
          responseTrailers = trailer;
        },
      });
      expectResponseSize(response);
      expectResponseHeaders(responseHeaders);
      expectResponseTrailers(responseTrailers);
    });
    it("with callback client", function (done) {
      const client = makeCallbackClient(TestService, transport);
      let responseHeaders: Headers | undefined;
      let responseTrailers: Headers | undefined;
      client.unaryCall(
        req,
        (err, response) => {
          expect(err).toBeUndefined();
          expectResponseSize(response);
          expectResponseHeaders(responseHeaders);
          expectResponseTrailers(responseTrailers);
          done();
        },
        {
          headers: requestHeaders,
          onHeader(header) {
            responseHeaders = header;
          },
          onTrailer(trailer) {
            responseTrailers = trailer;
          },
        }
      );
    });
  });
});
