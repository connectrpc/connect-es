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

// @generated by protoc-gen-es v1.10.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/registry/module/v1/label.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * A check status for a Commit.
 *
 * Policy checks are an enterprise-only feature - contact us to learn more!
 *
 * @generated from enum buf.registry.module.v1.CommitCheckStatus
 */
export enum CommitCheckStatus {
  /**
   * @generated from enum value: COMMIT_CHECK_STATUS_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Policy checks were not enabled when the Commit was created.
   *
   * @generated from enum value: COMMIT_CHECK_STATUS_DISABLED = 1;
   */
  DISABLED = 1,

  /**
   * The Commit did not fail any policy checks and therefore did not need review.
   *
   * @generated from enum value: COMMIT_CHECK_STATUS_PASSED = 2;
   */
  PASSED = 2,

  /**
   * The Commit has not yet been reviewed after failing policy checks and is pending.
   *
   * @generated from enum value: COMMIT_CHECK_STATUS_PENDING = 3;
   */
  PENDING = 3,

  /**
   * The Commit was reviewed after failing policy checks and was rejected.
   *
   * @generated from enum value: COMMIT_CHECK_STATUS_REJECTED = 4;
   */
  REJECTED = 4,

  /**
   * The Commit was reviewed after failing policy checks and was approved.
   *
   * @generated from enum value: COMMIT_CHECK_STATUS_APPROVED = 5;
   */
  APPROVED = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(CommitCheckStatus)
proto3.util.setEnumType(CommitCheckStatus, "buf.registry.module.v1.CommitCheckStatus", [
  { no: 0, name: "COMMIT_CHECK_STATUS_UNSPECIFIED" },
  { no: 1, name: "COMMIT_CHECK_STATUS_DISABLED" },
  { no: 2, name: "COMMIT_CHECK_STATUS_PASSED" },
  { no: 3, name: "COMMIT_CHECK_STATUS_PENDING" },
  { no: 4, name: "COMMIT_CHECK_STATUS_REJECTED" },
  { no: 5, name: "COMMIT_CHECK_STATUS_APPROVED" },
]);

/**
 * A label on a specific Module.
 *
 * Many Labels can be associated with one Commit.
 *
 * @generated from message buf.registry.module.v1.Label
 */
export class Label extends Message<Label> {
  /**
   * The id of the Label.
   *
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * The time the Label was created on the BSR.
   *
   * @generated from field: google.protobuf.Timestamp create_time = 2;
   */
  createTime?: Timestamp;

  /**
   * The last time the Label was updated on the BSR.
   *
   * @generated from field: google.protobuf.Timestamp update_time = 3;
   */
  updateTime?: Timestamp;

  /**
   * The time the Label was archived if it is currently archived.
   *
   * If this field is not set, the Label is not currently archived.
   *
   * @generated from field: google.protobuf.Timestamp archive_time = 4;
   */
  archiveTime?: Timestamp;

  /**
   * The name of the Label.
   *
   * Unique within a given Module.
   *
   * @generated from field: string name = 5;
   */
  name = "";

  /**
   * The id of the User or Organization that owns the Module that the Label is associated with.
   *
   * @generated from field: string owner_id = 6;
   */
  ownerId = "";

  /**
   * The id of the Module that the Label is associated with.
   *
   * @generated from field: string module_id = 7;
   */
  moduleId = "";

  /**
   * The id of the Commit currently associated with the Label.
   *
   * If policy checks are enabled, this will point to the most recent Commit that passed or was approved.
   * To get the history of the Commits that have been associated with a Label, use ListLabelHistory.
   *
   * @generated from field: string commit_id = 8;
   */
  commitId = "";

  /**
   * The id of the User that last updated this Label on the BSR.
   *
   * May be empty if the User is no longer available.
   *
   * @generated from field: string updated_by_user_id = 9;
   */
  updatedByUserId = "";

  /**
   * The CommitCheckState for the Commit the Label points to.
   *
   * The CommitCheckStatus will always be disabled, passed, or approved, since Labels will
   * never point to pending or rejected Commits.
   *
   * @generated from field: buf.registry.module.v1.CommitCheckState commit_check_state = 10;
   */
  commitCheckState?: CommitCheckState;

