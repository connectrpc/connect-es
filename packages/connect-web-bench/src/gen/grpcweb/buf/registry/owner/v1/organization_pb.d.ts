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


export class Organization extends jspb.Message {
  getId(): string;
  setId(value: string): Organization;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Organization;
  hasCreateTime(): boolean;
  clearCreateTime(): Organization;

  getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): Organization;
  hasUpdateTime(): boolean;
  clearUpdateTime(): Organization;

  getName(): string;
  setName(value: string): Organization;

  getDescription(): string;
  setDescription(value: string): Organization;

  getUrl(): string;
  setUrl(value: string): Organization;

  getVerificationStatus(): OrganizationVerificationStatus;
  setVerificationStatus(value: OrganizationVerificationStatus): Organization;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Organization.AsObject;
  static toObject(includeInstance: boolean, msg: Organization): Organization.AsObject;
  static serializeBinaryToWriter(message: Organization, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Organization;
  static deserializeBinaryFromReader(message: Organization, reader: jspb.BinaryReader): Organization;
}

export namespace Organization {
  export type AsObject = {
    id: string;
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    name: string;
    description: string;
    url: string;
    verificationStatus: OrganizationVerificationStatus;
  };
}

export class OrganizationRef extends jspb.Message {
  getId(): string;
  setId(value: string): OrganizationRef;
  hasId(): boolean;
  clearId(): OrganizationRef;

  getName(): string;
  setName(value: string): OrganizationRef;
  hasName(): boolean;
  clearName(): OrganizationRef;

  getValueCase(): OrganizationRef.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrganizationRef.AsObject;
  static toObject(includeInstance: boolean, msg: OrganizationRef): OrganizationRef.AsObject;
  static serializeBinaryToWriter(message: OrganizationRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrganizationRef;
  static deserializeBinaryFromReader(message: OrganizationRef, reader: jspb.BinaryReader): OrganizationRef;
}

export namespace OrganizationRef {
  export type AsObject = {
    id?: string;
    name?: string;
  };

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    ID = 1,
    NAME = 2,
  }
}

export enum OrganizationVerificationStatus {
  ORGANIZATION_VERIFICATION_STATUS_UNSPECIFIED = 0,
  ORGANIZATION_VERIFICATION_STATUS_UNVERIFIED = 1,
  ORGANIZATION_VERIFICATION_STATUS_VERIFIED = 2,
  ORGANIZATION_VERIFICATION_STATUS_OFFICIAL = 3,
}
