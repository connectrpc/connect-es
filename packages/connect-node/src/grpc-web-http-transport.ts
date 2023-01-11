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

import {
  ConnectError,
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  Interceptor,
  runStreaming,
  runUnary,
  StreamingConn,
  StreamingRequest,
  Transport,
  UnaryRequest,
  UnaryResponse,
  Code,
  Compression,
  compressedFlag,
} from "@bufbuild/connect-core";
import { validateTrailer } from "@bufbuild/connect-core/protocol-grpc";
import {
  trailerParse,
  trailerFlag,
} from "@bufbuild/connect-core/protocol-grpc-web";
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
import type * as http from "http";
import type * as https from "https";
import { nodeHeaderToWebHeader } from "./private/web-header-to-node-headers.js";
import { connectErrorFromNodeReason } from "./private/node-error.js";
import { end, readEnvelope, write } from "./private/io.js";
import { assert } from "./private/assert.js";
import { defer } from "./private/defer.js";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { compressionBrotli, compressionGzip } from "./compression.js";
import { validateReadMaxBytesOption } from "./private/validate-read-max-bytes-option.js";
import {
  grpcWebCreateRequestHeaderWithCompression,
  grpcWebValidateResponseWithCompression,
} from "./grpc-web-http2-transport.js";
import { getNodeRequest, makeNodeRequest } from "./private/node-request.js";

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
  httpOptions?:
    | Omit<http.RequestOptions, "signal">
    | Omit<https.RequestOptions, "signal">;

  // TODO document
  acceptCompression?: Compression[];
  sendCompression?: Compression;
  compressMinBytes?: number;
  readMaxBytes?: number;
  sendMaxBytes?: number;
}

/**
 * Create a Transport for the gRPC-web protocol using the
 * Node.js `http` or `https package.
 *
 */
