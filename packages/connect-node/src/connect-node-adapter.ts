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

import { Code, ConnectError, createConnectRouter } from "@connectrpc/connect";
import type {
  ConnectRouter,
  ConnectRouterOptions,
  ContextValues,
} from "@connectrpc/connect";
import type { UniversalHandler } from "@connectrpc/connect/protocol";
import { uResponseNotFound } from "@connectrpc/connect/protocol";
import {
  universalRequestFromNodeRequest,
  universalResponseToNodeResponse,
} from "./node-universal-handler.js";
import type {
  NodeHandlerFn,
  NodeServerRequest,
  NodeServerResponse,
} from "./node-universal-handler.js";
import { compressionBrotli, compressionGzip } from "./compression.js";

export interface ConnectNodeAdapterOptions extends ConnectRouterOptions {
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
   * If none of the handler request paths match, a 404 is served. This option
   * can provide a custom fallback for this case.
   */
  fallback?: NodeHandlerFn;
  /**
   * Serve all handlers under this prefix. For example, the prefix "/something"
   * will serve the RPC foo.FooService/Bar under "/something/foo.FooService/Bar".
   * Note that many gRPC client implementations do not allow for prefixes.
   */
  requestPathPrefix?: string;
  /**
   * Context values to extract from the request. These values are passed to
   * the handlers.
   */
  contextValues?: (req: NodeServerRequest) => ContextValues;
}

/**
 * Create a Node.js request handler from a ConnectRouter.
 *
 * The returned function is compatible with http.RequestListener and its equivalent for http2.
 */
export function connectNodeAdapter(
  options: ConnectNodeAdapterOptions,
): NodeHandlerFn {
  if (options.acceptCompression === undefined) {
    options.acceptCompression = [compressionGzip, compressionBrotli];
  }
  const router = createConnectRouter(options);
  options.routes(router);
  const prefix = options.requestPathPrefix ?? "";
  const paths = new Map<string, UniversalHandler>();
  for (const uHandler of router.handlers) {
    paths.set(prefix + uHandler.requestPath, uHandler);
  }
  return function nodeRequestHandler(
    req: NodeServerRequest,
    res: NodeServerResponse,
  ): void {
    // Strip the query parameter when matching paths.
    const uHandler = paths.get(req.url?.split("?", 2)[0] ?? "");
    if (!uHandler) {
      (options.fallback ?? fallback)(req, res);
      return;
    }
    const uReq = universalRequestFromNodeRequest(
      req,
      res,
      undefined,
      options.contextValues?.(req),
    );
    uHandler(uReq)
      .then((uRes) => universalResponseToNodeResponse(uRes, res))
      .catch((reason) => {
        if (ConnectError.from(reason).code == Code.Aborted) {
          return;
        }
        // eslint-disable-next-line no-console
        console.error(
          `handler for rpc ${uHandler.method.name} of ${uHandler.service.typeName} failed`,
          reason,
        );
      });
  };
}

const fallback: NodeHandlerFn = (request, response) => {
  response.writeHead(uResponseNotFound.status);
  response.end();
};
