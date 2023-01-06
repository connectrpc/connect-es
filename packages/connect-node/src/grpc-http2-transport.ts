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
  Code,
  ConnectError,
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  grpcCreateRequestHeader,
  grpcValidateResponse,
  grpcValidateTrailer,
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
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodInfo,
  MethodKind,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import * as http2 from "http2";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { defer } from "./private/defer.js";
import {
  end,
  readEnvelope,
  readResponseHeader,
  readResponseTrailer,
  write,
} from "./private/io.js";
import { webHeaderToNodeHeaders } from "./private/web-header-to-node-headers.js";
import { connectErrorFromNodeReason } from "./private/node-error.js";
import {
  compressedFlag,
  Compression,
  compressionBrotli,
  compressionGzip,
} from "./compression.js";
import { validateReadMaxBytesOption } from "./private/validate-read-max-bytes-option.js";

const messageFlag = 0b00000000;

/**
 * Options used to configure the gRPC-web transport.
 *
 * See createGrpcHttp2Transport().
 */
export interface GrpcHttp2TransportOptions {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "https://example.com/my-api"`
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

  // TODO document
  http2Options?: http2.ClientSessionOptions | http2.SecureClientSessionOptions;

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

  // TODO document
  acceptCompression?: Compression[];
  sendCompression?: Compression;
  compressMinBytes?: number;
  readMaxBytes?: number;
  sendMaxBytes?: number;
}

/**
 * Create a Transport for the gRPC protocol using the Node.js `http2` package.
 */
export function createGrpcHttp2Transport(
  options: GrpcHttp2TransportOptions
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
            header: grpcCreateRequestHeaderWithCompression(
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
            // TODO(TCN-884) We create a new session for every request - we should share a connection instead,
            //      and offer control over connection state via methods / properties on the transport.
            const session: http2.ClientHttp2Session =
              await new Promise<http2.ClientHttp2Session>((resolve, reject) => {
                const s = http2.connect(
                  // Userinfo (user ID and password), path, querystring, and fragment details in the URL will be ignored.
                  // See https://nodejs.org/api/http2.html#http2connectauthority-options-listener
                  req.url,
                  options.http2Options,
                  (s) => resolve(s)
                );
                s.on("error", (err) => reject(err));
              });

            let flag = messageFlag;
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

            const stream = session.request(
              {
                ...webHeaderToNodeHeaders(req.header),
                ":method": "POST",
                ":path": new URL(req.url).pathname,
              },
              {
                signal: req.signal,
              }
            );

            const headersPromise = readResponseHeader(stream);
            const trailerPromise = readResponseTrailer(stream);
            const enveloped = encodeEnvelope(flag, body);
            await write(stream, enveloped);
            await end(stream);

            const [responseCode, responseHeader] = await headersPromise;
            const { compression } = grpcValidateResponseWithCompression(
              useBinaryFormat,
              acceptCompression,
              responseCode,
              responseHeader
            );
            const messageResult = await readEnvelope(stream);
            const eofResult = await readEnvelope(stream);
            if (!eofResult.done) {
              throw "extraneous data";
            }

            const trailer = await trailerPromise;
            grpcValidateTrailer(trailer);

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
              header: responseHeader,
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
          header: grpcCreateRequestHeaderWithCompression(
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
            // TODO(TCN-884) We create a new session for every request - we should share a connection instead,
            //      and offer control over connection state via methods / properties on the transport.
            const session: http2.ClientHttp2Session =
              await new Promise<http2.ClientHttp2Session>((resolve, reject) => {
                const s = http2.connect(req.url, options.http2Options, (s) =>
                  resolve(s)
                );
                s.on("error", (err) => reject(err));
              });
            const stream = session.request(
              {
                ...webHeaderToNodeHeaders(req.header),
                ":method": "POST",
                ":path": new URL(req.url).pathname,
              },
              {
                signal: req.signal,
              }
            );
            const headerPromise = readResponseHeader(stream);
            const trailerPromise = readResponseTrailer(stream);
            const responseTrailer = defer<Headers>();
            const conn: StreamingConn<I, O> = {
              ...req,
              responseHeader: headerPromise.then(([, header]) => header),
              responseTrailer,
              closed: false,
              async send(message: PartialMessage<I>): Promise<void> {
                if (stream.writableEnded) {
                  throw new ConnectError(
                    "cannot send, stream is already closed"
                  );
                }
                let flags = messageFlag;
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
                const [responseStatus, responseHeader] = await headerPromise;
                const { compression } = grpcValidateResponseWithCompression(
                  useBinaryFormat,
                  acceptCompression,
                  responseStatus,
                  responseHeader
                );
                try {
                  const result = await readEnvelope(stream);
                  if (result.done) {
                    const trailer = await trailerPromise;
                    grpcValidateTrailer(trailer);
                    responseTrailer.resolve(trailer);
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
            return Promise.resolve(conn);
          } catch (e) {
            throw connectErrorFromNodeReason(e);
          }
        },
        options.interceptors
      );
    },
  };
}

export function grpcCreateRequestHeaderWithCompression(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
  acceptCompression: string[],
  sendCompression: string | undefined
): Headers {
  const result = grpcCreateRequestHeader(
    useBinaryFormat,
    timeoutMs,
    userProvidedHeaders
  );
  let acceptEncodingField = "Accept-Encoding";
  if (methodKind !== MethodKind.Unary) {
    acceptEncodingField = "GRPC-" + acceptEncodingField;
    if (sendCompression != undefined) {
      result.set("Grpc-Encoding", sendCompression);
    }
  }
  if (acceptCompression.length > 0) {
    result.set(acceptEncodingField, acceptCompression.join(","));
  }
  return result;
}

export function grpcValidateResponseWithCompression(
  useBinaryFormat: boolean,
  acceptCompression: Compression[],
  status: number,
  headers: Headers
): { compression: Compression | undefined } {
  grpcValidateResponse(useBinaryFormat, status, headers);

  let compression: Compression | undefined;
  const encodingField = "Grpc-Encoding";
  const encoding = headers.get(encodingField);
  if (encoding !== null && encoding.toLowerCase() !== "identity") {
    compression = acceptCompression.find((c) => c.name === encoding);
    if (!compression) {
      throw new ConnectError(
        `unsupported response encoding "${encoding}"`,
        Code.InvalidArgument
      );
    }
  }
  return {
    compression,
  };
}
