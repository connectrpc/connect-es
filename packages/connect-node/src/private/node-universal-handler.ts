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
  UniversalServerRequest,
  UniversalServerResponse,
} from "./universal.js";
import { Code, ConnectError } from "@bufbuild/connect-core";
import type { JsonValue } from "@bufbuild/protobuf";

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
  onInternalError: (reason: unknown) => void,
  onComplete?: () => void
): NodeHandlerFn {
  return function nodeHandler(
    req: NodeServerRequest,
    res: NodeServerResponse
  ): void {
    runHandler(universalHandler, req, res).then(onComplete, onInternalError);
  };
}

async function runHandler(
  universalHandler: UniversalHandlerFn,
  nodeRequest: NodeServerRequest,
  nodeResponse: NodeServerResponse
) {
  const universalResponse = await universalHandler(
    universalRequestFromNodeRequest(nodeRequest, undefined)
  );
  await universalResponseToNodeResponse(universalResponse, nodeResponse);
}

export function universalRequestFromNodeRequest(
  nodeRequest: NodeServerRequest,
  parsedJsonBody: JsonValue | undefined
): UniversalServerRequest {
  const encrypted =
    "encrypted" in nodeRequest.socket && nodeRequest.socket.encrypted;
  const protocol = encrypted ? "https" : "http";
  const authority =
    "authority" in nodeRequest
      ? nodeRequest.authority
      : nodeRequest.headers.host;
  const pathname = nodeRequest.url ?? "";
  if (authority === undefined) {
    throw new ConnectError(
      "unable to determine request authority from Node.js server request",
      Code.Internal
    );
  }
  const body =
    parsedJsonBody !== undefined
      ? parsedJsonBody
      : asyncIterableFromNodeServerRequest(nodeRequest);
  return {
    httpVersion: nodeRequest.httpVersion,
    method: nodeRequest.method ?? "",
    url: new URL(pathname, `${protocol}://${authority}`),
    header: nodeHeaderToWebHeader(nodeRequest.headers),
    body,
  };
}

export async function universalResponseToNodeResponse(
  universalResponse: UniversalServerResponse,
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
      if ("flush" in nodeResponse && typeof nodeResponse.flush == "function") {
        // The npm package "compression" is an express middleware that is widely used,
        // for example in next.js. It uses the npm package "compressible" to determine
        // whether to apply compression to a response. Unfortunately, "compressible"
        // matches every mime type that ends with "+json", causing our server-streaming
        // RPCs to be buffered.
        // The package modifies the response object, and adds a flush() method, which
        // flushes the underlying gzip or deflate stream from the Node.js zlib module.
        // The method is added here:
        // https://github.com/expressjs/compression/blob/ad5113b98cafe1382a0ece30bb4673707ac59ce7/index.js#L70
        nodeResponse.flush();
      }
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
    // The npm package "compression" crashes when a callback is passed to end()
    // https://github.com/expressjs/compression/blob/ad5113b98cafe1382a0ece30bb4673707ac59ce7/index.js#L115
    nodeResponse.once("end", resolve);
    nodeResponse.end();
  });
}

async function* asyncIterableFromNodeServerRequest(
  request: NodeServerRequest
): AsyncIterable<Uint8Array> {
  for await (const chunk of request) {
    yield chunk;
  }
}
