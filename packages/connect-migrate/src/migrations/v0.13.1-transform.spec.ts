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

import jscodeshift from "jscodeshift";
import transform from "./v0.13.1-transform";

function t(
  source: string,
  parser: "tsx" | "babel" | "ts" | "babylon" | "flow" = "tsx",
) {
  const shift = jscodeshift.withParser(parser);
  return transform(
    { path: "test-file", source },
    {
      jscodeshift: shift,
      j: shift,
      stats: () => {},
      report: () => {},
    },
    {},
  );
}

describe("modify-imports", () => {
  it("should modify import", () => {
    const got = `import a from "@bufbuild/connect";`;
    const want = `import a from "@connectrpc/connect";`;
    expect(t(got)?.trim()).toBe(want.trim());
  });
  it("should modify type imports", () => {
    const got = `import type {a} from "@bufbuild/connect";`;
    const want = `import type {a} from "@connectrpc/connect";`;
    expect(t(got)?.trim()).toBe(want.trim());
  });
  it("should modify import with single quotes", () => {
    const got = `import a from '@bufbuild/connect';`;
    const want = `import a from '@connectrpc/connect';`;
    expect(t(got)?.trim()).toBe(want.trim());
  });
  it("should modify subpath import", () => {
    const got = `import a from "@bufbuild/connect/protocol";`;
    const want = `import a from "@connectrpc/connect/protocol";`;
    expect(t(got)?.trim()).toBe(want.trim());
  });
  it("should not modify irrelevant import", () => {
    const got = `import a from "@foobar/connect";`;
    expect(t(got)).toBe(got);
  });
  it("should modify require", () => {
    const got = `const a = require("@bufbuild/connect");`;
    const want = `const a = require("@connectrpc/connect");`;
    expect(t(got)?.trim()).toBe(want.trim());
  });
  it("should not modify irrelevant require", () => {
    const got = `const a = require("@foobar/connect");`;
    expect(t(got)).toBe(got);
  });
  it("should modify require with single quotes", () => {
    const got = `const a = require('@bufbuild/connect');`;
    const want = `const a = require('@connectrpc/connect');`;
    expect(t(got)?.trim()).toBe(want.trim());
  });
  it("should parse generics using the ts parser", () => {
    const got = `
    async function doSomething() {
      return <UnaryResponse<I, O>>{
        stream: false,
        header: response.headers,
        message,
        trailer,
      };
    }`;
    const want = `
    async function doSomething() {
      return <UnaryResponse<I, O>>{
        stream: false,
        header: response.headers,
        message,
        trailer,
      };
    }`;
    expect(t(got, "ts")?.trim()).toBe(want.trim());
  });
});
