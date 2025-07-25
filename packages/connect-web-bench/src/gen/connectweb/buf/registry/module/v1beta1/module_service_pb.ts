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

// @generated by protoc-gen-es v2.6.0 with parameter "target=ts"
// @generated from file buf/registry/module/v1beta1/module_service.proto (package buf.registry.module.v1beta1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv2";
import type { Module, ModuleRef, ModuleState, ModuleVisibility } from "./module_pb";
import { file_buf_registry_module_v1beta1_module } from "./module_pb";
import type { OwnerRef } from "../../owner/v1/owner_pb";
import { file_buf_registry_owner_v1_owner } from "../../owner/v1/owner_pb";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1beta1/module_service.proto.
 */
export const file_buf_registry_module_v1beta1_module_service: GenFile = /*@__PURE__*/
  fileDesc("CjBidWYvcmVnaXN0cnkvbW9kdWxlL3YxYmV0YTEvbW9kdWxlX3NlcnZpY2UucHJvdG8SG2J1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMSJdChFHZXRNb2R1bGVzUmVxdWVzdBJICgttb2R1bGVfcmVmcxgBIAMoCzImLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5Nb2R1bGVSZWZCC7pICJIBBQgBEPoBIlQKEkdldE1vZHVsZXNSZXNwb25zZRI+Cgdtb2R1bGVzGAEgAygLMiMuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MWJldGExLk1vZHVsZUIIukgFkgECCAEiqwIKEkxpc3RNb2R1bGVzUmVxdWVzdBIbCglwYWdlX3NpemUYASABKA1CCLpIBSoDGPoBEhwKCnBhZ2VfdG9rZW4YAiABKAlCCLpIBXIDGIAgEjMKCm93bmVyX3JlZnMYAyADKAsyHy5idWYucmVnaXN0cnkub3duZXIudjEuT3duZXJSZWYSTgoFb3JkZXIYBCABKA4yNS5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuTGlzdE1vZHVsZXNSZXF1ZXN0Lk9yZGVyQgi6SAWCAQIQASJVCgVPcmRlchIVChFPUkRFUl9VTlNQRUNJRklFRBAAEhoKFk9SREVSX0NSRUFURV9USU1FX0RFU0MQARIZChVPUkRFUl9DUkVBVEVfVElNRV9BU0MQAiJuChNMaXN0TW9kdWxlc1Jlc3BvbnNlEiEKD25leHRfcGFnZV90b2tlbhgBIAEoCUIIukgFcgMYgCASNAoHbW9kdWxlcxgCIAMoCzIjLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5Nb2R1bGUi/QIKFENyZWF0ZU1vZHVsZXNSZXF1ZXN0ElQKBnZhbHVlcxgBIAMoCzI3LmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5DcmVhdGVNb2R1bGVzUmVxdWVzdC5WYWx1ZUILukgIkgEFCAEQ+gEajgIKBVZhbHVlEjoKCW93bmVyX3JlZhgBIAEoCzIfLmJ1Zi5yZWdpc3RyeS5vd25lci52MS5Pd25lclJlZkIGukgDyAEBEhcKBG5hbWUYAiABKAlCCbpIBnIEEAIYZBJOCgp2aXNpYmlsaXR5GAMgASgOMi0uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MWJldGExLk1vZHVsZVZpc2liaWxpdHlCC7pICMgBAYIBAhABEh0KC2Rlc2NyaXB0aW9uGAQgASgJQgi6SAVyAxjeAhIbCgN1cmwYBSABKAlCDrpIC9gBAXIGGP8BiAEBEiQKEmRlZmF1bHRfbGFiZWxfbmFtZRgGIAEoCUIIukgFcgMY+gEiVwoVQ3JlYXRlTW9kdWxlc1Jlc3BvbnNlEj4KB21vZHVsZXMYASADKAsyIy5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuTW9kdWxlQgi6SAWSAQIIASKVBAoUVXBkYXRlTW9kdWxlc1JlcXVlc3QSVAoGdmFsdWVzGAEgAygLMjcuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MWJldGExLlVwZGF0ZU1vZHVsZXNSZXF1ZXN0LlZhbHVlQgu6SAiSAQUIARD6ARqmAwoFVmFsdWUSQgoKbW9kdWxlX3JlZhgBIAEoCzImLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5Nb2R1bGVSZWZCBrpIA8gBARJTCgp2aXNpYmlsaXR5GAMgASgOMi0uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MWJldGExLk1vZHVsZVZpc2liaWxpdHlCC7pICIIBBRABIgEASACIAQESSQoFc3RhdGUYBCABKA4yKC5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuTW9kdWxlU3RhdGVCC7pICIIBBRABIgEASAGIAQESIgoLZGVzY3JpcHRpb24YBSABKAlCCLpIBXIDGN4CSAKIAQESIAoDdXJsGAYgASgJQg66SAvYAQJyBhj/AYgBAUgDiAEBEisKEmRlZmF1bHRfbGFiZWxfbmFtZRgHIAEoCUIKukgHcgUQARj6AUgEiAEBQg0KC192aXNpYmlsaXR5QggKBl9zdGF0ZUIOCgxfZGVzY3JpcHRpb25CBgoEX3VybEIVChNfZGVmYXVsdF9sYWJlbF9uYW1lIlcKFVVwZGF0ZU1vZHVsZXNSZXNwb25zZRI+Cgdtb2R1bGVzGAEgAygLMiMuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MWJldGExLk1vZHVsZUIIukgFkgECCAEiYAoURGVsZXRlTW9kdWxlc1JlcXVlc3QSSAoLbW9kdWxlX3JlZnMYASADKAsyJi5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuTW9kdWxlUmVmQgu6SAiSAQUIARD6ASIXChVEZWxldGVNb2R1bGVzUmVzcG9uc2Uy8QQKDU1vZHVsZVNlcnZpY2UScgoKR2V0TW9kdWxlcxIuLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5HZXRNb2R1bGVzUmVxdWVzdBovLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5HZXRNb2R1bGVzUmVzcG9uc2UiA5ACARJ1CgtMaXN0TW9kdWxlcxIvLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5MaXN0TW9kdWxlc1JlcXVlc3QaMC5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuTGlzdE1vZHVsZXNSZXNwb25zZSIDkAIBEnsKDUNyZWF0ZU1vZHVsZXMSMS5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuQ3JlYXRlTW9kdWxlc1JlcXVlc3QaMi5idWYucmVnaXN0cnkubW9kdWxlLnYxYmV0YTEuQ3JlYXRlTW9kdWxlc1Jlc3BvbnNlIgOQAgISewoNVXBkYXRlTW9kdWxlcxIxLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5VcGRhdGVNb2R1bGVzUmVxdWVzdBoyLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjFiZXRhMS5VcGRhdGVNb2R1bGVzUmVzcG9uc2UiA5ACAhJ7Cg1EZWxldGVNb2R1bGVzEjEuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MWJldGExLkRlbGV0ZU1vZHVsZXNSZXF1ZXN0GjIuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MWJldGExLkRlbGV0ZU1vZHVsZXNSZXNwb25zZSIDkAICQlNaUWJ1Zi5idWlsZC9nZW4vZ28vYnVmYnVpbGQvcmVnaXN0cnkvcHJvdG9jb2xidWZmZXJzL2dvL2J1Zi9yZWdpc3RyeS9tb2R1bGUvdjFiZXRhMWIGcHJvdG8z", [file_buf_registry_module_v1beta1_module, file_buf_registry_owner_v1_owner, file_buf_validate_validate]);

