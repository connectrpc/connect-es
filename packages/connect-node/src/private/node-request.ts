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

import * as http from "http";
import * as https from "https";
import type { AnyMessage, Message } from "@bufbuild/protobuf";
import type { StreamingRequest, UnaryRequest } from "@bufbuild/connect-core";
import { webHeaderToNodeHeaders } from "./web-header-to-node-headers.js";

interface NodeRequestOptions<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> {
  // Unary Request
  req: UnaryRequest<I>;

  // Request body
  payload: Uint8Array;

  httpOptions?:
    | Omit<http.RequestOptions, "signal">
    | Omit<https.RequestOptions, "signal">;
}

function nodeRequest(protocol: string) {
  if (protocol.startsWith("http") || protocol.startsWith("https")) {
    return protocol.includes("https") ? https.request : http.request;
  }
  throw new Error("Unsupported protocol");
}

export function makeNodeRequest(options: NodeRequestOptions) {
  return new Promise<http.IncomingMessage>((resolve, reject) => {
    const endpoint = new URL(options.req.url);
    const nodeRequestFn = nodeRequest(endpoint.protocol);
    const request = nodeRequestFn(options.req.url, {
      ...options.httpOptions,
      headers: webHeaderToNodeHeaders(options.req.header),
      method: "POST",
      path: endpoint.pathname,
      signal: options.req.signal,
    });

    request.once("error", (err) => {
      reject(err);
    });

    request.once("response", (res) => {
      return resolve(res);
    });

    request.write(options.payload);
    request.end();
  });
}

export function getNodeRequest(
  req: StreamingRequest,
  httpOptions:
    | Omit<http.RequestOptions, "signal">
    | Omit<https.RequestOptions, "signal">
    | undefined
) {
  return new Promise<http.ClientRequest>((resolve, reject) => {
    const endpoint = new URL(req.url);
    const nodeRequestFn = nodeRequest(endpoint.protocol);
    const request = nodeRequestFn(req.url, {
      ...httpOptions,
      headers: webHeaderToNodeHeaders(req.header),
      method: "POST",
      path: endpoint.pathname,
      signal: req.signal,
    });
    request.once("socket", (socket) => {
      socket.once("connect", resolveRequest);
      socket.once("error", reject);

      function resolveRequest() {
        socket.off("error", rejectError);
        resolve(request);
      }

      function rejectError(err: Error) {
        socket.off("connect", resolveRequest);
        reject(err);
      }
    });
  });
}
