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
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  IMessageTypeRegistry,
  JsonReadOptions,
  JsonValue,
  JsonWriteOptions,
  Message,
  MessageType,
  MethodInfo,
  MethodKind,
  ServiceType,
} from "@bufbuild/protobuf";
import { ConnectError } from "./connect-error.js";
import { codeFromConnectHttpStatus, Code } from "./code.js";
import type {
  ClientCallOptions,
  ClientRequest,
  ClientResponse,
  ClientTransport,
} from "./client-transport.js";
import { wrapTransportCall } from "./client-transport.js";
import type { ClientInterceptor } from "./client-interceptor.js";
import {
  createEnvelopeReader,
  encodeEnvelopes,
  EnvelopeReader,
} from "./envelope.js";
import { newParseError } from "./private/new-parse-error.js";
import { extractRejectionError } from "./private/extract-rejection-error.js";

export interface ConnectTransportOptions {
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
   * By default, connect-web clients use the JSON format.
   */
  useBinaryFormat?: boolean;

  /**
   * Controls what the fetch client will do with credentials, such as
   * Cookies. The default value is "same-origin". For reference, see
   * https://fetch.spec.whatwg.org/#concept-request-credentials-mode
   */
  credentials?: RequestCredentials;

  // TODO explain
  // TODO solve the duplicate with jsonOptions.typeRegistry
  typeRegistry?: IMessageTypeRegistry;

