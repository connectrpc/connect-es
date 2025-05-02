// Copyright 2021-2025 The Connect Authors
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

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/*

USAGE: node get-workspace-publish-tag.js

Looks at the version used in the workspace, and returns one of:
 - latest - for versions such as 3.1.4, 2.0.0, but also 0.1.2
 - alpha - for versions such as 1.0.0-alpha.8
 - beta - for versions such as 1.0.0-beta.8
 - rc - for versions such as 1.0.0-rc.8

*/

const version = findWorkspaceVersion("packages");
const tag = determinePublishTag(version);
process.stdout.write(tag);

/**
 * @param {string} version
 * @returns {string}
 */
function determinePublishTag(version) {
  if (/^\d+\.\d+\.\d+$/.test(version)) {
    return "latest";
  }
  if (/^\d+\.\d+\.\d+-alpha.*$/.test(version)) {
    return "alpha";
  }
  if (/^\d+\.\d+\.\d+-beta.*$/.test(version)) {
    return "beta";
  }
  if (/^\d+\.\d+\.\d+-rc.*$/.test(version)) {
    return "rc";
  }
  throw new Error(`Unable to determine publish tag from version ${version}`);
}

/**
 * @param {string} packagesDir
 * @returns {string}
 */
function findWorkspaceVersion(packagesDir) {
  let version = undefined;
  for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const path = join(packagesDir, entry.name, "package.json");
    if (existsSync(path)) {
      const pkg = JSON.parse(readFileSync(path, "utf-8"));
      if (pkg.private === true) {
        continue;
      }
      if (!pkg.version) {
        throw new Error(`${path} is missing "version"`);
      }
      if (version === undefined) {
        version = pkg.version;
      } else if (version !== pkg.version) {
        throw new Error(`${path} has unexpected version ${pkg.version}`);
      }
    }
  }
  if (version === undefined) {
    throw new Error(`unable to find workspace version`);
  }
  return version;
}
