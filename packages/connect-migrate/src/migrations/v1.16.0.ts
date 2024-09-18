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

import type { Scanned } from "../lib/scan";
import replaceCalls from "./v1.16.0-transform";
import type { MigrateError, MigrateSuccess, Migration } from "../migration";
import { updateSourceFile } from "../lib/update-source-file";
import { migrateSourceFiles } from "../lib/migrate-source-files";
import * as semver from "semver";
import { dirname } from "node:path";

/**
 * Migrates code to use new symbols `createClient` and `Client` instead
 * of `createPromiseClient` and `PromiseClient`.
 */
export const v1_16_0: Migration = {
  applicable(scanned: Scanned) {
    return getMatchingPackages(scanned.packageFiles).length > 0;
  },
  migrate({
    scanned,
    print,
    logger,
    updateSourceFileFn = updateSourceFile,
  }): MigrateError | MigrateSuccess {
    // We want to limit to only matched packages.
    const matchingPackages = getMatchingPackages(scanned.packageFiles);
    const matchingSources = [];
    for (const source of scanned.sourceFiles) {
      // If source is within the package directory.
      if (
        matchingPackages.some(({ path }) => source.startsWith(dirname(path)))
      ) {
        matchingSources.push(source);
      }
    }
    if (matchingSources.length === 0) {
      return {
        ok: true,
      };
    }
    const { sourceFileErrors } = migrateSourceFiles(
      { ...scanned, sourceFiles: matchingSources },
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

function getMatchingPackages(packageFiles: Scanned["packageFiles"]) {
  const matched: Scanned["packageFiles"] = [];
  for (const packageFile of packageFiles) {
    if (
      [
        packageFile.pkg.dependencies,
        packageFile.pkg.devDependencies,
        packageFile.pkg.peerDependencies,
      ]
        .filter((e) => e !== undefined)
        .flatMap((deps) => Object.entries(deps))
        .some(([packageName, versionRange]) => {
          if (packageName !== "@connectrpc/connect") {
            return false;
          }
          const minVersion = semver.minVersion(versionRange);
          if (minVersion === null) {
            return false;
          }
          return semver.satisfies(minVersion, "^1.16.0");
        })
    ) {
      matched.push(packageFile);
    }
  }
  return matched;
}
