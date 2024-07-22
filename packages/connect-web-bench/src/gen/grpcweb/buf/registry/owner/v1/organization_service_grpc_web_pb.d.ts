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

import * as grpcWeb from 'grpc-web';

import * as buf_registry_owner_v1_organization_service_pb from '../../../../buf/registry/owner/v1/organization_service_pb'; // proto import: "buf/registry/owner/v1/organization_service.proto"


export class OrganizationServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.GetOrganizationsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_organization_service_pb.GetOrganizationsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_organization_service_pb.GetOrganizationsResponse>;

  listOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.ListOrganizationsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_organization_service_pb.ListOrganizationsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_organization_service_pb.ListOrganizationsResponse>;

  createOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.CreateOrganizationsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_organization_service_pb.CreateOrganizationsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_organization_service_pb.CreateOrganizationsResponse>;

  updateOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.UpdateOrganizationsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_organization_service_pb.UpdateOrganizationsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_organization_service_pb.UpdateOrganizationsResponse>;

  deleteOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.DeleteOrganizationsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_organization_service_pb.DeleteOrganizationsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_organization_service_pb.DeleteOrganizationsResponse>;

}

export class OrganizationServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.GetOrganizationsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_organization_service_pb.GetOrganizationsResponse>;

  listOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.ListOrganizationsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_organization_service_pb.ListOrganizationsResponse>;

  createOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.CreateOrganizationsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_organization_service_pb.CreateOrganizationsResponse>;

  updateOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.UpdateOrganizationsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_organization_service_pb.UpdateOrganizationsResponse>;

  deleteOrganizations(
    request: buf_registry_owner_v1_organization_service_pb.DeleteOrganizationsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_organization_service_pb.DeleteOrganizationsResponse>;

}

