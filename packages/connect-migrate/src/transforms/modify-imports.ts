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

import type { Transform } from "jscodeshift";
import { getReplacementImport } from "../replacement-map";

/**
 * This transform handles moving all imports to the new package.
 *
 */
const transform: Transform = (file, { j }, options) => {
  const root = j(file.source);
  const importPaths = root.find(j.ImportDeclaration);
  const requirePaths = root.find(j.CallExpression, {
    callee: {
      type: "Identifier",
      name: "require",
    },
  });

  let quoteStyle: "double" | "single" = "double";
  if (importPaths.length > 0) {
    const first = importPaths.at(0);
    quoteStyle = first.toSource().includes("'") ? "single" : "double";
  } else if (requirePaths.length > 0) {
    const first = requirePaths.at(0);
    quoteStyle = first.toSource().includes("'") ? "single" : "double";
  }

  // ESM imports
  importPaths
    .filter((path) => {
      // TODO: Handle dynamic imports
      if (typeof path.value.source.value !== "string") {
        return false;
      }
      return getReplacementImport(path.value.source.value) !== undefined;
    })
    .forEach((path) => {
      if (typeof path.value.source.value === "string") {
        const sourceValue = path.value.source.value;

        const replacement = getReplacementImport(sourceValue);
        if (replacement !== undefined) {
          path.value.source.value = replacement;
        }
      }
    });
  // CJS imports
  requirePaths
    .filter((path) => {
      if (path.value.arguments.length === 0) {
        return false;
      }
      const firstArg = path.value.arguments[0];
      if (
        (firstArg.type === "StringLiteral" || firstArg.type === "Literal") &&
        typeof firstArg.value === "string"
      ) {
        return getReplacementImport(firstArg.value) !== undefined;
      }
      return false;
    })
    .forEach((path) => {
      const firstArg = path.value.arguments[0];
      if (
        (firstArg.type === "StringLiteral" || firstArg.type === "Literal") &&
        typeof firstArg.value === "string"
      ) {
        const replacement = getReplacementImport(firstArg.value);
        if (replacement !== undefined) {
          firstArg.value = replacement;
        }
      }
    });

  return root.toSource(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- passing the printOptions onto toSource is safe
    options.printOptions ?? {
      quote: quoteStyle,
    }
  );
};

export default transform;
