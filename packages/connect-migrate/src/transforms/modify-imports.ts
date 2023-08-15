import type { Transform } from "jscodeshift";
import { getReplacementImport } from "../replacement-map";

/**
 * This transform handles moving all imports to the new package.
 *
 */
const transform: Transform = (file, { j }, options) => {
  const root = j(file.source);
  // ESM imports
  root
    .find(j.ImportDeclaration, {
      type: "ImportDeclaration",
    })
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
  root
    .find(j.CallExpression, {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "require",
      },
    })
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- passing the printOptions onto toSource is safe
  return root.toSource(options.printOptions ?? {});
};

export default transform;
