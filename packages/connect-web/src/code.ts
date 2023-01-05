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

/**
 * Connect represents categories of errors as codes, and each code maps to a
 * specific HTTP status code. The codes and their semantics were chosen to
 * match gRPC. Only the codes below are valid — there are no user-defined
 * codes.
 *
 * See the specification at https://connect.build/docs/protocol#error-codes
 * for details.
 */
export enum Code {
  /**
   * Canceled, usually be the user
   */
  Canceled = 1,

  /**
   * Unknown error
   */
  Unknown = 2,

  /**
   * Argument invalid regardless of system state
   */
  InvalidArgument = 3,

  /**
   * Operation expired, may or may not have completed.
   */
  DeadlineExceeded = 4,

  /**
   * Entity not found.
   */
  NotFound = 5,

  /**
   * Entity already exists.
   */
  AlreadyExists = 6,

  /**
   * Operation not authorized.
   */
  PermissionDenied = 7,

  /**
   * Quota exhausted.
   */
  ResourceExhausted = 8,

  /**
   * Argument invalid in current system state.
   */
  FailedPrecondition = 9,

  /**
   * Operation aborted.
   */
  Aborted = 10,

  /**
   * Out of bounds, use instead of FailedPrecondition.
   */
  OutOfRange = 11,

  /**
   * Operation not implemented or disabled.
   */
  Unimplemented = 12,

  /**
   * Internal error, reserved for "serious errors".
   */
  Internal = 13,

  /**
   * Unavailable, client should back off and retry.
   */
  Unavailable = 14,

  /**
   * Unrecoverable data loss or corruption.
   */
  DataLoss = 15,

  /**
   * Request isn't authenticated.
   */
  Unauthenticated = 16,
}

export function codeFromConnectHttpStatus(httpStatus: number): Code {
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

// See https://github.com/grpc/grpc/blob/master/doc/http-grpc-status-mapping.md.
export function codeFromGrpcWebHttpStatus(httpStatus: number): Code | null {
  switch (httpStatus) {
    case 200: // Ok
      return null;
    case 400: // Bad Request
      return Code.Internal;
    case 401: // Unauthorized
      return Code.Unauthenticated;
    case 403: // Forbidden
      return Code.PermissionDenied;
    case 404: // Not Found
      return Code.Unimplemented;
    case 429: // Too Many Requests
      return Code.Unavailable;
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

/**
 * codeFromString parses the string representation of a Code in snake_case.
 * For example, the string "permission_denied" parses into Code.PermissionDenied.
 *
 * If the given string cannot be parsed, the function returns undefined.
 */
export function codeFromString(value: string): Code | undefined {
  if (!stringToCode) {
    stringToCode = {};
    for (const value of Object.values(Code)) {
      if (typeof value == "string") {
        continue;
      }
      stringToCode[codeToString(value)] = value;
    }
  }
  return stringToCode[value];
}

/**
 * codeToString returns the string representation of a Code.
 */
export function codeToString(value: Code): string {
  const name = Code[value] as string | undefined;
  if (typeof name != "string") {
    return value.toString();
  }
  return (
    name[0].toLowerCase() +
    name.substring(1).replace(/[A-Z]/g, (c) => "_" + c.toLowerCase())
  );
}

let stringToCode: Record<string, Code> | undefined;
