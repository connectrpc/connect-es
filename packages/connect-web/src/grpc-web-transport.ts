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
  BinaryReadOptions,
  BinaryWriteOptions,
  IMessageTypeRegistry,
  Message,
  MessageType,
  MethodInfo,
  ServiceType,
} from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { codeFromGrpcWebHttpStatus, Code } from "./code.js";
import { decodeBinaryHeader } from "./http-headers.js";
import { Status } from "./grpc/status/v1/status_pb.js";
import type {
  ClientCallOptions,
  ClientRequest,
  ClientResponse,
  ClientTransport,
} from "./client-transport.js";
import { wrapTransportCall } from "./client-transport.js";
import type { ClientInterceptor } from "./client-interceptor.js";
import { createEnvelopeReader, EnvelopeReader } from "./envelope.js";
import { extractRejectionError } from "./private/extract-rejection-error.js";
import { grpcStatusDetailsBinName } from "./private/grpc-status.js";

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
   * Controls what the fetch client will do with credentials, such as
   * Cookies. The default value is "same-origin". For reference, see
   * https://fetch.spec.whatwg.org/#concept-request-credentials-mode
   */
  credentials?: RequestCredentials;

  // TODO explain
  typeRegistry?: IMessageTypeRegistry;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  interceptors?: ClientInterceptor[];
}

export function createGrpcWebTransport(
  options: GrpcWebTransportOptions
): ClientTransport {
  const transportOptions = options;
  return {
    call<I extends Message<I>, O extends Message<O>>(
      service: ServiceType,
      method: MethodInfo<I, O>,
      options: ClientCallOptions
    ): [ClientRequest<I>, ClientResponse<O>] {
      const [request, fetchResponse] = createRequest(
        service.typeName,
        method.name,
        options,
        transportOptions
      );
      const response = createResponse(
        method.O,
        options,
        transportOptions,
        fetchResponse
      );
      return wrapTransportCall(
        service,
        method,
        options,
        request,
        response,
        transportOptions.interceptors
      );
    },
  };
}

function createRequest<I extends Message<I>>(
  serviceTypeName: string,
  methodName: string,
  callOptions: ClientCallOptions,
  transportOptions: GrpcWebTransportOptions
): [ClientRequest<I>, Promise<Response>] {
  let resolveResponse: (value: Response) => void;
  let rejectResponse: (reason: unknown) => void;
  const responsePromise = new Promise<Response>((resolve, reject) => {
    resolveResponse = resolve;
    rejectResponse = reject;
  });

  let baseUrl = transportOptions.baseUrl;
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.substring(0, baseUrl.length - 1);
  }
  const url = `${baseUrl}/${serviceTypeName}/${methodName}`;
  const abort = callOptions.signal ?? new AbortController().signal;
  const request: ClientRequest = {
    url,
    init: {
      method: "POST",
      credentials: transportOptions.credentials ?? "same-origin",
      redirect: "error",
      mode: "cors",
    },
    abort,
    header: createGrpcWebRequestHeaders(callOptions),
    send(message: I, callback) {
      const data = message.toBinary(transportOptions.binaryOptions);
      const body = new Uint8Array(data.length + 5);
      body[0] = 0x00; // first byte is frame type
      for (let dataLength = data.length, i = 4; i > 0; i--) {
        body[i] = dataLength % 256; // 4 bytes message length
        dataLength >>>= 8;
      }
      body.set(data, 5);
      fetch(this.url, {
        ...this.init,
        headers: this.header,
        signal: this.abort,
        body,
      })
        .then(resolveResponse)
        .catch(rejectResponse);
      // We cannot make a meaningful callback to send() via fetch.
      callback(undefined);
    },
  };

  return [request, responsePromise];
}

