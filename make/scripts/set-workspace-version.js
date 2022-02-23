import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

if (process.argv.length < 3) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <new-version>`,
      "",
      "Walks through all packages in the given workspace directory and",
      "sets the version of each package to the given version.",
      "If a package depends on another package from the workspace, the",
      "dependency version is updated as well.",
      "",
    ].join("\n")
  );
  process.exit(1);
}

try {
  const newVersion = process.argv[2];
  const packagesDir = "packages";
  const packages = readPackages(packagesDir);
  const updates = setVersion(packages, newVersion);
  updates.push(...syncDeps(packages));
  if (updates.length > 0) {
    writePackages(packagesDir, packages);
    process.stdout.write(formatUpdates(updates) + "\n");
  }
} catch (e) {
  process.stderr.write(String(e) + "\n");
  process.exit(1);
}

function setVersion(packages, newVersion) {
  const updates = [];
  for (const pkg of packages) {
    if (typeof pkg.version !== "string") {
      continue;
    }
    if (pkg.version === newVersion) {
      continue;
    }
    updates.push({
      package: pkg,
      message: `updated version from ${pkg.version} to ${newVersion}`,
    });
    pkg.version = newVersion;
  }
  return updates;
}

function syncDeps(packages) {
  const updates = [];
  for (const pkg of packages) {
    for (const key of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      if (!Object.prototype.hasOwnProperty.call(pkg, key)) {
        continue;
      }
      for (const [name, version] of Object.entries(pkg[key])) {
        const dep = packages.find((x) => x.name === name);
        if (!dep) {
          continue;
        }
        if (dep.version === version) {
          continue;
        }
        pkg[key][name] = dep.version;
        updates.push({
          package: pkg,
          message: `updated ${key}["${name}"] from ${version} to ${dep.version}`,
        });
      }
    }
  }
  return updates;
}

function readPackages(packagesDir) {
  const packagesByPath = readPackagesByPath(packagesDir);
  return Object.values(packagesByPath);
}

function writePackages(packagesDir, packages) {
  const packagesByPath = readPackagesByPath(packagesDir);
  for (const [path, oldPkg] of Object.entries(packagesByPath)) {
    const newPkg = packages.find((p) => p.name === oldPkg.name);
    writeFileSync(path, JSON.stringify(newPkg, null, 2) + "\n");
  }
}

function readPackagesByPath(packagesDir) {
  const packages = {};
  for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const path = join(packagesDir, entry.name, "package.json");
    const pkg = JSON.parse(readFileSync(path, "utf-8"));
    if (!pkg.name) {
      throw new Error(`${path} is missing "name"`);
    }
    packages[path] = pkg;
  }
  return packages;
}

function formatUpdates(updates) {
  const lines = [];
  const updatesByName = {};
  for (const update of updates) {
    if (updatesByName[update.package.name] === undefined) {
      updatesByName[update.package.name] = [];
    }
    updatesByName[update.package.name].push(update);
  }
  for (const name of Object.keys(updatesByName).sort()) {
    lines.push(`${name}:`);
    for (const update of updatesByName[name]) {
      lines.push(`  ${update.message}`);
    }
  }
  return lines.join("\n");
}