  /**
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  interceptors?: ClientInterceptor[];
}

export function createConnectTransport(
  options: ConnectTransportOptions
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
        method,
        options,
        transportOptions
      );
      const response =
        method.kind == MethodKind.Unary
          ? createUnaryResponse(
              method.O,
              options,
              transportOptions,
              fetchResponse
            )
          : createStreamResponse(
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
  method: MethodInfo<I, AnyMessage>,
  callOptions: ClientCallOptions,
  transportOptions: ConnectTransportOptions
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
  const url = `${baseUrl}/${serviceTypeName}/${method.name}`;
  const abort = callOptions.signal ?? new AbortController().signal;
  const useBinaryFormat = transportOptions.useBinaryFormat ?? false;
  const request: ClientRequest = {
    url,
    init: {
      method: "POST",
      credentials: transportOptions.credentials ?? "same-origin",
      redirect: "error",
      mode: "cors",
    },
    abort,
    header: createConnectRequestHeaders(
      callOptions.headers,
      callOptions.timeoutMs,
      method.kind,
      useBinaryFormat
    ),
    send(message: I, callback) {
      // TODO support request streams
      let encodedMessage: Uint8Array;
      if (useBinaryFormat) {
        encodedMessage = message.toBinary();
      } else {
        encodedMessage = new TextEncoder().encode(
          message.toJsonString({ typeRegistry: transportOptions.typeRegistry })
        );
      }
      const body: BodyInit =
        method.kind == MethodKind.Unary
          ? encodedMessage
          : encodeEnvelopes(
              { data: encodedMessage, flags: 0b00000000 },
              {
                data: new Uint8Array(0),
                flags: endStreamResponseFlag,
              }
            );
      fetch(this.url, {
        ...this.init,
        headers: this.header,
        signal: this.abort,
        // TODO don't do this for unary
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

function createStreamResponse<O extends Message<O>>(
  messageType: MessageType<O>,
  callOptions: ClientCallOptions,
  transportOptions: ConnectTransportOptions,
  response: Response | Promise<Response>
): ClientResponse<O> {
  let closed = false; // the response is closed
  let receiving = false; // we are currently waiting for the response, or reading from it
  let head: Head | undefined;
  let stream: EnvelopeReader | undefined;
  return {
    receive(handler): void {
      if (closed) {
        handler.onClose(new ConnectError("response closed", Code.Internal));
        closed = true;
        return;
      }
      if (receiving) {
        handler.onClose(
          new ConnectError("cannot receive concurrently", Code.Internal)
        );
        closed = true;
        return;
      }
      receiving = true;
      void Promise.resolve(response)
        .then(async (response) => {
          if (!head) {
            head = parseHead(response);
            handler.onHeader?.(head.header);
            if (response.status != 200) {
              handler.onTrailer?.(head.trailer);
              if (head.contentType == "application/json") {
                throw ConnectError.fromJsonString(await response.text(), {
                  typeRegistry: transportOptions.typeRegistry,
                  metadata: head.trailer,
                });
              }
              throw new ConnectError(
                `HTTP ${response.status} ${response.statusText}`,
                codeFromConnectHttpStatus(response.status)
              );
            }
            if (head.contentType == null) {
              throw new ConnectError(
                `missing response content type`,
                Code.Internal
              );
            }
            if (head.format == null) {
              throw new ConnectError(
                `unexpected response content type ${head.contentType}`,
                Code.Internal
              );
            }
          }

          if (!stream) {
            if (response.body === null) {
              throw "missing response body";
            }
            stream = createEnvelopeReader(response.body);
          }

          const envelope = await stream();
          if (envelope == null) {
            handler.onClose();
            return;
          }
          if (
            (envelope.flags & endStreamResponseFlag) ===
            endStreamResponseFlag
          ) {
            const endStream = EndStream.fromJsonString(
              new TextDecoder().decode(envelope.data),
              {
                typeRegistry: transportOptions.typeRegistry,
              }
            );
            handler.onTrailer?.(endStream.metadata);
            handler.onClose(endStream.error);
            return;
          }
          const message =
            head.format == "json"
              ? messageType.fromJsonString(
                  new TextDecoder().decode(envelope.data)
                )
              : messageType.fromBinary(envelope.data);
          receiving = false;
          handler.onMessage(message);
        })
        .catch((reason) => {
          handler.onClose(extractRejectionError(reason));
        })
        .then(() => (receiving = false));
    },
  };
}

function createUnaryResponse<O extends Message<O>>(
  messageType: MessageType<O>,
  callOptions: ClientCallOptions,
  transportOptions: ConnectTransportOptions,
  response: Response | Promise<Response>
): ClientResponse<O> {
  let closed = false; // the response is closed
  let receiving = false; // we are currently waiting for the response, or reading from it
  let head: Head | undefined;
  let messageReceived = false;
  return {
    receive(handler): void {
      if (closed) {
        handler.onClose(new ConnectError("response closed", Code.Internal));
        closed = true;
        return;
      }
      if (receiving) {
        handler.onClose(
          new ConnectError("cannot receive concurrently", Code.Internal)
        );
        closed = true;
        return;
      }
      receiving = true;
      void Promise.resolve(response)
        .then(async (response) => {
          if (!head) {
            head = parseHead(response);
            handler.onHeader?.(head.header);
            if (response.status != 200) {
              handler.onTrailer?.(head.trailer);
              if (head.contentType == "application/json") {
                throw ConnectError.fromJsonString(await response.text(), {
                  typeRegistry: transportOptions.typeRegistry,
                  metadata: head.header,
                });
              }
              throw new ConnectError(
                `HTTP ${response.status} ${response.statusText}`,
                codeFromConnectHttpStatus(response.status)
              );
            }
            if (head.contentType == null) {
              throw new ConnectError(
                `missing response content type`,
                Code.Internal
              );
            }
            if (head.format == null) {
              throw new ConnectError(
                `unexpected response content type ${head.contentType}`,
                Code.Internal
              );
            }
          }
          if (!messageReceived) {
            const message =
              head.format == "json"
                ? messageType.fromJsonString(await response.text())
                : messageType.fromBinary(
                    new Uint8Array(await response.arrayBuffer())
                  );
            messageReceived = true;
            receiving = false;
            handler.onMessage(message);
            return;
          }
          closed = true;
          handler.onTrailer?.(head.trailer);
          handler.onClose();
        })
        .catch((reason) => {
          closed = true;
          handler.onClose(extractRejectionError(reason));
        })
        .then(() => (receiving = false));
    },
  };
}

function createConnectRequestHeaders(
  headers: HeadersInit | undefined,
  timeout: number | undefined,
  methodKind: MethodKind,
  useBinaryFormat: boolean
): Headers {
  const result = new Headers(headers);
  let type = "application/";
  if (methodKind != MethodKind.Unary) {
    type += "connect+";
  }
  type += useBinaryFormat ? "proto" : "json";
  result.set("Content-Type", type);
  if (timeout !== undefined) {
    result.set("Connect-Timeout-Ms", `${timeout}`);
  }
  return result;
}

type Head =
  | {
      header: Headers;
      trailer: Headers;
      contentType:
        | "application/json"
        | "application/proto"
        | "application/connect+json"
        | "application/connect+proto";
      format: "json" | "proto";
      stream: boolean;
    }
  | {
      header: Headers;
      trailer: Headers;
      contentType: string | null;
      format: null;
      stream: null;
    };

function parseHead(response: Response): Head {
  const header = new Headers(),
    trailer = new Headers();
  response.headers.forEach((value, key) => {
    if (key.toLowerCase().startsWith("trailer-")) {
      trailer.set(key.substring(8), value);
    } else {
      header.set(key, value);
    }
  });
  const contentType = header.get("Content-Type");
  const match = contentType?.match(/^application\/(connect\+)?(json|proto)$/);
  return match
    ? {
        header,
        trailer,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
        contentType: contentType as any,
        stream: !!match[1],
        format: match[2] as "json" | "proto",
      }
    : { header, trailer, contentType, format: null, stream: null };
}

const endStreamResponseFlag = 0b00000010;

/**
 * Represents the EndStreamResponse of the Connect protocol.
 */
class EndStream {
  error?: ConnectError;

