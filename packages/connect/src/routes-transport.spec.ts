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

import { Int32Value, StringValue, MethodKind } from "@bufbuild/protobuf";
import { createPromiseClient } from "./promise-client.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";
import { createRoutesTransport } from "./routes-transport.js";

describe("createRoutesTransport", function () {
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
    },
  } as const;
  const transport = createRoutesTransport(({ service }) => {
    service(testService, {
      unary(req) {
        return { value: req.value.toString() };
      },
      server(req) {
        return createAsyncIterable([{ value: req.value.toString() }]);
      },
    });
  });
  it("should work for unary", async function () {
    const client = createPromiseClient(testService, transport);
    const res = await client.unary({ value: 13 });
    expect(res.value).toBe("13");
  });
});
