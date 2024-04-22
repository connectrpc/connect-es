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
} from "@connectrpc/connect-node";
import * as http from "node:http";
import * as http2 from "node:http2";
import * as https from "node:https";
import * as net from "node:net";
import routes from "../routes.js";
import {
  ServerCompatRequest,
  ServerCompatResponse,
} from "../gen/connectrpc/conformance/v1/server_compat_pb.js";
import { HTTPVersion } from "../gen/connectrpc/conformance/v1/config_pb.js";
import { createRegistry } from "@bufbuild/protobuf";
import {
  BidiStreamRequest,
  ClientStreamRequest,
  IdempotentUnaryRequest,
  ServerStreamRequest,
  UnaryRequest,
} from "../gen/connectrpc/conformance/v1/service_pb.js";
import { writeSizeDelimitedBuffer } from "../protocol.js";

export function run() {
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
      break;
    case HTTPVersion.HTTP_VERSION_3:
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }

  process.on("SIGTERM", () => {
    server.close();
  });
  server.listen(undefined, "127.0.0.1", () => {
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
