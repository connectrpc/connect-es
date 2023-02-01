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
  appendHeaders,
  Code,
  Compression,
  ConnectError,
  createAsyncIterable,
  createMethodSerializationLookup,
  createMethodUrl,
  createWritableIterable,
  Interceptor,
  pipe,
  pipeTo,
  runStreaming,
  runUnary,
  sinkAllBytes,
  StreamingConn,
  StreamingRequest,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformNormalizeMessage,
  transformParseEnvelope,
  transformSerializeEnvelope,
  transformSplitEnvelope,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect-core";
import {
  createEndStreamSerialization,
  createRequestHeaderWithCompression,
  endStreamFlag,
  errorFromJson,
  headerUnaryContentLength,
  headerUnaryEncoding,
  trailerDemux,
  validateResponseWithCompression,
} from "@bufbuild/connect-core/protocol-connect";
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
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { defer } from "./private/defer.js";
import { jsonParse } from "./private/io.js";
import {
  NodeHttp1TransportOptions,
  NodeHttp2TransportOptions,
  validateNodeTransportOptions,
} from "./node-transport-options.js";

/**
 * Options used to configure the Connect transport.
 *
 * See createConnectTransport().
 */
type ConnectTransportOptions = (
  | NodeHttp1TransportOptions
  | NodeHttp2TransportOptions
) & {
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
  acceptCompression?: Compression[];
  sendCompression?: Compression;
  compressMinBytes?: number;
  readMaxBytes?: number;
  writeMaxBytes?: number;

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
};

/**
 * Create a Transport for the Connect protocol using the Node.js `http`, `http2`,
 * or `http2` module.
 */
export function createConnectTransport(
  options: ConnectTransportOptions
): Transport {
  const opt = validateNodeTransportOptions(options);
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
      const serialization = createMethodSerializationLookup(
        method,
        options.binaryOptions,
        options.jsonOptions
      );
      return await runUnary<I, O>(
        {
          stream: false,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {},
          header: createRequestHeaderWithCompression(
            method.kind,
            opt.useBinaryFormat,
            timeoutMs,
            header,
            opt.acceptCompression,
            opt.sendCompression
          ),
          message:
            message instanceof method.I ? message : new method.I(message),
          signal: signal ?? new AbortController().signal,
        },
        async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
          let requestBody = serialization
            .getI(opt.useBinaryFormat)
            .serialize(req.message);
          if (
            opt.sendCompression &&
            requestBody.byteLength > opt.compressMinBytes
          ) {
            requestBody = await opt.sendCompression.compress(requestBody);
            req.header.set(headerUnaryEncoding, opt.sendCompression.name);
          } else {
            req.header.delete(headerUnaryEncoding);
          }
          const universalResponse = await opt.client({
            url: req.url,
            method: "POST",
            header: req.header,
            body: createAsyncIterable([requestBody]),
            signal: req.signal,
          });
          const { compression, isConnectUnaryError } =
            validateResponseWithCompression(
              method.kind,
              opt.useBinaryFormat,
              opt.acceptCompression,
              universalResponse.status,
              universalResponse.header
            );
          const [header, trailer] = trailerDemux(universalResponse.header);
          let responseBody = await pipeTo(
            universalResponse.body,
            sinkAllBytes(
              opt.readMaxBytes,
              universalResponse.header.get(headerUnaryContentLength)
            ),
            { propagateDownStreamError: false }
          );
          if (compression) {
            responseBody = await compression.decompress(
              responseBody,
              opt.readMaxBytes
            );
          }
          if (isConnectUnaryError) {
            throw errorFromJson(
              jsonParse(responseBody),
              appendHeaders(header, trailer)
            );
          }
          return <UnaryResponse<O>>{
            stream: false,
            service,
            method,
            header,
            message: serialization
              .getO(opt.useBinaryFormat)
              .parse(responseBody),
            trailer,
          };
        },
        options.interceptors
      );
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
      const serialization = createMethodSerializationLookup(
        method,
        options.binaryOptions,
        options.jsonOptions
      );
      const endStreamSerialization = createEndStreamSerialization(
        options.jsonOptions
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
            method.kind,
            opt.useBinaryFormat,
            timeoutMs,
            header,
            opt.acceptCompression,
            opt.sendCompression
          ),
        },
        // eslint-disable-next-line @typescript-eslint/require-await
        async (req: StreamingRequest<I, O>) => {
          const writable = createWritableIterable<PartialMessage<I>>();
          const universalResponsePromise = opt.client({
            url: req.url,
            method: "POST",
            header: req.header,
            body: pipe(
              writable,
              transformNormalizeMessage(method.I),
              transformSerializeEnvelope(
                serialization.getI(opt.useBinaryFormat),
                opt.writeMaxBytes
              ),
              transformCompressEnvelope(
                opt.sendCompression,
                opt.compressMinBytes
              ),
              transformJoinEnvelopes(),
              { propagateDownStreamError: true }
            ),
            signal: req.signal,
          });
          const responseTrailer = defer<Headers>();
          let outputIt: AsyncIterator<O> | undefined;
          const conn: StreamingConn<I, O> = {
            ...req,
            responseHeader: universalResponsePromise.then((r) => r.header),
            responseTrailer: responseTrailer,
            closed: false,
            async send(message: PartialMessage<I>): Promise<void> {
              await writable.write(message);
            },
            async close(): Promise<void> {
              await writable.close();
            },
            async read(): Promise<ReadableStreamReadResultLike<O>> {
              if (outputIt === undefined) {
                const uRes = await universalResponsePromise;
                const { compression } = validateResponseWithCompression(
                  method.kind,
                  opt.useBinaryFormat,
                  opt.acceptCompression,
                  uRes.status,
                  uRes.header
                );
                outputIt = pipe(
                  uRes.body,
                  transformSplitEnvelope(opt.readMaxBytes),
                  transformDecompressEnvelope(
                    compression ?? null,
                    opt.readMaxBytes
                  ),
                  transformParseEnvelope(
                    serialization.getO(opt.useBinaryFormat),
                    endStreamFlag,
                    endStreamSerialization
                  ),
                  async function* (iterable) {
                    let endStreamReceived = false;
                    for await (const chunk of iterable) {
                      if (chunk.end) {
                        if (endStreamReceived) {
                          const e = new ConnectError(
                            "protocol error: received extra EndStreamResponse",
                            Code.InvalidArgument
                          );
                          responseTrailer.reject(e);
                          throw e;
                        }
                        endStreamReceived = true;
                        if (chunk.value.error) {
                          throw chunk.value.error;
                        }
                        responseTrailer.resolve(chunk.value.metadata);
                        continue;
                      }
                      if (endStreamReceived) {
                        const e = new ConnectError(
                          "protocol error: received extra message after EndStreamResponse",
                          Code.InvalidArgument
                        );
                        responseTrailer.reject(e);
                        throw e;
                      }
                      yield chunk.value;
                    }
                    if (!endStreamReceived) {
                      const e = new ConnectError(
                        "protocol error: missing EndStreamResponse",
                        Code.InvalidArgument
                      );
                      responseTrailer.reject(e);
                      throw e;
                    }
                  },
                  { propagateDownStreamError: true }
                )[Symbol.asyncIterator]();
              }
              const r = await outputIt.next();
              if (r.done === true) {
                return { done: true, value: undefined };
              }
              return { done: false, value: r.value };
            },
          };
          return conn;
        },
        options.interceptors
      );
    },
  };
}
