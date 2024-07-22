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

import * as jspb from 'google-protobuf'

import * as buf_registry_module_v1beta1_commit_pb from '../../../../buf/registry/module/v1beta1/commit_pb'; // proto import: "buf/registry/module/v1beta1/commit.proto"
import * as buf_registry_module_v1beta1_digest_pb from '../../../../buf/registry/module/v1beta1/digest_pb'; // proto import: "buf/registry/module/v1beta1/digest.proto"
import * as buf_registry_module_v1beta1_label_pb from '../../../../buf/registry/module/v1beta1/label_pb'; // proto import: "buf/registry/module/v1beta1/label.proto"
import * as buf_registry_module_v1beta1_resource_pb from '../../../../buf/registry/module/v1beta1/resource_pb'; // proto import: "buf/registry/module/v1beta1/resource.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class GetLabelsRequest extends jspb.Message {
  getLabelRefsList(): Array<buf_registry_module_v1beta1_label_pb.LabelRef>;
  setLabelRefsList(value: Array<buf_registry_module_v1beta1_label_pb.LabelRef>): GetLabelsRequest;
  clearLabelRefsList(): GetLabelsRequest;
  addLabelRefs(value?: buf_registry_module_v1beta1_label_pb.LabelRef, index?: number): buf_registry_module_v1beta1_label_pb.LabelRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLabelsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLabelsRequest): GetLabelsRequest.AsObject;
  static serializeBinaryToWriter(message: GetLabelsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLabelsRequest;
  static deserializeBinaryFromReader(message: GetLabelsRequest, reader: jspb.BinaryReader): GetLabelsRequest;
}

export namespace GetLabelsRequest {
  export type AsObject = {
    labelRefsList: Array<buf_registry_module_v1beta1_label_pb.LabelRef.AsObject>,
  }
}

export class GetLabelsResponse extends jspb.Message {
  getLabelsList(): Array<buf_registry_module_v1beta1_label_pb.Label>;
  setLabelsList(value: Array<buf_registry_module_v1beta1_label_pb.Label>): GetLabelsResponse;
  clearLabelsList(): GetLabelsResponse;
  addLabels(value?: buf_registry_module_v1beta1_label_pb.Label, index?: number): buf_registry_module_v1beta1_label_pb.Label;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLabelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLabelsResponse): GetLabelsResponse.AsObject;
  static serializeBinaryToWriter(message: GetLabelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLabelsResponse;
  static deserializeBinaryFromReader(message: GetLabelsResponse, reader: jspb.BinaryReader): GetLabelsResponse;
}

export namespace GetLabelsResponse {
  export type AsObject = {
    labelsList: Array<buf_registry_module_v1beta1_label_pb.Label.AsObject>,
  }
}

export class ListLabelsRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListLabelsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListLabelsRequest;

  getResourceRef(): buf_registry_module_v1beta1_resource_pb.ResourceRef | undefined;
  setResourceRef(value?: buf_registry_module_v1beta1_resource_pb.ResourceRef): ListLabelsRequest;
  hasResourceRef(): boolean;
  clearResourceRef(): ListLabelsRequest;

  getOrder(): ListLabelsRequest.Order;
  setOrder(value: ListLabelsRequest.Order): ListLabelsRequest;

  getCommitCheckStatusesList(): Array<buf_registry_module_v1beta1_label_pb.CommitCheckStatus>;
  setCommitCheckStatusesList(value: Array<buf_registry_module_v1beta1_label_pb.CommitCheckStatus>): ListLabelsRequest;
  clearCommitCheckStatusesList(): ListLabelsRequest;
  addCommitCheckStatuses(value: buf_registry_module_v1beta1_label_pb.CommitCheckStatus, index?: number): ListLabelsRequest;

  getNameQuery(): string;
  setNameQuery(value: string): ListLabelsRequest;

  getArchiveFilter(): ListLabelsRequest.ArchiveFilter;
  setArchiveFilter(value: ListLabelsRequest.ArchiveFilter): ListLabelsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListLabelsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListLabelsRequest): ListLabelsRequest.AsObject;
  static serializeBinaryToWriter(message: ListLabelsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListLabelsRequest;
  static deserializeBinaryFromReader(message: ListLabelsRequest, reader: jspb.BinaryReader): ListLabelsRequest;
}

