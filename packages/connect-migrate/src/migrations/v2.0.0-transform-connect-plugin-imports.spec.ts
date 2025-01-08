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

import { updateSourceFileInMemory } from "../lib/migrate-source-files";
import transform from "./v2.0.0-transform-connect-plugin-imports";

describe("v2.0.0 transform connect plugin imports", () => {
  it("should modify import from *_connect.js to *_pb.js", () => {
    const input = `import { ElizaService } from "./gen/eliza_connect.js";`;
    const output = `import { ElizaService } from "./gen/eliza_pb.js";`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should modify import from *_connect to *_pb", () => {
    const input = `import { ElizaService } from "./gen/eliza_connect";`;
    const output = `import { ElizaService } from "./gen/eliza_pb";`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should modify import from *_connect.ts to *_pb.ts", () => {
    const input = `import { ElizaService } from "./gen/eliza_connect.ts";`;
    const output = `import { ElizaService } from "./gen/eliza_pb.ts";`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should modify js", () => {
    const input = `import { ElizaService } from "./gen/eliza_connect.js";`;
    const output = `import { ElizaService } from "./gen/eliza_pb.js";`;
    const result = updateSourceFileInMemory(transform, input, "foo.js");
    expect(result.source).toBe(output);
  });
  it("should modify tsx", () => {
    const input = `import { ElizaService } from "./gen/eliza_connect.js";`;
    const output = `import { ElizaService } from "./gen/eliza_pb.js";`;
    const result = updateSourceFileInMemory(transform, input, "foo.tsx");
    expect(result.source).toBe(output);
  });
  it("should modify import alias", () => {
    const input = `import { ElizaService as MyEliza } from "./gen/eliza_connect.js";`;
    const output = `import { ElizaService as MyEliza } from "./gen/eliza_pb.js";`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("should not care about existing imports", () => {
    const input = `
      import { ElizaService } from "./gen/eliza_connect.js";
      import { Foo } from "./gen/eliza_pb.js";
    `;
    const output = `
      import { ElizaService } from "./gen/eliza_pb.js";
      import { Foo } from "./gen/eliza_pb.js";
    `;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
});
