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

import * as jspb from 'google-protobuf'

import * as buf_registry_priv_extension_v1beta1_extension_pb from '../../../../buf/registry/priv/extension/v1beta1/extension_pb'; // proto import: "buf/registry/priv/extension/v1beta1/extension.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Label extends jspb.Message {
  getId(): string;
  setId(value: string): Label;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Label;
  hasCreateTime(): boolean;
  clearCreateTime(): Label;

  getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): Label;
  hasUpdateTime(): boolean;
  clearUpdateTime(): Label;

  getArchiveTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setArchiveTime(value?: google_protobuf_timestamp_pb.Timestamp): Label;
  hasArchiveTime(): boolean;
  clearArchiveTime(): Label;

  getName(): string;
  setName(value: string): Label;

  getOwnerId(): string;
  setOwnerId(value: string): Label;

  getModuleId(): string;
  setModuleId(value: string): Label;

  getCommitId(): string;
  setCommitId(value: string): Label;

  getUpdatedByUserId(): string;
  setUpdatedByUserId(value: string): Label;

  getCommitCheckState(): CommitCheckState | undefined;
  setCommitCheckState(value?: CommitCheckState): Label;
  hasCommitCheckState(): boolean;
  clearCommitCheckState(): Label;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Label.AsObject;
  static toObject(includeInstance: boolean, msg: Label): Label.AsObject;
  static serializeBinaryToWriter(message: Label, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Label;
  static deserializeBinaryFromReader(message: Label, reader: jspb.BinaryReader): Label;
}

export namespace Label {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    archiveTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
    ownerId: string,
    moduleId: string,
    commitId: string,
    updatedByUserId: string,
    commitCheckState?: CommitCheckState.AsObject,
  }
}

export class CommitCheckState extends jspb.Message {
  getStatus(): CommitCheckStatus;
  setStatus(value: CommitCheckStatus): CommitCheckState;

  getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): CommitCheckState;
  hasUpdateTime(): boolean;
  clearUpdateTime(): CommitCheckState;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommitCheckState.AsObject;
  static toObject(includeInstance: boolean, msg: CommitCheckState): CommitCheckState.AsObject;
  static serializeBinaryToWriter(message: CommitCheckState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommitCheckState;
  static deserializeBinaryFromReader(message: CommitCheckState, reader: jspb.BinaryReader): CommitCheckState;
}

export namespace CommitCheckState {
  export type AsObject = {
    status: CommitCheckStatus,
    updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class LabelRef extends jspb.Message {
  getId(): string;
  setId(value: string): LabelRef;

  getName(): LabelRef.Name | undefined;
  setName(value?: LabelRef.Name): LabelRef;
  hasName(): boolean;
  clearName(): LabelRef;

  getValueCase(): LabelRef.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LabelRef.AsObject;
  static toObject(includeInstance: boolean, msg: LabelRef): LabelRef.AsObject;
  static serializeBinaryToWriter(message: LabelRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LabelRef;
  static deserializeBinaryFromReader(message: LabelRef, reader: jspb.BinaryReader): LabelRef;
}

export namespace LabelRef {
  export type AsObject = {
    id: string,
    name?: LabelRef.Name.AsObject,
  }

  export class Name extends jspb.Message {
    getOwner(): string;
    setOwner(value: string): Name;

    getModule(): string;
    setModule(value: string): Name;

    getLabel(): string;
    setLabel(value: string): Name;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Name.AsObject;
    static toObject(includeInstance: boolean, msg: Name): Name.AsObject;
    static serializeBinaryToWriter(message: Name, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Name;
    static deserializeBinaryFromReader(message: Name, reader: jspb.BinaryReader): Name;
  }

  export namespace Name {
    export type AsObject = {
      owner: string,
      module: string,
      label: string,
    }
  }


  export enum ValueCase { 
    VALUE_NOT_SET = 0,
    ID = 1,
    NAME = 2,
  }
}

export class ScopedLabelRef extends jspb.Message {
  getId(): string;
  setId(value: string): ScopedLabelRef;

  getName(): string;
  setName(value: string): ScopedLabelRef;

  getValueCase(): ScopedLabelRef.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScopedLabelRef.AsObject;
  static toObject(includeInstance: boolean, msg: ScopedLabelRef): ScopedLabelRef.AsObject;
  static serializeBinaryToWriter(message: ScopedLabelRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScopedLabelRef;
  static deserializeBinaryFromReader(message: ScopedLabelRef, reader: jspb.BinaryReader): ScopedLabelRef;
}

export namespace ScopedLabelRef {
  export type AsObject = {
    id: string,
    name: string,
  }

  export enum ValueCase { 
    VALUE_NOT_SET = 0,
    ID = 1,
    NAME = 2,
  }
}

export enum CommitCheckStatus { 
  COMMIT_CHECK_STATUS_UNSPECIFIED = 0,
  COMMIT_CHECK_STATUS_DISABLED = 1,
  COMMIT_CHECK_STATUS_PASSED = 2,
  COMMIT_CHECK_STATUS_PENDING = 3,
  COMMIT_CHECK_STATUS_REJECTED = 4,
  COMMIT_CHECK_STATUS_APPROVED = 5,
}
