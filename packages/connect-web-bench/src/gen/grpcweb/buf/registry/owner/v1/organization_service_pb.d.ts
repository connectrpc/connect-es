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

import * as buf_registry_owner_v1_organization_pb from '../../../../buf/registry/owner/v1/organization_pb'; // proto import: "buf/registry/owner/v1/organization.proto"
import * as buf_registry_owner_v1_user_pb from '../../../../buf/registry/owner/v1/user_pb'; // proto import: "buf/registry/owner/v1/user.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class GetOrganizationsRequest extends jspb.Message {
  getOrganizationRefsList(): Array<buf_registry_owner_v1_organization_pb.OrganizationRef>;
  setOrganizationRefsList(value: Array<buf_registry_owner_v1_organization_pb.OrganizationRef>): GetOrganizationsRequest;
  clearOrganizationRefsList(): GetOrganizationsRequest;
  addOrganizationRefs(value?: buf_registry_owner_v1_organization_pb.OrganizationRef, index?: number): buf_registry_owner_v1_organization_pb.OrganizationRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrganizationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOrganizationsRequest): GetOrganizationsRequest.AsObject;
  static serializeBinaryToWriter(message: GetOrganizationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOrganizationsRequest;
  static deserializeBinaryFromReader(message: GetOrganizationsRequest, reader: jspb.BinaryReader): GetOrganizationsRequest;
}

export namespace GetOrganizationsRequest {
  export type AsObject = {
    organizationRefsList: Array<buf_registry_owner_v1_organization_pb.OrganizationRef.AsObject>,
  }
}

export class GetOrganizationsResponse extends jspb.Message {
  getOrganizationsList(): Array<buf_registry_owner_v1_organization_pb.Organization>;
  setOrganizationsList(value: Array<buf_registry_owner_v1_organization_pb.Organization>): GetOrganizationsResponse;
  clearOrganizationsList(): GetOrganizationsResponse;
  addOrganizations(value?: buf_registry_owner_v1_organization_pb.Organization, index?: number): buf_registry_owner_v1_organization_pb.Organization;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrganizationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOrganizationsResponse): GetOrganizationsResponse.AsObject;
  static serializeBinaryToWriter(message: GetOrganizationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOrganizationsResponse;
  static deserializeBinaryFromReader(message: GetOrganizationsResponse, reader: jspb.BinaryReader): GetOrganizationsResponse;
}

export namespace GetOrganizationsResponse {
  export type AsObject = {
    organizationsList: Array<buf_registry_owner_v1_organization_pb.Organization.AsObject>,
  }
}

export class ListOrganizationsRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListOrganizationsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListOrganizationsRequest;

  getUserRefsList(): Array<buf_registry_owner_v1_user_pb.UserRef>;
  setUserRefsList(value: Array<buf_registry_owner_v1_user_pb.UserRef>): ListOrganizationsRequest;
  clearUserRefsList(): ListOrganizationsRequest;
  addUserRefs(value?: buf_registry_owner_v1_user_pb.UserRef, index?: number): buf_registry_owner_v1_user_pb.UserRef;

  getOrder(): ListOrganizationsRequest.Order;
  setOrder(value: ListOrganizationsRequest.Order): ListOrganizationsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationsRequest): ListOrganizationsRequest.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationsRequest;
  static deserializeBinaryFromReader(message: ListOrganizationsRequest, reader: jspb.BinaryReader): ListOrganizationsRequest;
}

export namespace ListOrganizationsRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    userRefsList: Array<buf_registry_owner_v1_user_pb.UserRef.AsObject>,
    order: ListOrganizationsRequest.Order,
  }

  export enum Order { 
    ORDER_UNSPECIFIED = 0,
    ORDER_CREATE_TIME_DESC = 1,
    ORDER_CREATE_TIME_ASC = 2,
  }
}

export class ListOrganizationsResponse extends jspb.Message {
  getNextPageToken(): string;
  setNextPageToken(value: string): ListOrganizationsResponse;

