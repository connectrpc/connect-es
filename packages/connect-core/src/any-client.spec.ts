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

import { makeAnyClient } from "./any-client.js";
import { Empty, MethodKind, Struct } from "@bufbuild/protobuf";

describe("makeAnyClient()", () => {
  const TestService = {
    typeName: "handwritten.TestService",
    methods: {
      foo: {
        name: "Foo",
        I: Empty,
        O: Struct,
        kind: MethodKind.Unary,
      },
    },
  } as const;

  it("works as expected", () => {
    const client = makeAnyClient(TestService, (method) => {
      return function (): string {
        return `This is method ${method.name} of service ${method.service.typeName}. It takes a ${method.I.typeName} as input and returns a ${method.O.typeName}.`;
      };
    });
    const result = client.foo(); // eslint-disable-line
    expect(result).toBe(
      "This is method Foo of service handwritten.TestService. It takes a google.protobuf.Empty as input and returns a google.protobuf.Struct."
    );
  });
});
