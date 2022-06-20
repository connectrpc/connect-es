#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { spawn } from "child_process";
import { dirname } from "path";
import * as net from "net";

if (process.argv.length !== 5) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <lock-file-path> <make-target> <target-address>`,
      "",
      "(Re-)start a service in the background. ",
      "",
      "lock-file-path:  path to use for the lock file",
      "make-target:     make target to run as the service",
      "target-address:  target address to check if the service is running",
      "",
    ].join("\n")
  );
  process.exit(1);
}

const [, , lockFilePath, makeTarget, targetAddress] = process.argv;

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

const [host, port] = targetAddress.split(":");
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
  writeFileSync(lockFilePath, child.pid.toString(10), {
    encoding: "utf-8",
  });
  child.unref();
  process.stdout.write(`${makeTarget} runnning\n`);
  process.exit(0);
});
