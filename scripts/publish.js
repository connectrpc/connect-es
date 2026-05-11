// Copyright 2024-2026 Buf Technologies, Inc.
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

import { execSync } from "node:child_process";

/*
 * Publish workspace packages to npm
 *
 * Recommended procedure:
 * 1. Set a new version with `npm run setversion 1.2.3`
 * 2. Commit and push all changes to a PR, wait for approval.
 * 3. Merge the PR.
 * 4. Create a release on GitHub with tag `v1.2.3`, which triggers the
 *    publish workflow that runs this script.
 */

const packages = discoverPackages();
validatePackages(packages);

const version = packages[0].version;
gitCheckReleaseTag(version);
npmPublish(version);

/**
 * @param {string} version
 */
function npmPublish(version) {
  const tag = determinePublishTag(version);
  execSync(`npm publish --tag ${tag} --workspaces`, {
    stdio: "inherit",
  });
}

/**
 * Validate the discovered workspace packages: at least one must exist, and
 * all must share the same version.
 *
 * @param {DiscoveredPackage[]} packages
 */
function validatePackages(packages) {
  if (packages.length === 0) {
    throw new Error("No publishable packages found");
  }
  const version = packages[0].version;
  for (const pkg of packages) {
    if (pkg.version !== version) {
      throw new Error(
        `Inconsistent workspace versions: ${packages[0].name}@${version} vs ${pkg.name}@${pkg.version}`,
      );
    }
  }
}

/**
 * Throws if the tag `v<version>` is not among the tags pointing at HEAD.
 *
 * @param {string} version
 */
function gitCheckReleaseTag(version) {
  const expected = `v${version}`;
  const out = execSync("git tag --points-at HEAD", {
    encoding: "utf-8",
  });
  const tags = out
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  if (!tags.includes(expected)) {
    throw new Error(
      `Expected git tag ${expected} on HEAD, found: ${tags.join(", ") || "(none)"}`,
    );
  }
}

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
 * @typedef {{name: string; version: string}} DiscoveredPackage
 */

/**
 * Discover all non-private workspace packages by reading their name and
 * version from the npm CLI.
 *
 * @returns {DiscoveredPackage[]}
 */
function discoverPackages() {
  const out = execSync("npm pkg get name version private --workspaces --json", {
    encoding: "utf-8",
  });
  const workspaces = JSON.parse(out);
  /** @type {DiscoveredPackage[]} */
  const packages = [];
  for (const [key, value] of Object.entries(workspaces)) {
    if (value.private === true) {
      continue;
    }
    if (typeof value.name !== "string" || value.name.length === 0) {
      throw new Error(`workspace ${key} is missing "name"`);
    }
    if (typeof value.version !== "string" || value.version.length === 0) {
      throw new Error(`workspace ${key} is missing "version"`);
    }
    packages.push({ name: value.name, version: value.version });
  }
  return packages;
}
