import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import * as path from "node:path";
import { exit, stderr, stdout, argv } from "node:process";

const args = argv.slice(2);

if (args.length === 0) {
  stdout.write(`USAGE: ${path.basename(argv[1])} [...path]
path: One or more subpath exports. A dot (.) is valid.

Generates ESM wrappers for dual packages.

Example:

  ${path.basename(argv[1])} . foo

Assumes that the following CJS artifacts exist: 
  
  dist/cjs
  ├── index.d.ts
  ├── index.js
  └── foo
      ├── index.d.ts
      └── index.js

Generates the following ESM wrappers:

  dist/proxy
  ├── index.d.ts
  ├── index.js
  └── foo
      ├── index.d.ts
      └── index.js

package.json must contain:

  "type": "module", 
  "exports": {
    ".": {
      "require": "./dist/cjs/index.js",
      "import": "./dist/proxy/index.js"
    },
    "./protocol": {
      "require": "./dist/cjs/foo/index.js",
      "import": "./dist/proxy/foo/index.js"
    },

Known limitations:
- expects CJS files with a .js extension, not .cjs
- does not support default exports
- supports only simple subpath directory exports, assuming a index.js file
- does not support export patterns
`);
  exit(1);
}

const cjsDist = "dist/cjs";
const proxyDist = "dist/proxy";

const packageType = readPackageJsonType();
if (packageType !== "module") {
  stderr.write(`package.json is missing "type": "module" field.\n`);
  exit(1);
}

for (const subpath of args) {
  const cjsPath = path.join(cjsDist, subpath, "index.js");
  if (!existsSync(cjsPath)) {
    stderr.write(
      `CommonJS artifact for subpath "${subpath}" not found at expected path ${cjsPath}\n`,
    );
    exit(1);
  }
  const proxyDir = path.join(proxyDist, subpath);
  if (!existsSync(proxyDir)) {
    mkdirSync(proxyDir, { recursive: true });
  }
  const cjsImportPath = path.relative(proxyDir, cjsPath);
  writeFileSync(
    path.join(proxyDir, "index.js"),
    `export * from "${cjsImportPath}";\n`,
  );
  writeFileSync(
    path.join(proxyDir, "index.d.ts"),
    `export * from "${cjsImportPath}";\n`,
  );
}

/**
 * @return {"commonjs"|"module"}
 */
function readPackageJsonType() {
  const pkgString = readFileSync("package.json", "utf-8");
  const pkg = JSON.parse(pkgString);
  const t = pkg.type;
  if (typeof t !== "string") {
    return "commonjs";
  }
  if (t.toLowerCase() === "module") {
    return "module";
  }
  return "commonjs";
}
