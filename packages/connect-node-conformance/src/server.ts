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
import {
  compressionBrotli,
  compressionGzip,
  connectNodeAdapter,
} from "@connectrpc/connect-node";
import * as http from "node:http";
import * as http2 from "node:http2";
import * as https from "node:https";
import * as net from "node:net";
import routes from "./routes.js";
import {
  ServerCompatRequest,
  ServerCompatResponse,
} from "./gen/connectrpc/conformance/v1alpha1/server_compat_pb.js";
import { HTTPVersion } from "./gen/connectrpc/conformance/v1alpha1/config_pb.js";
import { pki } from "node-forge";
import { Integer } from "asn1js";

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
    },
  },
});

const req =
  flags.json === true
    ? ServerCompatRequest.fromJsonString(readFileSync(0, "utf-8"))
    : ServerCompatRequest.fromBinary(
        new Uint8Array(Buffer.from(readFileSync(0, "binary"), "binary"))
      );

const adapter = connectNodeAdapter({
  routes,
  readMaxBytes: req.messageReceiveLimit,
  acceptCompression: [compressionGzip, compressionBrotli],
});

let certBytes = "";
let keyBytes = "";
if (req.useTls) {
  const keys = pki.rsa.generateKeyPair(2048);
  const cert = pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = new Integer({
    value: Math.floor(Math.random() * Number.MIN_SAFE_INTEGER),
  }).toString("hex");
  cert.setSubject([
    {
      name: "organizationName",
      value: "ConnectRPC",
    },
    {
      name: "commonName",
      value: "Conformance Server",
    },
  ]);
  const now = new Date();
  const notBefore = new Date();
  notBefore.setDate(now.getDate() - 1);
  const notAfter = new Date();
  notAfter.setDate(now.getDate() + 7);
  cert.validity.notBefore = notBefore;
  cert.validity.notAfter = notAfter;
  cert.setExtensions([
    {
      name: "keyUsage",
      digitalSignature: true,
      keyEncipherment: true,
    },
    {
      name: "extKeyUsage",
      serverAuth: true,
    },
    {
      name: "dNSName",
      value: "localhost",
    },
    {
      name: "iPAddress",
      value: "127.0.0.1",
    },
    {
      name: "iPAddress",
      value: "0:0:0:0:0:0:0:1",
    },
  ]);
  cert.sign(keys.privateKey);
  certBytes = pki.certificateToPem(cert);
  keyBytes = pki.privateKeyToPem(keys.privateKey);
}

let server: http.Server | http2.Http2Server;
if (req.useTls) {
  switch (req.httpVersion) {
    case HTTPVersion.HTTP_VERSION_1:
      server = https.createServer({ key: keyBytes, cert: certBytes }, adapter);
      break;
    case HTTPVersion.HTTP_VERSION_2:
      server = http2.createSecureServer(
        { key: keyBytes, cert: certBytes },
        adapter
      );
      break;
    case HTTPVersion.HTTP_VERSION_3:
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }
} else {
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
}

server.listen(
  flags.port !== undefined ? parseInt(flags.port, 10) : undefined,
  flags.host,
  () => {
    const addrInfo = server.address() as net.AddressInfo;
    const res = new ServerCompatResponse({
      pemCert: Buffer.from(certBytes),
      host: addrInfo.address,
      port: addrInfo.port,
    });
    let data: Uint8Array;
    if (flags.json === true) {
      data = Buffer.from(res.toJsonString(), "utf-8");
    } else {
      data = res.toBinary();
    }
    process.stdout.write(data);
  }
);
