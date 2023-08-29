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

import { PackageJson } from "./package-json";
import {
  intersects as semverIntersects,
  satisfies as semverSatisfies,
} from "semver";

export type DependencyReplacement = {
  from: { name: string; range: string };
  to: { name?: string; version: string };
};

/**
 * Replace all dependencies matching "from" with "to".
 */
export function replaceDependencies(
  pkg: Readonly<PackageJson>,
  replacements: DependencyReplacement[],
): PackageJson | null {
  const modifiedPackageNames = new Set<string>();
  const replacedPackageNames = new Map<string, string>();
  const copy = structuredClone(pkg) as PackageJson;
  // replace dependencies
  for (const replacement of replacements) {
    for (const p of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
    ] as const) {
      const deps = copy[p] ?? {};
      for (const [packageName, versionRange] of Object.entries(deps)) {
        if (packageName !== replacement.from.name) {
          continue;
        }
        if (!semverIntersects(replacement.from.range, versionRange)) {
          // the user's version does not match, so we skip
          continue;
        }
        modifiedPackageNames.add(packageName);
        const newPackageName = replacement.to.name ?? packageName;
        if (semverSatisfies(replacement.to.version, versionRange)) {
          // The new version we want satisfies the current range of the
          // dependency, so we do not modify the range.
          // This is supported specifically for migrating from @bufbuild/connect@0.13.0
          // to @connectrpc@0.13.1.
          deps[newPackageName] = deps[packageName];
        } else {
          // The new version does not satisfy the current range.
          // We set our version as a caret range.
          deps[newPackageName] = `^${replacement.to.version}`;
        }
        if (newPackageName !== packageName) {
          // the name of the dependency has changed, we delete the old entry
          delete deps[packageName];
          replacedPackageNames.set(packageName, newPackageName);
        }
      }
    }
  }
  // replace bundled dependencies, but only for package names we replaced
  for (const p of ["bundleDependencies", "bundledDependencies"] as const) {
    const bundled = copy[p];
    if (!Array.isArray(bundled)) {
      continue;
    }
    copy[p] = bundled.map((n) => replacedPackageNames.get(n) ?? n);
  }
  // replace peer dependency meta, but only for package names we replaced
  const meta = copy.peerDependenciesMeta;
  if (meta !== undefined) {
    for (const [n, value] of Object.entries(meta)) {
      const newName = replacedPackageNames.get(n);
      if (newName === undefined) {
        continue;
      }
      delete meta[n];
      meta[newName] = value;
    }
  }
  return modifiedPackageNames.size > 0 ? copy : null;
}
