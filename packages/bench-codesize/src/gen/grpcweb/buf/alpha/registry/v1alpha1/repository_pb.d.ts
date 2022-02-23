import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_role_pb from '../../../../buf/alpha/registry/v1alpha1/role_pb';
import * as buf_alpha_registry_v1alpha1_user_pb from '../../../../buf/alpha/registry/v1alpha1/user_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class Repository extends jspb.Message {
  getId(): string;
  setId(value: string): Repository;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Repository;
  hasCreateTime(): boolean;
  clearCreateTime(): Repository;

  getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): Repository;
  hasUpdateTime(): boolean;
  clearUpdateTime(): Repository;

  getName(): string;
  setName(value: string): Repository;

  getUserId(): string;
  setUserId(value: string): Repository;

  getOrganizationId(): string;
  setOrganizationId(value: string): Repository;

  getVisibility(): Visibility;
  setVisibility(value: Visibility): Repository;

  getDeprecated(): boolean;
  setDeprecated(value: boolean): Repository;

  getDeprecationMessage(): string;
  setDeprecationMessage(value: string): Repository;

  getOwnerCase(): Repository.OwnerCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Repository.AsObject;
  static toObject(includeInstance: boolean, msg: Repository): Repository.AsObject;
  static serializeBinaryToWriter(message: Repository, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Repository;
  static deserializeBinaryFromReader(message: Repository, reader: jspb.BinaryReader): Repository;
}

export namespace Repository {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
    userId: string,
    organizationId: string,
    visibility: Visibility,
    deprecated: boolean,
    deprecationMessage: string,
  }

  export enum OwnerCase { 
    OWNER_NOT_SET = 0,
    USER_ID = 5,
    ORGANIZATION_ID = 6,
  }
}

export class RepositoryContributor extends jspb.Message {
  getUser(): buf_alpha_registry_v1alpha1_user_pb.User | undefined;
  setUser(value?: buf_alpha_registry_v1alpha1_user_pb.User): RepositoryContributor;
  hasUser(): boolean;
  clearUser(): RepositoryContributor;

  getRepositoryId(): string;
  setRepositoryId(value: string): RepositoryContributor;

  getExplicitRole(): buf_alpha_registry_v1alpha1_role_pb.RepositoryRole;
  setExplicitRole(value: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole): RepositoryContributor;

  getImplicitRole(): buf_alpha_registry_v1alpha1_role_pb.RepositoryRole;
  setImplicitRole(value: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole): RepositoryContributor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepositoryContributor.AsObject;
  static toObject(includeInstance: boolean, msg: RepositoryContributor): RepositoryContributor.AsObject;
  static serializeBinaryToWriter(message: RepositoryContributor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepositoryContributor;
  static deserializeBinaryFromReader(message: RepositoryContributor, reader: jspb.BinaryReader): RepositoryContributor;
}

export namespace RepositoryContributor {
  export type AsObject = {
    user?: buf_alpha_registry_v1alpha1_user_pb.User.AsObject,
    repositoryId: string,
    explicitRole: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole,
    implicitRole: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole,
  }
}

export class GetRepositoriesByFullNameRequest extends jspb.Message {
  getFullNamesList(): Array<string>;
  setFullNamesList(value: Array<string>): GetRepositoriesByFullNameRequest;
  clearFullNamesList(): GetRepositoriesByFullNameRequest;
  addFullNames(value: string, index?: number): GetRepositoriesByFullNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoriesByFullNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoriesByFullNameRequest): GetRepositoriesByFullNameRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositoriesByFullNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoriesByFullNameRequest;
  static deserializeBinaryFromReader(message: GetRepositoriesByFullNameRequest, reader: jspb.BinaryReader): GetRepositoriesByFullNameRequest;
}

export namespace GetRepositoriesByFullNameRequest {
  export type AsObject = {
    fullNamesList: Array<string>,
  }
}

export class GetRepositoriesByFullNameResponse extends jspb.Message {
  getRepositoriesList(): Array<Repository>;
  setRepositoriesList(value: Array<Repository>): GetRepositoriesByFullNameResponse;
  clearRepositoriesList(): GetRepositoriesByFullNameResponse;
  addRepositories(value?: Repository, index?: number): Repository;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoriesByFullNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoriesByFullNameResponse): GetRepositoriesByFullNameResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositoriesByFullNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoriesByFullNameResponse;
  static deserializeBinaryFromReader(message: GetRepositoriesByFullNameResponse, reader: jspb.BinaryReader): GetRepositoriesByFullNameResponse;
}

