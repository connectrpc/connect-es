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

import {
  headerAcceptEncoding,
  headerContentType,
  headerEncoding,
  headerTimeout,
  headerUserAgent,
} from "./headers.js";
import { contentTypeJson, contentTypeProto } from "./content-type.js";
import type { Compression } from "../protocol/compression.js";

/**
 * Creates headers for a gRPC request.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function requestHeader(
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
): Headers {
  const result = new Headers(userProvidedHeaders);
  result.set(
    headerContentType,
    useBinaryFormat ? contentTypeProto : contentTypeJson,
  );

  if (timeoutMs !== undefined) {
    result.set(headerTimeout, `${timeoutMs}m`);
  }

  // The gRPC-HTTP2 specification requires this - it flushes out proxies that
  // don't support HTTP trailers.
  result.set("Te", "trailers");
  return result;
}

/**
 * Creates headers for a gRPC request with compression.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function requestHeaderWithCompression(
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
  acceptCompression: Compression[],
  sendCompression: Compression | null,
): Headers {
  const result = requestHeader(useBinaryFormat, timeoutMs, userProvidedHeaders);
  if (sendCompression != null) {
    result.set(headerEncoding, sendCompression.name);
  }
  if (acceptCompression.length > 0) {
    result.set(
      headerAcceptEncoding,
      acceptCompression.map((c) => c.name).join(","),
    );
  }
  return result;
}
