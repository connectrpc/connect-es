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

import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";
import type { ImplSpec } from "./implementation.js";
import type { Compression } from "@bufbuild/connect-core";

/**
 * Creates a handler function for an RPC definition and an RPC implementation,
 * for one specific protocol.
 */
export interface ProtocolHandlerFact {
  /**
   * Create a new handler with the user-provided implementation of the procedure.
   */
  (spec: ImplSpec): UniversalHandler;

  /**
   * The name of the protocol that the created handlers implement.
   */
  protocolName: string;
}

// TODO document
export interface ProtocolHandlerFactInit {
  acceptCompression: Compression[];
  compressMinBytes: number;
  readMaxBytes: number;
  writeMaxBytes: number;
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
  maxDeadlineDurationMs: number; // TODO TCN-785
  shutdownSignal?: AbortSignal; // TODO TCN-919
}

/**
 * An HTTP handler for one specific RPC - a procedure typically defined in
 * protobuf.
 */
export interface UniversalHandler extends UniversalHandlerFn {
  /**
   * The name of the protocols this handler implements.
   */
  protocolNames: string[];

  /**
   * Information about the related protobuf service.
   */
  service: ServiceType;

  /**
   * Information about the method of the protobuf service.
   */
  method: MethodInfo;

  /**
   * The request path of the procedure, without any prefixes.
   * For example, "/something/foo.FooService/Bar" for the method
   * "Bar" of the service "foo.FooService".
   */
  requestPath: string;

  /**
   * The HTTP request methods this procedure allows. For example, "POST".
   */
  allowedMethods: string[];

  /**
   * A regular expression that matches all Content-Type header values that this
   * procedure supports.
   */
  supportedContentType: RegExp;
}

/**
 * A minimal abstraction of an HTTP handler.
 */
export type UniversalHandlerFn = (
  request: UniversalRequest
) => UniversalResponse | Promise<UniversalResponse>;

/**
 * A minimal abstraction of an HTTP request.
 */
export interface UniversalRequest {
  httpVersion: string;
  method: string;
  header: Headers;
  body: AsyncIterable<Uint8Array>;
}

/**
 * A minimal abstraction of an HTTP response.
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
