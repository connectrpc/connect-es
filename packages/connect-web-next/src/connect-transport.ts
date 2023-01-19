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
  JsonValue,
  JsonWriteOptions,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type {
  Interceptor,
  StreamingConn,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect-core";
import {
  appendHeaders,
  Code,
  ConnectError,
  connectErrorFromReason,
  createClientMethodSerializers,
  createEnvelopeReadableStream,
  createMethodUrl,
  encodeEnvelopes,
  EnvelopedMessage,
  runStreaming,
  runUnary,
} from "@bufbuild/connect-core";
import {
  createRequestHeader,
  endStreamFlag,
  endStreamFromJson,
  errorFromJson,
  trailerDemux,
  validateResponse,
} from "@bufbuild/connect-core/protocol-connect";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { assertFetchApi } from "./assert-fetch-api.js";
import { defer } from "./defer.js";

const FETCH = typeof fetch !== "undefined" ? fetch : undefined;


/**
 * Options used to configure the Connect transport.
 *
 * See createConnectTransport().
 */
export interface ConnectTransportOptions {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "https://example.com/my-api"`
   *
   * This will make a `POST /my-api/my_package.MyService/Foo` to
   * `example.com` via HTTPS.
   *
   * If your API is served from the same domain as your site, use
   * `baseUrl: window.location.origin` or simply "/".
   */
  baseUrl: string;

  /**
   * By default, connect-web clients use the JSON format.
   */
  useBinaryFormat?: boolean;

  /**
   * Controls what the fetch client will do with credentials, such as
   * Cookies. The default value is "same-origin". For reference, see
   * https://fetch.spec.whatwg.org/#concept-request-credentials-mode
   */
  credentials?: RequestCredentials;

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
   * The fetch instance to use. Defaults to the global fetch.
   */
  fetch?: typeof fetch;
}

/**
 * Create a Transport for the Connect protocol, which makes unary and
 * server-streaming methods available to web browsers. It uses the fetch
 * API to make HTTP requests.
 */
export function createConnectTransport(
  options: ConnectTransportOptions
): Transport {
  assertFetchApi();
  const fetch = options.fetch ?? FETCH;
  if (fetch == undefined) {
    throw new Error("fetch is not available");
  }
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
      const createConnectRequestHeader = createRequestHeader.bind(
        null,
        method.kind,
        useBinaryFormat
      );
      try {
        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method),
            init: {
              method: "POST",
              credentials: options.credentials ?? "same-origin",
              redirect: "error",
              mode: "cors",
            },
            header: createConnectRequestHeader(timeoutMs, header),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },
          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            const response = await fetch(req.url, {
              ...req.init,
              headers: req.header,
              signal: req.signal,
              body: serialize(req.message),
            });
            const { isConnectUnaryError } = validateResponse(
              method.kind,
              useBinaryFormat,
              response.status,
              response.headers
            );
            if (isConnectUnaryError) {
              throw errorFromJson(
                (await response.json()) as JsonValue,
                appendHeaders(...trailerDemux(response.headers))
              );
            }
            const [demuxedHeader, demuxedTrailer] = trailerDemux(
              response.headers
            );
            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header: demuxedHeader,
              message: parse(new Uint8Array(await response.arrayBuffer())),
              trailer: demuxedTrailer,
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromReason(e, Code.Internal);
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
      const createConnectRequestHeader = createRequestHeader.bind(
        null,
        method.kind,
        useBinaryFormat
      );
      return runStreaming<I, O>(
        {
          stream: true,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {
            method: "POST",
            credentials: options.credentials ?? "same-origin",
            redirect: "error",
            mode: "cors",
          },
          signal: signal ?? new AbortController().signal,
          header: createConnectRequestHeader(timeoutMs, header),
        },
        async (req) => {
          const pendingSend: EnvelopedMessage[] = [];
          const responseHeader = defer<Headers>();
          const responseReader =
            defer<ReadableStreamDefaultReader<EnvelopedMessage>>();
          const responseTrailer = defer<Headers>();
          let endStreamReceived = false;
          const conn: StreamingConn<I, O> = {
            stream: true,
            service,
            method,
            responseHeader,
            responseTrailer,
            closed: false,
            send(message: PartialMessage<I>): Promise<void> {
              if (this.closed) {
                return Promise.reject(
                  new ConnectError("cannot send, stream is already closed")
                );
              }
              pendingSend.push({
                flags: 0b00000000,
                data: serialize(normalize(message)),
              });
              return Promise.resolve();
            },
            close(): Promise<void> {
              if (this.closed) {
                return Promise.reject(
                  new ConnectError("cannot close, stream is already closed")
                );
              }
              this.closed = true;
              (async () => {
                const response = await fetch(req.url, {
                  ...req.init,
                  headers: req.header,
                  signal: req.signal,
                  body: encodeEnvelopes(...pendingSend),
                });
                validateResponse(
                  method.kind,
                  useBinaryFormat,
                  response.status,
                  response.headers
                );
                responseHeader.resolve(response.headers);
                if (response.body === null) {
                  throw "missing response body";
                }
                responseReader.resolve(
                  createEnvelopeReadableStream(response.body).getReader()
                );
              })().catch((reason) => {
                const e = connectErrorFromReason(reason);
                responseHeader.reject(e);
                responseReader.reject(e);
                responseTrailer.reject(e);
              });
              return Promise.resolve();
            },
            async read(): Promise<ReadableStreamReadResultLike<O>> {
              try {
                const reader = await responseReader;
                const result = await reader.read();
                if (result.done) {
                  if (!endStreamReceived) {
                    throw new ConnectError("missing EndStreamResponse");
                  }
                  return {
                    done: true,
                    value: undefined,
                  };
                }
                if ((result.value.flags & endStreamFlag) === endStreamFlag) {
                  endStreamReceived = true;
                  const endStream = endStreamFromJson(result.value.data);
                  responseTrailer.resolve(endStream.metadata);
                  if (endStream.error) {
                    throw endStream.error;
                  }
                  return {
                    done: true,
                    value: undefined,
                  };
                }
                return {
                  done: false,
                  value: parse(result.value.data),
                };
              } catch (e) {
                throw connectErrorFromReason(e);
              }
            },
          };
          return Promise.resolve(conn);
        },
        options.interceptors
      );
    },
  };
}
