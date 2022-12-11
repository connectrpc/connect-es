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

import { createMethodUrl } from "@bufbuild/connect-core";
import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";
import { MethodKind } from "@bufbuild/protobuf";
import type { MethodImpl, ServiceImpl } from "./implementation.js";
import type * as http from "http";
import type * as http2 from "http2";
import { createConnectProtocol } from "./connect-protocol.js";
import type { ImplSpec, Protocol } from "./protocol.js";
import { endWithHttpStatus } from "./private/io.js";
import { createGrpcWebProtocol } from "./grpc-web-protocol.js";
import { createGrpcProtocol } from "./grpc-protocol.js";

/**
 * Handler handles a Node.js request for one specific RPC.
 * Note that this function is compatible with http.RequestListener and its
 * equivalent for http2.
 */
export type Handler = NodeHandler & {
  /**
   * The service the RPC belongs to.
   */
  service: ServiceType;
  /**
   * The RPC.
   */
  method: MethodInfo;
  /**
   * The request path of the procedure, without any prefixes.
   * For example, "/something/foo.FooService/Bar" for the method
   * "Bar" of the service "foo.FooService".
   */
  requestPath: string;
};

/**
 * Options for creating a Handler. If you do not specify any protocols,
 * all available protocols are enabled.
 */
type HandlerOptions =
  | {
      jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
      binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
      requireConnectProtocolHeader?: boolean;
    }
  | { protocols: Protocol[] };

/**
 * createHandlers() takes a service definition and a service implementation,
 * and returns an array of Handler functions, one for each RPC.
 */
export function createHandlers<T extends ServiceType>(
  service: T,
  implementation: ServiceImpl<T>,
  options?: HandlerOptions
): Handler[] {
  return Object.entries(service.methods).map(([name, method]) => {
    const i = implementation[name].bind(implementation);
    return createHandler(service, method, i, options);
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
  const protocols = normalizeHandlerOptions(options);
  const protocolHandlers = protocols.map((p) =>
    Object.assign(p.createHandler(createImplSpec(service, method, impl)), p)
  );

  function handleAny(
    req: http.IncomingMessage | http2.Http2ServerRequest,
    res: http.ServerResponse | http2.Http2ServerResponse
  ): void {
    if (method.kind == MethodKind.BiDiStreaming && req.httpVersionMajor !== 2) {
      // Clients coded to expect full-duplex connections may hang if they've
      // mistakenly negotiated HTTP/1.1. To unblock them, we must close the
      // underlying TCP connection.
      return void endWithHttpStatus(res, 505, "Version Not Supported", {
        Connection: "close",
      });
    }
    if (req.method !== "POST") {
      // The gRPC-HTTP2, gRPC-Web, and Connect protocols are all POST-only.
      return void endWithHttpStatus(res, 405, "Method Not Allowed");
    }
    const handleProtocol = protocolHandlers.find((p) =>
      p.supportsMediaType(req.headers["content-type"] ?? "")
    );
    if (!handleProtocol) {
      return void endWithHttpStatus(res, 415, "Unsupported Media Type");
    }
    handleProtocol(req, res).catch((reason) => {
      // TODO need to handle rejections here, but it's unclear how exactly
      // eslint-disable-next-line no-console
      console.error("protocol handle failed", reason);
    });
  }
  return Object.assign(handleAny, {
    service,
    method,
    requestPath: createMethodUrl("https://example.com", service, method)
      .pathname,
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
      response.writeHead(404);
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
 * NodeHandler is compatible with http.RequestListener and its equivalent
 * for http2.
 */
type NodeHandler = (
  request: http.IncomingMessage | http2.Http2ServerRequest,
  response: http.ServerResponse | http2.Http2ServerResponse
) => void;

function normalizeHandlerOptions(init?: HandlerOptions): Protocol[] {
  init = init ?? {};
  if ("protocols" in init) {
    return init.protocols;
  } else {
    return [
      createConnectProtocol(init),
      createGrpcWebProtocol(init),
      createGrpcProtocol(init),
    ];
  }
}

function createImplSpec<M extends MethodInfo>(
  service: ServiceType,
  method: M,
  impl: MethodImpl<M>
): ImplSpec {
  return {
    kind: method.kind,
    service,
    method,
    impl,
  } as ImplSpec;
}
