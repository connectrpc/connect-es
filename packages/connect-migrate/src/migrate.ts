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

import { readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import {
  getLockFilePackageManager,
  PackageJson,
  writePackageJsonFile,
} from "./scan";
import { run } from "./run";
import type { Transform } from "jscodeshift";
import jscodeshift from "jscodeshift/src/core";
import { Logger } from "./log";
import { minVersion, lt } from "semver";

// TODO: The following versions are hardcoded for now but we probably want to
// be able to pull this information from somewhere eventually
export const replacementMap = {
  "@bufbuild/connect": {
    newPackage: "@connectrpc/connect",
    version: "0.13.1",
  },
  "@bufbuild/connect-web": {
    newPackage: "@connectrpc/connect-web",
    version: "0.13.1",
  },
  "@bufbuild/connect-fastify": {
    newPackage: "@connectrpc/connect-fastify",
    version: "0.13.1",
  },
  "@bufbuild/connect-node": {
    newPackage: "@connectrpc/connect-node",
    version: "0.13.1",
  },
  "@bufbuild/connect-next": {
    newPackage: "@connectrpc/connect-next",
    version: "0.13.1",
  },
  "@bufbuild/connect-express": {
    newPackage: "@connectrpc/connect-express",
    version: "0.13.1",
  },
  "@bufbuild/protoc-gen-connect-es": {
    newPackage: "@connectrpc/protoc-gen-connect-es",
    version: "0.13.1",
  },
  "@bufbuild/protoc-gen-connect-web": {
    newPackage: "@connectrpc/protoc-gen-connect-web",
    version: "0.13.1",
  },
  "@bufbuild/connect-query": {
    newPackage: "@connectrpc/connect-query",
    version: "0.4.2",
  },
  "@bufbuild/protoc-gen-connect-query": {
    newPackage: "@connectrpc/protoc-gen-connect-query",
    version: "0.4.2",
  },
  "@bufbuild/protoc-gen-connect-query-react": {
    newPackage: "@connectrpc/protoc-gen-connect-query-react",
    version: "0.4.2",
  },
} as const;

const keys = Object.keys(replacementMap) as (keyof typeof replacementMap)[];

interface UsedPackage {
  packageName: keyof typeof replacementMap;
  version: string;
  location: "dependencies" | "devDependencies" | "peerDependencies";
}

export function getReplacementImport(sourceValue: string): string | undefined {
  const match = keys.find((key) => {
    return sourceValue === key || sourceValue.startsWith(`${key}/`);
  });
  if (sourceValue === match) {
    return replacementMap[match].newPackage;
  } else if (match !== undefined) {
    return sourceValue.replace(
      `${match}/`,
      `${replacementMap[match].newPackage}/`,
    );
  }
  return undefined;
}

export function replacePackageJSONReferences(
  pkg: Readonly<PackageJson>,
  packagesToForceUpdate?: { packageName: string }[],
): PackageJson | null {
  let modified = false;
  const copy = structuredClone(pkg) as PackageJson;
  for (const legacyPackageName of keys) {
    // replace package names in bundled dependencies
    for (const p of ["bundleDependencies", "bundledDependencies"] as const) {
      const bundled = copy[p];
      if (!Array.isArray(bundled) || !bundled.includes(legacyPackageName)) {
        continue;
      }
      modified = true;
      copy[p] = bundled.map((n) =>
        n === legacyPackageName
          ? replacementMap[legacyPackageName].newPackage
          : n,
      );
    }
    // replace package names in peer dependency meta
    const meta = copy.peerDependenciesMeta;
    if (meta !== undefined && Object.keys(meta).includes(legacyPackageName)) {
      modified = true;
      meta[replacementMap[legacyPackageName].newPackage] =
        meta[legacyPackageName];
      delete meta[legacyPackageName];
    }
    // replace package names in dependencies, maybe bumping versions
    for (const p of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
    ] as const) {
      const deps = copy[p] ?? {};
      for (const [key, value] of Object.entries(deps)) {
        if (key !== legacyPackageName) {
          continue;
        }
        modified = true;
        delete deps[key];
        const forceUpdate =
          packagesToForceUpdate?.find(
            (p) => p.packageName === legacyPackageName,
          ) !== undefined;
        deps[replacementMap[legacyPackageName].newPackage] = forceUpdate
          ? `${replacementMap[legacyPackageName].version}`
          : value;
      }
    }
  }
  return modified ? copy : null;
}

