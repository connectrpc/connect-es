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

import { sync } from "fast-glob";
import { basename } from "node:path";
import { Logger, PrintFn } from "./logger";
import { PackageJson, readPackageJsonFile } from "./package-json";

const packageFilename = "package.json";
export const lockFilenameNpm = "package-lock.json";
export const lockFilenamePnpm = "pnpm-lock.yaml";
export const lockFilenameYarn = "yarn-lock.yaml";
const lockFilename = [lockFilenameNpm, lockFilenamePnpm, lockFilenameYarn];

export interface Scanned {
  ok: true;
  packageFiles: { path: string; pkg: PackageJson }[];
  lockFiles: string[];
  sourceFiles: string[];
}

export interface ScanError {
  ok: false;
  errorMessage: string;
}

export function scan(
  ignorePatterns: string[],
  cwd: string,
  print: PrintFn,
  logger?: Logger,
): Scanned | ScanError {
  logger?.log(
    `Scanning with ignorePatterns ${ignorePatterns.join(", ")} in ${cwd}`,
  );
  print(`Scanning... `);
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
  const packagePaths = all.filter((path) => basename(path) === packageFilename);
  const sourceFiles = all.filter(
    (path) => !lockFiles.includes(path) && !packagePaths.includes(path),
  );
  const packageFiles = packagePaths.map((path) => ({
    path,
    pkg: readPackageJsonFile(path),
  }));
  print(`✓\n`);
  logger?.log(`sourceFiles: ${JSON.stringify(sourceFiles)}`);
  logger?.log(`packageFiles: ${JSON.stringify(packageFiles)}`);
  logger?.log(`lockFiles: ${JSON.stringify(lockFiles)}`);
  print(
    `${packageFiles.length.toString().padStart(5)} package.json ${
      packageFiles.length == 1 ? "file" : "files"
    }\n`,
  );
  print(
    `${lockFiles.length.toString().padStart(5)} lock ${
      lockFiles.length == 1 ? "file" : "files"
    }\n`,
  );
  print(
    `${sourceFiles.length.toString().padStart(5)} source ${
      sourceFiles.length == 1 ? "file" : "files"
    }\n`,
  );
  if (packageFiles.length === 0 && sourceFiles.length === 0) {
    return {
      ok: false,
      errorMessage: `No files to process. Make sure to run the command in a JavaScript or TypeScript project.\n`,
    };
  }
  return {
    ok: true,
    lockFiles,
    packageFiles,
    sourceFiles,
  };
}
