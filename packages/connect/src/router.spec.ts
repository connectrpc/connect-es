// Copyright 2021-2026 The Connect Authors
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

import { describe, it } from "node:test";
import * as assert from "node:assert";
import { createConnectRouter, type ConnectRouterOptions } from "./router.js";
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

describe("createConnectRouter", () => {
  it("supports self describing method type", () => {
    const methodDefinition = testService.method.unary;
    const router = createConnectRouter({}).rpc(methodDefinition, (request) => {
      return { value: `${request.value}-RESPONSE` };
    });

    assert.strictEqual(router.handlers.length, 1);
    assert.deepStrictEqual(router.handlers[0].method, methodDefinition);
    assert.deepStrictEqual(router.handlers[0].service, testService);
  });

  it("supports chaining after destructuring", () => {
    const router = createConnectRouter({});

    const { rpc } = router;
    rpc(testService.method.unary, (request) => {
      return { value: `${request.value}-RESPONSE` };
    }).rpc(testService.method.server, async function* (request) {
      yield { value: `${request.value}-RESPONSE` };
    });

    assert.strictEqual(router.handlers.length, 2);
    assert.deepStrictEqual(router.handlers[0].method, testService.method.unary);
    assert.deepStrictEqual(router.handlers[0].service, testService);
    assert.deepStrictEqual(
      router.handlers[1].method,
      testService.method.server,
    );
    assert.deepStrictEqual(router.handlers[1].service, testService);
  });
});

type RouterCallOptions = Partial<ConnectRouterOptions>;

function protocolNamesForRpc(
  routerOptions: Parameters<typeof createConnectRouter>[0],
  callOptions?: RouterCallOptions,
): string[] {
  const router = createConnectRouter(routerOptions);
  router.rpc(
    testService.method.unary,
    (request) => {
      return { value: `${request.value}-RESPONSE` };
    },
    // Protocol flags at call level are supported at runtime.
    callOptions as Parameters<ReturnType<typeof createConnectRouter>["rpc"]>[2],
  );
  return router.handlers[0].protocolNames;
}

function protocolNamesForService(
  routerOptions: Parameters<typeof createConnectRouter>[0],
  callOptions?: RouterCallOptions,
): string[] {
  const router = createConnectRouter(routerOptions);
  router.service(
    testService,
    {
      unary: (request) => ({ value: `${request.value}-RESPONSE` }),
    },
    callOptions as Parameters<
      ReturnType<typeof createConnectRouter>["service"]
    >[2],
  );
  return router.handlers[0].protocolNames;
}

describe("createConnectRouter protocol inheritance", () => {
  it("rpc inherits router-disabled grpc and grpc-web when only readMaxBytes is set", () => {
    assert.deepStrictEqual(
      protocolNamesForRpc({ grpc: false, grpcWeb: false }, { readMaxBytes: 2 }),
      ["connect"],
    );
  });

  it("service inherits router-disabled grpc and grpc-web when only readMaxBytes is set", () => {
    assert.deepStrictEqual(
      protocolNamesForService(
        { grpc: false, grpcWeb: false },
        { readMaxBytes: 2 },
      ),
      ["connect"],
    );
  });

  it("rpc with grpc disabled at router stays connect-only with per-call options", () => {
    assert.deepStrictEqual(
      protocolNamesForRpc({ grpc: false }, { readMaxBytes: 2 }),
      ["grpc-web", "connect"],
    );
  });

  it("rpc with grpcWeb disabled at router stays without grpc-web with per-call options", () => {
    assert.deepStrictEqual(
      protocolNamesForRpc({ grpcWeb: false }, { writeMaxBytes: 2 }),
      ["grpc", "connect"],
    );
  });

  it("rpc with connect disabled at router stays without connect with per-call options", () => {
    assert.deepStrictEqual(
      protocolNamesForRpc({ connect: false }, { compressMinBytes: 2 }),
      ["grpc", "grpc-web"],
    );
  });

  it("service with connect disabled at router stays without connect with per-call options", () => {
    assert.deepStrictEqual(
      protocolNamesForService({ connect: false }, { compressMinBytes: 2 }),
      ["grpc", "grpc-web"],
    );
  });

  it("rpc call-level true enables grpc when router disabled grpc", () => {
    assert.deepStrictEqual(
      protocolNamesForRpc(
        { grpc: false, grpcWeb: false },
        { grpc: true, readMaxBytes: 2 },
      ),
      ["grpc", "connect"],
    );
  });

  it("rpc call-level false disables grpc when router enabled grpc", () => {
    assert.deepStrictEqual(
      protocolNamesForRpc({ grpc: true }, { grpc: false, readMaxBytes: 2 }),
      ["grpc-web", "connect"],
    );
  });

  it("rpc without router options keeps all protocols with per-call readMaxBytes", () => {
    assert.deepStrictEqual(
      protocolNamesForRpc(undefined, { readMaxBytes: 2 }),
      ["grpc", "grpc-web", "connect"],
    );
  });

  it("rpc without per-call options keeps router-disabled protocols", () => {
    assert.deepStrictEqual(
      protocolNamesForRpc({ grpc: false, grpcWeb: false }),
      ["connect"],
    );
  });

  it("service without per-call options keeps router-disabled protocols", () => {
    assert.deepStrictEqual(
      protocolNamesForService({ grpc: false, grpcWeb: false }),
      ["connect"],
    );
  });
});
