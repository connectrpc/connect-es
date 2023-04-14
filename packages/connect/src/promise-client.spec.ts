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

import { Int32Value, MethodKind, StringValue } from "@bufbuild/protobuf";
import {
  createBiDiStreamingFn,
  createClientStreamingFn,
  createServerStreamingFn,
} from "./promise-client.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";
import { createRouterTransport } from "./router-transport.js";
import type { HandlerContext } from "./implementation";

const TestService = {
  typeName: "handwritten.TestService",
  methods: {
    clientStream: {
      name: "ClientStream",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ClientStreaming,
    },
    serverStream: {
      name: "ServerStream",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ServerStreaming,
    },
    bidiStream: {
      name: "BidiStream",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.BiDiStreaming,
    },
  },
} as const;

describe("createClientStreamingFn()", function () {
  it("works as expected on the happy path", async () => {
    const input = new Int32Value({ value: 1 });

    const output = new StringValue({ value: "yield 1" });

    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        clientStream: (
          _input: AsyncIterable<Int32Value>,
          _context: HandlerContext
        ) => Promise.resolve(output),
      });
    });
    const fn = createClientStreamingFn(
      transport,
      TestService,
      TestService.methods.clientStream
    );
    const res = await fn(
      // eslint-disable-next-line @typescript-eslint/require-await
      (async function* () {
        yield input;
      })()
    );
    expect(res).toBeInstanceOf(StringValue);
    expect(res.value).toEqual(output.value);
  });
});

describe("createServerStreamingFn()", function () {
  it("works as expected on the happy path", async () => {
    const output = [
      new StringValue({ value: "input1" }),
      new StringValue({ value: "input2" }),
      new StringValue({ value: "input3" }),
    ];

    const transport = createRouterTransport(({ service }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
      service(TestService, {
        serverStream: (_input: Int32Value, _context: HandlerContext) =>
          createAsyncIterable(output),
      });
    });

    const fn = createServerStreamingFn(
      transport,
      TestService,
      TestService.methods.serverStream
    );
    const receivedMessages: StringValue[] = [];
    const input = new Int32Value({ value: 123 });
    for await (const res of fn(input)) {
      receivedMessages.push(res);
    }
    expect(receivedMessages).toEqual(output);
  });
});

describe("createBiDiStreamingFn()", () => {
  it("works as expected on the happy path", async () => {
    const values = [123, 456, 789];

    const input = createAsyncIterable(
      values.map((value) => new Int32Value({ value }))
    );

    let bidiIndex = 0;
    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        bidiStream: async function* (input: AsyncIterable<Int32Value>) {

          for await (const thing of input) {
            expect(thing.value).toBe(values[bidiIndex]);
            bidiIndex += 1;
            yield new StringValue({ value: thing.value.toString() });
          }
        },
      });
    });
    const fn = createBiDiStreamingFn(
      transport,
      TestService,
      TestService.methods.bidiStream
    );

    let index = 0;
    for await (const res of fn(input)) {
      expect(res).toEqual(new StringValue({ value: values[index].toString() }));
      index += 1;
    }
    expect(index).toBe(3);
    expect(bidiIndex).toBe(3);
  });
});