export namespace ListLabelsRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    resourceRef?: buf_registry_module_v1beta1_resource_pb.ResourceRef.AsObject,
    order: ListLabelsRequest.Order,
    commitCheckStatusesList: Array<buf_registry_module_v1beta1_label_pb.CommitCheckStatus>,
    nameQuery: string,
    archiveFilter: ListLabelsRequest.ArchiveFilter,
  }

  export enum Order { 
    ORDER_UNSPECIFIED = 0,
    ORDER_CREATE_TIME_DESC = 1,
    ORDER_CREATE_TIME_ASC = 2,
    ORDER_UPDATE_TIME_DESC = 3,
    ORDER_UPDATE_TIME_ASC = 4,
  }

  export enum ArchiveFilter { 
    ARCHIVE_FILTER_UNSPECIFIED = 0,
    ARCHIVE_FILTER_UNARCHIVED_ONLY = 1,
    ARCHIVE_FILTER_ARCHIVED_ONLY = 2,
    ARCHIVE_FILTER_ALL = 3,
  }
}

export class ListLabelsResponse extends jspb.Message {
  getNextPageToken(): string;
  setNextPageToken(value: string): ListLabelsResponse;

  getLabelsList(): Array<buf_registry_module_v1beta1_label_pb.Label>;
  setLabelsList(value: Array<buf_registry_module_v1beta1_label_pb.Label>): ListLabelsResponse;
  clearLabelsList(): ListLabelsResponse;
  addLabels(value?: buf_registry_module_v1beta1_label_pb.Label, index?: number): buf_registry_module_v1beta1_label_pb.Label;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListLabelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListLabelsResponse): ListLabelsResponse.AsObject;
  static serializeBinaryToWriter(message: ListLabelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListLabelsResponse;
  static deserializeBinaryFromReader(message: ListLabelsResponse, reader: jspb.BinaryReader): ListLabelsResponse;
}

export namespace ListLabelsResponse {
  export type AsObject = {
    nextPageToken: string,
    labelsList: Array<buf_registry_module_v1beta1_label_pb.Label.AsObject>,
  }
}

export class ListLabelHistoryRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListLabelHistoryRequest;

  getPageToken(): string;
  setPageToken(value: string): ListLabelHistoryRequest;

  getLabelRef(): buf_registry_module_v1beta1_label_pb.LabelRef | undefined;
  setLabelRef(value?: buf_registry_module_v1beta1_label_pb.LabelRef): ListLabelHistoryRequest;
  hasLabelRef(): boolean;
  clearLabelRef(): ListLabelHistoryRequest;

  getOrder(): ListLabelHistoryRequest.Order;
  setOrder(value: ListLabelHistoryRequest.Order): ListLabelHistoryRequest;

  getDigestType(): buf_registry_module_v1beta1_digest_pb.DigestType;
  setDigestType(value: buf_registry_module_v1beta1_digest_pb.DigestType): ListLabelHistoryRequest;

  getCommitCheckStatusesList(): Array<buf_registry_module_v1beta1_label_pb.CommitCheckStatus>;
  setCommitCheckStatusesList(value: Array<buf_registry_module_v1beta1_label_pb.CommitCheckStatus>): ListLabelHistoryRequest;
  clearCommitCheckStatusesList(): ListLabelHistoryRequest;
  addCommitCheckStatuses(value: buf_registry_module_v1beta1_label_pb.CommitCheckStatus, index?: number): ListLabelHistoryRequest;

  getStartCommitId(): string;
  setStartCommitId(value: string): ListLabelHistoryRequest;

  getOnlyCommitsWithChangedDigests(): boolean;
  setOnlyCommitsWithChangedDigests(value: boolean): ListLabelHistoryRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListLabelHistoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListLabelHistoryRequest): ListLabelHistoryRequest.AsObject;
  static serializeBinaryToWriter(message: ListLabelHistoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListLabelHistoryRequest;
  static deserializeBinaryFromReader(message: ListLabelHistoryRequest, reader: jspb.BinaryReader): ListLabelHistoryRequest;
}

