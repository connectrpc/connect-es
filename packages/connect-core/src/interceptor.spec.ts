// Copyright 2021-2022 Buf Technologies, Inc.
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
import type { Interceptor } from "./interceptor.js";

function makeLoggingInterceptor(name: string, log: string[]): Interceptor {
  return (next) => async (req) => {
    log.push(`${name} sending request with headers: ${headerKeys(req.header)}`);
    const res = await next(req);
    if (res.stream) {
      return {
        ...res,
        responseHeader: res.responseHeader.then((h) => {
          log.push(`${name} response received with headers: ${headerKeys(h)}`);
          return h;
        }),
        responseTrailer: res.responseTrailer.then((h) => {
          log.push(
            `${name} response stream done with trailers: ${headerKeys(h)}`
          );
          return h;
        }),
        async read() {
          const r = await res.read();
          if (!r.done) {
            log.push(`${name} response stream received message`);
          }
          return r;
        },
      };
    } else {
      log.push(
        `${name} response received with headers: ${headerKeys(res.header)}`
      );
      log.push(
        `${name} response done with trailers: ${headerKeys(res.trailer)}`
      );
    }
    return res;
  };

  /**
   * Return all keys of a Headers object, without needing
   * DOM.iterable for Headers.keys().
   */
  function headerKeys(header: Headers): string {
    const keys: string[] = [];
    header.forEach((_, key) => keys.push(key));
    return keys.join(", ");
  }
}

const TestService = {
  typeName: "handwritten.TestService",
  methods: {
    unary: {
      name: "Unary",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.Unary,
    },
    serverStream: {
      name: "ServerStream",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ServerStreaming,
    },
  },
} as const;

describe("unary interceptors", () => {
  const wantLog = [
    "outer sending request with headers: unary-request-header",
    "inner sending request with headers: unary-request-header",
    "inner response received with headers: unary-response-header",
    "inner response done with trailers: unary-response-trailer",
    "outer response received with headers: unary-response-header",
    "outer response done with trailers: unary-response-trailer",
  ] as const;
  it("promise client", async () => {
    const log: string[] = [];
    const transport = stubTransport({
      interceptors: [
        makeLoggingInterceptor("outer", log),
        makeLoggingInterceptor("inner", log),
      ],
      unaryResponseHeader: new Headers({
        "unary-response-header": "foo",
      }),
      unaryResponseTrailer: new Headers({
        "unary-response-trailer": "foo",
      }),
    });

    await transport.unary(
      TestService,
      TestService.methods.unary,
      undefined,
      undefined,
      {
        "unary-request-header": "foo",
      },
      {}
    );
    expect(log).toEqual(wantLog);
  });
});

describe("stream interceptors", () => {
  const wantLog = [
    "outer sending request with headers: stream-request-header",
    "inner sending request with headers: stream-request-header",
    "inner response received with headers: stream-response-header",
    "outer response received with headers: stream-response-header",
    "inner response stream received message",
    "outer response stream received message",
    "inner response stream done with trailers: stream-response-trailer",
    "outer response stream done with trailers: stream-response-trailer",
  ] as const;
  it("promise client", async () => {
    const log: string[] = [];
    const transport = stubTransport({
      interceptors: [
        makeLoggingInterceptor("outer", log),
        makeLoggingInterceptor("inner", log),
      ],
      streamResponseHeader: new Headers({
        "stream-response-header": "foo",
      }),
      streamResponseTrailer: new Headers({
        "stream-response-trailer": "foo",
      }),
    });
    const conn = await transport.stream(
      TestService,
      TestService.methods.serverStream,
      undefined,
      undefined,
      {
        "stream-request-header": "foo",
      }
    );
    await conn.send({});
    let res = await conn.read();
    expect(res.done).toBeFalse();
    res = await conn.read();
    expect(res.done).toBeTrue();
    expect(log).toEqual(wantLog);
  });
});