  constructor(data?: PartialMessage<Label>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.Label";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "create_time", kind: "message", T: Timestamp },
    { no: 3, name: "update_time", kind: "message", T: Timestamp },
    { no: 4, name: "archive_time", kind: "message", T: Timestamp },
    { no: 5, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "owner_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "module_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "commit_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "updated_by_user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "commit_check_state", kind: "message", T: CommitCheckState },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Label {
    return new Label().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Label {
    return new Label().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Label {
    return new Label().fromJsonString(jsonString, options);
  }

  static equals(a: Label | PlainMessage<Label> | undefined, b: Label | PlainMessage<Label> | undefined): boolean {
    return proto3.util.equals(Label, a, b);
  }
}

/**
 * The state of a Commit's policy checks for a particular Label.
 *
 * Policy checks are an enterprise-only feature - contact us to learn more!
 *
 * @generated from message buf.registry.module.v1.CommitCheckState
 */
export class CommitCheckState extends Message<CommitCheckState> {
  /**
   * The status of the policy check.
   *
   * @generated from field: buf.registry.module.v1.CommitCheckStatus status = 1;
   */
  status = CommitCheckStatus.UNSPECIFIED;

  /**
   * The time the policy check state was last updated.
   *
   * If the status is disabled, this will be equal to the Commit create_time.
   *
   * @generated from field: google.protobuf.Timestamp update_time = 3;
   */
  updateTime?: Timestamp;

  constructor(data?: PartialMessage<CommitCheckState>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.CommitCheckState";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "status", kind: "enum", T: proto3.getEnumType(CommitCheckStatus) },
    { no: 3, name: "update_time", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CommitCheckState {
    return new CommitCheckState().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CommitCheckState {
    return new CommitCheckState().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CommitCheckState {
    return new CommitCheckState().fromJsonString(jsonString, options);
  }

  static equals(a: CommitCheckState | PlainMessage<CommitCheckState> | undefined, b: CommitCheckState | PlainMessage<CommitCheckState> | undefined): boolean {
    return proto3.util.equals(CommitCheckState, a, b);
  }
}

/**
 * LabelRef is a reference to a Label, either an id or a fully-qualified name.
 *
 * This is used in requests.
 *
 * @generated from message buf.registry.module.v1.LabelRef
 */
export class LabelRef extends Message<LabelRef> {
  /**
   * @generated from oneof buf.registry.module.v1.LabelRef.value
   */
  value: {
    /**
     * The id of the Label.
     *
     * @generated from field: string id = 1;
     */
    value: string;
    case: "id";
  } | {
    /**
     * The fully-qualified name of the Label.
     *
     * @generated from field: buf.registry.module.v1.LabelRef.Name name = 2;
     */
    value: LabelRef_Name;
    case: "name";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<LabelRef>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.LabelRef";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "value" },
    { no: 2, name: "name", kind: "message", T: LabelRef_Name, oneof: "value" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LabelRef {
    return new LabelRef().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LabelRef {
    return new LabelRef().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LabelRef {
    return new LabelRef().fromJsonString(jsonString, options);
  }

  static equals(a: LabelRef | PlainMessage<LabelRef> | undefined, b: LabelRef | PlainMessage<LabelRef> | undefined): boolean {
    return proto3.util.equals(LabelRef, a, b);
  }
}

/**
 * The fully-qualified name of a Label within a BSR instance.
 *
 * A Name uniquely identifies a Label.
 * This is used for requests when a caller only has the label name and not the ID.
 *
 * @generated from message buf.registry.module.v1.LabelRef.Name
 */
export class LabelRef_Name extends Message<LabelRef_Name> {
  /**
   * The name of the owner of the Module that contains the Label, either a User or Organization.
   *
   * @generated from field: string owner = 1;
   */
  owner = "";

  /**
   * The name of the Module that contains the Label, either a User or Organization.
   *
   * @generated from field: string module = 2;
   */
  module = "";

  /**
   * The Label name.
   *
   * @generated from field: string label = 3;
   */
  label = "";

  constructor(data?: PartialMessage<LabelRef_Name>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.LabelRef.Name";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "module", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "label", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LabelRef_Name {
    return new LabelRef_Name().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LabelRef_Name {
    return new LabelRef_Name().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LabelRef_Name {
    return new LabelRef_Name().fromJsonString(jsonString, options);
  }

  static equals(a: LabelRef_Name | PlainMessage<LabelRef_Name> | undefined, b: LabelRef_Name | PlainMessage<LabelRef_Name> | undefined): boolean {
    return proto3.util.equals(LabelRef_Name, a, b);
  }
}

/**
 * A reference to a Label scoped to a Module, either an id or a name.
 *
 * This is used in requests.
 *
 * @generated from message buf.registry.module.v1.ScopedLabelRef
 */
export class ScopedLabelRef extends Message<ScopedLabelRef> {
  /**
   * @generated from oneof buf.registry.module.v1.ScopedLabelRef.value
   */
  value: {
    /**
     * The id of the Label.
     *
     * @generated from field: string id = 1;
     */
    value: string;
    case: "id";
  } | {
    /**
     * The name of the Label.
     *
     * @generated from field: string name = 2;
     */
    value: string;
    case: "name";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ScopedLabelRef>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.ScopedLabelRef";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "value" },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "value" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScopedLabelRef {
    return new ScopedLabelRef().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScopedLabelRef {
    return new ScopedLabelRef().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScopedLabelRef {
    return new ScopedLabelRef().fromJsonString(jsonString, options);
  }

  static equals(a: ScopedLabelRef | PlainMessage<ScopedLabelRef> | undefined, b: ScopedLabelRef | PlainMessage<ScopedLabelRef> | undefined): boolean {
    return proto3.util.equals(ScopedLabelRef, a, b);
  }
}

