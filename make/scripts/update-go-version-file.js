// Copyright 2021-2022 Buf Technologies, Inc.
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

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

if (process.argv.length < 4) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <main.go-file> <new-semver-version>`,
      "",
      "Updates the version number in a main.go file",
      "",
    ].join("\n")
  );
  process.exit(1);
}

try {
  const projectDir = new URL("../../", import.meta.url).pathname;
  const goVersionPath = join(projectDir, process.argv[2]);
  const newVersionVLess = process.argv[3].startsWith("v")
    ? process.argv[3].substring(1)
    : process.argv[3];
  const newVersionV = "v" + newVersionVLess;
  const goUpdates = updateGoVersion(goVersionPath, newVersionV);
  for (let u of goUpdates) {
    process.stdout.write(u + "\n");
  }
} catch (e) {
  process.stderr.write(String(e) + "\n");
  process.exit(1);
}

function updateGoVersion(path, newVersion) {
  const updates = [];
  const go = readFileSync(path, "utf-8");
  const matches = /.*version = "(v?\d+\.\d+\.\d+.*)".*/.exec(go);
  if (!matches) {
    throw "no version found in go file " + path;
  }
  const oldVersion = matches[1];
  if (oldVersion !== newVersion) {
    const newGo = go.replace(oldVersion, newVersion);
    writeFileSync(path, newGo);
    updates.push(`${path}:`);
    updates.push(`  updated version from ${oldVersion} to ${newVersion}`);
  }
  return updates;
}
