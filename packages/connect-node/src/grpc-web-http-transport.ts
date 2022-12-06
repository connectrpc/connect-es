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

import {
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  grpcFindTrailerError,
  grpcWebCreateRequestHeader,
  grpcWebTrailerParse,
  Interceptor,
  runUnary,
  // Transport,
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
import * as http from "http";
import * as https from "https";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import { connectErrorFromNodeReason } from "./private/connect-error-from-node.js";
import { readEnvelope } from "./private/io.js";

export interface GrpcWebHttpTransportOptions {
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

const messageFlag = 0b00000000;
const trailerFlag = 0b10000000;

//Partial<Transport>
/**
 * Create a Transport for the gRPC-web protocol on Http and Https.
 *
 */
export function createGrpcWebHttpTransport(
  options: GrpcWebHttpTransportOptions
): any {
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
      //Promise<UnaryResponse<O>>
    ): Promise<any> {
      try {
        const { normalize, serialize, parse } = createClientMethodSerializers(
          method,
          useBinaryFormat,
          options.jsonOptions,
          options.binaryOptions
        );
        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method).toString(),
            init: {},
            header: grpcWebCreateRequestHeader(
              useBinaryFormat,
              timeoutMs,
              header
            ),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },

          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            const endpoint = new URL(req.url);

            if (endpoint.protocol.includes("https")) {
              throw new Error("Invalid protocol, must use https not http");
            }

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
            // validateResponse(useBinaryFormat, responseCode, responseHeader);
            const messageOrTrailerResult = await readEnvelope(response);

            if (messageOrTrailerResult.done) {
              throw "premature eof";
            }

            if (messageOrTrailerResult.value.flags === trailerFlag) {
              // Unary responses require exactly one response message, but in
              // case of an error, it is perfectly valid to have a response body
              // that only contains error trailers.
              validateGrpcStatus(
                grpcWebTrailerParse(messageOrTrailerResult.value.data)
              );
              // At this point, we received trailers only, but the trailers did
              // not have an error status code.
              throw "unexpected trailer";
            }

            const trailerResult = await readEnvelope(response);

            if (trailerResult.done) {
              throw "missing trailer";
            }
            if (trailerResult.value.flags !== trailerFlag) {
              throw "missing trailer";
            }

            const trailer = grpcWebTrailerParse(trailerResult.value.data);
            validateGrpcStatus(trailer);

            const eofResult = await readEnvelope(response);
            if (!eofResult.done) {
              throw "extraneous data";
            }

            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header: responseHeaders,
              message: parse(messageOrTrailerResult.value.data),
              trailer,
            };
          }
        );
      } catch (e) {
        throw connectErrorFromNodeReason(e);
      }
    },
  };
}

function makeNodeRequest(options: any) {
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
