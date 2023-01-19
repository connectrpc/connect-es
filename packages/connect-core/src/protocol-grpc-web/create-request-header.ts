// Copyright 2021-2023 Buf Technologies, Inc.
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

import type { Compression } from "../compression.js";
import {
  headerAcceptEncoding,
  headerContentType,
  headerEncoding,
  headerTimeout,
  headerUserAgent,
} from "./headers.js";
import { contentTypeJson, contentTypeProto } from "./content-type.js";

/**
 * Creates headers for a gRPC-web request.
 */
export function createRequestHeader(
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined
): Headers {
  const result = new Headers(userProvidedHeaders ?? {});
  // Note that we do not support the grpc-web-text format.
  // https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md#protocol-differences-vs-grpc-over-http2
  result.set(
    headerContentType,
    useBinaryFormat ? contentTypeProto : contentTypeJson
  );
  // Some servers may rely on the request header `X-Grpc-Web` to identify
  // gRPC-web requests. For example the proxy by improbable:
  // https://github.com/improbable-eng/grpc-web/blob/53aaf4cdc0fede7103c1b06f0cfc560c003a5c41/go/grpcweb/wrapper.go#L231
  result.set("X-Grpc-Web", "1");
  // Note that we do not comply with recommended structure for the
  // user-agent string.
  // https://github.com/grpc/grpc/blob/c462bb8d485fc1434ecfae438823ca8d14cf3154/doc/PROTOCOL-HTTP2.md#user-agents
  result.set(headerUserAgent, "@bufbuild/connect-web");
  if (timeoutMs !== undefined) {
    result.set(headerTimeout, `${timeoutMs}m`);
  }
  return result;
}

/**
 * Creates headers for a gRPC-web request with compression.
 */
export function createRequestHeaderWithCompression(
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
  acceptCompression: Compression[],
  sendCompression: Compression | undefined
): Headers {
  const result = createRequestHeader(
    useBinaryFormat,
    timeoutMs,
    userProvidedHeaders
  );
  if (sendCompression !== undefined) {
    result.set(headerEncoding, sendCompression.name);
  }
  if (acceptCompression.length > 0) {
    result.set(
      headerAcceptEncoding,
      acceptCompression.map((c) => c.name).join(",")
    );
  }
  return result;
}
