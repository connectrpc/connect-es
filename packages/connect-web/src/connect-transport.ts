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
  IMessageTypeRegistry,
  JsonReadOptions,
  JsonValue,
  JsonWriteOptions,
  Message,
  MethodInfo,
  MethodKind,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { Code, codeFromConnectHttpStatus } from "./code.js";
import type { ClientTransport } from "./client-transport.js";
import type {
  ServerStreamInterceptor,
  StreamResponse,
  UnaryInterceptor,
  UnaryRequest,
  UnaryResponse,
} from "./client-interceptor.js";
import { runServerStream, runUnary } from "./client-interceptor.js";
import { createEnvelopeReadableStream, encodeEnvelopes } from "./envelope.js";
import { newParseError } from "./private/new-parse-error.js";
import { mergeHeaders } from "./http-headers.js";
import { connectErrorFromFetchError } from "./private/connect-error-from-fetch-error.js";

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

  // TODO explain
  // TODO instead of requiring the registry upfront, provide a function to parse raw details?
  errorDetailRegistry?: IMessageTypeRegistry;

  /**
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  // TODO
  unaryInterceptors?: UnaryInterceptor[];

  // TODO
  serverStreamInterceptors?: ServerStreamInterceptor[];
}

export function createConnectTransport(
  options: ConnectTransportOptions
): ClientTransport {
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
      try {
        return runUnary<I, O>(
          {
            service,
            method,
            url: `${options.baseUrl}/${service.typeName}/${method.name}`,
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
                options.jsonOptions
              ),
            });

            const responseType = response.headers.get("Content-Type") ?? "";
            if (response.status != 200) {
              if (responseType == "application/json") {
                throw ConnectError.fromJson(
                  (await response.json()) as JsonValue,
                  {
                    typeRegistry: options.errorDetailRegistry,
                    metadata: mergeHeaders(
                      ...demuxHeaderTrailers(response.headers)
                    ),
                  }
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
          options.unaryInterceptors
        );
      } catch (e) {
        throw connectErrorFromFetchError(e);
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
        return runServerStream<I, O>(
          <UnaryRequest<I>>{
            service,
            method,
            url: `${options.baseUrl}/${service.typeName}/${method.name}`,
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
                options.jsonOptions
              ),
            });

            const responseType = response.headers.get("Content-Type") ?? "";
            if (response.status != 200) {
              if (responseType == "application/json") {
                throw ConnectError.fromJson(
                  (await response.json()) as JsonValue,
                  {
                    typeRegistry: options.errorDetailRegistry,
                    metadata: mergeHeaders(
                      ...demuxHeaderTrailers(response.headers)
                    ),
                  }
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
              service,
              method,
              header: response.headers,
              trailer: new Headers(),
              async read(): Promise<ReadableStreamDefaultReadResult<O>> {
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
                  const endStream = EndStream.fromJsonString(
                    new TextDecoder().decode(result.value.data),
                    {
                      typeRegistry: options.errorDetailRegistry,
                    }
                  );
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
              },
            };
          },
          options.serverStreamInterceptors
        );
      } catch (e) {
        throw connectErrorFromFetchError(e);
      }
    },
  };
}

function createConnectRequestBody<T extends Message<T>>(
  message: T,
  methodKind: MethodKind,
  useBinaryFormat: boolean,
  jsonOptions: Partial<JsonWriteOptions> | undefined
): BodyInit {
  const encoded = useBinaryFormat
    ? message.toBinary()
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

function createConnectRequestHeaders(
  headers: HeadersInit | undefined,
  timeoutMs: number | undefined,
  methodKind: MethodKind,
  useBinaryFormat: boolean
): Headers {
  const result = new Headers(headers);
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
class EndStream {
  error?: ConnectError;

  metadata: Headers;

  constructor(metadata: Headers, error?: ConnectError) {
    this.metadata = metadata;
    this.error = error;
  }

  /**
   * Parse an EndStreamResponse from a JSON string.
   * Will throw a ConnectError in case the JSON is malformed.
   */
  static fromJsonString(
    jsonString: string,
    options?: { typeRegistry?: IMessageTypeRegistry }
  ): EndStream {
    let json: JsonValue;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      json = JSON.parse(jsonString);
    } catch (e) {
      throw newParseError(e, "", false);
    }
    return this.fromJson(json, options);
  }

  /**
   * Parse an EndStreamResponse from a JSON value.
   * Will return a ConnectError, but throw one in case the JSON is malformed.
   */
  static fromJson(
    jsonValue: JsonValue,
    options?: { typeRegistry?: IMessageTypeRegistry }
  ): EndStream {
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
    let error: ConnectError | undefined;
    if ("error" in jsonValue) {
      if (
        typeof jsonValue.error != "object" ||
        jsonValue.error == null ||
        Array.isArray(jsonValue.error)
      ) {
        throw newParseError(jsonValue, ".error");
      }
      if (Object.keys(jsonValue.error).length > 0) {
        try {
          error = ConnectError.fromJson(jsonValue.error, {
            ...options,
            metadata,
          });
        } catch (e) {
          throw newParseError(e, ".error", false);
        }
      }
    }
    return new EndStream(metadata, error);
  }
}
