// Copyright 2021-2026 The Connect Authors
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
import * as nodeModule from "node:module";
import type * as Http2 from "node:http2";

const h2debugStart = Date.now();
const h2log = (msg: string) =>
  process.stderr.write(`H2DEBUG +${Date.now() - h2debugStart}ms ${msg}\n`);
let h2sessionCount = 0;
let h2requestCount = 0;
let h2lastRequestEnd = Date.now();
const h2module = nodeModule.createRequire(import.meta.url)("node:http2") as typeof Http2;
const h2connect = h2module.connect;
let h2current: { id: number; opened: number; streams: number } | undefined;
h2module.connect = ((...args: Parameters<typeof h2connect>) => {
  const session = h2connect(...args);
  const info = { id: ++h2sessionCount, opened: Date.now(), streams: 0 };
  h2current = info;
  h2log(`session#${info.id} connect`);
  session.on("stream", () => info.streams++);
  const origRequest = session.request.bind(session);
  session.request = ((...a: Parameters<typeof origRequest>) => {
    info.streams++;
    return origRequest(...a);
  }) as typeof session.request;
  session.on("goaway", (code, lastStreamID, data) =>
    h2log(`session#${info.id} goaway code=${code} last=${lastStreamID} data=${data?.toString()} streams=${info.streams} age=${Date.now() - info.opened}ms`));
  session.on("error", (err: NodeJS.ErrnoException) =>
    h2log(`session#${info.id} error ${err.code} ${err.syscall} ${err.message} streams=${info.streams} age=${Date.now() - info.opened}ms`));
  session.on("close", () =>
    h2log(`session#${info.id} close streams=${info.streams} age=${Date.now() - info.opened}ms`));
  session.on("frameError", (type, code, id) =>
    h2log(`session#${info.id} frameError type=${type} code=${code} stream=${id}`));
  return session;
}) as typeof h2connect;
nodeModule.syncBuiltinESMExports();
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
  const transportOptions = { baseUrl: workerUrl, httpVersion: "1.1" } as const;
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
      h2requestCount++;
      const idleMs = Date.now() - h2lastRequestEnd;
      const requestStart = Date.now();
      try {
        const response = await client.invoke({ request: req });
        res = response.response ?? res;
      } catch (e) {
        const cause = (e as { cause?: NodeJS.ErrnoException }).cause;
        h2log(`request#${h2requestCount} ${req.testName} failed after ${Date.now() - requestStart}ms idleBefore=${idleMs}ms session#${h2current?.id} streams=${h2current?.streams} age=${h2current === undefined ? "?" : Date.now() - h2current.opened}ms err=${(e as Error).message} cause=${cause?.code}/${cause?.syscall}`);
        throw e;
      } finally {
        h2lastRequestEnd = Date.now();
      }
      const response = { response: res };
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
