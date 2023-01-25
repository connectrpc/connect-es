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
 * A minimal abstraction of an HTTP client.
 */
export type UniversalClientFn = (
  request: UniversalClientRequest
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
  request: UniversalRequest
) => UniversalResponse | Promise<UniversalResponse>;

/**
 * A minimal abstraction of an HTTP request on the server side.
 */
export interface UniversalRequest {
  httpVersion: string;
  method: string;
  header: Headers;
  body: AsyncIterable<Uint8Array>;
}

/**
 * A minimal abstraction of an HTTP response on the server side.
 */
export interface UniversalResponse {
  status: number;
  header?: Headers;
  body?: AsyncIterable<Uint8Array> | Uint8Array;
  trailer?: Headers;
}

/**
 * HTTP 200 OK
 */
export const uResponseOk: Readonly<UniversalResponse> = {
  status: 200,
};
/**
 * HTTP 404 Not Found
 */
export const uResponseNotFound: Readonly<UniversalResponse> = {
  status: 404,
};
/**
 * HTTP 415 Unsupported Media Type
 */
export const uResponseUnsupportedMediaType: Readonly<UniversalResponse> = {
  status: 415,
};
/**
 * HTTP 405 Method Not Allowed
 */
export const uResponseMethodNotAllowed: Readonly<UniversalResponse> = {
  status: 405,
};
/**
 * HTTP 505 Version Not Supported
 */
export const uResponseVersionNotSupported: Readonly<UniversalResponse> = {
  status: 505,
};
