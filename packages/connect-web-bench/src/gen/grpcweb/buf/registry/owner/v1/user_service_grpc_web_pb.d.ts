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

import * as grpcWeb from 'grpc-web';

import * as buf_registry_owner_v1_user_service_pb from '../../../../buf/registry/owner/v1/user_service_pb'; // proto import: "buf/registry/owner/v1/user_service.proto"


export class UserServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getUsers(
    request: buf_registry_owner_v1_user_service_pb.GetUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_user_service_pb.GetUsersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_user_service_pb.GetUsersResponse>;

  listUsers(
    request: buf_registry_owner_v1_user_service_pb.ListUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_user_service_pb.ListUsersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_user_service_pb.ListUsersResponse>;

  createUsers(
    request: buf_registry_owner_v1_user_service_pb.CreateUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_user_service_pb.CreateUsersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_user_service_pb.CreateUsersResponse>;

  updateUsers(
    request: buf_registry_owner_v1_user_service_pb.UpdateUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_user_service_pb.UpdateUsersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_user_service_pb.UpdateUsersResponse>;

  deleteUsers(
    request: buf_registry_owner_v1_user_service_pb.DeleteUsersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_user_service_pb.DeleteUsersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_user_service_pb.DeleteUsersResponse>;

}

export class UserServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getUsers(
    request: buf_registry_owner_v1_user_service_pb.GetUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_user_service_pb.GetUsersResponse>;

  listUsers(
    request: buf_registry_owner_v1_user_service_pb.ListUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_user_service_pb.ListUsersResponse>;

  createUsers(
    request: buf_registry_owner_v1_user_service_pb.CreateUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_user_service_pb.CreateUsersResponse>;

  updateUsers(
    request: buf_registry_owner_v1_user_service_pb.UpdateUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_user_service_pb.UpdateUsersResponse>;

  deleteUsers(
    request: buf_registry_owner_v1_user_service_pb.DeleteUsersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_user_service_pb.DeleteUsersResponse>;

}

