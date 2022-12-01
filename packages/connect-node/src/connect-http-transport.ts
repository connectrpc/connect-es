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
  connectCreateRequestHeader,
  createClientMethodSerializers,
  createMethodUrl,
  Interceptor,
  runUnary,
  // Transport,
  UnaryRequest,
  //   UnaryResponse,
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
import * as http from "http";
import { webHeaderToNodeHeaders } from "./private/web-header-to-node-headers.js";
import { connectErrorFromNodeReason } from "./private/connect-error-from-node.js";

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

//Partial<Transport>
/**
 * Create a Transport for the gRPC-web protocol on Http.
 *
 */
export function createConnectHttpTransport(
  options: ConnectHttpTransportOptions
): any {
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
      //Promise<UnaryResponse<O>>
    ): Promise<any> {
      try {
        const { normalize } = createClientMethodSerializers(
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

          //Promise<UnaryResponse<O>>
          async (req: UnaryRequest<I>): Promise<any> => {
            const endpoint = new URL(req.url);

            if (endpoint.protocol.includes("https")) {
              throw new Error("Invalid protocol, must use https not http");
            }
            const encoding = useBinaryFormat ? "binary" : "utf8";
            const request = http.request(
              req.url,
              {
                host: endpoint.hostname,
                port: +endpoint.port,
                headers: webHeaderToNodeHeaders(req.header),
                method: "POST",
                path: endpoint.pathname,
                signal: req.signal,
                protocol: endpoint.protocol,
              },
              (res) => {
                res.setEncoding(encoding);
                res.on("data", (chunk) => {
                  console.log("chunk", chunk);
                });
                res.on("end", () => {
                  console.log("No more data in response.");
                });
              }
            );

            const body = useBinaryFormat
              ? req.message.toBinary()
              : req.message.toJsonString();

            request.write(body, encoding);
            await end(request);

            request.on("error", (err) => {
              throw err;
            });
            // return <UnaryResponse<O>>{
            //   stream: false,
            //   service,
            //   method,
            //   header: {} as Headers,
            //   message: parse([] as unknown as Uint8Array),
            //   trailer: {} as Headers,
            // };
          }
        );
      } catch (e) {
        throw connectErrorFromNodeReason(e);
      }
    },
  };
}

function end(request: http.ClientRequest): Promise<void> {
  return new Promise<void>((resolve) => {
    request.end(resolve);
  });
}

export function toBuffer(ab: Uint8Array): Buffer {
  const buf = Buffer.alloc(ab.byteLength);
  for (let i = 0; i < buf.length; i++) {
    buf[i] = ab[i];
  }
  return buf;
}
