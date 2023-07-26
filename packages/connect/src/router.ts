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
} from "./implementation.js";
import type { MethodImpl, ServiceImpl } from "./implementation.js";
import { createHandlerFactory as handlerFactoryGrpcWeb } from "./protocol-grpc-web/handler-factory.js";
import { createHandlerFactory as handlerFactoryGrpc } from "./protocol-grpc/handler-factory.js";
import { createHandlerFactory as handlerFactoryConnect } from "./protocol-connect/handler-factory.js";
import {
  createUniversalMethodHandler,
  createUniversalServiceHandlers,
  validateUniversalHandlerOptions,
} from "./protocol/universal-handler.js";
import type {
  UniversalHandler,
  UniversalHandlerOptions,
} from "./protocol/universal-handler.js";
import type { ProtocolHandlerFactory } from "./protocol/protocol-handler-factory.js";

/**
 * ConnectRouter is your single registration point for RPCs.
 *
 * Create a file `connect.ts` with a default export such as this:
 *
 * ```ts
 * import {ConnectRouter} from "@bufbuild/connect";
 *
 * export default (router: ConnectRouter) => {
 *   router.service(ElizaService, {});
 * }
 * ```
 *
 * The pass this function to adapters and plugins, for example
 * from @bufbuild/connect-node, or from @bufbuild/connect-fastify.
 */
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
}

/**
 * Options for a ConnectRouter. By default, all three protocols gRPC, gRPC-web,
 * and Connect are enabled.
 */
export interface ConnectRouterOptions extends Partial<UniversalHandlerOptions> {
  /**
   * Enable the gRPC protocol and make your API available to all gRPC clients
   * for various platforms and languages. See https://grpc.io/
   *
   * The protocol is enabled by default. Set this option to `false` to disable
   * it, but mind that at least one protocol must be enabled.
   *
   * Note that gRPC is typically served with TLS over HTTP/2 and requires access
   * to HTTP trailers.
   */
  grpc?: boolean;

  /**
   * Enable the gRPC-web protocol and make your API available to all gRPC-web
   * clients. gRPC-web is commonly used in web browsers, but there are client
   * implementations for other platforms as well, for example in Dart, Kotlin,
   * and Swift. See https://github.com/grpc/grpc-web
   *
   * The protocol is enabled by default. Set this option to `false` to disable
   * it, but mind that at least one protocol must be enabled.
   *
   * gRPC-web works over HTTP 1.1 or HTTP/2 and does not require access to HTTP
   * trailers. Note that bidi streaming requires HTTP/2, and web browsers may
   * not support all streaming types.
   */
  grpcWeb?: boolean;

  /**
   * Enable the Connect protocol and make your API available to all Connect
   * clients, but also for a simple call with curl. See https://connect.build/
   *
   * The protocol is enabled by default. Set this option to `false` to disable
   * it, but mind that at least one protocol must be enabled.
   *
   * Connect works over HTTP 1.1 or HTTP/2 and does not require access to HTTP
   * trailers. Note that bidi streaming requires HTTP/2, and web browsers may
   * not support all streaming types.
   */
  connect?: boolean;
}

/**
 * Create a new ConnectRouter.
 */
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
