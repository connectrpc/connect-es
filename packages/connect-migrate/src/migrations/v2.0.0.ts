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
import modifyImports from "./v2.0.0-transform";
import { MigrateError, MigrateSuccess, Migration } from "../migration";
import { runInstall } from "../lib/run";
import { writePackageJsonFile } from "../lib/package-json";
import {
  DependencyMigration,
  migrateDependencies,
} from "../lib/migrate-dependencies";
import {
  migrateSourceFiles,
  updateSourceFile,
} from "../lib/migrate-source-files";
import { migratePackages } from "../lib/migrate-packages";
import { migrateLockFiles } from "../lib/migrate-lock-files";
import {
  BufGenYamlMigration,
  migrateBufGenYaml,
  migrateBufGenYamls,
} from "../lib/migrate-bufgenyaml";
import { writeBufGenYamlFile } from "../lib/bufgenyaml";

export const targetVersionProtobufEs = "2.2.0";
export const targetVersionConnectEs = "2.0.0-beta.1"; // TODO
export const targetVersionConnectQuery = "2.0.0-beta.1"; // TODO
export const targetVersionConnectPlaywright = "0.4.0"; // TODO

const dependencyMigrations: DependencyMigration[] = [
  // https://github.com/bufbuild/protobuf-es
  {
    from: { name: "@bufbuild/protobuf", range: "^1.0.0" },
    to: { version: targetVersionProtobufEs },
  },
  {
    from: { name: "@bufbuild/protoplugin", range: "^1.0.0" },
    to: { version: targetVersionProtobufEs },
  },
  {
    from: { name: "@bufbuild/protoc-gen-es", range: "^1.0.0" },
    to: { version: targetVersionProtobufEs },
  },

  // https://github.com/connectrpc/connect-es
  {
    from: { name: "@connectrpc/connect", range: "^1.0.0" },
    to: { version: targetVersionConnectEs },
  },
  {
    from: { name: "@connectrpc/connect-express", range: "^1.0.0" },
    to: { version: targetVersionConnectEs },
  },
  {
    from: { name: "@connectrpc/connect-fastify", range: "^1.0.0" },
    to: { version: targetVersionConnectEs },
  },
  {
    from: { name: "@connectrpc/connect-next", range: "^1.0.0" },
    to: { version: targetVersionConnectEs },
  },
  {
    from: { name: "@connectrpc/connect-node", range: "^1.0.0" },
    to: { version: targetVersionConnectEs },
  },
  {
    from: { name: "@connectrpc/connect-web", range: "^1.0.0" },
    to: { version: targetVersionConnectEs },
  },
  {
    remove: { name: "@connectrpc/protoc-gen-connect-es", range: "^1.0.0" },
  },

  // TODO
  // // https://github.com/connectrpc/connect-query-es
  // {
  //   from: { name: "@connectrpc/connect-query", range: "^1.0.0" },
  //   to: { version: targetVersionConnectQuery },
  // },
  // {
  //   from: { name: "@connectrpc/protoc-gen-connect-query", range: "^1.0.0" },
  //   to: { version: targetVersionConnectQuery },
  // },

  // https://github.com/connectrpc/connect-playwright-es
  {
    from: { name: "@connectrpc/connect-playwright", range: "^0.3.0" },
    to: { version: targetVersionConnectPlaywright },
  },
];

const bufGenYamlMigrations: BufGenYamlMigration[] = [
  {
    removePlugin: {
      local: "protoc-gen-connect-es",
      remote: "buf.build/connectrpc/es",
    },
  },
  {
    updatePlugin: {
      remote: "buf.build/bufbuild/es",
      from: "^1.0.0",
      to: targetVersionProtobufEs,
    },
  },
  {
    updatePlugin: {
      remote: "buf.build/connectrpc/query-es",
      from: "^1.0.0",
      to: "1.4.2", // TODO
    },
  },
];

/**
 * Migrates to protobuf-es and connect-es v2.
 */
export const v2_0_0: Migration = {
  applicable(scanned: Scanned) {
    return (
      scanned.bufGenYamlFiles.some(
        ({ yaml }) => migrateBufGenYaml(yaml, bufGenYamlMigrations) !== null,
      ) ||
      scanned.packageFiles.some(
        ({ pkg }) =>
          migrateDependencies(structuredClone(pkg), dependencyMigrations) !==
          null,
      )
    );
  },
  migrate({
    scanned,
    args,
    print,
    logger,
    updateSourceFileFn = updateSourceFile,
    writePackageJsonFileFn = writePackageJsonFile,
    writeBufGenYamlFileFn = writeBufGenYamlFile,
    runInstallFn = runInstall,
  }): MigrateError | MigrateSuccess {
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
    const { updatedBufGenYamls } = migrateBufGenYamls(
      scanned,
      bufGenYamlMigrations,
      print,
      writeBufGenYamlFileFn,
    );
    if (updatedBufGenYamls.length > 0) {
      print(
        "  Make sure to re-generate code, for example with `npx buf generate`!\n",
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
