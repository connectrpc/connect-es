import { getReplacementImport } from "../replacement-map";
import * as fastGlob from "fast-glob";
import { readFile, writeFile } from "node:fs/promises";
import { execa } from "execa";
import * as path from "node:path";

const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");

const transformerDirectory = path.join(__dirname, "../", "transforms");

async function replacePackageReferences() {
  const transformerPath = path.join(transformerDirectory, `modify-imports.js`);

  // Update all package.json files
  const files = await fastGlob.async(["**/package.json", "package.json"], {
    ignore: ["**/node_modules/**"],
  });
  for (const file of files) {
    let fileContents = await readFile(file, "utf-8");
    let replacedFileContents = getReplacementImport(fileContents);
    while (replacedFileContents !== undefined) {
      fileContents = replacedFileContents;
      replacedFileContents = getReplacementImport(fileContents);
    }
    await writeFile(file, fileContents);
  }
  // Update references
  await execa(
    jscodeshiftExecutable,
    [
      "--ignore-pattern=**/node_modules/**",
      "--extensions=tsx,ts,jsx,js",
      "--transform",
      transformerPath,
    ],
    {
      stdio: "inherit",
      stripFinalNewline: false,
    }
  );
}

void replacePackageReferences();
