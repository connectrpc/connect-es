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

import type { JsonValue } from "@bufbuild/protobuf";
import {
  ConnectRouter,
  ConnectRouterOptions,
  createConnectRouter,
} from "@bufbuild/connect";
import * as protoConnect from "@bufbuild/connect/protocol-connect";
import * as protoGrpcWeb from "@bufbuild/connect/protocol-grpc-web";
import * as protoGrpc from "@bufbuild/connect/protocol-grpc";
import {
  universalRequestFromNodeRequest,
  universalResponseToNodeResponse,
  compressionBrotli,
  compressionGzip,
} from "@bufbuild/connect-node";
import type { FastifyInstance } from "fastify/types/instance";

interface FastifyConnectPluginOptions extends ConnectRouterOptions {
  /**
   * Route definitions. We recommend the following pattern:
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
   * Then pass this function here.
   */
  routes?: (router: ConnectRouter) => void;
}

/**
 * Plug your Connect routes into a Fastify server.
 */
export function fastifyConnectPlugin(
  instance: FastifyInstance,
  opts: FastifyConnectPluginOptions,
  done: (err?: Error) => void
) {
  if (opts.routes === undefined) {
    done();
    return;
  }
  const router = createConnectRouter(opts);
  opts.routes(router);
  const uHandlers = router.handlers;
  if (uHandlers.length == 0) {
    done();
    return;
  }

  if (opts.acceptCompression === undefined) {
    opts.acceptCompression = [compressionGzip, compressionBrotli];
  }

  // we can override all content type parsers (including application/json) in this plugin
  // without affecting outer scope
  const types = [
    protoConnect.contentTypeRegExp,
    protoGrpcWeb.contentTypeRegExp,
    protoGrpc.contentTypeRegExp,
  ];
  for (const type of types) {
    instance.addContentTypeParser(type, (_req, _payload, done) => {
      done(null, undefined);
    });
  }

  for (const uHandler of uHandlers) {
    instance.all(
      uHandler.requestPath,
      {},
      async function handleFastifyRequest(req, reply) {
        const uRes = await uHandler(
          universalRequestFromNodeRequest(
            req.raw,
            req.body as JsonValue | undefined
          )
        );
        await universalResponseToNodeResponse(uRes, reply.raw);
      }
    );
  }

  done();
}
