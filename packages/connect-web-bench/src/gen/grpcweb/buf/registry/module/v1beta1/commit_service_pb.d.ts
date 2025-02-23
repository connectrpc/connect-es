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

import * as buf_registry_module_v1beta1_commit_pb from '../../../../buf/registry/module/v1beta1/commit_pb'; // proto import: "buf/registry/module/v1beta1/commit.proto"
import * as buf_registry_module_v1beta1_digest_pb from '../../../../buf/registry/module/v1beta1/digest_pb'; // proto import: "buf/registry/module/v1beta1/digest.proto"
import * as buf_registry_module_v1beta1_resource_pb from '../../../../buf/registry/module/v1beta1/resource_pb'; // proto import: "buf/registry/module/v1beta1/resource.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class GetCommitsRequest extends jspb.Message {
  getResourceRefsList(): Array<buf_registry_module_v1beta1_resource_pb.ResourceRef>;
  setResourceRefsList(value: Array<buf_registry_module_v1beta1_resource_pb.ResourceRef>): GetCommitsRequest;
  clearResourceRefsList(): GetCommitsRequest;
  addResourceRefs(value?: buf_registry_module_v1beta1_resource_pb.ResourceRef, index?: number): buf_registry_module_v1beta1_resource_pb.ResourceRef;

  getDigestType(): buf_registry_module_v1beta1_digest_pb.DigestType;
  setDigestType(value: buf_registry_module_v1beta1_digest_pb.DigestType): GetCommitsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCommitsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCommitsRequest): GetCommitsRequest.AsObject;
  static serializeBinaryToWriter(message: GetCommitsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCommitsRequest;
  static deserializeBinaryFromReader(message: GetCommitsRequest, reader: jspb.BinaryReader): GetCommitsRequest;
}

export namespace GetCommitsRequest {
  export type AsObject = {
    resourceRefsList: Array<buf_registry_module_v1beta1_resource_pb.ResourceRef.AsObject>,
    digestType: buf_registry_module_v1beta1_digest_pb.DigestType,
  }
}

export class GetCommitsResponse extends jspb.Message {
  getCommitsList(): Array<buf_registry_module_v1beta1_commit_pb.Commit>;
  setCommitsList(value: Array<buf_registry_module_v1beta1_commit_pb.Commit>): GetCommitsResponse;
  clearCommitsList(): GetCommitsResponse;
  addCommits(value?: buf_registry_module_v1beta1_commit_pb.Commit, index?: number): buf_registry_module_v1beta1_commit_pb.Commit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCommitsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCommitsResponse): GetCommitsResponse.AsObject;
  static serializeBinaryToWriter(message: GetCommitsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCommitsResponse;
  static deserializeBinaryFromReader(message: GetCommitsResponse, reader: jspb.BinaryReader): GetCommitsResponse;
}

export namespace GetCommitsResponse {
  export type AsObject = {
    commitsList: Array<buf_registry_module_v1beta1_commit_pb.Commit.AsObject>,
  }
}

export class ListCommitsRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListCommitsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListCommitsRequest;

  getResourceRef(): buf_registry_module_v1beta1_resource_pb.ResourceRef | undefined;
  setResourceRef(value?: buf_registry_module_v1beta1_resource_pb.ResourceRef): ListCommitsRequest;
  hasResourceRef(): boolean;
  clearResourceRef(): ListCommitsRequest;

  getOrder(): ListCommitsRequest.Order;
  setOrder(value: ListCommitsRequest.Order): ListCommitsRequest;

  getDigestType(): buf_registry_module_v1beta1_digest_pb.DigestType;
  setDigestType(value: buf_registry_module_v1beta1_digest_pb.DigestType): ListCommitsRequest;

  getIdQuery(): string;
  setIdQuery(value: string): ListCommitsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCommitsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListCommitsRequest): ListCommitsRequest.AsObject;
  static serializeBinaryToWriter(message: ListCommitsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCommitsRequest;
  static deserializeBinaryFromReader(message: ListCommitsRequest, reader: jspb.BinaryReader): ListCommitsRequest;
}

export namespace ListCommitsRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    resourceRef?: buf_registry_module_v1beta1_resource_pb.ResourceRef.AsObject,
    order: ListCommitsRequest.Order,
    digestType: buf_registry_module_v1beta1_digest_pb.DigestType,
    idQuery: string,
  }

  export enum Order { 
    ORDER_UNSPECIFIED = 0,
    ORDER_CREATE_TIME_DESC = 1,
    ORDER_CREATE_TIME_ASC = 2,
  }
}

export class ListCommitsResponse extends jspb.Message {
  getNextPageToken(): string;
  setNextPageToken(value: string): ListCommitsResponse;

  getCommitsList(): Array<buf_registry_module_v1beta1_commit_pb.Commit>;
  setCommitsList(value: Array<buf_registry_module_v1beta1_commit_pb.Commit>): ListCommitsResponse;
  clearCommitsList(): ListCommitsResponse;
  addCommits(value?: buf_registry_module_v1beta1_commit_pb.Commit, index?: number): buf_registry_module_v1beta1_commit_pb.Commit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCommitsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListCommitsResponse): ListCommitsResponse.AsObject;
  static serializeBinaryToWriter(message: ListCommitsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCommitsResponse;
  static deserializeBinaryFromReader(message: ListCommitsResponse, reader: jspb.BinaryReader): ListCommitsResponse;
}

export namespace ListCommitsResponse {
  export type AsObject = {
    nextPageToken: string,
    commitsList: Array<buf_registry_module_v1beta1_commit_pb.Commit.AsObject>,
  }
}

