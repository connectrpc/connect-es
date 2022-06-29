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

import { spawn } from "child_process";

const [, , crosstest_version, name, args, ...ports] = process.argv;

let portArgs = [];
ports.forEach((port) => {
  portArgs.push("-p");
  portArgs.push(`${port}:${port}`);
});

const child = spawn(
  "docker run",
  [
    "--rm", // Automatically remove the container when it exits
    "--name", // Assign a name to the container
    `connect-crosstest-${name}`,
    "-d", // Run container in background and print container ID
    ...portArgs, //Publish a container's port(s) to the host
    `bufbuild/connect-crosstest:${crosstest_version}`, // image
    `/usr/local/bin/${name}`, // command
    "--cert", // arguments
    `"cert/localhost.crt"`,
    "--key",
    `"cert/localhost.key"`,
    args,
  ],
  {
    stdio: "ignore",
    detached: true,
    shell: true,
  }
);
child.on("exit", (code, signal) => {
  if (code !== 0 || signal !== null) {
    process.stderr.write(`failed to start ${name}\n`);
    process.exit(code ?? 1);
    return;
  }
  process.stdout.write(`${name} running\n`);
  process.exit(0);
});
