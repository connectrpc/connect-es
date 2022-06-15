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

import { TestService } from "../gen/testing/v1/test_connectweb.js";
import { Code, ConnectError, makePromiseClient } from "@bufbuild/connect-web";
import { describeTransports } from "../util/describe-transports.js";
import { temptestserverTransports } from "./temptestserver.js";

describeTransports(temptestserverTransports, (transport) => {
  const client = makePromiseClient(TestService, transport);
  it("serverStreamingHappy", async () => {
    const want = ["123", "124", "125", "126", "127"];
    const got: string[] = [];
    const request = {
      value: 123,
    };
    for await (const response of await client.serverStreamingHappy(request)) {
      got.push(response.value);
    }
    expect(got).toEqual(want);
  });
  it("serverStreamingError", async () => {
    const request = {
      value: 123,
    };
    let responseMessageCount = 0;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we need const _response for for await
      for await (const _response of await client.serverStreamingError(
        request
      )) {
        responseMessageCount++;
      }
    } catch (e) {
      if (e instanceof ConnectError) {
        expect(e.code).toBe(Code.AlreadyExists);
        expect(e.rawMessage).toBe(
          "\t\ntest with whitespace\r\nand Unicode BMP ☺ and non-BMP 😈\t\n"
        );
      } else {
        fail();
      }
    }
    expect(responseMessageCount).toBe(0);
  });
  it("serverStreamingEmpty", async () => {
    const request = {
      value: 123,
    };
    let responseMessageCount = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we need const _response for for await
    for await (const _response of await client.serverStreamingEmpty(request)) {
      responseMessageCount++;
    }
    expect(responseMessageCount).toBe(0);
  });
  it("serverStreamingUnimplemented", async () => {
    try {
      await client.serverStreamingUnimplemented({});
    } catch (e) {
      if (e instanceof ConnectError) {
        expect(e.code).toBe(Code.Unimplemented);
      } else {
        fail();
      }
    }
  });
});
