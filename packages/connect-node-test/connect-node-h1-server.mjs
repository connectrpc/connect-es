#!/usr/bin/env node

// Copyright 2021-2023 Buf Technologies, Inc.
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

import { createTestServers } from "./dist/esm/helpers/testserver.js";
import { spawn } from "child_process";
import {
  existsSync,
  statSync,
  unlinkSync,
  utimesSync,
  writeFileSync,
  readFileSync,
  openSync
} from "fs";
import { dirname, join, basename } from "path";
import * as process from "process";

const PORT = 8085; // Note that 8084 may be taken by a Mono.WebServer.XSP on ubuntu
const args = process.argv.slice(2);
const command = args[0];
const nodePath = process.argv[0];
const selfPath = process.argv[1];
const lockFile = join(dirname(selfPath), ".connect-node-h1-server.lock");
const outFile = join(dirname(selfPath), ".connect-node-h1-server.out");

if (
  args.length !== 1 ||
  ["restart" | "stop" | "startinternal"].includes(command)
) {
  process.stderr.write(`USAGE:${basename(selfPath)} restart | stop\n`);
  process.exit(1);
}

switch (command) {
  case "restart":
    // if running, stop first
    if (existsSync(lockFile)) {
      const shouldDelay = lastModifiedMs(lockFile) < 2500;
      unlinkSync(lockFile);
      if (shouldDelay) {
        await delay(2500);
      }
    }
    // spawn server in bg
    const outHandle = openSync(outFile, "a");
    spawn(nodePath, [selfPath, "startinternal"], {
      detached: true,
      stdio: ["ignore", outHandle, outHandle]
    }).unref();
    // wait until server has updated lock file
    const startTs = Date.now();
    for (;;) {
      const elapsedMs = Date.now() - startTs;
      if (elapsedMs > 5000) {
        process.stderr.write("failed to start\n");
        if (existsSync(outFile)) {
          process.stderr.write(readFileSync(outFile));
        }
        process.exit(1);
        break;
      }
      await delay(50);
      if (lastModifiedMs(lockFile) < 5000) {
        // server has updated lock file recently, seems to be up
        break;
      }
    }
    break;

  case "stop":
    // stop if running, but don't wait
    if (existsSync(lockFile)) {
      unlinkSync(lockFile);
    }
    break;

  case "startinternal":
    const server = createTestServers().servers["@bufbuild/connect-node (h1)"];
    await server.start(PORT);
    writeFileSync(lockFile, "server listening at " + server.getUrl(), {
      encoding: "utf-8",
    });
    // stop if lock file deleted
    // otherwise, keep lock file updated
    for (;;) {
      await delay(50);
      if (!existsSync(lockFile)) {
        process.exit(0);
        break;
      }
      utimesSync(lockFile, new Date(), new Date());
    }
}

// return number of ms since file was last modified, or infinity if file does not exist
function lastModifiedMs(path) {
  if (!existsSync(path)) {
    return Number.POSITIVE_INFINITY;
  }
  const modTs = statSync(path).mtimeMs;
  return Date.now() - modTs;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
