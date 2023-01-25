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
import type {
  UniversalHandlerFn,
  UniversalRequest,
  UniversalResponse,
} from "../protocol-handler.js";

/**
 * NodeHandler is compatible with http.RequestListener and its equivalent
 * for http2.
 */
export type NodeHandler = (
  request: NodeRequest,
  response: NodeResponse
) => void;
type NodeRequest = http.IncomingMessage | http2.Http2ServerRequest;
type NodeResponse = http.ServerResponse | http2.Http2ServerResponse;

/**
 * Convert a universal handler to a Node.js handler function.
 */
export function universalHandlerToNodeHandler(
  universalHandler: UniversalHandlerFn,
  onInternalError: (reason: unknown) => void
): NodeHandler {
  return function nodeHandler(req: NodeRequest, res: NodeResponse): void {
    runHandler(universalHandler, req, res).catch(onInternalError);
  };
}

async function runHandler(
  universalHandler: UniversalHandlerFn,
  nodeRequest: NodeRequest,
  nodeResponse: http.ServerResponse | http2.Http2ServerResponse
) {
  const universalResponse = await universalHandler(
    universalRequestFromNodeRequest(nodeRequest)
  );
  await universalResponseToNodeResponse(universalResponse, nodeResponse);
}

function universalRequestFromNodeRequest(
  nodeRequest: NodeRequest
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
  nodeResponse: NodeResponse
): Promise<void> {
  if (universalResponse.body instanceof Uint8Array) {
    nodeResponse.writeHead(
      universalResponse.status,
      webHeaderToNodeHeaders(universalResponse.header)
    );
    await write(nodeResponse, universalResponse.body);
  } else if (universalResponse.body !== undefined) {
    for await (const chunk of universalResponse.body) {
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
  request: NodeRequest
): AsyncIterable<Uint8Array> {
  for await (const chunk of request) {
    yield chunk;
  }
}

export function nodeHeaderToWebHeader(
  nodeHeaders:
    | http.OutgoingHttpHeaders
    | http.IncomingHttpHeaders
    | http2.IncomingHttpHeaders
    | http.IncomingMessage["trailers"]
): Headers {
  const header = new Headers();
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (k.startsWith(":")) {
      continue;
    }
    if (v === undefined) {
      continue;
    }
    if (typeof v == "string") {
      header.append(k, v);
    } else if (typeof v == "number") {
      header.append(k, String(v));
    } else {
      for (const e of v) {
        header.append(k, e);
      }
    }
  }
  return header;
}

export function webHeaderToNodeHeaders(
  headersInit: HeadersInit
): http.OutgoingHttpHeaders;
export function webHeaderToNodeHeaders(
  headersInit: HeadersInit | undefined
): undefined;
export function webHeaderToNodeHeaders(
  headersInit: HeadersInit | undefined
): http.OutgoingHttpHeaders | undefined {
  if (headersInit === undefined) {
    return undefined;
  }
  const o = Object.create(null) as http.OutgoingHttpHeaders;
  if (Array.isArray(headersInit)) {
    for (const [key, value] of headersInit) {
      const k = key.toLowerCase();
      o[k] = value;
    }
  } else if ("forEach" in headersInit) {
    if (typeof headersInit.forEach == "function") {
      headersInit.forEach((value, key) => {
        const k = key.toLowerCase();
        o[k] = value;
      });
    }
  } else {
    for (const [key, value] of Object.entries<string>(headersInit)) {
      const k = key.toLowerCase();
      o[k] = value;
    }
  }
  return o;
}
