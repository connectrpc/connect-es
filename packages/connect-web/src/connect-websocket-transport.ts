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
import type {
  ContextValues,
  Interceptor,
  StreamResponse,
  Transport,
  UnaryResponse,
} from "@connectrpc/connect";
import { Code, ConnectError, createContextValues } from "@connectrpc/connect";
import {
  createMethodUrl,
  getAbortSignalReason,
  runStreamingCall,
  runUnaryCall,
} from "@connectrpc/connect/protocol";
import {
  closeCodeConnectClientError,
  closeCodeInvalidFramePayloadData,
  closeCodeMessageTooBig,
  closeCodeNormalClosure,
  deserializeMessage,
  protocolError,
  queryParamTimeoutMs,
  serializeMessage,
  subprotocolJson,
  subprotocolProto,
  validateMetadata,
} from "@connectrpc/connect/protocol-connect-websocket";
import type {
  ClientMessage,
  SerializationOptions,
} from "@connectrpc/connect/protocol-connect-websocket";
import { createAsyncQueue } from "./async-queue.js";

/**
 * The part of the standard WebSocket API that the transport uses.
 */
export interface WebSocketLike {
  /**
   * The type of binary messages, which the transport sets to "arraybuffer".
   */
  binaryType: string;

  /**
   * The subprotocol selected by the server, or an empty string for none.
   */
  readonly protocol: string;

  /**
   * The extensions selected by the server, or an empty string for none.
   */
  readonly extensions: string;

  /**
   * Sends a string as a text message, or bytes as a binary message.
   */
  send(data: string | Uint8Array<ArrayBuffer>): void;

  /**
   * Closes the connection with a close code and a reason.
   */
  close(code?: number, reason?: string): void;

  /**
   * Listens for the connection to open, to receive a message, or to close.
   */
  addEventListener(type: "open", listener: () => void): void;
  addEventListener(
    type: "message",
    listener: (event: { data: unknown }) => void,
  ): void;
  addEventListener(
    type: "close",
    listener: (event: { code: number }) => void,
  ): void;
}

/**
 * Options used to configure the Connect-over-WebSocket transport.
 */
export interface ConnectWebSocketTransportOptions {
  /**
   * The base URL for all RPCs, with the scheme http, https, ws, or wss.
   */
  baseUrl: string;

  /**
   * Selects the Protobuf binary format, where the default is JSON.
   */
  useBinaryFormat?: boolean;

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
   * Overrides the WebSocket implementation used by the transport.
   */
  WebSocket?: new (
    url: string,
    protocols: string[],
  ) => WebSocketLike;

  /**
   * The timeout in milliseconds for all calls, unless a call sets its own.
   */
  defaultTimeoutMs?: number;
}

/**
 * Creates a Transport for the Connect-over-WebSocket protocol, which supports
 * all four RPC types in web browsers by opening one WebSocket per call.
 */
export function createConnectWebSocketTransport(
  options: ConnectWebSocketTransportOptions,
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
  const url = new URL(baseUrl || "/", globalThis.location?.href);
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

/** Runs one call on a new connection, and returns once the header is read. */
async function call<I extends DescMessage, O extends DescMessage>(
  options: ConnectWebSocketTransportOptions,
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
  validateMetadata(req.header);
  const serializationOptions: SerializationOptions = {
    ...options,
    useBinaryFormat: options.useBinaryFormat ?? false,
  };
  const subprotocol = serializationOptions.useBinaryFormat
    ? subprotocolProto
    : subprotocolJson;
  req.signal.throwIfAborted();
  const socket: WebSocketLike = new (options.WebSocket ?? globalThis.WebSocket)(
    req.url,
    [subprotocol],
  );
  socket.binaryType = "arraybuffer";
  const messageQueue = createAsyncQueue<string | Uint8Array>();

  function close(closeCode: number, reason?: string): void {
    messageQueue.end();
    // A Close frame holds at most 125 bytes:
    //
    // - code: 2 bytes
    // - reason: 123 UTF-8 bytes
    //
    // close() throws a SyntaxError for a reason that won't fit, so we truncate it here.
    const { read } = new TextEncoder().encodeInto(
      reason ?? "",
      new Uint8Array(123),
    );
    socket.close(closeCode, reason?.slice(0, read));
  }
  req.signal.addEventListener("abort", () => close(closeCodeNormalClosure), {
    once: true,
  });

  const closed = new Promise<number>((resolve) => {
    socket.addEventListener("close", (event) => {
      messageQueue.end();
      resolve(event.code);
    });
  });
  socket.addEventListener("message", (event) => {
    messageQueue.push(
      typeof event.data === "string"
        ? event.data
        : new Uint8Array(event.data as ArrayBuffer),
    );
  });

  await new Promise<void>((resolve, reject) => {
    socket.addEventListener("open", () => resolve());
    req.signal.addEventListener(
      "abort",
      () => reject(getAbortSignalReason(req.signal)),
      {
        once: true,
      },
    );
    void closed.then(() =>
      reject(
        new ConnectError(
          "connection failed before it opened, and the reason is not available to the client",
          Code.Unavailable,
        ),
      ),
    );
  });
  if (socket.protocol !== subprotocol) {
    const error = protocolError(`unexpected subprotocol "${socket.protocol}"`);
    close(closeCodeConnectClientError, error.rawMessage);
    throw error;
  }

  let sendError: ConnectError | undefined;
  function send(message: ClientMessage<MessageShape<I>>): void {
    if (!req.signal.aborted) {
      socket.send(
        serializeMessage(message, method.input, serializationOptions),
      );
    }
  }
  async function sendMessages(): Promise<void> {
    try {
      send({ type: "metadata", value: req.header });
      for await (const message of req.message) {
        send({ type: "body", value: message });
      }
      send({ type: "end", value: undefined });
    } catch (e) {
      sendError = ConnectError.from(e);
      close(closeCodeConnectClientError, sendError.rawMessage);
    }
  }
  void sendMessages();

  const trailer = new Headers();

  async function read() {
    try {
      const result = await messageQueue.next();
      if (result.done !== true) {
        return deserializeMessage(
          result.value,
          method.output,
          serializationOptions,
        );
      }
    } catch (e) {
      const error = ConnectError.from(e);
      close(closeCodeConnectClientError, error.rawMessage);
      throw error;
    }
    if (req.signal.aborted) {
      throw ConnectError.from(getAbortSignalReason(req.signal), Code.Canceled);
    }
    throw sendError ?? closeError(await closed);
  }

  const message = await read();
  if (message.type !== "metadata") {
    const error = protocolError("first message is not metadata");
    close(closeCodeConnectClientError, error.rawMessage);
    throw error;
  }
  const header = message.value;

  async function* readBodies(): AsyncIterable<MessageShape<O>> {
    let message = await read();
    while (message.type === "body") {
      yield message.value;
      message = await read();
    }

    if (message.type !== "end" || message.value === undefined) {
      const error = protocolError(
        "server stream did not end with an S message",
      );
      close(closeCodeConnectClientError, error.rawMessage);
      throw error;
    }

    close(closeCodeNormalClosure);
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
