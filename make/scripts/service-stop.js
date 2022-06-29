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

import { existsSync, readFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";

if (process.argv.length !== 4) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <lock-file-path> <make-target>`,
      "",
      "Stop a service in the background. ",
      "",
      "lock-file-path: path to use for the lock file",
      "make-target:    make target to run as the service",
      "",
    ].join("\n")
  );
  process.exit(1);
}

const [, , lockFilePath, makeTarget] = process.argv;

if (existsSync(lockFilePath)) {
  const pid = parseInt(
    readFileSync(lockFilePath, {
      encoding: "utf-8",
    })
  );
  if (!isNaN(pid)) {
    let stopped = false;
    try {
      execSync(`kill ${pid}`, {
        stdio: "ignore",
      });
      stopped = true;
    } catch (e) {
      //
    }
    try {
      unlinkSync(lockFilePath);
    } catch (e) {
      //
    }
    if (stopped) {
      process.stdout.write(`${makeTarget} stopped\n`);
    } else {
      process.stdout.write(`${makeTarget} doesn't appear to be running\n`);
    }
  }
} else {
  process.stdout.write(`${makeTarget} doesn't appear to be running\n`);
}
