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

import type { JsonValue } from "@bufbuild/protobuf";

/**
 * A minimal abstraction of an HTTP client.
 */
export type UniversalClientFn = (
  request: UniversalClientRequest,
) => Promise<UniversalClientResponse>;

/**
 * A minimal abstraction of an HTTP request on the client side.
 */
export interface UniversalClientRequest {
  url: string;
  method: string;
  header: Headers;
  body?: AsyncIterable<Uint8Array>;
  signal?: AbortSignal;
}

/**
 * A minimal abstraction of an HTTP request on the client side.
 */
export interface UniversalClientResponse {
  status: number;
  header: Headers;
  body: AsyncIterable<Uint8Array>;
  trailer: Headers;
}

/**
 * A minimal abstraction of an HTTP handler.
 */
export type UniversalHandlerFn = (
  request: UniversalServerRequest,
) => Promise<UniversalServerResponse>;

/**
 * A minimal abstraction of an HTTP request on the server side.
 */
export interface UniversalServerRequest {
  httpVersion: string;
  url: string;
  method: string;
  header: Headers;
  /**
   * Many server frameworks parse request bodies with the mime type
   * application/json automatically. We accept a JSON value as an
   * alternative to a byte stream here so that this situation can be
   * handled efficiently.
   */
  body: AsyncIterable<Uint8Array> | JsonValue;
  signal: AbortSignal;
}

/**
 * A minimal abstraction of an HTTP response on the server side.
 */
export interface UniversalServerResponse {
  status: number;
  header?: Headers;
  body?: AsyncIterable<Uint8Array>;
  trailer?: Headers;
}

/**
 * Assert that the given UniversalServerRequest has a byte stream body, not
 * a JSON value.
 *
 * We accept a JSON object or a byte stream in server requests.
 * In practice, only Connect unary handlers will receive a parse
 * JSON object. Other call-sites can use this assertion to narrow
 * the union type. A failure in such a call-sites indicates that
 * the contract between a server framework and the connect-node \
 * handler is broken.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function assertByteStreamRequest(
  req: UniversalServerRequest,
): asserts req is Omit<UniversalServerRequest, "body"> & {
  body: AsyncIterable<Uint8Array>;
} {
  if (
    typeof req.body == "object" &&
    req.body !== null &&
    Symbol.asyncIterator in req.body
  ) {
    return;
  }
  throw new Error("byte stream required, but received JSON");
}

/**
 * HTTP 200 OK
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const uResponseOk: Readonly<UniversalServerResponse> = {
  status: 200,
};
/**
 * HTTP 404 Not Found
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const uResponseNotFound: Readonly<UniversalServerResponse> = {
  status: 404,
};
/**
 * HTTP 415 Unsupported Media Type
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const uResponseUnsupportedMediaType: Readonly<UniversalServerResponse> =
  {
    status: 415,
  };
/**
 * HTTP 405 Method Not Allowed
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const uResponseMethodNotAllowed: Readonly<UniversalServerResponse> = {
  status: 405,
};
/**
 * HTTP 505 Version Not Supported
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const uResponseVersionNotSupported: Readonly<UniversalServerResponse> = {
  status: 505,
};
