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
  appendHeaders,
  connectCodeFromHttpStatus,
  connectCreateRequestHeader,
  ConnectError,
  connectErrorFromJson,
  connectExpectContentType,
  connectTrailerDemux,
  createClientMethodSerializers,
  createMethodUrl,
  Interceptor,
  runStreaming,
  runUnary,
  StreamingConn,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect-core";
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
import { connectErrorFromNodeReason } from "./private/connect-error-from-node.js";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { defer } from "./private/defer.js";
import { nodeRequest } from "./private/node-http-request.js";
import { jsonParse, readToEnd } from "./private/io.js";
import type * as http from "http";

export interface ConnectHttpTransportOptions {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "http://example.com/my-api"`
   *
   * This will make a `POST /my-api/my_package.MyService/Foo` to
   * `example.com` via HTTPS.
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
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

/**
 * Create a Transport for the connect protocol on Http.
 *
 */
export function createConnectHttpTransport(
  options: ConnectHttpTransportOptions
): Transport {
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
        const { normalize, parse } = createClientMethodSerializers(
          method,
          useBinaryFormat,
          options.jsonOptions,
          options.binaryOptions
        );
        const createRequestHeader = connectCreateRequestHeader.bind(
          null,
          method.kind,
          useBinaryFormat
        );

        const validateContentType = connectExpectContentType.bind(
          null,
          method.kind,
          useBinaryFormat
        );

        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method).toString(),
            init: {},
            header: createRequestHeader(timeoutMs, header),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },
          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            const response = await nodeRequest({
              req,
              useBinaryFormat,
              jsonOptions: options.jsonOptions,
              binaryOptions: options.binaryOptions,
            });

            const responseHeaders = new Headers();
            Object.keys(response.headers).forEach((key: string) => {
              responseHeaders.append(key, response.headers[key] as string);
            });

            await validateResponseHeader(
              response.statusCode as number,
              responseHeaders,
              response
            );
            validateContentType(response.headers["content-type"] ?? "");

            const [header, trailer] = connectTrailerDemux(responseHeaders);
            return {
              stream: false,
              service,
              method,
              header,
              message: parse(await readToEnd(response)),
              trailer,
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromNodeReason(e);
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
      const { parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        options.jsonOptions,
        options.binaryOptions
      );

      const createRequestHeader = connectCreateRequestHeader.bind(
        null,
        method.kind,
        useBinaryFormat
      );
      return runStreaming<I, O>(
        {
          stream: true,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method).toString(),
          init: {
            method: "POST",
            redirect: "error",
            mode: "cors",
          },
          signal: signal ?? new AbortController().signal,
          header: createRequestHeader(timeoutMs, header),
        },
        async (req) => {
          try {
            // remove
            await Promise.resolve();

            // let endStreamReceived = false;
            const responseTrailer = defer<Headers>();
            const conn: StreamingConn<I, O> = {
              ...req,
              responseHeader: Promise.resolve({} as Headers),
              responseTrailer,
              closed: false,
              async send(message: PartialMessage<I>) {
                console.log(message);
                void (await Promise.resolve());
              },
              async close() {
                void (await Promise.resolve());
              },
              async read(): Promise<ReadableStreamReadResultLike<O>> {
                return await Promise.resolve({
                  done: false,
                  value: parse([] as unknown as Uint8Array),
                });
              },
            };
            return conn;
          } catch (e) {
            throw connectErrorFromNodeReason(e);
          }
        },
        options.interceptors
      );
    },
  };
}

const validateResponseHeader = async (
  status: number,
  headers: Headers,
  stream: http.IncomingMessage
) => {
  const type = headers.get("content-type") ?? "";
  if (status !== 200) {
    if (type === "application/json") {
      throw connectErrorFromJson(
        jsonParse(await readToEnd(stream)),
        appendHeaders(...connectTrailerDemux(headers))
      );
    }
    throw new ConnectError(`HTTP ${status}`, connectCodeFromHttpStatus(status));
  }
};
