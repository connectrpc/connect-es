#!/usr/bin/env -S npx tsx

import { readFileSync } from "node:fs";
import * as tls from "node:tls";
import {
  ServerCompatRequest,
  ServerCompatResponse,
  writeSizeDelimitedBuffer,
} from "@connectrpc/connect-conformance";

export function run() {
  const req = ServerCompatRequest.fromBinary(
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
  const res = new ServerCompatResponse({
    host: process.env["CLOUDFLARE_WORKERS_SERVER_HOST"],
    port: 443,
    pemCert: req.useTls
      ? Buffer.from(tls.rootCertificates.join("\n"))
      : undefined,
  });
  process.stdout.write(writeSizeDelimitedBuffer(res.toBinary()));
}
run();
