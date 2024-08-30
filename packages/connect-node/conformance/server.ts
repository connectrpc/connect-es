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

import { readFileSync } from "node:fs";
import {
  compressionBrotli,
  compressionGzip,
  connectNodeAdapter,
} from "../src/index.js";
import * as http from "node:http";
import * as http2 from "node:http2";
import * as https from "node:https";
import * as net from "node:net";
import { createRegistry } from "@bufbuild/protobuf";
import {
  routes,
  writeSizeDelimitedBuffer,
  BidiStreamRequest,
  ClientStreamRequest,
  HTTPVersion,
  IdempotentUnaryRequest,
  ServerCompatRequest,
  ServerCompatResponse,
  ServerStreamRequest,
  UnaryRequest,
} from "@connectrpc/connect-conformance";

main();

process.on("exit", () => {
  console.error(process.pid, "connect-node/conformance/server.ts exit");
});


/**
 * This program implements a server under test for the connect conformance test
 * runner. It reads ServerCompatRequest messages from stdin, starts the server
 * with the requested configuration, and writes a ServerCompatResponse with the
 * server's port and other details to stdout.
 */
function main() {
  console.error(process.pid, "connect-node/conformance/server.ts main()");
  const req = ServerCompatRequest.fromBinary(
    readFileSync(process.stdin.fd).subarray(4),
  );

  const adapter = connectNodeAdapter({
    routes,
    readMaxBytes: req.messageReceiveLimit,
    acceptCompression: [compressionGzip, compressionBrotli],
    jsonOptions: {
      typeRegistry: createRegistry(
        UnaryRequest,
        ServerStreamRequest,
        ClientStreamRequest,
        BidiStreamRequest,
        IdempotentUnaryRequest,
      ),
    },
  });

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
  const h2Sessions = new Set<http2.ServerHttp2Session>();
  switch (req.httpVersion) {
    case HTTPVersion.HTTP_VERSION_1:
      server = req.useTls
        ? https.createServer(serverOptions, adapter)
        : http.createServer(adapter);
      break;
    case HTTPVersion.HTTP_VERSION_2:
      server = req.useTls
        ? http2.createSecureServer(serverOptions, adapter)
        : http2.createServer(adapter);
      server.on("session", s => h2Sessions.add(s));
      break;
    case HTTPVersion.HTTP_VERSION_3:
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }

  process.on("SIGTERM", () => {
    process.exit();
    // if ("closeAllConnections" in server) {
    //   console.error(process.pid, "connect-node/conformance/server.ts SIGTERM", "h1");
    //   server.closeAllConnections();
    //   server.close();
    // } else {
    //   console.error(process.pid, "connect-node/conformance/server.ts SIGTERM", "h2");
    //   for (const s of h2Sessions) {
    //     if (!s.closed) {
    //       s.close();
    //     }
    //   }
    //   server.close();
    // }
  });

  server.listen(0, "127.0.0.1", () => {
    const addrInfo = server.address() as net.AddressInfo;
    const res = new ServerCompatResponse({
      pemCert:
        serverOptions.cert !== undefined
          ? Buffer.from(serverOptions.cert)
          : undefined,
      host: addrInfo.address,
      port: addrInfo.port,
    });
    process.stdout.write(writeSizeDelimitedBuffer(res.toBinary()));
  });
}
