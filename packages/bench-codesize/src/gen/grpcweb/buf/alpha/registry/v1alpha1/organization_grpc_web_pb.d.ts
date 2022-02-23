import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_organization_pb from '../../../../buf/alpha/registry/v1alpha1/organization_pb';


export class OrganizationServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getOrganization(
    request: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationResponse>;

  getOrganizationByName(
    request: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationByNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationByNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationByNameResponse>;

  listOrganizations(
    request: buf_alpha_registry_v1alpha1_organization_pb.ListOrganizationsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.ListOrganizationsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.ListOrganizationsResponse>;

  listUserOrganizations(
    request: buf_alpha_registry_v1alpha1_organization_pb.ListUserOrganizationsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.ListUserOrganizationsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.ListUserOrganizationsResponse>;

  createOrganization(
    request: buf_alpha_registry_v1alpha1_organization_pb.CreateOrganizationRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.CreateOrganizationResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.CreateOrganizationResponse>;

  deleteOrganization(
    request: buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationResponse>;

  deleteOrganizationByName(
    request: buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationByNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationByNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationByNameResponse>;

  addOrganizationMember(
    request: buf_alpha_registry_v1alpha1_organization_pb.AddOrganizationMemberRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.AddOrganizationMemberResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.AddOrganizationMemberResponse>;

  updateOrganizationMember(
    request: buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationMemberRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationMemberResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationMemberResponse>;

  removeOrganizationMember(
    request: buf_alpha_registry_v1alpha1_organization_pb.RemoveOrganizationMemberRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.RemoveOrganizationMemberResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.RemoveOrganizationMemberResponse>;

  setOrganizationMember(
    request: buf_alpha_registry_v1alpha1_organization_pb.SetOrganizationMemberRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.SetOrganizationMemberResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.SetOrganizationMemberResponse>;

  getOrganizationSettings(
    request: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationSettingsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationSettingsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationSettingsResponse>;

  updateOrganizationSettings(
    request: buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationSettingsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationSettingsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationSettingsResponse>;

}

export class OrganizationServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getOrganization(
    request: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationResponse>;

  getOrganizationByName(
    request: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationByNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationByNameResponse>;

  listOrganizations(
    request: buf_alpha_registry_v1alpha1_organization_pb.ListOrganizationsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.ListOrganizationsResponse>;

  listUserOrganizations(
    request: buf_alpha_registry_v1alpha1_organization_pb.ListUserOrganizationsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.ListUserOrganizationsResponse>;

  createOrganization(
    request: buf_alpha_registry_v1alpha1_organization_pb.CreateOrganizationRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.CreateOrganizationResponse>;

  deleteOrganization(
    request: buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationResponse>;

  deleteOrganizationByName(
    request: buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationByNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.DeleteOrganizationByNameResponse>;

  addOrganizationMember(
    request: buf_alpha_registry_v1alpha1_organization_pb.AddOrganizationMemberRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.AddOrganizationMemberResponse>;

  updateOrganizationMember(
    request: buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationMemberRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationMemberResponse>;

  removeOrganizationMember(
    request: buf_alpha_registry_v1alpha1_organization_pb.RemoveOrganizationMemberRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.RemoveOrganizationMemberResponse>;

  setOrganizationMember(
    request: buf_alpha_registry_v1alpha1_organization_pb.SetOrganizationMemberRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.SetOrganizationMemberResponse>;

  getOrganizationSettings(
    request: buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationSettingsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.GetOrganizationSettingsResponse>;

  updateOrganizationSettings(
    request: buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationSettingsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_organization_pb.UpdateOrganizationSettingsResponse>;

}

