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
import { ClientCompatRequest } from "../gen/connectrpc/conformance/v1/client_compat_pb.js";
import {
  Codec,
  HTTPVersion,
  Protocol,
  Compression as ConformanceCompression,
} from "../gen/connectrpc/conformance/v1/config_pb.js";
import {
  createConnectTransport,
  createGrpcWebTransport,
} from "@connectrpc/connect-web";
import {
  BidiStreamRequest,
  ClientStreamRequest,
  ServerStreamRequest,
  UnaryRequest,
} from "../gen/connectrpc/conformance/v1/service_pb.js";

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
      throw new Error("HTTP/2 and HTTP/3 are not supported");
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
      typeRegistry: createRegistry(
        UnaryRequest,
        ServerStreamRequest,
        ClientStreamRequest,
        BidiStreamRequest
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