/**
 * @generated from message buf.registry.module.v1beta1.GetModulesRequest
 */
export type GetModulesRequest = Message<"buf.registry.module.v1beta1.GetModulesRequest"> & {
  /**
   * The Modules to request.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.ModuleRef module_refs = 1;
   */
  moduleRefs: ModuleRef[];
};

/**
 * Describes the message buf.registry.module.v1beta1.GetModulesRequest.
 * Use `create(GetModulesRequestSchema)` to create a new message.
 */
export const GetModulesRequestSchema: GenMessage<GetModulesRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 0);

/**
 * @generated from message buf.registry.module.v1beta1.GetModulesResponse
 */
export type GetModulesResponse = Message<"buf.registry.module.v1beta1.GetModulesResponse"> & {
  /**
   * The retrieved Modules in the same order as requested.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.Module modules = 1;
   */
  modules: Module[];
};

/**
 * Describes the message buf.registry.module.v1beta1.GetModulesResponse.
 * Use `create(GetModulesResponseSchema)` to create a new message.
 */
export const GetModulesResponseSchema: GenMessage<GetModulesResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 1);

/**
 * @generated from message buf.registry.module.v1beta1.ListModulesRequest
 */
export type ListModulesRequest = Message<"buf.registry.module.v1beta1.ListModulesRequest"> & {
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
   * The specific Users or Organizations to list Modules for.
   *
   * If empty, all Modules for all owners are listed, but this functionality
   * is limited to Users with the necessary permissions.
   *
   * @generated from field: repeated buf.registry.owner.v1.OwnerRef owner_refs = 3;
   */
  ownerRefs: OwnerRef[];

  /**
   * The order to return the Modules.
   *
   * If not specified, defaults to ORDER_CREATE_TIME_DESC.
   *
   * @generated from field: buf.registry.module.v1beta1.ListModulesRequest.Order order = 4;
   */
  order: ListModulesRequest_Order;
};