  getOrganizationsList(): Array<buf_registry_owner_v1_organization_pb.Organization>;
  setOrganizationsList(value: Array<buf_registry_owner_v1_organization_pb.Organization>): ListOrganizationsResponse;
  clearOrganizationsList(): ListOrganizationsResponse;
  addOrganizations(value?: buf_registry_owner_v1_organization_pb.Organization, index?: number): buf_registry_owner_v1_organization_pb.Organization;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationsResponse): ListOrganizationsResponse.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationsResponse;
  static deserializeBinaryFromReader(message: ListOrganizationsResponse, reader: jspb.BinaryReader): ListOrganizationsResponse;
}

export namespace ListOrganizationsResponse {
  export type AsObject = {
    nextPageToken: string,
    organizationsList: Array<buf_registry_owner_v1_organization_pb.Organization.AsObject>,
  }
}

export class CreateOrganizationsRequest extends jspb.Message {
  getValuesList(): Array<CreateOrganizationsRequest.Value>;
  setValuesList(value: Array<CreateOrganizationsRequest.Value>): CreateOrganizationsRequest;
  clearValuesList(): CreateOrganizationsRequest;
  addValues(value?: CreateOrganizationsRequest.Value, index?: number): CreateOrganizationsRequest.Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrganizationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrganizationsRequest): CreateOrganizationsRequest.AsObject;
  static serializeBinaryToWriter(message: CreateOrganizationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrganizationsRequest;
  static deserializeBinaryFromReader(message: CreateOrganizationsRequest, reader: jspb.BinaryReader): CreateOrganizationsRequest;
}

export namespace CreateOrganizationsRequest {
  export type AsObject = {
    valuesList: Array<CreateOrganizationsRequest.Value.AsObject>,
  }

  export class Value extends jspb.Message {
    getName(): string;
    setName(value: string): Value;

    getDescription(): string;
    setDescription(value: string): Value;

    getUrl(): string;
    setUrl(value: string): Value;

    getVerificationStatus(): buf_registry_owner_v1_organization_pb.OrganizationVerificationStatus;
    setVerificationStatus(value: buf_registry_owner_v1_organization_pb.OrganizationVerificationStatus): Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Value;
    static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
  }

  export namespace Value {
    export type AsObject = {
      name: string,
      description: string,
      url: string,
      verificationStatus: buf_registry_owner_v1_organization_pb.OrganizationVerificationStatus,
    }
  }

}

export class CreateOrganizationsResponse extends jspb.Message {
  getOrganizationsList(): Array<buf_registry_owner_v1_organization_pb.Organization>;
  setOrganizationsList(value: Array<buf_registry_owner_v1_organization_pb.Organization>): CreateOrganizationsResponse;
  clearOrganizationsList(): CreateOrganizationsResponse;
  addOrganizations(value?: buf_registry_owner_v1_organization_pb.Organization, index?: number): buf_registry_owner_v1_organization_pb.Organization;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrganizationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrganizationsResponse): CreateOrganizationsResponse.AsObject;
  static serializeBinaryToWriter(message: CreateOrganizationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrganizationsResponse;
  static deserializeBinaryFromReader(message: CreateOrganizationsResponse, reader: jspb.BinaryReader): CreateOrganizationsResponse;
}

export namespace CreateOrganizationsResponse {
  export type AsObject = {
    organizationsList: Array<buf_registry_owner_v1_organization_pb.Organization.AsObject>,
  }
}

export class UpdateOrganizationsRequest extends jspb.Message {
  getValuesList(): Array<UpdateOrganizationsRequest.Value>;
  setValuesList(value: Array<UpdateOrganizationsRequest.Value>): UpdateOrganizationsRequest;
  clearValuesList(): UpdateOrganizationsRequest;
  addValues(value?: UpdateOrganizationsRequest.Value, index?: number): UpdateOrganizationsRequest.Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOrganizationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOrganizationsRequest): UpdateOrganizationsRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateOrganizationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOrganizationsRequest;
  static deserializeBinaryFromReader(message: UpdateOrganizationsRequest, reader: jspb.BinaryReader): UpdateOrganizationsRequest;
}

