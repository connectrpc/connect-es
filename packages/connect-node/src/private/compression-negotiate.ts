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

import { Code, ConnectError, Compression } from "@bufbuild/connect-core";

/**
 * @deprecated use compressionNegotiate from @bufbuild/core
 *
 * compressionNegotiate validates the request encoding and determines
 * the accepted response encoding.
 *
 * If the request encoding is not supported, the returned object contains
 * the following properties:
 * - "unsupportedError": A ConnectError that implementations must send
 *   to the client.
 * - "supportedNames": A comma-separated list of encodings that are
 *   supported. The implementation must send this value in a protocol-
 *   specific accept-encoding header.
 */
export function compressionNegotiate(
  availableCompression: Compression[],
  requestEncoding: string | null,
  acceptedResponseEncodings: string | null
): {
  requestCompression?: Compression;
  responseCompression?: Compression;
  unsupportedError?: ConnectError;
  supportedNames: string;
} {
  const supportedNames = availableCompression.map((c) => c.name).join(", ");
  let requestCompression: Compression | undefined;
  if (requestEncoding !== null && requestEncoding !== "identity") {
    requestCompression = availableCompression.find(
      (c) => c.name === requestEncoding
    );
    if (!requestCompression) {
      // To comply with https://github.com/grpc/grpc/blob/master/doc/compression.md
      // and the Connect protocol, we return code "unimplemented" and specify
      // acceptable compression(s).
      const err = new ConnectError(
        `unknown compression "${requestEncoding}": supported encodings are ${supportedNames}`,
        Code.Unimplemented
      );
      return { unsupportedError: err, supportedNames };
    }
  }
  let responseCompression: Compression | undefined;
  if (acceptedResponseEncodings === null || acceptedResponseEncodings === "") {
    // Support asymmetric compression. This logic follows
    // https://github.com/grpc/grpc/blob/master/doc/compression.md and common
    // sense.
    responseCompression = requestCompression;
  } else {
    const acceptNames = acceptedResponseEncodings
      .split(",")
      .map((n) => n.trim());
    for (const name of acceptNames) {
      responseCompression = availableCompression.find((c) => c.name === name);
      if (responseCompression) {
        break;
      }
    }
  }
  return { requestCompression, responseCompression, supportedNames };
}
