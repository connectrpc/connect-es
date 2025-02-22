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

import transform from "./v0.13.1-transform";
import { updateSourceFileInMemory } from "../lib/migrate-source-files";

describe("v0.13.1 transform", () => {
  it("should modify import", () => {
    const input = `import a from "@bufbuild/connect";`;
    const output = `import a from "@connectrpc/connect";`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should modify type imports", () => {
    const input = `import type {a} from "@bufbuild/connect";`;
    const output = `import type {a} from "@connectrpc/connect";`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should modify import with single quotes", () => {
    const input = `import a from '@bufbuild/connect';`;
    const output = `import a from '@connectrpc/connect';`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should modify subpath import", () => {
    const input = `import a from "@bufbuild/connect/protocol";`;
    const output = `import a from "@connectrpc/connect/protocol";`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should not modify irrelevant import", () => {
    const input = `import a from "@foobar/connect";`;
    const output = input;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should modify require", () => {
    const input = `const a = require("@bufbuild/connect");`;
    const output = `const a = require("@connectrpc/connect");`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should not modify irrelevant require", () => {
    const input = `const a = require("@foobar/connect");`;
    const output = input;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should modify require with single quotes", () => {
    const input = `const a = require('@bufbuild/connect');`;
    const output = `const a = require('@connectrpc/connect');`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should parse generics using the ts parser", () => {
    const input = `
    async function doSomething() {
      return <UnaryResponse<I, O>>{
        stream: false,
        header: response.headers,
        message,
        trailer,
      };
    }`;
    const output = `
    async function doSomething() {
      return <UnaryResponse<I, O>>{
        stream: false,
        header: response.headers,
        message,
        trailer,
      };
    }`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
});
