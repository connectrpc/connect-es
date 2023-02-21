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
import {
  Compression,
  createAsyncIterable,
  createMethodSerializationLookup,
  createMethodUrl,
  pipe,
  pipeTo,
  sinkAllBytes,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformNormalizeMessage,
  transformParseEnvelope,
  transformSerializeEnvelope,
  transformSplitEnvelope,
} from "@bufbuild/connect/protocol";
import {
  appendHeaders,
  Code,
  ConnectError,
  Interceptor,
  runStreaming,
  runUnary,
  StreamRequest,
  StreamResponse,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect";
import {
  createEndStreamSerialization,
  requestHeaderWithCompression,
  endStreamFlag,
  errorFromJsonBytes,
  headerUnaryContentLength,
  headerUnaryEncoding,
  trailerDemux,
  validateResponseWithCompression,
} from "@bufbuild/connect/protocol-connect";
import {
  NodeHttp1TransportOptions,
  NodeHttp2TransportOptions,
  validateNodeTransportOptions,
} from "./validate-node-transport-options.js";

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
    ): Promise<UnaryResponse<I, O>> {
      const serialization = createMethodSerializationLookup(
        method,
        options.binaryOptions,
        options.jsonOptions,
        opt
      );
      return await runUnary<I, O>(
        {
          stream: false,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {},
          header: requestHeaderWithCompression(
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
        async (req: UnaryRequest<I, O>): Promise<UnaryResponse<I, O>> => {
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
            signal: req.signal,
            body: createAsyncIterable([requestBody]),
          });
          const { compression, isUnaryError, unaryError } =
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
          if (isUnaryError) {
            throw errorFromJsonBytes(
              responseBody,
              appendHeaders(header, trailer),
              unaryError
            );
          }
          return <UnaryResponse<I, O>>{
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
      header: HeadersInit | undefined,
      input: AsyncIterable<I>
    ): Promise<StreamResponse<I, O>> {
      const serialization = createMethodSerializationLookup(
        method,
        options.binaryOptions,
        options.jsonOptions,
        opt
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
          header: requestHeaderWithCompression(
            method.kind,
            opt.useBinaryFormat,
            timeoutMs,
            header,
            opt.acceptCompression,
            opt.sendCompression
          ),
          message: pipe(input, transformNormalizeMessage(method.I), {
            propagateDownStreamError: true,
          }),
        },
        // eslint-disable-next-line @typescript-eslint/require-await
        async (req: StreamRequest<I, O>) => {
          const uRes = await opt.client({
            url: req.url,
            method: "POST",
            header: req.header,
            signal: req.signal,
            body: pipe(
              req.message,
              transformNormalizeMessage(method.I),
              transformSerializeEnvelope(
                serialization.getI(opt.useBinaryFormat)
              ),
              transformCompressEnvelope(
                opt.sendCompression,
                opt.compressMinBytes
              ),
              transformJoinEnvelopes(),
              { propagateDownStreamError: true }
            ),
          });
          const { compression } = validateResponseWithCompression(
            method.kind,
            opt.useBinaryFormat,
            opt.acceptCompression,
            uRes.status,
            uRes.header
          );
          const res: StreamResponse<I, O> = {
            ...req,
            header: uRes.header,
            trailer: new Headers(),
            message: pipe(
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
                      throw new ConnectError(
                        "protocol error: received extra EndStreamResponse",
                        Code.InvalidArgument
                      );
                    }
                    endStreamReceived = true;
                    if (chunk.value.error) {
                      throw chunk.value.error;
                    }
                    chunk.value.metadata.forEach((value, key) =>
                      res.trailer.set(key, value)
                    );
                    continue;
                  }
                  if (endStreamReceived) {
                    throw new ConnectError(
                      "protocol error: received extra message after EndStreamResponse",
                      Code.InvalidArgument
                    );
                  }
                  yield chunk.value;
                }
                if (!endStreamReceived) {
                  throw new ConnectError(
                    "protocol error: missing EndStreamResponse",
                    Code.InvalidArgument
                  );
                }
              },
              { propagateDownStreamError: true }
            ),
          };
          return res;
        },
        options.interceptors
      );
    },
  };
}
