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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/registry/module/v1/resource.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Commit } from "./commit_pb";
import { file_buf_registry_module_v1_commit } from "./commit_pb";
import type { Label } from "./label_pb";
import { file_buf_registry_module_v1_label } from "./label_pb";
import type { Module } from "./module_pb";
import { file_buf_registry_module_v1_module } from "./module_pb";
import { file_buf_registry_priv_extension_v1beta1_extension } from "../../priv/extension/v1beta1/extension_pb";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1/resource.proto.
 */
export const file_buf_registry_module_v1_resource: GenDescFile = /*@__PURE__*/
  fileDesc("CiVidWYvcmVnaXN0cnkvbW9kdWxlL3YxL3Jlc291cmNlLnByb3RvEhZidWYucmVnaXN0cnkubW9kdWxlLnYxIq4BCghSZXNvdXJjZRIwCgZtb2R1bGUYASABKAsyHi5idWYucmVnaXN0cnkubW9kdWxlLnYxLk1vZHVsZUgAEi4KBWxhYmVsGAIgASgLMh0uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5MYWJlbEgAEjAKBmNvbW1pdBgDIAEoCzIeLmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEuQ29tbWl0SABCDgoFdmFsdWUSBbpIAggBIu8BCgtSZXNvdXJjZVJlZhIWCgJpZBgBIAEoCUIIukgFcgOIAgFIABI4CgRuYW1lGAIgASgLMiguYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5SZXNvdXJjZVJlZi5OYW1lSAAadAoETmFtZRIZCgVvd25lchgBIAEoCUIKukgHyAEBcgIYIBIZCgZtb2R1bGUYAiABKAlCCbpIBnIEEAIYZBIeCgpsYWJlbF9uYW1lGAMgASgJQgi6SAVyAxj6AUgAEg0KA3JlZhgEIAEoCUgAQgcKBWNoaWxkOgjqxSsECAEYAUIOCgV2YWx1ZRIFukgCCAFCTlpMYnVmLmJ1aWxkL2dlbi9nby9idWZidWlsZC9yZWdpc3RyeS9wcm90b2NvbGJ1ZmZlcnMvZ28vYnVmL3JlZ2lzdHJ5L21vZHVsZS92MWIGcHJvdG8z", [file_buf_registry_module_v1_commit, file_buf_registry_module_v1_label, file_buf_registry_module_v1_module, file_buf_registry_priv_extension_v1beta1_extension, file_buf_validate_validate]);

/**
 * A Module, Label, or Commit.
 *
 * @generated from message buf.registry.module.v1.Resource
 */
export type Resource = Message<"buf.registry.module.v1.Resource"> & {
  /**
   * @generated from oneof buf.registry.module.v1.Resource.value
   */
  value: {
    /**
     * @generated from field: buf.registry.module.v1.Module module = 1;
     */
    value: Module;
    case: "module";
  } | {
    /**
     * @generated from field: buf.registry.module.v1.Label label = 2;
     */
    value: Label;
    case: "label";
  } | {
    /**
     * @generated from field: buf.registry.module.v1.Commit commit = 3;
     */
    value: Commit;
    case: "commit";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message buf.registry.module.v1.Resource.
 * Use `create(ResourceSchema)` to create a new message.
 */
export const ResourceSchema: GenDescMessage<Resource> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_resource, 0);

/**
 * A reference to any of:
 *   - Module
 *   - Label
 *   - Commit
 *
 * The id or name is resolved to a specific resource.
 * If an id is passed, this is interpreted as being the id of the resource.
 * If a name is passed, the semantics according to ResourceRef.Name are applied.
 *
 * ResourceRefs can only be used in requests, and only for read-only RPCs, that is
 * you should not use an arbitrary reference when modifying a specific resource.
 *
 * @generated from message buf.registry.module.v1.ResourceRef
 */
export type ResourceRef = Message<"buf.registry.module.v1.ResourceRef"> & {
  /**
   * @generated from oneof buf.registry.module.v1.ResourceRef.value
   */
  value: {
    /**
     * The id of the resource.
     *
     * @generated from field: string id = 1;
     */
    value: string;
    case: "id";
  } | {
    /**
     * The fully-qualified name of the resource.
     *
     * @generated from field: buf.registry.module.v1.ResourceRef.Name name = 2;
     */
    value: ResourceRef_Name;
    case: "name";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message buf.registry.module.v1.ResourceRef.
 * Use `create(ResourceRefSchema)` to create a new message.
 */
export const ResourceRefSchema: GenDescMessage<ResourceRef> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_resource, 1);

/**
 * The fully-qualified name component of a ResourceRef.
 *
 * The following semantics are applied:
 *   - If the child oneof is not specified, the name is interpreted to reference a Module.
 *   - If label_name is specified, the name is interpreted to reference a Label.
 *   - If ref is specified, it is interpreted to be either an id or name.
 *     - If an id, this is equivalent to setting the id field on ResourceRef. However,
 *       backends can choose to validate that the owner and module fields match the resource
 *       referenced, as additional validation.
 *     - If a name, this is interpreted to be a Label name.
 *     - If there is a conflict between names across resources (for example, there is a Commit id
 *       and Label name of the same value), the following order of precedence is applied:
 *       - Commit
 *       - Label
 *
 * Names can only be used in requests, and only for read-only RPCs, that is
 * you should not use an arbitrary reference when modifying a specific resource.
 *
 * @generated from message buf.registry.module.v1.ResourceRef.Name
 */
export type ResourceRef_Name = Message<"buf.registry.module.v1.ResourceRef.Name"> & {
  /**
   * The name of the User or Organization that owns the resource.
   *
   * @generated from field: string owner = 1;
   */
  owner: string;

  /**
   * The name of the Module that contains or is the resource.
   *
   * @generated from field: string module = 2;
   */
  module: string;

  /**
   * If the oneof is present but empty, this should be treated as not present.
   *
   * @generated from oneof buf.registry.module.v1.ResourceRef.Name.child
   */
  child: {
    /**
     * The name of the Label.
     *
     * If this value is present but empty, this should be treated as not present, that is
     * an empty value is the same as a null value.
     *
     * @generated from field: string label_name = 3;
     */
    value: string;
    case: "labelName";
  } | {
    /**
     * The untyped reference, applying the semantics as documented on the Name message.
     *
     * If this value is present but empty, this should be treated as not present, that is
     * an empty value is the same as a null value.
     *
     * @generated from field: string ref = 4;
     */
    value: string;
    case: "ref";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message buf.registry.module.v1.ResourceRef.Name.
 * Use `create(ResourceRef_NameSchema)` to create a new message.
 */
export const ResourceRef_NameSchema: GenDescMessage<ResourceRef_Name> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_resource, 1, 0);

