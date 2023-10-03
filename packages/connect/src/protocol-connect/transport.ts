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
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { MethodIdempotency } from "@bufbuild/protobuf";
import { requestHeaderWithCompression } from "./request-header.js";
import { headerUnaryContentLength, headerUnaryEncoding } from "./headers.js";
import { validateResponseWithCompression } from "./validate-response.js";
import { trailerDemux } from "./trailer-mux.js";
import { errorFromJsonBytes } from "./error-json.js";
import { createEndStreamSerialization, endStreamFlag } from "./end-stream.js";
import { transformConnectPostToGetRequest } from "./get-request.js";
import type { CommonTransportOptions } from "../protocol/transport-options.js";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import { appendHeaders } from "../http-headers.js";
import type {
  UnaryResponse,
  UnaryRequest,
  StreamResponse,
  StreamRequest,
} from "../interceptor.js";
import {
  createAsyncIterable,
  pipeTo,
  sinkAllBytes,
  pipe,
  transformSerializeEnvelope,
  transformCompressEnvelope,
  transformJoinEnvelopes,
  transformSplitEnvelope,
  transformDecompressEnvelope,
  transformParseEnvelope,
} from "../protocol/async-iterable.js";
import { createMethodUrl } from "../protocol/create-method-url.js";
import { runUnaryCall, runStreamingCall } from "../protocol/run-call.js";
import { createMethodSerializationLookup } from "../protocol/serialization.js";
import type { Transport } from "../transport.js";

/**
 * Create a Transport for the Connect protocol.
 */
export function createTransport(opt: CommonTransportOptions): Transport {
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage,
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: PartialMessage<I>,
    ): Promise<UnaryResponse<I, O>> {
      const serialization = createMethodSerializationLookup(
        method,
        opt.binaryOptions,
        opt.jsonOptions,
        opt,
      );
      timeoutMs =
        timeoutMs === undefined
          ? opt.defaultTimeoutMs
          : timeoutMs <= 0
          ? undefined
          : timeoutMs;
      return await runUnaryCall<I, O>({
        interceptors: opt.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: false,
          service,
          method,
          url: createMethodUrl(opt.baseUrl, service, method),
          init: {},
          header: requestHeaderWithCompression(
            method.kind,
            opt.useBinaryFormat,
            timeoutMs,
            header,
            opt.acceptCompression,
            opt.sendCompression,
          ),
          message,
        },
        next: async (req: UnaryRequest<I, O>): Promise<UnaryResponse<I, O>> => {
          let requestBody = serialization
            .getI(opt.useBinaryFormat)
            .serialize(req.message);
          if (
            opt.sendCompression &&
            requestBody.byteLength > opt.compressMinBytes
          ) {
            requestBody = await opt.sendCompression.compress(requestBody);
            req.header.set(headerUnaryEncoding, opt.sendCompression.name);
          } else {
            req.header.delete(headerUnaryEncoding);
          }
          const useGet =
            opt.useHttpGet === true &&
            method.idempotency === MethodIdempotency.NoSideEffects;
          let body: AsyncIterable<Uint8Array> | undefined;
          if (useGet) {
            req = transformConnectPostToGetRequest(
              req,
              requestBody,
              opt.useBinaryFormat,
            );
          } else {
            body = createAsyncIterable([requestBody]);
          }
          const universalResponse = await opt.httpClient({
            url: req.url,
            method: req.init.method ?? "POST",
            header: req.header,
            signal: req.signal,
            body,
          });
          const { compression, isUnaryError, unaryError } =
            validateResponseWithCompression(
              method.kind,
              opt.acceptCompression,
              universalResponse.status,
              universalResponse.header,
            );
          const [header, trailer] = trailerDemux(universalResponse.header);
          let responseBody = await pipeTo(
            universalResponse.body,
            sinkAllBytes(
              opt.readMaxBytes,
              universalResponse.header.get(headerUnaryContentLength),
            ),
            { propagateDownStreamError: false },
          );
          if (compression) {
            responseBody = await compression.decompress(
              responseBody,
              opt.readMaxBytes,
            );
          }
          if (isUnaryError) {
            throw errorFromJsonBytes(
              responseBody,
              appendHeaders(header, trailer),
              unaryError,
            );
          }
          return <UnaryResponse<I, O>>{
            stream: false,
            service,
            method,
            header,
            message: serialization
              .getO(opt.useBinaryFormat)
              .parse(responseBody),
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
    ): Promise<StreamResponse<I, O>> {
      const serialization = createMethodSerializationLookup(
        method,
        opt.binaryOptions,
        opt.jsonOptions,
        opt,
      );
      const endStreamSerialization = createEndStreamSerialization(
        opt.jsonOptions,
      );
      timeoutMs =
        timeoutMs === undefined
          ? opt.defaultTimeoutMs
          : timeoutMs <= 0
          ? undefined
          : timeoutMs;
      return runStreamingCall<I, O>({
        interceptors: opt.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: true,
          service,
          method,
          url: createMethodUrl(opt.baseUrl, service, method),
          init: {
            method: "POST",
            redirect: "error",
            mode: "cors",
          },
          header: requestHeaderWithCompression(
            method.kind,
            opt.useBinaryFormat,
            timeoutMs,
            header,
            opt.acceptCompression,
            opt.sendCompression,
          ),
          message: input,
        },
        next: async (req: StreamRequest<I, O>) => {
          const uRes = await opt.httpClient({
            url: req.url,
            method: "POST",
            header: req.header,
            signal: req.signal,
            body: pipe(
              req.message,
              transformSerializeEnvelope(
                serialization.getI(opt.useBinaryFormat),
              ),
              transformCompressEnvelope(
                opt.sendCompression,
                opt.compressMinBytes,
              ),
              transformJoinEnvelopes(),
              { propagateDownStreamError: true },
            ),
          });
          const { compression } = validateResponseWithCompression(
            method.kind,
            opt.acceptCompression,
            uRes.status,
            uRes.header,
          );
          const res: StreamResponse<I, O> = {
            ...req,
            header: uRes.header,
            trailer: new Headers(),
            message: pipe(
              uRes.body,
              transformSplitEnvelope(opt.readMaxBytes),
              transformDecompressEnvelope(
                compression ?? null,
                opt.readMaxBytes,
              ),
              transformParseEnvelope(
                serialization.getO(opt.useBinaryFormat),
                endStreamFlag,
                endStreamSerialization,
              ),
              async function* (iterable) {
                let endStreamReceived = false;
                for await (const chunk of iterable) {
                  if (chunk.end) {
                    if (endStreamReceived) {
                      throw new ConnectError(
                        "protocol error: received extra EndStreamResponse",
                        Code.InvalidArgument,
                      );
                    }
                    endStreamReceived = true;
                    if (chunk.value.error) {
                      throw chunk.value.error;
                    }
                    chunk.value.metadata.forEach((value, key) =>
                      res.trailer.set(key, value),
                    );
                    continue;
                  }
                  if (endStreamReceived) {
                    throw new ConnectError(
                      "protocol error: received extra message after EndStreamResponse",
                      Code.InvalidArgument,
                    );
                  }
                  yield chunk.value;
                }
                if (!endStreamReceived) {
                  throw new ConnectError(
                    "protocol error: missing EndStreamResponse",
                    Code.InvalidArgument,
                  );
                }
              },
              { propagateDownStreamError: true },
            ),
          };
          return res;
        },
      });
    },
  };
}
