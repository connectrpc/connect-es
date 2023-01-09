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

import { codeFromHttpStatus } from "./code-from-http-status.js";
import { parseContentType } from "./parse-content-type.js";
import { ConnectError } from "../connect-error.js";
import { findTrailerError } from "./trailer-status.js";
import { Code } from "../code.js";

/**
 * Validates response status and header for the gRPC protocol.
 * Throws a ConnectError if the header contains an error status,
 * the HTTP status indicates an error, or if the content type is
 * unexpected.
 */
export function validateResponse(
  useBinaryFormat: boolean,
  status: number,
  headers: Headers
): void {
  const code = codeFromHttpStatus(status);
  if (code != null) {
    throw new ConnectError(
      decodeURIComponent(headers.get("grpc-message") ?? `HTTP ${status}`),
      code
    );
  }
  const mimeType = headers.get("Content-Type");
  const parsedType = parseContentType(mimeType);
  if (!parsedType || parsedType.binary != useBinaryFormat) {
    throw new ConnectError(
      `unexpected response content type ${mimeType ?? "?"}`,
      Code.Internal
    );
  }
  const err = findTrailerError(headers);
  if (err) {
    throw err;
  }
}
