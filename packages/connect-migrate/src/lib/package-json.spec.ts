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

import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import type { JsonValue } from "@bufbuild/protobuf";
import { type PackageJson, readPackageJsonFile } from "./package-json.js";

describe("readPackageJsonFile", () => {
  let testFilePath: string;

  it("should raise error for empty file", () => {
    writeFileSync(testFilePath, "", "utf-8");
    expect(() => readPackageJsonFile(testFilePath)).toThrowError(
      /Failed to parse .*: Unexpected end of JSON input/,
    );
  });

  describe("with expected structure", () => {
    const goodContents = [
      { name: "ok" },
      { version: "1.2.3" },
      { dependencies: { foo: "workspace:../foo", bar: "^1.2.3" } },
      { devDependencies: { foo: "workspace:../foo", bar: "^1.2.3" } },
      { peerDependencies: { foo: "workspace:../foo", bar: "^1.2.3" } },
      { bundleDependencies: ["foo", "bar"] },
      { bundledDependencies: ["foo", "bar"] },
      { peerDependenciesMeta: { foo: { optional: false } } },
    ] satisfies PackageJson[];
    goodContents.forEach((content, index) => {
      it(`should raise error for goodContents.${index}`, () => {
        writeFileSync(testFilePath, JSON.stringify(content), "utf-8");
        const result = readPackageJsonFile(testFilePath);
        expect(result).toEqual(content);
      });
    });
  });

  describe("with unexpected structure", () => {
    const badContents = [
      [/Failed to parse .*: not a valid package.json file/, []],
      [/Failed to parse .*: not a valid package.json file/, null],
      [
        /Failed to parse .*: not a valid package.json file: malformed name/,
        { name: 123 },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed dependencies/,
        { dependencies: 123 },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed dependencies/,
        { dependencies: [123] },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed devDependencies/,
        { devDependencies: 123 },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed devDependencies/,
        { devDependencies: [123] },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed peerDependencies/,
        { peerDependencies: 123 },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed peerDependencies/,
        { peerDependencies: [123] },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed bundleDependencies/,
        { bundleDependencies: 123 },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed bundleDependencies/,
        { bundleDependencies: [{}] },
      ],
      [
        /Failed to parse .*: not a valid package.json file: malformed peerDependenciesMeta/,
        { peerDependenciesMeta: { foo: "v1" } },
      ],
    ] satisfies [RegExp, JsonValue][];
    badContents.forEach(([error, content], index) => {
      it(`should raise error for badContents.${index}`, () => {
        writeFileSync(testFilePath, JSON.stringify(content), "utf-8");
        expect(() => readPackageJsonFile(testFilePath)).toThrowError(error);
      });
    });
  });

  beforeEach(() => {
    testFilePath = `.tmp-package-${randomBytes(6)
      .readUIntLE(0, 6)
      .toString(36)}.json`;
  });
  afterEach(() => {
    if (existsSync(testFilePath)) {
      unlinkSync(testFilePath);
    }
  });
});
