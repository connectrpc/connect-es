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

import { spawnSync } from "node:child_process";
import { Logger } from "./log";

interface RunOptions {
  logger: Logger;
  command: string;
  args?: string[];
  cwd?: string;
}

export function run(opt: RunOptions): boolean {
  const args = opt.args ?? [];
  const cwd = opt.cwd ?? process.cwd();
  opt.logger.log(`run ${[opt.command, ...args].join(" ")} in ${cwd}`);
  const r = spawnSync(opt.command, args, {
    cwd,
    encoding: "utf-8",
    shell: true,
  });
  if (r.error !== undefined) {
    opt.logger.error(`spawn failed ${String(r.error)}`);
    throw new Error(
      `Failed to spawn command ${[opt.command, ...args].join(" ")}`,
    );
  }
  if (r.status !== 0) {
    opt.logger.error(`exit code: ${r.status}`);
  } else {
    opt.logger.log(`exit code: ${r.status}`);
  }
  opt.logger.log(`stdout:\n ${r.stdout}`);
  opt.logger.log(`stderr:\n ${r.stderr}`);
  return r.status === 0;
}
