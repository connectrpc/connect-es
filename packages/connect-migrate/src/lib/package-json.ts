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

import { readFileSync, writeFileSync } from "node:fs";

/**
 * Simplified typing for a package.json file.
 */
export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, object>;
  optionalDependencies?: Record<string, string>;
  bundleDependencies?: boolean | string[];
  bundledDependencies?: boolean | string[];
}

export function readPackageJsonFile(path: string) {
  try {
    const content = readFileSync(path, "utf-8");
    const json = JSON.parse(content) as unknown;
    assertValidPackageJson(json);
    return json;
  } catch (e) {
    throw new Error(
      `Failed to parse ${path}: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
}

export function writePackageJsonFile(path: string, pkg: PackageJson) {
  const content = JSON.stringify(pkg, null, 2);
  writeFileSync(path, content, "utf-8");
}

function assertValidPackageJson(arg: unknown): asserts arg is PackageJson {
  if (arg === null || typeof arg != "object" || Array.isArray(arg)) {
    throw new Error("not a valid package.json file");
  }
  if ("name" in arg && typeof arg.name != "string") {
    throw new Error("not a valid package.json file: malformed name");
  }
  if ("version" in arg && typeof arg.version != "string") {
    throw new Error("not a valid package.json file: malformed version");
  }
  if ("dependencies" in arg && !isPackageJsonDependencyMap(arg.dependencies)) {
    throw new Error("not a valid package.json file: malformed dependencies");
  }
  if (
    "devDependencies" in arg &&
    !isPackageJsonDependencyMap(arg.devDependencies)
  ) {
    throw new Error("not a valid package.json file: malformed devDependencies");
  }
  if (
    "peerDependencies" in arg &&
    !isPackageJsonDependencyMap(arg.peerDependencies)
  ) {
    throw new Error(
      "not a valid package.json file: malformed peerDependencies",
    );
  }
  if (
    "peerDependenciesMeta" in arg &&
    !isPackageJsonPeerDependenciesMeta(arg.peerDependenciesMeta)
  ) {
    throw new Error(
      "not a valid package.json file: malformed peerDependenciesMeta",
    );
  }
  if (
    "optionalDependencies" in arg &&
    !isPackageJsonDependencyMap(arg.optionalDependencies)
  ) {
    throw new Error(
      "not a valid package.json file: malformed optionalDependencies",
    );
  }
  if (
    "bundleDependencies" in arg &&
    !isPackageJsonBundleDependencies(arg.bundleDependencies)
  ) {
    throw new Error(
      "not a valid package.json file: malformed bundleDependencies",
    );
  }
  if (
    "bundledDependencies" in arg &&
    !isPackageJsonBundleDependencies(arg.bundledDependencies)
  ) {
    throw new Error(
      "not a valid package.json file: malformed bundledDependencies",
    );
  }
}

function isPackageJsonBundleDependencies(arg: unknown): arg is string[] {
  if (arg === null || !Array.isArray(arg)) {
    return false;
  }
  return arg.every((v) => typeof v == "string");
}

function isPackageJsonPeerDependenciesMeta(
  arg: unknown,
): arg is Record<string, object> {
  if (arg === null || typeof arg != "object" || Array.isArray(arg)) {
    return false;
  }
  return Object.values(arg).every((v) => v !== null && typeof v == "object");
}

function isPackageJsonDependencyMap(
  arg: unknown,
): arg is Record<string, string> {
  if (arg === null || typeof arg != "object" || Array.isArray(arg)) {
    return false;
  }
  for (const v of Object.values(arg)) {
    if (typeof v != "string") {
      return false;
    }
  }
  return true;
}
