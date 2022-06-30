import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_role_pb from '../../../../buf/alpha/registry/v1alpha1/role_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


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

  getUsername(): string;
  setUsername(value: string): User;

  getDeactivated(): boolean;
  setDeactivated(value: boolean): User;

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
    username: string,
    deactivated: boolean,
  }
}

export class OrganizationUser extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): OrganizationUser;
  hasUser(): boolean;
  clearUser(): OrganizationUser;

  getOrganizationId(): string;
  setOrganizationId(value: string): OrganizationUser;

  getOrganizationRole(): buf_alpha_registry_v1alpha1_role_pb.OrganizationRole;
  setOrganizationRole(value: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole): OrganizationUser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrganizationUser.AsObject;
  static toObject(includeInstance: boolean, msg: OrganizationUser): OrganizationUser.AsObject;
  static serializeBinaryToWriter(message: OrganizationUser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrganizationUser;
  static deserializeBinaryFromReader(message: OrganizationUser, reader: jspb.BinaryReader): OrganizationUser;
}

export namespace OrganizationUser {
  export type AsObject = {
    user?: User.AsObject,
    organizationId: string,
    organizationRole: buf_alpha_registry_v1alpha1_role_pb.OrganizationRole,
  }
}

export class CreateUserRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): CreateUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
  static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
  static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
  export type AsObject = {
    username: string,
  }
}

export class CreateUserResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): CreateUserResponse;
  hasUser(): boolean;
  clearUser(): CreateUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserResponse): CreateUserResponse.AsObject;
  static serializeBinaryToWriter(message: CreateUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserResponse;
  static deserializeBinaryFromReader(message: CreateUserResponse, reader: jspb.BinaryReader): CreateUserResponse;
}

export namespace CreateUserResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class GetUserRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRequest;
  static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetUserResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): GetUserResponse;
  hasUser(): boolean;
  clearUser(): GetUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserResponse): GetUserResponse.AsObject;
  static serializeBinaryToWriter(message: GetUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserResponse;
  static deserializeBinaryFromReader(message: GetUserResponse, reader: jspb.BinaryReader): GetUserResponse;
}

export namespace GetUserResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class GetUserByUsernameRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): GetUserByUsernameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserByUsernameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserByUsernameRequest): GetUserByUsernameRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserByUsernameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserByUsernameRequest;
  static deserializeBinaryFromReader(message: GetUserByUsernameRequest, reader: jspb.BinaryReader): GetUserByUsernameRequest;
}

export namespace GetUserByUsernameRequest {
  export type AsObject = {
    username: string,
  }
}

export class GetUserByUsernameResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): GetUserByUsernameResponse;
  hasUser(): boolean;
  clearUser(): GetUserByUsernameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserByUsernameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserByUsernameResponse): GetUserByUsernameResponse.AsObject;
  static serializeBinaryToWriter(message: GetUserByUsernameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserByUsernameResponse;
  static deserializeBinaryFromReader(message: GetUserByUsernameResponse, reader: jspb.BinaryReader): GetUserByUsernameResponse;
}

export namespace GetUserByUsernameResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class ListUsersRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListUsersRequest;

  getPageToken(): string;
  setPageToken(value: string): ListUsersRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListUsersRequest;

  getUserStateFilter(): UserState;
  setUserStateFilter(value: UserState): ListUsersRequest;

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
    reverse: boolean,
    userStateFilter: UserState,
  }
}

export class ListUsersResponse extends jspb.Message {
  getUsersList(): Array<User>;
  setUsersList(value: Array<User>): ListUsersResponse;
  clearUsersList(): ListUsersResponse;
  addUsers(value?: User, index?: number): User;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListUsersResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListUsersResponse): ListUsersResponse.AsObject;
  static serializeBinaryToWriter(message: ListUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUsersResponse;
  static deserializeBinaryFromReader(message: ListUsersResponse, reader: jspb.BinaryReader): ListUsersResponse;
}

export namespace ListUsersResponse {
  export type AsObject = {
    usersList: Array<User.AsObject>,
    nextPageToken: string,
  }
}

export class ListOrganizationUsersRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): ListOrganizationUsersRequest;

  getPageSize(): number;
  setPageSize(value: number): ListOrganizationUsersRequest;

  getPageToken(): string;
  setPageToken(value: string): ListOrganizationUsersRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListOrganizationUsersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationUsersRequest): ListOrganizationUsersRequest.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationUsersRequest;
  static deserializeBinaryFromReader(message: ListOrganizationUsersRequest, reader: jspb.BinaryReader): ListOrganizationUsersRequest;
}

