import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_display_pb from '../../../../buf/alpha/registry/v1alpha1/display_pb';


export class DisplayServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  displayOrganizationElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayOrganizationElementsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.DisplayOrganizationElementsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.DisplayOrganizationElementsResponse>;

  displayRepositoryElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayRepositoryElementsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.DisplayRepositoryElementsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.DisplayRepositoryElementsResponse>;

  displayPluginElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayPluginElementsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.DisplayPluginElementsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.DisplayPluginElementsResponse>;

  displayTemplateElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayTemplateElementsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.DisplayTemplateElementsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.DisplayTemplateElementsResponse>;

  displayUserElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayUserElementsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.DisplayUserElementsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.DisplayUserElementsResponse>;

  displayServerElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayServerElementsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.DisplayServerElementsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.DisplayServerElementsResponse>;

  listManageableRepositoryRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableRepositoryRolesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.ListManageableRepositoryRolesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.ListManageableRepositoryRolesResponse>;

  listManageableUserRepositoryRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserRepositoryRolesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserRepositoryRolesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.ListManageableUserRepositoryRolesResponse>;

  listManageablePluginRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageablePluginRolesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.ListManageablePluginRolesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.ListManageablePluginRolesResponse>;

  listManageableUserPluginRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserPluginRolesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserPluginRolesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.ListManageableUserPluginRolesResponse>;

  listManageableTemplateRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableTemplateRolesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.ListManageableTemplateRolesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.ListManageableTemplateRolesResponse>;

  listManageableUserTemplateRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserTemplateRolesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserTemplateRolesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_display_pb.ListManageableUserTemplateRolesResponse>;

}

export class DisplayServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  displayOrganizationElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayOrganizationElementsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.DisplayOrganizationElementsResponse>;

  displayRepositoryElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayRepositoryElementsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.DisplayRepositoryElementsResponse>;

  displayPluginElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayPluginElementsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.DisplayPluginElementsResponse>;

  displayTemplateElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayTemplateElementsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.DisplayTemplateElementsResponse>;

  displayUserElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayUserElementsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.DisplayUserElementsResponse>;

  displayServerElements(
    request: buf_alpha_registry_v1alpha1_display_pb.DisplayServerElementsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.DisplayServerElementsResponse>;

  listManageableRepositoryRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableRepositoryRolesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.ListManageableRepositoryRolesResponse>;

  listManageableUserRepositoryRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserRepositoryRolesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.ListManageableUserRepositoryRolesResponse>;

  listManageablePluginRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageablePluginRolesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.ListManageablePluginRolesResponse>;

  listManageableUserPluginRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserPluginRolesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.ListManageableUserPluginRolesResponse>;

  listManageableTemplateRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableTemplateRolesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.ListManageableTemplateRolesResponse>;

  listManageableUserTemplateRoles(
    request: buf_alpha_registry_v1alpha1_display_pb.ListManageableUserTemplateRolesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_display_pb.ListManageableUserTemplateRolesResponse>;

}

