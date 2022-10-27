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

/**
 * We want to run the TypeScript compiler's lib checks, because it gives us
 * confidence that our package @bufbuild/connect-web is set up correctly.
 *
 * But @grpc/grpc-js imports the package "protobufjs" (and through it, the
 * package "long"). We don't want to install them to satisfy lib checks, so
 * we declare them here. We also have a dependency on @types/long for this
 * reason.
 */

/* eslint-disable */
declare module "protobufjs" {
  export type Reader = any;
  export type IConversionOptions = any;
  export type INamespace = any;
  export type Message<T> = any;
  export type IParseOptions = any;
}
declare module "protobufjs/ext/descriptor" {
  export type IDescriptorProto = any;
  export type IEnumDescriptorProto = any;
  export const FileDescriptorSet: any;
  export type IFileDescriptorSet = any;
}
