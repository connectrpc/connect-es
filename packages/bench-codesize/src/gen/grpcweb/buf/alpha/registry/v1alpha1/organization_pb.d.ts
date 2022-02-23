import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_role_pb from '../../../../buf/alpha/registry/v1alpha1/role_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Organization.AsObject;
  static toObject(includeInstance: boolean, msg: Organization): Organization.AsObject;
  static serializeBinaryToWriter(message: Organization, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Organization;
  static deserializeBinaryFromReader(message: Organization, reader: jspb.BinaryReader): Organization;
}

export namespace Organization {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
  }
}

export class OrganizationMembership extends jspb.Message {
  getOrganization(): Organization | undefined;
  setOrganization(value?: Organization): OrganizationMembership;
  hasOrganization(): boolean;
  clearOrganization(): OrganizationMembership;

  getOrganizationRole(): buf_alpha_registry_v1alpha1_role_pb.OrganizationRole;
  setOrganizationRole(value: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole): OrganizationMembership;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrganizationMembership.AsObject;
  static toObject(includeInstance: boolean, msg: OrganizationMembership): OrganizationMembership.AsObject;
  static serializeBinaryToWriter(message: OrganizationMembership, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrganizationMembership;
  static deserializeBinaryFromReader(message: OrganizationMembership, reader: jspb.BinaryReader): OrganizationMembership;
}

export namespace OrganizationMembership {
  export type AsObject = {
    organization?: Organization.AsObject,
    organizationRole: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole,
  }
}

export class GetOrganizationRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetOrganizationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrganizationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOrganizationRequest): GetOrganizationRequest.AsObject;
  static serializeBinaryToWriter(message: GetOrganizationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOrganizationRequest;
  static deserializeBinaryFromReader(message: GetOrganizationRequest, reader: jspb.BinaryReader): GetOrganizationRequest;
}

export namespace GetOrganizationRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetOrganizationResponse extends jspb.Message {
  getOrganization(): Organization | undefined;
  setOrganization(value?: Organization): GetOrganizationResponse;
  hasOrganization(): boolean;
  clearOrganization(): GetOrganizationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrganizationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOrganizationResponse): GetOrganizationResponse.AsObject;
  static serializeBinaryToWriter(message: GetOrganizationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOrganizationResponse;
  static deserializeBinaryFromReader(message: GetOrganizationResponse, reader: jspb.BinaryReader): GetOrganizationResponse;
}

export namespace GetOrganizationResponse {
  export type AsObject = {
    organization?: Organization.AsObject,
  }
}

export class GetOrganizationByNameRequest extends jspb.Message {
  getName(): string;
  setName(value: string): GetOrganizationByNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrganizationByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOrganizationByNameRequest): GetOrganizationByNameRequest.AsObject;
  static serializeBinaryToWriter(message: GetOrganizationByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOrganizationByNameRequest;
  static deserializeBinaryFromReader(message: GetOrganizationByNameRequest, reader: jspb.BinaryReader): GetOrganizationByNameRequest;
}

export namespace GetOrganizationByNameRequest {
  export type AsObject = {
    name: string,
  }
}

export class GetOrganizationByNameResponse extends jspb.Message {
  getOrganization(): Organization | undefined;
  setOrganization(value?: Organization): GetOrganizationByNameResponse;
  hasOrganization(): boolean;
  clearOrganization(): GetOrganizationByNameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrganizationByNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOrganizationByNameResponse): GetOrganizationByNameResponse.AsObject;
  static serializeBinaryToWriter(message: GetOrganizationByNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOrganizationByNameResponse;
  static deserializeBinaryFromReader(message: GetOrganizationByNameResponse, reader: jspb.BinaryReader): GetOrganizationByNameResponse;
}

export namespace GetOrganizationByNameResponse {
  export type AsObject = {
    organization?: Organization.AsObject,
  }
}

export class ListOrganizationsRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListOrganizationsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListOrganizationsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListOrganizationsRequest;

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
    reverse: boolean,
  }
}

export class ListOrganizationsResponse extends jspb.Message {
  getOrganizationsList(): Array<Organization>;
  setOrganizationsList(value: Array<Organization>): ListOrganizationsResponse;
  clearOrganizationsList(): ListOrganizationsResponse;
  addOrganizations(value?: Organization, index?: number): Organization;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListOrganizationsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationsResponse): ListOrganizationsResponse.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationsResponse;
  static deserializeBinaryFromReader(message: ListOrganizationsResponse, reader: jspb.BinaryReader): ListOrganizationsResponse;
}

