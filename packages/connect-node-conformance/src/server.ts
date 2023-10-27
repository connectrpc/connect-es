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

import { parseArgs } from "node:util";
import { readFileSync } from "node:fs";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import * as http from "node:http";
import * as http2 from "node:http2";
import * as net from "node:net";
import routes from "./routes.js";
import {
  ServerCompatRequest,
  ServerCompatResponse,
} from "./gen/connectrpc/conformance/v1alpha1/server_compat_pb.js";
import { HTTPVersion } from "./gen/connectrpc/conformance/v1alpha1/config_pb.js";

const { values: flags } = parseArgs({
  options: {
    json: {
      type: "boolean",
      description:
        "whether to use the JSON format for marshaling / unmarshaling messages",
      default: false,
    },
    host: {
      type: "string",
      description: "the host for the conformance server",
      default: "127.0.0.1",
    },
    port: {
      type: "string",
      description: "the port for the conformance server",
      default: "0",
    },
  },
});

const req =
  flags.json === true
    ? ServerCompatRequest.fromJsonString(readFileSync(0, "utf-8"))
    : ServerCompatRequest.fromBinary(
        new Uint8Array(Buffer.from(readFileSync(0, "binary"), "binary")),
      );

const adapter = connectNodeAdapter({
  routes,
});

let server: http.Server | http2.Http2Server;
switch (req.httpVersion) {
  case HTTPVersion.HTTP_VERSION_1:
    server = http.createServer(adapter);
    break;
  case HTTPVersion.HTTP_VERSION_2:
    server = http2.createServer(adapter);
    break;
  case HTTPVersion.HTTP_VERSION_3:
    throw new Error("HTTP/3 is not supported");
  default:
    throw new Error("Unknown HTTP version");
}

server.listen(Number(flags.port), flags.host, () => {
  const addrInfo = server.address() as net.AddressInfo;
  const res = new ServerCompatResponse({
    result: {
      case: "listening",
      value: {
        host: addrInfo.address,
        port: addrInfo.port.toString(),
      },
    },
  });
  let data: Uint8Array;
  if (flags.json === true) {
    data = Buffer.from(res.toJsonString(), "utf-8");
  } else {
    data = res.toBinary();
  }
  process.stdout.write(data);
});
