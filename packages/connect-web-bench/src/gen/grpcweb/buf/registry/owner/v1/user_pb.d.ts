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

import * as buf_registry_priv_extension_v1beta1_extension_pb from '../../../../buf/registry/priv/extension/v1beta1/extension_pb'; // proto import: "buf/registry/priv/extension/v1beta1/extension.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class User extends jspb.Message {
  getId(): string;
  setId(value: string): User;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): User;
  hasCreateTime(): boolean;
  clearCreateTime(): User;

  getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): User;
  hasUpdateTime(): boolean;
  clearUpdateTime(): User;

  getName(): string;
  setName(value: string): User;

  getType(): UserType;
  setType(value: UserType): User;

  getState(): UserState;
  setState(value: UserState): User;

  getDescription(): string;
  setDescription(value: string): User;

  getUrl(): string;
  setUrl(value: string): User;

  getVerificationStatus(): UserVerificationStatus;
  setVerificationStatus(value: UserVerificationStatus): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
    type: UserType,
    state: UserState,
    description: string,
    url: string,
    verificationStatus: UserVerificationStatus,
  }
}

export class UserRef extends jspb.Message {
  getId(): string;
  setId(value: string): UserRef;

  getName(): string;
  setName(value: string): UserRef;

  getValueCase(): UserRef.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRef.AsObject;
  static toObject(includeInstance: boolean, msg: UserRef): UserRef.AsObject;
  static serializeBinaryToWriter(message: UserRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRef;
  static deserializeBinaryFromReader(message: UserRef, reader: jspb.BinaryReader): UserRef;
}

export namespace UserRef {
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

export enum UserState { 
  USER_STATE_UNSPECIFIED = 0,
  USER_STATE_ACTIVE = 1,
  USER_STATE_INACTIVE = 2,
}
export enum UserType { 
  USER_TYPE_UNSPECIFIED = 0,
  USER_TYPE_STANDARD = 1,
  USER_TYPE_BOT = 2,
  USER_TYPE_SYSTEM = 3,
}
export enum UserVerificationStatus { 
  USER_VERIFICATION_STATUS_UNSPECIFIED = 0,
  USER_VERIFICATION_STATUS_UNVERIFIED = 1,
  USER_VERIFICATION_STATUS_VERIFIED = 2,
  USER_VERIFICATION_STATUS_OFFICIAL = 3,
}