export namespace GetRepositoriesByFullNameResponse {
  export type AsObject = {
    repositoriesList: Array<Repository.AsObject>,
  }
}

export class GetRepositoryRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetRepositoryRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryRequest): GetRepositoryRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryRequest;
  static deserializeBinaryFromReader(message: GetRepositoryRequest, reader: jspb.BinaryReader): GetRepositoryRequest;
}

export namespace GetRepositoryRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetRepositoryResponse extends jspb.Message {
  getRepository(): Repository | undefined;
  setRepository(value?: Repository): GetRepositoryResponse;
  hasRepository(): boolean;
  clearRepository(): GetRepositoryResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryResponse): GetRepositoryResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryResponse;
  static deserializeBinaryFromReader(message: GetRepositoryResponse, reader: jspb.BinaryReader): GetRepositoryResponse;
}

export namespace GetRepositoryResponse {
  export type AsObject = {
    repository?: Repository.AsObject,
  }
}

export class GetRepositoryByFullNameRequest extends jspb.Message {
  getFullName(): string;
  setFullName(value: string): GetRepositoryByFullNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryByFullNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryByFullNameRequest): GetRepositoryByFullNameRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryByFullNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryByFullNameRequest;
  static deserializeBinaryFromReader(message: GetRepositoryByFullNameRequest, reader: jspb.BinaryReader): GetRepositoryByFullNameRequest;
}

export namespace GetRepositoryByFullNameRequest {
  export type AsObject = {
    fullName: string,
  }
}

export class GetRepositoryByFullNameResponse extends jspb.Message {
  getRepository(): Repository | undefined;
  setRepository(value?: Repository): GetRepositoryByFullNameResponse;
  hasRepository(): boolean;
  clearRepository(): GetRepositoryByFullNameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryByFullNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryByFullNameResponse): GetRepositoryByFullNameResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryByFullNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryByFullNameResponse;
  static deserializeBinaryFromReader(message: GetRepositoryByFullNameResponse, reader: jspb.BinaryReader): GetRepositoryByFullNameResponse;
}

export namespace GetRepositoryByFullNameResponse {
  export type AsObject = {
    repository?: Repository.AsObject,
  }
}

export class ListRepositoriesRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListRepositoriesRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoriesRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoriesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoriesRequest): ListRepositoriesRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoriesRequest;
  static deserializeBinaryFromReader(message: ListRepositoriesRequest, reader: jspb.BinaryReader): ListRepositoriesRequest;
}

export namespace ListRepositoriesRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoriesResponse extends jspb.Message {
  getRepositoriesList(): Array<Repository>;
  setRepositoriesList(value: Array<Repository>): ListRepositoriesResponse;
  clearRepositoriesList(): ListRepositoriesResponse;
  addRepositories(value?: Repository, index?: number): Repository;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoriesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoriesResponse): ListRepositoriesResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoriesResponse;
  static deserializeBinaryFromReader(message: ListRepositoriesResponse, reader: jspb.BinaryReader): ListRepositoriesResponse;
}

export namespace ListRepositoriesResponse {
  export type AsObject = {
    repositoriesList: Array<Repository.AsObject>,
    nextPageToken: string,
  }
}

export class ListUserRepositoriesRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): ListUserRepositoriesRequest;

  getPageSize(): number;
  setPageSize(value: number): ListUserRepositoriesRequest;

  getPageToken(): string;
  setPageToken(value: string): ListUserRepositoriesRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListUserRepositoriesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUserRepositoriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListUserRepositoriesRequest): ListUserRepositoriesRequest.AsObject;
  static serializeBinaryToWriter(message: ListUserRepositoriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUserRepositoriesRequest;
  static deserializeBinaryFromReader(message: ListUserRepositoriesRequest, reader: jspb.BinaryReader): ListUserRepositoriesRequest;
}

export namespace ListUserRepositoriesRequest {
  export type AsObject = {
    userId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListUserRepositoriesResponse extends jspb.Message {
  getRepositoriesList(): Array<Repository>;
  setRepositoriesList(value: Array<Repository>): ListUserRepositoriesResponse;
  clearRepositoriesList(): ListUserRepositoriesResponse;
  addRepositories(value?: Repository, index?: number): Repository;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListUserRepositoriesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUserRepositoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListUserRepositoriesResponse): ListUserRepositoriesResponse.AsObject;
  static serializeBinaryToWriter(message: ListUserRepositoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUserRepositoriesResponse;
  static deserializeBinaryFromReader(message: ListUserRepositoriesResponse, reader: jspb.BinaryReader): ListUserRepositoriesResponse;
}

export namespace ListUserRepositoriesResponse {
  export type AsObject = {
    repositoriesList: Array<Repository.AsObject>,
    nextPageToken: string,
  }
}

export class ListRepositoriesUserCanAccessRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListRepositoriesUserCanAccessRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoriesUserCanAccessRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoriesUserCanAccessRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoriesUserCanAccessRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoriesUserCanAccessRequest): ListRepositoriesUserCanAccessRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoriesUserCanAccessRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoriesUserCanAccessRequest;
  static deserializeBinaryFromReader(message: ListRepositoriesUserCanAccessRequest, reader: jspb.BinaryReader): ListRepositoriesUserCanAccessRequest;
}

export namespace ListRepositoriesUserCanAccessRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoriesUserCanAccessResponse extends jspb.Message {
  getRepositoriesList(): Array<Repository>;
  setRepositoriesList(value: Array<Repository>): ListRepositoriesUserCanAccessResponse;
  clearRepositoriesList(): ListRepositoriesUserCanAccessResponse;
  addRepositories(value?: Repository, index?: number): Repository;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoriesUserCanAccessResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoriesUserCanAccessResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoriesUserCanAccessResponse): ListRepositoriesUserCanAccessResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoriesUserCanAccessResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoriesUserCanAccessResponse;
  static deserializeBinaryFromReader(message: ListRepositoriesUserCanAccessResponse, reader: jspb.BinaryReader): ListRepositoriesUserCanAccessResponse;
}

export namespace ListRepositoriesUserCanAccessResponse {
  export type AsObject = {
    repositoriesList: Array<Repository.AsObject>,
    nextPageToken: string,
  }
}

export class ListOrganizationRepositoriesRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): ListOrganizationRepositoriesRequest;

  getPageSize(): number;
  setPageSize(value: number): ListOrganizationRepositoriesRequest;

  getPageToken(): string;
  setPageToken(value: string): ListOrganizationRepositoriesRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListOrganizationRepositoriesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationRepositoriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationRepositoriesRequest): ListOrganizationRepositoriesRequest.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationRepositoriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationRepositoriesRequest;
  static deserializeBinaryFromReader(message: ListOrganizationRepositoriesRequest, reader: jspb.BinaryReader): ListOrganizationRepositoriesRequest;
}

export namespace ListOrganizationRepositoriesRequest {
  export type AsObject = {
    organizationId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListOrganizationRepositoriesResponse extends jspb.Message {
  getRepositoriesList(): Array<Repository>;
  setRepositoriesList(value: Array<Repository>): ListOrganizationRepositoriesResponse;
  clearRepositoriesList(): ListOrganizationRepositoriesResponse;
  addRepositories(value?: Repository, index?: number): Repository;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListOrganizationRepositoriesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationRepositoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationRepositoriesResponse): ListOrganizationRepositoriesResponse.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationRepositoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationRepositoriesResponse;
  static deserializeBinaryFromReader(message: ListOrganizationRepositoriesResponse, reader: jspb.BinaryReader): ListOrganizationRepositoriesResponse;
}

export namespace ListOrganizationRepositoriesResponse {
  export type AsObject = {
    repositoriesList: Array<Repository.AsObject>,
    nextPageToken: string,
  }
}

export class CreateRepositoryByFullNameRequest extends jspb.Message {
  getFullName(): string;
  setFullName(value: string): CreateRepositoryByFullNameRequest;

  getVisibility(): Visibility;
  setVisibility(value: Visibility): CreateRepositoryByFullNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRepositoryByFullNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRepositoryByFullNameRequest): CreateRepositoryByFullNameRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRepositoryByFullNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRepositoryByFullNameRequest;
  static deserializeBinaryFromReader(message: CreateRepositoryByFullNameRequest, reader: jspb.BinaryReader): CreateRepositoryByFullNameRequest;
}

export namespace CreateRepositoryByFullNameRequest {
  export type AsObject = {
    fullName: string,
    visibility: Visibility,
  }
}

export class CreateRepositoryByFullNameResponse extends jspb.Message {
  getRepository(): Repository | undefined;
  setRepository(value?: Repository): CreateRepositoryByFullNameResponse;
  hasRepository(): boolean;
  clearRepository(): CreateRepositoryByFullNameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRepositoryByFullNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRepositoryByFullNameResponse): CreateRepositoryByFullNameResponse.AsObject;
  static serializeBinaryToWriter(message: CreateRepositoryByFullNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRepositoryByFullNameResponse;
  static deserializeBinaryFromReader(message: CreateRepositoryByFullNameResponse, reader: jspb.BinaryReader): CreateRepositoryByFullNameResponse;
}

