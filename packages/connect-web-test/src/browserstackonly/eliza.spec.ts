// Copyright 2021-2023 The Connect Authors
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

import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ElizaService } from "../gen/connectrpc/eliza/v1/eliza_connect.js";
import { IntroduceRequest } from "../gen/connectrpc/eliza/v1/eliza_pb.js";

const timeoutMs = 15000;

describe("eliza", () => {
  const transport = createConnectTransport({
    baseUrl: "https://demo.connectrpc.com",
  });
  it(
    "say()",
    async () => {
      const client = createPromiseClient(ElizaService, transport);
      const res = await client.say({ sentence: "I feel happy." });
      expect(typeof res.sentence).toBe("string");
    },
    timeoutMs,
  );
  it(
    "introduce()",
    async () => {
      const client = createPromiseClient(ElizaService, transport);
      const request = new IntroduceRequest({
        name: "Browser",
      });
      let receivedMessages = 0;
      for await (const response of client.introduce(request)) {
        expect(response.sentence.length > 0).toBe(true);
        receivedMessages++;
      }
      expect(receivedMessages > 3).toBe(true);
    },
    timeoutMs,
  );
});
