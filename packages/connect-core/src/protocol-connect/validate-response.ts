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
import { Code } from "../code.js";
import { parseContentType } from "./parse-content-type.js";
import { codeFromHttpStatus } from "./http-status.js";
import { ConnectError } from "../connect-error.js";
import type { Compression } from "../compression.js";
import { headerUnaryEncoding, headerStreamEncoding } from "./headers.js";

/**
 * Validates response status and header for the Connect protocol.
 * Throws a ConnectError if the header indicates an error, or if
 * the content type is unexpected.
 */
export function validateResponse(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  status: number,
  headers: Headers
): { isConnectUnaryError: boolean } {
  const mimeType = headers.get("Content-Type");
  const parsedType = parseContentType(mimeType);
  if (status !== 200) {
    if (!parsedType) {
      throw new ConnectError(`HTTP ${status}`, codeFromHttpStatus(status));
    }
    if (
      methodKind == MethodKind.Unary &&
      !parsedType.stream &&
      !parsedType.binary
    ) {
      return { isConnectUnaryError: true };
    }
  }
  const isStream = methodKind != MethodKind.Unary;
  if (
    !parsedType ||
    parsedType.binary != useBinaryFormat ||
    parsedType.stream != isStream
  ) {
    throw new ConnectError(
      `unexpected response content type "${mimeType ?? "?"}"`,
      Code.Internal
    );
  }
  return { isConnectUnaryError: false };
}

/**
 * Validates response status and header for the Connect protocol.
 * This function is identical to validateResponse(), but also verifies
 * that a given encoding header is acceptable.
 */
export function validateResponseWithCompression(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  acceptCompression: Compression[],
  status: number,
  headers: Headers
): { compression: Compression | undefined; isConnectUnaryError: boolean } {
  let compression: Compression | undefined;
  const encoding = headers.get(
    methodKind == MethodKind.Unary ? headerUnaryEncoding : headerStreamEncoding
  );
  if (encoding != null && encoding.toLowerCase() !== "identity") {
    compression = acceptCompression.find((c) => c.name === encoding);
    if (!compression) {
      throw new ConnectError(
        `unsupported response encoding "${encoding}"`,
        Code.InvalidArgument
      );
    }
  }
  return {
    compression,
    ...validateResponse(methodKind, useBinaryFormat, status, headers),
  };
}