export function createGrpcWebHttpTransport(
  options: GrpcWebHttpTransportOptions
): Transport {
  const useBinaryFormat = options.useBinaryFormat ?? false;
  const readMaxBytes = validateReadMaxBytesOption(options.readMaxBytes);
  const compressMinBytes = options.compressMinBytes ?? 0;
  const acceptCompression = options.acceptCompression ?? [
    compressionGzip,
    compressionBrotli,
  ];
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
            url: createMethodUrl(options.baseUrl, service, method),
            init: {},
            header: grpcWebCreateRequestHeaderWithCompression(
              method.kind,
              useBinaryFormat,
              timeoutMs,
              header,
              acceptCompression.map((c) => c.name),
              options.sendCompression?.name
            ),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },

          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            let flag = 0;
            let body = serialize(req.message);

            if (
              options.sendCompression !== undefined &&
              body.length >= compressMinBytes
            ) {
              body = await options.sendCompression.compress(body);
              flag = compressedFlag;
              req.header.set("Grpc-Encoding", options.sendCompression.name);
            } else {
              req.header.delete("Grpc-Encoding");
            }

            const envelope = encodeEnvelope(flag, body);
            const response = await makeNodeRequest({
              req,
              payload: envelope,
              httpOptions: options.httpOptions,
            });

            const responseHeaders = nodeHeaderToWebHeader(response.headers);
            assert(
              typeof response.statusCode == "number",
              "http1 client response is missing status code"
            );
            const { compression } = grpcWebValidateResponseWithCompression(
              useBinaryFormat,
              acceptCompression,
              response.statusCode,
              responseHeaders
            );

            const messageOrTrailerResult = await readEnvelope(response);
            if (messageOrTrailerResult.done) {
              throw "premature eof";
            }
            let messageOrTrailerData = messageOrTrailerResult.value.data;
            if (
              (messageOrTrailerResult.value.flags & compressedFlag) ===
              compressedFlag
            ) {
              if (!compression) {
                throw new ConnectError(
                  `received compressed envelope, but no grpc-encoding`,
                  Code.InvalidArgument
                );
              }
              messageOrTrailerData = await compression.decompress(
                messageOrTrailerData,
                readMaxBytes
              );
            }

            if (
              (messageOrTrailerResult.value.flags & trailerFlag) ===
              trailerFlag
            ) {
              // Unary responses require exactly one response message, but in
              // case of an error, it is perfectly valid to have a response body
              // that only contains error trailers.
              validateTrailer(trailerParse(messageOrTrailerData));
              // At this point, we received trailers only, but the trailers did
              // not have an error status code.
              throw "unexpected trailer";
            }

            const trailerResult = await readEnvelope(response);
            if (trailerResult.done) {
              throw "missing trailer";
            }
            let trailerResultData = trailerResult.value.data;
            if (
              (trailerResult.value.flags & compressedFlag) ===
              compressedFlag
            ) {
              if (!compression) {
                throw new ConnectError(
                  `received compressed envelope, but no grpc-encoding`,
                  Code.InvalidArgument
                );
              }
              trailerResultData = await compression.decompress(
                trailerResultData,
                readMaxBytes
              );
            }

            const trailer = trailerParse(trailerResultData);
            validateTrailer(trailer);

            const eofResult = await readEnvelope(response);
            if (!eofResult.done) {
              throw "extraneous data";
            }

            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header: responseHeaders,
              message: parse(messageOrTrailerData),
              trailer,
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromNodeReason(e);
      }
    },
    async stream<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined
    ): Promise<StreamingConn<I, O>> {
      const { normalize, serialize, parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        options.jsonOptions,
        options.binaryOptions
      );
      return runStreaming<I, O>(
        {
          stream: true,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {
            method: "POST",
            redirect: "error",
            mode: "cors",
          },
          signal: signal ?? new AbortController().signal,
          header: grpcWebCreateRequestHeaderWithCompression(
            method.kind,
            useBinaryFormat,
            timeoutMs,
            header,
            acceptCompression.map((c) => c.name),
            options.sendCompression?.name
          ),
        },
        async (req: StreamingRequest<I, O>) => {
          try {
            const stream = await getNodeRequest(req, options.httpOptions);
            const responsePromise = new Promise<http.IncomingMessage>(
              (resolve) => {
                stream.on("response", (res) => resolve(res));
              }
            );
            let endStreamReceived = false;
            let messageReceived = false;
            const responseTrailer = defer<Headers>();
            const responseHeader = responsePromise.then((res) =>
              nodeHeaderToWebHeader(res.headers)
            );
            const conn: StreamingConn<I, O> = {
              ...req,
              responseHeader,
              responseTrailer,
              closed: false,
              async send(message: PartialMessage<I>) {
                if (stream.writableEnded) {
                  throw new ConnectError(
                    "cannot send, stream is already closed"
                  );
                }

                let flags = 0;
                let body = serialize(normalize(message));
                if (
                  options.sendCompression &&
                  body.length >= compressMinBytes
                ) {
                  flags = flags | compressedFlag;
                  body = await options.sendCompression.compress(body);
                }

                const enveloped = encodeEnvelope(flags, body);
                try {
                  await write(stream, enveloped);
                } catch (e) {
                  throw connectErrorFromNodeReason(e);
                }
              },
              async close(): Promise<void> {
                if (stream.writableEnded) {
                  throw new ConnectError(
                    "cannot close, stream is already closed"
                  );
                }
                this.closed = true;
                await end(stream);
              },
              async read(): Promise<ReadableStreamReadResultLike<O>> {
                const response = await responsePromise;
                const responseHeader = nodeHeaderToWebHeader(response.headers);
                assert(
                  typeof response.statusCode == "number",
                  "http1 client response is missing status code"
                );
                const { compression } = grpcWebValidateResponseWithCompression(
                  useBinaryFormat,
                  acceptCompression,
                  response.statusCode,
                  responseHeader
                );

                try {
                  const result = await readEnvelope(response);
                  if (result.done) {
                    if (messageReceived && !endStreamReceived) {
                      throw new ConnectError("missing trailers");
                    }
                    return {
                      done: true,
                      value: undefined,
                    };
                  }

                  const flags = result.value.flags;
                  let data = result.value.data;

                  if ((flags & compressedFlag) === compressedFlag) {
                    if (!compression) {
                      throw new ConnectError(
                        `received compressed envelope, but no grpc-encoding`,
                        Code.InvalidArgument
                      );
                    }
                    data = await compression.decompress(data, readMaxBytes);
                  }

                  if ((flags & trailerFlag) === trailerFlag) {
                    endStreamReceived = true;
                    const trailer = trailerParse(data);
                    validateTrailer(trailer);
                    responseTrailer.resolve(trailer);
                    return {
                      done: true,
                      value: undefined,
                    };
                  }
                  messageReceived = true;
                  return {
                    done: false,
                    value: parse(data),
                  };
                } catch (e) {
                  throw connectErrorFromNodeReason(e);
                }
              },
            };
            return conn;
          } catch (e) {
            throw connectErrorFromNodeReason(e);
          }
        },
        options.interceptors
      );
    },
  };
}
