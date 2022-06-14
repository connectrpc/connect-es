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

import { TestService } from "./gen/testing/v1/test_connectweb.js";
import { ConnectError, makePromiseClient, Code } from "@bufbuild/connect-web";
import { createConnectTransport } from "@bufbuild/connect-web";
import { describeTransports } from "./util/describe-transports.js";
import { createGrpcWebTransport } from "@bufbuild/connect-web";
import { TypeRegistry } from "@bufbuild/protobuf";
import { UnaryErrorRequest } from "./gen/testing/v1/test_pb.js";

const temptestserverBaseUrl = "http://127.0.0.1:9000";

export const temptestserverTransports = {
  "gRPC-web transport": createGrpcWebTransport({
    baseUrl: temptestserverBaseUrl,
    typeRegistry: TypeRegistry.from(UnaryErrorRequest),
  }),
  "connect JSON transport": createConnectTransport({
    baseUrl: temptestserverBaseUrl,
    useBinaryFormat: false,
    typeRegistry: TypeRegistry.from(UnaryErrorRequest),
  }),
  "connect binary transport": createConnectTransport({
    baseUrl: temptestserverBaseUrl,
    useBinaryFormat: true,
    typeRegistry: TypeRegistry.from(UnaryErrorRequest),
  }),
} as const;

describeTransports(temptestserverTransports, (transport) => {
  const client = makePromiseClient(TestService, transport);
  it("unaryHappy", async () => {
    const response = await client.unaryHappy({
      value: 123,
    });
    expect(response.value).toBe("123");
  });
  it("unaryError has code and message", async () => {
    try {
      await client.unaryError({});
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      if (e instanceof ConnectError) {
        expect(e.code).toBe(Code.AlreadyExists);
        expect(e.rawMessage).toBe(
          "\t\ntest with whitespace\r\nand Unicode BMP ☺ and non-BMP 😈\t\n"
        );
      }
    }
  });
  it("unaryError has metadata", async () => {
    try {
      await client.unaryError({});
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      if (e instanceof ConnectError) {
        expect(e.metadata.get("single-value")).toBe("foo");
      }
    }
  });
  it("unaryError has details", async () => {
    try {
      await client.unaryError({});
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      if (e instanceof ConnectError) {
        expect(e.details.length).toBe(1);
        const got = e.details[0];
        expect(got).toBeInstanceOf(UnaryErrorRequest);
        if (got instanceof UnaryErrorRequest) {
          expect(got.value).toBe(123);
        }
      }
    }
  });
  it("unaryHeaders", async () => {
    let got: Headers | undefined;
    await client.unaryHeaders(
      {},
      {
        onHeader(header) {
          got = header;
        },
      }
    );
    expect(got).toBeDefined();
    if (got) {
      expect(got.get("single-value")).toBe("foo");
      expect(got.get("separate-values")).toBe("bar, baz");
      expect(got.get("joined-values")).toBe("bar, baz");
    }
  });
  it("unaryTrailers", async () => {
    let got: Headers | undefined;
    await client.unaryTrailers(
      {},
      {
        onTrailer(trailer) {
          got = trailer;
        },
      }
    );
    expect(got).toBeDefined();
    if (got) {
      expect(got.get("single-value")).toBe("foo");
      expect(got.get("separate-values")).toBe("bar, baz");
      expect(got.get("joined-values")).toBe("bar, baz");
    }
  });
  it("unaryExpectHeaders", async () => {
    await client.unaryExpectHeaders(
      {},
      {
        headers: {
          "single-value": "foo",
          "separate-values": "bar, baz",
          "joined-values": "bar, baz",
        },
      }
    );
  });
  it("unaryUnimplemented", async () => {
    try {
      await client.unaryUnimplemented({});
    } catch (e) {
      if (e instanceof ConnectError) {
        expect(e.code).toBe(Code.Unimplemented);
      } else {
        fail();
      }
    }
  });
  it("serverStreamingHappy", async () => {
    const want = ["123", "124", "125", "126", "127"];
    const got: string[] = [];
    const request = {
      value: 123,
    };
    for await (const response of await client.serverStreamingHappy(request)) {
      got.push(response.value);
    }
    expect(got).toEqual(want);
  });
  it("serverStreamingError", async () => {
    const request = {
      value: 123,
    };
    let responseMessageCount = 0;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we need const _response for for await
      for await (const _response of await client.serverStreamingError(
        request
      )) {
        responseMessageCount++;
      }
    } catch (e) {
      if (e instanceof ConnectError) {
        expect(e.code).toBe(Code.AlreadyExists);
        expect(e.rawMessage).toBe(
          "\t\ntest with whitespace\r\nand Unicode BMP ☺ and non-BMP 😈\t\n"
        );
      } else {
        fail();
      }
    }
    expect(responseMessageCount).toBe(0);
  });
  it("serverStreamingEmpty", async () => {
    const request = {
      value: 123,
    };
    let responseMessageCount = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we need const _response for for await
    for await (const _response of await client.serverStreamingEmpty(request)) {
      responseMessageCount++;
    }
    expect(responseMessageCount).toBe(0);
  });
  it("serverStreamingUnimplemented", async () => {
    try {
      await client.serverStreamingUnimplemented({});
    } catch (e) {
      if (e instanceof ConnectError) {
        expect(e.code).toBe(Code.Unimplemented);
      } else {
        fail();
      }
    }
  });
});
