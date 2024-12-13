#!/usr/bin/env node

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

// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { readFileSync, writeFileSync, existsSync, globSync } from "node:fs";
import { dirname, join } from "node:path";

if (process.argv.length !== 3 || !/^\d+\.\d+\.\d+$/.test(process.argv[2])) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <new-version>`,
      "",
      "Walks through all workspace packages and sets the version of each ",
      "package to the given version.",
      "If a package depends on another package from the workspace, the",
      "dependency version is updated as well.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}
const newVersion = process.argv[2];
const rootPackagePath = "package.json";
const lockFilePath = "package-lock.json";

try {
  const lock = readLockfile(lockFilePath);
  const workspaces = readWorkspaces(rootPackagePath);
  const allPackages = workspaces.map((ws) => ws.pkg);
  const bumpPackages = allPackages.filter(
    (pkg) => pkg.version !== undefined && pkg.version !== newVersion,
  );
  /** @type {Log[]} */
  const log = [];
  for (const pkg of bumpPackages) {
    log.push({
      pkg,
      message: `updated version from ${pkg.version} to ${newVersion}`,
    });
    pkg.version = newVersion;
    findLockPackage(lock, pkg.name).version = newVersion;
  }
  for (const pkg of bumpPackages) {
    // update deps in workspace package.json
    for (const other of allPackages) {
      log.push(...updatePackageDep(other, pkg.name, newVersion));
    }
    // update deps in package-lock.json
    for (const lockPkg of Object.values(lock.packages)) {
      updatePackageDep(lockPkg, pkg.name, newVersion);
    }
  }
  if (log.length > 0) {
    for (const { path, pkg } of workspaces) {
      writeJson(path, pkg);
    }
    writeJson(lockFilePath, lock);
    process.stdout.write(formatLog(log) + "\n");
  }
} catch (e) {
  process.stderr.write(String(e) + "\n");
  process.exit(1);
}

/**
 * @typedef {{path: string; pkg: Package}} Workspace
 */

/**
 * Read the given root package.json file, and return an array of workspace
 * packages.
 *
 * @param {string} rootPackagePath
 * @return {Workspace[]}
 */
function readWorkspaces(rootPackagePath) {
  const root = readRootPackage(rootPackagePath);
  const rootDir = dirname(rootPackagePath);
  return root.workspaces
    .flatMap((ws) => globSync(join(rootDir, ws, "package.json")))
    .filter((path) => existsSync(path))
    .map((path) => {
      return { path, pkg: readPackage(path) };
    });
}

/**
 * @typedef {{message: string, pkg: Package}} Log
 */

/**
 * @param {Package|LockPackage} pkg
 * @param {string} depName
 * @param {string} toVersion
 * @return {Log[]}
 */
function updatePackageDep(pkg, depName, toVersion) {
  if (toVersion === undefined) {
    throw new Error("toVersion undefined");
  }
  /** @type {Log[]} */
  const log = [];
  for (const key of [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ]) {
    // eslint-disable-next-line n/no-unsupported-features/es-builtins,n/no-unsupported-features/es-syntax
    if (!Object.hasOwn(pkg, key)) {
      continue;
    }
    /** @type { Record<string, string> } */
    const deps = pkg[key];
    const from = deps[depName];
    if (from === undefined) {
      continue;
    }
    let to;
    if (from.startsWith("^")) {
      to = `^${toVersion}`;
    } else if (from.startsWith("~")) {
      to = `~${toVersion}`;
    } else if (from.startsWith("=")) {
      to = `=${toVersion}`;
    } else if (from === "*") {
      to = `*`;
    } else {
      to = toVersion;
    }
    if (from === to) {
      continue;
    }
    deps[depName] = to;
    log.push({
      pkg,
      message: `updated ${key}["${depName}"] from ${from} to ${to}`,
    });
  }
  return log;
}

/**
 *
 * @param {Log[]} log
 * @return {string}
 */
function formatLog(log) {
  const lines = [];
  const updatesByName = {};
  for (const l of log) {
    if (updatesByName[l.pkg.name] === undefined) {
      updatesByName[l.pkg.name] = [];
    }
    updatesByName[l.pkg.name].push(l);
  }
  for (const name of Object.keys(updatesByName).sort()) {
    lines.push(`${name}:`);
    for (const update of updatesByName[name]) {
      lines.push(`  ${update.message}`);
    }
  }
  return lines.join("\n");
}

/**
 * @typedef {{name: string; version?: string; private?: boolean}} Package
 */

/**
 * @param {string} path
 * @return {Package}
 */
function readPackage(path) {
  const json = JSON.parse(readFileSync(path, "utf-8"));
  if (typeof json !== "object" || json === null) {
    throw new Error(`Failed to parse ${path}`);
  }
  const lock = JSON.parse(readFileSync(path, "utf-8"));
  if (typeof lock !== "object" || lock === null) {
    throw new Error(`Failed to parse ${path}`);
  }
  if (!("name" in json) || typeof json.name != "string") {
    throw new Error(`Missing "name" in ${path}`);
  }
  if ("version" in json) {
    if (typeof json.version != "string") {
      throw new Error(`Invalid "version" in ${path}`);
    }
  } else if (!("private" in json) || json.private !== true) {
    throw new Error(`Need either "version" or "private":true in ${path}`);
  }
  return lock;
}

/**
 * @typedef {{packages: Record<string, LockPackage>}} Lockfile
 */

/**
 * @typedef {{name?: string; version?: string}} LockPackage
 */

/**
 * @param {string} path
 * @return {Lockfile}
 */
function readLockfile(path) {
  const lock = JSON.parse(readFileSync(path, "utf-8"));
  if (typeof lock !== "object" || lock === null) {
    throw new Error(`Failed to parse ${path}`);
  }
  if (!("lockfileVersion" in lock) || lock.lockfileVersion !== 3) {
    throw new Error(`Unsupported lock file version in ${path}`);
  }
  if (typeof lock.packages != "object" || lock.packages == null) {
    throw new Error(`Missing "packages" in ${path}`);
  }
  return lock;
}

/**
 * Locates an entry for a local workspace package in a lock file.
 * Throws an error if not found.
 *
 * @param {Lockfile} lock
 * @param {string} packageName
 * @return {LockPackage}
 */
function findLockPackage(lock, packageName) {
  for (const [path, lockPkg] of Object.entries(lock.packages)) {
    // eslint-disable-next-line n/no-unsupported-features/es-builtins,n/no-unsupported-features/es-syntax
    if (Object.hasOwn(lockPkg, "name") && lockPkg.name === packageName) {
      return lockPkg;
    }
    // In some situations, the entry for a local package doesn't have a "name" property.
    // We check the path of the entry instead: If the last path element is the same as
    // the package name without scope, it's the entry we are looking for.
    if (path.startsWith("node_modules/")) {
      // Not a local workspace package
      continue;
    }
    const lastPathEle = path.split("/").pop();
    const packageShortname = packageName.split("/").pop();
    if (lastPathEle === packageShortname) {
      return lockPkg;
    }
  }
  throw new Error(
    `Cannot find package ${packageName} in lock file. Run npm install?`,
  );
}

/**
 * @typedef {{ name?: string; version?: string; workspaces: string[] }} RootPackage
 */

/**
 * @param {string} path
 * @return {RootPackage}
 */
function readRootPackage(path) {
  const json = JSON.parse(readFileSync(path, "utf-8"));
  if (typeof json !== "object" || json === null) {
    throw new Error(`Failed to parse ${path}`);
  }
  if (
    !Array.isArray(json.workspaces) ||
    json.workspaces.some((w) => typeof w !== "string")
  ) {
    throw new Error(`Missing or malformed "workspaces" array in ${path}`);
  }
  return json;
}

/**
 * @param {string} path
 * @param {any} json
 */
function writeJson(path, json) {
  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
}
