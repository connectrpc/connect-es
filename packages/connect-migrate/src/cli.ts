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

import { readFileSync } from "node:fs";
import * as path from "node:path";
import process from "node:process";
import { parseCommandLineArgs } from "./arguments";
import { scan } from "./lib/scan";
import { Logger } from "./lib/logger";
import { v0_13_1 } from "./migrations/v0.13.1";

const usage = `USAGE: connect-migrate [flags]
Updates references to connect-es packages in your project to use @connectrpc.

Flags:
  --ignore-pattern <pattern>  Glob pattern to ignore source and package files. Defaults to **/dist/**. Supports multiples.
  --no-install                Skip dependency installation after updating package.json files.
  --version                   Print the version of connect-migrate.
  --help                      Print this help.
  --force                     Continue migration despite warnings.
`;

const logger = new Logger();

void main();

async function main() {
  try {
    const args = parseCommandLineArgs(process.argv.slice(2));
    if (!args.ok) {
      return exitErr(args.errorMessage, false);
    }
    if (args.version) {
      exitOk(getCliVersion());
    }
    if (args.help) {
      exitOk(usage);
    }
    const scanned = scan(args.ignorePatterns, process.cwd(), print, logger);
    if (!scanned.ok) {
      return exitErr(scanned.errorMessage, false);
    }
    if (v0_13_1.applicable(scanned)) {
      const result = v0_13_1.migrate({ scanned, args, print, logger });
      if (!result.ok) {
        return exitErr(result.errorMessage, result.dumpLogfile ?? false);
      }
    } else {
      exitOk("It looks like you are already up to date 🎉");
    }
  } catch (e) {
    logger.error(`caught error: ${String(e)}`);
    if (e instanceof Error && e.stack !== undefined) {
      logger.error(e.stack);
    }
    return exitErr(
      `ERROR: ${e instanceof Error ? e.message : String(e)}`,
      true,
    );
  }
}

function print(text: string) {
  process.stdout.write(text);
}

async function exitErr(
  errorMessage: string,
  dumpLogFile: boolean,
): Promise<never> {
  process.stderr.write(errorMessage);
  if (!errorMessage.endsWith("\n")) {
    process.stdout.write("\n");
  }
  if (dumpLogFile) {
    const logfilePath = await logger.close();
    process.stdout.write(`Details were logged to ${logfilePath}\n`);
  }
  process.exit(1);
}

function exitOk(message: string): never {
  process.stdout.write(message);
  if (!message.endsWith("\n")) {
    process.stdout.write("\n");
  }
  process.exit(0);
}

function getCliVersion() {
  return JSON.parse(
    readFileSync(path.join(__dirname, "../../package.json"), "utf8"),
  ).version as string; // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- assumings valid package.json
}
