// Copyright 2021-2025 The Connect Authors
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
  negotiateProtocol,
  validateUniversalHandlerOptions,
} from "./universal-handler.js";
import type {
  UniversalHandler,
  UniversalHandlerOptions,
} from "./universal-handler.js";
import type { Compression } from "./compression.js";
import { contentTypeMatcher } from "./content-type-matcher.js";
import { Headers } from "undici";
import { createServiceDesc } from "../descriptor-helper.spec.js";
import { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";

describe("validateUniversalHandlerOptions()", () => {
  it("should set defaults", () => {
    const o = validateUniversalHandlerOptions({});
    expect(o).toEqual({
      acceptCompression: [],
      compressMinBytes: 1024,
      readMaxBytes: 0xffffffff,
      writeMaxBytes: 0xffffffff,
      jsonOptions: undefined,
      binaryOptions: undefined,
      maxTimeoutMs: Number.MAX_SAFE_INTEGER,
      shutdownSignal: undefined,
      requireConnectProtocolHeader: false,
      interceptors: [],
    });
  });
  it("should accept inputs", () => {
    const fakeCompression: Compression = {
      name: "fake",
      compress: (bytes) => Promise.resolve(bytes),
      decompress: (bytes) => Promise.resolve(bytes),
    };
    const i: UniversalHandlerOptions = {
      acceptCompression: [fakeCompression],
      compressMinBytes: 444,
      readMaxBytes: 777,
      writeMaxBytes: 666,
      jsonOptions: {
        ignoreUnknownFields: true,
        alwaysEmitImplicit: true,
      },
      binaryOptions: {
        readUnknownFields: true,
        writeUnknownFields: false,
      },
      maxTimeoutMs: 888,
      shutdownSignal: new AbortController().signal,
      requireConnectProtocolHeader: true,
      interceptors: [],
    };
    const o = validateUniversalHandlerOptions(i);
    expect(o).toEqual(i);
  });
});

describe("negotiateProtocol()", () => {
  const testService = createServiceDesc({
    typeName: "TestService",
    method: {
      foo: {
        input: Int32ValueSchema,
        output: StringValueSchema,
        methodKind: "unary",
      },
      bar: {
        input: Int32ValueSchema,
        output: StringValueSchema,
        methodKind: "unary",
      },
    },
  });

  function stubHandler(o: Partial<UniversalHandler>): UniversalHandler {
    return Object.assign(
      () =>
        Promise.resolve({
          status: 200,
          header: new Headers({ "stub-handler": "1" }),
        }),
      {
        protocolNames: ["protocol-x"],
        service: testService,
        method: testService.method.foo,
        requestPath: `/${testService.typeName}/${testService.method.foo.name}`,
        allowedMethods: ["POST"],
        supportedContentType: contentTypeMatcher(/application\/x/),
        ...o,
      },
    );
  }

  it("should require at least one handler", () => {
    expect(() => negotiateProtocol([])).toThrowError(
      "[internal] at least one protocol is required",
    );
  });

  it("should require all handlers to be for the same RPC", () => {
    const foo = stubHandler({ method: testService.method.foo });
    const bar = stubHandler({ method: testService.method.bar });
    expect(() => negotiateProtocol([foo, bar])).toThrowError(
      "[internal] cannot negotiate protocol for different RPCs",
    );
  });

  it("should require all handlers to have the same request path", () => {
    const a = stubHandler({ requestPath: `/a` });
    const b = stubHandler({ requestPath: `/b` });
    expect(() => negotiateProtocol([a, b])).toThrowError(
      "[internal] cannot negotiate protocol for different requestPaths",
    );
  });

  it("should merge protocolNames", () => {
    const h = negotiateProtocol([
      stubHandler({ protocolNames: ["x"] }),
      stubHandler({ protocolNames: ["y", "z"] }),
    ]);
    expect(h.protocolNames).toEqual(["x", "y", "z"]);
  });

  it("should merge allowedMethods", () => {
    const h = negotiateProtocol([
      stubHandler({ allowedMethods: ["POST", "PUT"] }),
      stubHandler({ allowedMethods: ["POST", "GET"] }),
    ]);
    expect(h.allowedMethods).toEqual(["POST", "PUT", "GET"]);
  });

  describe("negotiating handler", () => {
    const h = negotiateProtocol([stubHandler({})]);
    it("should return HTTP 415 for unsupported request content-type", async () => {
      const r = await h({
        httpVersion: "1.1",
        method: "POST",
        url: "https://example.com",
        header: new Headers({ "Content-Type": "UNSUPPORTED" }),
        body: null,
        signal: new AbortController().signal,
      });
      expect(r.status).toBe(415);
    });
    it("should return HTTP 405 for matching request content-type but unsupported method", async () => {
      const r = await h({
        httpVersion: "1.1",
        method: "UNSUPPORTED",
        url: "https://example.com",
        header: new Headers({ "Content-Type": "application/x" }),
        body: null,
        signal: new AbortController().signal,
      });
      expect(r.status).toBe(405);
    });
    it("should call implementation for matching content-type and method", async () => {
      const r = await h({
        httpVersion: "1.1",
        method: "POST",
        url: "https://example.com",
        header: new Headers({ "Content-Type": "application/x" }),
        body: null,
        signal: new AbortController().signal,
      });
      expect(r.status).toBe(200);
      expect(r.header?.get("stub-handler")).toBe("1");
    });
    it("should call implementation for matching method if no content-type is set", async () => {
      const r = await h({
        httpVersion: "1.1",
        method: "POST",
        url: "https://example.com",
        header: new Headers(),
        body: null,
        signal: new AbortController().signal,
      });
      expect(r.status).toBe(200);
      expect(r.header?.get("stub-handler")).toBe("1");
    });

    describe("for bidi stream", () => {
      const h = negotiateProtocol([
        stubHandler({
          method: {
            ...testService.method.foo,
            methodKind: "bidi_streaming",
          },
        }),
      ]);
      it("should return HTTP 505 for HTTP 1.1", async () => {
        const r = await h({
          httpVersion: "1.1",
          method: "POST",
          url: "https://example.com",
          header: new Headers({ "Content-Type": "application/x" }),
          body: null,
          signal: new AbortController().signal,
        });
        expect(r.status).toBe(505);
        expect(r.header?.get("Connection")).toBe("close");
        expect(r.body).toBeUndefined();
      });
      it("should require HTTP/2", async () => {
        const r = await h({
          httpVersion: "2",
          method: "POST",
          url: "https://example.com",
          header: new Headers({ "Content-Type": "application/x" }),
          body: null,
          signal: new AbortController().signal,
        });
        expect(r.status).toBe(200);
        expect(r.header?.get("stub-handler")).toBe("1");
      });
    });
  });
});
