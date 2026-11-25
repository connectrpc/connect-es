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
 * runner. It is expected to read ServerCompatRequest messages from stdin, start
 * the server with the requested configuration, and write a ServerCompatResponse
 * with the server's port and other details to stdout.
 *
 * For Cloudflare Workers, starting the server means deploying the worker. The
 * script "conformance:server" does that before it invokes `connectconformance`,
 * so the requested configuration is not available at deploy time. This program
 * starts nothing and only reports the host of the deployed worker.
 *
 * The worker serves all protocols and HTTP versions we test, always with TLS,
 * so most of the request can be ignored. The exception is the message receive
 * limit: the script "conformance:server" sets it at deploy time to the fixed
 * value the runner requests, see
 * https://github.com/connectrpc/conformance/blob/v1.0.7/internal/app/connectconformance/test_case_library.go#L40
 */
function main() {
  const req = fromBinary(
    ServerCompatRequestSchema,
    readFileSync(process.stdin.fd).subarray(4),
  );
  // Keep the process alive for the duration of the test. The runner stops it
  // with SIGTERM.
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
