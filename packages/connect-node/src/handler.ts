import type {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MessageType,
  MethodIdempotency,
  MethodInfo,
  MethodKind,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type * as http from "http";
import type * as http2 from "http2";

// TODO document
export interface HandlerOptions {
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

// TODO document
/**
 * Handler handles a Node.js request for one specific RPC.
 */
export type Handler = ((
  req: http.IncomingMessage | http2.Http2ServerRequest,
  res: http.ServerResponse | http2.Http2ServerResponse
) => boolean) & {
  service: ServiceType;
  method: MethodInfo;
  requestPath: string;
};

// TODO
export interface HandlerContext {
  requestHeaders: Headers;
  responseHeaders: Headers;
  responseTrailers: Headers;
}

// prettier-ignore
/**
 * TODO document
 */
export type ServiceImpl<T extends ServiceType> = {
  [P in keyof T["methods"]]: MethodImpl<T["methods"][P]>;
};

// prettier-ignore
/**
 * TODO document
 */
export type MethodImpl<M extends MI> =
    M extends MI<infer I, infer O, MethodKind.Unary>           ? UnaryImpl<I, O>
  : M extends MI<infer I, infer O, MethodKind.ServerStreaming> ? ServerStreamingImpl<I, O>
  : M extends MI<infer I, infer O, MethodKind.ClientStreaming> ? ClientStreamingImpl<I, O>
  : M extends MI<infer I, infer O, MethodKind.BiDiStreaming>   ? BiDiStreamingImpl<I, O>
  : never;

interface MI<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage,
  K extends MethodKind = MethodKind
> {
  readonly kind: K;
  readonly name: string;
  readonly I: MessageType<I>;
  readonly O: MessageType<O>;
  readonly idempotency?: MethodIdempotency;
}

export type UnaryImpl<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => Promise<O> | Promise<PartialMessage<O>> | O | PartialMessage<O>;

export type ClientStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => Promise<O> | Promise<PartialMessage<O>>;

export type ServerStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => AsyncIterable<O> | AsyncIterable<PartialMessage<O>>;

export type BiDiStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => AsyncIterable<O> | AsyncIterable<PartialMessage<O>>;
