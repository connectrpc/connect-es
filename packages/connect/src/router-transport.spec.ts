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

import {
  Int32Value,
  Message,
  MethodKind,
  proto3,
  StringValue,
} from "@bufbuild/protobuf";
import { createClient } from "./promise-client.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";
import { createRouterTransport } from "./router-transport.js";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";

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
  const client = createClient(testService, transport);
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
    const client = createClient(testService, transport);
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
  describe("on connectrpc.com", function () {
    interface SayRequest extends Message<SayRequest> {
      sentence: string;
    }
    const SayRequest = proto3.makeMessageType<SayRequest>(
      "connectrpc.eliza.v1.SayRequest",
      [
        {
          no: 1,
          name: "sentence",
          kind: "scalar",
          T: 9 /* ScalarType.STRING */,
        },
      ],
    );
    interface SayResponse extends Message<SayResponse> {
      sentence: string;
    }
    const SayResponse = proto3.makeMessageType<SayResponse>(
      "connectrpc.eliza.v1.SayResponse",
      [
        {
          no: 1,
          name: "sentence",
          kind: "scalar",
          T: 9 /* ScalarType.STRING */,
        },
      ],
    );
    const ElizaService = {
      typeName: "connectrpc.eliza.v1.ElizaService",
      methods: {
        say: {
          name: "Say",
          I: SayRequest,
          O: SayResponse,
          kind: MethodKind.Unary,
        },
      },
    } as const;

    describe("simple ELIZA mock", function () {
      const mockTransport = createRouterTransport(({ service }) => {
        service(ElizaService, {
          say: () => new SayResponse({ sentence: "I feel happy." }),
        });
      });
      it("returns mocked answer", async () => {
        const client = createClient(ElizaService, mockTransport);
        const { sentence } = await client.say({ sentence: "how do you feel?" });
        expect(sentence).toEqual("I feel happy.");
      });
    });

    describe("expecting requests", function () {
      const mockTransport = createRouterTransport(({ service }) => {
        service(ElizaService, {
          say(request) {
            expect(request.sentence).toBe("how do you feel?");
            return new SayResponse({ sentence: "I feel happy." });
          },
        });
      });
      it("expects a request", async () => {
        const client = createClient(ElizaService, mockTransport);
        const { sentence } = await client.say({ sentence: "how do you feel?" });
        expect(sentence).toEqual("I feel happy.");
      });
    });

    describe("raising errors", function () {
      const mockTransport = createRouterTransport(({ service }) => {
        const sentences: string[] = [];
        service(ElizaService, {
          say(request: SayRequest) {
            sentences.push(request.sentence);
            if (sentences.length > 3) {
              throw new ConnectError(
                "I have no words anymore.",
                Code.ResourceExhausted,
              );
            }
            return new SayResponse({
              sentence: `You said ${sentences.length} sentences.`,
            });
          },
        });
      });
      it("tests a simple client call", async () => {
        const client = createClient(ElizaService, mockTransport);
        await client.say({ sentence: "1" });
        await client.say({ sentence: "2" });
        await client.say({ sentence: "3" });
        await expectAsync(client.say({ sentence: "4" })).toBeRejectedWithError(
          /I have no words anymore/,
        );
      });
    });
  });
});
