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
import { headerAcceptEncoding, headerEncoding } from "./headers.js";

/**
 * Creates headers for a gRPC request.
 */
export function createRequestHeader(
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined
): Headers {
  const result = new Headers(userProvidedHeaders ?? {});
  const type = useBinaryFormat ? "proto" : "json";
  // We provide the most explicit description for our content type.
  result.set("Content-Type", `application/grpc+${type}`);
  // Note that we do not comply with recommended structure for the
  // user-agent string.
  // https://github.com/grpc/grpc/blob/c462bb8d485fc1434ecfae438823ca8d14cf3154/doc/PROTOCOL-HTTP2.md#user-agents
  result.set("X-User-Agent", "@bufbuild/connect-web");
  if (timeoutMs !== undefined) {
    result.set("Grpc-Timeout", `${timeoutMs}m`);
  }
  // The gRPC-HTTP2 specification requires this - it flushes out proxies that
  // don't support HTTP trailers.
  result.set("Te", "trailers");
  return result;
}

/**
 * Creates headers for a gRPC request with compression.
 */
export function createRequestHeaderWithCompression(
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
  acceptCompression: string[],
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
    result.set(headerAcceptEncoding, acceptCompression.join(","));
  }
  return result;
}
