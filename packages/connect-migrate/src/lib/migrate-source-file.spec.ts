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

import { updateSourceFileInMemory } from "./migrate-source-files";
import j from "jscodeshift";

describe("updateSourceFileInMemory", function () {
  it("should return modified = false for unmodified", () => {
    const transform: j.Transform = (file, { j }) => {
      return j(file.source).toSource();
    };
    const result = updateSourceFileInMemory(
      transform,
      `
      const foo = 123;
    `,
      "foo.ts",
    );
    expect(result.modified).toBe(false);
  });
  it("should parse js", () => {
    const transform: j.Transform = (file, { j }) => {
      return j(file.source)
        .findVariableDeclarators("foo")
        .renameTo("bar")
        .toSource();
    };
    const result = updateSourceFileInMemory(
      transform,
      `
      const foo = 123;
    `,
      "foo.ts",
    );
    expect(result.modified).toBe(true);
    expect(result.source).toBe(`
      const bar = 123;
    `);
  });
  it("should parse ts", () => {
    const transform: j.Transform = (file, { j }) => {
      return j(file.source)
        .findVariableDeclarators("foo")
        .renameTo("bar")
        .toSource();
    };
    const result = updateSourceFileInMemory(
      transform,
      `
      const foo: number = 123;
    `,
      "foo.ts",
    );
    expect(result.modified).toBe(true);
    expect(result.source).toBe(`
      const bar: number = 123;
    `);
  });
  it("should parse tsx", () => {
    const transform: j.Transform = (file, { j }) => {
      return j(file.source)
        .findVariableDeclarators("foo")
        .renameTo("bar")
        .toSource();
    };
    const result = updateSourceFileInMemory(
      transform,
      `
      const foo = () => (<body>body</body>);
    `,
      "foo.tsx",
    );
    expect(result.modified).toBe(true);
    expect(result.source).toBe(`
      const bar = () => (<body>body</body>);
    `);
  });
});
