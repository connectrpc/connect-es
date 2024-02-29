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

import { codeFromHttpStatus } from "./http-status.js";
import { ConnectError } from "../connect-error.js";
import { findTrailerError } from "./trailer-status.js";
import { Code } from "../code.js";
import { headerEncoding, headerGrpcStatus } from "./headers.js";
import type { Compression } from "../protocol/compression.js";

/**
 * Validates response status and header for the gRPC protocol.
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
  if (status != 200) {
    throw new ConnectError(
      `HTTP ${status}`,
      codeFromHttpStatus(status),
      headers,
    );
  }
  const err = findTrailerError(headers);
  if (err) {
    throw err;
  }
  return { foundStatus: headers.has(headerGrpcStatus) };
}

/**
 * Validates response status and header for the gRPC protocol.
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
        Code.Internal,
        headers,
      );
    }
  }
  return {
    foundStatus,
    compression,
  };
}
