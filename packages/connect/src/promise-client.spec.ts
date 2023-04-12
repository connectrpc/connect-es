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

    const fakeClientStream = (
      _input: AsyncIterable<Int32Value>,
      _context: HandlerContext
    ) => Promise.resolve(output);
    const clientStream = jasmine
      .createSpy("clientStream", fakeClientStream)
      .and.callFake(fakeClientStream);

    const transport = createRouterTransport(({ service }) => {
      service(TestService, { clientStream });
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
    const called = createAsyncIterable([new Int32Value(input)]);
    expect(clientStream).toHaveBeenCalledOnceWith(
      called,
      jasmine.objectContaining({
        method: TestService.methods.clientStream,
        service: TestService,
      })
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- arguments not used for mock
    const serverStreamImpl = (_input: Int32Value, _context: HandlerContext) =>
      createAsyncIterable(output);
    const serverStream = jasmine
      .createSpy("serverStreamSpy", serverStreamImpl)
      .and.callFake(serverStreamImpl);

    const transport = createRouterTransport(({ service }) => {
      service(TestService, { serverStream });
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
    expect(serverStream).toHaveBeenCalledOnceWith(
      input,
      jasmine.objectContaining({
        method: TestService.methods.serverStream,
        service: TestService,
      })
    );
  });
});

describe("createBiDiStreamingFn()", () => {
  it("works as expected on the happy path", async () => {
    // eslint-disable-next-line @typescript-eslint/require-await
    async function* input() {
      yield new Int32Value({
        value: 1,
      });
    }

    const transport = createRouterTransport(({ service }) => {
      service(TestService, {
        bidiStream: () =>
          createAsyncIterable([new StringValue({ value: "yield 1" })]),
      });
    });
    const fn = createBiDiStreamingFn(
      transport,
      TestService,
      TestService.methods.bidiStream
    );

    for await (const res of fn(input())) {
      expect(res).toBeInstanceOf(StringValue);
      expect(res.value).toEqual("yield 1");
    }
  });
});
