// Copyright 2021-2024 The Connect Authors
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

import type { DescMessage, DescMethod } from "@bufbuild/protobuf";

// TODO: Delete these once exported from `@bufbuild/protobuf`
export type DescMethodStreaming<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> =
  | DescMethodClientStreaming<I, O>
  | DescMethodServerStreaming<I, O>
  | DescMethodBiDiStreaming<I, O>;

export type DescMethodUnary<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> = Omit<DescMethod, "methodKind" | "input" | "output"> & {
  methodKind: "unary";
  input: I;
  output: O;
};

export type DescMethodServerStreaming<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> = Omit<DescMethod, "methodKind" | "input" | "output"> & {
  methodKind: "server_streaming";
  input: I;
  output: O;
};

export type DescMethodClientStreaming<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> = Omit<DescMethod, "methodKind" | "input" | "output"> & {
  methodKind: "client_streaming";
  input: I;
  output: O;
};

export type DescMethodBiDiStreaming<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> = Omit<DescMethod, "methodKind" | "input" | "output"> & {
  methodKind: "bidi_streaming";
  input: I;
  output: O;
};
