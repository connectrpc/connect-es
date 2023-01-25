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

import type * as http from "http";
import type * as http2 from "http2";
import { write } from "./io.js";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./node-universal-header.js";
import type {
  UniversalHandlerFn,
  UniversalRequest,
  UniversalResponse,
} from "./universal.js";

/**
 * NodeHandlerFn is compatible with http.RequestListener and its equivalent
 * for http2.
 */
export type NodeHandlerFn = (
  request: NodeServerRequest,
  response: NodeServerResponse
) => void;
type NodeServerRequest = http.IncomingMessage | http2.Http2ServerRequest;
type NodeServerResponse = http.ServerResponse | http2.Http2ServerResponse;

/**
 * Convert a universal handler to a Node.js handler function.
 */
export function universalHandlerToNodeHandler(
  universalHandler: UniversalHandlerFn,
  onInternalError: (reason: unknown) => void
): NodeHandlerFn {
  return function nodeHandler(
    req: NodeServerRequest,
    res: NodeServerResponse
  ): void {
    runHandler(universalHandler, req, res).catch(onInternalError);
  };
}

async function runHandler(
  universalHandler: UniversalHandlerFn,
  nodeRequest: NodeServerRequest,
  nodeResponse: NodeServerResponse
) {
  const universalResponse = await universalHandler(
    universalRequestFromNodeRequest(nodeRequest)
  );
  await universalResponseToNodeResponse(universalResponse, nodeResponse);
}

function universalRequestFromNodeRequest(
  nodeRequest: NodeServerRequest
): UniversalRequest {
  return {
    httpVersion: nodeRequest.httpVersion,
    method: nodeRequest.method ?? "",
    header: nodeHeaderToWebHeader(nodeRequest.headers),
    body: asyncIterableFromNodeServerRequest(nodeRequest),
  };
}

async function universalResponseToNodeResponse(
  universalResponse: UniversalResponse,
  nodeResponse: NodeServerResponse
): Promise<void> {
  if (universalResponse.body instanceof Uint8Array) {
    nodeResponse.writeHead(
      universalResponse.status,
      webHeaderToNodeHeaders(universalResponse.header)
    );
    await write(nodeResponse, universalResponse.body);
  } else if (universalResponse.body !== undefined) {
    for await (const chunk of universalResponse.body) {
      // we deliberately send headers *in* this loop, not before,
      // because we have to give the implementation a chance to
      // set response headers
      if (!nodeResponse.headersSent) {
        nodeResponse.writeHead(
          universalResponse.status,
          webHeaderToNodeHeaders(universalResponse.header)
        );
      }
      await write(nodeResponse, chunk);
    }
  }
  if (!nodeResponse.headersSent) {
    nodeResponse.writeHead(
      universalResponse.status,
      webHeaderToNodeHeaders(universalResponse.header)
    );
  }
  if (universalResponse.trailer) {
    nodeResponse.addTrailers(webHeaderToNodeHeaders(universalResponse.trailer));
    universalResponse.trailer;
  }
  await new Promise<void>((resolve) => {
    nodeResponse.end(resolve);
  });
}

async function* asyncIterableFromNodeServerRequest(
  request: NodeServerRequest
): AsyncIterable<Uint8Array> {
  for await (const chunk of request) {
    yield chunk;
  }
}
