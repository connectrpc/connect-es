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

import { replacePackageJSONReferences } from "./replacement-map";
import fastGlob from "fast-glob";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import * as path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { parseCommandLineArgs, CommandLineArgs } from "./arguments";
import { run as jscodeshift } from "jscodeshift/src/Runner";

const args = parseCommandLineArgs(process.argv.slice(2));

const usage = `USAGE: connect-migrate
Updates references to connect-es packages in your project to use @connectrpc.

Options:
  --version                   Print the version of connect-migrate.
  --recursive                 Recursively search for lock files in order to find all projects that might need updates.
  --ignore-pattern <pattern>  Glob pattern to ignore both source files. Defaults to **/dist/**. Supports multiples.
  --no-install                Skip dependency installation after updating package.json files.
`;

if (!args.ok) {
  process.stderr.write(`${args.errorMessage}\n`);
  process.exit(1);
}

if (args.version) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- assumings valid package.json
  const version = JSON.parse(
    readFileSync(path.join(__dirname, "../../package.json"), "utf8")
  ).version;
  process.stdout.write(`${version}\n`);
  process.exit(0);
}

if (args.help) {
  process.stdout.write(usage);
  process.exit(0);
}

const transformerPath = path.join(__dirname, "transforms", `modify-imports.js`);

async function main(args: CommandLineArgs) {
  let dirs = [process.cwd()];

  if (args.recursive) {
    // eslint-disable-next-line import/no-named-as-default-member -- fast-glob doesn't seem to support ESM imports
    const nestedDirs = await fastGlob.async(
      ["./**/pnpm-lock.yaml", "./**/package-lock.json", "./**/yarn-lock.yaml"],
      {
        ignore: ["**/node_modules/**"],
        cwd: process.cwd(),
      }
    );
    dirs = nestedDirs.map((dir) => path.dirname(dir));
  }
  for (const dir of dirs) {
    process.stdout.write(`Updating package found at "${dir}"...\n`);
    process.stdout.write("Updating package dependencies...\n");
    await updatePackageFiles(dir);
    process.stdout.write("Updated package dependencies.\n");
    process.stdout.write("Updating references...\n");
    await updateSourceFiles(dir, { ignorePatterns: args.ignorePatterns });
    process.stdout.write("Updated references.\n");
    if (!args.noInstall) {
      process.stdout.write("Installing dependencies...\n");
      reinstallDependencies(dir);
      process.stdout.write("Dependencies installed.\n");
    } else {
      process.stdout.write(
        "Skipping dependency installation (--no-install).\n"
      );
    }
  }

  process.exit(0);
}

void main(args);

function reinstallDependencies(dir: string) {
  // TODO: Perhaps we can find all the lock files and run install wherever we find them. This'll help for repos without a single
  // top level lock file.
  const packageManager = getPackageManager(dir);

  if (packageManager === undefined) {
    process.stderr.write(
      "Cannot reinstall dependencies if we can't find a lockfile. Make sure you have a lock file (yarn.lock, package-lock.json, or pnpm-lock.yaml) in your project."
    );
    process.exit(1);
  }

  const spawn =
    packageManager === "npm"
      ? executeInContext("npm", ["install"])
      : packageManager === "pnpm"
      ? executeInContext("pnpm", ["install", "-r"])
      : executeInContext("yarn", ["install"]);
  if (spawn.status !== 0) {
    process.stderr.write(
      "Failed to install dependencies. Check to make sure you have the most recent versions of @connectrpc/connect-* packages installed."
    );
    process.exit(1);
  }

  function executeInContext(command: string, args: string[]) {
    return spawnSync(command, args, {
      cwd: dir,
      shell: true,
      stdio: ["pipe", "inherit", "inherit"],
    });
  }
}

async function updateSourceFiles(
  dir: string,
  { ignorePatterns }: { ignorePatterns: string[] }
) {
  // eslint-disable-next-line import/no-named-as-default-member -- fast-glob doesn't seem to support ESM imports
  const files = await fastGlob.async(
    [
      "./**/*.tsx",
      "./**/*.ts",
      "./**/*.js",
      "./**/*.jsx",
      "./**/*.cjs",
      "./**/*.mjs",
    ],
    {
      ignore: ["**/node_modules/**", ...ignorePatterns],
      cwd: dir,
    }
  );

  await jscodeshift(
    transformerPath,
    files.map((f) => path.join(dir, f)),
    {
      parser: "tsx",
    }
  );
}

async function updatePackageFiles(dir: string) {
  // eslint-disable-next-line import/no-named-as-default-member -- fast-glob doesn't seem to support ESM imports
  const files = await fastGlob.async(["./**/package.json", "./package.json"], {
    ignore: ["**/node_modules/**"],
    cwd: dir,
  });
  for (const relativeFile of files) {
    const file = path.join(dir, relativeFile);
    process.stdout.write(`Updating ${file}...\n`);
    const fileContents = await readFile(file, "utf-8");
    await writeFile(file, replacePackageJSONReferences(fileContents), "utf-8");
  }
}

function getPackageManager(dir: string) {
  let packageManager: "pnpm" | "npm" | "yarn" | undefined = undefined;
  if (existsSync(path.join(dir, "pnpm-lock.yaml"))) {
    packageManager = "pnpm";
  } else if (existsSync(path.join(dir, "package-lock.json"))) {
    packageManager = "npm";
  } else if (existsSync(path.join(dir, "yarn.lock"))) {
    packageManager = "yarn";
  }

  return packageManager;
}
