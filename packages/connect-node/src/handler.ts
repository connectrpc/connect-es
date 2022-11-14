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

/**
 * Handler handles a Node.js request for one specific RPC.
 * Note that this function is compatible with http.RequestListener and its
 * equivalent for http2.
 */
export type Handler = NodeHandler & {
  /**
   * The service the RPC belongs to.
   */
  service: ServiceType;
  /**
   * The RPC.
   */
  method: MethodInfo;
  /**
   * The request path of the procedure, without any prefixes.
   * For example, "/something/foo.FooService/Bar" for the method
   * "Bar" of the service "foo.FooService".
   */
  requestPath: string;
};

/**
 * NodeHandler is compatible with http.RequestListener and its equivalent
 * for http2.
 */
export type NodeHandler = (
  request: http.IncomingMessage | http2.Http2ServerRequest,
  response: http.ServerResponse | http2.Http2ServerResponse
) => void;

// TODO
export interface HandlerContext {
  requestHeader: Headers;
  responseHeader: Headers;
  responseTrailer: Headers;
}

// prettier-ignore
/**
 * ServiceImpl is the interface of the implementation of a service.
 */
export type ServiceImpl<T extends ServiceType> = {
  [P in keyof T["methods"]]: MethodImpl<T["methods"][P]>;
};

// prettier-ignore
/**
 * MethodImpl is the signature of the implementation of an RPC.
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

/**
 * UnaryImp is the signature of the implementation of a unary RPC.
 */
export type UnaryImpl<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => Promise<O> | Promise<PartialMessage<O>> | O | PartialMessage<O>;

/**
 * ClientStreamingImpl is the signature of the implementation of a
 * client-streaming RPC.
 */
export type ClientStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => Promise<O> | Promise<PartialMessage<O>>;

/**
 * ServerStreamingImpl is the signature of the implementation of a
 * server-streaming RPC.
 */
export type ServerStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => AsyncIterable<O> | AsyncIterable<PartialMessage<O>>;

/**
 * BiDiStreamingImpl is the signature of the implementation of a bi-di
 * streaming RPC.
 */
export type BiDiStreamingImpl<I extends Message<I>, O extends Message<O>> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => AsyncIterable<O> | AsyncIterable<PartialMessage<O>>;
