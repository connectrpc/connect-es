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

import { createPromiseClient } from "./promise-client.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";
import { createRouterTransport } from "./router-transport.js";
import { ConnectError } from "./connect-error.js";
import { createServiceDesc } from "./descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";

describe("createRoutesTransport", function () {
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
      createAsyncIterable([{ value: 12 }, { value: 13 }]),
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
  it("should handle calling an RPC on a router transport that isn't registered", async function () {
    const transport = createRouterTransport(() => {
      // intentionally not registering any transports
    });
    const client = createPromiseClient(testService, transport);
    try {
      await client.unary({});
      fail("expected error");
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      expect(ConnectError.from(e).message).toBe(
        "[unimplemented] RouterHttpClient: no handler registered for /TestService/Unary",
      );
    }
  });
});
