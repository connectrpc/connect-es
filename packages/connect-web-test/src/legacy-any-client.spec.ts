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

import { makeAnyClient } from "@bufbuild/connect-web";
import { TestService } from "./gen/grpc/testing/test_connect.js";

// TODO remove this file after connect-web has migrated to connect-core

describe("makeAnyClient()", () => {
  it("works as expected", () => {
    const client = makeAnyClient(TestService, (method) => {
      return function (): string {
        return `This is method ${method.name} of service ${method.service.typeName}. It takes a ${method.I.typeName} as input and returns a ${method.O.typeName}.`;
      };
    });
    const result = client.unaryCall(); // eslint-disable-line
    expect(result).toBe(
      "This is method UnaryCall of service grpc.testing.TestService. It takes a grpc.testing.SimpleRequest as input and returns a grpc.testing.SimpleResponse."
    );
  });
});
