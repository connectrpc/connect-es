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

import j from "jscodeshift";

const importReplacements: Record<string, string> = {
  "@bufbuild/connect-web": "@connectrpc/connect-web",
  "@bufbuild/connect-fastify": "@connectrpc/connect-fastify",
  "@bufbuild/connect-node": "@connectrpc/connect-node",
  "@bufbuild/connect-next": "@connectrpc/connect-next",
  "@bufbuild/connect-express": "@connectrpc/connect-express",
  "@bufbuild/connect-query": "@connectrpc/connect-query",
  "@bufbuild/connect": "@connectrpc/connect",
  "@bufbuild/connect-core": "@connectrpc/connect",
};

/**
 * This transform handles moving all imports to the new package.
 *
 */
const transform: j.Transform = (file, { j }, options) => {
  const root = j(file.source);
  const importPaths = root.find(j.ImportDeclaration);
  const requirePaths = root.find(j.CallExpression, {
    callee: {
      type: "Identifier",
      name: "require",
    },
  });
  if (importPaths.length == 0 && requirePaths.length == 0) {
    // no imports in this file
    return root.toSource();
  }
  let importOrRequireModified = false;
  // ESM imports -- no dynamic imports
  importPaths.forEach((path) => {
    if (typeof path.value.source.value === "string") {
      const sourceValue = path.value.source.value;
      const replacement = getReplacementImport(sourceValue);
      if (replacement !== undefined) {
        path.value.source.value = replacement;
        importOrRequireModified = true;
      }
    }
  });
  // CJS imports
  requirePaths.forEach((path) => {
    const firstArg = path.value.arguments[0];
    if (
      (firstArg.type === "StringLiteral" || firstArg.type === "Literal") &&
      typeof firstArg.value === "string"
    ) {
      const replacement = getReplacementImport(firstArg.value);
      if (replacement !== undefined) {
        firstArg.value = replacement;
        importOrRequireModified = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint is unaware of forEach callback
  if (!importOrRequireModified) {
    // no relevant imports in this file
    return root.toSource();
  }

  return root.toSource(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- passing the printOptions onto toSource is safe
    options.printOptions ?? {
      quote: determineQuoteStyle(importPaths, requirePaths),
    },
  );
};

function getReplacementImport(sourceValue: string): string | undefined {
  for (const [oldPackageName, newPackageName] of Object.entries(
    importReplacements,
  )) {
    if (sourceValue === oldPackageName) {
      return newPackageName;
    }
    if (sourceValue.startsWith(`${oldPackageName}/`)) {
      return sourceValue.replace(`${oldPackageName}/`, `${newPackageName}/`);
    }
  }
  return undefined;
}

function determineQuoteStyle(
  importPaths: j.Collection<j.ImportDeclaration>,
  requirePaths: j.Collection<j.CallExpression>,
): "double" | "single" {
  let nodePath: unknown;
  if (importPaths.length > 0) {
    nodePath = importPaths.get("source", "extra", "raw") as unknown;
  } else if (requirePaths.length > 0) {
    nodePath = requirePaths.get("arguments", 0, "extra", "raw") as unknown;
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
