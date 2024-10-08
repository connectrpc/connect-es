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

// @generated by protoc-gen-connect-es v1.5.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/registry/module/v1/label_service.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import { ArchiveLabelsRequest, ArchiveLabelsResponse, CreateOrUpdateLabelsRequest, CreateOrUpdateLabelsResponse, GetLabelsRequest, GetLabelsResponse, ListLabelHistoryRequest, ListLabelHistoryResponse, ListLabelsRequest, ListLabelsResponse, UnarchiveLabelsRequest, UnarchiveLabelsResponse } from "./label_service_pb.js";
import { MethodIdempotency, MethodKind } from "@bufbuild/protobuf";

/**
 * Operate on Labels.
 *
 * @generated from service buf.registry.module.v1.LabelService
 */
export const LabelService = {
  typeName: "buf.registry.module.v1.LabelService",
  methods: {
    /**
     * Get Labels by id or name.
     *
     * @generated from rpc buf.registry.module.v1.LabelService.GetLabels
     */
    getLabels: {
      name: "GetLabels",
      I: GetLabelsRequest,
      O: GetLabelsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * List Labels for a given Module, Commit, or CommitDigest.
     *
     * @generated from rpc buf.registry.module.v1.LabelService.ListLabels
     */
    listLabels: {
      name: "ListLabels",
      I: ListLabelsRequest,
      O: ListLabelsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * List the history of a Label.
     *
     * @generated from rpc buf.registry.module.v1.LabelService.ListLabelHistory
     */
    listLabelHistory: {
      name: "ListLabelHistory",
      I: ListLabelHistoryRequest,
      O: ListLabelHistoryResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * Create or update Labels on a Module.
     *
     * If the Label does not exist, it will be created.
     * If the Label was archived, it will be unarchived.
     * If the Label already existed, the Commit in the request has to be newer than the Commit that
     * the Label is currently pointing to, otherwise an error is returned.
     *
     * This operation is atomic. Either all Labels are created/updated or an error is returned.
     *
     * @generated from rpc buf.registry.module.v1.LabelService.CreateOrUpdateLabels
     */
    createOrUpdateLabels: {
      name: "CreateOrUpdateLabels",
      I: CreateOrUpdateLabelsRequest,
      O: CreateOrUpdateLabelsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.Idempotent,
    },
    /**
     * Archive existing Labels.
     *
     * This operation is atomic. Either all Labels are archived or an error is returned.
     *
     * @generated from rpc buf.registry.module.v1.LabelService.ArchiveLabels
     */
    archiveLabels: {
      name: "ArchiveLabels",
      I: ArchiveLabelsRequest,
      O: ArchiveLabelsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.Idempotent,
    },
    /**
     * Unarchive existing Labels.
     *
     * This operation is atomic. Either all Labels are unarchived or an error is returned.
     *
     * @generated from rpc buf.registry.module.v1.LabelService.UnarchiveLabels
     */
    unarchiveLabels: {
      name: "UnarchiveLabels",
      I: UnarchiveLabelsRequest,
      O: UnarchiveLabelsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.Idempotent,
    },
  }
} as const;
