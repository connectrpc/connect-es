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
import * as tls from "node:tls";
import {
  ServerCompatRequest,
  ServerCompatResponse,
} from "../gen/connectrpc/conformance/v1/server_compat_pb.js";

export function run() {
  const req = ServerCompatRequest.fromBinary(
    readFileSync(process.stdin.fd).subarray(4),
  );
  // Keep the process alive for the duration of the test.
  const timeout = setInterval(() => {}, 5000);
  process.once("SIGTERM", () => {
    clearInterval(timeout);
  });
  const res = new ServerCompatResponse({
    host: process.env["CLOUDFLARE_WORKERS_SERVER_HOST"],
    port: 443,
    pemCert: req.useTls
      ? Buffer.from(tls.rootCertificates.join("\n"))
      : undefined,
  });
  const data = res.toBinary();
  const size = Buffer.alloc(4);
  size.writeUInt32BE(data.byteLength);
  process.stdout.write(size);
  process.stdout.write(data);
}
