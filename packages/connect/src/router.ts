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

import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import {
  createMethodImplSpec,
  createServiceImplSpec,
  MethodImpl,
  ServiceImpl,
} from "./implementation.js";
import {
  ProtocolHandlerFactory,
  UniversalHandler,
  UniversalHandlerFn,
  UniversalHandlerOptions,
  uResponseNotFound,
  validateUniversalHandlerOptions,
  createUniversalMethodHandler,
  createUniversalServiceHandlers,
} from "./protocol/index.js";
import { createHandlerFactory as handlerFactoryGrpcWeb } from "./protocol-grpc-web/handler-factory.js";
import { createHandlerFactory as handlerFactoryGrpc } from "./protocol-grpc/handler-factory.js";
import { createHandlerFactory as handlerFactoryConnect } from "./protocol-connect/handler-factory.js";

/**
 * Options to the function routeUniversalHandlers().
 */
interface RouteUniversalHandlersInit {
  /**
   * Handlers to route by request path.
   */
  handlers: UniversalHandler[];

  /**
   * Fallback that is called when the request path matches none of the handlers.
   */
  fallback?: UniversalHandlerFn;

  /**
   * Serve all handlers under this prefix. For example, the prefix "/something"
   * will serve the RPC foo.FooService/Bar under "/something/foo.FooService/Bar".
   * Note that some gRPC client implementations do not allow for prefixes.
   */
  requestPathPrefix?: string;
}

// TODO (TCN-1219)
/**
 * @deprecated
 *
 * Route many handlers by request path.
 *
 * Takes an array of handler functions, and merges them into a single handler
 * function that invokes the first handler with a matching request path. If no
 * request path matches, it serves a 404 by default.
 */
export function routeUniversalHandlers(
  init: RouteUniversalHandlersInit
): UniversalHandlerFn {
  const prefix = (init.requestPathPrefix ?? "").replace(/\/$/, "");
  const next = init.fallback ?? (() => uResponseNotFound);
  return async function routingHandler(request) {
    const handler = init.handlers.find(
      (h) => request.url.pathname === prefix + h.requestPath
    );
    if (!handler) {
      return next(request);
    }
    return handler(request);
  };
}

export interface ConnectRouter {
  readonly handlers: UniversalHandler[];
  service<T extends ServiceType>(
    service: T,
    implementation: Partial<ServiceImpl<T>>,
    options?: Partial<UniversalHandlerOptions>
  ): this;
  rpc<M extends MethodInfo>(
    service: ServiceType,
    method: M,
    impl: MethodImpl<M>,
    options?: Partial<UniversalHandlerOptions>
  ): this;
  reduce(opt: Omit<RouteUniversalHandlersInit, "handlers">): UniversalHandlerFn;
}

export interface ConnectRouterOptions extends Partial<UniversalHandlerOptions> {
  grpc?: boolean;
  grpcWeb?: boolean;
  connect?: boolean;
}

export function createConnectRouter(
  routerOptions?: ConnectRouterOptions
): ConnectRouter {
  const base = whichProtocols(routerOptions);
  const handlers: UniversalHandler[] = [];
  return {
    handlers,
    service(service, implementation, options) {
      const { protocols } = whichProtocols(options, base);
      handlers.push(
        ...createUniversalServiceHandlers(
          createServiceImplSpec(service, implementation),
          protocols
        )
      );
      return this;
    },
    rpc(service, method, implementation, options) {
      const { protocols } = whichProtocols(options, base);
      handlers.push(
        createUniversalMethodHandler(
          createMethodImplSpec(service, method, implementation),
          protocols
        )
      );
      return this;
    },
    reduce(opt) {
      return routeUniversalHandlers({
        handlers,
        ...opt,
      });
    },
  };
}

function whichProtocols(
  options: ConnectRouterOptions | undefined,
  base?: { options: ConnectRouterOptions; protocols: ProtocolHandlerFactory[] }
): { options: ConnectRouterOptions; protocols: ProtocolHandlerFactory[] } {
  if (base && !options) {
    return base;
  }
  const opt: ConnectRouterOptions = base
    ? {
        ...validateUniversalHandlerOptions(base.options),
        ...options,
      }
    : {
        ...options,
        ...validateUniversalHandlerOptions(options ?? {}),
      };

  const protocols: ProtocolHandlerFactory[] = [];
  if (options?.grpc !== false) {
    protocols.push(handlerFactoryGrpc(opt));
  }
  if (options?.grpcWeb !== false) {
    protocols.push(handlerFactoryGrpcWeb(opt));
  }
  if (options?.connect !== false) {
    protocols.push(handlerFactoryConnect(opt));
  }
  if (protocols.length === 0) {
    throw new ConnectError(
      "cannot create handler, all protocols are disabled",
      Code.InvalidArgument
    );
  }
  return {
    options: opt,
    protocols,
  };
}
