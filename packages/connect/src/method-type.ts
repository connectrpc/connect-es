import type {
  AnyMessage,
  Message,
  MethodInfoBiDiStreaming,
  MethodInfoClientStreaming,
  MethodInfoServerStreaming,
  MethodInfoUnary,
  ServiceType,
} from "@bufbuild/protobuf";

interface mtShared {
  readonly localName: string;
  readonly service: Omit<ServiceType, "methods">;
}

/**
 * A unary method: rpc (Input) returns (Output)
 */
export interface MethodTypeUnary<I extends Message<I>, O extends Message<O>>
  extends mtShared,
    MethodInfoUnary<I, O> {}

/**
 * A server streaming method: rpc (Input) returns (stream Output)
 */
export interface MethodTypeServerStreaming<
  I extends Message<I>,
  O extends Message<O>,
> extends mtShared,
    MethodInfoServerStreaming<I, O> {}

/**
 * A client streaming method: rpc (stream Input) returns (Output)
 */
export interface MethodTypeClientStreaming<
  I extends Message<I>,
  O extends Message<O>,
> extends mtShared,
    MethodInfoClientStreaming<I, O> {}

/**
 * A method that streams bi-directionally: rpc (stream Input) returns (stream Output)
 */
export interface MethodTypeBiDiStreaming<
  I extends Message<I>,
  O extends Message<O>,
> extends mtShared,
    MethodInfoBiDiStreaming<I, O> {}

/**
 * MethodType represents a self-contained method type. It must contain
 * references to the service that implements it.
 *
 * - "name": The original name of the protobuf rpc.
 * - "I": The input message type.
 * - "O": The output message type.
 * - "kind": The method type.
 * - "idempotency": User-provided indication whether the method will cause
 *   the same effect every time it is called.
 * - "localName": The local name of the method, safe to use in ECMAScript.
 * - "service": The service that implements the method, without methods.
 */
export type MethodType<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage,
> =
  | MethodTypeUnary<I, O>
  | MethodTypeServerStreaming<I, O>
  | MethodTypeClientStreaming<I, O>
  | MethodTypeBiDiStreaming<I, O>;
