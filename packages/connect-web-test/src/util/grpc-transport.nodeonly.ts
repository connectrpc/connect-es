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
  ClientCallOptions,
  ClientInterceptor,
  ClientRequest,
  ClientResponse,
  ClientTransport,
  UnaryInterceptor,
  UnaryResponse,
} from "@bufbuild/connect-web";
import {
  ClientRequestCallback,
  Code,
  ConnectError,
  mergeHeaders,
  runUnary,
  wrapTransportCall,
} from "@bufbuild/connect-web";
import {
  AnyMessage,
  IMessageTypeRegistry,
  Message,
  MethodInfo,
  MethodKind,
  PartialMessage,
  protoBase64,
  ServiceType,
} from "@bufbuild/protobuf";
import * as grpc from "@grpc/grpc-js";

export interface GrpcTransportOptions {
  address: string;
  channelCredentials: grpc.ChannelCredentials;
  clientOptions?: grpc.ClientOptions;
  typeRegistry?: IMessageTypeRegistry;

  // TODO
  interceptors?: ClientInterceptor[];

  // TODO
  unaryInterceptors?: UnaryInterceptor[];
}

interface GrpcClientTransport extends ClientTransport {
  close(): void;

  getChannel(): grpc.ChannelInterface;

  waitForReady(deadline: number, callback: (error?: Error) => void): void;
}

// TODO
/* eslint-disable */

export function createGrpcTransport(
  options: GrpcTransportOptions
): GrpcClientTransport {
  const transportOptions = options;
  const client = new grpc.Client(
    transportOptions.address,
    transportOptions.channelCredentials,
    transportOptions.clientOptions
  );
  return {
    close() {
      client.close();
    },
    getChannel(): grpc.ChannelInterface {
      return client.getChannel();
    },
    waitForReady(deadline: number, callback: (error?: Error) => void) {
      return client.waitForReady(deadline, callback);
    },
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
      const abort = new AbortController();
      if (signal) {
        signal.addEventListener("abort", () => abort.abort());
      }
      const { serialize, deserialize } = makeSerializerFns(method);
      return runUnary<I, O>(
        {
          service,
          method,
          url: `/${service.typeName}/${method.name}`,
          init: {},
          header: new Headers(header),
          message:
            message instanceof method.I ? message : new method.I(message),
          signal: abort.signal,
        },
        (unaryRequest) => {
          return new Promise((resolve, reject) => {
            // TODO cancellation
            let header: Headers = new Headers();
            let message: O | undefined;
            let trailer: Headers = new Headers();
            const clientCall = client.makeUnaryRequest(
              unaryRequest.url,
              serialize,
              deserialize,
              unaryRequest.message,
              grpcMetadataFromHeaders(unaryRequest.header),
              {
                deadline: timeoutMs ? Date.now() + timeoutMs : undefined,
              },
              (err: grpc.ServiceError | null, value?: O) => {
                message = value;
              }
            );
            clientCall.on("metadata", (metadata: grpc.Metadata) => {
              header = grpcMetadataToHeaders(metadata);
            });
            clientCall.on("status", (status: grpc.StatusObject) => {
              trailer = grpcMetadataToHeaders(status.metadata);
              if (status.code != grpc.status.OK) {
                // TODO grpc-status-details-bin
                reject(
                  new ConnectError(
                    status.details,
                    status.code as number,
                    undefined,
                    mergeHeaders(header, trailer)
                  )
                );
                return;
              }
              if (!message) {
                reject(
                  new ConnectError("missing response message", Code.Internal)
                );
                return;
              }
              resolve(<UnaryResponse<O>>{
                header,
                message,
                trailer,
              });
            });
          });
        },
        transportOptions.unaryInterceptors
      );
    },

    /** @deprecated */
    call<I extends Message<I>, O extends Message<O>>(
      service: ServiceType,
      method: MethodInfo<I, O>,
      options: ClientCallOptions
    ): [ClientRequest<I>, ClientResponse<O>] {
      const { serialize, deserialize } = makeSerializerFns(method);
      const signal = options.signal ?? new AbortController().signal;
      const grpcCallOptions: grpc.CallOptions = {};
      if (options.timeoutMs !== undefined) {
        grpcCallOptions.deadline = Date.now() + options.timeoutMs;
      }
      const grpcMetadata = new grpc.Metadata();
      const requestUrl = `/${service.typeName}/${method.name}`;
      const requestHeader = new Headers(options.headers);

      switch (method.kind) {
        case MethodKind.ServerStreaming: {
          const [request, callPromise, callErrorPromise] =
            createServerStreamingRequest(
              service,
              method,
              client,
              signal,
              grpcCallOptions,
              requestHeader
            );
          const response = createServerStreamingResponse(
            service,
            method,
            signal,
            callPromise,
            callErrorPromise
          );
          return wrapTransportCall(
            service,
            method,
            options,
            request,
            response,
            transportOptions.interceptors
          );
        }
        case MethodKind.BiDiStreaming: {
          const bidiCall = client.makeBidiStreamRequest(
            requestUrl,
            serialize,
            deserialize,
            grpcMetadata,
            grpcCallOptions
          );
          signal.addEventListener("abort", () => bidiCall.cancel());
          bidiCall.on("status", (x) => {});
          bidiCall.on("metadata", (x) => {});
          bidiCall.on("data", (x) => {});
          bidiCall.on("error", (x) => {});
          bidiCall.on("close", () => {});
          bidiCall.on("end", () => {});
          //          bidiCall.read()
          const req: ClientRequest = {
            url: requestUrl,
            init: {},
            header: requestHeader,
            abort: signal,
            send(message: I, callback: ClientRequestCallback) {
              bidiCall.write(message, callback);
            },
          };
          const res: ClientResponse = {
            receive(handler) {
              //handler.
            },
          };
          return wrapTransportCall(
            service,
            method,
            options,
            req,
            res,
            transportOptions.interceptors
          );
        }
        default:
          throw "TODO";
      }
    },
  };
}