/**
 * Describes the message buf.registry.module.v1beta1.ListModulesRequest.
 * Use `create(ListModulesRequestSchema)` to create a new message.
 */
export const ListModulesRequestSchema: GenMessage<ListModulesRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 2);

/**
 * The list order.
 *
 * @generated from enum buf.registry.module.v1beta1.ListModulesRequest.Order
 */
export enum ListModulesRequest_Order {
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
 * Describes the enum buf.registry.module.v1beta1.ListModulesRequest.Order.
 */
export const ListModulesRequest_OrderSchema: GenEnum<ListModulesRequest_Order> = /*@__PURE__*/
  enumDesc(file_buf_registry_module_v1beta1_module_service, 2, 0);

/**
 * @generated from message buf.registry.module.v1beta1.ListModulesResponse
 */
export type ListModulesResponse = Message<"buf.registry.module.v1beta1.ListModulesResponse"> & {
  /**
   * The next page token.
   *
   * If empty, there are no more pages.
   *
   * @generated from field: string next_page_token = 1;
   */
  nextPageToken: string;

  /**
   * The listed Modules.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.Module modules = 2;
   */
  modules: Module[];
};

/**
 * Describes the message buf.registry.module.v1beta1.ListModulesResponse.
 * Use `create(ListModulesResponseSchema)` to create a new message.
 */
export const ListModulesResponseSchema: GenMessage<ListModulesResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 3);

/**
 * @generated from message buf.registry.module.v1beta1.CreateModulesRequest
 */
export type CreateModulesRequest = Message<"buf.registry.module.v1beta1.CreateModulesRequest"> & {
  /**
   * The Modules to create.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.CreateModulesRequest.Value values = 1;
   */
  values: CreateModulesRequest_Value[];
};

/**
 * Describes the message buf.registry.module.v1beta1.CreateModulesRequest.
 * Use `create(CreateModulesRequestSchema)` to create a new message.
 */
export const CreateModulesRequestSchema: GenMessage<CreateModulesRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 4);

/**
 * An individual request to create a Module.
 *
 * @generated from message buf.registry.module.v1beta1.CreateModulesRequest.Value
 */
