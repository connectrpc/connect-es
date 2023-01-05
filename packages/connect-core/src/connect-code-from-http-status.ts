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

import { Code } from "./code.js";

/**
 * Determine the Connect error code for the given HTTP status code.
 * See https://connect.build/docs/protocol#error-codes
 */
export function connectCodeFromHttpStatus(httpStatus: number): Code {
  switch (httpStatus) {
    case 400: // Bad Request
      return Code.InvalidArgument;
    case 401: // Unauthorized
      return Code.Unauthenticated;
    case 403: // Forbidden
      return Code.PermissionDenied;
    case 404: // Not Found
      return Code.Unimplemented;
    case 408: // Request Timeout
      return Code.DeadlineExceeded;
    case 409: // Conflict
      return Code.Aborted;
    case 412: // Precondition Failed
      return Code.FailedPrecondition;
    case 413: // Payload Too Large
      return Code.ResourceExhausted;
    case 415: // Unsupported Media Type
      return Code.Internal;
    case 429: // Too Many Requests
      return Code.Unavailable;
    case 431: // Request Header Fields Too Large
      return Code.ResourceExhausted;
    case 502: // Bad Gateway
      return Code.Unavailable;
    case 503: // Service Unavailable
      return Code.Unavailable;
    case 504: // Gateway Timeout
      return Code.Unavailable;
    default:
      return Code.Unknown;
  }
}
