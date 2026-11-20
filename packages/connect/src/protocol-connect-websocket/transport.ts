// Copyright 2021-2026 The Connect Authors
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
  DescMessage,
  DescMethodStreaming,
  DescMethodUnary,
  JsonReadOptions,
  JsonWriteOptions,
  MessageInitShape,
  MessageShape,
} from "@bufbuild/protobuf";
import {
  closeCodeConnectClientError,
  closeCodeInvalidFramePayloadData,
  closeCodeMessageTooBig,
  closeCodeNormalClosure,
} from "../protocol/websocket-close-code.js";
import { deserializeMessage, serializeMessage } from "./message.js";
import { protocolError } from "./error.js";
import type { ClientMessage } from "./message.js";
import { validateMetadata } from "./metadata.js";
import { queryParamTimeoutMs } from "./query-params.js";
import { subprotocolJson, subprotocolProto } from "./subprotocol.js";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import type { ContextValues } from "../context-values.js";
import { createContextValues } from "../context-values.js";
import type {
  Interceptor,
  StreamResponse,
  UnaryResponse,
} from "../interceptor.js";
import { createMethodUrl } from "../protocol/create-method-url.js";
import { runStreamingCall, runUnaryCall } from "../protocol/run-call.js";
import { getAbortSignalReason } from "../protocol/signals.js";
import type {
  UniversalWebSocket,
  UniversalWebSocketClientFn,
} from "../protocol/universal-websocket.js";
import type { Transport } from "../transport.js";

/**
 * Options used to configure the Connect-over-WebSocket transport.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export interface CommonWebSocketTransportOptions {
  /**
   * The WebSocket client to use.
   */
  webSocketClient: UniversalWebSocketClientFn;

  /**
   * The base URL for all RPCs, with the scheme http, https, ws, or wss.
   */
  baseUrl: string;

  /**
   * Selects the Protobuf binary format over JSON.
   */
  useBinaryFormat: boolean;

  /**
   * Interceptors that are applied to all calls running through this transport.
   */
  interceptors?: Interceptor[];

  /**
   * Options for the JSON format, where unknown fields are ignored by default.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  /**
   * The timeout in milliseconds for all calls, unless a call sets its own.
   */
  defaultTimeoutMs?: number;
}

/**
 * Creates a Transport that opens one WebSocket connection per call.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createTransport(
  options: CommonWebSocketTransportOptions,
): Transport {
  return {
    async unary<I extends DescMessage, O extends DescMessage>(
      method: DescMethodUnary<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: MessageInitShape<I>,
      contextValues?: ContextValues,
    ): Promise<UnaryResponse<I, O>> {
      timeoutMs =
        timeoutMs === undefined
          ? options.defaultTimeoutMs
          : timeoutMs <= 0
            ? undefined
            : timeoutMs;
      return await runUnaryCall<I, O>({
        interceptors: options.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: false,
          service: method.parent,
          method,
          requestMethod: "GET",
          url: createUrl(options.baseUrl, method, timeoutMs),
          header: new Headers(header),
          contextValues: contextValues ?? createContextValues(),
          message,
        },
        next: async (req) => {
          const response = await call(options, method, {
            ...req,
            message: [req.message],
          });

          const messages: MessageShape<O>[] = [];
          for await (const responseMessage of response.message) {
            messages.push(responseMessage);
          }
          if (messages.length !== 1) {
            throw new ConnectError(
              `protocol error: received ${messages.length} messages, expected exactly one`,
              Code.Unimplemented,
            );
          }

          return {
            stream: false,
            service: method.parent,
            method,
            header: response.header,
            message: messages[0],
            trailer: response.trailer,
          };
        },
      });
    },

    async stream<I extends DescMessage, O extends DescMessage>(
      method: DescMethodStreaming<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      input: AsyncIterable<MessageInitShape<I>>,
      contextValues?: ContextValues,
    ): Promise<StreamResponse<I, O>> {
      timeoutMs =
        timeoutMs === undefined
          ? options.defaultTimeoutMs
          : timeoutMs <= 0
            ? undefined
            : timeoutMs;

      return await runStreamingCall<I, O>({
        interceptors: options.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: true,
          service: method.parent,
          method,
          requestMethod: "GET",
          url: createUrl(options.baseUrl, method, timeoutMs),
          header: new Headers(header),
          contextValues: contextValues ?? createContextValues(),
          message: input,
        },
        next: async (req) => ({
          ...req,
          ...(await call(options, method, req)),
        }),
      });
    },
  };
}

/** Creates the WebSocket URL of a call from the base URL of the transport. */
function createUrl(
  baseUrl: string,
  method: DescMethodUnary | DescMethodStreaming,
  timeoutMs: number | undefined,
): string {
  const url = new URL(baseUrl, globalThis.location?.href);
  switch (url.protocol) {
    case "http:":
      url.protocol = "ws:";
      break;
    case "https:":
      url.protocol = "wss:";
      break;
    case "ws:":
    case "wss:":
      break;
    default:
      throw new ConnectError(
        `base URL scheme "${url.protocol}" must be http, https, ws, or wss`,
        Code.Internal,
      );
  }

  url.pathname = createMethodUrl(url.pathname, method);
  url.hash = "";
  if (timeoutMs !== undefined) {
    url.searchParams.set(queryParamTimeoutMs, `${timeoutMs}`);
  }
  return url.toString();
}

