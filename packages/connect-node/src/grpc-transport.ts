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
  StreamingConn,
  StreamingInit,
  Transport,
  UnaryResponse,
} from "@bufbuild/connect-core";
import {
  Code,
  ConnectError,
  Interceptor,
  runStreaming,
  runUnary,
} from "@bufbuild/connect-core";
import {
  AnyMessage,
  Message,
  MessageType,
  MethodInfo,
  MethodKind,
  PartialMessage,
  protoBase64,
  ServiceType,
} from "@bufbuild/protobuf";
import * as grpc from "@grpc/grpc-js";

/* eslint-disable */

// TODO this transport is just a placeholder, it only uses @grpc/grpc-js so that
//      we can verify that our Transport interface works out.

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
      const abortSignal = signal ?? new AbortController().signal;
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
          signal: abortSignal,
        },
        (unaryRequest) => {
          return new Promise((resolve, reject) => {
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
            if (abortSignal.aborted) {
              clientCall.cancel();
            }
            abortSignal.addEventListener("abort", () => clientCall.cancel());

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
      const abortSignal = signal ?? new AbortController().signal;
      try {
        return runStreaming<I, O>(
          {
            stream: true,
            service,
            method,
            url: `/${service.typeName}/${method.name}`,
            init: {},
            signal: abortSignal,
            requestHeader: new Headers(header ?? {}),
          },
          async (init: StreamingInit<I, O>): Promise<StreamingConn<I, O>> => {
            // We are missing support for cancellation here

            switch (method.kind) {
              case MethodKind.ServerStreaming:
                const pendingSend: I[] = [];
                const responseHeader = defer<Headers>();
                const clientCall = defer<grpc.ClientReadableStream<O>>();
                const responseTrailer = defer<Headers>();
                let callError: Error | undefined;
                let callEnded = false;
                const conn: StreamingConn<I, O> = {
                  ...init,
                  responseHeader,
                  responseTrailer,
                  closed: false,
                  send(message: PartialMessage<I>): Promise<void> {
                    if (this.closed) {
                      return Promise.reject(
                        new ConnectError(
                          "cannot send, request stream already closed"
                        )
                      );
                    }
                    pendingSend.push(
                      message instanceof method.I
                        ? message
                        : new method.I(message)
                    );
                    return Promise.resolve();
                  },
                  close(): Promise<void> {
                    if (this.closed) {
                      return Promise.reject(
                        new ConnectError(
                          "cannot send, request stream already closed"
                        )
                      );
                    }
                    this.closed = true;
                    const call = client.makeServerStreamRequest(
                      init.url,
                      makeSerializerFn(),
                      makeDeserializerFn(method.O),
                      pendingSend[0],
                      grpcMetadataFromHeaders(init.requestHeader),
                      {
                        deadline: timeoutMs
                          ? Date.now() + timeoutMs
                          : undefined,
                      }
                    );
                    clientCall.resolve(call);
                    if (abortSignal.aborted) {
                      call.cancel();
                    }
                    abortSignal.addEventListener("abort", () => call.cancel());
                    call.pause();

                    call.on("metadata", (metadata: grpc.Metadata) => {
                      responseHeader.resolve(grpcMetadataToHeaders(metadata));
                    });
                    call.on("status", (status: grpc.StatusObject) => {
                      const trailer = grpcMetadataToHeaders(status.metadata);
                      if (status.code != grpc.status.OK) {
                        // We are missing support for error details here
                        const e = new ConnectError(
                          status.details,
                          status.code as number,
                          undefined,
                          trailer // We are not merging response headers with the trailers here
                        );
                        responseHeader.reject(e);
                        responseTrailer.reject(e);
                      } else {
                        responseTrailer.resolve(trailer);
                      }
                    });
                    call.on("error", (error: Error) => {
                      callError = error;
                      responseHeader.reject(connectErrorFromGrpcError(error));
                      responseTrailer.reject(connectErrorFromGrpcError(error));
                    });
                    call.on("end", () => {
                      callEnded = true;
                    });
                    return Promise.resolve();
                  },
                  async read() {
                    const call = await clientCall;
                    const outcome = await new Promise<O | Error | null>(
                      (resolve, reject) => {
                        if (callError) {
                          reject(connectErrorFromGrpcError(callError));
                          return;
                        }
                        if (callEnded) {
                          resolve(null);
                          return;
                        }
                        call.resume();
                        call.once("data", (data) => {
                          resolve(data);
                          call.pause();
                        });
                        call.once("error", (error) => {
                          callError = error;
                          reject(connectErrorFromGrpcError(error));
                        });
                        call.once("end", () => {
                          if (callError) {
                            reject(connectErrorFromGrpcError(callError));
                            return;
                          }
                          resolve(null);
                        });
                      }
                    );
                    if (outcome instanceof Message) {
                      return {
                        done: false,
                        value: outcome,
                      };
                    }
                    return {
                      done: true,
                      value: undefined,
                    };
                  },
                };
                return conn;
              default:
                throw new ConnectError("method kind not implemented");
            }
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
