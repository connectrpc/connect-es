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
import { parseContentType } from "./content-type.js";
import type { Compression } from "../protocol/index.js";
import { codeFromHttpStatus } from "../protocol-grpc/index.js";
import { findTrailerError } from "../protocol-grpc/index.js";
import {
  headerContentType,
  headerEncoding,
  headerGrpcMessage,
  headerGrpcStatus,
} from "./headers.js";

/**
 * Validates response status and header for the gRPC-web protocol.
 *
 * Throws a ConnectError if the header contains an error status,
 * the HTTP status indicates an error, or if the content type is
 * unexpected.
 *
 * Returns an object that indicates whether a gRPC status was found
 * in the response header. In this case, clients can not expect a
 * trailer.
 *
 * @private
 */
export function validateResponse(
  useBinaryFormat: boolean,
  status: number,
  headers: Headers
): { foundStatus: boolean } {
  const code = codeFromHttpStatus(status);
  if (code != null) {
    throw new ConnectError(
      decodeURIComponent(headers.get(headerGrpcMessage) ?? `HTTP ${status}`),
      code
    );
  }
  const mimeType = headers.get(headerContentType);
  const parsedType = parseContentType(mimeType);
  if (!parsedType || parsedType.binary != useBinaryFormat) {
    throw new ConnectError(
      `unexpected response content type ${mimeType ?? "?"}`,
      Code.Internal
    );
  }
  if (parsedType.text) {
    throw new ConnectError(
      "grpc-web-text is not supported",
      Code.InvalidArgument
    );
  }
  const err = findTrailerError(headers);
  if (err) {
    throw err;
  }
  return { foundStatus: headers.has(headerGrpcStatus) };
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
 * @private
 */
export function validateResponseWithCompression(
  useBinaryFormat: boolean,
  acceptCompression: Compression[],
  status: number,
  headers: Headers
): { foundStatus: boolean; compression: Compression | undefined } {
  const { foundStatus } = validateResponse(useBinaryFormat, status, headers);
  let compression: Compression | undefined;
  const encoding = headers.get(headerEncoding);
  if (encoding !== null && encoding.toLowerCase() !== "identity") {
    compression = acceptCompression.find((c) => c.name === encoding);
    if (!compression) {
      throw new ConnectError(
        `unsupported response encoding "${encoding}"`,
        Code.InvalidArgument
      );
    }
  }
  return {
    foundStatus,
    compression,
  };
}
