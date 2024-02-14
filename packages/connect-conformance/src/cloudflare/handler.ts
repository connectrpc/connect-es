// Copyright 2021-2024 The Connect Authors
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

import { createConnectRouter } from "@connectrpc/connect";
import {
  universalServerRequestFromFetch,
  universalServerResponseToFetch,
} from "@connectrpc/connect/protocol";
import type {
  ConnectRouter,
  ConnectRouterOptions,
  ContextValues,
} from "@connectrpc/connect";
import type { UniversalHandler } from "@connectrpc/connect/protocol";
import type { ExecutionContext } from "@cloudflare/workers-types";

interface WokerHandlerOptions<Env> extends ConnectRouterOptions {
  /**
   * Route definitions. We recommend the following pattern:
   *
   * Create a file `connect.ts` with a default export such as this:
   *
   * ```ts
   * import {ConnectRouter} from "@connectrpc/connect";
   *
   * export default (router: ConnectRouter) => {
   *   router.service(ElizaService, {});
   * }
   * ```
   *
   * Then pass this function here.
   */
  routes: (router: ConnectRouter) => void;
  /**
   * Context values to extract from the request. These values are passed to
   * the handlers.
   */
  contextValues?: (
    req: Request,
    env: Env,
    ctx: ExecutionContext,
  ) => ContextValues;
  /**
   * Called when no route matches the request.
   */
  notFound?: (
    req: Request,
    env: Env,
    ctx: ExecutionContext,
  ) => Promise<Response>;
}

/**
 * Creates new worker handler for the given Connect API routes.
 */
export function createWorkerHandler<Env>(options: WokerHandlerOptions<Env>) {
  const router = createConnectRouter(options);
  options.routes(router);
  const paths = new Map<string, UniversalHandler>();
  for (const uHandler of router.handlers) {
    paths.set(uHandler.requestPath, uHandler);
  }
  return {
    async fetch(req: Request, env: Env, ctx: ExecutionContext) {
      const url = new URL(req.url);
      const handler = paths.get(url.pathname);
      if (handler === undefined) {
        return (
          (await options.notFound?.(req, env, ctx)) ??
          new Response("Not found", { status: 404 })
        );
      }
      // Cloudflare handles compression for unary requests, so we explicitly set Accept-Encoding to identity.
      //
      // Cloudflare doesn't let modify the headers of the incoming request, so we need to
      // create a new Request object and modify the headers there.
      req = new Request(req);
      req.headers.set("Accept-Encoding", "identity");
      const uReq = {
        ...universalServerRequestFromFetch(req, {}),
        contextValues: options.contextValues?.(req, env, ctx),
      };
      const uRes = await handler(uReq);
      return universalServerResponseToFetch(uRes);
    },
  };
}
