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

import type {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type {
  Interceptor,
  Transport,
  UnaryResponse,
} from "@bufbuild/connect-core";
import {
  Code,
  connectCodeFromHttpStatus,
  ConnectError,
  connectErrorFromReason,
  createEnvelopeReadableStream,
  encodeEnvelopes,
  EnvelopedMessage,
  grpcWebCodeFromHttpStatus,
  runStreaming,
  runUnary,
  StreamingConn,
} from "@bufbuild/connect-core";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { assertFetchApi } from "./assert-fetch-api.js";
import { decodeBinaryHeader } from "@bufbuild/connect-core";
import { GrpcStatus } from "@bufbuild/connect-core";

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
   */
  baseUrl: string;

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
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

/**
 * Create a Transport for the Connect protocol, which makes unary and
 * server-streaming methods available to web browsers. It uses the fetch
 * API to make HTTP requests.
 */

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
  options: GrpcWebTransportOptions
): Transport {
  assertFetchApi();
  const transportOptions = options;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: Headers,
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
            header: createGrpcWebRequestHeaders(header, timeoutMs),
            message:
              message instanceof method.I ? message : new method.I(message),
            signal: signal ?? new AbortController().signal,
          },
          async (unaryRequest) => {
            const response = await fetch(unaryRequest.url, {
              ...unaryRequest.init,
              headers: unaryRequest.header,
              signal: unaryRequest.signal,
              body: createGrpcWebRequestBody(
                [unaryRequest.message],
                options.binaryOptions
              ),
            });
            const headError =
              extractHttpStatusError(response) ??
              extractContentTypeError(response.headers) ??
              extractDetailsError(response.headers) ??
              extractHeadersError(response.headers);
            if (headError) {
              throw headError;
            }
            if (!response.body) {
              throw "missing response body";
            }
            const reader = createEnvelopeReadableStream(
              response.body
            ).getReader();
            const messageOrTrailerResult = await reader.read();
            if (messageOrTrailerResult.done) {
              throw "premature eof";
            }
            if (messageOrTrailerResult.value.flags === trailerFlag) {
              // Unary responses require exactly one response message, but in
              // case of an error, it is perfectly valid to have a response body
              // that only contains error trailers.
              parseGrpcWebTrailerAndExtractError(
                messageOrTrailerResult.value.data
              );
              // At this point, we received trailers only, but the trailers did
              // not have an error status code.
              throw "unexpected trailer";
            }
            const message = method.O.fromBinary(
              messageOrTrailerResult.value.data,
              transportOptions.binaryOptions
            );
            const trailerResult = await reader.read();
            if (trailerResult.done) {
              throw "missing trailer";
            }
            if (trailerResult.value.flags !== trailerFlag) {
              throw "missing trailer";
            }
            const trailer = parseGrpcWebTrailerAndExtractError(
              trailerResult.value.data
            );
            const eofResult = await reader.read();
            if (!eofResult.done) {
              throw "extraneous data";
            }
            return <UnaryResponse<O>>{
              stream: false,
              header: response.headers,
              message,
              trailer,
            };
          },
          transportOptions.interceptors
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
          requestHeader: createGrpcWebRequestHeaders(header, timeoutMs),
        },
        async (init) => {
          const pendingSend: I[] = [];
          const responseHeader = defer<Headers>();
          const responseReader =
            defer<ReadableStreamDefaultReader<EnvelopedMessage>>();
          const responseTrailer = defer<Headers>();
          let endStreamReceived = false;
          let messageReceived = false;
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
                body: createGrpcWebRequestBody(
                  pendingSend,
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
                  const err =
                    extractHttpStatusError(response) ??
                    extractContentTypeError(response.headers) ??
                    extractDetailsError(response.headers) ??
                    extractHeadersError(response.headers);
                  if (err) {
                    throw err;
                  }
                  if (!response.body) {
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
                  if (messageReceived && !endStreamReceived) {
                    throw new ConnectError("missing trailers");
                  }
                  return {
                    done: true,
                    value: undefined,
                  };
                }
                if ((result.value.flags & trailerFlag) === trailerFlag) {
                  endStreamReceived = true;
                  responseTrailer.resolve(
                    parseGrpcWebTrailerAndExtractError(result.value.data)
                  );
                  return {
                    done: true,
                    value: undefined,
                  };
                }
                messageReceived = true;
                return {
                  done: false,
                  value: method.O.fromBinary(
                    result.value.data,
                    options.binaryOptions
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
 * Creates a body for a gRPC-web request. Supports only requests with a single
 * message because of browser API limitations.
 */
function createGrpcWebRequestBody<T extends Message<T>>(
  messages: T[],
  binaryOptions: Partial<BinaryWriteOptions> | undefined
): BodyInit {
  const messageEnvelopes = messages
    .map((m) => m.toBinary(binaryOptions))
    .map((data) => ({
      data,
      flags: 0b00000000,
    }));
  return encodeEnvelopes(...messageEnvelopes);
}

const trailerFlag = 0b10000000;

function createGrpcWebRequestHeaders(
  headers: HeadersInit | undefined,
  timeoutMs: number | undefined
): Headers {
  const result = new Headers(headers ?? {});
  // We provide the most explicit description for our content type.
  // Note that we do not support the grpc-web-text format.
  // https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md#protocol-differences-vs-grpc-over-http2
  result.set("Content-Type", "application/grpc-web+proto");
  // Some servers may rely on the request header `X-Grpc-Web` to identify
  // gRPC-web requests. For example the proxy by improbable:
  // https://github.com/improbable-eng/grpc-web/blob/53aaf4cdc0fede7103c1b06f0cfc560c003a5c41/go/grpcweb/wrapper.go#L231
  result.set("X-Grpc-Web", "1");
  // Note that we do not comply with recommended structure for the
  // user-agent string.
  // https://github.com/grpc/grpc/blob/c462bb8d485fc1434ecfae438823ca8d14cf3154/doc/PROTOCOL-HTTP2.md#user-agents
  result.set("X-User-Agent", "@bufbuild/connect-web");
  if (timeoutMs !== undefined) {
    result.set("Grpc-Timeout", `${timeoutMs}m`);
  }
  return result;
}

function extractContentTypeError(header: Headers): ConnectError | undefined {
  const type = header.get("Content-Type");
  switch (type?.toLowerCase()) {
    case "application/grpc-web":
    case "application/grpc-web+proto":
      return undefined;
    case "application/grpc-web-text":
    case "application/grpc-web-text+proto":
      return new ConnectError("grpc-web-text is not supported", Code.Internal);
    case undefined:
    case null:
    default:
      return new ConnectError(
        `unexpected content type: ${String(type)}`,
        Code.Internal
      );
  }
}

function extractHttpStatusError(response: Response): ConnectError | undefined {
  const code = grpcWebCodeFromHttpStatus(response.status);
  if (!code) {
    return undefined;
  }
  return new ConnectError(
    decodeURIComponent(response.headers.get("grpc-message") ?? ""),
    code
  );
}

function extractHeadersError(header: Headers): ConnectError | undefined {
  const value = header.get("grpc-status");
  if (value === null) {
    return undefined;
  }
  const code = parseInt(value);
  if (code === 0) {
    return undefined;
  }
  if (!(code in Code)) {
    return new ConnectError(
      `invalid grpc-status: ${value}`,
      Code.Internal,
      undefined,
      header
    );
  }
  return new ConnectError(
    decodeURIComponent(header.get("grpc-message") ?? ""),
    code,
    undefined,
    header
  );
}

function extractDetailsError(header: Headers): ConnectError | undefined {
  const grpcStatusDetailsBin = header.get("grpc-status-details-bin");
  if (grpcStatusDetailsBin == null) {
    return undefined;
  }
  try {
    const status = decodeBinaryHeader(grpcStatusDetailsBin, GrpcStatus);
    // Prefer the protobuf-encoded data to the headers.
    if (status.code == 0) {
      return undefined;
    }
    const error = new ConnectError(
      status.message,
      status.code,
      undefined,
      header
    );
    error.details.push(...status.details);
    return error;
  } catch (e) {
    const ce = connectErrorFromReason(e, Code.Internal);
    header.forEach((value, key) => ce.metadata.append(key, value));
    return ce;
  }
}

function parseGrpcWebTrailerAndExtractError(data: Uint8Array): Headers {
  const trailer = parseGrpcWebTrailer(data);
  const err = extractDetailsError(trailer) ?? extractHeadersError(trailer);
  if (err) {
    throw err;
  }
  return trailer;
}

function parseGrpcWebTrailer(data: Uint8Array): Headers {
  const headers = new Headers();
  const lines = String.fromCharCode(...data).split("\r\n");
  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const i = line.indexOf(":");
    if (i > 0) {
      const name = line.substring(0, i).trim();
      const value = line.substring(i + 1).trim();
      headers.append(name, value);
    }
  }
  return headers;
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
