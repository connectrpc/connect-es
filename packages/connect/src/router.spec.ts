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

import { createConnectRouter } from "./router.js";
import { createServiceDesc } from "./descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";

const testService = createServiceDesc({
  typeName: "TestService",
  method: {
    unary: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "unary",
    },
    server: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "server_streaming",
    },
    client: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "client_streaming",
    },
    biDi: {
      input: Int32ValueSchema,
      output: StringValueSchema,
      methodKind: "bidi_streaming",
    },
  },
});

describe("createConnectRouter", function () {
  it("supports self describing method type", function () {
    const methodDefinition = testService.method.unary;
    const router = createConnectRouter({}).rpc(methodDefinition, (request) => {
      return { value: `${request.value}-RESPONSE` };
    });

    expect(router.handlers).toHaveSize(1);
    expect(router.handlers[0].method).toEqual(methodDefinition);
    expect(router.handlers[0].service).toEqual(testService);
  });

  it("supports chaining after destructuring", function () {
    const router = createConnectRouter({});

    const { rpc } = router;
    rpc(testService.method.unary, (request) => {
      return { value: `${request.value}-RESPONSE` };
      // eslint-disable-next-line @typescript-eslint/require-await
    }).rpc(testService.method.server, async function* (request) {
      yield { value: `${request.value}-RESPONSE` };
    });

    expect(router.handlers).toHaveSize(2);
    expect(router.handlers[0].method).toEqual(testService.method.unary);
    expect(router.handlers[0].service).toEqual(testService);
    expect(router.handlers[1].method).toEqual(testService.method.server);
    expect(router.handlers[1].service).toEqual(testService);
  });
});