function createServerStreamingRequest<
  I extends Message<I>,
  O extends Message<O>
>(
  service: ServiceType,
  method: MethodInfo<I, O>,
  client: grpc.Client,
  signal: AbortSignal,
  grpcCallOptions: grpc.CallOptions,
  header: Headers
): [
  ClientRequest<I>,
  Promise<grpc.ClientReadableStream<O>>,
  Promise<ConnectError>
] {
  let resolveCall: (value: grpc.ClientReadableStream<O>) => void;
  const callPromise = new Promise<grpc.ClientReadableStream<O>>((resolve) => {
    resolveCall = resolve;
  });
  let resolveCallError: (value: ConnectError) => void;
  const callErrorPromise = new Promise<ConnectError>((resolve) => {
    resolveCallError = resolve;
  });
  const request: ClientRequest<I> = {
    url: `/${service.typeName}/${method.name}`,
    init: {},
    header,
    abort: signal,
    send(message, callback) {
      // TODO cancellation
      const { serialize, deserialize } = makeSerializerFns(method);
      const clientCall = client.makeServerStreamRequest(
        this.url,
        serialize,
        deserialize,
        message,
        grpcCallOptions
      );
      clientCall.pause();
      clientCall.on("error", (e) => {
        // @ts-ignore
        resolveCallError(new ConnectError(e.message, e.code));
      });
      resolveCall(clientCall);
      callback(undefined);
    },
  };
  return [request, callPromise, callErrorPromise];
}

function createServerStreamingResponse<
  I extends Message<I>,
  O extends Message<O>
>(
  service: ServiceType,
  method: MethodInfo<I, O>,
  signal: AbortSignal,
  call: Promise<grpc.ClientReadableStream<O>>,
  callError: Promise<ConnectError>
): ClientResponse<O> {
  let onMetadata: any;
  let onData: any;
  let onStatus: any;
  let onEnd: any;
  let onError: any;
  return <ClientResponse<O>>{
    receive(handler) {
      let closed = false;

      function close(reason?: unknown) {
        if (closed) {
          return;
        }
        const error =
          reason !== undefined ? extractRejectionError(reason) : undefined;
        handler.onClose(error);
        closed = true;
      }

      callError.then(close);
      let responseHeader: Headers = new Headers();
      let responseTrailer: Headers = new Headers();
      call
        .then((call) => {
          if (!call.isPaused()) {
            close("cannot read response concurrently");
            return;
          }
          if (onMetadata) {
            call.off("metadata", onMetadata);
            call.off("status", onStatus);
            call.off("end", onEnd);
            call.off("data", onData);
            call.off("error", onError);
          }
          onMetadata = (metadata: grpc.Metadata) => {
            responseHeader = grpcMetadataToHeaders(metadata);
            handler.onHeader?.(responseHeader);
          };
          call.on("metadata", onMetadata);
          onStatus = (status: grpc.StatusObject) => {
            responseTrailer = grpcMetadataToHeaders(status.metadata);
            handler.onTrailer?.(responseTrailer);
            if (status.code != grpc.status.OK) {
              // TODO grpc-status-details-bin
              close(
                new ConnectError(
                  status.details,
                  status.code as number,
                  undefined,
                  mergeHeaders(responseHeader, responseTrailer)
                )
              );
            }
          };
          call.on("status", onStatus);
          onData = (data: O) => {
            handler.onMessage(data);
            call.pause();
          };
          call.on("data", onData);
          onError = (error: Error) => {
            close(error);
          };
          call.on("error", onError);
          onEnd = () => {
            close();
          };
          call.on("end", onEnd);
          call.resume();
        })
        .catch(close);
    },
  };
}

function extractRejectionError(reason: unknown): ConnectError {
  if (reason instanceof ConnectError) {
    return reason;
  }
  if (reason instanceof Error) {
    if (reason.name == "AbortError") {
      // Fetch requests can only be canceled with an AbortController.
      // We detect that condition by looking at the name of the raised
      // error object, and translate to the appropriate status code.
      return new ConnectError(reason.message, Code.Canceled);
    }
    return new ConnectError(reason.message);
  }
  return new ConnectError(String(reason));
}

function makeSerializerFns<I extends Message<I>, O extends Message<O>>(
  method: MethodInfo<I, O>
) {
  return {
    serialize(value: I): Buffer {
      return Buffer.from(value.toBinary());
    },
    deserialize(buffer: Buffer): O {
      return method.O.fromBinary(buffer);
    },
  };
}

function grpcMetadataFromHeaders(headers: Headers): grpc.Metadata {
  const metadata = new grpc.Metadata();
  headers.forEach((value, key) => {
    if (key.toLowerCase().endsWith("-bin")) {
      metadata.add(key, new Buffer(protoBase64.dec(value)));
    } else {
      metadata.add(key, value);
    }
  });
  return metadata;
}

function grpcMetadataToHeaders(metadata: grpc.Metadata): Headers {
  const headers = new Headers();
  for (const [a, b] of Object.entries(metadata.toHttp2Headers())) {
    if (Array.isArray(b)) {
      for (const e of b) {
        headers.append(a, e);
      }
      // } else if (typeof b != "string" && b != undefined) {
      //   headers.append(a, b as unknown as string); // Http2Headers can be number, but grpc.Metadata cannot
    }
  }
  return headers;
}
