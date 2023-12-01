// Copyright 2021-2023 The Connect Authors
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
import { ClientCompatRequest } from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import {
  Codec,
  HTTPVersion,
  Protocol,
  Compression as ConformanceCompression,
} from "./gen/connectrpc/conformance/v1/config_pb.js";
import {
  createConnectTransport,
  createGrpcTransport,
  compressionGzip,
  compressionBrotli,
  createGrpcWebTransport,
} from "@connectrpc/connect-node";
import { Compression } from "@connectrpc/connect/protocol";
import {
  BidiStreamRequest,
  ClientStreamRequest,
  ServerStreamRequest,
  UnaryRequest,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import * as http2 from "node:http2";

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

  switch (req.compression) {
    case ConformanceCompression.GZIP:
      sendCompression = compressionGzip;
      break;
    case ConformanceCompression.BR:
      sendCompression = compressionBrotli;
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
    defaultTimeoutMs: req.timeoutMs,
    compressMinBytes: -1, // To account for empty messages
    jsonOptions: {
      typeRegistry: createRegistry(
        UnaryRequest,
        ServerStreamRequest,
        ClientStreamRequest,
        BidiStreamRequest,
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
