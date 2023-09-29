// Copyright 2021-2023 The Connect Authors
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
import { Code, ConnectError, createConnectRouter } from "@connectrpc/connect";
import { createLinkedAbortController } from "@connectrpc/connect/protocol";
import type { ConnectRouter, ConnectRouterOptions } from "@connectrpc/connect";
import * as protoConnect from "@connectrpc/connect/protocol-connect";
import * as protoGrpcWeb from "@connectrpc/connect/protocol-grpc-web";
import * as protoGrpc from "@connectrpc/connect/protocol-grpc";
import {
  compressionBrotli,
  compressionGzip,
  universalRequestFromNodeRequest,
  universalResponseToNodeResponse,
} from "@connectrpc/connect-node";
import type { FastifyInstance } from "fastify/types/instance";

interface FastifyConnectPluginOptions extends ConnectRouterOptions {
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
  routes?: (router: ConnectRouter) => void;

  /**
   * If set, once `fastify.close` is called, waits for the requests to be finished for the specified duration
   * before aborting them.
   */
  shutdownTimeout?: number;

  /**
   * The error to be returned for requests that couldn't complete within the shutdown period.
   * 
   * Defaults to a ConnectError with code `Code.Aborted`.
   */
  shutdownError?: unknown;
}

/**
 * Plug your Connect routes into a Fastify server.
 */
export function fastifyConnectPlugin(
  instance: FastifyInstance,
  opts: FastifyConnectPluginOptions,
  done: (err?: Error) => void,
) {
  if (opts.routes === undefined) {
    done();
    return;
  }
  if (opts.acceptCompression === undefined) {
    opts.acceptCompression = [compressionGzip, compressionBrotli];
  }
  if (opts.shutdownTimeout !== undefined) {
    const shutdownController = createLinkedAbortController(opts.shutdownSignal);
    opts.shutdownSignal = shutdownController.signal;
    instance.addHook("preClose", (done) => {
      setTimeout(() => {
        shutdownController.abort(
          opts.shutdownError ??
            new ConnectError("The request was aborted", Code.Aborted),
        );
      }, opts.shutdownTimeout);
      done();
    });
  }
  const router = createConnectRouter(opts);
  opts.routes(router);

  const uHandlers = router.handlers;
  if (uHandlers.length == 0) {
    done();
    return;
  }

  // we can override all content type parsers (including application/json) in
  // this plugin without affecting outer scope
  addNoopContentTypeParsers(instance);

  for (const uHandler of uHandlers) {
    instance.all(
      uHandler.requestPath,
      {},
      async function handleFastifyRequest(req, reply) {
        try {
          const uRes = await uHandler(
            universalRequestFromNodeRequest(
              req.raw,
              req.body as JsonValue | undefined,
            ),
          );
          // Fastify maintains response headers on the reply object and only moves them to
          // the raw response during reply.send, but we are not using reply.send with this plugin.
          // So we need to manually copy them to the raw response before handing off to vanilla Node.
          for (const [key, value] of Object.entries(reply.getHeaders())) {
            if (value !== undefined) {
              reply.raw.setHeader(key, value);
            }
          }
          await universalResponseToNodeResponse(uRes, reply.raw);
        } catch (e) {
          if (ConnectError.from(e).code == Code.Aborted) {
            return;
          }
          // eslint-disable-next-line no-console
          console.error(
            `handler for rpc ${uHandler.method.name} of ${uHandler.service.typeName} failed`,
            e,
          );
        }
      },
    );
  }

  done();
}

/**
 * Registers fastify content type parsers that do nothing for all content-types
 * known to Connect.
 */
function addNoopContentTypeParsers(instance: FastifyInstance): void {
  instance.addContentTypeParser(
    [
      protoConnect.contentTypeUnaryJson,
      protoConnect.contentTypeStreamJson,
      protoGrpcWeb.contentTypeProto,
      protoGrpcWeb.contentTypeJson,
      protoGrpc.contentTypeProto,
      protoGrpc.contentTypeJson,
    ],
    noopContentTypeParser,
  );
  instance.addContentTypeParser(
    protoGrpc.contentTypeRegExp,
    noopContentTypeParser,
  );
  instance.addContentTypeParser(
    protoGrpcWeb.contentTypeRegExp,
    noopContentTypeParser,
  );
  instance.addContentTypeParser(
    protoConnect.contentTypeRegExp,
    noopContentTypeParser,
  );
}

function noopContentTypeParser(
  _req: unknown,
  _payload: unknown,
  done: (err: null, body?: undefined) => void,
) {
  done(null, undefined);
}