export type CreateModulesRequest_Value = Message<"buf.registry.module.v1beta1.CreateModulesRequest.Value"> & {
  /**
   * The User or Organization to create the Module under.
   *
   * @generated from field: buf.registry.owner.v1.OwnerRef owner_ref = 1;
   */
  ownerRef?: OwnerRef;

  /**
   * The name of the Module.
   *
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * The module's visibility.
   *
   * @generated from field: buf.registry.module.v1beta1.ModuleVisibility visibility = 3;
   */
  visibility: ModuleVisibility;

  /**
   * The configurable description of the Module.
   *
   * @generated from field: string description = 4;
   */
  description: string;

  /**
   * The configurable URL in the description of the module.
   *
   * @generated from field: string url = 5;
   */
  url: string;

  /**
   * The name of the default Label of the Module.
   *
   * If not set, the default Label will be named "main" upon creation.
   *
   * This may point to an archived Label.
   *
   * @generated from field: string default_label_name = 6;
   */
  defaultLabelName: string;
};

/**
 * Describes the message buf.registry.module.v1beta1.CreateModulesRequest.Value.
 * Use `create(CreateModulesRequest_ValueSchema)` to create a new message.
 */
export const CreateModulesRequest_ValueSchema: GenMessage<CreateModulesRequest_Value> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 4, 0);

/**
 * @generated from message buf.registry.module.v1beta1.CreateModulesResponse
 */
export type CreateModulesResponse = Message<"buf.registry.module.v1beta1.CreateModulesResponse"> & {
  /**
   * The created Modules in the same order as given on the request.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.Module modules = 1;
   */
  modules: Module[];
};

/**
 * Describes the message buf.registry.module.v1beta1.CreateModulesResponse.
 * Use `create(CreateModulesResponseSchema)` to create a new message.
 */
export const CreateModulesResponseSchema: GenMessage<CreateModulesResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 5);

/**
 * @generated from message buf.registry.module.v1beta1.UpdateModulesRequest
 */
export type UpdateModulesRequest = Message<"buf.registry.module.v1beta1.UpdateModulesRequest"> & {
  /**
   * The Modules to update.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.UpdateModulesRequest.Value values = 1;
   */
  values: UpdateModulesRequest_Value[];
};

/**
 * Describes the message buf.registry.module.v1beta1.UpdateModulesRequest.
 * Use `create(UpdateModulesRequestSchema)` to create a new message.
 */
export const UpdateModulesRequestSchema: GenMessage<UpdateModulesRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 6);

/**
 * An individual request to update a Module.
 *
 * @generated from message buf.registry.module.v1beta1.UpdateModulesRequest.Value
 */
export type UpdateModulesRequest_Value = Message<"buf.registry.module.v1beta1.UpdateModulesRequest.Value"> & {
  /**
   * The Module to update.
   *
   * @generated from field: buf.registry.module.v1beta1.ModuleRef module_ref = 1;
   */
  moduleRef?: ModuleRef;

  /**
   * The module's visibility.
   *
   * @generated from field: optional buf.registry.module.v1beta1.ModuleVisibility visibility = 3;
   */
  visibility?: ModuleVisibility;

  /**
   * The deprecation status of the module.
   *
   * @generated from field: optional buf.registry.module.v1beta1.ModuleState state = 4;
   */
  state?: ModuleState;

  /**
   * The configurable description of the module.
   *
   * @generated from field: optional string description = 5;
   */
  description?: string;

  /**
   * The configurable URL in the description of the module.
   *
   * @generated from field: optional string url = 6;
   */
  url?: string;

  /**
   * The name of the default Label of the Module.
   *
   * This Label may not yet exist.
   *
   * This may not point to an archived Label.
   *
   * @generated from field: optional string default_label_name = 7;
   */
  defaultLabelName?: string;
};

/**
 * Describes the message buf.registry.module.v1beta1.UpdateModulesRequest.Value.
 * Use `create(UpdateModulesRequest_ValueSchema)` to create a new message.
 */
