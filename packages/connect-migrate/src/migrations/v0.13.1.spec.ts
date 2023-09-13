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

import { valid, validRange } from "semver";
import {
  targetVersionConnectEs,
  targetVersionConnectQuery,
  dependencyReplacements,
  v0_13_1,
} from "./v0.13.1";
import { PackageJson } from "../lib/package-json";
import { MigrateOptions } from "../migration";

describe("dependencyReplacements", function () {
  dependencyReplacements.forEach((r, index) => {
    describe(`dependencyReplacements.${index}`, function () {
      it("should have valid range and version", () => {
        expect(validRange(r.from.range)).not.toBeNull();
        expect(valid(r.to.version)).not.toBeNull();
      });
    });
  });
});

describe("migration", function () {
  const packageJsonWritten: { path: string; pkg: PackageJson }[] = [];
  const lockFilesUpdated: string[] = [];
  let opt: MigrateOptions;
  beforeEach(function () {
    packageJsonWritten.splice(0);
    lockFilesUpdated.splice(0);
    opt = {
      scanned: {
        ok: true,
        lockFiles: ["package-lock.json"],
        sourceFiles: [],
        packageFiles: [],
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
  describe("from 0.7.0", function () {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/connect": "^0.7.0",
              "@bufbuild/connect-web": "^0.7.0",
              "@bufbuild/protoc-gen-connect-es": "^0.7.0",
            },
          },
        },
      ];
    });
    it("should be applicable", () => {
      expect(v0_13_1.applicable(opt.scanned)).toBeTrue();
    });
    it("should abort without --force", () => {
      const result = v0_13_1.migrate(opt);
      expect(result.ok).toBeFalse();
      if (!result.ok) {
        expect(result.errorMessage).toMatch(
          /You depend on @bufbuild\/connect-web@<0.9.0/,
        );
      }
    });
    it("should migrate with --force", () => {
      opt.args.forceUpdate = true;
      const result = v0_13_1.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@connectrpc/connect": `^${targetVersionConnectEs}`,
          "@connectrpc/connect-web": `^${targetVersionConnectEs}`,
          "@connectrpc/protoc-gen-connect-es": `^${targetVersionConnectEs}`,
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
  });
  describe("from protoc-gen-connect-web", function () {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/protoc-gen-connect-web": "^0.7.0",
            },
          },
        },
      ];
    });
    it("should be applicable", () => {
      expect(v0_13_1.applicable(opt.scanned)).toBeTrue();
    });
    it("should abort", () => {
      const result = v0_13_1.migrate(opt);
      expect(result.ok).toBeFalse();
      if (!result.ok) {
        expect(result.errorMessage).toMatch(
          /You depend on the deprecated @bufbuild\/protoc-gen-connect-web/,
        );
      }
    });
    it("should migrate with --force", () => {
      opt.args.forceUpdate = true;
      const result = v0_13_1.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@connectrpc/protoc-gen-connect-es": "^" + targetVersionConnectEs,
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
  });
  describe("from bufbuild v0.13.0", function () {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/connect": "^0.13.0",
            },
          },
        },
      ];
    });
    it("should be applicable", () => {
      expect(v0_13_1.applicable(opt.scanned)).toBeTrue();
    });
    it("should migrate", () => {
      const result = v0_13_1.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@connectrpc/connect": "^1.0.0-rc1",
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
  });
  describe("from bufbuild v0.12.0", function () {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/connect": "^0.12.0",
            },
          },
        },
      ];
    });
    it("should be applicable", () => {
      expect(v0_13_1.applicable(opt.scanned)).toBeTrue();
    });
    it("should migrate", () => {
      const result = v0_13_1.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@connectrpc/connect": "^" + targetVersionConnectEs,
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
  });
  describe("from connectrpc v0.13.1", function () {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@connectrpc/connect": "^" + targetVersionConnectEs,
            },
          },
        },
      ];
    });
    it("should not be applicable", () => {
      expect(v0_13_1.applicable(opt.scanned)).toBeFalse();
    });
  });
  describe("from connect-query v0.3.0", function () {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/connect-query": "^0.3.0",
              "@bufbuild/protoc-gen-connect-query": "^0.3.0",
              "@bufbuild/protoc-gen-connect-query-react": "^0.0.1",
            },
          },
        },
      ];
    });
    it("should be applicable", () => {
      expect(v0_13_1.applicable(opt.scanned)).toBeTrue();
    });
    it("should migrate", () => {
      const result = v0_13_1.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@connectrpc/connect-query": "^" + targetVersionConnectQuery,
          "@connectrpc/protoc-gen-connect-query":
            "^" + targetVersionConnectQuery,
          "@connectrpc/protoc-gen-connect-query-react":
            "^" + targetVersionConnectQuery,
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
  });
});
