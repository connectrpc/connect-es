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

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { existsSync } from "node:fs";
import assert from "node:assert";

if (process.argv.length < 3) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <new-version>`,
      "",
      "Walks through all packages in the given workspace directory and",
      "sets the version of each package to the given version.",
      "If a package depends on another package from the workspace, the",
      "dependency version is updated as well.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

try {
  const newVersion = process.argv[2];
  const packagesDir = "packages";
  const lockFile = "package-lock.json";
  const packages = readPackages(packagesDir);
  const lock = tryReadLock(lockFile);
  const updates = setVersion(packages, lock, newVersion);
  if (updates.length > 0) {
    writePackages(packagesDir, packages);
    if (lock) {
      writeLock(lockFile, lock);
    }
    process.stdout.write(formatUpdates(updates) + "\n");
  }
} catch (e) {
  process.stderr.write(String(e) + "\n");
  process.exit(1);
}

function setVersion(packages, lock, newVersion) {
  const updates = [];
  for (const pkg of packages) {
    if (typeof pkg.version !== "string") {
      continue;
    }
    assert(pkg.name);
    if (pkg.version === newVersion) {
      continue;
    }
    pkg.version = newVersion;
    if (lock) {
      const l = Array.from(Object.values(lock.packages)).find(
        (l) => l.name === pkg.name,
      );
      assert(l);
      l.version = newVersion;
    }
    updates.push({
      package: pkg,
      message: `updated version from ${pkg.version} to ${newVersion}`,
    });
  }
  updates.push(...syncDeps(packages, packages));
  if (lock) {
    syncDeps(Object.values(lock.packages), packages);
  }
  return updates;
}

function syncDeps(packages, deps) {
  const updates = [];
  for (const pkg of packages) {
    for (const key of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      if (!Object.prototype.hasOwnProperty.call(pkg, key)) {
        continue;
      }
      for (const [name, version] of Object.entries(pkg[key])) {
        const dep = deps.find((x) => x.name === name);
        if (!dep) {
          continue;
        }
        let wantVersion = dep.version;
        if (version.startsWith("^")) {
          wantVersion = "^" + wantVersion;
        } else if (version.startsWith("~")) {
          wantVersion = "~" + wantVersion;
        } else if (version.startsWith("=")) {
          wantVersion = "=" + wantVersion;
        } else if (version === "*") {
          wantVersion = "*";
        }
        if (wantVersion === version) {
          continue;
        }
        pkg[key][name] = wantVersion;
        updates.push({
          package: pkg,
          message: `updated ${key}["${name}"] from ${version} to ${wantVersion}`,
        });
      }
    }
  }
  return updates;
}

function readPackages(packagesDir) {
  const packagesByPath = readPackagesByPath(packagesDir);
  return Object.values(packagesByPath);
}

function writePackages(packagesDir, packages) {
  const packagesByPath = readPackagesByPath(packagesDir);
  for (const [path, oldPkg] of Object.entries(packagesByPath)) {
    const newPkg = packages.find((p) => p.name === oldPkg.name);
    writeFileSync(path, JSON.stringify(newPkg, null, 2) + "\n");
  }
}

function readPackagesByPath(packagesDir) {
  const packages = {};
  for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const path = join(packagesDir, entry.name, "package.json");
    if (existsSync(path)) {
      const pkg = JSON.parse(readFileSync(path, "utf-8"));
      if (!pkg.name) {
        throw new Error(`${path} is missing "name"`);
      }
      packages[path] = pkg;
    }
  }
  return packages;
}

function formatUpdates(updates) {
  const lines = [];
  const updatesByName = {};
  for (const update of updates) {
    if (updatesByName[update.package.name] === undefined) {
      updatesByName[update.package.name] = [];
    }
    updatesByName[update.package.name].push(update);
  }
  for (const name of Object.keys(updatesByName).sort()) {
    lines.push(`${name}:`);
    for (const update of updatesByName[name]) {
      lines.push(`  ${update.message}`);
    }
  }
  return lines.join("\n");
}

function tryReadLock(lockFile) {
  if (!existsSync(lockFile)) {
    return null;
  }
  const lock = JSON.parse(readFileSync(lockFile, "utf-8"));
  assert(lock.lockfileVersion === 3);
  assert(typeof lock.packages == "object");
  assert(lock.packages !== null);
  return lock;
}

function writeLock(lockFile, lock) {
  writeFileSync(lockFile, JSON.stringify(lock, null, 2) + "\n");
}
