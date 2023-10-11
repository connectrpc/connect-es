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

import {
  createCallbackClient,
  createPromiseClient,
  decodeBinaryHeader,
  encodeBinaryHeader,
} from "@bufbuild/connect";
import { TestService } from "../gen/connectrpc/conformance/v1/test_connect.js";
import {
  StreamingOutputCallRequest,
  StreamingOutputCallResponse,
} from "../gen/connectrpc/conformance/v1/messages_pb.js";
import { createTestServers } from "../helpers/testserver.js";
import { interop } from "../helpers/interop.js";

describe("custom_metadata_server_streaming", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransports((transport) => {
    const size = 314159;
    const binaryValue = new Uint8Array([0xab, 0xab, 0xab]);
    const requestHeaders = {
      [interop.leadingMetadataKey]: "test_initial_metadata_value",
      [interop.trailingMetadataKey]: encodeBinaryHeader(binaryValue),
    };
    const request = new StreamingOutputCallRequest({
      responseParameters: [{ size }],
    });
    function expectResponseSize(response: StreamingOutputCallResponse) {
      expect(response.payload).toBeDefined();
      expect(response.payload?.body.length).toEqual(size);
    }
    function expectResponseHeaders(responseHeaders: Headers | undefined) {
      const want = requestHeaders[interop.leadingMetadataKey];
      const got = responseHeaders?.get(interop.leadingMetadataKey);
      expect(got).toBe(want);
    }
    function expectResponseTrailers(responseTrailers: Headers | undefined) {
      const gotRaw = responseTrailers?.get(interop.trailingMetadataKey);
      expect(gotRaw).toBeDefined();
      expect(gotRaw).not.toBeNull();
      if (gotRaw != null) {
        expect(decodeBinaryHeader(gotRaw)).toEqual(binaryValue);
      }
    }
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
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
      const client = createCallbackClient(TestService, transport());
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

  afterAll(async () => await servers.stop());
});
