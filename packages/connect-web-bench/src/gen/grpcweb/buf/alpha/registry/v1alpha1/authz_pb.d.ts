import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_role_pb from '../../../../buf/alpha/registry/v1alpha1/role_pb';


export class UserCanCreateOrganizationRepositoryRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UserCanCreateOrganizationRepositoryRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreateOrganizationRepositoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreateOrganizationRepositoryRequest): UserCanCreateOrganizationRepositoryRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanCreateOrganizationRepositoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreateOrganizationRepositoryRequest;
  static deserializeBinaryFromReader(message: UserCanCreateOrganizationRepositoryRequest, reader: jspb.BinaryReader): UserCanCreateOrganizationRepositoryRequest;
}

export namespace UserCanCreateOrganizationRepositoryRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class UserCanCreateOrganizationRepositoryResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanCreateOrganizationRepositoryResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreateOrganizationRepositoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreateOrganizationRepositoryResponse): UserCanCreateOrganizationRepositoryResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanCreateOrganizationRepositoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreateOrganizationRepositoryResponse;
  static deserializeBinaryFromReader(message: UserCanCreateOrganizationRepositoryResponse, reader: jspb.BinaryReader): UserCanCreateOrganizationRepositoryResponse;
}

export namespace UserCanCreateOrganizationRepositoryResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanSeeRepositorySettingsRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): UserCanSeeRepositorySettingsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeeRepositorySettingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeeRepositorySettingsRequest): UserCanSeeRepositorySettingsRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanSeeRepositorySettingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeeRepositorySettingsRequest;
  static deserializeBinaryFromReader(message: UserCanSeeRepositorySettingsRequest, reader: jspb.BinaryReader): UserCanSeeRepositorySettingsRequest;
}

export namespace UserCanSeeRepositorySettingsRequest {
  export type AsObject = {
    repositoryId: string,
  }
}

export class UserCanSeeRepositorySettingsResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanSeeRepositorySettingsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeeRepositorySettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeeRepositorySettingsResponse): UserCanSeeRepositorySettingsResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanSeeRepositorySettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeeRepositorySettingsResponse;
  static deserializeBinaryFromReader(message: UserCanSeeRepositorySettingsResponse, reader: jspb.BinaryReader): UserCanSeeRepositorySettingsResponse;
}

export namespace UserCanSeeRepositorySettingsResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanSeeOrganizationSettingsRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UserCanSeeOrganizationSettingsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeeOrganizationSettingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeeOrganizationSettingsRequest): UserCanSeeOrganizationSettingsRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanSeeOrganizationSettingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeeOrganizationSettingsRequest;
  static deserializeBinaryFromReader(message: UserCanSeeOrganizationSettingsRequest, reader: jspb.BinaryReader): UserCanSeeOrganizationSettingsRequest;
}

export namespace UserCanSeeOrganizationSettingsRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class UserCanSeeOrganizationSettingsResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanSeeOrganizationSettingsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeeOrganizationSettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeeOrganizationSettingsResponse): UserCanSeeOrganizationSettingsResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanSeeOrganizationSettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeeOrganizationSettingsResponse;
  static deserializeBinaryFromReader(message: UserCanSeeOrganizationSettingsResponse, reader: jspb.BinaryReader): UserCanSeeOrganizationSettingsResponse;
}

export namespace UserCanSeeOrganizationSettingsResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanReadPluginRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): UserCanReadPluginRequest;

  getName(): string;
  setName(value: string): UserCanReadPluginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanReadPluginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanReadPluginRequest): UserCanReadPluginRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanReadPluginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanReadPluginRequest;
  static deserializeBinaryFromReader(message: UserCanReadPluginRequest, reader: jspb.BinaryReader): UserCanReadPluginRequest;
}

export namespace UserCanReadPluginRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class UserCanReadPluginResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanReadPluginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanReadPluginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanReadPluginResponse): UserCanReadPluginResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanReadPluginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanReadPluginResponse;
  static deserializeBinaryFromReader(message: UserCanReadPluginResponse, reader: jspb.BinaryReader): UserCanReadPluginResponse;
}