/** Opens the connection of a call, and fails if it is not safe to use. */
async function openConnection(
  options: CommonWebSocketTransportOptions,
  req: { url: string; header: Headers; signal: AbortSignal },
): Promise<UniversalWebSocket> {
  validateMetadata(req.header);
  const subprotocol = options.useBinaryFormat
    ? subprotocolProto
    : subprotocolJson;
  const connection = await options.webSocketClient({
    url: req.url,
    protocols: [subprotocol],
    signal: req.signal,
  });

  if (connection.protocol !== subprotocol) {
    throw fail(
      connection,
      protocolError(`unexpected subprotocol "${connection.protocol}"`),
    );
  }

  return connection;
}

/** Runs one call on a new connection, and returns once the header is read. */
async function call<I extends DescMessage, O extends DescMessage>(
  options: CommonWebSocketTransportOptions,
  method: DescMethodUnary<I, O> | DescMethodStreaming<I, O>,
  req: {
    url: string;
    header: Headers;
    signal: AbortSignal;
    message: AsyncIterable<MessageShape<I>> | Iterable<MessageShape<I>>;
  },
): Promise<{
  header: Headers;
  trailer: Headers;
  message: AsyncIterable<MessageShape<O>>;
}> {
  const connection = await openConnection(options, req);
  let sendError: ConnectError | undefined;

  function send(message: ClientMessage<MessageShape<I>>): void {
    if (!req.signal.aborted) {
      connection.send(serializeMessage(message, method.input, options));
    }
  }
  async function sendMessages(): Promise<void> {
    try {
      send({ type: "metadata", value: req.header });
      for await (const message of req.message) {
        if (req.signal.aborted) {
          return;
        }
        send({ type: "body", value: message });
      }
      send({ type: "end", value: undefined });
    } catch (e) {
      sendError = fail(connection, ConnectError.from(e));
    }
  }
  void sendMessages();

  const serverData = connection.messages[Symbol.asyncIterator]();
  const trailer = new Headers();

  async function read() {
    try {
      const result = await serverData.next();
      if (result.done !== true) {
        return deserializeMessage(result.value, method.output, options);
      }
    } catch (e) {
      throw fail(connection, ConnectError.from(e));
    }
    if (req.signal.aborted) {
      throw ConnectError.from(getAbortSignalReason(req.signal), Code.Canceled);
    }
    throw sendError ?? closeError(await connection.closed);
  }

  const message = await read();
  if (message.type !== "metadata") {
    throw fail(connection, protocolError("first message is not metadata"));
  }
  const header = message.value;

  async function* readBodies(): AsyncIterable<MessageShape<O>> {
    let message = await read();
    while (message.type === "body") {
      yield message.value;
      message = await read();
    }

    if (message.type !== "end" || message.value === undefined) {
      throw fail(
        connection,
        protocolError("server stream did not end with an S message"),
      );
    }

    connection.close(closeCodeNormalClosure);
    const { error, metadata } = message.value;
    if (error !== undefined) {
      header.forEach((value, key) => {
        error.metadata.append(key, value);
      });
      throw error;
    }

    metadata.forEach((value, key) => {
      trailer.append(key, value);
    });
  }

  return { header, trailer, message: readBodies() };
}

/** Closes the connection with 3102 and the message of the error it returns. */
function fail(
  connection: UniversalWebSocket,
  error: ConnectError,
): ConnectError {
  connection.close(closeCodeConnectClientError, error.rawMessage);
  return error;
}

/** Creates the error for a connection that closed before the end message. */
function closeError(closeCode: number): ConnectError {
  let code: Code;
  switch (closeCode) {
    case closeCodeMessageTooBig:
      code = Code.ResourceExhausted;
      break;
    case closeCodeInvalidFramePayloadData:
      code = Code.Internal;
      break;
    default:
      code = Code.Unavailable;
  }
  return new ConnectError(
    `connection closed with code ${closeCode} before the end of the stream`,
    code,
  );
}
