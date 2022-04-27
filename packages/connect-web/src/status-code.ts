// Copyright 2021-2022 Buf Technologies, Inc.
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
 * A Code is one of gRPC's canonical status codes. There are no user-defined
 * codes, so only the codes enumerated below are valid.
 *
 * See the specification at
 * https://github.com/grpc/grpc/blob/master/doc/statuscodes.md for detailed
 * descriptions of each code.
 */
export enum StatusCode {
  /**
   * Success
   */
  Ok = 0,

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

/**
 * Map from an HTTP status to code.
 * See https://github.com/grpc/grpc/blob/master/doc/http-grpc-status-mapping.md.
 */
export function codeFromHttpStatus(httpStatus: number): StatusCode {
  switch (httpStatus) {
    case 200:
      return StatusCode.Ok;
    case 400:
      return StatusCode.Internal;
    case 401:
      return StatusCode.Unauthenticated;
    case 403:
      return StatusCode.PermissionDenied;
    case 404:
      return StatusCode.Unimplemented;
    case 429:
      return StatusCode.Unavailable;
    case 502:
      return StatusCode.Unavailable;
    case 503:
      return StatusCode.Unavailable;
    case 504:
      return StatusCode.Unavailable;
    default:
      return StatusCode.Unknown;
  }
}
