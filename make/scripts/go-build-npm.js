// Copyright 2021-2022 Buf Technologies, Inc.
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

import { exec } from "child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
} from "fs";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

if (process.argv.length < 4) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} <npm-base> <go-pkg>`,
      "",
      "Cross compiles a Go program for distribution via NPM",
      "",
      "npm-base: path to the base npm package, for example packages/foo",
      "go-pkg:   go package name to build, for example ./cmd/foo",
      "",
    ].join("\n")
  );
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const npmBase = process.argv[2];
const goPkg = process.argv[3];
const goFlags = `-ldflags="-s -w" -trimpath`;
// prettier-ignore
const platforms = [
    { name: "darwin-64",     npmOs: "darwin",  npmCpu: "x64",   goFlags, goEnv: { GOOS: "darwin",  GOARCH: "amd64", CGO_ENABLED: 0 } },
    { name: "darwin-64",     npmOs: "darwin",  npmCpu: "x64",   goFlags, goEnv: { GOOS: "darwin",  GOARCH: "amd64", CGO_ENABLED: 0 } },
    { name: "darwin-arm64",  npmOs: "darwin",  npmCpu: "arm64", goFlags, goEnv: { GOOS: "darwin",  GOARCH: "arm64", CGO_ENABLED: 0 } },
    { name: "windows-64",    npmOs: "win32",   npmCpu: "x64",   goFlags, goEnv: { GOOS: "windows", GOARCH: "amd64", CGO_ENABLED: 0 } },
    { name: "windows-arm64", npmOs: "win32",   npmCpu: "arm64", goFlags, goEnv: { GOOS: "windows", GOARCH: "arm64", CGO_ENABLED: 0 } },
    { name: "windows-32",    npmOs: "win32",   npmCpu: "ia32",  goFlags, goEnv: { GOOS: "windows", GOARCH: "386"  , CGO_ENABLED: 0 } },
    { name: "linux-64",      npmOs: "linux",   npmCpu: "x64",   goFlags, goEnv: { GOOS: "linux",   GOARCH: "amd64", CGO_ENABLED: 0 } },
    { name: "linux-32",      npmOs: "linux",   npmCpu: "ia32",  goFlags, goEnv: { GOOS: "linux",   GOARCH: "386"  , CGO_ENABLED: 0 } },
    { name: "linux-arm",     npmOs: "linux",   npmCpu: "arm",   goFlags, goEnv: { GOOS: "linux",   GOARCH: "arm"  , CGO_ENABLED: 0 } },
    { name: "linux-arm64",   npmOs: "linux",   npmCpu: "arm64", goFlags, goEnv: { GOOS: "linux",   GOARCH: "arm64", CGO_ENABLED: 0 } },
    { name: "freebsd-64",    npmOs: "freebsd", npmCpu: "x64",   goFlags, goEnv: { GOOS: "freebsd", GOARCH: "amd64", CGO_ENABLED: 0 } },
    { name: "freebsd-arm64", npmOs: "freebsd", npmCpu: "arm64", goFlags, goEnv: { GOOS: "freebsd", GOARCH: "arm64", CGO_ENABLED: 0 } },
    { name: "netbsd-64",     npmOs: "netbsd",  npmCpu: "x64",   goFlags, goEnv: { GOOS: "netbsd",  GOARCH: "amd64", CGO_ENABLED: 0 } },
    { name: "openbsd-64",    npmOs: "openbsd", npmCpu: "x64",   goFlags, goEnv: { GOOS: "openbsd", GOARCH: "amd64", CGO_ENABLED: 0 } },
];

try {
  scaffold(npmBase, platforms);
  const builds = platforms.map((platform) =>
    goBuild(
      goPkg,
      platform,
      (successMessage) => {
        process.stdout.write(successMessage + "\n");
      },
      (errorMessage) => {
        for (const child of builds) {
          if (!child.killed) {
            child.kill("SIGABRT");
          }
        }
        process.stderr.write(errorMessage + "\n");
        process.exit(1);
      }
    )
  );
} catch (e) {
  process.stderr.write(String(e) + "\n");
  process.exit(1);
}

function goBuild(goPkg, platform, onSuccess, onError) {
  const platformDir = getPlatformDir(platform, npmBase);
  let output = join(platformDir, "bin", basename(npmBase));
  {
    if (platform.goEnv.GOOS === "windows") {
      output += ".exe";
    }
  }
  const command = `go build -o ${output} ${platform.goFlags} ${goPkg}`;
  return exec(
    command,
    {
      encoding: "utf8",
      shell: true,
      env: {
        ...process.env,
        ...platform.goEnv,
      },
    },
    (err, stdout, stderr) => {
      if (err) {
        onError(
          `build ${platform.name} failed: command exited with status ${err.code}: ${command}\n${stderr}`
        );
      } else {
        onSuccess(`build ${platform.name} ok`);
      }
    }
  );
}

function scaffold(npmBase, platforms) {
  const optionalDependencies = {};
  for (const platform of platforms) {
    const pkg = readBasePackage(npmBase);
    delete pkg.dependencies;
    delete pkg.devDependencies;
    delete pkg.optionalDependencies;
    delete pkg.bin;
    delete pkg.scripts;
    pkg.name = `${pkg.name}-${platform.name}`;
    pkg.os = [platform.npmOs];
    pkg.cpu = [platform.npmCpu];
    if (pkg.description) {
      pkg.description = `${pkg.description} (${platform.npmOs} / ${platform.npmCpu})`;
    }
    const platformDir = getPlatformDir(platform, npmBase);
    writePackage(pkg, join(platformDir, "package.json"));
    optionalDependencies[pkg.name] = pkg.version;
  }
  const pkg = readBasePackage(npmBase);
  pkg.optionalDependencies = optionalDependencies;
  const shimTarget = join(npmBase, Object.values(pkg.bin)[0]);
  mkdirSync(dirname(shimTarget), { recursive: true });
  copyFileSync(join(__dirname, "go-build-npm-shim.cjs"), shimTarget);
  writePackage(pkg, join(npmBase, "package.json"));
}

function getPlatformDir(platform, npmBase) {
  return join(dirname(npmBase), `${basename(npmBase)}-${platform.name}`);
}

function readBasePackage(npmBase) {
  const pkgPath = join(npmBase, "package.json");
  if (!existsSync(pkgPath)) {
    throw new Error(`invalid npm-base: ${pkgPath} not found`);
  }
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  if (!pkg.name) {
    throw new Error(`${pkgPath} is missing "name"`);
  }
  if (!pkg.bin) {
    throw new Error(`${pkgPath} is missing "bin"`);
  }
  if (Object.keys(pkg.bin).length !== 1) {
    throw new Error(`${pkgPath} is requires exactly one entry in "bin"`);
  }
  const binName = Object.keys(pkg.bin)[0];
  const binValue = Object.values(pkg.bin)[0];
  if (
    binName === undefined ||
    binValue === undefined ||
    binValue !== `bin/${binName}`
  ) {
    throw new Error(
      `${pkgPath} is missing an entry in "bin" in the form of {"foo": "bin/foo"}`
    );
  }
  return pkg;
}

function writePackage(pkg, path) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n");
}
