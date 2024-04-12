// Copyright 2021-2024 The Connect Authors
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
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { Message, MethodIdempotency, MethodKind } from "@bufbuild/protobuf";
import type {
  Interceptor,
  StreamResponse,
  Transport,
  UnaryRequest,
  UnaryResponse,
  ContextValues,
} from "@connectrpc/connect";
import {
  Code,
  ConnectError,
  appendHeaders,
  createContextValues,
} from "@connectrpc/connect";
import {
  createClientMethodSerializers,
  createEnvelopeReadableStream,
  createMethodUrl,
  getJsonOptions,
  encodeEnvelope,
  runStreamingCall,
  runUnaryCall,
  compressedFlag,
} from "@connectrpc/connect/protocol";
import {
  endStreamFlag,
  endStreamFromJson,
  errorFromJson,
  requestHeader,
  trailerDemux,
  transformConnectPostToGetRequest,
  validateResponse,
} from "@connectrpc/connect/protocol-connect";
import { assertFetchApi } from "./assert-fetch-api.js";

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
   * By default, unknown fields are ignored.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  /**
   * Optional override of the fetch implementation used by the transport.
   */
  fetch?: typeof globalThis.fetch;

  /**
   * Controls whether or not Connect GET requests should be used when
   * available, on side-effect free methods. Defaults to false.
   */
  useHttpGet?: boolean;

  /**
   * The timeout in milliseconds to apply to all requests.
   *
   * This can be overridden on a per-request basis by passing a timeoutMs.
   */
  defaultTimeoutMs?: number;
}

/**
 * Create a Transport for the Connect protocol, which makes unary and
 * server-streaming methods available to web browsers. It uses the fetch
 * API to make HTTP requests.
 */
export function createConnectTransport(
  options: ConnectTransportOptions,
): Transport {
  assertFetchApi();
  const useBinaryFormat = options.useBinaryFormat ?? false;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage,
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: PartialMessage<I>,
      contextValues?: ContextValues,
    ): Promise<UnaryResponse<I, O>> {
      const { serialize, parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        options.jsonOptions,
        options.binaryOptions,
      );
      timeoutMs =
        timeoutMs === undefined
          ? options.defaultTimeoutMs
          : timeoutMs <= 0
            ? undefined
            : timeoutMs;
      return await runUnaryCall<I, O>({
        interceptors: options.interceptors,
        signal,
        timeoutMs,
        req: {
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
          header: requestHeader(
            method.kind,
            useBinaryFormat,
            timeoutMs,
            header,
            false,
          ),
          contextValues: contextValues ?? createContextValues(),
          message,
        },
        next: async (req: UnaryRequest<I, O>): Promise<UnaryResponse<I, O>> => {
          const useGet =
            options.useHttpGet === true &&
            method.idempotency === MethodIdempotency.NoSideEffects;
          let body: BodyInit | null = null;
          if (useGet) {
            req = transformConnectPostToGetRequest(
              req,
              serialize(req.message),
              useBinaryFormat,
            );
          } else {
            body = serialize(req.message);
          }
          const fetch = options.fetch ?? globalThis.fetch;
          const response = await fetch(req.url, {
            ...req.init,
            headers: req.header,
            signal: req.signal,
            body,
          });
          const { isUnaryError, unaryError } = validateResponse(
            method.kind,
            useBinaryFormat,
            response.status,
            response.headers,
          );
          if (isUnaryError) {
            throw errorFromJson(
              (await response.json()) as JsonValue,
              appendHeaders(...trailerDemux(response.headers)),
              unaryError,
            );
          }
          const [demuxedHeader, demuxedTrailer] = trailerDemux(
            response.headers,
          );

          return {
            stream: false,
            service,
            method,
            header: demuxedHeader,
            message: useBinaryFormat
              ? parse(new Uint8Array(await response.arrayBuffer()))
              : method.O.fromJson(
                  (await response.json()) as JsonValue,
                  getJsonOptions(options.jsonOptions),
                ),
            trailer: demuxedTrailer,
          };
        },
      });
    },

    async stream<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage,
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      input: AsyncIterable<PartialMessage<I>>,
      contextValues?: ContextValues,
    ): Promise<StreamResponse<I, O>> {
      const { serialize, parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        options.jsonOptions,
        options.binaryOptions,
      );

      async function* parseResponseBody(
        body: ReadableStream<Uint8Array>,
        trailerTarget: Headers,
        header: Headers,
      ) {
        const reader = createEnvelopeReadableStream(body).getReader();
        let endStreamReceived = false;
        for (;;) {
          const result = await reader.read();
          if (result.done) {
            break;
          }
          const { flags, data } = result.value;
          if ((flags & compressedFlag) === compressedFlag) {
            throw new ConnectError(
              `protocol error: recevied unsupported compressed output`,
              Code.Internal,
            );
          }
          if ((flags & endStreamFlag) === endStreamFlag) {
            endStreamReceived = true;
            const endStream = endStreamFromJson(data);
            if (endStream.error) {
              const error = endStream.error;
              header.forEach((value, key) => {
                error.metadata.append(key, value);
              });
              throw error;
            }
            endStream.metadata.forEach((value, key) =>
              trailerTarget.set(key, value),
            );
            continue;
          }
          yield parse(data);
        }
        if (!endStreamReceived) {
          throw "missing EndStreamResponse";
        }
      }

      async function createRequestBody(
        input: AsyncIterable<I>,
      ): Promise<Uint8Array> {
        if (method.kind != MethodKind.ServerStreaming) {
          throw "The fetch API does not support streaming request bodies";
        }
        const r = await input[Symbol.asyncIterator]().next();
        if (r.done == true) {
          throw "missing request message";
        }
        return encodeEnvelope(0, serialize(r.value));
      }

      timeoutMs =
        timeoutMs === undefined
          ? options.defaultTimeoutMs
          : timeoutMs <= 0
            ? undefined
            : timeoutMs;
      return await runStreamingCall<I, O>({
        interceptors: options.interceptors,
        timeoutMs,
        signal,
        req: {
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
          header: requestHeader(
            method.kind,
            useBinaryFormat,
            timeoutMs,
            header,
            false,
          ),
          contextValues: contextValues ?? createContextValues(),
          message: input,
        },
        next: async (req) => {
          const fetch = options.fetch ?? globalThis.fetch;
          const fRes = await fetch(req.url, {
            ...req.init,
            headers: req.header,
            signal: req.signal,
            body: await createRequestBody(req.message),
          });
          validateResponse(
            method.kind,
            useBinaryFormat,
            fRes.status,
            fRes.headers,
          );
          if (fRes.body === null) {
            throw "missing response body";
          }
          const trailer = new Headers();
          const res: StreamResponse<I, O> = {
            ...req,
            header: fRes.headers,
            trailer,
            message: parseResponseBody(fRes.body, trailer, fRes.headers),
          };
          return res;
        },
      });
    },
  };
}
