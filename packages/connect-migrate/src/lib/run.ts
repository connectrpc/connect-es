// Copyright 2021-2024 The Connect Authors
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

import { spawnSync } from "node:child_process";
import { Logger } from "./logger";
import { basename, dirname } from "node:path";
import { lockFilenameNpm, lockFilenamePnpm, lockFilenameYarn } from "./scan";

export function runInstall(lockfilePath: string, logger?: Logger) {
  let ok = false;
  switch (getLockFilePackageManager(lockfilePath)) {
    case "pnpm":
      ok = run({
        command: "pnpm",
        args: ["install", "-r"],
        logger,
        cwd: dirname(lockfilePath),
      });
      break;
    case "npm":
      ok = run({
        command: "npm",
        args: ["install"],
        logger,
        cwd: dirname(lockfilePath),
      });
      break;
    case "yarn":
      ok = run({
        command: "yarn",
        args: ["install"],
        logger,
        cwd: dirname(lockfilePath),
      });
      break;
    default:
      throw new Error(
        `Cannot determine package manager for lock file ${lockfilePath}`,
      );
  }
  return ok;
}

function getLockFilePackageManager(
  lockfilePath: string,
): "npm" | "pnpm" | "yarn" | undefined {
  const f = basename(lockfilePath);
  switch (f) {
    case lockFilenameNpm:
      return "npm";
    case lockFilenamePnpm:
      return "pnpm";
    case lockFilenameYarn:
      return "yarn";
  }
  return undefined;
}

interface RunOptions {
  logger?: Logger;
  command: string;
  args?: string[];
  cwd?: string;
}

function run(opt: RunOptions): boolean {
  const args = opt.args ?? [];
  const cwd = opt.cwd ?? process.cwd();
  opt.logger?.log(`run ${[opt.command, ...args].join(" ")} in ${cwd}`);
  const r = spawnSync(opt.command, args, {
    cwd,
    encoding: "utf-8",
    shell: true,
  });
  if (r.error !== undefined) {
    opt.logger?.error(`spawn failed ${String(r.error)}`);
    throw new Error(
      `Failed to spawn command ${[opt.command, ...args].join(" ")}`,
    );
  }
  if (r.status !== 0) {
    opt.logger?.error(`exit code: ${r.status}`);
  } else {
    opt.logger?.log(`exit code: ${r.status}`);
  }
  opt.logger?.log(`stdout:\n ${r.stdout}`);
  opt.logger?.log(`stderr:\n ${r.stderr}`);
  return r.status === 0;
}
