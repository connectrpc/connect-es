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
  Compression as ConformanceCompression,
  Codec,
  HTTPVersion,
  Protocol,
  BidiStreamRequestSchema,
  ClientStreamRequestSchema,
  IdempotentUnaryRequestSchema,
  ServerStreamRequestSchema,
  UnaryRequestSchema,
} from "@connectrpc/connect-conformance";
import type { ClientCompatRequest } from "@connectrpc/connect-conformance";
import {
  createConnectTransport,
  createGrpcTransport,
  compressionGzip,
  compressionBrotli,
  createGrpcWebTransport,
} from "@connectrpc/connect-node";
import type { Compression } from "@connectrpc/connect/protocol";
import * as http2 from "node:http2";

/**
 * Configure a transport for a client from @connectrpc/connect-node under test.
 *
 * The conformance test runner Schemaribes the call we should make in the
 * message connectrpc.conformance.v1.ClientCompatRequest. We create a transport
 * for the call, with the corresponding protocol, HTTP version, compression, and
 * other details. If a configuration is not supported, we raise an error.
 */
export function createTransport(req: ClientCompatRequest) {
  let scheme = "http://";
  if (req.serverTlsCert.length > 0) {
    scheme = "https://";
  }
  const baseUrl = `${scheme}${req.host}:${req.port}`;

  let httpVersion: "1.1" | "2";
  switch (req.httpVersion) {
    case HTTPVersion.HTTP_VERSION_1:
      httpVersion = "1.1";
      break;
    case HTTPVersion.HTTP_VERSION_2:
      httpVersion = "2";
      break;
    case HTTPVersion.HTTP_VERSION_3:
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }

  let sendCompression: Compression | undefined = undefined;
  let acceptCompression: Compression[] = [];

  switch (req.compression) {
    case ConformanceCompression.GZIP:
      sendCompression = compressionGzip;
      acceptCompression = [compressionGzip];
      break;
    case ConformanceCompression.BR:
      sendCompression = compressionBrotli;
      acceptCompression = [compressionBrotli];
      break;
    case ConformanceCompression.DEFLATE:
    case ConformanceCompression.SNAPPY:
    case ConformanceCompression.ZSTD:
      throw new Error("Unsupported compression");
    case ConformanceCompression.UNSPECIFIED:
    case ConformanceCompression.IDENTITY:
      break;
  }

  let clientCerts: Pick<http2.SecureClientSessionOptions, "cert" | "key"> = {};
  if (req.clientTlsCreds !== undefined) {
    clientCerts = {
      key: Buffer.from(req.clientTlsCreds.key),
      cert: Buffer.from(req.clientTlsCreds.cert),
    };
  }

  const sharedOptions = {
    baseUrl,
    httpVersion,
    useBinaryFormat: req.codec === Codec.PROTO,
    sendCompression,
    acceptCompression: acceptCompression,
    defaultTimeoutMs: req.timeoutMs,
    compressMinBytes: -1, // To account for empty messages
    jsonOptions: {
      registry: createRegistry(
        UnaryRequestSchema,
        ServerStreamRequestSchema,
        ClientStreamRequestSchema,
        BidiStreamRequestSchema,
        IdempotentUnaryRequestSchema,
      ),
    },
    nodeOptions: {
      ca: Buffer.from(req.serverTlsCert),
      ...clientCerts,
    },
  } satisfies
    | Parameters<typeof createConnectTransport>[0]
    | Parameters<typeof createGrpcTransport>[0]
    | Parameters<typeof createGrpcWebTransport>[0];
  switch (req.protocol) {
    case Protocol.CONNECT:
      return createConnectTransport({
        ...sharedOptions,
        useHttpGet: req.useGetHttpMethod,
      });
    case Protocol.GRPC:
      return createGrpcTransport({ ...sharedOptions });
    case Protocol.GRPC_WEB:
      return createGrpcWebTransport({ ...sharedOptions });
    default:
      throw new Error("Unknown protocol");
  }
}
