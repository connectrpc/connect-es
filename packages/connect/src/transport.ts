// Copyright 2021-2023 Buf Technologies, Inc.
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
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import type { StreamResponse, UnaryResponse } from "./interceptor.js";

/**
 * Transport represents the underlying transport for a client.
 * A transport implements a protocol, such as Connect or gRPC-web, and allows
 * for the concrete clients to be independent of the protocol.
 */
export interface Transport {
  /**
   * Call a unary RPC - a method that takes a single input message, and
   * responds with a single output message.
   */
  unary<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage>(
    service: ServiceType,
    method: MethodInfo<I, O>,
    signal: AbortSignal | undefined,
    timeoutMs: number | undefined,
    header: HeadersInit | undefined,
    input: PartialMessage<I>
  ): Promise<UnaryResponse<I, O>>;

  /**
   * Call a streaming RPC - a method that takes zero or more input messages,
   * and responds with zero or more output messages.
   */
  stream<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage>(
    service: ServiceType,
    method: MethodInfo<I, O>,
    signal: AbortSignal | undefined,
    timeoutMs: number | undefined,
    header: HeadersInit | undefined,
    input: AsyncIterable<I>
  ): Promise<StreamResponse<I, O>>;
}