export namespace UserCanReadPluginResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanCreatePluginVersionRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): UserCanCreatePluginVersionRequest;

  getName(): string;
  setName(value: string): UserCanCreatePluginVersionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreatePluginVersionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreatePluginVersionRequest): UserCanCreatePluginVersionRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanCreatePluginVersionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreatePluginVersionRequest;
  static deserializeBinaryFromReader(message: UserCanCreatePluginVersionRequest, reader: jspb.BinaryReader): UserCanCreatePluginVersionRequest;
}

export namespace UserCanCreatePluginVersionRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class UserCanCreatePluginVersionResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanCreatePluginVersionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreatePluginVersionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreatePluginVersionResponse): UserCanCreatePluginVersionResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanCreatePluginVersionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreatePluginVersionResponse;
  static deserializeBinaryFromReader(message: UserCanCreatePluginVersionResponse, reader: jspb.BinaryReader): UserCanCreatePluginVersionResponse;
}

export namespace UserCanCreatePluginVersionResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanCreateTemplateVersionRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): UserCanCreateTemplateVersionRequest;

  getName(): string;
  setName(value: string): UserCanCreateTemplateVersionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreateTemplateVersionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreateTemplateVersionRequest): UserCanCreateTemplateVersionRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanCreateTemplateVersionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreateTemplateVersionRequest;
  static deserializeBinaryFromReader(message: UserCanCreateTemplateVersionRequest, reader: jspb.BinaryReader): UserCanCreateTemplateVersionRequest;
}

export namespace UserCanCreateTemplateVersionRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class UserCanCreateTemplateVersionResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanCreateTemplateVersionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreateTemplateVersionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreateTemplateVersionResponse): UserCanCreateTemplateVersionResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanCreateTemplateVersionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreateTemplateVersionResponse;
  static deserializeBinaryFromReader(message: UserCanCreateTemplateVersionResponse, reader: jspb.BinaryReader): UserCanCreateTemplateVersionResponse;
}

export namespace UserCanCreateTemplateVersionResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanCreateOrganizationPluginRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UserCanCreateOrganizationPluginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreateOrganizationPluginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreateOrganizationPluginRequest): UserCanCreateOrganizationPluginRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanCreateOrganizationPluginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreateOrganizationPluginRequest;
  static deserializeBinaryFromReader(message: UserCanCreateOrganizationPluginRequest, reader: jspb.BinaryReader): UserCanCreateOrganizationPluginRequest;
}

export namespace UserCanCreateOrganizationPluginRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class UserCanCreateOrganizationPluginResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanCreateOrganizationPluginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreateOrganizationPluginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreateOrganizationPluginResponse): UserCanCreateOrganizationPluginResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanCreateOrganizationPluginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreateOrganizationPluginResponse;
  static deserializeBinaryFromReader(message: UserCanCreateOrganizationPluginResponse, reader: jspb.BinaryReader): UserCanCreateOrganizationPluginResponse;
}

export namespace UserCanCreateOrganizationPluginResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanCreateOrganizationTemplateRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UserCanCreateOrganizationTemplateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreateOrganizationTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreateOrganizationTemplateRequest): UserCanCreateOrganizationTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanCreateOrganizationTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreateOrganizationTemplateRequest;
  static deserializeBinaryFromReader(message: UserCanCreateOrganizationTemplateRequest, reader: jspb.BinaryReader): UserCanCreateOrganizationTemplateRequest;
}

export namespace UserCanCreateOrganizationTemplateRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class UserCanCreateOrganizationTemplateResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanCreateOrganizationTemplateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanCreateOrganizationTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanCreateOrganizationTemplateResponse): UserCanCreateOrganizationTemplateResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanCreateOrganizationTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanCreateOrganizationTemplateResponse;
  static deserializeBinaryFromReader(message: UserCanCreateOrganizationTemplateResponse, reader: jspb.BinaryReader): UserCanCreateOrganizationTemplateResponse;
}

export namespace UserCanCreateOrganizationTemplateResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanSeePluginSettingsRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): UserCanSeePluginSettingsRequest;

  getName(): string;
  setName(value: string): UserCanSeePluginSettingsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeePluginSettingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeePluginSettingsRequest): UserCanSeePluginSettingsRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanSeePluginSettingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeePluginSettingsRequest;
  static deserializeBinaryFromReader(message: UserCanSeePluginSettingsRequest, reader: jspb.BinaryReader): UserCanSeePluginSettingsRequest;
}

export namespace UserCanSeePluginSettingsRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class UserCanSeePluginSettingsResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanSeePluginSettingsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeePluginSettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeePluginSettingsResponse): UserCanSeePluginSettingsResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanSeePluginSettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeePluginSettingsResponse;
  static deserializeBinaryFromReader(message: UserCanSeePluginSettingsResponse, reader: jspb.BinaryReader): UserCanSeePluginSettingsResponse;
}

export namespace UserCanSeePluginSettingsResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanSeeTemplateSettingsRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): UserCanSeeTemplateSettingsRequest;

  getName(): string;
  setName(value: string): UserCanSeeTemplateSettingsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeeTemplateSettingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeeTemplateSettingsRequest): UserCanSeeTemplateSettingsRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanSeeTemplateSettingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeeTemplateSettingsRequest;
  static deserializeBinaryFromReader(message: UserCanSeeTemplateSettingsRequest, reader: jspb.BinaryReader): UserCanSeeTemplateSettingsRequest;
}

export namespace UserCanSeeTemplateSettingsRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class UserCanSeeTemplateSettingsResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanSeeTemplateSettingsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeeTemplateSettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeeTemplateSettingsResponse): UserCanSeeTemplateSettingsResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanSeeTemplateSettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeeTemplateSettingsResponse;
  static deserializeBinaryFromReader(message: UserCanSeeTemplateSettingsResponse, reader: jspb.BinaryReader): UserCanSeeTemplateSettingsResponse;
}

export namespace UserCanSeeTemplateSettingsResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanAddOrganizationMemberRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UserCanAddOrganizationMemberRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanAddOrganizationMemberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanAddOrganizationMemberRequest): UserCanAddOrganizationMemberRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanAddOrganizationMemberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanAddOrganizationMemberRequest;
  static deserializeBinaryFromReader(message: UserCanAddOrganizationMemberRequest, reader: jspb.BinaryReader): UserCanAddOrganizationMemberRequest;
}

export namespace UserCanAddOrganizationMemberRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class UserCanAddOrganizationMemberResponse extends jspb.Message {
  getAuthorizedRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>;
  setAuthorizedRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>): UserCanAddOrganizationMemberResponse;
  clearAuthorizedRolesList(): UserCanAddOrganizationMemberResponse;
  addAuthorizedRoles(value: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole, index?: number): UserCanAddOrganizationMemberResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanAddOrganizationMemberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanAddOrganizationMemberResponse): UserCanAddOrganizationMemberResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanAddOrganizationMemberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanAddOrganizationMemberResponse;
  static deserializeBinaryFromReader(message: UserCanAddOrganizationMemberResponse, reader: jspb.BinaryReader): UserCanAddOrganizationMemberResponse;
}

export namespace UserCanAddOrganizationMemberResponse {
  export type AsObject = {
    authorizedRolesList: Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>,
  }
}

export class UserCanUpdateOrganizationMemberRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UserCanUpdateOrganizationMemberRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanUpdateOrganizationMemberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanUpdateOrganizationMemberRequest): UserCanUpdateOrganizationMemberRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanUpdateOrganizationMemberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanUpdateOrganizationMemberRequest;
  static deserializeBinaryFromReader(message: UserCanUpdateOrganizationMemberRequest, reader: jspb.BinaryReader): UserCanUpdateOrganizationMemberRequest;
}

export namespace UserCanUpdateOrganizationMemberRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class UserCanUpdateOrganizationMemberResponse extends jspb.Message {
  getAuthorizedRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>;
  setAuthorizedRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>): UserCanUpdateOrganizationMemberResponse;
  clearAuthorizedRolesList(): UserCanUpdateOrganizationMemberResponse;
  addAuthorizedRoles(value: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole, index?: number): UserCanUpdateOrganizationMemberResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanUpdateOrganizationMemberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanUpdateOrganizationMemberResponse): UserCanUpdateOrganizationMemberResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanUpdateOrganizationMemberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanUpdateOrganizationMemberResponse;
  static deserializeBinaryFromReader(message: UserCanUpdateOrganizationMemberResponse, reader: jspb.BinaryReader): UserCanUpdateOrganizationMemberResponse;
}

export namespace UserCanUpdateOrganizationMemberResponse {
  export type AsObject = {
    authorizedRolesList: Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>,
  }
}

export class UserCanRemoveOrganizationMemberRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UserCanRemoveOrganizationMemberRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanRemoveOrganizationMemberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanRemoveOrganizationMemberRequest): UserCanRemoveOrganizationMemberRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanRemoveOrganizationMemberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanRemoveOrganizationMemberRequest;
  static deserializeBinaryFromReader(message: UserCanRemoveOrganizationMemberRequest, reader: jspb.BinaryReader): UserCanRemoveOrganizationMemberRequest;
}

export namespace UserCanRemoveOrganizationMemberRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class UserCanRemoveOrganizationMemberResponse extends jspb.Message {
  getAuthorizedRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>;
  setAuthorizedRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>): UserCanRemoveOrganizationMemberResponse;
  clearAuthorizedRolesList(): UserCanRemoveOrganizationMemberResponse;
  addAuthorizedRoles(value: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole, index?: number): UserCanRemoveOrganizationMemberResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanRemoveOrganizationMemberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanRemoveOrganizationMemberResponse): UserCanRemoveOrganizationMemberResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanRemoveOrganizationMemberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanRemoveOrganizationMemberResponse;
  static deserializeBinaryFromReader(message: UserCanRemoveOrganizationMemberResponse, reader: jspb.BinaryReader): UserCanRemoveOrganizationMemberResponse;
}

export namespace UserCanRemoveOrganizationMemberResponse {
  export type AsObject = {
    authorizedRolesList: Array<buf_alpha_registry_v1alpha1_role_pb.OrganizationRole>,
  }
}

export class UserCanDeleteOrganizationRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UserCanDeleteOrganizationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeleteOrganizationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeleteOrganizationRequest): UserCanDeleteOrganizationRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanDeleteOrganizationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeleteOrganizationRequest;
  static deserializeBinaryFromReader(message: UserCanDeleteOrganizationRequest, reader: jspb.BinaryReader): UserCanDeleteOrganizationRequest;
}

export namespace UserCanDeleteOrganizationRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class UserCanDeleteOrganizationResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanDeleteOrganizationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeleteOrganizationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeleteOrganizationResponse): UserCanDeleteOrganizationResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanDeleteOrganizationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeleteOrganizationResponse;
  static deserializeBinaryFromReader(message: UserCanDeleteOrganizationResponse, reader: jspb.BinaryReader): UserCanDeleteOrganizationResponse;
}

export namespace UserCanDeleteOrganizationResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanDeleteRepositoryRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): UserCanDeleteRepositoryRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeleteRepositoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeleteRepositoryRequest): UserCanDeleteRepositoryRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanDeleteRepositoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeleteRepositoryRequest;
  static deserializeBinaryFromReader(message: UserCanDeleteRepositoryRequest, reader: jspb.BinaryReader): UserCanDeleteRepositoryRequest;
}

export namespace UserCanDeleteRepositoryRequest {
  export type AsObject = {
    repositoryId: string,
  }
}

export class UserCanDeleteRepositoryResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanDeleteRepositoryResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeleteRepositoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeleteRepositoryResponse): UserCanDeleteRepositoryResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanDeleteRepositoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeleteRepositoryResponse;
  static deserializeBinaryFromReader(message: UserCanDeleteRepositoryResponse, reader: jspb.BinaryReader): UserCanDeleteRepositoryResponse;
}

export namespace UserCanDeleteRepositoryResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanDeleteTemplateRequest extends jspb.Message {
  getTemplateId(): string;
  setTemplateId(value: string): UserCanDeleteTemplateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeleteTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeleteTemplateRequest): UserCanDeleteTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanDeleteTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeleteTemplateRequest;
  static deserializeBinaryFromReader(message: UserCanDeleteTemplateRequest, reader: jspb.BinaryReader): UserCanDeleteTemplateRequest;
}

export namespace UserCanDeleteTemplateRequest {
  export type AsObject = {
    templateId: string,
  }
}

export class UserCanDeleteTemplateResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanDeleteTemplateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeleteTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeleteTemplateResponse): UserCanDeleteTemplateResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanDeleteTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeleteTemplateResponse;
  static deserializeBinaryFromReader(message: UserCanDeleteTemplateResponse, reader: jspb.BinaryReader): UserCanDeleteTemplateResponse;
}

export namespace UserCanDeleteTemplateResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanDeletePluginRequest extends jspb.Message {
  getPluginId(): string;
  setPluginId(value: string): UserCanDeletePluginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeletePluginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeletePluginRequest): UserCanDeletePluginRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanDeletePluginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeletePluginRequest;
  static deserializeBinaryFromReader(message: UserCanDeletePluginRequest, reader: jspb.BinaryReader): UserCanDeletePluginRequest;
}

export namespace UserCanDeletePluginRequest {
  export type AsObject = {
    pluginId: string,
  }
}

export class UserCanDeletePluginResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanDeletePluginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeletePluginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeletePluginResponse): UserCanDeletePluginResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanDeletePluginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeletePluginResponse;
  static deserializeBinaryFromReader(message: UserCanDeletePluginResponse, reader: jspb.BinaryReader): UserCanDeletePluginResponse;
}

export namespace UserCanDeletePluginResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanDeleteUserRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeleteUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeleteUserRequest): UserCanDeleteUserRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanDeleteUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeleteUserRequest;
  static deserializeBinaryFromReader(message: UserCanDeleteUserRequest, reader: jspb.BinaryReader): UserCanDeleteUserRequest;
}

export namespace UserCanDeleteUserRequest {
  export type AsObject = {
  }
}

export class UserCanDeleteUserResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanDeleteUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanDeleteUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanDeleteUserResponse): UserCanDeleteUserResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanDeleteUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanDeleteUserResponse;
  static deserializeBinaryFromReader(message: UserCanDeleteUserResponse, reader: jspb.BinaryReader): UserCanDeleteUserResponse;
}

export namespace UserCanDeleteUserResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanSeeServerAdminPanelRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeeServerAdminPanelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeeServerAdminPanelRequest): UserCanSeeServerAdminPanelRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanSeeServerAdminPanelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeeServerAdminPanelRequest;
  static deserializeBinaryFromReader(message: UserCanSeeServerAdminPanelRequest, reader: jspb.BinaryReader): UserCanSeeServerAdminPanelRequest;
}

export namespace UserCanSeeServerAdminPanelRequest {
  export type AsObject = {
  }
}

export class UserCanSeeServerAdminPanelResponse extends jspb.Message {
  getAuthorized(): boolean;
  setAuthorized(value: boolean): UserCanSeeServerAdminPanelResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanSeeServerAdminPanelResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanSeeServerAdminPanelResponse): UserCanSeeServerAdminPanelResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanSeeServerAdminPanelResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanSeeServerAdminPanelResponse;
  static deserializeBinaryFromReader(message: UserCanSeeServerAdminPanelResponse, reader: jspb.BinaryReader): UserCanSeeServerAdminPanelResponse;
}

export namespace UserCanSeeServerAdminPanelResponse {
  export type AsObject = {
    authorized: boolean,
  }
}

export class UserCanManageRepositoryContributorsRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): UserCanManageRepositoryContributorsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanManageRepositoryContributorsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanManageRepositoryContributorsRequest): UserCanManageRepositoryContributorsRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanManageRepositoryContributorsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanManageRepositoryContributorsRequest;
  static deserializeBinaryFromReader(message: UserCanManageRepositoryContributorsRequest, reader: jspb.BinaryReader): UserCanManageRepositoryContributorsRequest;
}

