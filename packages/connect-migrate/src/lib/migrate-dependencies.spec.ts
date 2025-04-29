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

import { migrateDependencies } from "./migrate-dependencies";

describe("migrateDependencies()", () => {
  it("does nothing with empty migrations", () => {
    expect(
      migrateDependencies(
        {
          dependencies: {
            foo: "1.2.3",
          },
        },
        [],
      ),
    ).toBeNull();
  });
  describe("DependencyReplacement", () => {
    it("replaces nothing with different package names", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "1.2.3",
            },
          },
          [
            {
              from: { name: "xxx", range: "*" },
              to: { name: "bar", version: "2.0.0" },
            },
          ],
        ),
      ).toBeNull();
    });
    it("replaces nothing with newer version installed", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^3.0.0",
            },
          },
          [
            {
              from: { name: "foo", range: "1.x" },
              to: { version: "2.0.0" },
            },
          ],
        ),
      ).toBeNull();
    });
    it("replaces nothing with newer version installed", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^0.12.0",
            },
          },
          [
            {
              from: { name: "foo", range: "<0.9.0" },
              to: { name: "bar", version: "0.13.1" },
            },
          ],
        ),
      ).toBeNull();
    });
    it("replaces version", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^1.0.0",
            },
          },
          [
            {
              from: { name: "foo", range: "1.x" },
              to: { version: "2.0.1" },
            },
          ],
        ),
      ).toEqual({
        dependencies: {
          foo: "^2.0.1",
        },
      });
    });
    it("replaces name", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^1.0.0",
            },
          },
          [
            {
              from: { name: "foo", range: "*" },
              to: { name: "bar", version: "1.99.9" },
            },
          ],
        ),
      ).toEqual({
        dependencies: {
          bar: "^1.0.0",
        },
      });
    });
    it("replaces name and version", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^1.0.0",
            },
          },
          [
            {
              from: { name: "foo", range: "*" },
              to: { name: "bar", version: "2.0.0" },
            },
          ],
        ),
      ).toEqual({
        dependencies: {
          bar: "^2.0.0",
        },
      });
    });
    it("replaces peerDependenciesMeta", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^1.0.0",
            },
            peerDependenciesMeta: {
              foo: { optional: true },
              baz: { optional: true },
            },
          },
          [
            {
              from: { name: "foo", range: "*" },
              to: { name: "bar", version: "1.99.9" },
            },
          ],
        ),
      ).toEqual({
        dependencies: {
          bar: "^1.0.0",
        },
        peerDependenciesMeta: {
          bar: { optional: true },
          baz: { optional: true },
        },
      });
    });
    it("replaces bundledDependency", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^1.0.0",
            },
            bundledDependencies: ["foo", "baz"],
          },
          [
            {
              from: { name: "foo", range: "*" },
              to: { name: "bar", version: "1.99.9" },
            },
          ],
        ),
      ).toEqual({
        dependencies: {
          bar: "^1.0.0",
        },
        bundledDependencies: ["bar", "baz"],
      });
    });
  });
  describe("DependencyRemoval", () => {
    it("removes nothing with different package names", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "1.2.3",
            },
          },
          [
            {
              remove: { name: "xxx", range: "*" },
            },
          ],
        ),
      ).toBeNull();
    });
    it("removes nothing with newer version installed", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^3.0.0",
            },
          },
          [
            {
              remove: { name: "foo", range: "1.x" },
            },
          ],
        ),
      ).toBeNull();
    });
    it("removes nothing with newer version installed", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^0.12.0",
            },
          },
          [
            {
              remove: { name: "foo", range: "<0.9.0" },
            },
          ],
        ),
      ).toBeNull();
    });
    it("removes dependency", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^1.0.0",
              bar: "^1.0.0",
            },
          },
          [
            {
              remove: { name: "foo", range: "1.x" },
            },
          ],
        ),
      ).toEqual({
        dependencies: {
          bar: "^1.0.0",
        },
      });
    });
    it("removes peerDependenciesMeta", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^1.0.0",
              bar: "^1.0.0",
            },
            peerDependenciesMeta: {
              foo: { optional: true },
              bar: { optional: true },
            },
          },
          [
            {
              remove: { name: "foo", range: "*" },
            },
          ],
        ),
      ).toEqual({
        dependencies: {
          bar: "^1.0.0",
        },
        peerDependenciesMeta: {
          bar: { optional: true },
        },
      });
    });
    it("removes bundledDependency", () => {
      expect(
        migrateDependencies(
          {
            dependencies: {
              foo: "^1.0.0",
              bar: "^1.0.0",
            },
            bundledDependencies: ["foo", "bar"],
          },
          [
            {
              remove: { name: "foo", range: "*" },
            },
          ],
        ),
      ).toEqual({
        dependencies: {
          bar: "^1.0.0",
        },
        bundledDependencies: ["bar"],
      });
    });
  });
});
