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
  appendHeaders,
  Code,
  connectCreateRequestHeader,
  connectEndStreamFlag,
  connectEndStreamFromJson,
  ConnectError,
  connectErrorFromJson,
  connectTrailerDemux,
  connectValidateResponse,
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
import { MethodKind } from "@bufbuild/protobuf";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import * as http2 from "http2";
import { webHeaderToNodeHeaders } from "./private/web-header-to-node-headers.js";
import { defer } from "./private/defer.js";
import {
  end,
  jsonParse,
  readEnvelope,
  readResponseHeader,
  readToEnd,
  write,
} from "./private/io.js";
import { connectErrorFromNodeReason } from "./private/node-error.js";
import type { Compression } from "./compression.js";
import { compressionBrotli, compressionGzip } from "./compression.js";
import { validateReadMaxBytesOption } from "./private/validate-read-max-bytes-option.js";

const messageFlag = 0b00000000;
/**
 * compressedFlag indicates that the data in a EnvelopedMessage is
 * compressed. It has the same meaning in the gRPC-Web, gRPC-HTTP2,
 * and Connect protocols.
 */
const compressedFlag = 0b00000001;

/**
 * Options used to configure the Connect transport.
 */
export interface ConnectHttp2TransportOptions {
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
   * By default, connect-node clients use the binary format.
   */
  useBinaryFormat?: boolean;

  // TODO document
  http2Options?: http2.ClientSessionOptions | http2.SecureClientSessionOptions;

  // TODO document
  acceptCompression?: Compression[];
  sendCompression?: Compression;
  compressMinBytes?: number;
  readMaxBytes?: number;
  sendMaxBytes?: number;

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
}

/**
 * Create a Transport for the Connect protocol using the Node.js `http2`
 * package.
 */
export function createConnectHttp2Transport(
  options: ConnectHttp2TransportOptions
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
            header: connectCreateRequestHeaderWithCompression(
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

            // TODO(TCN-785) honor sendMaxBytes
            let requestBody = serialize(req.message);
            if (
              options.sendCompression !== undefined &&
              requestBody.length >= compressMinBytes
            ) {
              requestBody = await options.sendCompression.compress(requestBody);
              req.header.set("Content-Encoding", options.sendCompression.name);
            } else {
              req.header.delete("Content-Encoding");
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
            const headerPromise = readResponseHeader(stream);
            await write(stream, requestBody);
            await end(stream);
            const [responseStatus, responseHeader] = await headerPromise;
            const { compression, isConnectUnaryError } =
              connectValidateResponseWithCompression(
                method.kind,
                useBinaryFormat,
                acceptCompression,
                responseStatus,
                responseHeader
              );
            let responseBody = await readToEnd(stream); // TODO(TCN-785) honor readMaxBytes
            if (compression) {
              responseBody = await compression.decompress(
                responseBody,
                readMaxBytes
              );
            }
            if (isConnectUnaryError) {
              throw connectErrorFromJson(
                jsonParse(responseBody),
                appendHeaders(...connectTrailerDemux(responseHeader))
              );
            }
            const responseMessage = parse(responseBody);
            const [header, trailer] = connectTrailerDemux(responseHeader);
            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header,
              message: responseMessage,
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
          header: connectCreateRequestHeaderWithCompression(
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
                const s = http2.connect(
                  // Userinfo (user ID and password), path, querystring, and fragment details in the URL will be ignored.
                  // See https://nodejs.org/api/http2.html#http2connectauthority-options-listener
                  req.url,
                  options.http2Options,
                  (s) => resolve(s)
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
            const headersPromise = readResponseHeader(stream);
            let endStreamReceived = false;
            const responseTrailer = defer<Headers>();
            const conn: StreamingConn<I, O> = {
              ...req,
              responseHeader: headersPromise.then(([, header]) => header),
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
                const [responseStatus, responseHeader] = await headersPromise;
                const { compression } = connectValidateResponseWithCompression(
                  method.kind,
                  useBinaryFormat,
                  acceptCompression,
                  responseStatus,
                  responseHeader
                );
                try {
                  const result = await readEnvelope(stream);
                  if (result.done) {
                    if (!endStreamReceived) {
                      throw new ConnectError("missing EndStreamResponse");
                    }
                    return {
                      done: true,
                    };
                  }
                  const flags = result.value.flags;
                  let data = result.value.data;
                  if ((flags & compressedFlag) === compressedFlag) {
                    if (!compression) {
                      throw new ConnectError(
                        `received compressed envelope, but no content-encoding`,
                        Code.InvalidArgument
                      );
                    }
                    data = await compression.decompress(data, readMaxBytes);
                  }
                  if ((flags & connectEndStreamFlag) === connectEndStreamFlag) {
                    endStreamReceived = true;
                    const endStream = connectEndStreamFromJson(data);
                    responseTrailer.resolve(endStream.metadata);
                    if (endStream.error) {
                      throw endStream.error;
                    }
                    return {
                      done: true,
                    };
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

function connectCreateRequestHeaderWithCompression(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined,
  acceptCompression: string[],
  sendCompression: string | undefined
): Headers {
  const result = connectCreateRequestHeader(
    methodKind,
    useBinaryFormat,
    timeoutMs,
    userProvidedHeaders
  );
  let acceptEncodingField = "Accept-Encoding";
  if (methodKind != MethodKind.Unary) {
    acceptEncodingField = "Connect-" + acceptEncodingField;
    if (sendCompression != undefined) {
      result.set("Connect-Content-Encoding", sendCompression);
    }
  }
  if (acceptCompression.length > 0) {
    result.set(acceptEncodingField, acceptCompression.join(","));
  }
  return result;
}

function connectValidateResponseWithCompression(
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  acceptCompression: Compression[],
  status: number,
  headers: Headers
): { compression: Compression | undefined; isConnectUnaryError: boolean } {
  let compression: Compression | undefined;
  const encodingField =
    methodKind == MethodKind.Unary
      ? "Content-Encoding"
      : "Connect-Content-Encoding";
  const encoding = headers.get(encodingField);
  if (encoding != null && encoding.toLowerCase() !== "identity") {
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
    ...connectValidateResponse(methodKind, useBinaryFormat, status, headers),
  };
}
