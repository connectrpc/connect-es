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

import {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  MethodInfo,
  MethodKind,
  ServiceType,
} from "@bufbuild/protobuf";
import type { ImplSpec } from "./implementation.js";
import type { Compression, ContentTypeMatcher } from "@bufbuild/connect-core";
import type { UniversalHandlerFn } from "./private/universal.js";
import {
  UniversalServerRequest,
  uResponseMethodNotAllowed,
  uResponseUnsupportedMediaType,
  uResponseVersionNotSupported,
} from "./private/universal.js";
import { contentTypeMatcher, createMethodUrl } from "@bufbuild/connect-core";
import { createImplSpec, MethodImpl } from "./implementation.js";

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
   * A matcher for Content-Type header values that this procedure supports.
   */
  supportedContentType: ContentTypeMatcher;
}

/**
 * Takes an RPC definition and an RPC implementation, and returns a universal
 * HTTP handler that implements the given protocols.
 */
export function createUniversalHandler<M extends MethodInfo>(
  service: ServiceType,
  method: M,
  impl: MethodImpl<M>,
  protocols: ProtocolHandlerFact[]
): UniversalHandler {
  const spec = createImplSpec(service, method, impl);
  return negotiateProtocol(
    service,
    method,
    protocols.map((fact) => fact(spec))
  );
}

/**
 * Create a universal handler that negotiates the protocol.
 *
 * This functions takes one or more handlers - all for the same RPC, but for
 * different protocols - and returns a single handler that looks at the
 * Content-Type header and the HTTP verb of the incoming request to select
 * the appropriate protocol-specific handler.
 */
function negotiateProtocol(
  service: ServiceType,
  method: MethodInfo,
  protocolHandlers: UniversalHandler[]
): UniversalHandler {
  function protocolNegotiatingHandler(request: UniversalServerRequest) {
    if (
      method.kind == MethodKind.BiDiStreaming &&
      request.httpVersion.startsWith("1.")
    ) {
      return {
        ...uResponseVersionNotSupported,
        // Clients coded to expect full-duplex connections may hang if they've
        // mistakenly negotiated HTTP/1.1. To unblock them, we must close the
        // underlying TCP connection.
        header: new Headers({ Connection: "close" }),
      };
    }
    const contentType = request.header.get("Content-Type") ?? "";
    const firstMatch = protocolHandlers
      .filter(
        (h) =>
          h.supportedContentType(contentType) &&
          h.allowedMethods.includes(request.method)
      )
      .shift();
    if (firstMatch) {
      return firstMatch(request);
    }
    const contentTypeMatches = protocolHandlers.some((h) =>
      h.supportedContentType(contentType)
    );
    if (!contentTypeMatches) {
      return uResponseUnsupportedMediaType;
    }
    const methodMatches = protocolHandlers.some((h) =>
      h.allowedMethods.includes(request.method)
    );
    if (!methodMatches) {
      return uResponseMethodNotAllowed;
    }
    return uResponseUnsupportedMediaType;
  }

  return Object.assign(protocolNegotiatingHandler, {
    service,
    method,
    // we expect all protocols to be served under the same path
    requestPath: createMethodUrl("/", service, method),
    supportedContentType: contentTypeMatcher(
      ...protocolHandlers.map((h) => h.supportedContentType)
    ),
    protocolNames: protocolHandlers
      .flatMap((h) => h.protocolNames)
      .filter((value, index, array) => array.indexOf(value) === index),
    allowedMethods: protocolHandlers
      .flatMap((h) => h.allowedMethods)
      .filter((value, index, array) => array.indexOf(value) === index),
  });
}
