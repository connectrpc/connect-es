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
  createCallbackClient,
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { ElizaService } from "../gen/buf/connect/demo/eliza/v1/eliza_connectweb.js";

const timeoutMs = 15000;

describe("eliza", () => {
  const transport = createConnectTransport({
    baseUrl: "https://demo.connect.build",
  });
  it(
    "say()",
    async () => {
      const client = createPromiseClient(ElizaService, transport);
      const res = await client.say({ sentence: "I feel happy." });
      expect(typeof res.sentence).toBe("string");
    },
    timeoutMs
  );
  it(
    "introduce()",
    (done) => {
      // We do not use for await because esbuild is unable to transpile down
      const client = createCallbackClient(ElizaService, transport);
      let receivedMessages = 0;
      client.introduce(
        { name: "Browser" },
        (res) => {
          expect(res.sentence.length > 0).toBe(true);
          receivedMessages++;
        },
        (err) => {
          expect(err).toBeUndefined();
          expect(receivedMessages > 3).toBe(true);
          done();
        }
      );
    },
    timeoutMs
  );
});
