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

import type { AnyMessage } from "@bufbuild/protobuf";
import { MethodKind } from "@bufbuild/protobuf";
import type { MethodImpl, TypedMethodInfo } from "../method-implementation";

export type InterceptorImpl<M extends TypedMethodInfo> = (
  ...args: [...Parameters<MethodImpl<M>>, MethodImpl<M>]
) => ReturnType<MethodImpl<M>>;

/**
 * Intercepts requests and responses for all RPCs in a router and allows
 * modifying behavior.
 */
export interface UniversalInterceptor {
  /**
   * The handler for streaming client and streaming server calls.
   */
  biDiStreaming?: InterceptorImpl<
    TypedMethodInfo<AnyMessage, AnyMessage, MethodKind.BiDiStreaming>
  >;

  /**
   * The handler for streaming client and streaming server calls.
   */
  clientStreaming?: InterceptorImpl<
    TypedMethodInfo<AnyMessage, AnyMessage, MethodKind.ClientStreaming>
  >;

  /**
   * The handler for unary client and streaming server calls.
   */
  serverStreaming?: InterceptorImpl<
    TypedMethodInfo<AnyMessage, AnyMessage, MethodKind.ServerStreaming>
  >;

  /**
   * The handler for unary client and unary server calls.
   */
  unary?: InterceptorImpl<
    TypedMethodInfo<AnyMessage, AnyMessage, MethodKind.Unary>
  >;
}
