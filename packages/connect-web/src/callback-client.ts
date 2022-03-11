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
  ClientCall,
  ClientCallOptions,
  ClientTransport,
  createClientTransportCalls,
  receiveAll,
} from "./client-transport.js";
import { StatusCode } from "./status-code.js";

// prettier-ignore
/**
 * CallbackClient is a simple client that supports unary and server-
 * streaming methods. Methods take callback functions, which will be
 * called when a response message arrives, or an error occurs.
 *
 * Client methods return a function that cancels the call. This is a
 * convenient alternative to creating a AbortController and passing
 * its AbortSignal as an option to the method.
 *
 * If a call is cancelled by an AbortController or by the returned
 * cancel-function, ConnectErrors with the code Canceled are
 * silently discarded.
 *
 * CallbackClient is most convenient for use in React effects, where
 * a function returned by the effect is called when the effect is
 * torn down.
 */
export type CallbackClient<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: PartialMessage<I>, callback: (error: ConnectError | undefined, response: O) => void, options?: ClientCallOptions) => CancelFn
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: PartialMessage<I>, responseCallback: (response: O) => void, messageCallback: (error: ConnectError | undefined) => void, options?: ClientCallOptions) => CancelFn
  : never;
};

// prettier-ignore
export type CallbackClientWithExactRequest<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: I, callback: (error: ConnectError | undefined, response: O) => void, options?: ClientCallOptions) => CancelFn
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: I, responseCallback: (response: O) => void, messageCallback: (error: ConnectError | undefined) => void, options?: ClientCallOptions) => CancelFn
  : never;
};

type CancelFn = () => void;

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
  transport: ClientTransport
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
) => CancelFn;

function createUnaryFn<I extends Message, O extends Message>(
  call: ClientCall<I, O>
): UnaryFn<I, O> {
  return function (requestMessage, callback, options) {
    const abort = new AbortController();
    options = wrapSignal(abort, options);
    const [request, response] = call(options);
    request.send(messageFromPartial(requestMessage, call.method.I), (error) => {
      if (error) {
        if (error.code === StatusCode.Canceled && abort.signal.aborted) {
          // As documented, discard Canceled errors if canceled by the user.
          return;
        }
        callback(error, new call.method.O());
      }
    });
    let singleMessage = new call.method.O();
    receiveAll(response, {
      onMessage(message): void {
        singleMessage = message;
      },
      onClose(error?: ConnectError) {
        if (
          error &&
          error.code === StatusCode.Canceled &&
          abort.signal.aborted
        ) {
          // As documented, discard Canceled errors if canceled by the user.
          return;
        }
        callback(error, singleMessage);
      },
    });
    return () => abort.abort();
  };
}

type ServerStreamingFn<I extends Message, O extends Message> = (
  request: I | PartialMessage<I>,
  onResponse: (response: O) => void,
  onClose: (error: ConnectError | undefined) => void,
  options?: ClientCallOptions
) => CancelFn;

function createServerStreamingFn<I extends Message, O extends Message>(
  call: ClientCall<I, O>
): ServerStreamingFn<I, O> {
  return function (requestMessage, onResponse, onClose, options) {
    const abort = new AbortController();
    options = wrapSignal(abort, options);
    const [request, response] = call(options);
    request.send(messageFromPartial(requestMessage, call.method.I), (error) => {
      if (error) {
        if (error.code === StatusCode.Canceled && abort.signal.aborted) {
          // As documented, discard Canceled errors if canceled by the user.
          return;
        }
        onClose(error);
      }
    });
    receiveAll(response, {
      onMessage(message): void {
        onResponse(message);
      },
      onClose(error?: ConnectError): void {
        if (
          error &&
          error.code === StatusCode.Canceled &&
          abort.signal.aborted
        ) {
          // As documented, discard Canceled errors if canceled by the user.
          return;
        }
        onClose(error);
      },
    });
    return () => abort.abort();
  };
}

function wrapSignal(
  abort: AbortController,
  options: ClientCallOptions | undefined
): ClientCallOptions {
  if (options?.signal) {
    options.signal.addEventListener("abort", () => abort.abort());
  }
  return { ...options, signal: abort.signal };
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
