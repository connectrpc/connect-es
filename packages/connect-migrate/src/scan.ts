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

import { sync } from "fast-glob";
import { basename } from "node:path";
import { Logger } from "./log";

const packageFilename = "package.json";
const lockFilenameNpm = "package-lock.json";
const lockFilenamePnpm = "pnpm-lock.yaml";
const lockFilenameYarn = "yarn-lock.yaml";
const lockFilename = [lockFilenameNpm, lockFilenamePnpm, lockFilenameYarn];

export function scan(ignorePatterns: string[], cwd: string, logger: Logger) {
  logger.log(
    `Scanning with ignorePatterns ${ignorePatterns.join(", ")} in ${cwd}`,
  );
  const all = sync(
    [
      // package.json
      `**/${packageFilename}`,
      // lock files
      ...lockFilename.map((f) => `**/${f}`),
      // source files
      "**/*.ts",
      "!**/*.d.ts",
      "**/*.js",
      "**/*.jsx",
      "**/*.cjs",
      "**/*.mjs",
      "**/*.tsx",
    ],
    {
      ignore: ["**/node_modules/**", ...ignorePatterns],
      cwd,
    },
  );
  const lockFiles = all.filter((path) => lockFilename.includes(basename(path)));
  const packageFiles = all.filter((path) => basename(path) === packageFilename);
  const sourceFiles = all.filter(
    (path) => !lockFiles.includes(path) && !packageFiles.includes(path),
  );
  const result = {
    lockFiles,
    packageFiles,
    sourceFiles,
  };
  logger.log(`Result: ${JSON.stringify(result)}`);
  return result;
}

export function getLockFilePackageManager(
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
