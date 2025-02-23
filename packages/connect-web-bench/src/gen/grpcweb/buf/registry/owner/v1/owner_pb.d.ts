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

import * as buf_registry_owner_v1_organization_pb from '../../../../buf/registry/owner/v1/organization_pb'; // proto import: "buf/registry/owner/v1/organization.proto"
import * as buf_registry_owner_v1_user_pb from '../../../../buf/registry/owner/v1/user_pb'; // proto import: "buf/registry/owner/v1/user.proto"
import * as buf_registry_priv_extension_v1beta1_extension_pb from '../../../../buf/registry/priv/extension/v1beta1/extension_pb'; // proto import: "buf/registry/priv/extension/v1beta1/extension.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class Owner extends jspb.Message {
  getUser(): buf_registry_owner_v1_user_pb.User | undefined;
  setUser(value?: buf_registry_owner_v1_user_pb.User): Owner;
  hasUser(): boolean;
  clearUser(): Owner;

  getOrganization(): buf_registry_owner_v1_organization_pb.Organization | undefined;
  setOrganization(value?: buf_registry_owner_v1_organization_pb.Organization): Owner;
  hasOrganization(): boolean;
  clearOrganization(): Owner;

  getValueCase(): Owner.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Owner.AsObject;
  static toObject(includeInstance: boolean, msg: Owner): Owner.AsObject;
  static serializeBinaryToWriter(message: Owner, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Owner;
  static deserializeBinaryFromReader(message: Owner, reader: jspb.BinaryReader): Owner;
}

export namespace Owner {
  export type AsObject = {
    user?: buf_registry_owner_v1_user_pb.User.AsObject,
    organization?: buf_registry_owner_v1_organization_pb.Organization.AsObject,
  }

  export enum ValueCase { 
    VALUE_NOT_SET = 0,
    USER = 1,
    ORGANIZATION = 2,
  }
}

export class OwnerRef extends jspb.Message {
  getId(): string;
  setId(value: string): OwnerRef;

  getName(): string;
  setName(value: string): OwnerRef;

  getValueCase(): OwnerRef.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OwnerRef.AsObject;
  static toObject(includeInstance: boolean, msg: OwnerRef): OwnerRef.AsObject;
  static serializeBinaryToWriter(message: OwnerRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OwnerRef;
  static deserializeBinaryFromReader(message: OwnerRef, reader: jspb.BinaryReader): OwnerRef;
}

export namespace OwnerRef {
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

