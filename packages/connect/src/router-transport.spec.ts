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
import { createRouterTransport } from "./router-transport.js";

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
  const transport = createRouterTransport(({ service }) => {
    service(testService, {
      unary(req) {
        return { value: req.value.toString() };
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      async *server(req) {
        for (let i = 0; i < req.value; i++) {
          yield { value: req.value.toString() };
        }
      },
      async client(req) {
        let value = 0;
        for await (const next of req) {
          value = next.value;
        }
        return { value: value.toString() };
      },
      async *biDi(req) {
        for await (const next of req) {
          yield { value: next.value.toString() };
        }
      },
    });
  });
  const client = createPromiseClient(testService, transport);
  it("should work for unary", async function () {
    const res = await client.unary({ value: 13 });
    expect(res.value).toBe("13");
  });
  it("should work for server steam", async function () {
    const res = client.server({ value: 13 });
    let count = 0;
    for await (const next of res) {
      count++;
      expect(next.value).toBe("13");
    }
    expect(count).toBe(13);
  });
  it("should work for client steam", async function () {
    const res = await client.client(
      createAsyncIterable([{ value: 12 }, { value: 13 }])
    );
    expect(res.value).toBe("13");
  });
  it("should work for bidi steam", async function () {
    const payload = [{ value: 1 }, { value: 2 }];
    const res = client.biDi(createAsyncIterable(payload));
    let count = 0;
    for await (const next of res) {
      expect(next.value).toBe(payload[count].value.toString());
      count++;
    }
    expect(count).toBe(payload.length);
  });
});
