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

import jscodeshift from "jscodeshift";
import transform from "./v0.16.0-transform";

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

describe("rename symbols using", () => {
  describe("'import' with", () => {
    it("local identifier", () => {
      const got = `
        import { createPromiseClient as create } from "@connectrpc/connect";
        const createPromiseClient = create;
        `;
      const want = `
        import { createClient as create } from "@connectrpc/connect";
        const createPromiseClient = create;
        `;
      expect(t(got)?.trim()).toBe(want.trim());
    });
    it("identifier", () => {
      const got = `
        import { createPromiseClient } from "@connectrpc/connect";
        const a = createPromiseClient;
        console.log(createPromiseClient);
        const c = createPromiseClient();
        type R = ReturnType<typeof createPromiseClient>;
        `;
      const want = `
        import { createClient } from "@connectrpc/connect";
        const a = createClient;
        console.log(createClient);
        const c = createClient();
        type R = ReturnType<typeof createClient>;
        `;
      expect(t(got)?.trim()).toBe(want.trim());
    });
    it("namespace", () => {
      const got = `
        import * as connect from "@connectrpc/connect";
        const a = connect.createPromiseClient;
        console.log(connect.createPromiseClient);
        const c = connect.createPromiseClient();
        type R = ReturnType<typeof connect.createPromiseClient>;
        `;
      const want = `
        import * as connect from "@connectrpc/connect";
        const a = connect.createClient;
        console.log(connect.createClient);
        const c = connect.createClient();
        type R = ReturnType<typeof connect.createClient>;
        `;
      expect(t(got)?.trim()).toBe(want.trim());
    });
    it("default", () => {
      const got = `
        import connect from "@connectrpc/connect";
        const a = connect.createPromiseClient;
        console.log(connect.createPromiseClient);
        const c = connect.createPromiseClient();
        type R = ReturnType<typeof connect.createPromiseClient>;
        `;
      const want = `
        import connect from "@connectrpc/connect";
        const a = connect.createClient;
        console.log(connect.createClient);
        const c = connect.createClient();
        type R = ReturnType<typeof connect.createClient>;
        `;
      expect(t(got)?.trim()).toBe(want.trim());
    });
  });
  describe("'require' with", () => {
    it("const", () => {
      const got = `
    const connect = require("@connectrpc/connect");
    const a = connect.createPromiseClient;
    console.log(connect.createPromiseClient);
    const c = connect.createPromiseClient();
    type R = ReturnType<typeof connect.createPromiseClient>;
    `;
      const want = `
    const connect = require("@connectrpc/connect");
    const a = connect.createClient;
    console.log(connect.createClient);
    const c = connect.createClient();
    type R = ReturnType<typeof connect.createClient>;
    `;
      expect(t(got)?.trim()).toBe(want.trim());
    });
    it("spread", () => {
      const got = `
    const { createPromiseClient } = require("@connectrpc/connect");
    const a = createPromiseClient;
    console.log(createPromiseClient);
    const c = createPromiseClient();
    type R = ReturnType<typeof createPromiseClient>;
    `;
      const want = `
    const { createClient } = require("@connectrpc/connect");
    const a = createClient;
    console.log(createClient);
    const c = createClient();
    type R = ReturnType<typeof createClient>;
    `;
      expect(t(got)?.trim()).toBe(want.trim());
    });
    it("let", () => {
      const got = `
      let connect;
      connect = require("@connectrpc/connect");
      const a = connect.createPromiseClient;
      console.log(connect.createPromiseClient);
      const c = connect.createPromiseClient();
      type R = ReturnType<typeof connect.createPromiseClient>;
      `;
      const want = `
      let connect;
      connect = require("@connectrpc/connect");
      const a = connect.createClient;
      console.log(connect.createClient);
      const c = connect.createClient();
      type R = ReturnType<typeof connect.createClient>;
      `;
      expect(t(got)?.trim()).toBe(want.trim());
    });
  });
});
