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

import type { Scanned } from "../lib/scan";
import modifyImports from "./v0.13.1-transform";
import type { MigrateError, MigrateSuccess, Migration } from "../migration";
import { runInstall } from "../lib/run";
import { writePackageJsonFile } from "../lib/package-json";
import {
  type DependencyMigration,
  migrateDependencies,
} from "../lib/migrate-dependencies";
import {
  migrateSourceFiles,
  updateSourceFile,
} from "../lib/migrate-source-files";
import { migratePackages } from "../lib/migrate-packages";
import { migrateLockFiles } from "../lib/migrate-lock-files";

export const targetVersionConnectEs = "1.6.0";
export const targetVersionConnectQuery = "1.4.2";

/**
 * The latest available version of protoc-gen-connect-web is v0.11.0.
 * v0.12.0 removed it. The package was never moved to the connectrpc org.
 *
 * Since this command cannot modify the project completely to switch
 * to protoc-gen-connect-es, it will abort the migration unless the
 * --force flag is set.
 */
const oldPluginReplacement = {
  from: { name: "@bufbuild/protoc-gen-connect-web", range: "*" },
  to: {
    name: "@connectrpc/protoc-gen-connect-es",
    version: targetVersionConnectEs,
  },
} satisfies DependencyMigration;

/**
 * v0.9.0 dropped several exports from @bufbuild/connect-web that had
 * been moved to a shared package in v0.8.0.
 *
 * Since this command cannot currently modify the imports accordingly,
 * it will abort the migration unless the --force flag is set.
 */
const removedWebExportReplacement: DependencyMigration = {
  from: { name: "@bufbuild/connect-web", range: "<0.9.0" },
  to: { name: "@connectrpc/connect-web", version: targetVersionConnectEs },
};

const dependencyMigrations: DependencyMigration[] = [
  oldPluginReplacement,
  removedWebExportReplacement,
  {
    from: { name: "@bufbuild/connect", range: "*" },
    to: { name: "@connectrpc/connect", version: targetVersionConnectEs },
  },
  {
    // was only published in v0.7.0, renamed to @bufbuild/connect in v0.8.0
    from: { name: "@bufbuild/connect-core", range: "*" },
    to: { name: "@connectrpc/connect", version: targetVersionConnectEs },
  },
  {
    from: { name: "@bufbuild/connect-web", range: "*" },
    to: { name: "@connectrpc/connect-web", version: targetVersionConnectEs },
  },
  {
    from: { name: "@bufbuild/connect-fastify", range: "*" },
    to: {
      name: "@connectrpc/connect-fastify",
      version: targetVersionConnectEs,
    },
  },
  {
    from: { name: "@bufbuild/connect-node", range: "*" },
    to: { name: "@connectrpc/connect-node", version: targetVersionConnectEs },
  },
  {
    from: { name: "@bufbuild/connect-next", range: "*" },
    to: { name: "@connectrpc/connect-next", version: targetVersionConnectEs },
  },
  {
    from: { name: "@bufbuild/connect-express", range: "*" },
    to: {
      name: "@connectrpc/connect-express",
      version: targetVersionConnectEs,
    },
  },
  {
    from: { name: "@bufbuild/protoc-gen-connect-es", range: "*" },
    to: {
      name: "@connectrpc/protoc-gen-connect-es",
      version: targetVersionConnectEs,
    },
  },
  {
    from: { name: "@bufbuild/connect-query", range: "*" },
    to: {
      name: "@connectrpc/connect-query",
      version: targetVersionConnectQuery,
    },
  },
  {
    from: { name: "@bufbuild/protoc-gen-connect-query", range: "*" },
    to: {
      name: "@connectrpc/protoc-gen-connect-query",
      version: targetVersionConnectQuery,
    },
  },
  {
    from: { name: "@bufbuild/protoc-gen-connect-query-react", range: "*" },
    to: {
      name: "@connectrpc/protoc-gen-connect-query-react",
      version: targetVersionConnectQuery,
    },
  },
];

/**
 * Migrates from any version of the @bufbuild packages to 0.13.1 of the @connectrpc
 * packages.
 */
export const v0_13_1: Migration = {
  applicable(scanned: Scanned) {
    return scanned.packageFiles.some(
      ({ pkg }) =>
        migrateDependencies(structuredClone(pkg), dependencyMigrations) !==
        null,
    );
  },
  migrate({
    scanned,
    args,
    print,
    logger,
    updateSourceFileFn = updateSourceFile,
    writePackageJsonFileFn = writePackageJsonFile,
    runInstallFn = runInstall,
  }): MigrateError | MigrateSuccess {
    if (!args.forceUpdate) {
      const errorLines = [];
      const oldPluginUsed = scanned.packageFiles
        .filter(
          ({ pkg }) =>
            migrateDependencies(structuredClone(pkg), [
              oldPluginReplacement,
            ]) !== null,
        )
        .map(({ path }) => path);
      if (oldPluginUsed.length > 0) {
        errorLines.push(
          `⚠️ You depend on the deprecated ${
            oldPluginReplacement.from.name
          } in ${oldPluginUsed.join(", ")}.`,
          `To switch to ${oldPluginReplacement.to.name}@${oldPluginReplacement.to.version}, run this command with the --force flag, and update your buf.gen.yaml and your import paths. See here for a guide: https://github.com/connectrpc/connect-es/tree/v0.8.0/packages/protoc-gen-connect-web`,
        );
      }
      const removedWebExportsUsed = scanned.packageFiles
        .filter(
          ({ pkg }) =>
            migrateDependencies(structuredClone(pkg), [
              removedWebExportReplacement,
            ]) !== null,
        )
        .map(({ path }) => path);
      if (removedWebExportsUsed.length > 0) {
        `${removedWebExportReplacement.from.name}@${removedWebExportReplacement.from.range}`;
        errorLines.push(
          `⚠️ You depend on ${removedWebExportReplacement.from.name}@${
            removedWebExportReplacement.from.range
          } in ${removedWebExportsUsed.join(", ")}.`,
          `You may be importing types like ConnectError from @bufbuild/connect-web, which is no longer supported since v0.9.0. Run this command with the --force flag, and import from @connectrpc/connect instead.`,
        );
      }
      if (errorLines.length > 0) {
        return {
          ok: false,
          dumpLogfile: false,
          errorMessage: [...errorLines].join("\n"),
        };
      }
    }

    const { updatedPackageFiles } = migratePackages(
      scanned,
      dependencyMigrations,
      print,
      writePackageJsonFileFn,
    );

    const errorLines: string[] = [];
    const { sourceFileErrors } = migrateSourceFiles(
      scanned,
      modifyImports,
      print,
      logger,
      updateSourceFileFn,
    );
    if (sourceFileErrors > 0) {
      errorLines.push(
        `⚠️${sourceFileErrors} source ${
          sourceFileErrors == 1 ? "file" : "files"
        } could not be updated.`,
        `You may have to update the files manually. Check the log for details.`,
      );
    }
    const { lockFileErrors } = migrateLockFiles(
      scanned,
      updatedPackageFiles,
      args,
      print,
      logger,
      runInstallFn,
    );
    if (lockFileErrors > 0) {
      errorLines.push(
        `⚠️${lockFileErrors} lock ${
          sourceFileErrors == 1 ? "file" : "files"
        } could not be updated.`,
        `To skip lock file updates, use the --no-install flag.`,
      );
    }
    if (errorLines.length > 0) {
      return {
        ok: false,
        errorMessage: errorLines.join("\n"),
        dumpLogfile: true,
      };
    }
    return {
      ok: true,
    };
  },
};
