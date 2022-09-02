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
  Transport,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
  ReadableStreamDefaultReadResultLike,
} from "@bufbuild/connect-web";
import {
  Code,
  ConnectError,
  Interceptor,
  mergeHeaders,
  runServerStream,
  runUnary,
} from "@bufbuild/connect-web";
import {
  AnyMessage,
  Message,
  MessageType,
  MethodInfo,
  PartialMessage,
  protoBase64,
  ServiceType,
} from "@bufbuild/protobuf";
import * as grpc from "@grpc/grpc-js";

/* eslint-disable */

/**
 * Options for the gRPC transport.
 *
 * Note that the gRPC transport is a proof of concept. It does not support
 * cancellation and error details, and it may have bugs.
 */
interface GrpcTransportOptions {
  address: string;
  channelCredentials: grpc.ChannelCredentials;
  clientOptions?: grpc.ClientOptions;

  /**
   * Interceptors that should be applied to all calls running through
   * this transport. See the Interceptor type for details.
   */
  interceptors?: Interceptor[];
}

interface GrpcTransport extends Transport {
  close(): void;

  getChannel(): grpc.ChannelInterface;

  waitForReady(deadline: number, callback: (error?: Error) => void): void;
}

/**
 * Create a gRPC transport for Node.js using the @grpc/grpc-js package.
 *
 * Note that the gRPC transport is a proof of concept. It does not support
 * cancellation and error details, and it may have bugs.
 */
export function createGrpcTransport(
  options: GrpcTransportOptions
): GrpcTransport {
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
      return runUnary<I, O>(
        {
          stream: false,
          service,
          method,
          url: `/${service.typeName}/${method.name}`,
          init: {},
          header: new Headers(header ?? {}),
          message:
            message instanceof method.I ? message : new method.I(message),
          signal: abort.signal,
        },
        (unaryRequest) => {
          return new Promise((resolve, reject) => {
            // We are missing support for cancellation here
            let header: Headers = new Headers();
            let message: O | undefined;
            let trailer: Headers = new Headers();
            const clientCall = client.makeUnaryRequest(
              unaryRequest.url,
              makeSerializerFn(),
              makeDeserializerFn(method.O),
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
                // We are missing support for error details here
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
                stream: false,
                header,
                message,
                trailer,
              });
            });
          });
        },
        transportOptions.interceptors
      );
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
        return await runServerStream<I, O>(
          <UnaryRequest<I>>{
            stream: false,
            service,
            method,
            url: `/${service.typeName}/${method.name}`,
            init: {},
            header: new Headers(header ?? {}),
            message:
              message instanceof method.I ? message : new method.I(message),
            signal: signal ?? new AbortController().signal,
          },
          async (unaryRequest: UnaryRequest<I>): Promise<StreamResponse<O>> => {
            // We are missing support for cancellation here
            const clientCall = client.makeServerStreamRequest(
              unaryRequest.url,
              makeSerializerFn(),
              makeDeserializerFn(method.O),
              unaryRequest.message,
              grpcMetadataFromHeaders(unaryRequest.header),
              {
                deadline: timeoutMs ? Date.now() + timeoutMs : undefined,
              }
            );

            clientCall.pause();

            let clientError: Error | undefined;
            const header: Headers = new Headers();
            const trailer: Headers = new Headers();
            let callEnded = false;
            clientCall.on("metadata", (metadata: grpc.Metadata) => {
              grpcMetadataToHeaders(metadata).forEach((value, key) =>
                header.append(key, value)
              );
            });
            clientCall.on("status", (status: grpc.StatusObject) => {
              grpcMetadataToHeaders(status.metadata).forEach((value, key) =>
                trailer.append(key, value)
              );
              if (status.code != grpc.status.OK) {
                // We are missing support for error details here
                clientError = new ConnectError(
                  status.details,
                  status.code as number,
                  undefined,
                  mergeHeaders(header, trailer)
                );
              }
            });
            clientCall.on("error", (error: Error) => {
              clientError = error;
            });
            clientCall.on("end", () => {
              callEnded = true;
            });
            if (clientError != undefined) {
              throw clientError;
            }

            // Only resolve once we received response metadata, so we are consistent with
            // behavior of fetch API transports.
            await new Promise((resolve, reject) => {
              clientCall.once("metadata", () => {
                resolve(undefined);
              });
              clientCall.once("error", (error: Error) => {
                reject(error);
              });
            });

            return <StreamResponse<O>>{
              stream: true,
              service,
              method,
              header,
              trailer,
              async read(): Promise<ReadableStreamDefaultReadResultLike<O>> {
                const outcome = await new Promise<O | Error | null>(
                  (resolve) => {
                    if (callEnded) {
                      resolve(null);
                      return;
                    }
                    if (clientError) {
                      resolve(clientError);
                      return;
                    }
                    clientCall.resume();
                    clientCall.once("data", (data) => {
                      resolve(data);
                      clientCall.pause();
                    });
                    clientCall.once("error", (error) => {
                      resolve(error);
                    });
                    clientCall.once("end", () => {
                      resolve(clientError ?? null);
                    });
                  }
                );

                if (outcome instanceof Message) {
                  return {
                    done: false,
                    value: outcome,
                  };
                }
                if (outcome instanceof ConnectError) {
                  throw outcome;
                }
                if (outcome instanceof Error) {
                  throw connectErrorFromGrpcError(outcome);
                }
                return {
                  done: true,
                  value: undefined,
                };
              },
            };
          },
          transportOptions.interceptors
        );
      } catch (e) {
        throw connectErrorFromGrpcError(e);
      }
    },
  };
}

function makeSerializerFn<T extends Message<T>>() {
  return (value: T): Buffer => Buffer.from(value.toBinary());
}

function makeDeserializerFn<T extends Message<T>>(type: MessageType<T>) {
  return (buffer: Buffer): T => type.fromBinary(buffer);
}

function connectErrorFromGrpcError(
  err: ConnectError | grpc.ServiceError | Error | unknown
): ConnectError {
  if (err instanceof ConnectError) {
    return err;
  }
  if (typeof err == "object" && err != null && "details" in err) {
    const se = err as grpc.ServiceError;
    // We are missing support for error details here
    return new ConnectError(
      se.details,
      se.code as number,
      undefined,
      grpcMetadataToHeaders(se.metadata)
    );
  }
  if (err instanceof Error) {
    return new ConnectError(err.message, Code.Internal);
  }
  return new ConnectError(String(err), Code.Internal);
}

function grpcMetadataFromHeaders(headers: Headers): grpc.Metadata {
  const metadata = new grpc.Metadata();
  headers.forEach((value, key) => {
    if (key.toLowerCase().endsWith("-bin")) {
      metadata.add(key, Buffer.from(protoBase64.dec(value)));
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
    } else if (b != undefined) {
      headers.append(a, b.toString());
    }
  }
  return headers;
}
