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

import { MethodKind } from "@bufbuild/protobuf";
import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";
import type { MethodImplSpec, ServiceImplSpec } from "../implementation.js";
import {
  uResponseMethodNotAllowed,
  uResponseUnsupportedMediaType,
  uResponseVersionNotSupported,
} from "./universal.js";
import type {
  UniversalHandlerFn,
  UniversalServerRequest,
} from "./universal.js";
import { contentTypeMatcher } from "./content-type-matcher.js";
import type { ContentTypeMatcher } from "./content-type-matcher.js";
import type { Compression } from "./compression.js";
import type { ProtocolHandlerFactory } from "./protocol-handler-factory.js";
import { validateReadWriteMaxBytes } from "./limit-io.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

/**
 * Common options for handlers.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export interface UniversalHandlerOptions {
  /**
   * Compression algorithms available to a server for decompressing request
   * messages, and for compressing response messages.
   */
  acceptCompression: Compression[];

  /**
   * Sets a minimum size threshold for compression: Messages that are smaller
   * than the configured minimum are sent uncompressed.
   *
   * The default value is 1 kibibyte, because the CPU cost of compressing very
   * small messages usually isn't worth the small reduction in network I/O.
   */
  compressMinBytes: number;

  /**
   * Limits the performance impact of pathologically large messages sent by the
   * client. Limits apply to each individual message, not to the stream as a
   * whole.
   *
   * The default limit is the maximum supported value of ~4GiB.
   */
  readMaxBytes: number;

  /**
   * Prevents sending messages too large for the client to handle.
   *
   * The default limit is the maximum supported value of ~4GiB.
   */
  writeMaxBytes: number;

  /**
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  maxDeadlineDurationMs: number; // TODO TCN-785
  shutdownSignal?: AbortSignal; // TODO TCN-919

  /**
   * Require requests using the Connect protocol to include the header
   * Connect-Protocol-Version. This ensures that HTTP proxies and other
   * code inspecting traffic can easily identify Connect RPC requests,
   * even if they use a common Content-Type like application/json.
   *
   * If a Connect request does not include the Connect-Protocol-Version
   * header, an error with code invalid_argument (HTTP 400) is returned.
   * This option has no effect if the client uses the gRPC or the gRPC-web
   * protocol.
   */
  requireConnectProtocolHeader: boolean;
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
 * Asserts that the options are within sane limits, and returns default values
 * where no value is provided.
 *
 * Note that this function does not set default values for `acceptCompression`.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function validateUniversalHandlerOptions(
  opt: Partial<UniversalHandlerOptions> | undefined
): UniversalHandlerOptions {
  opt ??= {};
  const acceptCompression = opt.acceptCompression
    ? [...opt.acceptCompression]
    : [];
  const requireConnectProtocolHeader =
    opt.requireConnectProtocolHeader ?? false;
  const maxDeadlineDurationMs =
    opt.maxDeadlineDurationMs ?? Number.MAX_SAFE_INTEGER;
  return {
    acceptCompression,
    ...validateReadWriteMaxBytes(
      opt.readMaxBytes,
      opt.writeMaxBytes,
      opt.compressMinBytes
    ),
    jsonOptions: opt.jsonOptions,
    binaryOptions: opt.binaryOptions,
    maxDeadlineDurationMs,
    shutdownSignal: opt.shutdownSignal,
    requireConnectProtocolHeader,
  };
}

/**
 * For the given service implementation, return a universal handler for each
 * RPC. The handler serves the given protocols.
 *
 * At least one protocol is required.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createUniversalServiceHandlers(
  spec: ServiceImplSpec,
  protocols: ProtocolHandlerFactory[]
): UniversalHandler[] {
  return Object.entries(spec.methods).map(([, implSpec]) =>
    createUniversalMethodHandler(implSpec, protocols)
  );
}

/**
 * Return a universal handler for the given RPC implementation.
 * The handler serves the given protocols.
 *
 * At least one protocol is required.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createUniversalMethodHandler(
  spec: MethodImplSpec,
  protocols: ProtocolHandlerFactory[]
): UniversalHandler {
  return negotiateProtocol(protocols.map((f) => f(spec)));
}

/**
 * Create a universal handler that negotiates the protocol.
 *
 * This functions takes one or more handlers - all for the same RPC, but for
 * different protocols - and returns a single handler that looks at the
 * Content-Type header and the HTTP verb of the incoming request to select
 * the appropriate protocol-specific handler.
 *
 * Raises an error if no protocol handlers were provided, or if they do not
 * handle exactly the same RPC.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function negotiateProtocol(
  protocolHandlers: UniversalHandler[]
): UniversalHandler {
  if (protocolHandlers.length == 0) {
    throw new ConnectError("at least one protocol is required", Code.Internal);
  }
  const service = protocolHandlers[0].service;
  const method = protocolHandlers[0].method;
  const requestPath = protocolHandlers[0].requestPath;
  if (
    protocolHandlers.some((h) => h.service !== service || h.method !== method)
  ) {
    throw new ConnectError(
      "cannot negotiate protocol for different RPCs",
      Code.Internal
    );
  }
  if (protocolHandlers.some((h) => h.requestPath !== requestPath)) {
    throw new ConnectError(
      "cannot negotiate protocol for different requestPaths",
      Code.Internal
    );
  }
  async function protocolNegotiatingHandler(request: UniversalServerRequest) {
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
    const matchingContentTypes = protocolHandlers.filter((h) =>
      h.supportedContentType(contentType)
    );
    if (matchingContentTypes.length == 0) {
      return uResponseUnsupportedMediaType;
    }
    const matchingMethod = matchingContentTypes.filter((h) =>
      h.allowedMethods.includes(request.method)
    );
    if (matchingMethod.length == 0) {
      return uResponseMethodNotAllowed;
    }
    const firstMatch = matchingMethod[0];
    return firstMatch(request);
  }

  return Object.assign(protocolNegotiatingHandler, {
    service,
    method,
    requestPath,
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
