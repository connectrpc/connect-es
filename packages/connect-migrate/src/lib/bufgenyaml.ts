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

import { type Document, isSeq, parseDocument, stringify } from "yaml";
import { readFileSync, writeFileSync } from "node:fs";

export type BufGenYaml = Document.Parsed & {
  _bufGenYaml: true;
};

export function readBufGenYamlFile(path: string): BufGenYaml {
  let content: string;
  try {
    content = readFileSync(path, "utf-8");
  } catch (e) {
    throw new Error(
      `Failed to parse ${path}: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
  return parseBufGenYaml(content);
}

export function parseBufGenYaml(content: string, path?: string): BufGenYaml {
  try {
    const doc = parseDocument(content, {
      logLevel: "silent",
    });
    assertValid(doc);
    return doc;
  } catch (e) {
    const inner = e instanceof Error ? e.message : String(e);
    throw new Error(
      path === undefined
        ? `Failed to parse: ${inner}`
        : `Failed to parse ${path}: ${inner}`,
    );
  }
}

export function stringifyBufGenYaml(bufGenYaml: BufGenYaml) {
  return stringify(bufGenYaml);
}

export function writeBufGenYamlFile(path: string, bufGenYaml: BufGenYaml) {
  writeFileSync(path, stringifyBufGenYaml(bufGenYaml), "utf-8");
}

function assertValid(arg: Document.Parsed): asserts arg is BufGenYaml {
  const version = arg.get("version");
  if (version !== "v1" && version !== "v2") {
    throw new Error(
      `not a valid buf.gen.yaml file: unknown version: ${String(version)}`,
    );
  }
  const plugins = arg.get("plugins");
  if (!isSeq(plugins)) {
    throw new Error(
      `not a valid buf.gen.yaml file: expected "plugins" to be a yaml list`,
    );
  }
}
