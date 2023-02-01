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
import { stubTransport } from "./transport-stub.js";

describe("stubTransport()", () => {
  const TestService = {
    typeName: "handwritten.TestService",
    methods: {
      unary: {
        name: "Unary",
        I: Int32Value,
        O: StringValue,
        kind: MethodKind.Unary,
      },
      bidiStream: {
        name: "BidiStream",
        I: Int32Value,
        O: StringValue,
        kind: MethodKind.BiDiStreaming,
      },
    },
  } as const;

  const transport = stubTransport({});
  describe("unary", function () {
    it("should return default messages", async function () {
      const res = await transport.unary(
        TestService,
        TestService.methods.unary,
        undefined,
        undefined,
        undefined,
        new Int32Value()
      );
      expect(res.message).toBeInstanceOf(StringValue);
    });
  });
  describe("streaming", function () {
    it("should return singe response by default", async function () {
      // eslint-disable-next-line @typescript-eslint/require-await
      async function* input() {
        yield new Int32Value();
      }
      const res = await transport.stream(
        TestService,
        TestService.methods.bidiStream,
        undefined,
        undefined,
        undefined,
        input()
      );
      let receivedResponseMessages = 0;
      for await (const m of res.message) {
        expect(m).toBeInstanceOf(StringValue);
        receivedResponseMessages++;
      }
      expect(receivedResponseMessages).toBe(1);
    });
  });
});
