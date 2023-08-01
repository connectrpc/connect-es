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

import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import {
  headerEncoding,
  headerGrpcMessage,
  headerGrpcStatus,
} from "./headers.js";
import { codeFromHttpStatus } from "../protocol-grpc/http-status.js";
import { findTrailerError } from "../protocol-grpc/trailer-status.js";
import type { Compression } from "../protocol/compression.js";

/**
 * Validates response status and header for the gRPC-web protocol.
 *
 * Throws a ConnectError if the header contains an error status,
 * or if the HTTP status indicates an error.
 *
 * Returns an object that indicates whether a gRPC status was found
 * in the response header. In this case, clients can not expect a
 * trailer.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function validateResponse(
  status: number,
  headers: Headers,
): { foundStatus: boolean } {
  // For compatibility with the `grpc-web` package, we treat all HTTP status
  // codes in the 200 range as valid, not just HTTP 200.
  if (status >= 200 && status < 300) {
    const err = findTrailerError(headers);
    if (err) {
      throw err;
    }
    return { foundStatus: headers.has(headerGrpcStatus) };
  }
  throw new ConnectError(
    decodeURIComponent(headers.get(headerGrpcMessage) ?? `HTTP ${status}`),
    codeFromHttpStatus(status),
    headers,
  );
}

/**
 * Validates response status and header for the gRPC-web protocol.
 * This function is identical to validateResponse(), but also verifies
 * that a given encoding header is acceptable.
 *
 * Returns an object with the response compression, and a boolean
 * indicating whether a gRPC status was found in the response header
 * (in this case, clients can not expect a trailer).
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function validateResponseWithCompression(
  acceptCompression: Compression[],
  status: number,
  headers: Headers,
): { foundStatus: boolean; compression: Compression | undefined } {
  const { foundStatus } = validateResponse(status, headers);
  let compression: Compression | undefined;
  const encoding = headers.get(headerEncoding);
  if (encoding !== null && encoding.toLowerCase() !== "identity") {
    compression = acceptCompression.find((c) => c.name === encoding);
    if (!compression) {
      throw new ConnectError(
        `unsupported response encoding "${encoding}"`,
        Code.InvalidArgument,
        headers,
      );
    }
  }
  return {
    foundStatus,
    compression,
  };
}
