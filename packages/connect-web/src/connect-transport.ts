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
  BinaryReadOptions,
  BinaryWriteOptions,
  DescMessage,
  JsonReadOptions,
  JsonValue,
  JsonWriteOptions,
  MessageInitShape,
  MessageShape,
} from "@bufbuild/protobuf";
import { fromJson } from "@bufbuild/protobuf";
import type {
  Interceptor,
  StreamResponse,
  Transport,
  UnaryRequest,
  UnaryResponse,
  ContextValues,
  DescMethodUnary,
  DescMethodStreaming,
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
import { MethodOptions_IdempotencyLevel } from "@bufbuild/protobuf/wkt";

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
   *
   * This option can be used to set fetch options such as "credentials".
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

const fetchOptions: RequestInit = {
  redirect: "error",
};

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
    async unary<I extends DescMessage, O extends DescMessage>(
      method: DescMethodUnary<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: MessageInitShape<I>,
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
          service: method.parent,
          method,
          requestMethod: "POST",
          url: createMethodUrl(options.baseUrl, method),
          header: requestHeader(
            method.methodKind,
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
            method.idempotency ===
              MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS;
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
            ...fetchOptions,
            method: req.requestMethod,
            headers: req.header,
            signal: req.signal,
            body,
          });
          const { isUnaryError, unaryError } = validateResponse(
            method.methodKind,
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
            service: method.parent,
            method,
            header: demuxedHeader,
            message: useBinaryFormat
              ? parse(new Uint8Array(await response.arrayBuffer()))
              : fromJson(
                  method.output,
                  (await response.json()) as JsonValue,
                  getJsonOptions(options.jsonOptions),
                ),
            trailer: demuxedTrailer,
          };
        },
      });
    },

    async stream<I extends DescMessage, O extends DescMessage>(
      method: DescMethodStreaming<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      input: AsyncIterable<MessageInitShape<I>>,
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
        signal: AbortSignal,
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
              `protocol error: received unsupported compressed output`,
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
        // Node wil not throw an AbortError on `read` if the
        // signal is aborted before `getReader` is called.
        // As a work around we check at the end and throw.
        //
        // Ref: https://github.com/nodejs/undici/issues/1940
        if ("throwIfAborted" in signal) {
          // We assume that implementations without `throwIfAborted` (old
          // browsers) do honor aborted signals on `read`.
          signal.throwIfAborted();
        }
        if (!endStreamReceived) {
          throw "missing EndStreamResponse";
        }
      }

      async function createRequestBody(
        input: AsyncIterable<MessageShape<I>>,
      ): Promise<Uint8Array> {
        if (method.methodKind != "server_streaming") {
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
          service: method.parent,
          method,
          requestMethod: "POST",
          url: createMethodUrl(options.baseUrl, method),
          header: requestHeader(
            method.methodKind,
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
            ...fetchOptions,
            method: req.requestMethod,
            headers: req.header,
            signal: req.signal,
            body: await createRequestBody(req.message),
          });
          validateResponse(
            method.methodKind,
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
            message: parseResponseBody(
              fRes.body,
              trailer,
              fRes.headers,
              req.signal,
            ),
          };
          return res;
        },
      });
    },
  };
}
