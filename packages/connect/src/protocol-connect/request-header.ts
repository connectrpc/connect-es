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
  headerContentType,
  headerStreamAcceptEncoding,
  headerStreamEncoding,
  headerUnaryAcceptEncoding,
  headerUnaryEncoding,
  headerTimeout,
  headerProtocolVersion,
  headerUserAgent,
} from "./headers.js";
import { protocolVersion } from "./version.js";
import {
  contentTypeStreamJson,
  contentTypeStreamProto,
  contentTypeUnaryJson,
  contentTypeUnaryProto,
} from "./content-type.js";
import type { Compression } from "../protocol/compression.js";
import type { DescMethod } from "@bufbuild/protobuf";

/**
 * Creates headers for a Connect request.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function requestHeader(
  methodKind: DescMethod["methodKind"],
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
  setUserAgent: boolean,
): Headers {
  const result = new Headers(userProvidedHeaders ?? {});
  if (timeoutMs !== undefined) {
    result.set(headerTimeout, `${timeoutMs}`);
  }
  result.set(
    headerContentType,
    methodKind == "unary"
      ? useBinaryFormat
        ? contentTypeUnaryProto
        : contentTypeUnaryJson
      : useBinaryFormat
        ? contentTypeStreamProto
        : contentTypeStreamJson,
  );
  result.set(headerProtocolVersion, protocolVersion);

  if (!result.has(headerUserAgent) && setUserAgent) {
    // Note that we do not strictly comply with gRPC user agents.
    // We use "connect-es/1.2.3" where gRPC would use "grpc-es/1.2.3".
    // See https://github.com/grpc/grpc/blob/c462bb8d485fc1434ecfae438823ca8d14cf3154/doc/PROTOCOL-HTTP2.md#user-agents
    result.set(headerUserAgent, "CONNECT_ES_USER_AGENT");
  }

  return result;
}

/**
 * Creates headers for a Connect request with compression.
 *
 * Note that we always set the Content-Encoding header for unary methods.
 * It is up to the caller to decide whether to apply compression - and remove
 * the header if compression is not used, for example because the payload is
 * too small to make compression effective.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function requestHeaderWithCompression(
  methodKind: DescMethod["methodKind"],
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
  acceptCompression: Compression[],
  sendCompression: Compression | null,
  setUserAgent: boolean,
): Headers {
  const result = requestHeader(
    methodKind,
    useBinaryFormat,
    timeoutMs,
    userProvidedHeaders,
    setUserAgent,
  );
  if (sendCompression != null) {
    const name =
      methodKind == "unary" ? headerUnaryEncoding : headerStreamEncoding;
    result.set(name, sendCompression.name);
  }
  if (acceptCompression.length > 0) {
    const name =
      methodKind == "unary"
        ? headerUnaryAcceptEncoding
        : headerStreamAcceptEncoding;
    result.set(name, acceptCompression.map((c) => c.name).join(","));
  }
  return result;
}
