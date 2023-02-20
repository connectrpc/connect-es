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
  UniversalHandlerOptions,
  validateUniversalHandlerOptions,
  createUniversalMethodHandler,
  createUniversalServiceHandlers,
} from "./protocol/index.js";
import { createHandlerFactory as handlerFactoryGrpcWeb } from "./protocol-grpc-web/handler-factory.js";
import { createHandlerFactory as handlerFactoryGrpc } from "./protocol-grpc/handler-factory.js";
import { createHandlerFactory as handlerFactoryConnect } from "./protocol-connect/handler-factory.js";

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