export namespace ListOrganizationsResponse {
  export type AsObject = {
    organizationsList: Array<Organization.AsObject>,
    nextPageToken: string,
  }
}

export class ListUserOrganizationsRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): ListUserOrganizationsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListUserOrganizationsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListUserOrganizationsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListUserOrganizationsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUserOrganizationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListUserOrganizationsRequest): ListUserOrganizationsRequest.AsObject;
  static serializeBinaryToWriter(message: ListUserOrganizationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUserOrganizationsRequest;
  static deserializeBinaryFromReader(message: ListUserOrganizationsRequest, reader: jspb.BinaryReader): ListUserOrganizationsRequest;
}

export namespace ListUserOrganizationsRequest {
  export type AsObject = {
    userId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListUserOrganizationsResponse extends jspb.Message {
  getOrganizationsList(): Array<OrganizationMembership>;
  setOrganizationsList(value: Array<OrganizationMembership>): ListUserOrganizationsResponse;
  clearOrganizationsList(): ListUserOrganizationsResponse;
  addOrganizations(value?: OrganizationMembership, index?: number): OrganizationMembership;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListUserOrganizationsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUserOrganizationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListUserOrganizationsResponse): ListUserOrganizationsResponse.AsObject;
  static serializeBinaryToWriter(message: ListUserOrganizationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUserOrganizationsResponse;
  static deserializeBinaryFromReader(message: ListUserOrganizationsResponse, reader: jspb.BinaryReader): ListUserOrganizationsResponse;
}

export namespace ListUserOrganizationsResponse {
  export type AsObject = {
    organizationsList: Array<OrganizationMembership.AsObject>,
    nextPageToken: string,
  }
}

export class CreateOrganizationRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateOrganizationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrganizationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrganizationRequest): CreateOrganizationRequest.AsObject;
  static serializeBinaryToWriter(message: CreateOrganizationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrganizationRequest;
  static deserializeBinaryFromReader(message: CreateOrganizationRequest, reader: jspb.BinaryReader): CreateOrganizationRequest;
}

export namespace CreateOrganizationRequest {
  export type AsObject = {
    name: string,
  }
}

export class CreateOrganizationResponse extends jspb.Message {
  getOrganization(): Organization | undefined;
  setOrganization(value?: Organization): CreateOrganizationResponse;
  hasOrganization(): boolean;
  clearOrganization(): CreateOrganizationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrganizationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateOrganizationResponse): CreateOrganizationResponse.AsObject;
  static serializeBinaryToWriter(message: CreateOrganizationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrganizationResponse;
  static deserializeBinaryFromReader(message: CreateOrganizationResponse, reader: jspb.BinaryReader): CreateOrganizationResponse;
}

export namespace CreateOrganizationResponse {
  export type AsObject = {
    organization?: Organization.AsObject,
  }
}

export class DeleteOrganizationRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteOrganizationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOrganizationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOrganizationRequest): DeleteOrganizationRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteOrganizationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOrganizationRequest;
  static deserializeBinaryFromReader(message: DeleteOrganizationRequest, reader: jspb.BinaryReader): DeleteOrganizationRequest;
}

export namespace DeleteOrganizationRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteOrganizationResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOrganizationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOrganizationResponse): DeleteOrganizationResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteOrganizationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOrganizationResponse;
  static deserializeBinaryFromReader(message: DeleteOrganizationResponse, reader: jspb.BinaryReader): DeleteOrganizationResponse;
}

export namespace DeleteOrganizationResponse {
  export type AsObject = {
  }
}

export class DeleteOrganizationByNameRequest extends jspb.Message {
  getName(): string;
  setName(value: string): DeleteOrganizationByNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOrganizationByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOrganizationByNameRequest): DeleteOrganizationByNameRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteOrganizationByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOrganizationByNameRequest;
  static deserializeBinaryFromReader(message: DeleteOrganizationByNameRequest, reader: jspb.BinaryReader): DeleteOrganizationByNameRequest;
}

export namespace DeleteOrganizationByNameRequest {
  export type AsObject = {
    name: string,
  }
}

export class DeleteOrganizationByNameResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOrganizationByNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOrganizationByNameResponse): DeleteOrganizationByNameResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteOrganizationByNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOrganizationByNameResponse;
  static deserializeBinaryFromReader(message: DeleteOrganizationByNameResponse, reader: jspb.BinaryReader): DeleteOrganizationByNameResponse;
}

export namespace DeleteOrganizationByNameResponse {
  export type AsObject = {
  }
}

