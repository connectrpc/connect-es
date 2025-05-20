// Copyright 2021-2025 The Connect Authors
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
  ClientCompatRequestSchema,
  ClientCompatResponseSchema,
  ClientErrorResultSchema,
  readSizeDelimitedBuffers,
  writeSizeDelimitedBuffer,
} from "@connectrpc/connect-conformance";
import {
  createConnectTransport,
  createGrpcTransport,
  createGrpcWebTransport,
} from "@connectrpc/connect-node";
import { createClient } from "@connectrpc/connect";
import type { Transport } from "@connectrpc/connect";
import { InvokeService } from "./gen/invoke/v1/invoke_pb.js";
import { parseArgs } from "node:util";
import { create, fromBinary, toBinary } from "@bufbuild/protobuf";

const { values: flags } = parseArgs({
  args: process.argv.slice(2),
  options: {
    protocol: {
      type: "string",
      default: "connect",
    },
  },
});

void main();

/**
 * This program implements a client under test for the connect conformance test
 * runner. It reads ClientCompatRequest messages from stdin. For each request,
 * it makes a call, and reports the result with a ClientCompatResponse message
 * to stdout.
 */
async function main() {
  // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
  const workerUrl = `https://${process.env["CLOUDFLARE_WORKERS_CLIENT_HOST"]}/`;
  const transportOptions = { baseUrl: workerUrl, httpVersion: "2" } as const;
  let transport: Transport;
  switch (flags.protocol) {
    case "connect":
      transport = createConnectTransport(transportOptions);
      break;
    case "grpc":
      transport = createGrpcTransport(transportOptions);
      break;
    case "grpc-web":
      transport = createGrpcWebTransport(transportOptions);
      break;
    default:
      throw new Error(`Unknown protocol: ${flags.protocol}`);
  }
  const client = createClient(InvokeService, transport);
  for await (const next of readSizeDelimitedBuffers(process.stdin)) {
    const req = fromBinary(ClientCompatRequestSchema, next);
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    req.host = process.env["CLOUDFLARE_WORKERS_REFERENCE_SERVER_HOST"] ?? "";
    let res = create(ClientCompatResponseSchema, {
      testName: req.testName,
    });
    try {
      const response = await client.invoke({ request: req });
      res = response.response ?? res;
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
