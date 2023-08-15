/* eslint-disable no-console -- We use this to output results. */
import { replacePackageJSONReferences } from "./replacement-map";
import fastBlob from "fast-glob";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import * as path from "node:path";
import { createRequire } from "node:module";
import * as url from "node:url";
import assert from "node:assert";
import process from "node:process";
import { spawnSync } from "node:child_process";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);
const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");

// We reference src here so jscodeshift can digest the transform
// as it is, since jscodeshift can't seem to handle compiled ts.
const transformerDirectory = path.join(__dirname, "../", "src", "transforms");
const transformerPath = path.join(transformerDirectory, `modify-imports.ts`);

async function replacePackageReferences() {
  const dir = process.cwd();
  const packageExists = existsSync(path.join(dir, "package.json"));

  function executeInContext(command: string, args: string[]) {
    spawnSync(command, args, {
      cwd: dir,
      shell: true,
      stdio: ["pipe", "inherit", "inherit"],
    });
  }

  assert(
    packageExists,
    "Could not find package.json. This command must be run in a directory with a package.json file."
  );
  let packageManager: "pnpm" | "npm" | "yarn" | undefined = undefined;
  if (existsSync(path.join(dir, "pnpm-lock.yaml"))) {
    packageManager = "pnpm";
  } else if (existsSync(path.join(dir, "package-lock.json"))) {
    packageManager = "npm";
  } else if (existsSync(path.join(dir, "yarn.lock"))) {
    packageManager = "yarn";
  }
  assert(
    packageManager !== undefined,
    "Could not determine package manager based on lock file. Make sure you have a lock file (yarn.lock, package-lock.json, or pnpm-lock.yaml) in your project."
  );
  console.log("Updating package dependencies...");
  const files = await fastBlob.async(["./**/package.json", "./package.json"], {
    ignore: ["**/node_modules/**"],
  });
  for (const file of files) {
    console.log(`Updating ${file}...`);
    const fileContents = await readFile(file, "utf-8");
    await writeFile(file, replacePackageJSONReferences(fileContents), "utf-8");
  }
  console.log("Updated package dependencies.");
  console.log("Updating references...");
  executeInContext(jscodeshiftExecutable, [
    "--ignore-pattern=**/node_modules/**",
    "--extensions=tsx,ts,jsx,js,cjs,mjs",
    // TSX covers everything we need to be concerned about. The one parser it won't
    // cover is something like flow but we can worry about flow later and add it as a param.
    "--parser=tsx",
    "--transform",
    transformerPath,
    ".",
  ]);
  console.log("Updated references.");
  console.log("Installing dependencies...");
  if (packageManager === "npm") {
    executeInContext("npm", ["install"]);
  } else if (packageManager === "pnpm") {
    executeInContext("pnpm", ["install", "-r"]);
  } else {
    executeInContext("yarn", ["install"]);
  }
  console.log("Dependencies installed.");
}

void replacePackageReferences();
