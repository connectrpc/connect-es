// Copyright 2021-2024 The Connect Authors
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

import {
  targetVersionConnectEs,
  targetVersionConnectPlaywright,
  targetVersionConnectQuery,
  targetVersionProtobufEs,
  v2_0_0,
} from "./v2.0.0";
import { PackageJson } from "../lib/package-json";
import { MigrateOptions } from "../migration";
import { parseBufGenYaml, stringifyBufGenYaml } from "../lib/bufgenyaml";

describe("migration to v2.0.0", function () {
  const packageJsonWritten: { path: string; pkg: PackageJson }[] = [];
  const bufGenYamlWritten: { path: string; yaml: string }[] = [];
  const lockFilesUpdated: string[] = [];
  let opt: MigrateOptions;
  beforeEach(function () {
    packageJsonWritten.splice(0);
    lockFilesUpdated.splice(0);
    bufGenYamlWritten.splice(0);
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
      writeBufGenYamlFileFn: (path, yaml) =>
        bufGenYamlWritten.push({ path, yaml: stringifyBufGenYaml(yaml) }),
      runInstallFn: (lockfilePath) => {
        lockFilesUpdated.push(lockfilePath);
        return true;
      },
    };
  });
  describe("for protobuf-es v1", () => {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/protobuf": "^1.10.0",
              "@bufbuild/protoplugin": "^1.10.0",
              "@bufbuild/protoc-gen-es": "^1.10.0",
            },
          },
        },
      ];
      opt.scanned.bufGenYamlFiles = [
        {
          path: "buf.gen.yaml",
          yaml: parseBufGenYaml(
            `version: v2
plugins:
  - remote: buf.build/bufbuild/es:v1.10.0
    out: src/gen
`,
          ),
        },
      ];
    });
    it("should be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeTrue();
    });
    it("should migrate packages", () => {
      const result = v2_0_0.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@bufbuild/protobuf": `^${targetVersionProtobufEs}`,
          "@bufbuild/protoplugin": `^${targetVersionProtobufEs}`,
          "@bufbuild/protoc-gen-es": `^${targetVersionProtobufEs}`,
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
    it("should migrate buf.gen.yaml", () => {
      const result = v2_0_0.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(bufGenYamlWritten.length).toBe(1);
      expect(bufGenYamlWritten[0]?.yaml).toEqual(`version: v2
plugins:
  - remote: buf.build/bufbuild/es:v${targetVersionProtobufEs}
    out: src/gen
`);
    });
  });
  describe("for connect-es v1", () => {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@connectrpc/connect": "^1.4.0",
              "@connectrpc/connect-express": "^1.4.0",
              "@connectrpc/connect-fastify": "^1.4.0",
              "@connectrpc/connect-next": "^1.4.0",
              "@connectrpc/connect-node": "^1.4.0",
              "@connectrpc/connect-web": "^1.4.0",
              "@connectrpc/protoc-gen-connect-es": "^1.4.0",
            },
          },
        },
      ];
      opt.scanned.bufGenYamlFiles = [
        {
          path: "buf.gen.yaml",
          yaml: parseBufGenYaml(
            `version: v2
plugins:
  - local: es
    out: src/gen
  - remote: buf.build/connectrpc/es
    out: src/gen
  - remote: buf.build/connectrpc/es:v1.4.0
    out: src/gen
`,
            "buf.gen.yaml",
          ),
        },
      ];
    });
    it("should be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeTrue();
    });
    it("should migrate packages", () => {
      const result = v2_0_0.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@connectrpc/connect": `^${targetVersionConnectEs}`,
          "@connectrpc/connect-express": `^${targetVersionConnectEs}`,
          "@connectrpc/connect-fastify": `^${targetVersionConnectEs}`,
          "@connectrpc/connect-next": `^${targetVersionConnectEs}`,
          "@connectrpc/connect-node": `^${targetVersionConnectEs}`,
          "@connectrpc/connect-web": `^${targetVersionConnectEs}`,
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
    it("should migrate buf.gen.yaml", () => {
      const result = v2_0_0.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(bufGenYamlWritten.length).toBe(1);
      expect(bufGenYamlWritten[0]?.yaml).toEqual(`version: v2
plugins:
  - local: es
    out: src/gen
`);
    });
  });
  describe("for connect-query-es v1", () => {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@connectrpc/connect-query": "^1.4.2",
              "@connectrpc/protoc-gen-connect-query": "^1.4.2",
            },
          },
        },
      ];
      opt.scanned.bufGenYamlFiles = [
        {
          path: "buf.gen.yaml",
          yaml: parseBufGenYaml(
            `version: v2
plugins:
  - remote: buf.build/connectrpc/query-es:v1.4.1
    out: src/gen
`,
          ),
        },
      ];
    });
    it("should be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeTrue();
    });
    it("should migrate packages", () => {
      const result = v2_0_0.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@connectrpc/connect-query": `^${targetVersionConnectQuery}`,
          "@connectrpc/protoc-gen-connect-query": `^${targetVersionConnectQuery}`,
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
    it("should migrate buf.gen.yaml", () => {
      const result = v2_0_0.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(bufGenYamlWritten.length).toBe(1);
      expect(bufGenYamlWritten[0]?.yaml).toEqual(`version: v2
plugins:
  - remote: buf.build/connectrpc/query-es:v${targetVersionConnectQuery}
    out: src/gen
`);
    });
  });
  describe("for connect-playwright-es v1", () => {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@connectrpc/connect-playwright": "^0.3.2",
            },
          },
        },
      ];
    });
    it("should be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeTrue();
    });
    it("should migrate", () => {
      const result = v2_0_0.migrate(opt);
      expect(result).toEqual({
        ok: true,
      });
      expect(packageJsonWritten.length).toBe(1);
      expect(packageJsonWritten[0].pkg).toEqual({
        dependencies: {
          "@connectrpc/connect-playwright": `^${targetVersionConnectPlaywright}`,
        },
      });
      expect(lockFilesUpdated.length).toBe(1);
    });
  });
  describe("for up-to-date versions", () => {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/protobuf": `^${targetVersionProtobufEs}`,
              "@bufbuild/protoplugin": `^${targetVersionProtobufEs}`,
              "@bufbuild/protoc-gen-es": `^${targetVersionProtobufEs}`,

              "@connectrpc/connect": `^${targetVersionConnectEs}`,
              "@connectrpc/connect-web": `^${targetVersionConnectEs}`,
              "@connectrpc/connect-node": `^${targetVersionConnectEs}`,
              "@connectrpc/connect-express": `^${targetVersionConnectEs}`,
              "@connectrpc/connect-fastify": `^${targetVersionConnectEs}`,
              "@connectrpc/connect-next": `^${targetVersionConnectEs}`,
              "@connectrpc/protoc-gen-connect-es": `^${targetVersionConnectEs}`,

              "@connectrpc/connect-query": `^${targetVersionConnectQuery}`,
              "@connectrpc/protoc-gen-connect-query": `^${targetVersionConnectQuery}`,

              "@connectrpc/connect-playwright": `^${targetVersionConnectPlaywright}`,
            },
          },
        },
      ];
      opt.scanned.bufGenYamlFiles = [
        {
          path: "buf.gen.yaml",
          yaml: parseBufGenYaml(
            `
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
  - remote: buf.build/bufbuild/es
    out: src/gen
  - remote: buf.build/connectrpc/query-es
    out: src/gen
  - remote: buf.build/bufbuild/es:v2.0.0
    out: src/gen
  - remote: buf.build/connectrpc/query-es:v${targetVersionConnectQuery}
    out: src/gen
`,
            "buf.gen.yaml",
          ),
        },
        {
          path: "buf.v1.gen.yaml",
          yaml: parseBufGenYaml(
            `
version: v1
plugins:
  - plugin: es
    out: src/gen
  - plugin: buf.build/bufbuild/es
    out: src/gen
  - plugin: buf.build/connectrpc/query-es
    out: src/gen
  - plugin: buf.build/bufbuild/es:v2.0.0
    out: src/gen
  - plugin: buf.build/connectrpc/query-es:v${targetVersionConnectQuery}
    out: src/gen
`,
          ),
        },
      ];
    });
    it("should not be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeFalse();
    });
  });
  describe("for protobuf-es pre v1 versions", () => {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/protobuf": "<1.0.0",
              "@bufbuild/protoplugin": "<1.0.0",
              "@bufbuild/protoc-gen-es": "<1.0.0",
            },
          },
        },
      ];
    });
    it("should not be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeFalse();
    });
  });
  describe("for connect-es in @bufbuild", () => {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/connect": "*",
              "@bufbuild/connect-web": "*",
              "@bufbuild/connect-node": "*",
              "@bufbuild/connect-express": "*",
              "@bufbuild/connect-fastify": "*",
              "@bufbuild/connect-next": "*",
              "@bufbuild/protoc-gen-connect-es": "*",
            },
          },
        },
      ];
      opt.scanned.bufGenYamlFiles = [
        {
          path: "buf.gen.yaml",
          yaml: parseBufGenYaml(
            `
version: v2
plugins:
  - remote: buf.build/bufbuild/connect-es:v0.13.0
    out: src/gen
`,
            "buf.gen.yaml",
          ),
        },
      ];
    });
    it("should not be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeFalse();
    });
  });
  describe("for connect-query-es in @bufbuild", function () {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/connect-query": "*",
              "@bufbuild/protoc-gen-connect-query": "*",
            },
          },
        },
      ];
    });
    it("should not be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeFalse();
    });
  });
  describe("for connect-playwright-es in @bufbuild", function () {
    beforeEach(function () {
      opt.scanned.packageFiles = [
        {
          path: "package.json",
          pkg: {
            dependencies: {
              "@bufbuild/connect-playwright": "*",
            },
          },
        },
      ];
    });
    it("should not be applicable", () => {
      expect(v2_0_0.applicable(opt.scanned)).toBeFalse();
    });
  });
});