export namespace CreateRepositoryByFullNameResponse {
  export type AsObject = {
    repository?: Repository.AsObject,
  }
}

export class DeleteRepositoryRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteRepositoryRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRepositoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRepositoryRequest): DeleteRepositoryRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteRepositoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRepositoryRequest;
  static deserializeBinaryFromReader(message: DeleteRepositoryRequest, reader: jspb.BinaryReader): DeleteRepositoryRequest;
}

export namespace DeleteRepositoryRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteRepositoryResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRepositoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRepositoryResponse): DeleteRepositoryResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteRepositoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRepositoryResponse;
  static deserializeBinaryFromReader(message: DeleteRepositoryResponse, reader: jspb.BinaryReader): DeleteRepositoryResponse;
}

export namespace DeleteRepositoryResponse {
  export type AsObject = {
  }
}

export class DeleteRepositoryByFullNameRequest extends jspb.Message {
  getFullName(): string;
  setFullName(value: string): DeleteRepositoryByFullNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRepositoryByFullNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRepositoryByFullNameRequest): DeleteRepositoryByFullNameRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteRepositoryByFullNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRepositoryByFullNameRequest;
  static deserializeBinaryFromReader(message: DeleteRepositoryByFullNameRequest, reader: jspb.BinaryReader): DeleteRepositoryByFullNameRequest;
}

export namespace DeleteRepositoryByFullNameRequest {
  export type AsObject = {
    fullName: string,
  }
}

export class DeleteRepositoryByFullNameResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRepositoryByFullNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRepositoryByFullNameResponse): DeleteRepositoryByFullNameResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteRepositoryByFullNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRepositoryByFullNameResponse;
  static deserializeBinaryFromReader(message: DeleteRepositoryByFullNameResponse, reader: jspb.BinaryReader): DeleteRepositoryByFullNameResponse;
}

export namespace DeleteRepositoryByFullNameResponse {
  export type AsObject = {
  }
}

export class DeprecateRepositoryByNameRequest extends jspb.Message {
  getOwnerName(): string;
  setOwnerName(value: string): DeprecateRepositoryByNameRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): DeprecateRepositoryByNameRequest;

  getDeprecationMessage(): string;
  setDeprecationMessage(value: string): DeprecateRepositoryByNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeprecateRepositoryByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeprecateRepositoryByNameRequest): DeprecateRepositoryByNameRequest.AsObject;
  static serializeBinaryToWriter(message: DeprecateRepositoryByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeprecateRepositoryByNameRequest;
  static deserializeBinaryFromReader(message: DeprecateRepositoryByNameRequest, reader: jspb.BinaryReader): DeprecateRepositoryByNameRequest;
}

export namespace DeprecateRepositoryByNameRequest {
  export type AsObject = {
    ownerName: string,
    repositoryName: string,
    deprecationMessage: string,
  }
}

export class DeprecateRepositoryByNameResponse extends jspb.Message {
  getRepository(): Repository | undefined;
  setRepository(value?: Repository): DeprecateRepositoryByNameResponse;
  hasRepository(): boolean;
  clearRepository(): DeprecateRepositoryByNameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeprecateRepositoryByNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeprecateRepositoryByNameResponse): DeprecateRepositoryByNameResponse.AsObject;
  static serializeBinaryToWriter(message: DeprecateRepositoryByNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeprecateRepositoryByNameResponse;
  static deserializeBinaryFromReader(message: DeprecateRepositoryByNameResponse, reader: jspb.BinaryReader): DeprecateRepositoryByNameResponse;
}

export namespace DeprecateRepositoryByNameResponse {
  export type AsObject = {
    repository?: Repository.AsObject,
  }
}

export class UndeprecateRepositoryByNameRequest extends jspb.Message {
  getOwnerName(): string;
  setOwnerName(value: string): UndeprecateRepositoryByNameRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): UndeprecateRepositoryByNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UndeprecateRepositoryByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UndeprecateRepositoryByNameRequest): UndeprecateRepositoryByNameRequest.AsObject;
  static serializeBinaryToWriter(message: UndeprecateRepositoryByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UndeprecateRepositoryByNameRequest;
  static deserializeBinaryFromReader(message: UndeprecateRepositoryByNameRequest, reader: jspb.BinaryReader): UndeprecateRepositoryByNameRequest;
}

export namespace UndeprecateRepositoryByNameRequest {
  export type AsObject = {
    ownerName: string,
    repositoryName: string,
  }
}