  metadata: Headers;

  constructor(metadata: Headers, error?: ConnectError) {
    this.metadata = metadata;
    this.error = error;
  }

  /**
   * Parse an EndStreamResponse from a JSON string.
   * Will throw a ConnectError in case the JSON is malformed.
   */
  static fromJsonString(
    jsonString: string,
    options?: { typeRegistry?: IMessageTypeRegistry }
  ): EndStream {
    let json: JsonValue;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      json = JSON.parse(jsonString);
    } catch (e) {
      throw newParseError(e, "", false);
    }
    return this.fromJson(json, options);
  }

  /**
   * Parse an EndStreamResponse from a JSON value.
   * Will return a ConnectError, but throw one in case the JSON is malformed.
   */
  static fromJson(
    jsonValue: JsonValue,
    options?: { typeRegistry?: IMessageTypeRegistry }
  ): EndStream {
    if (
      typeof jsonValue != "object" ||
      jsonValue == null ||
      Array.isArray(jsonValue)
    ) {
      throw newParseError(jsonValue);
    }
    const metadata = new Headers();
    if ("metadata" in jsonValue) {
      if (
        typeof jsonValue.metadata != "object" ||
        jsonValue.metadata == null ||
        Array.isArray(jsonValue.metadata)
      ) {
        throw newParseError(jsonValue, ".metadata");
      }
      for (const [key, values] of Object.entries(jsonValue.metadata)) {
        if (
          !Array.isArray(values) ||
          values.some((value) => typeof value != "string")
        ) {
          throw newParseError(values, `.metadata["${key}"]`);
        }
        for (const value of values) {
          metadata.append(key, value as string);
        }
      }
    }
    let error: ConnectError | undefined;
    if ("error" in jsonValue) {
      if (
        typeof jsonValue.error != "object" ||
        jsonValue.error == null ||
        Array.isArray(jsonValue.error)
      ) {
        throw newParseError(jsonValue, ".error");
      }
      if (Object.keys(jsonValue.error).length > 0) {
        try {
          error = ConnectError.fromJson(jsonValue.error, {
            ...options,
            metadata,
          });
        } catch (e) {
          throw newParseError(e, ".error", false);
        }
      }
    }
    return new EndStream(metadata, error);
  }
}
