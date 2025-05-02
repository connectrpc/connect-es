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

import type j from "jscodeshift";

const replacements = [
  ["_connect", "_pb"],
  ["_connect.js", "_pb.js"],
  ["_connect.ts", "_pb.ts"],
];

/**
 * Replace imports for protoc-connect-es generated files (*_connect.js)
 * with protoc-gen-es generated files (*_pb.js).
 */
const transform: j.Transform = (file, { j }, options) => {
  const root = j(file.source);
  const importPaths = root.find(j.ImportDeclaration);
  if (importPaths.length == 0) {
    // no imports in this file
    return root.toSource();
  }
  let importModified = false;
  // biome-ignore lint/complexity/noForEach: not alternative to forEach available
  importPaths.forEach((path) => {
    if (typeof path.value.source.value === "string") {
      const sourceValue = path.value.source.value;
      for (const [old, repl] of replacements) {
        if (sourceValue.endsWith(old)) {
          path.value.source.value =
            sourceValue.substring(0, sourceValue.length - old.length) + repl;
          importModified = true;
        }
      }
    }
  });
  if (!importModified) {
    // no relevant imports in this file
    return root.toSource();
  }
  return root.toSource(
    options.printOptions ?? {
      quote: determineQuoteStyle(importPaths),
    },
  );
};

function determineQuoteStyle(
  importPaths: j.Collection<j.ImportDeclaration>,
): "double" | "single" {
  let nodePath: unknown;
  if (importPaths.length > 0) {
    nodePath = importPaths.get("source", "extra", "raw") as unknown;
  }
  if (
    typeof nodePath == "object" &&
    nodePath != null &&
    "value" in nodePath &&
    typeof nodePath.value == "string"
  ) {
    return nodePath.value.startsWith("'") ? "single" : "double";
  }
  return "double";
}

export default transform;
