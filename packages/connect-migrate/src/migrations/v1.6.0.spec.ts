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

import { v1_6_0 } from "./v1.6.0";
import type { PackageJson } from "../lib/package-json";
import type { MigrateOptions } from "../migration";

describe("migration", () => {
  const packageJsonWritten: { path: string; pkg: PackageJson }[] = [];
  const lockFilesUpdated: string[] = [];
  let opt: MigrateOptions;
  beforeEach(() => {
    packageJsonWritten.splice(0);
    lockFilesUpdated.splice(0);
    opt = {
      scanned: {
        ok: true,
        lockFiles: ["package-lock.json"],
        sourceFiles: [],
        packageFiles: [],
        bufGenYamlFiles: [],
      },
      args: {
        ok: true,
        help: false,
        version: false,
        ignorePatterns: [],
        noInstall: false,
        forceUpdate: false,
      },
      print: () => {
        //
      },
      updateSourceFileFn: () => ({
        ok: true,
        modified: false,
      }),
      writePackageJsonFileFn: (path: string, pkg: PackageJson) =>
        packageJsonWritten.push({ path, pkg }),
      runInstallFn: (lockfilePath) => {
        lockFilesUpdated.push(lockfilePath);
        return true;
      },
    };
  });
  describe("should be applicable", () => {
    it("for 1.6.0", () => {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@connectrpc/connect": "^1.6.0",
            },
          },
        },
      ];
      expect(v1_6_0.applicable(opt.scanned)).toBeTrue();
    });
    it("after 1.6.0", () => {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@connectrpc/connect": "^1.17.0",
            },
          },
        },
      ];
      expect(v1_6_0.applicable(opt.scanned)).toBeTrue();
    });
    it("before 1.6.0", () => {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@connectrpc/connect": "^1.5.0",
            },
          },
        },
      ];
      expect(v1_6_0.applicable(opt.scanned)).toBeTrue();
    });
  });
  describe("should not be applicable", () => {
    it("from 2.0.0", () => {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@connectrpc/connect": "^2.0.0",
            },
          },
        },
      ];
      expect(v1_6_0.applicable(opt.scanned)).toBeFalse();
    });
  });
});
