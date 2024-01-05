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

import { Scanned } from "./scan";
import j from "jscodeshift";
import { Logger, PrintFn } from "./logger";
import { updateSourceFile } from "./update-source-file";

interface MigrateSourceFilesResult {
  sourceFileErrors: number;
}

export function migrateSourceFiles(
  scanned: Scanned,
  transform: j.Transform,
  print: PrintFn,
  logger?: Logger,
  updateSourceFileFn: typeof updateSourceFile = updateSourceFile,
): MigrateSourceFilesResult {
  let sourceFileErrors = 0;
  if (scanned.sourceFiles.length == 0) {
    return { sourceFileErrors };
  }
  print(
    `Updating source ${
      scanned.sourceFiles.length == 1 ? "file" : "files"
    }... \n`,
  );
  let sourceFilesUpdated = false;
  for (const path of scanned.sourceFiles) {
    const r = updateSourceFileFn(transform, path, logger);
    if (r.ok) {
      if (r.modified) {
        print(`  ${path} ✓\n`);
        sourceFilesUpdated = true;
      }
    } else {
      print(`  ${path} ❌\n`);
      sourceFileErrors++;
    }
  }
  if (!sourceFilesUpdated) {
    print(`  No files modified.\n`);
  }
  return {
    sourceFileErrors,
  };
}
