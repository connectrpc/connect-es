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
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class GetUsersRequest extends jspb.Message {
  getUserRefsList(): Array<buf_registry_owner_v1_user_pb.UserRef>;
  setUserRefsList(value: Array<buf_registry_owner_v1_user_pb.UserRef>): GetUsersRequest;
  clearUserRefsList(): GetUsersRequest;
  addUserRefs(value?: buf_registry_owner_v1_user_pb.UserRef, index?: number): buf_registry_owner_v1_user_pb.UserRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUsersRequest): GetUsersRequest.AsObject;
  static serializeBinaryToWriter(message: GetUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUsersRequest;
  static deserializeBinaryFromReader(message: GetUsersRequest, reader: jspb.BinaryReader): GetUsersRequest;
}

export namespace GetUsersRequest {
  export type AsObject = {
    userRefsList: Array<buf_registry_owner_v1_user_pb.UserRef.AsObject>,
  }
}

export class GetUsersResponse extends jspb.Message {
  getUsersList(): Array<buf_registry_owner_v1_user_pb.User>;
  setUsersList(value: Array<buf_registry_owner_v1_user_pb.User>): GetUsersResponse;
  clearUsersList(): GetUsersResponse;
  addUsers(value?: buf_registry_owner_v1_user_pb.User, index?: number): buf_registry_owner_v1_user_pb.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUsersResponse): GetUsersResponse.AsObject;
  static serializeBinaryToWriter(message: GetUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUsersResponse;
  static deserializeBinaryFromReader(message: GetUsersResponse, reader: jspb.BinaryReader): GetUsersResponse;
}

export namespace GetUsersResponse {
  export type AsObject = {
    usersList: Array<buf_registry_owner_v1_user_pb.User.AsObject>,
  }
}

export class ListUsersRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListUsersRequest;

  getPageToken(): string;
  setPageToken(value: string): ListUsersRequest;

  getOrganizationRefsList(): Array<buf_registry_owner_v1_organization_pb.OrganizationRef>;
  setOrganizationRefsList(value: Array<buf_registry_owner_v1_organization_pb.OrganizationRef>): ListUsersRequest;
  clearOrganizationRefsList(): ListUsersRequest;
  addOrganizationRefs(value?: buf_registry_owner_v1_organization_pb.OrganizationRef, index?: number): buf_registry_owner_v1_organization_pb.OrganizationRef;

  getOrder(): ListUsersRequest.Order;
  setOrder(value: ListUsersRequest.Order): ListUsersRequest;

  getHasTypesList(): Array<buf_registry_owner_v1_user_pb.UserType>;
  setHasTypesList(value: Array<buf_registry_owner_v1_user_pb.UserType>): ListUsersRequest;
  clearHasTypesList(): ListUsersRequest;
  addHasTypes(value: buf_registry_owner_v1_user_pb.UserType, index?: number): ListUsersRequest;

  getHasStatesList(): Array<buf_registry_owner_v1_user_pb.UserState>;
  setHasStatesList(value: Array<buf_registry_owner_v1_user_pb.UserState>): ListUsersRequest;
  clearHasStatesList(): ListUsersRequest;
  addHasStates(value: buf_registry_owner_v1_user_pb.UserState, index?: number): ListUsersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListUsersRequest): ListUsersRequest.AsObject;
  static serializeBinaryToWriter(message: ListUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUsersRequest;
  static deserializeBinaryFromReader(message: ListUsersRequest, reader: jspb.BinaryReader): ListUsersRequest;
}

export namespace ListUsersRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    organizationRefsList: Array<buf_registry_owner_v1_organization_pb.OrganizationRef.AsObject>,
    order: ListUsersRequest.Order,
    hasTypesList: Array<buf_registry_owner_v1_user_pb.UserType>,
    hasStatesList: Array<buf_registry_owner_v1_user_pb.UserState>,
  }

  export enum Order { 
    ORDER_UNSPECIFIED = 0,
    ORDER_CREATE_TIME_DESC = 1,
    ORDER_CREATE_TIME_ASC = 2,
  }
}

