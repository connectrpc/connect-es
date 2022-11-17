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
  createClientMethodSerializers,
  createEnvelopeReadableStream,
  createMethodUrl,
  decodeBinaryHeader,
  encodeEnvelope,
  encodeEnvelopes,
  EnvelopedMessage,
  GrpcStatus,
  grpcWebCodeFromHttpStatus,
  grpcWebCreateRequestHeader,
  grpcWebExpectContentType,
  grpcWebTrailerParse,
  runStreaming,
  runUnary,
  StreamingConn,
} from "@bufbuild/connect-core";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { assertFetchApi } from "./assert-fetch-api.js";
import { defer } from "./defer.js";

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
      const { normalize, serialize, parse } = createClientMethodSerializers(
        method,
        true,
        undefined,
        options.binaryOptions
      );
      const validateResponse = validateFetchResponse.bind(null, true);
      try {
        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method).toString(),
            init: {
              method: "POST",
              credentials: options.credentials ?? "same-origin",
              redirect: "error",
              mode: "cors",
            },
            header: grpcWebCreateRequestHeader(false, timeoutMs, header),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },
          async (req) => {
            const response = await fetch(req.url, {
              ...req.init,
              headers: req.header,
              signal: req.signal,
              body: encodeEnvelope(0b00000000, serialize(req.message)),
            });
            validateResponse(response);
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
              validateGrpcStatus(
                grpcWebTrailerParse(messageOrTrailerResult.value.data)
              );
              // At this point, we received trailers only, but the trailers did
              // not have an error status code.
              throw "unexpected trailer";
            }
            const message = parse(messageOrTrailerResult.value.data);
            const trailerResult = await reader.read();
            if (trailerResult.done) {
              throw "missing trailer";
            }
            if (trailerResult.value.flags !== trailerFlag) {
              throw "missing trailer";
            }
            const trailer = grpcWebTrailerParse(trailerResult.value.data);
            validateGrpcStatus(trailer);
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
        true,
        undefined,
        options.binaryOptions
      );
      const validateResponse = validateFetchResponse.bind(null, true);
      return runStreaming<I, O>(
        {
          stream: true,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method).toString(),
          init: {
            method: "POST",
            credentials: options.credentials ?? "same-origin",
            redirect: "error",
            mode: "cors",
          },
          signal: signal ?? new AbortController().signal,
          header: grpcWebCreateRequestHeader(false, timeoutMs, header),
        },
        async (req) => {
          const pendingSend: EnvelopedMessage[] = [];
          const responseHeader = defer<Headers>();
          const responseReader =
            defer<ReadableStreamDefaultReader<EnvelopedMessage>>();
          const responseTrailer = defer<Headers>();
          let endStreamReceived = false;
          let messageReceived = false;
          const conn: StreamingConn<I, O> = {
            ...req,
            responseHeader,
            responseTrailer,
            closed: false,
            send(message: PartialMessage<I>): Promise<void> {
              if (this.closed) {
                return Promise.reject(
                  new ConnectError("cannot send, request stream already closed")
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
                  new ConnectError("cannot send, request stream already closed")
                );
              }
              this.closed = true;
              fetch(req.url, {
                ...req.init,
                headers: req.header,
                signal: req.signal,
                body: encodeEnvelopes(...pendingSend),
              })
                .then((response) => {
                  if (response.status != 200) {
                    throw new ConnectError(
                      `HTTP ${response.status} ${response.statusText}`,
                      connectCodeFromHttpStatus(response.status)
                    );
                  }
                  validateResponse(response);
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
                  const trailer = grpcWebTrailerParse(result.value.data);
                  validateGrpcStatus(trailer);
                  responseTrailer.resolve(trailer);
                  return {
                    done: true,
                    value: undefined,
                  };
                }
                messageReceived = true;
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

const trailerFlag = 0b10000000;

function validateFetchResponse(
  binaryFormat: boolean,
  response: Response
): void {
  const code = grpcWebCodeFromHttpStatus(response.status);
  if (code != null) {
    throw new ConnectError(
      decodeURIComponent(response.headers.get("grpc-message") ?? ""),
      code
    );
  }
  grpcWebExpectContentType(binaryFormat, response.headers.get("Content-Type"));
  validateGrpcStatus(response.headers);
}

function validateGrpcStatus(headerOrTrailer: Headers) {
  // Prefer the protobuf-encoded data to the grpc-status header.
  const grpcStatusDetailsBin = headerOrTrailer.get("grpc-status-details-bin");
  if (grpcStatusDetailsBin != null) {
    const status = decodeBinaryHeader(grpcStatusDetailsBin, GrpcStatus);
    // Prefer the protobuf-encoded data to the headers.
    if (status.code == 0) {
      return;
    }
    const error = new ConnectError(
      status.message,
      status.code,
      headerOrTrailer
    );
    error.details = status.details.map((any) => ({
      type: any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1),
      value: any.value,
    }));
    throw error;
  }
  const grpcStatus = headerOrTrailer.get("grpc-status");
  if (grpcStatus != null) {
    const code = parseInt(grpcStatus);
    if (code === 0) {
      return;
    }
    if (!(code in Code)) {
      throw new ConnectError(
        `invalid grpc-status: ${grpcStatus}`,
        Code.Internal
      );
    }
    throw new ConnectError(
      decodeURIComponent(headerOrTrailer.get("grpc-message") ?? ""),
      code,
      headerOrTrailer
    );
  }
}
