// Copyright 2021-2023 The Connect Authors
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

import {
  Int32Value,
  MethodIdempotency,
  MethodKind,
  StringValue,
} from "@bufbuild/protobuf";
import { createConnectRouter } from "./router.js";

const testService = {
  typeName: "TestService",
  methods: {
    unary: {
      name: "Unary",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.Unary,
    },
    server: {
      name: "Server",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ServerStreaming,
    },
    client: {
      name: "Client",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ClientStreaming,
    },
    biDi: {
      name: "BiDi",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.BiDiStreaming,
    },
  },
} as const;

describe("createConnectRouter", function () {
  describe("supports self describing method type", function () {
    it("should work for unary", function () {
      const methodDefinition = {
        name: "Unary",
        kind: MethodKind.Unary,
        I: Int32Value,
        O: StringValue,
        service: testService,
        idempotency: MethodIdempotency.NoSideEffects,
      } as const;
      const router = createConnectRouter({}).rpc(
        methodDefinition,
        (request) => {
          return { value: `${request.value}-RESPONSE` };
        },
      );

      expect(router.handlers).toHaveSize(1);
      expect(router.handlers[0].method).toEqual(methodDefinition);
      expect(router.handlers[0].service).toEqual({
        ...testService,
        methods: {},
      });
    });
  });
});
