import type {
  Message,
  MessageType,
  MethodInfoServerStreaming,
  MethodInfoUnary,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { MethodKind } from "@bufbuild/protobuf";
import type { ConnectError } from "./connect-error.js";
import {
  createClientTransportCalls,
  ClientCall,
  ClientTransport,
  receiveAll,
  ClientCallOptions,
} from "./client-transport.js";

// prettier-ignore
/**
 * CallbackClient is a simple client that supports unary and server-
 * streaming methods. Methods take callback functions.
 */
export type CallbackClient<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: PartialMessage<I>, callback: (error: ConnectError | undefined, response: O) => void, options?: ClientCallOptions) => void
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: PartialMessage<I>, responseCallback: (response: O) => void, messageCallback: (error: ConnectError | undefined) => void, options?: ClientCallOptions) => void
  : never;
};

// prettier-ignore
export type CallbackClientWithExactRequest<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: I, callback: (error: ConnectError | undefined, response: O) => void, options?: ClientCallOptions) => void
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: I, responseCallback: (response: O) => void, messageCallback: (error: ConnectError | undefined) => void, options?: ClientCallOptions) => void
  : never;
};

interface Options {
  exactRequest?: boolean;
}

export function makeCallbackClient<T extends ServiceType>(
  service: T,
  transport: ClientTransport,
  options?: { exactRequest?: false }
): CallbackClient<T>;
export function makeCallbackClient<T extends ServiceType>(
  service: T,
  transport: ClientTransport,
  options: { exactRequest: true }
): CallbackClientWithExactRequest<T>;

/**
 * Create a CallbackClient for the given service, invoking RPCs through the
 * given transport.
 */
export function makeCallbackClient<T extends ServiceType>(
  service: T,
  transport: ClientTransport,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: Options
) {
  const client: Record<string, unknown> = {};
  for (const call of createClientTransportCalls(service, transport)) {
    switch (call.method.kind) {
      case MethodKind.Unary:
        client[call.localName] = createUnaryFn(call);
        break;
      case MethodKind.ServerStreaming:
        client[call.localName] = createServerStreamingFn(call);
        break;
      case MethodKind.ClientStreaming:
      case MethodKind.BiDiStreaming:
        break;
    }
  }
  return client as CallbackClient<T> | CallbackClientWithExactRequest<T>;
}

type UnaryFn<I extends Message, O extends Message> = (
  request: I | PartialMessage<I>,
  callback: (error: ConnectError | undefined, response: O) => void,
  options?: ClientCallOptions
) => void;

function createUnaryFn<I extends Message, O extends Message>(
  call: ClientCall<I, O>
): UnaryFn<I, O> {
  return function (requestMessage, callback, options) {
    const [request, response] = call(options);
    request.send(messageFromPartial(requestMessage, call.method.I), (error) => {
      if (error) {
        callback(error, new call.method.O());
      }
    });
    receiveAll(response, {
      onMessage(message): void {
        callback(undefined, message);
      },
      onClose(error?: ConnectError) {
        callback(error, new call.method.O());
      },
    });
  };
}

type ServerStreamingFn<I extends Message, O extends Message> = (
  request: I | PartialMessage<I>,
  onResponse: (response: O) => void,
  onClose: (error: ConnectError | undefined) => void,
  options?: ClientCallOptions
) => void;

function createServerStreamingFn<I extends Message, O extends Message>(
  call: ClientCall<I, O>
): ServerStreamingFn<I, O> {
  return function (requestMessage, onResponse, onClose, options) {
    const [request, response] = call(options);
    request.send(messageFromPartial(requestMessage, call.method.I), (error) => {
      if (error) {
        onClose(error);
      }
    });
    receiveAll(response, {
      onMessage(message): void {
        onResponse(message);
      },
      onClose(error?: ConnectError): void {
        onClose(error);
      },
    });
  };
}

function messageFromPartial<T extends Message>(
  message: T | PartialMessage<T>,
  type: MessageType<T>
) {
  if (message instanceof type) {
    return message;
  }
  // TODO investigate cast
  return new type(message as PartialMessage<T>);
}
