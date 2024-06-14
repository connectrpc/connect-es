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

// @generated by protoc-gen-es v2.0.0-beta.1 with parameter "target=ts,import_extension=.js"
// @generated from file invoke/v1/invoke.proto (package invoke.v1, syntax proto3)
/* eslint-disable */

import type {
  GenDescFile,
  GenDescMessage,
  GenDescService,
} from "@bufbuild/protobuf/codegenv1";
import {
  fileDesc,
  messageDesc,
  serviceDesc,
} from "@bufbuild/protobuf/codegenv1";
import type {
  ClientCompatRequest,
  ClientCompatResponse,
} from "../../connectrpc/conformance/v1/client_compat_pb.js";
import { file_connectrpc_conformance_v1_client_compat } from "../../connectrpc/conformance/v1/client_compat_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file invoke/v1/invoke.proto.
 */
export const file_invoke_v1_invoke: GenDescFile =
  /*@__PURE__*/
  fileDesc(
    "ChZpbnZva2UvdjEvaW52b2tlLnByb3RvEglpbnZva2UudjEiUAoNSW52b2tlUmVxdWVzdBI/CgdyZXF1ZXN0GAEgASgLMi4uY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5DbGllbnRDb21wYXRSZXF1ZXN0IlMKDkludm9rZVJlc3BvbnNlEkEKCHJlc3BvbnNlGAEgASgLMi8uY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5DbGllbnRDb21wYXRSZXNwb25zZTJOCg1JbnZva2VTZXJ2aWNlEj0KBkludm9rZRIYLmludm9rZS52MS5JbnZva2VSZXF1ZXN0GhkuaW52b2tlLnYxLkludm9rZVJlc3BvbnNlYgZwcm90bzM",
    [file_connectrpc_conformance_v1_client_compat],
  );

/**
 * @generated from message invoke.v1.InvokeRequest
 */
export type InvokeRequest = Message<"invoke.v1.InvokeRequest"> & {
  /**
   * @generated from field: connectrpc.conformance.v1.ClientCompatRequest request = 1;
   */
  request?: ClientCompatRequest;
};

/**
 * Describes the message invoke.v1.InvokeRequest.
 * Use `create(InvokeRequestSchema)` to create a new message.
 */
export const InvokeRequestSchema: GenDescMessage<InvokeRequest> =
  /*@__PURE__*/
  messageDesc(file_invoke_v1_invoke, 0);

/**
 * @generated from message invoke.v1.InvokeResponse
 */
export type InvokeResponse = Message<"invoke.v1.InvokeResponse"> & {
  /**
   * @generated from field: connectrpc.conformance.v1.ClientCompatResponse response = 1;
   */
  response?: ClientCompatResponse;
};

/**
 * Describes the message invoke.v1.InvokeResponse.
 * Use `create(InvokeResponseSchema)` to create a new message.
 */
export const InvokeResponseSchema: GenDescMessage<InvokeResponse> =
  /*@__PURE__*/
  messageDesc(file_invoke_v1_invoke, 1);

/**
 * @generated from service invoke.v1.InvokeService
 */
export const InvokeService: GenDescService<{
  /**
   * @generated from rpc invoke.v1.InvokeService.Invoke
   */
  invoke: {
    methodKind: "unary";
    input: typeof InvokeRequestSchema;
    output: typeof InvokeResponseSchema;
  };
}> = /*@__PURE__*/ serviceDesc(file_invoke_v1_invoke, 0);
