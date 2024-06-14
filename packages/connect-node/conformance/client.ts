#!/usr/bin/env -S npx tsx

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
  invokeWithPromiseClient,
  ClientCompatRequestSchema,
  ClientCompatResponseSchema,
  ClientErrorResultSchema,
  readSizeDelimitedBuffers,
  writeSizeDelimitedBuffer,
} from "@connectrpc/connect-conformance";
import { createTransport } from "./transport.js";
import { create, fromBinary, toBinary } from "@bufbuild/protobuf";

void main();

/**
 * This program implements a client under test for the connect conformance test
 * runner. It reads ClientCompatRequest messages from stdin. For each request,
 * it makes a call, and reports the result with a ClientCompatResponse message
 * to stdout.
 */
async function main() {
  for await (const next of readSizeDelimitedBuffers(process.stdin)) {
    const req = fromBinary(ClientCompatRequestSchema, next);
    const res = create(ClientCompatResponseSchema, {
      testName: req.testName,
    });
    try {
      const invokeResult = await invokeWithPromiseClient(
        createTransport(req),
        req,
      );
      res.result = { case: "response", value: invokeResult };
    } catch (e) {
      res.result = {
        case: "error",
        value: create(ClientErrorResultSchema, {
          message: (e as Error).message,
        }),
      };
    }
    process.stdout.write(
      writeSizeDelimitedBuffer(toBinary(ClientCompatResponseSchema, res)),
    );
  }
}
