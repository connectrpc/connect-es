// Copyright 2021-2023 Buf Technologies, Inc.
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
import type {
  StreamRequest,
  StreamResponse,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "../index.js";
import { Code, ConnectError } from "../index.js";
import type { CommonTransportOptions } from "../protocol/index.js";
import {
  createAsyncIterable,
  createMethodSerializationLookup,
  createMethodUrl,
  pipe,
  pipeTo,
  runStreamingCall,
  runUnaryCall,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformNormalizeMessage,
  transformParseEnvelope,
  transformSerializeEnvelope,
  transformSplitEnvelope,
} from "../protocol/index.js";
import { requestHeaderWithCompression } from "./request-header.js";
import { validateResponseWithCompression } from "./validate-response.js";
import { validateTrailer } from "./validate-trailer.js";

/**
 * Create a Transport for the gRPC protocol.
 */
export function createTransport(opt: CommonTransportOptions): Transport {
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
      input: PartialMessage<I>
    ): Promise<UnaryResponse<I, O>> {
      const serialization = createMethodSerializationLookup(
        method,
        opt.binaryOptions,
        opt.jsonOptions,
        opt
      );
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
            opt.useBinaryFormat,
            timeoutMs,
            header,
            opt.acceptCompression,
            opt.sendCompression
          ),
          message: input instanceof method.I ? input : new method.I(input),
        },
        next: async (req: UnaryRequest<I, O>): Promise<UnaryResponse<I, O>> => {
          const uRes = await opt.httpClient({
            url: req.url,
            method: "POST",
            header: req.header,
            signal: req.signal,
            body: pipe(
              createAsyncIterable([req.message]),
              transformSerializeEnvelope(
                serialization.getI(opt.useBinaryFormat)
              ),
              transformCompressEnvelope(
                opt.sendCompression,
                opt.compressMinBytes
              ),
              transformJoinEnvelopes(),
              {
                propagateDownStreamError: true,
              }
            ),
          });
          const { compression } = validateResponseWithCompression(
            opt.useBinaryFormat,
            opt.acceptCompression,
            uRes.status,
            uRes.header
          );
          const message = await pipeTo(
            uRes.body,
            transformSplitEnvelope(opt.readMaxBytes),
            transformDecompressEnvelope(compression ?? null, opt.readMaxBytes),
            transformParseEnvelope<O>(serialization.getO(opt.useBinaryFormat)),
            async (iterable) => {
              let message: O | undefined;
              for await (const chunk of iterable) {
                if (message !== undefined) {
                  throw new ConnectError(
                    "protocol error: received extra output message for unary method",
                    Code.InvalidArgument
                  );
                }
                message = chunk;
              }
              return message;
            },
            { propagateDownStreamError: false }
          );
          validateTrailer(uRes.trailer);
          if (message === undefined) {
            throw new ConnectError(
              "protocol error: missing output message for unary method",
              Code.InvalidArgument
            );
          }
          return <UnaryResponse<I, O>>{
            stream: false,
            service,
            method,
            header: uRes.header,
            message,
            trailer: uRes.trailer,
          };
        },
      });
    },
    async stream<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      input: AsyncIterable<I>
    ): Promise<StreamResponse<I, O>> {
      const serialization = createMethodSerializationLookup(
        method,
        opt.binaryOptions,
        opt.jsonOptions,
        opt
      );
      return runStreamingCall<I, O>({
        interceptors: opt.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: true,
          service,
          method,
          url: createMethodUrl(opt.baseUrl, service, method),
          init: {},
          header: requestHeaderWithCompression(
            opt.useBinaryFormat,
            timeoutMs,
            header,
            opt.acceptCompression,
            opt.sendCompression
          ),
          message: pipe(input, transformNormalizeMessage(method.I), {
            propagateDownStreamError: true,
          }),
        },
        next: async (req: StreamRequest<I, O>) => {
          const uRes = await opt.httpClient({
            url: req.url,
            method: "POST",
            header: req.header,
            signal: req.signal,
            body: pipe(
              req.message,
              transformNormalizeMessage(method.I),
              transformSerializeEnvelope(
                serialization.getI(opt.useBinaryFormat)
              ),
              transformCompressEnvelope(
                opt.sendCompression,
                opt.compressMinBytes
              ),
              transformJoinEnvelopes(),
              { propagateDownStreamError: true }
            ),
          });
          const { compression, foundStatus } = validateResponseWithCompression(
            opt.useBinaryFormat,
            opt.acceptCompression,
            uRes.status,
            uRes.header
          );
          const res: StreamResponse<I, O> = {
            ...req,
            header: uRes.header,
            trailer: uRes.trailer,
            message: pipe(
              uRes.body,
              transformSplitEnvelope(opt.readMaxBytes),
              transformDecompressEnvelope(
                compression ?? null,
                opt.readMaxBytes
              ),
              transformParseEnvelope(serialization.getO(opt.useBinaryFormat)),
              async function* (iterable) {
                yield* iterable;
                if (!foundStatus) {
                  validateTrailer(uRes.trailer);
                }
              },
              { propagateDownStreamError: true }
            ),
          };
          return res;
        },
      });
    },
  };
}
