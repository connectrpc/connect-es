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
import type {
  Interceptor,
  StreamingConn,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect-core";
import {
  Code,
  connectCodeFromHttpStatus,
  connectEndStreamFlag,
  connectEndStreamFromJson,
  ConnectError,
  connectErrorFromJson,
  connectErrorFromReason,
  connectTrailerDemux,
  createEnvelopeReadableStream,
  encodeEnvelopes,
  EnvelopedMessage,
  runStreaming,
  runUnary,
} from "@bufbuild/connect-core";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
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
      service: ServiceType,
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
                  mergeHeaders(...connectTrailerDemux(response.headers))
                );
              }
              throw new ConnectError(
                `HTTP ${response.status} ${response.statusText}`,
                connectCodeFromHttpStatus(response.status)
              );
            }
            expectContentType(responseType, false, useBinaryFormat);

            const [demuxedHeader, demuxedTrailer] = connectTrailerDemux(
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
      return runStreaming<I, O>(
        {
          stream: true,
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
          signal: signal ?? new AbortController().signal,
          requestHeader: createConnectRequestHeaders(
            header,
            timeoutMs,
            method.kind,
            useBinaryFormat
          ),
        },
        async (init) => {
          const pendingSend: I[] = [];
          const responseHeader = defer<Headers>();
          const responseReader =
            defer<ReadableStreamDefaultReader<EnvelopedMessage>>();
          const responseTrailer = defer<Headers>();
          let endStreamReceived = false;
          const conn: StreamingConn<I, O> = {
            ...init,
            responseHeader,
            responseTrailer,
            closed: false,
            send(message: PartialMessage<I>): Promise<void> {
              if (this.closed) {
                return Promise.reject(
                  new ConnectError("cannot send, request stream already closed")
                );
              }
              pendingSend.push(
                message instanceof method.I ? message : new method.I(message)
              );
              return Promise.resolve();
            },
            close(): Promise<void> {
              if (this.closed) {
                return Promise.reject(
                  new ConnectError("cannot send, request stream already closed")
                );
              }
              this.closed = true;
              fetch(init.url, {
                ...init.init,
                headers: init.requestHeader,
                signal: init.signal,
                body: createStreamingConnectRequestBody(
                  pendingSend,
                  useBinaryFormat,
                  options.jsonOptions,
                  options.binaryOptions
                ),
              })
                .then((response) => {
                  if (response.status != 200) {
                    throw new ConnectError(
                      `HTTP ${response.status} ${response.statusText}`,
                      connectCodeFromHttpStatus(response.status)
                    );
                  }
                  expectContentType(
                    response.headers.get("Content-Type"),
                    true,
                    useBinaryFormat
                  );
                  if (response.body === null) {
                    throw "missing response body";
                  }
                  responseHeader.resolve(response.headers);
                  const reader = createEnvelopeReadableStream(
                    response.body
                  ).getReader();
                  responseReader.resolve(reader);
                })
                .catch((reason) => {
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
                if (
                  (result.value.flags & connectEndStreamFlag) ===
                  connectEndStreamFlag
                ) {
                  endStreamReceived = true;
                  const endStream = connectEndStreamFromJson(result.value.data);
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
          return Promise.resolve(conn);
        },
        options.interceptors
      );
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
      flags: connectEndStreamFlag,
    }
  );
}

/**
 * Creates a body for a Connect request. Supports only requests with a single
 * message because of browser API limitations, but applies the enveloping
 * required for server-streaming requests.
 */
function createStreamingConnectRequestBody<T extends Message<T>>(
  messages: T[],
  useBinaryFormat: boolean,
  jsonOptions: Partial<JsonWriteOptions> | undefined,
  binaryOptions: Partial<BinaryWriteOptions> | undefined
): BodyInit {
  const textEncode = new TextEncoder();
  const messageEnvelopes = messages
    .map((m) =>
      useBinaryFormat
        ? m.toBinary(binaryOptions)
        : textEncode.encode(m.toJsonString(jsonOptions))
    )
    .map((data) => ({
      data,
      flags: 0b00000000,
    }));
  return encodeEnvelopes(...messageEnvelopes, {
    data: new Uint8Array(0),
    flags: connectEndStreamFlag,
  });
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
 * Create a union of several Headers objects, by appending all fields from all
 * inputs to a single Headers object.
 */
function mergeHeaders(...headers: Headers[]): Headers {
  const h = new Headers();
  for (const e of headers) {
    e.forEach((value, key) => {
      h.append(key, value);
    });
  }
  return h;
}

function defer<T>(): Promise<T> & Ctrl<T> {
  let res: ((v: T | PromiseLike<T>) => void) | undefined = undefined;
  let rej: ((reason?: unknown) => void) | undefined;
  const p = new Promise<T>((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  void p.catch(() => {
    //
  });
  const c: Ctrl<T> = {
    resolve(v) {
      res?.(v);
    },
    reject(reason) {
      rej?.(reason);
    },
  };
  return Object.assign(p, c);
}

type Ctrl<T> = {
  resolve(v: T | PromiseLike<T>): void;
  reject(reason?: unknown): void;
};
