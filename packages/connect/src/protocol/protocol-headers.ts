// Copyright 2021-2026 The Connect Authors
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
  headerProtocolVersion as headerConnectProtocolVersion,
  headerStreamAcceptEncoding as headerConnectStreamAcceptEncoding,
  headerStreamEncoding as headerConnectStreamEncoding,
  headerTimeout as headerConnectTimeout,
  headerUnaryAcceptEncoding,
  headerUnaryContentLength,
  headerUnaryEncoding,
  headerUnaryTrailerPrefix as headerConnectUnaryTrailerPrefix,
  headerUserAgent,
  headerHost,
  headerTrailer,
  headerDate,
} from "../protocol-connect/headers.js";
import {
  headerAcceptEncoding as headerGrpcAcceptEncoding,
  headerEncoding as headerGrpcEncoding,
  headerGrpcDetails,
  headerGrpcMessage,
  headerGrpcStatus,
  headerTimeout as headerGrpcTimeout,
} from "../protocol-grpc/headers.js";

/**
 * The set of HTTP header names that carry protocol-level information for the
 * Connect, gRPC, and gRPC-Web protocols. These are reserved by the protocol
 * implementation and are not considered user metadata.
 *
 * Mirrors protocolHeaders in connect-go. Any changes to this constant must be
 * made there first.
 *
 * @private Internal code, does not follow semantic versioning.
 */
const protocolHeaders: ReadonlySet<string> = new Set(
  [
    // HTTP headers.
    headerContentType,
    headerUnaryContentLength,
    headerUnaryEncoding,
    headerHost,
    headerUserAgent,
    headerTrailer,
    headerDate,
    // Connect headers.
    headerUnaryAcceptEncoding,
    headerConnectUnaryTrailerPrefix,
    headerConnectStreamEncoding,
    headerConnectStreamAcceptEncoding,
    headerConnectTimeout,
    headerConnectProtocolVersion,
    // gRPC headers.
    headerGrpcEncoding,
    headerGrpcAcceptEncoding,
    headerGrpcTimeout,
    headerGrpcStatus,
    headerGrpcMessage,
    headerGrpcDetails,
  ].map((name) => name.toLowerCase()),
);

/**
 * Append all headers from `from` into `into`, skipping any protocol headers
 * (see isProtocolHeader).
 *
 * Mirrors mergeNonProtocolHeaders in connect-go. Any changes to this method must be
 * made there first.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function mergeNonProtocolHeaders(into: Headers, from: Headers): void {
  from.forEach((value, key) => {
    if (!protocolHeaders.has(key.toLowerCase())) {
      into.append(key, value);
    }
  });
}
