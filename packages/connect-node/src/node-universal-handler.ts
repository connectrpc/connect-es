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

import type * as http from "node:http";
import type * as http2 from "node:http2";
import type * as stream from "node:stream";
import type { JsonValue } from "@bufbuild/protobuf";
import { Code, ConnectError } from "@connectrpc/connect";
import type {
  UniversalServerRequest,
  UniversalServerResponse,
} from "@connectrpc/connect/protocol";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./node-universal-header.js";
import {
  connectErrorFromH2ResetCode,
  connectErrorFromNodeReason,
} from "./node-error.js";
import type { ContextValues } from "@connectrpc/connect";

/**
 * NodeHandlerFn is compatible with http.RequestListener and its equivalent
 * for http2.
 */
export type NodeHandlerFn = (
  request: NodeServerRequest,
  response: NodeServerResponse,
) => void;

/**
 * A Node.js server request from the http, https, or the http2 module.
 */
export type NodeServerRequest = http.IncomingMessage | http2.Http2ServerRequest;

/**
 * A Node.js server response from the http, https, or the http2 module.
 * Note that we are taking the liberty to patch the type of write() so
 * that they are compatible with each other.
 */
export type NodeServerResponse = (
  | Omit<http.ServerResponse, "write">
  | Omit<http2.Http2ServerResponse, "write">
) & {
  write(
    chunk: string | Uint8Array,
    callback?: (err: Error | null | undefined) => void,
  ): boolean;
  write(
    chunk: string | Uint8Array,
    encoding: BufferEncoding,
    callback?: (err: Error | null | undefined) => void,
  ): boolean;
};

/**
 * Converts a Node.js server request to a UniversalServerRequest.
 * This function helps to implement adapters to server frameworks running
 * on Node.js. Please be careful using this function in your own code, as we
 * may have to make changes to it in the future.
 */
export function universalRequestFromNodeRequest(
  nodeRequest: NodeServerRequest,
  nodeResponse: NodeServerResponse,
  parsedJsonBody: JsonValue | undefined,
  contextValues: ContextValues | undefined,
): UniversalServerRequest;
/**
 * @deprecated
 */
export function universalRequestFromNodeRequest(
  nodeRequest: NodeServerRequest,
  parsedJsonBody: JsonValue | undefined,
  contextValues: ContextValues | undefined,
): UniversalServerRequest;
export function universalRequestFromNodeRequest(
  nodeRequest: NodeServerRequest,
  ...rest:
    | [
        nodeResponse: NodeServerResponse,
        parsedJsonBody: JsonValue | undefined,
        contextValues: ContextValues | undefined,
      ]
    | [
        parsedJsonBody: JsonValue | undefined,
        contextValues: ContextValues | undefined,
      ]
): UniversalServerRequest {
  const nodeResponse: NodeServerResponse | undefined =
    rest.length === 3 ? rest[0] : undefined;
  const parsedJsonBody: JsonValue | undefined =
    rest.length === 3 ? rest[1] : rest[0];
  const contextValues: ContextValues | undefined =
    rest.length === 3 ? rest[2] : rest[1];
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
      Code.Internal,
    );
  }
  const body =
    parsedJsonBody !== undefined
      ? parsedJsonBody
      : asyncIterableFromNodeServerRequest(nodeRequest);
  const abortController = new AbortController();
  if ("stream" in nodeRequest) {
    // HTTP/2 has error codes we want to honor
    nodeRequest.once("close", () => {
      const err = connectErrorFromH2ResetCode(nodeRequest.stream.rstCode);
      if (err !== undefined) {
        abortController.abort(err);
      } else {
        abortController.abort();
      }
    });
  } else {
    // HTTP/1.1 does not have error codes, but Node.js has ECONNRESET
    const nodeResponsOrRequest = nodeResponse ?? nodeRequest;
    const onH1Error = (e: Error) => {
      nodeRequest.off("error", onH1Error);
      nodeResponsOrRequest.off("close", onH1Close);
      abortController.abort(connectErrorFromNodeReason(e));
    };
    const onH1Close = () => {
      nodeRequest.off("error", onH1Error);
      nodeResponsOrRequest.off("close", onH1Close);
      // When subscribed to the response, this can get called before "error"
      abortController.abort(
        nodeRequest.errored
          ? connectErrorFromNodeReason(nodeRequest.errored)
          : undefined,
      );
    };
    nodeRequest.once("error", onH1Error);
    // Node emits close on the request as soon as all data is read.
    // We instead subscribe to the response (if available)
    //
    // Ref: https://github.com/nodejs/node/issues/40775
    nodeResponsOrRequest.once("close", onH1Close);
  }
  return {
    httpVersion: nodeRequest.httpVersion,
    method: nodeRequest.method ?? "",
    url: new URL(pathname, `${protocol}://${authority}`).toString(),
    header: nodeHeaderToWebHeader(nodeRequest.headers),
    body,
    signal: abortController.signal,
    contextValues: contextValues,
  };
}

