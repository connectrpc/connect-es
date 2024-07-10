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

import { PackageJson } from "./package-json";
import {
  intersects as semverIntersects,
  satisfies as semverSatisfies,
  valid as semverValid,
  validRange as semverValidRange,
} from "semver";

/**
 * Migrate matching dependencies, removing, upgrading, or renaming them.
 */
export type DependencyMigration = DependencyReplacement | DependencyRemoval;
/**
 * Replace all dependencies matching "from" with "to".
 */
type DependencyReplacement = {
  from: { name: string; range: string };
  to: { name?: string; version: string };
};
/**
 * Remove all dependencies matching name and version range.
 */
type DependencyRemoval = {
  remove: { name: string; range: string };
};

/**
 * Migrate matching dependencies, removing, upgrading, or renaming them.
 */
export function migrateDependencies(
  pkg: Readonly<PackageJson>,
  migrations: DependencyMigration[],
): PackageJson | null {
  if (migrations.some((migration) => !validateDependencyMigration(migration))) {
    throw new Error("Invalid dependency migration specified");
  }
  const modifiedDepNames = new Set<string>();
  const removedDepNames = new Set<string>();
  const replacedDepNames = new Map<string, string>();
  const copy = structuredClone(pkg) as PackageJson;
  for (const migration of migrations) {
    for (const p of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
    ] as const) {
      const deps = copy[p] ?? {};
      if ("remove" in migration) {
        // DependencyRemoval
        migration.remove.name;
        migration.remove.range;
        for (const [depName, depRange] of Object.entries(deps)) {
          if (depName !== migration.remove.name) {
            continue;
          }
          if (!semverIntersects(migration.remove.range, depRange)) {
            // the user's version does not match, so we skip
            continue;
          }
          modifiedDepNames.add(depName);
          removedDepNames.add(depName);
          delete deps[depName];
        }
      } else {
        // DependencyReplacement
        for (const [depName, depRange] of Object.entries(deps)) {
          if (depName !== migration.from.name) {
            continue;
          }
          if (!semverIntersects(migration.from.range, depRange)) {
            // the user's version does not match, so we skip
            continue;
          }
          modifiedDepNames.add(depName);
          const newPackageName = migration.to.name ?? depName;
          if (semverSatisfies(migration.to.version, depRange)) {
            // The new version we want satisfies the current range of the
            // dependency, so we do not modify the range.
            // This is supported specifically for migrating from @bufbuild/connect@0.13.0
            // to @connectrpc@0.13.1.
            deps[newPackageName] = deps[depName];
          } else {
            // The new version does not satisfy the current range.
            // We set our version as a caret range.
            deps[newPackageName] = `^${migration.to.version}`;
          }
          if (newPackageName !== depName) {
            // the name of the dependency has changed, we delete the old entry
            delete deps[depName];
            replacedDepNames.set(depName, newPackageName);
          }
        }
      }
    }
  }
  // for bundled dependencies, replace names we replaced, and remove names we removed
  for (const p of ["bundleDependencies", "bundledDependencies"] as const) {
    const bundled = copy[p];
    if (!Array.isArray(bundled)) {
      continue;
    }
    copy[p] = bundled
      .map((n) => replacedDepNames.get(n) ?? n)
      .filter((n) => !removedDepNames.has(n));
  }
  // for peer dependency meta, replace names we replaced, and remove names we removed
  const meta = copy.peerDependenciesMeta;
  if (meta !== undefined) {
    for (const [n, value] of Object.entries(meta)) {
      if (removedDepNames.has(n)) {
        delete meta[n];
        continue;
      }
      const newName = replacedDepNames.get(n);
      if (newName === undefined) {
        continue;
      }
      delete meta[n];
      meta[newName] = value;
    }
  }
  return modifiedDepNames.size > 0 ? copy : null;
}

/**
 * Returns false if a range or version is invalid.
 */
function validateDependencyMigration(migration: DependencyMigration): boolean {
  if ("remove" in migration) {
    if (semverValidRange(migration.remove.range) == null) {
      return false;
    }
  } else {
    if (semverValidRange(migration.from.range) == null) {
      return false;
    }
    if (semverValid(migration.to.version) == null) {
      return false;
    }
  }
  return true;
}
