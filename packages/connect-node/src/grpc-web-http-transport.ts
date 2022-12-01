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
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  grpcWebCreateRequestHeader,
  Interceptor,
  runUnary,
  // Transport,
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
import * as http from "http";
import { webHeaderToNodeHeaders } from "./private/web-header-to-node-headers.js";
import { connectErrorFromNodeReason } from "./private/connect-error-from-node.js";

export interface GrpcWebHttpTransportOptions {
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

const messageFlag = 0b00000000;

//Partial<Transport>
/**
 * Create a Transport for the gRPC-web protocol on Http.
 *
 */
export function createGrpcWebHttpTransport(
  options: GrpcWebHttpTransportOptions
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
        const { normalize, serialize, parse } = createClientMethodSerializers(
          method,
          useBinaryFormat,
          options.jsonOptions,
          options.binaryOptions
        );
        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method).toString(),
            init: {},
            header: grpcWebCreateRequestHeader(
              useBinaryFormat,
              timeoutMs,
              header
            ),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },

          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            const endpoint = new URL(req.url);

            if (endpoint.protocol.includes("https")) {
              throw new Error("Invalid protocol, must use https not http");
            }

            const envelope = encodeEnvelope(
              messageFlag,
              serialize(req.message)
            );

            const request = http.request(
              req.url,
              {
                host: endpoint.hostname,
                port: +endpoint.port,
                headers: {
                  ...webHeaderToNodeHeaders(req.header),
                  "Content-Length": envelope.byteLength,
                },
                method: "POST",
                path: endpoint.pathname,
                signal: req.signal,
              },
              (res) => {
                console.log("CALLBACK");
                res.setEncoding("binary");
                res.on("data", (chunk) => {
                  console.log("chunk", chunk);
                });
                res.on("end", () => {
                  console.log("No more data in response.");
                });
              }
            );

            await writeHttpRequest(request, envelope);

            request.on("error", (err) => {
              console.log("errrrr", err);
            });
            await end(request);

            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header: {} as Headers,
              message: parse([] as unknown as Uint8Array),
              trailer: {} as Headers,
            };
          }
        );
      } catch (e) {
        throw connectErrorFromNodeReason(e);
      }
    },
  };
}

export function writeHttpRequest(
  request: http.ClientRequest,
  data: Uint8Array | string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const encoding = typeof data == "string" ? "utf8" : "binary";
    const cb = (error: Error | null | undefined) => {
      if (error) {
        reject(error);
      }
    };
    const flushed = request.write(data, encoding, cb);

    if (flushed) {
      resolve();
    } else {
      request.once("drain", resolve);
    }
  });
}

function end(request: http.ClientRequest): Promise<void> {
  return new Promise<void>((resolve) => {
    request.end(resolve);
  });
}
