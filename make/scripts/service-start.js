#!/usr/bin/env node

// Copyright 2021-2022 Buf Technologies, Inc.
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

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { spawn } from "child_process";
import { dirname } from "path";
import * as net from "net";

if (process.argv.length !== 5) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <lock-file-path> <make-target> <target-addresses>`,
      "",
      "(Re-)start a service in the background. ",
      "",
      "lock-file-path:      path to use for the lock file",
      "make-target:         make target to run as the service",
      "target-addresses:    target addresses to check if the services are running, 'host:port' array separated by ',' separator",
      "",
    ].join("\n")
  );
  process.exit(1);
}

const [, , lockFilePath, makeTarget, targetAddressesString] = process.argv;

if (!existsSync(dirname(lockFilePath))) {
  mkdirSync(dirname(lockFilePath), {
    recursive: true,
  });
}
const child = spawn(`make ${makeTarget}`, [], {
  stdio: "ignore",
  detached: true,
  shell: true,
});
let childExitCode, childExitSignal;
child.on("exit", (code, signal) => {
  childExitCode = code;
  childExitSignal = signal;
});

const targetAddresses = targetAddressesString.split(",");
let successCount = 0;
targetAddresses.forEach((address) => {
  const [host, port] = address.split(":");
  const socket = new net.Socket();
  socket.connect(parseInt(port, 10), host);
  socket.on("error", () => {
    if (childExitCode !== undefined || childExitSignal !== undefined) {
      process.stderr.write(`failed to start ${makeTarget}\n`);
      process.exit(childExitCode ?? 1);
      return;
    }
    setTimeout(() => {
      socket.connect(Number(port), host);
    }, 1000);
  });
  socket.on("ready", () => {
    successCount++;
    if (successCount === targetAddresses.length) {
      writeFileSync(lockFilePath, child.pid.toString(10), {
        encoding: "utf-8",
      });
      child.unref();
      process.stdout.write(`${makeTarget} running\n`);
      process.exit(0);
    }
  });
});