export namespace ListLabelHistoryRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    labelRef?: buf_registry_module_v1beta1_label_pb.LabelRef.AsObject,
    order: ListLabelHistoryRequest.Order,
    digestType: buf_registry_module_v1beta1_digest_pb.DigestType,
    commitCheckStatusesList: Array<buf_registry_module_v1beta1_label_pb.CommitCheckStatus>,
    startCommitId: string,
    onlyCommitsWithChangedDigests: boolean,
  }

  export enum Order { 
    ORDER_UNSPECIFIED = 0,
    ORDER_DESC = 1,
    ORDER_ASC = 2,
  }
}

export class ListLabelHistoryResponse extends jspb.Message {
  getNextPageToken(): string;
  setNextPageToken(value: string): ListLabelHistoryResponse;

  getValuesList(): Array<ListLabelHistoryResponse.Value>;
  setValuesList(value: Array<ListLabelHistoryResponse.Value>): ListLabelHistoryResponse;
  clearValuesList(): ListLabelHistoryResponse;
  addValues(value?: ListLabelHistoryResponse.Value, index?: number): ListLabelHistoryResponse.Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListLabelHistoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListLabelHistoryResponse): ListLabelHistoryResponse.AsObject;
  static serializeBinaryToWriter(message: ListLabelHistoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListLabelHistoryResponse;
  static deserializeBinaryFromReader(message: ListLabelHistoryResponse, reader: jspb.BinaryReader): ListLabelHistoryResponse;
}

export namespace ListLabelHistoryResponse {
  export type AsObject = {
    nextPageToken: string,
    valuesList: Array<ListLabelHistoryResponse.Value.AsObject>,
  }

  export class Value extends jspb.Message {
    getCommit(): buf_registry_module_v1beta1_commit_pb.Commit | undefined;
    setCommit(value?: buf_registry_module_v1beta1_commit_pb.Commit): Value;
    hasCommit(): boolean;
    clearCommit(): Value;

    getCommitCheckState(): buf_registry_module_v1beta1_label_pb.CommitCheckState | undefined;
    setCommitCheckState(value?: buf_registry_module_v1beta1_label_pb.CommitCheckState): Value;
    hasCommitCheckState(): boolean;
    clearCommitCheckState(): Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Value;
    static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
  }

  export namespace Value {
    export type AsObject = {
      commit?: buf_registry_module_v1beta1_commit_pb.Commit.AsObject,
      commitCheckState?: buf_registry_module_v1beta1_label_pb.CommitCheckState.AsObject,
    }
  }

}

export class CreateOrUpdateLabelsRequest extends jspb.Message {
  getValuesList(): Array<CreateOrUpdateLabelsRequest.Value>;
  setValuesList(value: Array<CreateOrUpdateLabelsRequest.Value>): CreateOrUpdateLabelsRequest;
  clearValuesList(): CreateOrUpdateLabelsRequest;
  addValues(value?: CreateOrUpdateLabelsRequest.Value, index?: number): CreateOrUpdateLabelsRequest.Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrUpdateLabelsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrUpdateLabelsRequest): CreateOrUpdateLabelsRequest.AsObject;
  static serializeBinaryToWriter(message: CreateOrUpdateLabelsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrUpdateLabelsRequest;
  static deserializeBinaryFromReader(message: CreateOrUpdateLabelsRequest, reader: jspb.BinaryReader): CreateOrUpdateLabelsRequest;
}

export namespace CreateOrUpdateLabelsRequest {
  export type AsObject = {
    valuesList: Array<CreateOrUpdateLabelsRequest.Value.AsObject>,
  }

  export class Value extends jspb.Message {
    getLabelRef(): buf_registry_module_v1beta1_label_pb.LabelRef | undefined;
    setLabelRef(value?: buf_registry_module_v1beta1_label_pb.LabelRef): Value;
    hasLabelRef(): boolean;
    clearLabelRef(): Value;

    getCommitId(): string;
    setCommitId(value: string): Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Value;
    static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
  }

  export namespace Value {
    export type AsObject = {
      labelRef?: buf_registry_module_v1beta1_label_pb.LabelRef.AsObject,
      commitId: string,
    }
  }

}

