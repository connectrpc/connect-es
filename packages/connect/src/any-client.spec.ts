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

import { makeAnyClient } from "./any-client.js";
import { EmptySchema, StructSchema } from "@bufbuild/protobuf/wkt";
import { createServiceDesc } from "./descriptor-helper.spec.js";

describe("makeAnyClient()", () => {
  const TestService = createServiceDesc({
    typeName: "handwritten.TestService",
    method: {
      foo: {
        methodKind: "unary",
        input: EmptySchema,
        output: StructSchema,
      },
    },
  });
  it("works as expected", () => {
    const client = makeAnyClient(TestService, (method) => {
      return (): string =>
        `This is method ${method.name} of service ${method.parent.typeName}. It takes a ${method.input.typeName} as input and returns a ${method.output.typeName}.`;
    });
    const result = client.foo();
    expect(result).toBe(
      "This is method Foo of service handwritten.TestService. It takes a google.protobuf.Empty as input and returns a google.protobuf.Struct.",
    );
  });
});
