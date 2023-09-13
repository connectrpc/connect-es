// Copyright 2021-2023 The Connect Authors
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

import { Scanned } from "./scan";
import { CommandLineArgs } from "../arguments";
import { Logger, PrintFn } from "./logger";
import { runInstall } from "./run";

interface MigrateLockFilesResult {
  lockFileErrors: number;
}

export function migrateLockFiles(
  scanned: Scanned,
  updatedPackageFiles: string[],
  args: CommandLineArgs,
  print: PrintFn,
  logger?: Logger,
  runInstallFn: typeof runInstall = runInstall,
): MigrateLockFilesResult {
  let lockFileErrors = 0;
  if (scanned.lockFiles.length == 0) {
    return { lockFileErrors };
  }
  if (updatedPackageFiles.length === 0) {
    print(
      "Skipping dependency installation, since no package.json files were modified.\n",
    );
  } else if (args.noInstall) {
    print("Skipping dependency installation (--no-install).\n");
  } else {
    print(
      `Updating lock ${scanned.lockFiles.length == 1 ? "file" : "files"}... \n`,
    );
    for (const path of scanned.lockFiles) {
      if (runInstallFn(path, logger)) {
        print(`  ${path} ✓\n`);
      } else {
        print(`  ${path} ❌\n`);
        lockFileErrors++;
      }
    }
  }
  return { lockFileErrors };
}
