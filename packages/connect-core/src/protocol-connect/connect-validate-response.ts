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
import { connectParseContentType } from "./connect-parse-content-type.js";
import { connectCodeFromHttpStatus } from "./connect-code-from-http-status.js";
import { ConnectError } from "../connect-error.js";

/**
 * Validates response status and header for the Connect protocol.
 * Throws a ConnectError if the header indicates an error, or if
 * the content type is unexpected.
 */
export function connectValidateResponse(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  status: number,
  headers: Headers
): { isConnectUnaryError: boolean } {
  const mimeType = headers.get("Content-Type");
  const parsedType = connectParseContentType(mimeType);
  if (status !== 200) {
    if (!parsedType) {
      throw new ConnectError(
        `HTTP ${status}`,
        connectCodeFromHttpStatus(status)
      );
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
