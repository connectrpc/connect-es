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

import { updateSourceFileInMemory } from "../lib/migrate-source-files";
import transform from "./v2.0.0-transform-class-refs";

describe("v2.0.0 transform class references", () => {
  describe("new to create", () => {
    it("transforms single import", () => {
      const input = [`import {Foo} from "./x_pb.js";`, `new Foo();`].join("\n");
      const output = [
        `import { FooSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `create(FooSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("transforms multiple imports", () => {
      const input = [
        `import {Foo, Bar} from "./x_pb.js";`,
        `new Foo();`,
        `new Bar();`,
      ].join("\n");
      const output = [
        `import { FooSchema, BarSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `create(FooSchema);`,
        `create(BarSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("transforms single import alias", () => {
      const input = [
        `import {Foo as MyFoo} from "./x_pb.js";`,
        `new MyFoo();`,
      ].join("\n");
      const output = [
        `import { FooSchema as MyFooSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `create(MyFooSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("transforms multiple import aliases", () => {
      const input = [
        `import {Foo as MyFoo, Bar as MyBar} from "./x_pb.js";`,
        `new MyFoo();`,
        `new MyBar();`,
      ].join("\n");
      const output = [
        `import { FooSchema as MyFooSchema, BarSchema as MyBarSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `create(MyFooSchema);`,
        `create(MyBarSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("transforms mix of regular and import aliases", () => {
      const input = [
        `import {Foo as MyFoo, Bar} from "./x_pb.js";`,
        `new MyFoo();`,
        `new Bar();`,
      ].join("\n");
      const output = [
        `import { FooSchema as MyFooSchema, BarSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `create(MyFooSchema);`,
        `create(BarSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("transforms new with init object", () => {
      const input = [
        `import {Foo} from "./x_pb.js";`,
        `new Foo({x:123});`,
      ].join("\n");
      const output = [
        `import { FooSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `create(FooSchema, {x:123});`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toBe(output);
    });
    it("transforms new with init object and import alias", () => {
      const input = [
        `import {Foo as MyFoo} from "./x_pb.js";`,
        `new MyFoo({x:123});`,
      ].join("\n");
      const output = [
        `import { FooSchema as MyFooSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `create(MyFooSchema, {x:123});`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toBe(output);
    });
    it("adds type import for single import", () => {
      const input = [
        `import {Foo} from "./x_pb.js";`,
        `const foo: Foo = new Foo();`,
      ].join("\n");
      const output = [
        `import { FooSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `import type { Foo } from "./x_pb.js";`,
        `const foo: Foo = create(FooSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("adds type import for multiple imports", () => {
      const input = [
        `import {Foo, Bar} from "./x_pb.js";`,
        `const foo: Foo = new Foo();`,
        `const bar: Bar = new Bar();`,
      ].join("\n");
      const output = [
        `import { FooSchema, BarSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `import type { Foo, Bar } from "./x_pb.js";`,
        `const foo: Foo = create(FooSchema);`,
        `const bar: Bar = create(BarSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("adds type import for multiple import aliases", () => {
      const input = [
        `import {Foo as MyFoo, Bar as SomeBar} from "./x_pb.js";`,
        `const foo: MyFoo = new MyFoo();`,
        `const bar: SomeBar = new SomeBar();`,
      ].join("\n");
      const output = [
        `import { FooSchema as MyFooSchema, BarSchema as SomeBarSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `import type { Foo as MyFoo, Bar as SomeBar } from "./x_pb.js";`,
        `const foo: MyFoo = create(MyFooSchema);`,
        `const bar: SomeBar = create(SomeBarSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("adds type import for multiple imports with mix of aliases and regular", () => {
      const input = [
        `import {Foo as MyFoo, Bar} from "./x_pb.js";`,
        `const foo: MyFoo = new MyFoo();`,
        `const bar: Bar = new Bar();`,
      ].join("\n");
      const output = [
        `import { FooSchema as MyFooSchema, BarSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `import type { Foo as MyFoo, Bar } from "./x_pb.js";`,
        `const foo: MyFoo = create(MyFooSchema);`,
        `const bar: Bar = create(BarSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("does not transform when identifier is not imported from _pb", () => {
      const input = `import {Foo} from "./x.js"; new Foo()`;
      const output = `import {Foo} from "./x.js"; new Foo()`;
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toBe(output);
    });
    it("does not add type import to .js file", () => {
      const input = [
        `import {Foo} from "./x_pb.js";`,
        `const foo = new Foo();`,
        `foo instanceof Foo;`,
      ].join("\n");
      const output = [
        `import { FooSchema } from "./x_pb.js";`,
        `import { create } from "@bufbuild/protobuf";`,
        `const foo = create(FooSchema);`,
        `foo instanceof Foo;`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.js");
      expect(result.source).toEqual(output);
    });
    it("adds create import to existing @bufbuild/protobuf import", () => {
      const input = [
        `import {fake} from "@bufbuild/protobuf";`,
        `import {Foo} from "./x_pb.js";`,
        `new Foo();`,
      ].join("\n");
      const output = [
        `import { fake, create } from "@bufbuild/protobuf";`,
        `import { FooSchema } from "./x_pb.js";`,
        `create(FooSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
  });

  describe("isMessage()", () => {
    it("transforms with schema argument", () => {
      const input = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import {Foo} from "./x_pb.js";`,
        `isMessage(1, Foo);`,
      ].join("\n");
      const output = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import { FooSchema } from "./x_pb.js";`,
        `isMessage(1, FooSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("transforms with schema argument and import alias", () => {
      const input = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import {Foo as MyFoo} from "./x_pb.js";`,
        `isMessage(1, MyFoo);`,
      ].join("\n");
      const output = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import { FooSchema as MyFooSchema } from "./x_pb.js";`,
        `isMessage(1, MyFooSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("does not transform without schema argument", () => {
      const input = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import {Foo} from "./x_pb.js";`,
        `isMessage(1);`,
      ].join("\n");
      const output = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import {Foo} from "./x_pb.js";`,
        `isMessage(1);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("adds type import", () => {
      const input = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import {Foo} from "./x_pb.js";`,
        `type X = Foo;`,
        `isMessage(1, Foo);`,
      ].join("\n");
      const output = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import { FooSchema } from "./x_pb.js";`,
        `import type { Foo } from "./x_pb.js";`,
        `type X = Foo;`,
        `isMessage(1, FooSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("adds type import with import alias", () => {
      const input = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import {Foo as MyFoo} from "./x_pb.js";`,
        `type X = MyFoo;`,
        `isMessage(1, MyFoo);`,
      ].join("\n");
      const output = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import { FooSchema as MyFooSchema } from "./x_pb.js";`,
        `import type { Foo as MyFoo } from "./x_pb.js";`,
        `type X = MyFoo;`,
        `isMessage(1, MyFooSchema);`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toEqual(output);
    });
    it("does not transform isMessage when identifier is not imported from _pb", () => {
      const input = `import {Foo} from "./x.js"; isMessage(1, Foo);`;
      const output = `import {Foo} from "./x.js"; isMessage(1, Foo);`;
      const result = updateSourceFileInMemory(transform, input, "foo.ts");
      expect(result.source).toBe(output);
    });
    it("does not add type import to .js file", () => {
      const input = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import {Foo} from "./x_pb.js";`,
        `isMessage(1, Foo);`,
        `foo instanceof Foo;`,
      ].join("\n");
      const output = [
        `import {isMessage} from "@bufbuild/protobuf";`,
        `import { FooSchema } from "./x_pb.js";`,
        `isMessage(1, FooSchema);`,
        `foo instanceof Foo;`,
      ].join("\n");
      const result = updateSourceFileInMemory(transform, input, "foo.js");
      expect(result.source).toEqual(output);
    });
    describe("update wkt import", () => {
      it("regular import", () => {
        const input = [
          `import {Timestamp} from "@bufbuild/protobuf";`,
          `new Timestamp();`,
        ].join("\n");
        const output = [
          `import { TimestampSchema } from "@bufbuild/protobuf/wkt";`,
          `import { create } from "@bufbuild/protobuf";`,
          `create(TimestampSchema);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
      it("import alias", () => {
        const input = [
          `import {Timestamp as TS} from "@bufbuild/protobuf";`,
          `new TS();`,
        ].join("\n");
        const output = [
          `import { TimestampSchema as TSSchema } from "@bufbuild/protobuf/wkt";`,
          `import { create } from "@bufbuild/protobuf";`,
          `create(TSSchema);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
      it("adds type import", () => {
        const input = [
          `import {Timestamp} from "@bufbuild/protobuf";`,
          `const ts: Timestamp = new Timestamp();`,
        ].join("\n");
        const output = [
          `import { TimestampSchema } from "@bufbuild/protobuf/wkt";`,
          `import { create } from "@bufbuild/protobuf";`,
          `import type { Timestamp } from "@bufbuild/protobuf/wkt";`,
          `const ts: Timestamp = create(TimestampSchema);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
      it("adds type import for multiple import aliases", () => {
        const input = [
          `import {Timestamp as TS, Duration as Dur} from "@bufbuild/protobuf";`,
          `const ts: TS = new TS();`,
          `const duration: Dur = new Dur();`,
        ].join("\n");
        const output = [
          `import { TimestampSchema as TSSchema, DurationSchema as DurSchema } from "@bufbuild/protobuf/wkt";`,
          `import { create } from "@bufbuild/protobuf";`,
          `import type { Timestamp as TS, Duration as Dur } from "@bufbuild/protobuf/wkt";`,
          `const ts: TS = create(TSSchema);`,
          `const duration: Dur = create(DurSchema);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
    });
    describe("static methods", () => {
      it("transforms fromBinary call", () => {
        const input = [
          `import {Foo} from "./foo_pb";`,
          `Foo.fromBinary(x, y);`,
        ].join("\n");
        const output = [
          `import { FooSchema } from "./foo_pb";`,
          `import { fromBinary } from "@bufbuild/protobuf";`,
          `fromBinary(FooSchema, x, y);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
      it("transforms fromBinary call for alias", () => {
        const input = [
          `import {Foo as MyFoo} from "./foo_pb";`,
          `MyFoo.fromBinary(x, y);`,
        ].join("\n");
        const output = [
          `import { FooSchema as MyFooSchema } from "./foo_pb";`,
          `import { fromBinary } from "@bufbuild/protobuf";`,
          `fromBinary(MyFooSchema, x, y);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
      it("transforms fromJson call", () => {
        const input = [
          `import {Foo} from "./foo_pb";`,
          `Foo.fromJson(x, y);`,
        ].join("\n");
        const output = [
          `import { FooSchema } from "./foo_pb";`,
          `import { fromJson } from "@bufbuild/protobuf";`,
          `fromJson(FooSchema, x, y);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
      it("transforms fromJson call for alias", () => {
        const input = [
          `import {Foo as MyFoo} from "./foo_pb";`,
          `MyFoo.fromJson(x, y);`,
        ].join("\n");
        const output = [
          `import { FooSchema as MyFooSchema } from "./foo_pb";`,
          `import { fromJson } from "@bufbuild/protobuf";`,
          `fromJson(MyFooSchema, x, y);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
      it("transforms fromJsonString call", () => {
        const input = [
          `import {Foo} from "./foo_pb";`,
          `Foo.fromJsonString(x, y);`,
        ].join("\n");
        const output = [
          `import { FooSchema } from "./foo_pb";`,
          `import { fromJsonString } from "@bufbuild/protobuf";`,
          `fromJsonString(FooSchema, x, y);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
      it("transforms fromJsonString call for alias", () => {
        const input = [
          `import {Foo as MyFoo} from "./foo_pb";`,
          `MyFoo.fromJsonString(x, y);`,
        ].join("\n");
        const output = [
          `import { FooSchema as MyFooSchema } from "./foo_pb";`,
          `import { fromJsonString } from "@bufbuild/protobuf";`,
          `fromJsonString(MyFooSchema, x, y);`,
        ].join("\n");
        const result = updateSourceFileInMemory(transform, input, "foo.ts");
        expect(result.source).toEqual(output);
      });
    });
  });
});
