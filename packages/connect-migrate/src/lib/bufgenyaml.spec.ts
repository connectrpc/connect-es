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

import { BufGenYaml, parseBufGenYaml, stringifyBufGenYaml } from "./bufgenyaml";

const goldenV1 = `# buf.gen.yaml defines a local generation template.
# For details, see https://docs.buf.build/configuration/v1/buf-gen-yaml
version: v1
plugins:
  - plugin: es
    opt: target=ts
    out: src/gen
  - plugin: connect-es
    opt: target=ts
    out: src/gen
`;

const goldenV2 = `# Learn more: https://buf.build/docs/configuration/v2/buf-gen-yaml
version: v2
inputs:
  - directory: proto
plugins:
  # The code generator is installed with \`npm install @bufbuild/protoc-gen-es\`.
  - local: protoc-gen-es
    opt: target=ts
    out: src/gen
  - local: protoc-gen-connect-es
    opt: target=ts
    out: src/gen
  - local: protoc-gen-foo
    out: src/gen
  - local: protoc-gen-connect-es
    opt: target=ts
    out: src/gen
`;

describe("parseBufGenYaml()", () => {
  it("should parse golden v1", () => {
    const y: BufGenYaml = parseBufGenYaml(goldenV1);
    expect(y).toBeDefined();
    expect(y.get("version")).toBe("v1");
  });
  it("should parse golden v2", () => {
    const y: BufGenYaml = parseBufGenYaml(goldenV2);
    expect(y).toBeDefined();
    expect(y.get("version")).toBe("v2");
  });
  it("raises error for unknown version", () => {
    expect(() => parseBufGenYaml(`version: true`)).toThrowError(
      "Failed to parse: not a valid buf.gen.yaml file: unknown version: true",
    );
  });
  it("raises error for plugins not a yaml list", () => {
    expect(() => parseBufGenYaml(`version: v1\nplugins: true`)).toThrowError(
      'Failed to parse: not a valid buf.gen.yaml file: expected "plugins" to be a yaml list',
    );
  });
});

describe("stringifyBufGenYaml()", () => {
  it("should keep comments", () => {
    const str = stringifyBufGenYaml(parseBufGenYaml(goldenV2));
    expect(str).toEqual(goldenV2);
  });
});
