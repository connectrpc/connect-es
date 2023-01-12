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

import { MethodKind } from "@bufbuild/protobuf";
import {
  headerStreamAcceptEncoding,
  headerStreamEncoding,
  headerUnaryAcceptEncoding,
  headerUnaryEncoding,
} from "./headers.js";
import { protocolVersion } from "./version.js";

/**
 * Creates headers for a Connect request.
 */
export function createRequestHeader(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined
): Headers {
  const result = new Headers(userProvidedHeaders ?? {});
  let type = "application/";
  if (methodKind != MethodKind.Unary) {
    type += "connect+";
  }
  type += useBinaryFormat ? "proto" : "json";
  result.set("Content-Type", type);
  if (timeoutMs !== undefined) {
    result.set("Connect-Timeout-Ms", `${timeoutMs}`);
  }
  result.set("Connect-Protocol-Version", protocolVersion);
  return result;
}

/**
 * Creates headers for a Connect request with compression.
 *
 * Note that we always set the Content-Encoding header for unary methods.
 * It is up to the caller to decide whether to apply compression - and remove
 * the header if compression is not used, for example because the payload is
 * too small to make compression effective.
 */

export function createRequestHeaderWithCompression(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
  acceptCompression: string[],
  sendCompression: string | undefined
): Headers {
  const result = createRequestHeader(
    methodKind,
    useBinaryFormat,
    timeoutMs,
    userProvidedHeaders
  );
  if (sendCompression != undefined) {
    const name =
      methodKind == MethodKind.Unary
        ? headerUnaryEncoding
        : headerStreamEncoding;
    result.set(name, sendCompression);
  }
  if (acceptCompression.length > 0) {
    const name =
      methodKind == MethodKind.Unary
        ? headerUnaryAcceptEncoding
        : headerStreamAcceptEncoding;
    result.set(name, acceptCompression.join(","));
  }
  return result;
}
