#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { spawn } from "child_process";
import { dirname } from "path";

if (process.argv.length !== 5) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <lock-file-path> <make-target> <successful-start-substring>`,
      "",
      "(Re-)start a service in the background. ",
      "",
      "lock-file-path:             path to use for the lock file",
      "make-target:                make target to run as the service",
      "successful-start-substring: if the output of the make target matches this string, consider the service running",
      "",
    ].join("\n")
  );
  process.exit(1);
}

const [, , lockFilePath, makeTarget, successfulStartSubstring] = process.argv;
const nohupLog = "nohup.out";

if (existsSync(nohupLog)) {
  unlinkSync(nohupLog);
}
if (!existsSync(dirname(lockFilePath))) {
  mkdirSync(dirname(lockFilePath), {
    recursive: true,
  });
}
const child = spawn("nohup", ["make", makeTarget], {
  stdio: "inherit",
  detached: true,
});
let childExitCode, childExitSignal;
child.on("exit", (code, signal) => {
  childExitCode = code;
  childExitSignal = signal;
});
const checkIntervalId = setInterval(() => {
  if (childExitCode !== undefined || childExitSignal !== undefined) {
    process.stderr.write(`failed to start ${makeTarget}\n`);
    process.exit(childExitCode ?? 1);
    return;
  }
  if (!existsSync(nohupLog)) {
    return;
  }
  const log = readFileSync(nohupLog, {
    encoding: "utf-8",
  });
  if (log.lastIndexOf(successfulStartSubstring) === -1) {
    return;
  }
  clearInterval(checkIntervalId);
  writeFileSync(lockFilePath, child.pid.toString(10), {
    encoding: "utf-8",
  });
  child.unref();
  process.stdout.write(`${makeTarget} runnning\n`);
  process.exit(0);
}, 250);