export class AddOrganizationMemberRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): AddOrganizationMemberRequest;

  getUserId(): string;
  setUserId(value: string): AddOrganizationMemberRequest;

  getOrganizationRole(): buf_alpha_registry_v1alpha1_role_pb.OrganizationRole;
  setOrganizationRole(value: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole): AddOrganizationMemberRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddOrganizationMemberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddOrganizationMemberRequest): AddOrganizationMemberRequest.AsObject;
  static serializeBinaryToWriter(message: AddOrganizationMemberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddOrganizationMemberRequest;
  static deserializeBinaryFromReader(message: AddOrganizationMemberRequest, reader: jspb.BinaryReader): AddOrganizationMemberRequest;
}

export namespace AddOrganizationMemberRequest {
  export type AsObject = {
    organizationId: string,
    userId: string,
    organizationRole: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole,
  }
}

export class AddOrganizationMemberResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddOrganizationMemberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddOrganizationMemberResponse): AddOrganizationMemberResponse.AsObject;
  static serializeBinaryToWriter(message: AddOrganizationMemberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddOrganizationMemberResponse;
  static deserializeBinaryFromReader(message: AddOrganizationMemberResponse, reader: jspb.BinaryReader): AddOrganizationMemberResponse;
}

export namespace AddOrganizationMemberResponse {
  export type AsObject = {
  }
}

export class UpdateOrganizationMemberRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UpdateOrganizationMemberRequest;

  getUserId(): string;
  setUserId(value: string): UpdateOrganizationMemberRequest;

  getOrganizationRole(): buf_alpha_registry_v1alpha1_role_pb.OrganizationRole;
  setOrganizationRole(value: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole): UpdateOrganizationMemberRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOrganizationMemberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOrganizationMemberRequest): UpdateOrganizationMemberRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateOrganizationMemberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOrganizationMemberRequest;
  static deserializeBinaryFromReader(message: UpdateOrganizationMemberRequest, reader: jspb.BinaryReader): UpdateOrganizationMemberRequest;
}

export namespace UpdateOrganizationMemberRequest {
  export type AsObject = {
    organizationId: string,
    userId: string,
    organizationRole: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole,
  }
}

export class UpdateOrganizationMemberResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOrganizationMemberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOrganizationMemberResponse): UpdateOrganizationMemberResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateOrganizationMemberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOrganizationMemberResponse;
  static deserializeBinaryFromReader(message: UpdateOrganizationMemberResponse, reader: jspb.BinaryReader): UpdateOrganizationMemberResponse;
}

export namespace UpdateOrganizationMemberResponse {
  export type AsObject = {
  }
}

export class RemoveOrganizationMemberRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): RemoveOrganizationMemberRequest;

  getUserId(): string;
  setUserId(value: string): RemoveOrganizationMemberRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveOrganizationMemberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveOrganizationMemberRequest): RemoveOrganizationMemberRequest.AsObject;
  static serializeBinaryToWriter(message: RemoveOrganizationMemberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveOrganizationMemberRequest;
  static deserializeBinaryFromReader(message: RemoveOrganizationMemberRequest, reader: jspb.BinaryReader): RemoveOrganizationMemberRequest;
}

export namespace RemoveOrganizationMemberRequest {
  export type AsObject = {
    organizationId: string,
    userId: string,
  }
}

export class RemoveOrganizationMemberResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveOrganizationMemberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveOrganizationMemberResponse): RemoveOrganizationMemberResponse.AsObject;
  static serializeBinaryToWriter(message: RemoveOrganizationMemberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveOrganizationMemberResponse;
  static deserializeBinaryFromReader(message: RemoveOrganizationMemberResponse, reader: jspb.BinaryReader): RemoveOrganizationMemberResponse;
}

export namespace RemoveOrganizationMemberResponse {
  export type AsObject = {
  }
}

export class SetOrganizationMemberRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): SetOrganizationMemberRequest;

  getUserId(): string;
  setUserId(value: string): SetOrganizationMemberRequest;

  getOrganizationRole(): buf_alpha_registry_v1alpha1_role_pb.OrganizationRole;
  setOrganizationRole(value: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole): SetOrganizationMemberRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrganizationMemberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrganizationMemberRequest): SetOrganizationMemberRequest.AsObject;
  static serializeBinaryToWriter(message: SetOrganizationMemberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrganizationMemberRequest;
  static deserializeBinaryFromReader(message: SetOrganizationMemberRequest, reader: jspb.BinaryReader): SetOrganizationMemberRequest;
}

