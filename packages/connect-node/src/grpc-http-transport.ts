// Copyright 2021-2022 Buf Technologies, Inc.
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
import {
  ConnectError,
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  grpcCodeFromHttpStatus,
  grpcCreateRequestHeader,
  grpcExpectContentType,
  grpcFindTrailerError,
  Interceptor,
  runUnary,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect-core";
import type {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { connectErrorFromNodeReason } from "./private/connect-error-from-node.js";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import { assert } from "./private/assert.js";
import { readEnvelope } from "./private/io.js";

export interface GrpcHttpTransportOptions {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "http://example.com/my-api"`
   *
   * This will make a `POST /my-api/my_package.MyService/Foo` to
   * `example.com` via HTTPS.
   */
  baseUrl: string;

  /**
   * By default, clients use the binary format for gRPC-web, because
   * not all gRPC-web implementations support JSON.
   */
  useBinaryFormat?: boolean;

  /**
   * Interceptors that should be applied to all calls running through
   * this transport. See the Interceptor type for details.
   */
  interceptors?: Interceptor[];

  /**
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  /**
   * Options for the http request.
   */
  httpOptions?: http.RequestOptions | https.RequestOptions;
}

interface NodeRequestOptions<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> extends Pick<GrpcHttpTransportOptions, "httpOptions"> {
  // Unary Request
  req: UnaryRequest<I>;

  // Payload encoding
  encoding: "utf8" | "binary";

  // Request body
  payload: Uint8Array;
}

const messageFlag = 0b00000000;

export function createGrpcHttpTransport(
  options: GrpcHttpTransportOptions
): Partial<Transport> {
  const useBinaryFormat = options.useBinaryFormat ?? false;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: PartialMessage<I>
    ): Promise<UnaryResponse<O>> {
      const { normalize, serialize, parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        options.jsonOptions,
        options.binaryOptions
      );
      try {
        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method).toString(),
            init: {},
            header: grpcCreateRequestHeader(useBinaryFormat, timeoutMs, header),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },
          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            const envelope = encodeEnvelope(
              messageFlag,
              serialize(req.message)
            );
            const encoding = useBinaryFormat ? "binary" : "utf8";
            const response = await makeNodeRequest({
              req,
              payload: envelope,
              encoding,
              httpOptions: options.httpOptions,
            });

            const responseHeaders = nodeHeaderToWebHeader(response.headers);
            assert(
              typeof response.statusCode == "number",
              "http1 client response is missing status code"
            );
            validateResponse(
              useBinaryFormat,
              response.statusCode,
              responseHeaders
            );

            const messageResult = await readEnvelope(response);
            const trailer = mapResponseTrailers(response.trailers);
            validateGrpcStatus(trailer);

            if (messageResult.done) {
              throw "premature eof";
            }

            const eofResult = await readEnvelope(response);
            if (!eofResult.done) {
              throw "extraneous data";
            }

            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header: responseHeaders,
              message: parse(messageResult.value.data),
              trailer,
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromNodeReason(e);
      }
    },
  };
}

function makeNodeRequest(options: NodeRequestOptions) {
  return new Promise<http.IncomingMessage>((resolve, reject) => {
    const endpoint = new URL(options.req.url);
    const nodeRequestFn = nodeRequest(endpoint.protocol);
    const request = nodeRequestFn(options.req.url, {
      headers: webHeaderToNodeHeaders(options.req.header),
      method: "POST",
      path: endpoint.pathname,
      signal: options.req.signal,
      ...options.httpOptions,
    });

    request.on("error", (err) => {
      reject(`request failed ${String(err)}`);
    });

    request.on("response", (res) => {
      return resolve(res);
    });

    request.write(options.payload, options.encoding);
    request.end();
  });
}

function nodeRequest(protocol: string) {
  if (protocol.startsWith("http") || protocol.startsWith("https")) {
    return protocol.includes("https") ? https.request : http.request;
  }
  throw new Error("Unsupported protocol");
}

function validateGrpcStatus(headerOrTrailer: Headers) {
  const err = grpcFindTrailerError(headerOrTrailer);
  if (err) {
    throw err;
  }
}

function validateResponse(
  binaryFormat: boolean,
  status: number,
  headers: Headers
) {
  const code = grpcCodeFromHttpStatus(status);
  if (code != null) {
    throw new ConnectError(
      decodeURIComponent(headers.get("grpc-message") ?? `HTTP ${status}`),
      code
    );
  }
  grpcExpectContentType(binaryFormat, headers.get("Content-Type"));
  validateGrpcStatus(headers);
}

function mapResponseTrailers(
  trailers: http.IncomingMessage["trailers"]
): Headers {
  const t = new Headers();
  Object.keys(trailers).forEach((key: string) => {
    t.set(key, trailers[key] ?? "");
  });

  return t;
}
