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

import { connectNodeH1BaseUrl } from "./helpers/crosstestserver.js";
import { TestService } from "./gen/grpc/testing/test_connect.js";
import { SimpleRequest } from "./gen/grpc/testing/messages_pb.js";
import { createConnectTransport } from "@bufbuild/connect-web";

describe("custom fetch", function () {
  describe("with Connect transport", () => {
    let result: Response;

    const customFetch = async (
      input: RequestInfo | URL,
      init?: RequestInit | undefined
    ) => {
      result = await fetch(input, init);
      spyOn(result, "arrayBuffer").and.callThrough();
      spyOn(result, "json").and.callThrough();
      return result;
    };
    const request = new SimpleRequest({
      responseSize: 1,
      payload: {
        body: new Uint8Array(1).fill(0),
      },
    });
    it("should only call Response#json with the JSON format", async function () {
      const transport = createConnectTransport({
        fetch: customFetch,
        baseUrl: connectNodeH1BaseUrl,
      });
      await transport.unary(
        TestService,
        TestService.methods.unaryCall,
        undefined,
        undefined,
        undefined,
        request
      );
      expect(result.json).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(result.arrayBuffer).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
    });
    it("should only call Response#arrayBuffer with the binary format", async function () {
      const transport = createConnectTransport({
        fetch: customFetch,
        baseUrl: connectNodeH1BaseUrl,
        useBinaryFormat: true,
      });
      await transport.unary(
        TestService,
        TestService.methods.unaryCall,
        undefined,
        undefined,
        undefined,
        request
      );
      expect(result.json).toHaveBeenCalledTimes(0); // eslint-disable-line @typescript-eslint/unbound-method
      expect(result.arrayBuffer).toHaveBeenCalledTimes(1); // eslint-disable-line @typescript-eslint/unbound-method
    });
  });
});