export namespace SetOrganizationMemberRequest {
  export type AsObject = {
    organizationId: string,
    userId: string,
    organizationRole: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole,
  }
}

export class SetOrganizationMemberResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrganizationMemberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrganizationMemberResponse): SetOrganizationMemberResponse.AsObject;
  static serializeBinaryToWriter(message: SetOrganizationMemberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrganizationMemberResponse;
  static deserializeBinaryFromReader(message: SetOrganizationMemberResponse, reader: jspb.BinaryReader): SetOrganizationMemberResponse;
}

export namespace SetOrganizationMemberResponse {
  export type AsObject = {
  }
}

export class GetOrganizationSettingsRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): GetOrganizationSettingsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrganizationSettingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOrganizationSettingsRequest): GetOrganizationSettingsRequest.AsObject;
  static serializeBinaryToWriter(message: GetOrganizationSettingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOrganizationSettingsRequest;
  static deserializeBinaryFromReader(message: GetOrganizationSettingsRequest, reader: jspb.BinaryReader): GetOrganizationSettingsRequest;
}

export namespace GetOrganizationSettingsRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class GetOrganizationSettingsResponse extends jspb.Message {
  getRepositoryBaseRole(): buf_alpha_registry_v1alpha1_role_pb.RepositoryRole;
  setRepositoryBaseRole(value: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole): GetOrganizationSettingsResponse;

  getPluginBaseRole(): buf_alpha_registry_v1alpha1_role_pb.PluginRole;
  setPluginBaseRole(value: buf_alpha_registry_v1alpha1_role_pb.PluginRole): GetOrganizationSettingsResponse;

  getTemplateBaseRole(): buf_alpha_registry_v1alpha1_role_pb.TemplateRole;
  setTemplateBaseRole(value: buf_alpha_registry_v1alpha1_role_pb.TemplateRole): GetOrganizationSettingsResponse;

  getMembersCount(): number;
  setMembersCount(value: number): GetOrganizationSettingsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrganizationSettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOrganizationSettingsResponse): GetOrganizationSettingsResponse.AsObject;
  static serializeBinaryToWriter(message: GetOrganizationSettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOrganizationSettingsResponse;
  static deserializeBinaryFromReader(message: GetOrganizationSettingsResponse, reader: jspb.BinaryReader): GetOrganizationSettingsResponse;
}

export namespace GetOrganizationSettingsResponse {
  export type AsObject = {
    repositoryBaseRole: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole,
    pluginBaseRole: buf_alpha_registry_v1alpha1_role_pb.PluginRole,
    templateBaseRole: buf_alpha_registry_v1alpha1_role_pb.TemplateRole,
    membersCount: number,
  }
}

export class UpdateOrganizationSettingsRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): UpdateOrganizationSettingsRequest;

  getRepositoryBaseRole(): buf_alpha_registry_v1alpha1_role_pb.RepositoryRole;
  setRepositoryBaseRole(value: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole): UpdateOrganizationSettingsRequest;

  getPluginBaseRole(): buf_alpha_registry_v1alpha1_role_pb.PluginRole;
  setPluginBaseRole(value: buf_alpha_registry_v1alpha1_role_pb.PluginRole): UpdateOrganizationSettingsRequest;

  getTemplateBaseRole(): buf_alpha_registry_v1alpha1_role_pb.TemplateRole;
  setTemplateBaseRole(value: buf_alpha_registry_v1alpha1_role_pb.TemplateRole): UpdateOrganizationSettingsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOrganizationSettingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOrganizationSettingsRequest): UpdateOrganizationSettingsRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateOrganizationSettingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOrganizationSettingsRequest;
  static deserializeBinaryFromReader(message: UpdateOrganizationSettingsRequest, reader: jspb.BinaryReader): UpdateOrganizationSettingsRequest;
}

export namespace UpdateOrganizationSettingsRequest {
  export type AsObject = {
    organizationId: string,
    repositoryBaseRole: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole,
    pluginBaseRole: buf_alpha_registry_v1alpha1_role_pb.PluginRole,
    templateBaseRole: buf_alpha_registry_v1alpha1_role_pb.TemplateRole,
  }
}

export class UpdateOrganizationSettingsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOrganizationSettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOrganizationSettingsResponse): UpdateOrganizationSettingsResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateOrganizationSettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOrganizationSettingsResponse;
  static deserializeBinaryFromReader(message: UpdateOrganizationSettingsResponse, reader: jspb.BinaryReader): UpdateOrganizationSettingsResponse;
}

export namespace UpdateOrganizationSettingsResponse {
  export type AsObject = {
  }
}