export namespace UserCanManageRepositoryContributorsRequest {
  export type AsObject = {
    repositoryId: string,
  }
}

export class UserCanManageRepositoryContributorsResponse extends jspb.Message {
  getAuthorizedRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>;
  setAuthorizedRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>): UserCanManageRepositoryContributorsResponse;
  clearAuthorizedRolesList(): UserCanManageRepositoryContributorsResponse;
  addAuthorizedRoles(value: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole, index?: number): UserCanManageRepositoryContributorsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanManageRepositoryContributorsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanManageRepositoryContributorsResponse): UserCanManageRepositoryContributorsResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanManageRepositoryContributorsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanManageRepositoryContributorsResponse;
  static deserializeBinaryFromReader(message: UserCanManageRepositoryContributorsResponse, reader: jspb.BinaryReader): UserCanManageRepositoryContributorsResponse;
}

export namespace UserCanManageRepositoryContributorsResponse {
  export type AsObject = {
    authorizedRolesList: Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>,
  }
}

export class UserCanManagePluginContributorsRequest extends jspb.Message {
  getPluginId(): string;
  setPluginId(value: string): UserCanManagePluginContributorsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanManagePluginContributorsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanManagePluginContributorsRequest): UserCanManagePluginContributorsRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanManagePluginContributorsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanManagePluginContributorsRequest;
  static deserializeBinaryFromReader(message: UserCanManagePluginContributorsRequest, reader: jspb.BinaryReader): UserCanManagePluginContributorsRequest;
}

export namespace UserCanManagePluginContributorsRequest {
  export type AsObject = {
    pluginId: string,
  }
}

export class UserCanManagePluginContributorsResponse extends jspb.Message {
  getAuthorizedRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>;
  setAuthorizedRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>): UserCanManagePluginContributorsResponse;
  clearAuthorizedRolesList(): UserCanManagePluginContributorsResponse;
  addAuthorizedRoles(value: buf_alpha_registry_v1alpha1_role_pb.PluginRole, index?: number): UserCanManagePluginContributorsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanManagePluginContributorsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanManagePluginContributorsResponse): UserCanManagePluginContributorsResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanManagePluginContributorsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanManagePluginContributorsResponse;
  static deserializeBinaryFromReader(message: UserCanManagePluginContributorsResponse, reader: jspb.BinaryReader): UserCanManagePluginContributorsResponse;
}

export namespace UserCanManagePluginContributorsResponse {
  export type AsObject = {
    authorizedRolesList: Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>,
  }
}

export class UserCanManageTemplateContributorsRequest extends jspb.Message {
  getTemplateId(): string;
  setTemplateId(value: string): UserCanManageTemplateContributorsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanManageTemplateContributorsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanManageTemplateContributorsRequest): UserCanManageTemplateContributorsRequest.AsObject;
  static serializeBinaryToWriter(message: UserCanManageTemplateContributorsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanManageTemplateContributorsRequest;
  static deserializeBinaryFromReader(message: UserCanManageTemplateContributorsRequest, reader: jspb.BinaryReader): UserCanManageTemplateContributorsRequest;
}

export namespace UserCanManageTemplateContributorsRequest {
  export type AsObject = {
    templateId: string,
  }
}

export class UserCanManageTemplateContributorsResponse extends jspb.Message {
  getAuthorizedRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>;
  setAuthorizedRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>): UserCanManageTemplateContributorsResponse;
  clearAuthorizedRolesList(): UserCanManageTemplateContributorsResponse;
  addAuthorizedRoles(value: buf_alpha_registry_v1alpha1_role_pb.TemplateRole, index?: number): UserCanManageTemplateContributorsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCanManageTemplateContributorsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCanManageTemplateContributorsResponse): UserCanManageTemplateContributorsResponse.AsObject;
  static serializeBinaryToWriter(message: UserCanManageTemplateContributorsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCanManageTemplateContributorsResponse;
  static deserializeBinaryFromReader(message: UserCanManageTemplateContributorsResponse, reader: jspb.BinaryReader): UserCanManageTemplateContributorsResponse;
}

export namespace UserCanManageTemplateContributorsResponse {
  export type AsObject = {
    authorizedRolesList: Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>,
  }
}

