import type {
  AnyMessage,
  Message,
  MethodInfo,
  MethodKind,
  ServiceType,
} from "@bufbuild/protobuf";
import type * as http from "http";
import type * as http2 from "http2";
import type {
  BiDiStreamingImpl,
  ClientStreamingImpl,
  ServerStreamingImpl,
  UnaryImpl,
} from "./handler.js";

/**
 * A Protocol provides handlers that invoke the user-provided implementation.
 */
export interface Protocol {
  supportsMediaType(type: string): boolean;

  createHandler(spec: ImplSpec): ImplHandler;
}

// prettier-ignore
/**
 * ImplSpec wraps a user-provided implementation along with service and method
 * metadata in a discriminated union type.
 */
export type ImplSpec<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage> =
  {
    service: ServiceType;
    method: MethodInfo<I, O>;
  }
  & (
  | { kind: MethodKind.Unary;           impl: UnaryImpl<I, O> }
  | { kind: MethodKind.ServerStreaming; impl: ServerStreamingImpl<I, O> }
  | { kind: MethodKind.ClientStreaming; impl: ClientStreamingImpl<I, O> }
  | { kind: MethodKind.BiDiStreaming;   impl: BiDiStreamingImpl<I, O> }
  );

/**
 * An ImplHandler is bound to a user-provided implementation and to a protocol.
 */
export type ImplHandler = (
  req: http.IncomingMessage | http2.Http2ServerRequest,
  res: http.ServerResponse | http2.Http2ServerResponse
) => Promise<void>;
