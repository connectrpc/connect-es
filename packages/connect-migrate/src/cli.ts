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

import { readFileSync } from "node:fs";
import * as path from "node:path";
import { argv, cwd, exit, stderr, stdout } from "node:process";
import { parseCommandLineArgs } from "./arguments";
import { scan } from "./scan";
import {
  updateLockfile,
  updatePackageFiles,
  updateSourceFile,
} from "./migrate";
import { Logger } from "./log";
import modifyImports from "./transforms/modify-imports";

const usage = `USAGE: connect-migrate
Updates references to connect-es packages in your project to use @connectrpc.

Options:
  --ignore-pattern <pattern>  Glob pattern to ignore source and package files. Defaults to **/dist/**. Supports multiples.
  --no-install                Skip dependency installation after updating package.json files.
  --version                   Print the version of connect-migrate.
  --help                      Print this help.
`;

const logger = new Logger();

try {
  const args = parseCommandLineArgs(argv.slice(2));

  if (!args.ok) {
    stderr.write(`${args.errorMessage}\n`);
    exit(1);
  }

  if (args.version) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- assumings valid package.json
    const version = JSON.parse(
      readFileSync(path.join(__dirname, "../../package.json"), "utf8"),
    ).version;
    stdout.write(`${version}\n`);
    exit(0);
  }

  if (args.help) {
    stdout.write(usage);
    exit(0);
  }

  stdout.write(`Scanning... `);
  const scanned = scan(args.ignorePatterns, cwd(), logger);
  stdout.write(`✓\n`);
  stdout.write(
    `${scanned.packageFiles.length.toString().padStart(5)} package.json ${
      scanned.packageFiles.length == 1 ? "file" : "files"
    }\n`,
  );
  stdout.write(
    `${scanned.lockFiles.length.toString().padStart(5)} lock ${
      scanned.lockFiles.length == 1 ? "file" : "files"
    }\n`,
  );
  stdout.write(
    `${scanned.sourceFiles.length.toString().padStart(5)} source ${
      scanned.sourceFiles.length == 1 ? "file" : "files"
    }\n`,
  );
  if (scanned.packageFiles.length === 0 && scanned.sourceFiles.length === 0) {
    stderr.write(
      `No files to process. Make sure to run the command in a JavaScript or TypeScript project.\n`,
    );
    exit(1);
  }

  // update source files
  let sourceFileErrors = 0;
  if (scanned.sourceFiles.length > 0) {
    stdout.write(
      `Updating source ${
        scanned.sourceFiles.length == 1 ? "file" : "files"
      }... \n`,
    );
    let sourceFilesUpdated = false;
    for (const path of scanned.sourceFiles) {
      const r = updateSourceFile(modifyImports, path, logger);
      if (r.ok) {
        if (r.modified) {
          stdout.write(`  ${path} ✓\n`);
          sourceFilesUpdated = true;
        }
      } else {
        stdout.write(`  ${path} ❌\n`);
        sourceFileErrors++;
      }
    }
    if (!sourceFilesUpdated) {
      stdout.write(`  No files modified.\n`);
    }
  }

  // update package.json
  let packageFilesUpdated = false;
  if (scanned.packageFiles.length > 0) {
    stdout.write(`Updating packages... `);
    const updated = updatePackageFiles(scanned.packageFiles);
    stdout.write(`✓\n`);
    if (updated.modified.length == 0) {
      if (scanned.lockFiles.length > 0) {
        stdout.write(`  No files modified. Will not update lock files.\n`);
      } else {
        stdout.write(`  No files modified.\n`);
      }
    } else {
      for (const path of updated.modified) {
        stdout.write(`  ${path} ✓\n`);
      }
      packageFilesUpdated = true;
    }
  }

  // update lock files
  let lockFileErrors = 0;
  if (scanned.lockFiles.length > 0 && packageFilesUpdated) {
    if (args.noInstall) {
      stdout.write("Skipping dependency installation (--no-install).\n");
    } else {
      stdout.write(
        `Updating lock ${
          scanned.lockFiles.length == 1 ? "file" : "files"
        }... \n`,
      );
      for (const path of scanned.lockFiles) {
        if (updateLockfile(path, logger)) {
          stdout.write(`  ${path} ✓\n`);
        } else {
          stdout.write(`  ${path} ❌\n`);
          lockFileErrors++;
        }
      }
    }
  }

  if (sourceFileErrors > 0 || lockFileErrors > 0) {
    if (sourceFileErrors > 0) {
      stdout.write(
        `${sourceFileErrors} source ${
          sourceFileErrors == 1 ? "file" : "files"
        } could not be updated.\n`,
      );
      stdout.write(
        `You may have to update the files manually. Check the log for details.\n`,
      );
    }
    if (lockFileErrors > 0) {
      stdout.write(
        `${lockFileErrors} lock ${
          lockFileErrors == 1 ? "file" : "files"
        } could not be updated.\n`,
      );
      stdout.write(
        `Check to make sure you have the most recent versions of @bufbuild/connect-* packages installed before you migrate.\n`,
      );
      stdout.write(`To skip lock file updates, use the --no-install flag.\n`);
    }
    void logger.close().then((logfilePath) => {
      stdout.write(`Details were logged to ${logfilePath}\n`);
      exit(1);
    });
  }
} catch (e) {
  logger.error(`caught error: ${String(e)}`);
  if (e instanceof Error && e.stack !== undefined) {
    logger.error(e.stack);
  }
  stderr.write(`ERROR: ${e instanceof Error ? e.message : String(e)}\n`);
  void logger.close().then((logfilePath) => {
    stdout.write(`Details were logged to ${logfilePath}\n`);
    exit(1);
  });
}
