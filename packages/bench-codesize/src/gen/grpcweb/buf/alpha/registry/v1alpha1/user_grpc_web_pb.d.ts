import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_user_pb from '../../../../buf/alpha/registry/v1alpha1/user_pb';


export class UserServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createUser(
    request: buf_alpha_registry_v1alpha1_user_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.CreateUserResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.CreateUserResponse>;

  getUser(
    request: buf_alpha_registry_v1alpha1_user_pb.GetUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.GetUserResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.GetUserResponse>;

  getUserByUsername(
    request: buf_alpha_registry_v1alpha1_user_pb.GetUserByUsernameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.GetUserByUsernameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.GetUserByUsernameResponse>;

  listUsers(
    request: buf_alpha_registry_v1alpha1_user_pb.ListUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.ListUsersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.ListUsersResponse>;

  listOrganizationUsers(
    request: buf_alpha_registry_v1alpha1_user_pb.ListOrganizationUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.ListOrganizationUsersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.ListOrganizationUsersResponse>;

  deleteUser(
    request: buf_alpha_registry_v1alpha1_user_pb.DeleteUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.DeleteUserResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.DeleteUserResponse>;

  deactivateUser(
    request: buf_alpha_registry_v1alpha1_user_pb.DeactivateUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.DeactivateUserResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.DeactivateUserResponse>;

  updateUserServerRole(
    request: buf_alpha_registry_v1alpha1_user_pb.UpdateUserServerRoleRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.UpdateUserServerRoleResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.UpdateUserServerRoleResponse>;

  countUsers(
    request: buf_alpha_registry_v1alpha1_user_pb.CountUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_user_pb.CountUsersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_user_pb.CountUsersResponse>;

}

export class UserServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createUser(
    request: buf_alpha_registry_v1alpha1_user_pb.CreateUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.CreateUserResponse>;

  getUser(
    request: buf_alpha_registry_v1alpha1_user_pb.GetUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.GetUserResponse>;

  getUserByUsername(
    request: buf_alpha_registry_v1alpha1_user_pb.GetUserByUsernameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.GetUserByUsernameResponse>;

  listUsers(
    request: buf_alpha_registry_v1alpha1_user_pb.ListUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.ListUsersResponse>;

  listOrganizationUsers(
    request: buf_alpha_registry_v1alpha1_user_pb.ListOrganizationUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.ListOrganizationUsersResponse>;

  deleteUser(
    request: buf_alpha_registry_v1alpha1_user_pb.DeleteUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.DeleteUserResponse>;

  deactivateUser(
    request: buf_alpha_registry_v1alpha1_user_pb.DeactivateUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.DeactivateUserResponse>;

  updateUserServerRole(
    request: buf_alpha_registry_v1alpha1_user_pb.UpdateUserServerRoleRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.UpdateUserServerRoleResponse>;

  countUsers(
    request: buf_alpha_registry_v1alpha1_user_pb.CountUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_user_pb.CountUsersResponse>;

}

