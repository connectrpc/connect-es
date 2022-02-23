import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_authz_pb from '../../../../buf/alpha/registry/v1alpha1/authz_pb';


export class AuthzServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  userCanCreateOrganizationRepository(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationRepositoryRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationRepositoryResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationRepositoryResponse>;

  userCanSeeRepositorySettings(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeRepositorySettingsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeRepositorySettingsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeRepositorySettingsResponse>;

  userCanSeeOrganizationSettings(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeOrganizationSettingsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeOrganizationSettingsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeOrganizationSettingsResponse>;

  userCanReadPlugin(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanReadPluginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanReadPluginResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanReadPluginResponse>;

  userCanCreatePluginVersion(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreatePluginVersionRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreatePluginVersionResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreatePluginVersionResponse>;

  userCanCreateTemplateVersion(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateTemplateVersionRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateTemplateVersionResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateTemplateVersionResponse>;

  userCanCreateOrganizationPlugin(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationPluginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationPluginResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationPluginResponse>;

  userCanCreateOrganizationTemplate(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationTemplateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationTemplateResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationTemplateResponse>;

  userCanSeePluginSettings(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeePluginSettingsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeePluginSettingsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeePluginSettingsResponse>;

  userCanSeeTemplateSettings(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeTemplateSettingsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeTemplateSettingsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeTemplateSettingsResponse>;

  userCanAddOrganizationMember(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanAddOrganizationMemberRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanAddOrganizationMemberResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanAddOrganizationMemberResponse>;

  userCanUpdateOrganizationMember(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanUpdateOrganizationMemberRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanUpdateOrganizationMemberResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanUpdateOrganizationMemberResponse>;

  userCanRemoveOrganizationMember(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanRemoveOrganizationMemberRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanRemoveOrganizationMemberResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanRemoveOrganizationMemberResponse>;

  userCanDeleteOrganization(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteOrganizationRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteOrganizationResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteOrganizationResponse>;

  userCanDeleteRepository(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteRepositoryRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteRepositoryResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteRepositoryResponse>;

  userCanDeleteTemplate(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteTemplateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteTemplateResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteTemplateResponse>;

  userCanDeletePlugin(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeletePluginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeletePluginResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeletePluginResponse>;

  userCanDeleteUser(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteUserResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteUserResponse>;

  userCanSeeServerAdminPanel(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeServerAdminPanelRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeServerAdminPanelResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeServerAdminPanelResponse>;

  userCanManageRepositoryContributors(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanManageRepositoryContributorsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanManageRepositoryContributorsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanManageRepositoryContributorsResponse>;

  userCanManagePluginContributors(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanManagePluginContributorsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanManagePluginContributorsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanManagePluginContributorsResponse>;

  userCanManageTemplateContributors(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanManageTemplateContributorsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authz_pb.UserCanManageTemplateContributorsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authz_pb.UserCanManageTemplateContributorsResponse>;

}

export class AuthzServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  userCanCreateOrganizationRepository(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationRepositoryRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationRepositoryResponse>;

  userCanSeeRepositorySettings(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeRepositorySettingsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeRepositorySettingsResponse>;

  userCanSeeOrganizationSettings(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeOrganizationSettingsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeOrganizationSettingsResponse>;

  userCanReadPlugin(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanReadPluginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanReadPluginResponse>;

  userCanCreatePluginVersion(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreatePluginVersionRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreatePluginVersionResponse>;

  userCanCreateTemplateVersion(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateTemplateVersionRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateTemplateVersionResponse>;

  userCanCreateOrganizationPlugin(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationPluginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationPluginResponse>;

  userCanCreateOrganizationTemplate(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationTemplateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanCreateOrganizationTemplateResponse>;

  userCanSeePluginSettings(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeePluginSettingsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeePluginSettingsResponse>;

  userCanSeeTemplateSettings(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeTemplateSettingsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeTemplateSettingsResponse>;

  userCanAddOrganizationMember(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanAddOrganizationMemberRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanAddOrganizationMemberResponse>;

  userCanUpdateOrganizationMember(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanUpdateOrganizationMemberRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanUpdateOrganizationMemberResponse>;

  userCanRemoveOrganizationMember(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanRemoveOrganizationMemberRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanRemoveOrganizationMemberResponse>;

  userCanDeleteOrganization(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteOrganizationRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteOrganizationResponse>;

  userCanDeleteRepository(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteRepositoryRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteRepositoryResponse>;

  userCanDeleteTemplate(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteTemplateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteTemplateResponse>;

  userCanDeletePlugin(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeletePluginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeletePluginResponse>;

  userCanDeleteUser(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanDeleteUserResponse>;

  userCanSeeServerAdminPanel(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeServerAdminPanelRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanSeeServerAdminPanelResponse>;

  userCanManageRepositoryContributors(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanManageRepositoryContributorsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanManageRepositoryContributorsResponse>;

  userCanManagePluginContributors(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanManagePluginContributorsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanManagePluginContributorsResponse>;

  userCanManageTemplateContributors(
    request: buf_alpha_registry_v1alpha1_authz_pb.UserCanManageTemplateContributorsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authz_pb.UserCanManageTemplateContributorsResponse>;

}