export class CreateOrUpdateLabelsResponse extends jspb.Message {
  getLabelsList(): Array<buf_registry_module_v1beta1_label_pb.Label>;
  setLabelsList(value: Array<buf_registry_module_v1beta1_label_pb.Label>): CreateOrUpdateLabelsResponse;
  clearLabelsList(): CreateOrUpdateLabelsResponse;
  addLabels(value?: buf_registry_module_v1beta1_label_pb.Label, index?: number): buf_registry_module_v1beta1_label_pb.Label;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrUpdateLabelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrUpdateLabelsResponse): CreateOrUpdateLabelsResponse.AsObject;
  static serializeBinaryToWriter(message: CreateOrUpdateLabelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrUpdateLabelsResponse;
  static deserializeBinaryFromReader(message: CreateOrUpdateLabelsResponse, reader: jspb.BinaryReader): CreateOrUpdateLabelsResponse;
}

export namespace CreateOrUpdateLabelsResponse {
  export type AsObject = {
    labelsList: Array<buf_registry_module_v1beta1_label_pb.Label.AsObject>,
  }
}

export class ArchiveLabelsRequest extends jspb.Message {
  getLabelRefsList(): Array<buf_registry_module_v1beta1_label_pb.LabelRef>;
  setLabelRefsList(value: Array<buf_registry_module_v1beta1_label_pb.LabelRef>): ArchiveLabelsRequest;
  clearLabelRefsList(): ArchiveLabelsRequest;
  addLabelRefs(value?: buf_registry_module_v1beta1_label_pb.LabelRef, index?: number): buf_registry_module_v1beta1_label_pb.LabelRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchiveLabelsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ArchiveLabelsRequest): ArchiveLabelsRequest.AsObject;
  static serializeBinaryToWriter(message: ArchiveLabelsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchiveLabelsRequest;
  static deserializeBinaryFromReader(message: ArchiveLabelsRequest, reader: jspb.BinaryReader): ArchiveLabelsRequest;
}

export namespace ArchiveLabelsRequest {
  export type AsObject = {
    labelRefsList: Array<buf_registry_module_v1beta1_label_pb.LabelRef.AsObject>,
  }
}

export class ArchiveLabelsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchiveLabelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ArchiveLabelsResponse): ArchiveLabelsResponse.AsObject;
  static serializeBinaryToWriter(message: ArchiveLabelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchiveLabelsResponse;
  static deserializeBinaryFromReader(message: ArchiveLabelsResponse, reader: jspb.BinaryReader): ArchiveLabelsResponse;
}

export namespace ArchiveLabelsResponse {
  export type AsObject = {
  }
}

export class UnarchiveLabelsRequest extends jspb.Message {
  getLabelRefsList(): Array<buf_registry_module_v1beta1_label_pb.LabelRef>;
  setLabelRefsList(value: Array<buf_registry_module_v1beta1_label_pb.LabelRef>): UnarchiveLabelsRequest;
  clearLabelRefsList(): UnarchiveLabelsRequest;
  addLabelRefs(value?: buf_registry_module_v1beta1_label_pb.LabelRef, index?: number): buf_registry_module_v1beta1_label_pb.LabelRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnarchiveLabelsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnarchiveLabelsRequest): UnarchiveLabelsRequest.AsObject;
  static serializeBinaryToWriter(message: UnarchiveLabelsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnarchiveLabelsRequest;
  static deserializeBinaryFromReader(message: UnarchiveLabelsRequest, reader: jspb.BinaryReader): UnarchiveLabelsRequest;
}

export namespace UnarchiveLabelsRequest {
  export type AsObject = {
    labelRefsList: Array<buf_registry_module_v1beta1_label_pb.LabelRef.AsObject>,
  }
}

export class UnarchiveLabelsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnarchiveLabelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UnarchiveLabelsResponse): UnarchiveLabelsResponse.AsObject;
  static serializeBinaryToWriter(message: UnarchiveLabelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnarchiveLabelsResponse;
  static deserializeBinaryFromReader(message: UnarchiveLabelsResponse, reader: jspb.BinaryReader): UnarchiveLabelsResponse;
}

export namespace UnarchiveLabelsResponse {
  export type AsObject = {
  }
}

