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
  createCallbackClient,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { legacyDescribeTransports } from "../helpers/legacy-describe-transports.js";
import { legacyCrosstestTransports } from "../helpers/legacy-crosstestserver.js";
import {
  StreamingOutputCallRequest,
  StreamingOutputCallResponse,
} from "../gen/grpc/testing/messages_pb.js";

describe("custom_metadata_server_streaming", function () {
  legacyDescribeTransports(legacyCrosstestTransports, (transport) => {
    const size = 314159;
    const binaryValue = new Uint8Array([0xab, 0xab, 0xab]);
    const requestHeaders = {
      "x-grpc-test-echo-initial": "test_initial_metadata_value",
      "x-grpc-test-echo-trailing-bin": encodeBinaryHeader(binaryValue),
    };
    const request = new StreamingOutputCallRequest({
      responseParameters: [{ size }],
    });
    function expectResponseSize(response: StreamingOutputCallResponse) {
      expect(response.payload).toBeDefined();
      expect(response.payload?.body.length).toEqual(size);
    }
    function expectResponseHeaders(responseHeaders: Headers | undefined) {
      const want = requestHeaders["x-grpc-test-echo-initial"];
      const got = responseHeaders?.get("x-grpc-test-echo-initial");
      expect(got).toBe(want);
    }
    function expectResponseTrailers(responseTrailers: Headers | undefined) {
      const gotRaw = responseTrailers?.get("x-grpc-test-echo-trailing-bin");
      expect(gotRaw).toBeDefined();
      expect(gotRaw).not.toBeNull();
      if (gotRaw != null) {
        expect(decodeBinaryHeader(gotRaw)).toEqual(binaryValue);
      }
    }
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport);
      let responseHeaders: Headers | undefined;
      let responseTrailers: Headers | undefined;
      for await (const response of client.streamingOutputCall(request, {
        headers: requestHeaders,
        onHeader(header) {
          responseHeaders = header;
        },
        onTrailer(trailer) {
          responseTrailers = trailer;
        },
      })) {
        expectResponseSize(response);
      }
      expectResponseHeaders(responseHeaders);
      expectResponseTrailers(responseTrailers);
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport);
      let responseHeaders: Headers | undefined;
      let responseTrailers: Headers | undefined;
      client.streamingOutputCall(
        request,
        (response) => {
          expectResponseSize(response);
        },
        (err) => {
          expect(err).toBeUndefined();
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
