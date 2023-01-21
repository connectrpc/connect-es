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
  Code,
  Compression,
  compressionValidateOptions,
  ConnectError,
  createMethodUrl,
} from "@bufbuild/connect-core";
import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";
import { MethodKind } from "@bufbuild/protobuf";
import { createImplSpec, MethodImpl, ServiceImpl } from "./implementation.js";
import type {
  ProtocolHandlerFact,
  ProtocolHandlerFactInit,
  UniversalRequest,
} from "./protocol-handler.js";
import {
  NodeHandler,
  universalHandlerToNodeHandler,
} from "./private/node-universal.js";
import { compressionBrotli, compressionGzip } from "./compression.js";
import { createGrpcHandlerProtocol } from "./grpc-handler.js";
import { createGrpcWebProtocolHandler } from "./grpc-web-handler.js";
import { createConnectProtocolHandler } from "./connect-handler.js";
import {
  uResponseMethodNotAllowed,
  uResponseNotFound,
  uResponseUnsupportedMediaType,
  uResponseVersionNotSupported,
} from "./protocol-handler.js";

/**
 * Handler handles a Node.js request for one specific RPC - a procedure
 * typically defined in protobuf.
 *
 * That this function is compatible with http.RequestListener and its
 * equivalent for http2.
 */
export type Handler = NodeHandler & {
  /**
   * The names of the protocols this handler implements.
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
   * The HTTP request methods this handler allows. For example, "POST".
   * Note that a specific protocol may only support some verbs.
   */
  allowedMethods: string[];

  /**
   * A regular expression that matches all Content-Type header values that this
   * procedure supports.
   */
  supportedContentType: RegExp[];
};

/**
 * Options for creating a Handler. By default, all available protocols are
 * enabled.
 */
interface HandlerOptions {
  // TODO document
  grpc?: boolean;
  grpcWeb?: boolean;
  connect?: boolean;
  acceptCompression?: Compression[];
  compressMinBytes?: number;
  readMaxBytes?: number;
  writeMaxBytes?: number;
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
  maxDeadlineDurationMs?: number; // TODO TCN-785
  shutdownSignal?: AbortSignal; // TODO TCN-919
  requireConnectProtocolHeader?: boolean;
}

/**
 * createHandlers() takes a service definition and a service implementation,
 * and returns an array of Handler functions, one for each RPC.
 */
export function createHandlers<T extends ServiceType>(
  service: T,
  implementation: ServiceImpl<T>,
  options?: HandlerOptions
): Handler[] {
  const normalOptions = internalHandlerOptions(options);
  return Object.entries(service.methods).map(([name, method]) => {
    const i = implementation[name].bind(implementation);
    return createHandler(service, method, i, normalOptions);
  });
}

/**
 * createHandler() takes an RPC definition and an RPC implementation, and
 * returns a Handler function.
 */
export function createHandler<M extends MethodInfo>(
  service: ServiceType,
  method: M,
  impl: MethodImpl<M>,
  options?: HandlerOptions
): Handler {
  const spec = createImplSpec(service, method, impl);
  const opt = internalHandlerOptions(options);
  const handlers = opt.protocols.map((fact) => fact(spec));

  function protocolNegotiatingHandler(request: UniversalRequest) {
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
    const firstMatch = handlers
      .filter(
        (h) =>
          h.supportedContentType.test(contentType) &&
          h.allowedMethods.includes(request.method)
      )
      .shift();
    if (firstMatch) {
      return firstMatch(request);
    }
    const contentTypeMatches = handlers.some((h) =>
      h.supportedContentType.test(contentType)
    );
    if (!contentTypeMatches) {
      return uResponseUnsupportedMediaType;
    }
    const methodMatches = handlers.some((h) =>
      h.allowedMethods.includes(request.method)
    );
    if (!methodMatches) {
      return uResponseMethodNotAllowed;
    }
    return uResponseUnsupportedMediaType;
  }

  const nodeHandler = universalHandlerToNodeHandler(
    protocolNegotiatingHandler,
    (reason) => {
      // TODO(TCN-785)
      // eslint-disable-next-line no-console
      console.error("protocol handle failed", reason);
    }
  );

  return Object.assign(nodeHandler, {
    service,
    method,
    // we expect all protocols to be served under the same path
    requestPath: createMethodUrl("/", service, method),
    supportedContentType: handlers.map((h) => h.supportedContentType),
    protocolNames: handlers
      .flatMap((h) => h.protocolNames)
      .filter((value, index, array) => array.indexOf(value) === index),
    allowedMethods: handlers
      .flatMap((h) => h.allowedMethods)
      .filter((value, index, array) => array.indexOf(value) === index),
  });
}

/**
 * mergeHandlers() takes an array of Handler functions, and merges them into a
 * single handler function that invokes the correct handler by its request
 * path. If no request path matches, it serves a 404.
 */
export function mergeHandlers(
  handlers: Handler[],
  options?: MergeHandlersOptions
): NodeHandler {
  const prefix = options?.requestPathPrefix ?? "";
  const fallback =
    options?.fallback ??
    ((request, response) => {
      response.writeHead(uResponseNotFound.status);
      response.end();
    });
  return function handleByRequestPath(request, response) {
    const handler = handlers.find(
      (h) => request.url === prefix + h.requestPath
    );
    if (!handler) {
      return fallback(request, response);
    }
    handler(request, response);
  };
}

/**
 * Options to the function mergeHandlers().
 */
interface MergeHandlersOptions {
  /**
   * Serve all handlers under this prefix. For example, the prefix "/something"
   * will serve the RPC foo.FooService/Bar under "/something/foo.FooService/Bar".
   * Note that many gRPC client implementations do not allow for prefixes.
   */
  requestPathPrefix?: string;
  /**
   * If none of the handler request paths match, a 404 is served. This option
   * can provide a custom fallback for this case.
   */
  fallback?: NodeHandler;
}

/**
 * Turns HandlerOptions - the options accepted by the public API when a user
 * creates a handler - into the internal type.
 * The function validates the options and sets defaults.
 */
function internalHandlerOptions(
  init?: HandlerOptions | InternalHandlerOptions
): InternalHandlerOptions {
  init = init ?? {};
  if ("protocols" in init) {
    return init;
  }
  const maxDeadlineDurationMs =
    init.maxDeadlineDurationMs ?? Number.MAX_SAFE_INTEGER;
  const acceptCompression = init.acceptCompression ?? [
    compressionGzip,
    compressionBrotli,
  ];
  const hpo: ProtocolHandlerFactInit = {
    ...init,
    ...compressionValidateOptions(init),
    maxDeadlineDurationMs,
    acceptCompression,
  };
  const protocols: ProtocolHandlerFact[] = [];
  if (init.grpc !== false) {
    protocols.push(createGrpcHandlerProtocol(hpo));
  }
  if (init.grpcWeb !== false) {
    protocols.push(createGrpcWebProtocolHandler(hpo));
  }
  if (init.connect !== false) {
    protocols.push(createConnectProtocolHandler(hpo));
  }
  if (protocols.length === 0) {
    throw new ConnectError(
      "cannot create handler, all protocols are disabled",
      Code.InvalidArgument
    );
  }
  return {
    protocols,
    maxDeadlineDurationMs,
    shutdownSignal: init.shutdownSignal,
  };
}

interface InternalHandlerOptions {
  protocols: ProtocolHandlerFact[];
  maxDeadlineDurationMs: number;
  shutdownSignal?: AbortSignal;
}
