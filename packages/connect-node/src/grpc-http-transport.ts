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
import type * as https from "https";
import {
  Code,
  compressedFlag,
  Compression,
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
} from "@bufbuild/connect-core";
import {
  createRequestHeaderWithCompression,
  headerEncoding,
  validateResponseWithCompression,
  validateTrailer,
} from "@bufbuild/connect-core/protocol-grpc";
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
import { connectErrorFromNodeReason } from "./private/node-error.js";
import { nodeHeaderToWebHeader } from "./private/node-universal.js";
import { assert } from "./private/assert.js";
import {
  end,
  readEnvelope,
  readHttp1ResponseTrailer,
  write,
} from "./private/io.js";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { compressionGzip, compressionBrotli } from "./compression.js";
import { validateReadMaxBytesOption } from "./private/validate-read-max-bytes-option.js";

import { getNodeRequest, makeNodeRequest } from "./private/node-request.js";

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
  httpOptions?:
    | Omit<http.RequestOptions, "signal">
    | Omit<https.RequestOptions, "signal">;

  // TODO document
  acceptCompression?: Compression[];
  sendCompression?: Compression;
  compressMinBytes?: number;
  readMaxBytes?: number;
  writeMaxBytes?: number;
}

/**
 * Create a Transport for the gRPC protocol using the
 * Node.js `http` or `https package.
 *
 */
export function createGrpcHttpTransport(
  options: GrpcHttpTransportOptions
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
            url: createMethodUrl(options.baseUrl, service, method),
            init: {},
            header: createRequestHeaderWithCompression(
              useBinaryFormat,
              timeoutMs,
              header,
              acceptCompression,
              options.sendCompression
            ),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },
          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            let flags = 0;
            let body = serialize(req.message);
            if (
              options.sendCompression !== undefined &&
              body.length >= compressMinBytes
            ) {
              body = await options.sendCompression.compress(body);
              flags = compressedFlag;
            } else {
              req.header.delete(String(headerEncoding));
            }

            const envelope = encodeEnvelope(flags, body);
            const response = await makeNodeRequest({
              req,
              payload: envelope,
              httpOptions: options.httpOptions,
            });

            const responseHeaders = nodeHeaderToWebHeader(response.headers);
            const trailerPromise = readHttp1ResponseTrailer(response);
            assert(
              typeof response.statusCode == "number",
              "http1 client response is missing status code"
            );
            const { compression } = validateResponseWithCompression(
              useBinaryFormat,
              acceptCompression,
              response.statusCode,
              responseHeaders
            );

            const messageResult = await readEnvelope(response);
            const eofResult = await readEnvelope(response);
            if (!eofResult.done) {
              throw "extraneous data";
            }

            const trailer = await trailerPromise;
            validateTrailer(trailer);

            if (messageResult.done) {
              throw "premature eof";
            }
            let messageData = messageResult.value.data;
            if (
              (messageResult.value.flags & compressedFlag) ===
              compressedFlag
            ) {
              if (!compression) {
                throw new ConnectError(
                  `received compressed envelope, but no grpc-encoding`,
                  Code.InvalidArgument
                );
              }
              messageData = await compression.decompress(
                messageData,
                readMaxBytes
              );
            }

            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header: responseHeaders,
              message: parse(messageData),
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
          header: createRequestHeaderWithCompression(
            useBinaryFormat,
            timeoutMs,
            header,
            acceptCompression,
            options.sendCompression
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
            const responseTrailer = responsePromise.then((res) =>
              readHttp1ResponseTrailer(res)
            );
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
                  options.sendCompression !== undefined &&
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
              async close() {
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
                assert(
                  typeof response.statusCode == "number",
                  "http1 client response is missing status code"
                );
                const { compression } = validateResponseWithCompression(
                  useBinaryFormat,
                  acceptCompression,
                  response.statusCode,
                  await responseHeader
                );

                try {
                  const result = await readEnvelope(response);
                  if (result.done) {
                    const trailer = await responseTrailer;
                    validateTrailer(trailer);
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