export class ListUsersResponse extends jspb.Message {
  getNextPageToken(): string;
  setNextPageToken(value: string): ListUsersResponse;

  getUsersList(): Array<buf_registry_owner_v1_user_pb.User>;
  setUsersList(value: Array<buf_registry_owner_v1_user_pb.User>): ListUsersResponse;
  clearUsersList(): ListUsersResponse;
  addUsers(value?: buf_registry_owner_v1_user_pb.User, index?: number): buf_registry_owner_v1_user_pb.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListUsersResponse): ListUsersResponse.AsObject;
  static serializeBinaryToWriter(message: ListUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUsersResponse;
  static deserializeBinaryFromReader(message: ListUsersResponse, reader: jspb.BinaryReader): ListUsersResponse;
}

export namespace ListUsersResponse {
  export type AsObject = {
    nextPageToken: string,
    usersList: Array<buf_registry_owner_v1_user_pb.User.AsObject>,
  }
}

export class CreateUsersRequest extends jspb.Message {
  getValuesList(): Array<CreateUsersRequest.Value>;
  setValuesList(value: Array<CreateUsersRequest.Value>): CreateUsersRequest;
  clearValuesList(): CreateUsersRequest;
  addValues(value?: CreateUsersRequest.Value, index?: number): CreateUsersRequest.Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUsersRequest): CreateUsersRequest.AsObject;
  static serializeBinaryToWriter(message: CreateUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUsersRequest;
  static deserializeBinaryFromReader(message: CreateUsersRequest, reader: jspb.BinaryReader): CreateUsersRequest;
}

export namespace CreateUsersRequest {
  export type AsObject = {
    valuesList: Array<CreateUsersRequest.Value.AsObject>,
  }

  export class Value extends jspb.Message {
    getName(): string;
    setName(value: string): Value;

    getType(): buf_registry_owner_v1_user_pb.UserType;
    setType(value: buf_registry_owner_v1_user_pb.UserType): Value;

    getDescription(): string;
    setDescription(value: string): Value;

    getUrl(): string;
    setUrl(value: string): Value;

    getVerificationStatus(): buf_registry_owner_v1_user_pb.UserVerificationStatus;
    setVerificationStatus(value: buf_registry_owner_v1_user_pb.UserVerificationStatus): Value;

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
      type: buf_registry_owner_v1_user_pb.UserType,
      description: string,
      url: string,
      verificationStatus: buf_registry_owner_v1_user_pb.UserVerificationStatus,
    }
  }

}

export class CreateUsersResponse extends jspb.Message {
  getUsersList(): Array<buf_registry_owner_v1_user_pb.User>;
  setUsersList(value: Array<buf_registry_owner_v1_user_pb.User>): CreateUsersResponse;
  clearUsersList(): CreateUsersResponse;
  addUsers(value?: buf_registry_owner_v1_user_pb.User, index?: number): buf_registry_owner_v1_user_pb.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUsersResponse): CreateUsersResponse.AsObject;
  static serializeBinaryToWriter(message: CreateUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUsersResponse;
  static deserializeBinaryFromReader(message: CreateUsersResponse, reader: jspb.BinaryReader): CreateUsersResponse;
}

export namespace CreateUsersResponse {
  export type AsObject = {
    usersList: Array<buf_registry_owner_v1_user_pb.User.AsObject>,
  }
}

export class UpdateUsersRequest extends jspb.Message {
  getValuesList(): Array<UpdateUsersRequest.Value>;
  setValuesList(value: Array<UpdateUsersRequest.Value>): UpdateUsersRequest;
  clearValuesList(): UpdateUsersRequest;
  addValues(value?: UpdateUsersRequest.Value, index?: number): UpdateUsersRequest.Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUsersRequest): UpdateUsersRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUsersRequest;
  static deserializeBinaryFromReader(message: UpdateUsersRequest, reader: jspb.BinaryReader): UpdateUsersRequest;
}