export class UndeprecateRepositoryByNameResponse extends jspb.Message {
  getRepository(): Repository | undefined;
  setRepository(value?: Repository): UndeprecateRepositoryByNameResponse;
  hasRepository(): boolean;
  clearRepository(): UndeprecateRepositoryByNameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UndeprecateRepositoryByNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UndeprecateRepositoryByNameResponse): UndeprecateRepositoryByNameResponse.AsObject;
  static serializeBinaryToWriter(message: UndeprecateRepositoryByNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UndeprecateRepositoryByNameResponse;
  static deserializeBinaryFromReader(message: UndeprecateRepositoryByNameResponse, reader: jspb.BinaryReader): UndeprecateRepositoryByNameResponse;
}

export namespace UndeprecateRepositoryByNameResponse {
  export type AsObject = {
    repository?: Repository.AsObject,
  }
}

export class SetRepositoryContributorRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): SetRepositoryContributorRequest;

  getUserId(): string;
  setUserId(value: string): SetRepositoryContributorRequest;

  getRepositoryRole(): buf_alpha_registry_v1alpha1_role_pb.RepositoryRole;
  setRepositoryRole(value: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole): SetRepositoryContributorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRepositoryContributorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetRepositoryContributorRequest): SetRepositoryContributorRequest.AsObject;
  static serializeBinaryToWriter(message: SetRepositoryContributorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRepositoryContributorRequest;
  static deserializeBinaryFromReader(message: SetRepositoryContributorRequest, reader: jspb.BinaryReader): SetRepositoryContributorRequest;
}

export namespace SetRepositoryContributorRequest {
  export type AsObject = {
    repositoryId: string,
    userId: string,
    repositoryRole: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole,
  }
}

export class SetRepositoryContributorResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRepositoryContributorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetRepositoryContributorResponse): SetRepositoryContributorResponse.AsObject;
  static serializeBinaryToWriter(message: SetRepositoryContributorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRepositoryContributorResponse;
  static deserializeBinaryFromReader(message: SetRepositoryContributorResponse, reader: jspb.BinaryReader): SetRepositoryContributorResponse;
}

export namespace SetRepositoryContributorResponse {
  export type AsObject = {
  }
}

export class ListRepositoryContributorsRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): ListRepositoryContributorsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListRepositoryContributorsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoryContributorsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoryContributorsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryContributorsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryContributorsRequest): ListRepositoryContributorsRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryContributorsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryContributorsRequest;
  static deserializeBinaryFromReader(message: ListRepositoryContributorsRequest, reader: jspb.BinaryReader): ListRepositoryContributorsRequest;
}

export namespace ListRepositoryContributorsRequest {
  export type AsObject = {
    repositoryId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoryContributorsResponse extends jspb.Message {
  getUsersList(): Array<RepositoryContributor>;
  setUsersList(value: Array<RepositoryContributor>): ListRepositoryContributorsResponse;
  clearUsersList(): ListRepositoryContributorsResponse;
  addUsers(value?: RepositoryContributor, index?: number): RepositoryContributor;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoryContributorsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryContributorsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryContributorsResponse): ListRepositoryContributorsResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryContributorsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryContributorsResponse;
  static deserializeBinaryFromReader(message: ListRepositoryContributorsResponse, reader: jspb.BinaryReader): ListRepositoryContributorsResponse;
}

export namespace ListRepositoryContributorsResponse {
  export type AsObject = {
    usersList: Array<RepositoryContributor.AsObject>,
    nextPageToken: string,
  }
}

export class GetRepositorySettingsRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): GetRepositorySettingsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositorySettingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositorySettingsRequest): GetRepositorySettingsRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositorySettingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositorySettingsRequest;
  static deserializeBinaryFromReader(message: GetRepositorySettingsRequest, reader: jspb.BinaryReader): GetRepositorySettingsRequest;
}

export namespace GetRepositorySettingsRequest {
  export type AsObject = {
    repositoryId: string,
  }
}

export class GetRepositorySettingsResponse extends jspb.Message {
  getContributorsCount(): number;
  setContributorsCount(value: number): GetRepositorySettingsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositorySettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositorySettingsResponse): GetRepositorySettingsResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositorySettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositorySettingsResponse;
  static deserializeBinaryFromReader(message: GetRepositorySettingsResponse, reader: jspb.BinaryReader): GetRepositorySettingsResponse;
}

export namespace GetRepositorySettingsResponse {
  export type AsObject = {
    contributorsCount: number,
  }
}

export enum Visibility { 
  VISIBILITY_UNSPECIFIED = 0,
  VISIBILITY_PUBLIC = 1,
  VISIBILITY_PRIVATE = 2,
}
