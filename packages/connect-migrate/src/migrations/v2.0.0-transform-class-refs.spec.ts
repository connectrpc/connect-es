import { updateSourceFileInMemory } from "../lib/migrate-source-files";
import transform from "./v2.0.0-transform-class-refs";

describe("v2.0.0 transform class references", () => {
  it("transforms new", () => {
    const input = [`import {Foo} from "./x_pb.js";`, `new Foo();`].join("\n");
    const output = [
      `import { FooSchema } from "./x_pb.js";`,
      `import { create } from "@bufbuild/protobuf";`,
      `create(FooSchema);`,
    ].join("\n");
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toEqual(output);
  });
  it("transforms new with init object", () => {
    const input = [`import {Foo} from "./x_pb.js";`, `new Foo({x:123});`].join(
      "\n",
    );
    const output = [
      `import { FooSchema } from "./x_pb.js";`,
      `import { create } from "@bufbuild/protobuf";`,
      `create(FooSchema, {x:123});`,
    ].join("\n");
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("adds type import when transforming new", () => {
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
  it("adds create import to existing when transforming new", () => {
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
  it("transforms isMessage()", () => {
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
  it("does not transform isMessage() without schema argument", () => {
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
  it("adds type import when transforming isMessage()", () => {
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
  it("transforms wkt", () => {
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
  it("adds type import when transforming wkt", () => {
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
  it("does not transform new when identifier is not imported from _pb", () => {
    const input = `import {Foo} from "./x.js"; new Foo()`;
    const output = `import {Foo} from "./x.js"; new Foo()`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
  it("does not transform isMessage when identifier is not imported from _pb", () => {
    const input = `import {Foo} from "./x.js"; isMessage(1, Foo);`;
    const output = `import {Foo} from "./x.js"; isMessage(1, Foo);`;
    const result = updateSourceFileInMemory(transform, input, "foo.ts");
    expect(result.source).toBe(output);
  });
});
