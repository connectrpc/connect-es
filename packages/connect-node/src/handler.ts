import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodInfo,
  MethodInfoBiDiStreaming,
  MethodInfoClientStreaming,
  MethodInfoServerStreaming,
  MethodInfoUnary,
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
export type ServiceImplementation<T extends ServiceType> = {
  [P in keyof T["methods"]]:
  T["methods"][P] extends MethodInfoUnary<infer I, infer O> ? ServerUnaryFn<I, O>
    : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? ServerServerStreamingFn<I, O>
      : T["methods"][P] extends MethodInfoClientStreaming<infer I, infer O> ? ServerClientStreamingFn<I, O>
        : T["methods"][P] extends MethodInfoBiDiStreaming<infer I, infer O> ? ServerBiDiStreamingFn<I, O>
          : never;
};

// prettier-ignore
export type MethodImplementation<M extends MethodInfo> =
  M extends MethodInfoUnary<infer I, infer O> ? ServerUnaryFn<I, O>
    : M extends MethodInfoServerStreaming<infer I, infer O> ? ServerClientStreamingFn<I, O>
      : M extends MethodInfoClientStreaming<infer I, infer O> ? ServerServerStreamingFn<I, O>
        : M extends MethodInfoBiDiStreaming<infer I, infer O> ? ServerBiDiStreamingFn<I, O>
          : never;

export type ServerUnaryFn<I extends Message<I>, O extends Message<O>> = (
  request: I,
  context: HandlerContext
) => Promise<O> | Promise<PartialMessage<O>> | O | PartialMessage<O>;

export type ServerClientStreamingFn<
  I extends Message<I>,
  O extends Message<O>
> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => Promise<O> | Promise<PartialMessage<O>>;

export type ServerServerStreamingFn<
  I extends Message<I>,
  O extends Message<O>
> = (
  request: I,
  context: HandlerContext
) => AsyncIterable<O> | AsyncIterable<PartialMessage<O>>;

export type ServerBiDiStreamingFn<
  I extends Message<I>,
  O extends Message<O>
> = (
  requests: AsyncIterable<I>,
  context: HandlerContext
) => AsyncIterable<O> | AsyncIterable<PartialMessage<O>>;