export namespace UpdateOrganizationsRequest {
  export type AsObject = {
    valuesList: Array<UpdateOrganizationsRequest.Value.AsObject>,
  }

  export class Value extends jspb.Message {
    getOrganizationRef(): buf_registry_owner_v1_organization_pb.OrganizationRef | undefined;
    setOrganizationRef(value?: buf_registry_owner_v1_organization_pb.OrganizationRef): Value;
    hasOrganizationRef(): boolean;
    clearOrganizationRef(): Value;

    getDescription(): string;
    setDescription(value: string): Value;
    hasDescription(): boolean;
    clearDescription(): Value;

    getUrl(): string;
    setUrl(value: string): Value;
    hasUrl(): boolean;
    clearUrl(): Value;

    getVerificationStatus(): buf_registry_owner_v1_organization_pb.OrganizationVerificationStatus;
    setVerificationStatus(value: buf_registry_owner_v1_organization_pb.OrganizationVerificationStatus): Value;
    hasVerificationStatus(): boolean;
    clearVerificationStatus(): Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Value;
    static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
  }

  export namespace Value {
    export type AsObject = {
      organizationRef?: buf_registry_owner_v1_organization_pb.OrganizationRef.AsObject,
      description?: string,
      url?: string,
      verificationStatus?: buf_registry_owner_v1_organization_pb.OrganizationVerificationStatus,
    }

    export enum DescriptionCase { 
      _DESCRIPTION_NOT_SET = 0,
      DESCRIPTION = 2,
    }

    export enum UrlCase { 
      _URL_NOT_SET = 0,
      URL = 3,
    }

    export enum VerificationStatusCase { 
      _VERIFICATION_STATUS_NOT_SET = 0,
      VERIFICATION_STATUS = 4,
    }
  }

}

export class UpdateOrganizationsResponse extends jspb.Message {
  getOrganizationsList(): Array<buf_registry_owner_v1_organization_pb.Organization>;
  setOrganizationsList(value: Array<buf_registry_owner_v1_organization_pb.Organization>): UpdateOrganizationsResponse;
  clearOrganizationsList(): UpdateOrganizationsResponse;
  addOrganizations(value?: buf_registry_owner_v1_organization_pb.Organization, index?: number): buf_registry_owner_v1_organization_pb.Organization;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOrganizationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOrganizationsResponse): UpdateOrganizationsResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateOrganizationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOrganizationsResponse;
  static deserializeBinaryFromReader(message: UpdateOrganizationsResponse, reader: jspb.BinaryReader): UpdateOrganizationsResponse;
}

export namespace UpdateOrganizationsResponse {
  export type AsObject = {
    organizationsList: Array<buf_registry_owner_v1_organization_pb.Organization.AsObject>,
  }
}

export class DeleteOrganizationsRequest extends jspb.Message {
  getOrganizationRefsList(): Array<buf_registry_owner_v1_organization_pb.OrganizationRef>;
  setOrganizationRefsList(value: Array<buf_registry_owner_v1_organization_pb.OrganizationRef>): DeleteOrganizationsRequest;
  clearOrganizationRefsList(): DeleteOrganizationsRequest;
  addOrganizationRefs(value?: buf_registry_owner_v1_organization_pb.OrganizationRef, index?: number): buf_registry_owner_v1_organization_pb.OrganizationRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOrganizationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOrganizationsRequest): DeleteOrganizationsRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteOrganizationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOrganizationsRequest;
  static deserializeBinaryFromReader(message: DeleteOrganizationsRequest, reader: jspb.BinaryReader): DeleteOrganizationsRequest;
}

export namespace DeleteOrganizationsRequest {
  export type AsObject = {
    organizationRefsList: Array<buf_registry_owner_v1_organization_pb.OrganizationRef.AsObject>,
  }
}

export class DeleteOrganizationsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOrganizationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOrganizationsResponse): DeleteOrganizationsResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteOrganizationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOrganizationsResponse;
  static deserializeBinaryFromReader(message: DeleteOrganizationsResponse, reader: jspb.BinaryReader): DeleteOrganizationsResponse;
}

export namespace DeleteOrganizationsResponse {
  export type AsObject = {
  }
}

