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

import type { Scanned } from "./scan";
import type { PrintFn } from "./logger";
import { writePackageJsonFile } from "./package-json";
import {
  type DependencyMigration,
  migrateDependencies,
} from "./migrate-dependencies";

interface MigratePackagesResult {
  updatedPackageFiles: string[];
}

export function migratePackages(
  scanned: Scanned,
  dependencyMigrations: DependencyMigration[],
  print: PrintFn,
  writePackageJsonFileFn: typeof writePackageJsonFile = writePackageJsonFile,
): MigratePackagesResult {
  const updatedPackageFiles: string[] = [];
  if (scanned.packageFiles.length == 0) {
    return { updatedPackageFiles };
  }
  print(`Updating packages... `);
  for (const { path, pkg } of scanned.packageFiles) {
    const updated = migrateDependencies(pkg, dependencyMigrations);
    if (updated !== null) {
      writePackageJsonFileFn(path, updated);
      updatedPackageFiles.push(path);
    }
  }
  print(`✓\n`);
  if (updatedPackageFiles.length == 0) {
    if (scanned.lockFiles.length > 0) {
      print(`  No files modified. Will not update lock files.\n`);
    } else {
      print(`  No files modified.\n`);
    }
  } else {
    for (const path of updatedPackageFiles) {
      print(`  ${path} ✓\n`);
    }
  }
  return { updatedPackageFiles };
}
