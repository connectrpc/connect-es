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

import { Scanned } from "../lib/scan";
import replaceCalls from "./v1.16.0-transform";
import { MigrateError, MigrateSuccess, Migration } from "../migration";
import {
  DependencyReplacement,
  replaceDependencies,
} from "../lib/replace-dependencies";
import { updateSourceFile } from "../lib/update-source-file";
import { migrateSourceFiles } from "../lib/migrate-source-files";

/**
 * We want to limit the transformation to v1.
 */
export const transformOnly = {
  from: { name: "@connectrpc/connect", range: "^1.16.0" },
  to: { version: "^1.16.0" },
} satisfies DependencyReplacement;

/**
 * Migrates code to use new symbols `createClient` and `Client` instead
 * of `createPromiseClient` and `PromiseClient`.
 */
export const v1_16_0: Migration = {
  applicable(scanned: Scanned) {
    return scanned.packageFiles.some(
      ({ pkg }) => replaceDependencies(pkg, [transformOnly]) != null,
    );
  },
  migrate({
    scanned,
    print,
    logger,
    updateSourceFileFn = updateSourceFile,
  }): MigrateError | MigrateSuccess {
    const { sourceFileErrors } = migrateSourceFiles(
      scanned,
      replaceCalls,
      print,
      logger,
      updateSourceFileFn,
    );
    if (sourceFileErrors > 0) {
      return {
        ok: false,
        errorMessage: [
          `⚠️${sourceFileErrors} source ${
            sourceFileErrors == 1 ? "file" : "files"
          } could not be updated.`,
          `You may have to update the files manually. Check the log for details.`,
        ].join("\n"),
        dumpLogfile: true,
      };
    }
    return {
      ok: true,
    };
  },
};
