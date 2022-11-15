// Copyright 2021-2022 Buf Technologies, Inc.
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