function createResponse<O extends Message<O>>(
  messageType: MessageType<O>,
  callOptions: ClientCallOptions,
  transportOptions: GrpcWebTransportOptions,
  response: Response | Promise<Response>
): ClientResponse<O> {
  let isReading = false;
  let isRead = false;
  let readFrame: EnvelopeReader | undefined;
  return {
    receive(handler): void {
      function close(reason?: unknown) {
        isRead = true;
        isReading = false;
        const error =
          reason !== undefined ? extractRejectionError(reason) : undefined;
        handler.onClose(error);
      }
      if (isRead) {
        close("response already read");
        return;
      }
      if (isReading) {
        close("cannot read response concurrently");
        return;
      }
      isReading = true;
      Promise.resolve(response)
        .then((response) => {
          if (readFrame === undefined) {
            // TODO should check http status and content type first?
            handler.onHeader?.(response.headers);
            const err =
              extractHttpStatusError(response) ??
              extractContentTypeError(response.headers) ??
              extractDetailsError(
                response.headers,
                transportOptions.typeRegistry
              ) ??
              extractHeadersError(response.headers);
            if (err) {
              close(err);
              return;
            }
            if (response.body === null) {
              close("missing response body");
              return;
            }
            try {
              readFrame = createEnvelopeReader(response.body);
            } catch (e) {
              close(`failed to get response body reader: ${String(e)}`);
              return;
            }
          }
          readFrame()
            .then((frame) => {
              isReading = false;
              if (frame === null) {
                close();
              } else if ((frame.flags & trailerFlag) === trailerFlag) {
                const trailer = parseGrpcWebTrailer(frame.data);
                handler.onTrailer?.(trailer);
                close(
                  extractDetailsError(trailer, transportOptions.typeRegistry) ??
                    extractHeadersError(trailer)
                );
              } else {
                try {
                  handler.onMessage(
                    messageType.fromBinary(
                      frame.data,
                      transportOptions.binaryOptions
                    )
                  );
                } catch (e) {
                  // prettier-ignore
                  close(`failed to deserialize message ${messageType.typeName}: ${String(e)}`);
                }
              }
            })
            .catch(close);
        })
        .catch(close);
    },
  };
}

const trailerFlag = 0b10000000;

function createGrpcWebRequestHeaders(callOptions: ClientCallOptions): Headers {
  const header = new Headers({
    // We provide the most explicit description for our content type.
    // Note that we do not support the grpc-web-text format.
    // https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md#protocol-differences-vs-grpc-over-http2
    "Content-Type": "application/grpc-web+proto",
    // Some servers may rely on the request header `X-Grpc-Web` to identify
    // gRPC-web requests. For example the proxy by improbable:
    // https://github.com/improbable-eng/grpc-web/blob/53aaf4cdc0fede7103c1b06f0cfc560c003a5c41/go/grpcweb/wrapper.go#L231
    "X-Grpc-Web": "1",
    // Note that we do not comply with recommended structure for the
    // user-agent string.
    // https://github.com/grpc/grpc/blob/c462bb8d485fc1434ecfae438823ca8d14cf3154/doc/PROTOCOL-HTTP2.md#user-agents
    "X-User-Agent": "@bufbuild/connect-web",
  });
  new Headers(callOptions.headers).forEach((value, key) =>
    header.set(key, value)
  );
  if (callOptions.timeoutMs !== undefined) {
    header.set("Grpc-Timeout", `${callOptions.timeoutMs}m`);
  }
  return header;
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
  const code = codeFromGrpcWebHttpStatus(response.status);
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

function extractDetailsError(
  header: Headers,
  typeRegistry?: IMessageTypeRegistry
): ConnectError | undefined {
  const grpcStatusDetailsBin = header.get(grpcStatusDetailsBinName);
  if (grpcStatusDetailsBin == null) {
    return undefined;
  }
  try {
    const status = decodeBinaryHeader(grpcStatusDetailsBin, Status);
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
    // TODO deduplicate with similar logic in ConnectError
    for (const any of status.details) {
      const typeName = any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1);
      if (!typeRegistry) {
        error.rawDetails.push(any);
        continue;
      }
      const messageType = typeRegistry.findMessage(typeName);
      if (messageType) {
        const message = new messageType();
        if (any.unpackTo(message)) {
          error.details.push(message);
        }
      }
    }
    return error;
  } catch (e) {
    return new ConnectError(
      grpcStatusDetailsBinName,
      Code.Internal,
      undefined,
      header
    );
  }
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
