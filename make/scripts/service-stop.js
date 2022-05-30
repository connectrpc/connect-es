#!/usr/bin/env node

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
      process.stdout.write(`${makeTarget} doesn't appear to be running\n`);
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
