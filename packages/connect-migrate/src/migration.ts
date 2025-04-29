// Copyright 2021-2025 The Connect Authors
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

import type { Scanned } from "./lib/scan";
import type { CommandLineArgs } from "./arguments";
import type { Logger, PrintFn } from "./lib/logger";
import type { updateSourceFile } from "./lib/migrate-source-files";
import type { writePackageJsonFile } from "./lib/package-json";
import type { runInstall } from "./lib/run";
import type { writeBufGenYamlFile } from "./lib/bufgenyaml";

export interface Migration {
  applicable(scanned: Scanned): boolean;
  migrate(opt: MigrateOptions): MigrateError | MigrateSuccess;
}

export interface MigrateOptions {
  scanned: Scanned;
  args: CommandLineArgs;
  print: PrintFn;
  logger?: Logger;
  updateSourceFileFn?: typeof updateSourceFile;
  writePackageJsonFileFn?: typeof writePackageJsonFile;
  writeBufGenYamlFileFn?: typeof writeBufGenYamlFile;
  runInstallFn?: typeof runInstall;
}

export interface MigrateSuccess {
  ok: true;
  dumpLogfile?: false;
}

export interface MigrateError {
  ok: false;
  errorMessage: string;
  dumpLogfile?: boolean;
}
