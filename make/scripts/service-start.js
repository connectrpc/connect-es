#!/usr/bin/env node

import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { spawn } from "child_process";
import { dirname } from "path";
import * as net from "net";

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

const [, , lockFilePath, makeTarget, targetAddress] = process.argv;
const stdoutLog = lockFilePath + ".out";
const stderrLog = lockFilePath + ".err";

if (existsSync(stdoutLog)) {
  unlinkSync(stdoutLog);
}
if (existsSync(stderrLog)) {
  unlinkSync(stderrLog);
}
if (!existsSync(dirname(lockFilePath))) {
  mkdirSync(dirname(lockFilePath), {
    recursive: true,
  });
}
const child = spawn(
  `make ${makeTarget} >${lockFilePath}.out 2>${lockFilePath}.err`,
  [],
  {
    stdio: "inherit",
    detached: true,
    shell: true,
  }
);
let childExitCode, childExitSignal;
child.on("exit", (code, signal) => {
  childExitCode = code;
  childExitSignal = signal;
});

let connectionReady;
const [host, port] = targetAddress.split(":");
const socket = new net.Socket();
socket.connect(Number(port), host);
socket.on("error", () => {
  new Promise((r) => setTimeout(r, 1000)).then(() => {
    socket.connect(Number(port), host);
  });
});
socket.on("ready", () => {
  connectionReady = true;
});

const checkIntervalId = setInterval(() => {
  if (childExitCode !== undefined || childExitSignal !== undefined) {
    process.stderr.write(`failed to start ${makeTarget}\n`);
    process.exit(childExitCode ?? 1);
    return;
  }
  if (!existsSync(stdoutLog)) {
    return;
  }
  if (!connectionReady) {
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
