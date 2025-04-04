// Copyright 2021-2025 The Connect Authors
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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts"
// @generated from file buf/registry/module/v1beta1/commit_service.proto (package buf.registry.module.v1beta1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Commit } from "./commit_pb";
import { file_buf_registry_module_v1beta1_commit } from "./commit_pb";
import type { DigestType } from "./digest_pb";
import { file_buf_registry_module_v1beta1_digest } from "./digest_pb";
import type { ResourceRef } from "./resource_pb";
import { file_buf_registry_module_v1beta1_resource } from "./resource_pb";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1beta1/commit_service.proto.
 */
export const file_buf_registry_module_v1beta1_commit_service: GenFile = /*@__PURE__*/
  fileDesc("CjBidWYvcmVnaXN0cnkvbW9kdWxlL3YxYmV0YTEvY29tbWl0X3NlcnZpY2UucHJvdG8SG2J1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMSKpAQoRR2V0Q29tbWl0c1JlcXVlc3QSTAoNcmVzb3VyY2VfcmVmcxgBIAMoCzIoLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5SZXNvdXJjZVJlZkILukgIkgEFCAEQ+gESRgoLZGlnZXN0X3R5cGUYAiABKA4yJy5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuRGlnZXN0VHlwZUIIukgFggECEAEiVAoSR2V0Q29tbWl0c1Jlc3BvbnNlEj4KB2NvbW1pdHMYASADKAsyIy5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuQ29tbWl0Qgi6SAWSAQIIASKhAwoSTGlzdENvbW1pdHNSZXF1ZXN0EhsKCXBhZ2Vfc2l6ZRgBIAEoDUIIukgFKgMY+gESHAoKcGFnZV90b2tlbhgCIAEoCUIIukgFcgMYgCASRgoMcmVzb3VyY2VfcmVmGAMgASgLMiguYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MWJldGExLlJlc291cmNlUmVmQga6SAPIAQESTgoFb3JkZXIYBCABKA4yNS5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuTGlzdENvbW1pdHNSZXF1ZXN0Lk9yZGVyQgi6SAWCAQIQARJGCgtkaWdlc3RfdHlwZRgFIAEoDjInLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5EaWdlc3RUeXBlQgi6SAWCAQIQARIZCghpZF9xdWVyeRgGIAEoCUIHukgEcgIYJCJVCgVPcmRlchIVChFPUkRFUl9VTlNQRUNJRklFRBAAEhoKFk9SREVSX0NSRUFURV9USU1FX0RFU0MQARIZChVPUkRFUl9DUkVBVEVfVElNRV9BU0MQAiJuChNMaXN0Q29tbWl0c1Jlc3BvbnNlEiEKD25leHRfcGFnZV90b2tlbhgBIAEoCUIIukgFcgMYgCASNAoHY29tbWl0cxgCIAMoCzIjLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5Db21taXQy+gEKDUNvbW1pdFNlcnZpY2UScgoKR2V0Q29tbWl0cxIuLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5HZXRDb21taXRzUmVxdWVzdBovLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5HZXRDb21taXRzUmVzcG9uc2UiA5ACARJ1CgtMaXN0Q29tbWl0cxIvLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5MaXN0Q29tbWl0c1JlcXVlc3QaMC5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuTGlzdENvbW1pdHNSZXNwb25zZSIDkAIBQlNaUWJ1Zi5idWlsZC9nZW4vZ28vYnVmYnVpbGQvcmVnaXN0cnkvcHJvdG9jb2xidWZmZXJzL2dvL2J1Zi9yZWdpc3RyeS9tb2R1bGUvdjFiZXRhMWIGcHJvdG8z", [file_buf_registry_module_v1beta1_commit, file_buf_registry_module_v1beta1_digest, file_buf_registry_module_v1beta1_resource, file_buf_validate_validate]);

/**
 * @generated from message buf.registry.module.v1beta1.GetCommitsRequest
 */
export type GetCommitsRequest = Message<"buf.registry.module.v1beta1.GetCommitsRequest"> & {
  /**
   * References to request a Commit for.
   *
   * See the documentation on ResourceRef for resource resolution details.
   *
   * Resolution is as follows:
   *   - If a Module is referenced, the Commit of the default Label is returned.
   *   - If a Label is referenced, the Commit of this Label is returned.
   *   - If a Commit is referenced, this Commit is returned.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.ResourceRef resource_refs = 1;
   */
  resourceRefs: ResourceRef[];

  /**
   * The DigestType to use for Digests returned on Commits.
   *
   * If this DigestType is not available, an error is returned.
   * Note that certain DigestTypes may be deprecated over time.
   *
   * If not set, the latest DigestType is used, currently B5.
   *
   * @generated from field: buf.registry.module.v1beta1.DigestType digest_type = 2;
   */
  digestType: DigestType;
};

/**
 * Describes the message buf.registry.module.v1beta1.GetCommitsRequest.
 * Use `create(GetCommitsRequestSchema)` to create a new message.
 */
export const GetCommitsRequestSchema: GenMessage<GetCommitsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_commit_service, 0);

/**
 * @generated from message buf.registry.module.v1beta1.GetCommitsResponse
 */