export const UpdateModulesRequest_ValueSchema: GenMessage<UpdateModulesRequest_Value> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 6, 0);

/**
 * @generated from message buf.registry.module.v1beta1.UpdateModulesResponse
 */
export type UpdateModulesResponse = Message<"buf.registry.module.v1beta1.UpdateModulesResponse"> & {
  /**
   * The updated Modules in the same order as given on the request.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.Module modules = 1;
   */
  modules: Module[];
};

/**
 * Describes the message buf.registry.module.v1beta1.UpdateModulesResponse.
 * Use `create(UpdateModulesResponseSchema)` to create a new message.
 */
export const UpdateModulesResponseSchema: GenMessage<UpdateModulesResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 7);

/**
 * @generated from message buf.registry.module.v1beta1.DeleteModulesRequest
 */
export type DeleteModulesRequest = Message<"buf.registry.module.v1beta1.DeleteModulesRequest"> & {
  /**
   * The Modules to delete.
   *
   * @generated from field: repeated buf.registry.module.v1beta1.ModuleRef module_refs = 1;
   */
  moduleRefs: ModuleRef[];
};

/**
 * Describes the message buf.registry.module.v1beta1.DeleteModulesRequest.
 * Use `create(DeleteModulesRequestSchema)` to create a new message.
 */
export const DeleteModulesRequestSchema: GenMessage<DeleteModulesRequest> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 8);

/**
 * @generated from message buf.registry.module.v1beta1.DeleteModulesResponse
 */
export type DeleteModulesResponse = Message<"buf.registry.module.v1beta1.DeleteModulesResponse"> & {
};

/**
 * Describes the message buf.registry.module.v1beta1.DeleteModulesResponse.
 * Use `create(DeleteModulesResponseSchema)` to create a new message.
 */
export const DeleteModulesResponseSchema: GenMessage<DeleteModulesResponse> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1beta1_module_service, 9);

/**
 * Operate on Modules.
 *
 * @generated from service buf.registry.module.v1beta1.ModuleService
 */
export const ModuleService: GenService<{
  /**
   * Get Modules by id or name.
   *
   * @generated from rpc buf.registry.module.v1beta1.ModuleService.GetModules
   */
  getModules: {
    methodKind: "unary";
    input: typeof GetModulesRequestSchema;
    output: typeof GetModulesResponseSchema;
  },
  /**
   * List Modules, usually for a specific User or Organization.
   *
   * @generated from rpc buf.registry.module.v1beta1.ModuleService.ListModules
   */
  listModules: {
    methodKind: "unary";
    input: typeof ListModulesRequestSchema;
    output: typeof ListModulesResponseSchema;
  },
  /**
   * Create new Modules.
   *
   * When a Module is created, a Branch representing the release Branch
   * is created as well.
   *
   * This operation is atomic. Either all Modules are created or an error is returned.
   *
   * @generated from rpc buf.registry.module.v1beta1.ModuleService.CreateModules
   */
  createModules: {
    methodKind: "unary";
    input: typeof CreateModulesRequestSchema;
    output: typeof CreateModulesResponseSchema;
  },
  /**
   * Update existing Modules.
   *
   * This operation is atomic. Either all Modules are updated or an error is returned.
   *
   * @generated from rpc buf.registry.module.v1beta1.ModuleService.UpdateModules
   */
  updateModules: {
    methodKind: "unary";
    input: typeof UpdateModulesRequestSchema;
    output: typeof UpdateModulesResponseSchema;
  },
  /**
   * Delete existing Modules.
   *
   * This operation is atomic. Either all Modules are deleted or an error is returned.
   *
   * @generated from rpc buf.registry.module.v1beta1.ModuleService.DeleteModules
   */
  deleteModules: {
    methodKind: "unary";
    input: typeof DeleteModulesRequestSchema;
    output: typeof DeleteModulesResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_buf_registry_module_v1beta1_module_service, 0);

