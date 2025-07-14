// Copyright 2021-2025 The Connect Authors
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
import type {
  ConnectRouterOptions,
  ContextValues,
  RouteFn,
} from "@connectrpc/connect";
import type { UniversalHandler } from "@connectrpc/connect/protocol";
import {
  compressionBrotli,
  compressionGzip,
  universalRequestFromNodeRequest,
  universalResponseToNodeResponse,
} from "@connectrpc/connect-node";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import type { JsonValue } from "@bufbuild/protobuf";

// biome-ignore lint/suspicious/noExplicitAny: necessary for compat with next
type NextApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
) => unknown | Promise<unknown>;

interface NextJsApiRouterOptions extends ConnectRouterOptions {
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
   *
   * For more complex setups with multiple services, you may pass them as an array, like so:
   *
   * ```ts
   * import ElizaRouter from "./eliza.ts";
   * import HelloWorldRouter from "./hello-world.ts";
   *
   * const adapter = nextJsApiRouter({
   *   routes: [
   *     ElizaRouter,
   *     HelloWorldRouter
   *   ]
   * });
   *
   * ```
   */
  routes: RouteFn | RouteFn[];

  /**
   * Serve all handlers under this prefix. For example, the prefix "/something"
   * will serve the RPC foo.FooService/Bar under "/something/foo.FooService/Bar".
   *
   * This is `/api` by default for Next.js.
   */
  prefix?: string;
  /**
   * Context values to extract from the request. These values are passed to
   * the handlers.
   */
  contextValues?: (req: NextApiRequest) => ContextValues;
}

/**
 * Provide your Connect RPCs via Next.js API routes.
 */
export function nextJsApiRouter(options: NextJsApiRouterOptions): ApiRoute {
  if (options.acceptCompression === undefined) {
    options.acceptCompression = [compressionGzip, compressionBrotli];
  }

  const router = createConnectRouter(options);

  if (Array.isArray(options.routes)) {
    // options.routes is an array of functions
    for (const routeFn of options.routes) {
      routeFn(router);
    }
  } else {
    // options.routes is function
    options.routes(router);
  }

  const prefix = options.prefix ?? "/api";
  const paths = new Map<string, UniversalHandler>();
  for (const uHandler of router.handlers) {
    paths.set(prefix + uHandler.requestPath, uHandler);
  }

  async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Strip the query parameter when matching paths.
    const requestPath = req.url?.split("?", 2)[0] ?? "";
    const uHandler = paths.get(requestPath);
    if (!uHandler) {
      res.writeHead(404);
      res.end();
      return;
    }
    try {
      const uRes = await uHandler(
        universalRequestFromNodeRequest(
          req,
          res,
          req.body as JsonValue | undefined,
          options.contextValues?.(req),
        ),
      );
      await universalResponseToNodeResponse(uRes, res);
    } catch (e) {
      console.error(
        `handler for rpc ${uHandler.method.name} of ${uHandler.service.typeName} failed`,
        e,
      );
    }
  }

  return {
    handler,
    config: {
      api: {
        bodyParser: false,
      },
    },
  };
}

interface ApiRoute {
  handler: NextApiHandler;
  config: PageConfig;
}