export type GetCommitsResponse = Message<"buf.registry.module.v1beta1.GetCommitsResponse"> & {
  /**
   * The found Commits in the same order as requested.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.Commit commits = 1;
   */
  commits: Commit[];
};

/**
 * Describes the message buf.registry.module.v1beta1.GetCommitsResponse.
 * Use `create(GetCommitsResponseSchema)` to create a new message.
 */
export const GetCommitsResponseSchema: GenMessage<GetCommitsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_commit_service, 1);

/**
 * @generated from message buf.registry.module.v1beta1.ListCommitsRequest
 */
export type ListCommitsRequest = Message<"buf.registry.module.v1beta1.ListCommitsRequest"> & {
  /**
   * The maximum number of items to return.
   *
   * The default value is 10.
   *
   * @generated from field: uint32 page_size = 1;
   */
  pageSize: number;

  /**
   * The page to start from.
   *
   * If empty, the first page is returned,
   *
   * @generated from field: string page_token = 2;
   */
  pageToken: string;

  /**
   * The reference to list Commits for.
   *
   * See the documentation on Ref for resource resolution details.
   *
   * Once the resource is resolved, the following Commits are listed (subject to any additional filters in the request):
   *   - If a Module is referenced, all Commits for the Module are returned.
   *   - If a Label is referenced, the Commit the Label points to is returned.
   *     Use ListLabelHistory to get the history of Commits for a Label.
   *   - If a Commit is referenced, this Commit is returned.
   *
   * @generated from field: buf.registry.module.v1beta1.ResourceRef resource_ref = 3;
   */
  resourceRef?: ResourceRef;

  /**
   * The order to return the Commits.
   *
   * If not specified, defaults to ORDER_CREATE_TIME_DESC.
   *
   * @generated from field: buf.registry.module.v1beta1.ListCommitsRequest.Order order = 4;
   */
  order: ListCommitsRequest_Order;

  /**
   * The DigestType to use for Digests returned on Commits.
   *
   * If this DigestType is not available, an error is returned.
   * Note that certain DigestTypes may be deprecated over time.
   *
   * If not set, the latest DigestType is used, currently B5.
   *
   * @generated from field: buf.registry.module.v1beta1.DigestType digest_type = 5;
   */
  digestType: DigestType;

  /**
   * Only return Commits with an id that contains this string using a case-insensitive comparison.
   *
   * @generated from field: string id_query = 6;
   */
  idQuery: string;
};

/**
 * Describes the message buf.registry.module.v1beta1.ListCommitsRequest.
 * Use `create(ListCommitsRequestSchema)` to create a new message.
 */
export const ListCommitsRequestSchema: GenMessage<ListCommitsRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_commit_service, 2);

/**
 * The list order.
 *
 * @generated from enum buf.registry.module.v1beta1.ListCommitsRequest.Order
 */
export enum ListCommitsRequest_Order {
  /**
   * @generated from enum value: ORDER_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Order by create_time newest to oldest.
   *
   * @generated from enum value: ORDER_CREATE_TIME_DESC = 1;
   */
  CREATE_TIME_DESC = 1,

  /**
   * Order by create_time oldest to newest.
   *
   * @generated from enum value: ORDER_CREATE_TIME_ASC = 2;
   */
  CREATE_TIME_ASC = 2,
}

/**
 * Describes the enum buf.registry.module.v1beta1.ListCommitsRequest.Order.
 */
export const ListCommitsRequest_OrderSchema: GenEnum<ListCommitsRequest_Order> = /*@__PURE__*/
  enumDesc(file_buf_registry_module_v1beta1_commit_service, 2, 0);

/**
 * @generated from message buf.registry.module.v1beta1.ListCommitsResponse
 */
export type ListCommitsResponse = Message<"buf.registry.module.v1beta1.ListCommitsResponse"> & {
  /**
   * The next page token.
   *
   * If empty, there are no more pages.
   *
   * @generated from field: string next_page_token = 1;
   */
  nextPageToken: string;

  /**
   * The listed Commits.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.Commit commits = 2;
   */
  commits: Commit[];
};

/**
 * Describes the message buf.registry.module.v1beta1.ListCommitsResponse.
 * Use `create(ListCommitsResponseSchema)` to create a new message.
 */
export const ListCommitsResponseSchema: GenMessage<ListCommitsResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_commit_service, 3);

/**
 * Operate on Commits.
 *
 * @generated from service buf.registry.module.v1beta1.CommitService
 */
export const CommitService: GenService<{
  /**
   * Get Commits.
   *
   * @generated from rpc buf.registry.module.v1beta1.CommitService.GetCommits
   */
  getCommits: {
    methodKind: "unary";
    input: typeof GetCommitsRequestSchema;
    output: typeof GetCommitsResponseSchema;
  },
  /**
   * List Commits for a given Module, Label, or Commit.
   *
   * @generated from rpc buf.registry.module.v1beta1.CommitService.ListCommits
   */
  listCommits: {
    methodKind: "unary";
    input: typeof ListCommitsRequestSchema;
    output: typeof ListCommitsResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_buf_registry_module_v1beta1_commit_service, 0);

