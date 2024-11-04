// Copyright 2021-2024 The Connect Authors
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
  invokeWithCallbackClient,
  invokeWithPromiseClient,
  ClientCompatResponseSchema,
  ClientCompatRequestSchema,
  ClientErrorResultSchema,
} from "@connectrpc/connect-conformance";
import { createTransport } from "./transport.js";
import { create, fromBinary, toBinary } from "@bufbuild/protobuf";

declare global {
  interface Window {
    runTestCase: (
      data: number[],
      useCallbackClient: boolean,
    ) => Promise<number[]>;
  }
}

// This function is invoked by the browser.executeAsync call in client.ts
async function runTestCase(
  data: number[],
  useCallbackClient: boolean,
): Promise<number[]> {
  const req = fromBinary(ClientCompatRequestSchema, new Uint8Array(data));
  const p = document.createElement("p");
  p.innerText = req.testName;
  document.body.append(p);
  const res = create(ClientCompatResponseSchema, {
    testName: req.testName,
  });
  try {
    const transport = createTransport(req);
    const result = useCallbackClient
      ? await invokeWithCallbackClient(transport, req)
      : await invokeWithPromiseClient(transport, req);
    res.result = { case: "response", value: result };
  } catch (err) {
    res.result = {
      case: "error",
      value: create(ClientErrorResultSchema, {
        message: `Failed to run test case: ${String(err)}`,
      }),
    };
  }
  return Array.from(toBinary(ClientCompatResponseSchema, res));
}

window.runTestCase = runTestCase;
