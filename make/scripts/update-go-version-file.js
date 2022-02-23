import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

if (process.argv.length < 4) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <version.go-file> <new-semver-version>`,
      "",
      "Updates the version number in a version.go file",
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
  const matches = /.*version = "(v?\d+\.\d+\.\d+)".*/.exec(go);
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