export namespace UpdateUsersRequest {
  export type AsObject = {
    valuesList: Array<UpdateUsersRequest.Value.AsObject>,
  }

  export class Value extends jspb.Message {
    getUserRef(): buf_registry_owner_v1_user_pb.UserRef | undefined;
    setUserRef(value?: buf_registry_owner_v1_user_pb.UserRef): Value;
    hasUserRef(): boolean;
    clearUserRef(): Value;

    getState(): buf_registry_owner_v1_user_pb.UserState;
    setState(value: buf_registry_owner_v1_user_pb.UserState): Value;
    hasState(): boolean;
    clearState(): Value;

    getDescription(): string;
    setDescription(value: string): Value;
    hasDescription(): boolean;
    clearDescription(): Value;

    getUrl(): string;
    setUrl(value: string): Value;
    hasUrl(): boolean;
    clearUrl(): Value;

    getVerificationStatus(): buf_registry_owner_v1_user_pb.UserVerificationStatus;
    setVerificationStatus(value: buf_registry_owner_v1_user_pb.UserVerificationStatus): Value;
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
      userRef?: buf_registry_owner_v1_user_pb.UserRef.AsObject,
      state?: buf_registry_owner_v1_user_pb.UserState,
      description?: string,
      url?: string,
      verificationStatus?: buf_registry_owner_v1_user_pb.UserVerificationStatus,
    }

    export enum StateCase { 
      _STATE_NOT_SET = 0,
      STATE = 2,
    }

    export enum DescriptionCase { 
      _DESCRIPTION_NOT_SET = 0,
      DESCRIPTION = 3,
    }

    export enum UrlCase { 
      _URL_NOT_SET = 0,
      URL = 4,
    }

    export enum VerificationStatusCase { 
      _VERIFICATION_STATUS_NOT_SET = 0,
      VERIFICATION_STATUS = 5,
    }
  }

}

export class UpdateUsersResponse extends jspb.Message {
  getUsersList(): Array<buf_registry_owner_v1_user_pb.User>;
  setUsersList(value: Array<buf_registry_owner_v1_user_pb.User>): UpdateUsersResponse;
  clearUsersList(): UpdateUsersResponse;
  addUsers(value?: buf_registry_owner_v1_user_pb.User, index?: number): buf_registry_owner_v1_user_pb.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUsersResponse): UpdateUsersResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUsersResponse;
  static deserializeBinaryFromReader(message: UpdateUsersResponse, reader: jspb.BinaryReader): UpdateUsersResponse;
}

export namespace UpdateUsersResponse {
  export type AsObject = {
    usersList: Array<buf_registry_owner_v1_user_pb.User.AsObject>,
  }
}

export class DeleteUsersRequest extends jspb.Message {
  getUserRefsList(): Array<buf_registry_owner_v1_user_pb.UserRef>;
  setUserRefsList(value: Array<buf_registry_owner_v1_user_pb.UserRef>): DeleteUsersRequest;
  clearUserRefsList(): DeleteUsersRequest;
  addUserRefs(value?: buf_registry_owner_v1_user_pb.UserRef, index?: number): buf_registry_owner_v1_user_pb.UserRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteUsersRequest): DeleteUsersRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteUsersRequest;
  static deserializeBinaryFromReader(message: DeleteUsersRequest, reader: jspb.BinaryReader): DeleteUsersRequest;
}

export namespace DeleteUsersRequest {
  export type AsObject = {
    userRefsList: Array<buf_registry_owner_v1_user_pb.UserRef.AsObject>,
  }
}

export class DeleteUsersResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteUsersResponse): DeleteUsersResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteUsersResponse;
  static deserializeBinaryFromReader(message: DeleteUsersResponse, reader: jspb.BinaryReader): DeleteUsersResponse;
}

export namespace DeleteUsersResponse {
  export type AsObject = {
  }
}

