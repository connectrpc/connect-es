// Copyright 2021-2023 The Connect Authors
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
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { Message, MethodKind } from "@bufbuild/protobuf";
import type {
  Interceptor,
  StreamResponse,
  Transport,
  UnaryRequest,
  UnaryResponse,
  ContextValues,
} from "@connectrpc/connect";
import { createContextValues } from "@connectrpc/connect";
import {
  createClientMethodSerializers,
  createEnvelopeReadableStream,
  createMethodUrl,
  encodeEnvelope,
  runStreamingCall,
  runUnaryCall,
} from "@connectrpc/connect/protocol";
import {
  requestHeader,
  trailerFlag,
  trailerParse,
  validateResponse,
  validateTrailer,
} from "@connectrpc/connect/protocol-grpc-web";
import { assertFetchApi } from "./assert-fetch-api.js";

/**
 * Options used to configure the gRPC-web transport.
 *
 * See createGrpcWebTransport().
 */
export interface GrpcWebTransportOptions {
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
   * Controls what the fetch client will do with credentials, such as
   * Cookies. The default value is "same-origin". For reference, see
   * https://fetch.spec.whatwg.org/#concept-request-credentials-mode
   */
  credentials?: RequestCredentials;

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
   * The timeout in milliseconds to apply to all requests.
   *
   * This can be overridden on a per-request basis by passing a timeoutMs.
   */
  defaultTimeoutMs?: number;
}

/**
 * Create a Transport for the gRPC-web protocol. The protocol encodes
 * trailers in the response body and makes unary and server-streaming
 * methods available to web browsers. It uses the fetch API to make
 * HTTP requests.
 *
 * Note that this transport does not implement the grpc-web-text format,
 * which applies base64 encoding to the request and response bodies to
 * support reading streaming responses from an XMLHttpRequest.
 */
export function createGrpcWebTransport(
  options: GrpcWebTransportOptions,
): Transport {
  assertFetchApi();
  const useBinaryFormat = options.useBinaryFormat ?? true;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage,
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: Headers,
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
          header: requestHeader(useBinaryFormat, timeoutMs, header, false),
          contextValues: contextValues ?? createContextValues(),
          message,
        },
        next: async (req: UnaryRequest<I, O>): Promise<UnaryResponse<I, O>> => {
          const fetch = options.fetch ?? globalThis.fetch;
          const response = await fetch(req.url, {
            ...req.init,
            headers: req.header,
            signal: req.signal,
            body: encodeEnvelope(0, serialize(req.message)),
          });
          validateResponse(response.status, response.headers);
          if (!response.body) {
            throw "missing response body";
          }
          const reader = createEnvelopeReadableStream(
            response.body,
          ).getReader();
          let trailer: Headers | undefined;
          let message: O | undefined;
          for (;;) {
            const r = await reader.read();
            if (r.done) {
              break;
            }
            const { flags, data } = r.value;
            if (flags === trailerFlag) {
              if (trailer !== undefined) {
                throw "extra trailer";
              }
              // Unary responses require exactly one response message, but in
              // case of an error, it is perfectly valid to have a response body
              // that only contains error trailers.
              trailer = trailerParse(data);
              continue;
            }
            if (message !== undefined) {
              throw "extra message";
            }
            message = parse(data);
          }
          if (trailer === undefined) {
            throw "missing trailer";
          }
          validateTrailer(trailer);
          if (message === undefined) {
            throw "missing message";
          }
          return <UnaryResponse<I, O>>{
            stream: false,
            header: response.headers,
            message,
            trailer,
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
        foundStatus: boolean,
        trailerTarget: Headers,
      ) {
        const reader = createEnvelopeReadableStream(body).getReader();
        if (foundStatus) {
          // A grpc-status: 0 response header was present. This is a "trailers-only"
          // response (a response without a body and no trailers).
          //
          // The spec seems to disallow a trailers-only response for status 0 - we are
          // lenient and only verify that the body is empty.
          //
          // > [...] Trailers-Only is permitted for calls that produce an immediate error.
          // See https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md
          if (!(await reader.read()).done) {
            throw "extra data for trailers-only";
          }
          return;
        }
        let trailerReceived = false;
        for (;;) {
          const result = await reader.read();
          if (result.done) {
            break;
          }
          const { flags, data } = result.value;
          if ((flags & trailerFlag) === trailerFlag) {
            if (trailerReceived) {
              throw "extra trailer";
            }
            trailerReceived = true;
            const trailer = trailerParse(data);
            validateTrailer(trailer);
            trailer.forEach((value, key) => trailerTarget.set(key, value));
            continue;
          }
          if (trailerReceived) {
            throw "extra message";
          }
          yield parse(data);
          continue;
        }
        if (!trailerReceived) {
          throw "missing trailer";
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
      return runStreamingCall<I, O>({
        interceptors: options.interceptors,
        signal,
        timeoutMs,
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
          header: requestHeader(useBinaryFormat, timeoutMs, header, false),
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
          const { foundStatus } = validateResponse(fRes.status, fRes.headers);
          if (!fRes.body) {
            throw "missing response body";
          }
          const trailer = new Headers();
          const res: StreamResponse<I, O> = {
            ...req,
            header: fRes.headers,
            trailer,
            message: parseResponseBody(fRes.body, foundStatus, trailer),
          };
          return res;
        },
      });
    },
  };
}
