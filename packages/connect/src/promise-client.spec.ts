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
import { stubTransport } from "./transport-stub.js";

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
  const inputLog: string[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  async function* input() {
    try {
      inputLog.push("yield 1");
      yield new Int32Value({
        value: 1,
      });
    } finally {
      inputLog.push("finally");
    }
  }

  it("works as expected on the happy path", async () => {
    const transport = stubTransport({});
    const fn = createClientStreamingFn(
      transport,
      TestService,
      TestService.methods.clientStream
    );
    const res = await fn(input());
    expect(res).toBeInstanceOf(StringValue);
    expect(inputLog).toEqual(["yield 1", "finally"]);
  });
});

describe("createServerStreamingFn()", function () {
  it("works as expected on the happy path", async () => {
    const transport = stubTransport({
      streamOutput: [null, null, null],
    });
    const fn = createServerStreamingFn(
      transport,
      TestService,
      TestService.methods.serverStream
    );
    const receivedMessages: StringValue[] = [];
    for await (const res of fn(new Int32Value({ value: 123 }))) {
      receivedMessages.push(res);
    }
    expect(receivedMessages.length).toBe(3);
  });
});

describe("createBiDiStreamingFn()", () => {
  it("works as expected on the happy path", async () => {
    const inputLog: string[] = [];

    // eslint-disable-next-line @typescript-eslint/require-await
    async function* input() {
      try {
        inputLog.push("yield 1");
        yield new Int32Value({
          value: 1,
        });
      } finally {
        inputLog.push("finally");
      }
    }

    const transport = stubTransport({});
    const fn = createBiDiStreamingFn(
      transport,
      TestService,
      TestService.methods.bidiStream
    );

    for await (const res of fn(input())) {
      expect(res).toBeInstanceOf(StringValue);
    }

    expect(inputLog).toEqual(["yield 1", "finally"]);
  });
});
