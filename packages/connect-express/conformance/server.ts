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

import { readFileSync } from "node:fs";
import { compressionBrotli, compressionGzip } from "@connectrpc/connect-node";
import * as http from "node:http";
import type * as http2 from "node:http2";
import * as https from "node:https";
import type * as net from "node:net";
import {
  create,
  createRegistry,
  fromBinary,
  toBinary,
} from "@bufbuild/protobuf";
import {
  routes,
  HTTPVersion,
  UnaryRequestSchema,
  ServerStreamRequestSchema,
  ClientStreamRequestSchema,
  BidiStreamRequestSchema,
  IdempotentUnaryRequestSchema,
  ServerCompatRequestSchema,
  ServerCompatResponseSchema,
  writeSizeDelimitedBuffer,
} from "@connectrpc/connect-conformance";
import express from "express";
import { expressConnectMiddleware } from "../src/index.js";

main();

/**
 * This program implements a server under test for the connect conformance test
 * runner. It reads ServerCompatRequest messages from stdin, starts the server
 * with the requested configuration, and writes a ServerCompatResponse with the
 * server's port and other details to stdout.
 */
function main() {
  const req = fromBinary(
    ServerCompatRequestSchema,
    readFileSync(process.stdin.fd).subarray(4),
  );

  const app = express();
  app.use(
    expressConnectMiddleware({
      routes,
      readMaxBytes: req.messageReceiveLimit,
      acceptCompression: [compressionGzip, compressionBrotli],
      jsonOptions: {
        registry: createRegistry(
          UnaryRequestSchema,
          ServerStreamRequestSchema,
          ClientStreamRequestSchema,
          BidiStreamRequestSchema,
          IdempotentUnaryRequestSchema,
        ),
      },
    }),
  );

  let server: http.Server | http2.Http2Server;
  let serverOptions: {
    cert?: string;
    key?: string;
    ca?: Buffer;
    requestCert?: true;
    rejectUnauthorized?: true;
    highWaterMark?: number;
  } = {};
  if (req.useTls && req.serverCreds !== undefined) {
    serverOptions = {
      key: req.serverCreds.key.toString(),
      cert: req.serverCreds.cert.toString(),
    };
    if (req.clientTlsCert.length > 0) {
      serverOptions = {
        ...serverOptions,
        requestCert: true,
        rejectUnauthorized: true,
        ca: Buffer.from(req.clientTlsCert),
      };
    }
  }
  switch (req.httpVersion) {
    case HTTPVersion.HTTP_VERSION_1:
      server = req.useTls
        ? // eslint-disable-next-line @typescript-eslint/no-misused-promises -- typing issue in express
          https.createServer(serverOptions, app)
        : // eslint-disable-next-line @typescript-eslint/no-misused-promises -- typing issue in express
          http.createServer(app);
      break;
    case HTTPVersion.HTTP_VERSION_2:
      throw new Error("HTTP/2 is not supported");
    case HTTPVersion.HTTP_VERSION_3:
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }

  process.on("SIGTERM", () => {
    // Gracefully shutting down a http2 server is complicated.
    // We trust the conformance test runner to only send the signal if it's done,
    // so we simply shut down hard.
    process.exit();
  });

  server.listen(undefined, "127.0.0.1", () => {
    const addrInfo = server.address() as net.AddressInfo;
    const res = create(ServerCompatResponseSchema, {
      pemCert:
        serverOptions.cert !== undefined
          ? Buffer.from(serverOptions.cert)
          : undefined,
      host: addrInfo.address,
      port: addrInfo.port,
    });
    process.stdout.write(
      writeSizeDelimitedBuffer(toBinary(ServerCompatResponseSchema, res)),
    );
  });
}