function getUsedPackages(pkg: PackageJson): UsedPackage[] {
  const result: UsedPackage[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const fieldsToCheck = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
  ] as const;
  for (const legacyPackageName of keys) {
    for (const field of fieldsToCheck) {
      const version = pkg[field]?.[legacyPackageName];
      if (version !== undefined) {
        result.push({
          packageName: legacyPackageName,
          version,
          location: field,
        });
      }
    }
  }
  return result;
}

export function getInvalidUsedPackagesForPackageFile(pkg: PackageJson) {
  const usedPackages = getUsedPackages(pkg);
  const invalidPackages = usedPackages.filter((usedPackage) => {
    const replacement = replacementMap[usedPackage.packageName];
    const currentMinVersion = minVersion(usedPackage.version);
    if (currentMinVersion === null) {
      return true;
    }
    return lt(currentMinVersion, replacement.version);
  });
  return invalidPackages;
}

export function getInvalidUsedPackages(
  packages: { path: string; pkg: PackageJson }[],
) {
  return packages
    .map(({ path, pkg }) => {
      const invalidPackages = getInvalidUsedPackagesForPackageFile(pkg);
      return { path, invalidPackages };
    })
    .filter((i) => i.invalidPackages.length > 0);
}

export function updatePackageFiles(
  packageFiles: { path: string; pkg: PackageJson }[],
  packagesToForceUpdate: {
    path: string;
    invalidPackages: UsedPackage[];
  }[],
) {
  const modified: string[] = [];
  const unmodified: string[] = [];
  for (const { path, pkg } of packageFiles) {
    const updated = replacePackageJSONReferences(
      pkg,
      packagesToForceUpdate.find((p) => p.path === path)?.invalidPackages ?? [],
    );
    if (updated === null) {
      unmodified.push(path);
    } else {
      writePackageJsonFile(path, updated);
      modified.push(path);
    }
  }
  return {
    modified,
    unmodified,
  };
}

const codeshiftTs = jscodeshift.withParser("ts");
const codeshiftTsx = jscodeshift.withParser("tsx");
const codeshiftBabel = jscodeshift.withParser("babel");

interface UpdateSourceFileResult {
  ok: boolean;
  modified: boolean;
}

export function updateSourceFile(
  transform: Transform,
  path: string,
  logger: Logger,
): UpdateSourceFileResult {
  logger.log(`transform ${path}`);
  let jscs: jscodeshift.JSCodeshift;
  if (path.endsWith(".tsx")) {
    jscs = codeshiftTsx;
  } else if (path.endsWith(".ts")) {
    jscs = codeshiftTs;
  } else {
    jscs = codeshiftBabel;
  }
  try {
    const source = readFileSync(path, "utf8");
    const result = transform(
      { path, source },
      {
        jscodeshift: jscs,
        j: jscs,
        stats: () => {},
        report: () => {},
      },
      {},
    );
    if (typeof result != "string") {
      logger.log(`skipped`);
      return { ok: true, modified: false };
    }
    if (result.trim() === source.trim()) {
      logger.log(`not modified`);
      return { ok: true, modified: false };
    }
    writeFileSync(path, result, "utf-8");
    logger.log(`modified`);
    return { ok: true, modified: true };
  } catch (e) {
    logger.error(`caught error: ${String(e)}`);
    if (e instanceof Error && e.stack !== undefined) {
      logger.error(e.stack);
    }
    return { ok: false, modified: false };
  }
}

export function updateLockfile(lockfilePath: string, logger: Logger) {
  let ok = false;
  switch (getLockFilePackageManager(lockfilePath)) {
    case "pnpm":
      ok = run({
        command: "pnpm",
        args: ["install", "-r"],
        logger,
        cwd: dirname(lockfilePath),
      });
      break;
    case "npm":
      ok = run({
        command: "npm",
        args: ["install"],
        logger,
        cwd: dirname(lockfilePath),
      });
      break;
    case "yarn":
      ok = run({
        command: "yarn",
        args: ["install"],
        logger,
        cwd: dirname(lockfilePath),
      });
      break;
    default:
      throw new Error(
        `Cannot determine package manager for lock file ${lockfilePath}`,
      );
  }
  return ok;
}
