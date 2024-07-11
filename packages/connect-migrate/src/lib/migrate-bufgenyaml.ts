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

import { Scanned } from "./scan";
import { PrintFn } from "./logger";
import {
  BufGenYaml,
  stringifyBufGenYaml,
  writeBufGenYamlFile,
} from "./bufgenyaml";
import { isMap, isSeq } from "yaml";
import { satisfies as semverSatisfies } from "semver";

interface MigrateBufGenYamlsResult {
  updatedBufGenYamls: string[];
}

export function migrateBufGenYamls(
  scanned: Scanned,
  migrations: BufGenYamlMigration[],
  print: PrintFn,
  writeBufGenYamlFileFn: typeof writeBufGenYamlFile = writeBufGenYamlFile,
): MigrateBufGenYamlsResult {
  const updatedBufGenYamls: string[] = [];
  if (scanned.bufGenYamlFiles.length == 0) {
    return { updatedBufGenYamls };
  }
  print(`Updating buf.gen.yaml... `);
  for (const { path, yaml } of scanned.bufGenYamlFiles) {
    const updated = migrateBufGenYaml(yaml, migrations);
    if (updated !== null) {
      writeBufGenYamlFileFn(path, updated);
      updatedBufGenYamls.push(path);
    }
  }
  print(`✓\n`);
  if (updatedBufGenYamls.length == 0) {
    print(`  No files modified.\n`);
  } else {
    updatedBufGenYamls.forEach((path) => print(`  ${path} ✓\n`));
  }
  return { updatedBufGenYamls };
}

export type BufGenYamlMigration =
  | BufGenYamlPluginRemoval
  | BufGenYamlPluginUpdate;

type BufGenYamlPluginUpdate = {
  updatePlugin: {
    // e.g. buf.build/connectrpc/es
    remote: string;
    // semver constraint, e.g. ^1.4.0
    from: string;
    // version, e.g. 1.0.0
    to: string;
  };
};

type BufGenYamlPluginRemoval = {
  removePlugin: {
    // e.g. buf.build/connectrpc/es
    remote: string;
    // e.g. protoc-gen-connect-es
    local: string;
  };
};

export function migrateBufGenYaml(
  yaml: BufGenYaml,
  migrations: BufGenYamlMigration[],
): BufGenYaml | null {
  const y = yaml.clone() as BufGenYaml;
  for (const migration of migrations) {
    if ("updatePlugin" in migration) {
      const plugins = y.get("plugins");
      if (!isSeq(plugins)) {
        continue;
      }
      switch (y.get("version")) {
        case "v1":
          for (const item of plugins.items) {
            if (!isMap(item)) {
              continue;
            }
            const plugin = item.get("plugin");
            if (typeof plugin !== "string") {
              continue;
            }
            if (!plugin.includes(":")) {
              continue;
            }
            const [name, version] = plugin.split(":");
            if (name !== migration.updatePlugin.remote) {
              continue;
            }
            if (!semverSatisfies(version, migration.updatePlugin.from)) {
              continue;
            }
            item.set("plugin", `${name}:v${migration.updatePlugin.to}`);
          }
          break;
        case "v2":
          for (const item of plugins.items) {
            if (!isMap(item)) {
              continue;
            }
            const remote = item.get("remote");
            if (typeof remote !== "string") {
              continue;
            }
            if (!remote.includes(":")) {
              continue;
            }
            const [name, version] = remote.split(":");
            if (name !== migration.updatePlugin.remote) {
              continue;
            }
            if (!semverSatisfies(version, migration.updatePlugin.from)) {
              continue;
            }
            item.set("remote", `${name}:v${migration.updatePlugin.to}`);
          }
          break;
        default:
          throw new Error("unsupported buf.gen.yaml version");
      }
    } else if ("removePlugin" in migration) {
      const plugins = y.get("plugins");
      const indexToDelete: number[] = [];
      if (!isSeq(plugins)) {
        continue;
      }
      switch (y.get("version")) {
        case "v1":
          for (const [index, item] of plugins.items.entries()) {
            if (!isMap(item)) {
              continue;
            }
            const plugin = item.get("plugin");
            if (typeof plugin !== "string") {
              continue;
            }
            const removeLocal = migration.removePlugin.local.startsWith(
              "protoc-gen-",
            )
              ? migration.removePlugin.local.substring("protoc-gen-".length)
              : migration.removePlugin.local;
            if (plugin === removeLocal) {
              indexToDelete.push(index);
              continue;
            }
            if (
              plugin.includes(":") &&
              plugin.split(":")[0] === migration.removePlugin.remote
            ) {
              indexToDelete.push(index);
            } else if (plugin == migration.removePlugin.remote) {
              indexToDelete.push(index);
            }
          }
          break;
        case "v2":
          for (const [index, item] of plugins.items.entries()) {
            if (!isMap(item)) {
              continue;
            }
            const remote = item.get("remote");
            if (typeof remote === "string") {
              if (
                remote.includes(":") &&
                remote.split(":")[0] === migration.removePlugin.remote
              ) {
                indexToDelete.push(index);
              } else if (remote == migration.removePlugin.remote) {
                indexToDelete.push(index);
              }
              continue;
            }
            const local = item.get("local");
            if (typeof local === "string") {
              if (local === migration.removePlugin.local) {
                indexToDelete.push(index);
              }
            }
          }
          break;
        default:
          throw new Error("unsupported buf.gen.yaml version");
      }
      indexToDelete.sort().reverse();
      for (const index of indexToDelete) {
        plugins.delete(index);
      }
    } else {
      throw new Error("unsupported buf.gen.yaml migration");
    }
  }
  if (stringifyBufGenYaml(yaml).trim() !== stringifyBufGenYaml(y).trim()) {
    return y;
  }
  return null;
}
