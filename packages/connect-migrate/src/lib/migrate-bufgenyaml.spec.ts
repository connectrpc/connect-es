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

import { parseBufGenYaml, stringifyBufGenYaml } from "./bufgenyaml";
import { migrateBufGenYaml } from "./migrate-bufgenyaml";
import type { BufGenYamlMigration } from "./migrate-bufgenyaml";

describe("migrateBufGenYaml()", () => {
  describe("BufGenYamlPluginUpdate", () => {
    const migration: BufGenYamlMigration = {
      updatePlugin: {
        remote: "buf.build/bufbuild/es",
        from: "^1.0.0",
        to: "2.0.0",
      },
    };
    it("should update plugin in v2", () => {
      const input = `# comment
version: v2
inputs:
  - directory: proto
plugins:
  # keep
  - remote: buf.build/bufbuild/es
    out: src/gen
  # update
  - remote: buf.build/bufbuild/es:v1.10.0
    out: src/gen
`;
      const expected = `# comment
version: v2
inputs:
  - directory: proto
plugins:
  # keep
  - remote: buf.build/bufbuild/es
    out: src/gen
  # update
  - remote: buf.build/bufbuild/es:v2.0.0
    out: src/gen
`;
      const yaml = parseBufGenYaml(input);
      const updated = migrateBufGenYaml(yaml, [migration]);
      expect(updated).toBeDefined();
      expect(stringifyBufGenYaml(updated ?? yaml)).toBe(expected);
    });
    it("should update plugin in v1", () => {
      const input = `# comment
version: v1
plugins:
  # keep
  - plugin: buf.build/bufbuild/es
    out: src/gen
  # update
  - plugin: buf.build/bufbuild/es:v1.10.0
    out: src/gen
`;
      const expected = `# comment
version: v1
plugins:
  # keep
  - plugin: buf.build/bufbuild/es
    out: src/gen
  # update
  - plugin: buf.build/bufbuild/es:v2.0.0
    out: src/gen
`;
      const yaml = parseBufGenYaml(input);
      const updated = migrateBufGenYaml(yaml, [migration]);
      expect(updated).toBeDefined();
      expect(stringifyBufGenYaml(updated ?? yaml)).toBe(expected);
    });
    it("should not update up-to-date plugin in v1", () => {
      const input = `version: v1
plugins:
  - plugin: buf.build/bufbuild/es:v2.99.0
    out: src/gen
`;
      const yaml = parseBufGenYaml(input);
      const updated = migrateBufGenYaml(yaml, [migration]);
      expect(updated).toBeNull();
    });
    it("should not update up-to-date plugin in v2", () => {
      const input = `version: v2
plugins:
  - remote: buf.build/bufbuild/es:v2.99.0
    out: src/gen
`;
      const yaml = parseBufGenYaml(input);
      const updated = migrateBufGenYaml(yaml, [migration]);
      expect(updated).toBeNull();
    });
  });
  describe("BufGenYamlPluginRemoval", () => {
    const migration: BufGenYamlMigration = {
      removePlugin: {
        local: "protoc-gen-connect-es",
        remote: "buf.build/connectrpc/es",
      },
    };
    it("should remove plugin from v2", () => {
      const input = `# comment
version: v2
inputs:
  - directory: proto
plugins:
  # keep
  - local: protoc-gen-es
    out: src/gen
  # remove
  - local: protoc-gen-connect-es
    out: src/gen
  # keep
  - local: protoc-gen-foo
    out: src/gen
  # remove
  - remote: buf.build/connectrpc/es
    out: src/gen
  # remove
  - remote: buf.build/connectrpc/es:v1.4.0
    out: src/gen
`;
      const expected = `# comment
version: v2
inputs:
  - directory: proto
plugins:
  # keep
  - local: protoc-gen-es
    out: src/gen
  # keep
  - local: protoc-gen-foo
    out: src/gen
`;
      const yaml = parseBufGenYaml(input);
      const updated = migrateBufGenYaml(yaml, [migration]);
      expect(updated).toBeDefined();
      expect(stringifyBufGenYaml(updated ?? yaml)).toBe(expected);
    });
    it("should remove plugin from v1", () => {
      const input = `# comment
version: v1
plugins:
  # keep
  - plugin: es
    out: src/gen
  # remove
  - plugin: connect-es
    out: src/gen
  # keep
  - plugin: foo
    out: src/gen
  # remove
  - plugin: buf.build/connectrpc/es
    out: src/gen
  # remove
  - plugin: buf.build/connectrpc/es:v1.4.0
    out: src/gen
`;
      const expected = `# comment
version: v1
plugins:
  # keep
  - plugin: es
    out: src/gen
  # keep
  - plugin: foo
    out: src/gen
`;
      const yaml = parseBufGenYaml(input);
      const updated = migrateBufGenYaml(yaml, [migration]);
      expect(updated).toBeDefined();
      expect(stringifyBufGenYaml(updated ?? yaml)).toBe(expected);
    });
  });
});
