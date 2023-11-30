// Copyright 2021-2023 The Connect Authors
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
  AnyMessage,
  Message,
  MethodInfoBiDiStreaming,
  MethodInfoClientStreaming,
  MethodInfoServerStreaming,
  MethodInfoUnary,
  ServiceType,
} from "@bufbuild/protobuf";

interface mtShared {
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
 * This type should ultimately live inside @bufbuild/protobuf but will
 * exist here for now until https://github.com/bufbuild/protobuf-es/pull/594
 * can be merged/resolved.
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
