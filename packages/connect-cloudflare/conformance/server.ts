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
import * as tls from "node:tls";
import {
  ServerCompatRequestSchema,
  ServerCompatResponseSchema,
  writeSizeDelimitedBuffer,
} from "@connectrpc/connect-conformance";
import { fromBinary, create, toBinary } from "@bufbuild/protobuf";

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
  // Keep the process alive for the duration of the test because
  // we do not start the server here  but in the script "conformance:server"
  // before starting the test. We have limited control over the what can be
  // configured in the cloudflare worker environment. Except for the
  // requestMessageLimit the server ends up being the same.
  const timeout = setInterval(() => {}, 5000);
  process.once("SIGTERM", () => {
    clearInterval(timeout);
  });
  const res = create(ServerCompatResponseSchema, {
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    host: process.env["CLOUDFLARE_WORKERS_SERVER_HOST"],
    port: 443,
    pemCert: req.useTls
      ? Buffer.from(tls.rootCertificates.join("\n"))
      : undefined,
  });
  process.stdout.write(
    writeSizeDelimitedBuffer(toBinary(ServerCompatResponseSchema, res)),
  );
}
