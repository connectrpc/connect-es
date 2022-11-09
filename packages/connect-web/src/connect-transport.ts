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
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonValue,
  JsonWriteOptions,
  Message,
  MethodInfo,
  MethodKind,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import {
  ConnectError,
  connectErrorFromJson,
  connectErrorFromReason,
  newParseError,
} from "./connect-error.js";
import { codeFromConnectHttpStatus, Code } from "./code.js";
import type { Transport } from "./transport.js";
import type {
  Interceptor,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
} from "./interceptor.js";
import { runServerStream, runUnary } from "./interceptor.js";
import { createEnvelopeReadableStream, encodeEnvelopes } from "./envelope.js";
import { mergeHeaders } from "./http-headers.js";
import { assertFetchApi } from "./assert-fetch-api.js";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";

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
  const useBinaryFormat = options.useBinaryFormat ?? false;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: Pick<ServiceType, 'typeName'>,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: PartialMessage<I>
    ): Promise<UnaryResponse<O>> {
      try {
        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: `${options.baseUrl.replace(/\/$/, "")}/${service.typeName}/${
              method.name
            }`,
            init: {
              method: "POST",
              credentials: options.credentials ?? "same-origin",
              redirect: "error",
              mode: "cors",
            },
            header: createConnectRequestHeaders(
              header,
              timeoutMs,
              method.kind,
              useBinaryFormat
            ),
            message:
              message instanceof method.I ? message : new method.I(message),
            signal: signal ?? new AbortController().signal,
          },
          async (unaryRequest: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            const response = await fetch(unaryRequest.url, {
              ...unaryRequest.init,
              headers: unaryRequest.header,
              signal: unaryRequest.signal,
              body: createConnectRequestBody(
                unaryRequest.message,
                method.kind,
                useBinaryFormat,
                options.jsonOptions,
                options.binaryOptions
              ),
            });

            const responseType = response.headers.get("Content-Type") ?? "";
            if (response.status != 200) {
              if (responseType == "application/json") {
                throw connectErrorFromJson(
                  (await response.json()) as JsonValue,
                  mergeHeaders(...demuxHeaderTrailers(response.headers))
                );
              }
              throw new ConnectError(
                `HTTP ${response.status} ${response.statusText}`,
                codeFromConnectHttpStatus(response.status)
              );
            }
            expectContentType(responseType, false, useBinaryFormat);

            const [demuxedHeader, demuxedTrailer] = demuxHeaderTrailers(
              response.headers
            );

            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header: demuxedHeader,
              message: useBinaryFormat
                ? method.O.fromBinary(
                    new Uint8Array(await response.arrayBuffer()),
                    options.binaryOptions
                  )
                : method.O.fromJson(
                    (await response.json()) as JsonValue,
                    options.jsonOptions
                  ),
              trailer: demuxedTrailer,
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromReason(e, Code.Internal);
      }
    },
    async serverStream<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: PartialMessage<I>
    ): Promise<StreamResponse<O>> {
      try {
        return await runServerStream<I, O>(
          <UnaryRequest<I>>{
            stream: false,
            service,
            method,
            url: `${options.baseUrl.replace(/\/$/, "")}/${service.typeName}/${
              method.name
            }`,
            init: {
              method: "POST",
              credentials: options.credentials ?? "same-origin",
              redirect: "error",
              mode: "cors",
            },
            header: createConnectRequestHeaders(
              header,
              timeoutMs,
              method.kind,
              useBinaryFormat
            ),
            message:
              message instanceof method.I ? message : new method.I(message),
            signal: signal ?? new AbortController().signal,
          },
          async (unaryRequest: UnaryRequest<I>): Promise<StreamResponse<O>> => {
            const response = await fetch(unaryRequest.url, {
              ...unaryRequest.init,
              headers: unaryRequest.header,
              signal: unaryRequest.signal,
              body: createConnectRequestBody(
                unaryRequest.message,
                method.kind,
                useBinaryFormat,
                options.jsonOptions,
                options.binaryOptions
              ),
            });

            const responseType = response.headers.get("Content-Type") ?? "";
            if (response.status != 200) {
              if (responseType == "application/json") {
                throw connectErrorFromJson(
                  (await response.json()) as JsonValue,
                  mergeHeaders(...demuxHeaderTrailers(response.headers))
                );
              }
              throw new ConnectError(
                `HTTP ${response.status} ${response.statusText}`,
                codeFromConnectHttpStatus(response.status)
              );
            }
            expectContentType(responseType, true, useBinaryFormat);

            if (response.body === null) {
              throw "missing response body";
            }
            const reader = createEnvelopeReadableStream(
              response.body
            ).getReader();

            let endStreamReceived = false;
            return <StreamResponse<O>>{
              stream: true,
              service,
              method,
              header: response.headers,
              trailer: new Headers(),
              async read(): Promise<ReadableStreamReadResultLike<O>> {
                try {
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
                  if (
                    (result.value.flags & endStreamResponseFlag) ===
                    endStreamResponseFlag
                  ) {
                    endStreamReceived = true;
                    const endStream = endStreamFromJson(result.value.data);
                    endStream.metadata.forEach((value, key) =>
                      this.trailer.append(key, value)
                    );
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
                    value: useBinaryFormat
                      ? method.O.fromBinary(
                          result.value.data,
                          options.binaryOptions
                        )
                      : method.O.fromJsonString(
                          new TextDecoder().decode(result.value.data),
                          options.jsonOptions
                        ),
                  };
                } catch (e) {
                  throw connectErrorFromReason(e);
                }
              },
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromReason(e, Code.Internal);
      }
    },
  };
}

/**
 * Creates a body for a Connect request. Supports only requests with a single
 * message because of browser API limitations, but applies the enveloping
 * required for server-streaming requests.
 */
function createConnectRequestBody<T extends Message<T>>(
  message: T,
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  jsonOptions: Partial<JsonWriteOptions> | undefined,
  binaryOptions: Partial<BinaryWriteOptions> | undefined
): BodyInit {
  const encoded = useBinaryFormat
    ? message.toBinary(binaryOptions)
    : message.toJsonString(jsonOptions);
  if (methodKind == MethodKind.Unary) {
    return encoded;
  }
  const data =
    typeof encoded == "string" ? new TextEncoder().encode(encoded) : encoded;
  return encodeEnvelopes(
    {
      data,
      flags: 0b00000000,
    },
    {
      data: new Uint8Array(0),
      flags: endStreamResponseFlag,
    }
  );
}

/**
 * Creates headers for a Connect request.
 */
function createConnectRequestHeaders(
  headers: HeadersInit | undefined,
  timeoutMs: number | undefined,
  methodKind: MethodKind,
  useBinaryFormat: boolean
): Headers {
  const result = new Headers(headers ?? {});
  let type = "application/";
  if (methodKind != MethodKind.Unary) {
    type += "connect+";
  }
  type += useBinaryFormat ? "proto" : "json";
  result.set("Content-Type", type);
  if (timeoutMs !== undefined) {
    result.set("Connect-Timeout-Ms", `${timeoutMs}`);
  }
  return result;
}

/**
 * Asserts a valid Connect Content-Type response header. Raises a ConnectError
 * otherwise.
 */
function expectContentType(
  contentType: string | null,
  stream: boolean,
  binaryFormat: boolean
): void {
  const match = contentType?.match(/^application\/(connect\+)?(json|proto)$/);
  const gotBinaryFormat = match && match[2] == "proto";
  if (!match || stream !== !!match[1] || binaryFormat !== gotBinaryFormat) {
    throw new ConnectError(
      `unexpected response content type ${String(contentType)}`,
      Code.Internal
    );
  }
}

/**
 * In unary RPCs, Connect transports trailing metadata as response header
 * fields, prefixed with "trailer-".
 *
 * This function demuxes headers and trailers into two separate Headers
 * objects.
 */
function demuxHeaderTrailers(
  header: Headers
): [header: Headers, trailer: Headers] {
  const h = new Headers(),
    t = new Headers();
  header.forEach((value, key) => {
    if (key.toLowerCase().startsWith("trailer-")) {
      t.set(key.substring(8), value);
    } else {
      h.set(key, value);
    }
  });
  return [h, t];
}

const endStreamResponseFlag = 0b00000010;

/**
 * Represents the EndStreamResponse of the Connect protocol.
 */
interface EndStreamResponse {
  metadata: Headers;
  error?: ConnectError;
}

/**
 * Parse an EndStreamResponse of the Connect protocol.
 */
function endStreamFromJson(data: Uint8Array): EndStreamResponse {
  let jsonValue: JsonValue;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    jsonValue = JSON.parse(new TextDecoder().decode(data));
  } catch (e) {
    throw newParseError(e, "", false);
  }
  if (
    typeof jsonValue != "object" ||
    jsonValue == null ||
    Array.isArray(jsonValue)
  ) {
    throw newParseError(jsonValue);
  }
  const metadata = new Headers();
  if ("metadata" in jsonValue) {
    if (
      typeof jsonValue.metadata != "object" ||
      jsonValue.metadata == null ||
      Array.isArray(jsonValue.metadata)
    ) {
      throw newParseError(jsonValue, ".metadata");
    }
    for (const [key, values] of Object.entries(jsonValue.metadata)) {
      if (
        !Array.isArray(values) ||
        values.some((value) => typeof value != "string")
      ) {
        throw newParseError(values, `.metadata["${key}"]`);
      }
      for (const value of values) {
        metadata.append(key, value as string);
      }
    }
  }
  const error =
    "error" in jsonValue
      ? connectErrorFromJson(jsonValue.error, metadata)
      : undefined;
  return { metadata, error };
}