export namespace ListOrganizationUsersRequest {
  export type AsObject = {
    organizationId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListOrganizationUsersResponse extends jspb.Message {
  getUsersList(): Array<OrganizationUser>;
  setUsersList(value: Array<OrganizationUser>): ListOrganizationUsersResponse;
  clearUsersList(): ListOrganizationUsersResponse;
  addUsers(value?: OrganizationUser, index?: number): OrganizationUser;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListOrganizationUsersResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationUsersResponse): ListOrganizationUsersResponse.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationUsersResponse;
  static deserializeBinaryFromReader(message: ListOrganizationUsersResponse, reader: jspb.BinaryReader): ListOrganizationUsersResponse;
}

export namespace ListOrganizationUsersResponse {
  export type AsObject = {
    usersList: Array<OrganizationUser.AsObject>,
    nextPageToken: string,
  }
}

export class DeleteUserRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteUserRequest): DeleteUserRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteUserRequest;
  static deserializeBinaryFromReader(message: DeleteUserRequest, reader: jspb.BinaryReader): DeleteUserRequest;
}

export namespace DeleteUserRequest {
  export type AsObject = {
  }
}

export class DeleteUserResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteUserResponse): DeleteUserResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteUserResponse;
  static deserializeBinaryFromReader(message: DeleteUserResponse, reader: jspb.BinaryReader): DeleteUserResponse;
}

export namespace DeleteUserResponse {
  export type AsObject = {
  }
}

export class DeactivateUserRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeactivateUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeactivateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeactivateUserRequest): DeactivateUserRequest.AsObject;
  static serializeBinaryToWriter(message: DeactivateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeactivateUserRequest;
  static deserializeBinaryFromReader(message: DeactivateUserRequest, reader: jspb.BinaryReader): DeactivateUserRequest;
}

export namespace DeactivateUserRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeactivateUserResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeactivateUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeactivateUserResponse): DeactivateUserResponse.AsObject;
  static serializeBinaryToWriter(message: DeactivateUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeactivateUserResponse;
  static deserializeBinaryFromReader(message: DeactivateUserResponse, reader: jspb.BinaryReader): DeactivateUserResponse;
}

export namespace DeactivateUserResponse {
  export type AsObject = {
  }
}

export class UpdateUserServerRoleRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): UpdateUserServerRoleRequest;

  getServerRole(): buf_alpha_registry_v1alpha1_role_pb.ServerRole;
  setServerRole(value: buf_alpha_registry_v1alpha1_role_pb.ServerRole): UpdateUserServerRoleRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserServerRoleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserServerRoleRequest): UpdateUserServerRoleRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateUserServerRoleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserServerRoleRequest;
  static deserializeBinaryFromReader(message: UpdateUserServerRoleRequest, reader: jspb.BinaryReader): UpdateUserServerRoleRequest;
}

export namespace UpdateUserServerRoleRequest {
  export type AsObject = {
    userId: string,
    serverRole: buf_alpha_registry_v1alpha1_role_pb.ServerRole,
  }
}

export class UpdateUserServerRoleResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserServerRoleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserServerRoleResponse): UpdateUserServerRoleResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateUserServerRoleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserServerRoleResponse;
  static deserializeBinaryFromReader(message: UpdateUserServerRoleResponse, reader: jspb.BinaryReader): UpdateUserServerRoleResponse;
}

export namespace UpdateUserServerRoleResponse {
  export type AsObject = {
  }
}

export class CountUsersRequest extends jspb.Message {
  getUserStateFilter(): UserState;
  setUserStateFilter(value: UserState): CountUsersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CountUsersRequest): CountUsersRequest.AsObject;
  static serializeBinaryToWriter(message: CountUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountUsersRequest;
  static deserializeBinaryFromReader(message: CountUsersRequest, reader: jspb.BinaryReader): CountUsersRequest;
}

export namespace CountUsersRequest {
  export type AsObject = {
    userStateFilter: UserState,
  }
}

export class CountUsersResponse extends jspb.Message {
  getTotalCount(): number;
  setTotalCount(value: number): CountUsersResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CountUsersResponse): CountUsersResponse.AsObject;
  static serializeBinaryToWriter(message: CountUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountUsersResponse;
  static deserializeBinaryFromReader(message: CountUsersResponse, reader: jspb.BinaryReader): CountUsersResponse;
}

export namespace CountUsersResponse {
  export type AsObject = {
    totalCount: number,
  }
}

export enum UserState { 
  USER_STATE_UNSPECIFIED = 0,
  USER_STATE_ACTIVE = 1,
  USER_STATE_DEACTIVATED = 2,
}