/**
 * Writes a UniversalServerResponse to a Node.js server response.
 * This function helps to implement adapters to server frameworks running
 * on Node.js. Please be careful using this function in your own code, as we
 * may have to make changes to it in the future.
 */
export async function universalResponseToNodeResponse(
  universalResponse: UniversalServerResponse,
  nodeResponse: NodeServerResponse,
): Promise<void> {
  const it = universalResponse.body?.[Symbol.asyncIterator]();
  let isWriteError = false;
  try {
    if (it !== undefined) {
      let chunk = await it.next();
      isWriteError = true;
      // we deliberately send headers after first read, not before,
      // because we have to give the implementation a chance to
      // set response headers
      nodeResponse.writeHead(
        universalResponse.status,
        webHeaderToNodeHeaders(universalResponse.header),
      );
      isWriteError = false;
      for (; chunk.done !== true; chunk = await it.next()) {
        isWriteError = true;
        await write(nodeResponse, chunk.value);
        if (
          "flush" in nodeResponse &&
          typeof nodeResponse.flush == "function"
        ) {
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
        isWriteError = false;
      }
    }
    if (!nodeResponse.headersSent) {
      nodeResponse.writeHead(
        universalResponse.status,
        webHeaderToNodeHeaders(universalResponse.header),
      );
    }
    if (universalResponse.trailer) {
      nodeResponse.addTrailers(
        webHeaderToNodeHeaders(universalResponse.trailer),
      );
    }
    await new Promise<void>((resolve) => {
      // The npm package "compression" crashes when a callback is passed to end()
      // https://github.com/expressjs/compression/blob/ad5113b98cafe1382a0ece30bb4673707ac59ce7/index.js#L115
      nodeResponse.once("end", resolve);
      nodeResponse.end();
    });
  } catch (e) {
    // Report write errors to the handler.
    if (isWriteError) {
      it?.throw?.(e).catch(() => {});
    }
    throw connectErrorFromNodeReason(e);
  } finally {
    it?.return?.().catch(() => {});
  }
}

async function* asyncIterableFromNodeServerRequest(
  request: NodeServerRequest,
): AsyncIterable<Uint8Array> {
  for await (const chunk of request) {
    yield chunk;
  }
}

function write(stream: stream.Writable, data: Uint8Array): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (stream.errored) {
      return error(stream.errored);
    }

    stream.once("error", error);

    stream.once("drain", drain);
    // flushed == false: the stream wishes for the calling code to wait for
    // the 'drain' event to be emitted before continuing to write additional
    // data.
    const flushed = stream.write(data, "binary", (err) => {
      if (err && !flushed) {
        // We are never getting a "drain" nor an "error" event if the stream
        // has already ended (ERR_STREAM_WRITE_AFTER_END), so we have to
        // resolve our promise in this callback.
        error(err);
        // However, once we do that (and remove our event listeners), we _do_
        // get an "error" event, which ends up as an uncaught exception.
        // We silence this error specifically with the following listener.
        // All of this seems very fragile.
        stream.once("error", () => {
          //
        });
      }
    });
    if (flushed) {
      drain();
    }

    function error(err: Error) {
      stream.off("error", error);
      stream.off("drain", drain);
      reject(err);
    }

    function drain() {
      stream.off("error", error);
      stream.off("drain", drain);
      resolve();
    }
  });
}
