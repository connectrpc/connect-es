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
import { getLockFilePackageManager } from "./scan";
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
      `${replacementMap[match].newPackage}/`
    );
  }
  return undefined;
}

export function replacePackageJSONReferences(
  jsonString: string,
  packagesToForceUpdate?: { packageName: string }[]
): string {
  let result = jsonString;
  for (const key of keys) {
    const forceUpdate =
      packagesToForceUpdate?.find((p) => p.packageName === key) !== undefined;
    if (!forceUpdate) {
      result = result.replace(
        `"${key}"`,
        `"${replacementMap[key].newPackage}"`
      );
    } else {
      // I wish there was a way to do this without relying on dynamic regexes
      // but not while maintaining existing formatting
      result = result.replace(
        new RegExp(`"${key}"(\\s*:\\s*)"\\S*"([\\s,])`, "g"),
        `"${replacementMap[key].newPackage}"$1"${replacementMap[key].version}"$2`
      );
    }
  }
  return result;
}

function getUsedPackages(jsonString: string): UsedPackage[] {
  const result: UsedPackage[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json: {
    dependencies?: Record<string, string | undefined>;
    devDependencies?: Record<string, string | undefined>;
    peerDependencies?: Record<string, string | undefined>;
  } = JSON.parse(jsonString);
  for (const key of keys) {
    const version =
      json.dependencies?.[key] ??
      json.devDependencies?.[key] ??
      json.peerDependencies?.[key];
    if (version !== undefined) {
      result.push({
        packageName: key,
        version,
      });
    }
  }
  return result;
}

export function getInvalidUsedPackagesForPackageFile(packageContent: string) {
  const usedPackages = getUsedPackages(packageContent);
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

export function getInvalidUsedPackages(packageFiles: string[]) {
  const result: {
    path: string;
    invalidPackages: UsedPackage[];
  }[] = [];
  for (const path of packageFiles) {
    const oldContent = readFileSync(path, "utf-8");
    const invalidPackages = getInvalidUsedPackagesForPackageFile(oldContent);
    if (invalidPackages.length > 0) {
      result.push({
        path,
        invalidPackages,
      });
    }
  }
  return result;
}

export function updatePackageFiles(
  packageFiles: string[],
  packagesToForceUpdate: {
    path: string;
    invalidPackages: UsedPackage[];
  }[]
) {
  const modified: string[] = [];
  const unmodified: string[] = [];
  for (const path of packageFiles) {
    const oldContent = readFileSync(path, "utf-8");
    const newContent = replacePackageJSONReferences(
      oldContent,
      packagesToForceUpdate.find((p) => p.path === path)?.invalidPackages ?? []
    );
    if (oldContent === newContent) {
      unmodified.push(path);
    } else {
      writeFileSync(path, newContent);
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
  logger: Logger
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
      {}
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
        `Cannot determine package manager for lock file ${lockfilePath}`
      );
  }
  return ok;
}
