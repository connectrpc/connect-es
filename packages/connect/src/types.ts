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

// TODO: Maybe move this to protobuf and export from root?

export type MethodKind = MethodInfo["methodKind"];

export type MethodInfo<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> =
  | MethodInfoUnary<I, O>
  | MethodInfoServerStreaming<I, O>
  | MethodInfoClientStreaming<I, O>
  | MethodInfoBiDiStreaming<I, O>;

export type MethodInfoUnary<
  I extends DescMessage,
  O extends DescMessage,
> = DescMethod & {
  methodKind: "unary";
  input: I;
  output: O;
};

export type MethodInfoServerStreaming<
  I extends DescMessage,
  O extends DescMessage,
> = DescMethod & {
  methodKind: "server_streaming";
  input: I;
  output: O;
};

export type MethodInfoClientStreaming<
  I extends DescMessage,
  O extends DescMessage,
> = DescMethod & {
  methodKind: "client_streaming";
  input: I;
  output: O;
};

export type MethodInfoBiDiStreaming<
  I extends DescMessage,
  O extends DescMessage,
> = DescMethod & {
  methodKind: "bidi_streaming";
  input: I;
  output: O;
};
