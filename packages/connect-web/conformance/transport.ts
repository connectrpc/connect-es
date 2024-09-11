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
  createConnectTransport,
  createGrpcWebTransport,
} from "../src/index.js";
import {
  BidiStreamRequestSchema,
  ClientStreamRequestSchema,
  Codec,
  Compression as ConformanceCompression,
  HTTPVersion,
  IdempotentUnaryRequestSchema,
  Protocol,
  ServerStreamRequestSchema,
  UnaryRequestSchema,
} from "@connectrpc/connect-conformance";
import type { ClientCompatRequest } from "@connectrpc/connect-conformance";

/**
 * Configure a transport for a client from @connectrpc/connect-web under test.
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

  switch (req.httpVersion) {
    case HTTPVersion.HTTP_VERSION_1:
    case HTTPVersion.HTTP_VERSION_2:
      break;
    case HTTPVersion.HTTP_VERSION_3:
      // We can't enforce this but conformance runner expects test to be run on H/3 but advertises H/1 and H/2
      //
      // TODO: Once it is fixed in conformance runner, we should remove this check.
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }

  switch (req.compression) {
    case ConformanceCompression.GZIP:
    case ConformanceCompression.BR:
    case ConformanceCompression.DEFLATE:
    case ConformanceCompression.SNAPPY:
    case ConformanceCompression.ZSTD:
      throw new Error("Unsupported compression");
    case ConformanceCompression.UNSPECIFIED:
    case ConformanceCompression.IDENTITY:
      break;
  }

  const sharedOptions = {
    baseUrl,
    useBinaryFormat: req.codec === Codec.PROTO,
    defaultTimeoutMs: req.timeoutMs,
    jsonOptions: {
      registry: createRegistry(
        UnaryRequestSchema,
        ServerStreamRequestSchema,
        ClientStreamRequestSchema,
        BidiStreamRequestSchema,
        IdempotentUnaryRequestSchema,
      ),
    },
  } satisfies
    | Parameters<typeof createConnectTransport>[0]
    | Parameters<typeof createGrpcWebTransport>[0];
  switch (req.protocol) {
    case Protocol.CONNECT:
      return createConnectTransport({
        ...sharedOptions,
        useHttpGet: req.useGetHttpMethod,
      });

    case Protocol.GRPC_WEB:
      return createGrpcWebTransport({ ...sharedOptions });
    case Protocol.GRPC:
      throw new Error("GRPC is not supported");
    default:
      throw new Error("Unknown protocol");
  }
}
