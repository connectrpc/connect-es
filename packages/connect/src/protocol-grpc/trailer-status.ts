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

import { Any } from "@bufbuild/protobuf";
import { Status } from "./gen/status_pb.js";
import { ConnectError } from "../connect-error.js";
import { decodeBinaryHeader, encodeBinaryHeader } from "../http-headers.js";
import { Code } from "../code.js";
import {
  headerGrpcMessage,
  headerGrpcStatus,
  headerStatusDetailsBin,
} from "./headers.js";

/**
 * The value of the Grpc-Status header or trailer in case of success.
 * Used by the gRPC and gRPC-web protocols.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const grpcStatusOk = "0";

/**
 * Sets the fields "grpc-status" and "grpc-message" in the given
 * Headers object.
 * If an error is given and contains error details, the function
 * will also set the field "grpc-status-details-bin" with an encoded
 * google.rpc.Status message including the error details.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function setTrailerStatus(
  target: Headers,
  error: ConnectError | undefined,
): Headers {
  if (error) {
    target.set(headerGrpcStatus, error.code.toString(10));
    target.set(headerGrpcMessage, encodeURIComponent(error.rawMessage));
    if (error.details.length > 0) {
      const status = new Status({
        code: error.code,
        message: error.rawMessage,
        details: error.details.map((value) =>
          "getType" in value
            ? Any.pack(value)
            : new Any({
                typeUrl: `type.googleapis.com/${value.type}`,
                value: value.value,
              }),
        ),
      });
      target.set(headerStatusDetailsBin, encodeBinaryHeader(status));
    }
  } else {
    target.set(headerGrpcStatus, grpcStatusOk.toString());
  }
  return target;
}

/**
 * Find an error status in the given Headers object, which can be either
 * a trailer, or a header (as allowed for so-called trailers-only responses).
 * The field "grpc-status-details-bin" is inspected, and if not present,
 * the fields "grpc-status" and "grpc-message" are used.
 * Returns an error only if the gRPC status code is > 0.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function findTrailerError(
  headerOrTrailer: Headers,
): ConnectError | undefined {
  // TODO
  // let code: Code;
  // let message: string = "";

  // Prefer the protobuf-encoded data to the grpc-status header.
  const statusBytes = headerOrTrailer.get(headerStatusDetailsBin);
  if (statusBytes != null) {
    const status = decodeBinaryHeader(statusBytes, Status);
    if (status.code == 0) {
      return undefined;
    }
    const error = new ConnectError(
      status.message,
      status.code,
      headerOrTrailer,
    );
    error.details = status.details.map((any) => ({
      type: any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1),
      value: any.value,
    }));
    return error;
  }
  const grpcStatus = headerOrTrailer.get(headerGrpcStatus);
  if (grpcStatus != null) {
    if (grpcStatus === grpcStatusOk) {
      return undefined;
    }
    const code = parseInt(grpcStatus, 10);
    if (code in Code) {
      return new ConnectError(
        decodeURIComponent(headerOrTrailer.get(headerGrpcMessage) ?? ""),
        code,
        headerOrTrailer,
      );
    }
    return new ConnectError(
      `invalid grpc-status: ${grpcStatus}`,
      Code.Internal,
      headerOrTrailer,
    );
  }
  return undefined;
}
