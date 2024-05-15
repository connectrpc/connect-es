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

import { createRegistry } from "@bufbuild/protobuf";
import {
  BidiStreamRequest,
  ClientCompatRequest,
  ClientStreamRequest,
  IdempotentUnaryRequest,
  ServerStreamRequest,
  UnaryRequest,
  Codec,
  HTTPVersion,
  Protocol,
  Compression as ConformanceCompression,
} from "@connectrpc/connect-conformance";
import { createTransport as createConnectTransport } from "@connectrpc/connect/protocol-connect";
import { createTransport as createGrpcTransport } from "@connectrpc/connect/protocol-grpc";
import { createTransport as createGrpcWebTransport } from "@connectrpc/connect/protocol-grpc-web";
import { createFetchClient } from "@connectrpc/connect/protocol";
import type { Compression } from "@connectrpc/connect/protocol";
import { compressionDeflate, compressionGzip } from "./compression.js";

export function createTransport(req: ClientCompatRequest) {
  let scheme = "https://";
  if (req.serverTlsCert.length > 0) {
    scheme = "https://";
  }
  const baseUrl = `${scheme}${req.host}`;
  switch (req.httpVersion) {
    case HTTPVersion.HTTP_VERSION_1:
    case HTTPVersion.HTTP_VERSION_2:
      break;
    case HTTPVersion.HTTP_VERSION_3:
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }
  let sendCompression: Compression | null = null;
  switch (req.compression) {
    case ConformanceCompression.GZIP:
      sendCompression = compressionGzip;
      break;
    case ConformanceCompression.DEFLATE:
      sendCompression = compressionDeflate;
      break;
    case ConformanceCompression.BR:
    case ConformanceCompression.SNAPPY:
    case ConformanceCompression.ZSTD:
      throw new Error("Unsupported compression");
    case ConformanceCompression.UNSPECIFIED:
    case ConformanceCompression.IDENTITY:
      break;
  }

  if (req.clientTlsCreds !== undefined) {
    throw new Error("Client TLS is not supported");
  }

  const sharedOptions = {
    baseUrl,
    httpClient: createFetchClient(async (input, init) => {
      const res = await fetch(input, init);
      // Cloudflare decompresses the response, but retains the original content-encoding and
      // content-length headers.
      //
      // https://github.com/wintercg/fetch/issues/23
      if (res.headers.has("content-encoding")) {
        const headers = new Headers(res.headers);
        headers.delete("content-encoding");
        headers.delete("content-length");
        return new Response(res.body, { ...res, headers });
      }
      return res;
    }),
    useBinaryFormat: req.codec === Codec.PROTO,
    interceptors: [],
    acceptCompression: sendCompression !== null ? [sendCompression] : [],
    sendCompression,
    readMaxBytes: 0xffffffff,
    writeMaxBytes: 0xffffffff,
    defaultTimeoutMs: req.timeoutMs,
    compressMinBytes: -1, // To account for empty messages
    jsonOptions: {
      typeRegistry: createRegistry(
        UnaryRequest,
        ServerStreamRequest,
        ClientStreamRequest,
        BidiStreamRequest,
        IdempotentUnaryRequest,
      ),
    },
  } satisfies Parameters<typeof createConnectTransport>[0];
  switch (req.protocol) {
    case Protocol.CONNECT:
      return createConnectTransport({
        ...sharedOptions,
        useHttpGet: req.useGetHttpMethod,
      });
    case Protocol.GRPC:
      return createGrpcTransport(sharedOptions);
    case Protocol.GRPC_WEB:
      return createGrpcWebTransport(sharedOptions);
    default:
      throw new Error("Unknown protocol");
  }
}
