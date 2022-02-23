import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_plugin_pb from '../../../../buf/alpha/registry/v1alpha1/plugin_pb';


export class PluginServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listPlugins(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListPluginsResponse>;

  listUserPlugins(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListUserPluginsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListUserPluginsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListUserPluginsResponse>;

  listOrganizationPlugins(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationPluginsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationPluginsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationPluginsResponse>;

  getPluginVersion(
    request: buf_alpha_registry_v1alpha1_plugin_pb.GetPluginVersionRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.GetPluginVersionResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.GetPluginVersionResponse>;

  listPluginVersions(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginVersionsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginVersionsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListPluginVersionsResponse>;

  createPlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.CreatePluginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.CreatePluginResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.CreatePluginResponse>;

  getPlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.GetPluginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.GetPluginResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.GetPluginResponse>;

  deletePlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.DeletePluginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.DeletePluginResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.DeletePluginResponse>;

  setPluginContributor(
    request: buf_alpha_registry_v1alpha1_plugin_pb.SetPluginContributorRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.SetPluginContributorResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.SetPluginContributorResponse>;

  listPluginContributors(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginContributorsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginContributorsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListPluginContributorsResponse>;

  deprecatePlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.DeprecatePluginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.DeprecatePluginResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.DeprecatePluginResponse>;

  undeprecatePlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.UndeprecatePluginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.UndeprecatePluginResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.UndeprecatePluginResponse>;

  getTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateResponse>;

  listTemplates(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplatesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplatesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListTemplatesResponse>;

  listUserTemplates(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListUserTemplatesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListUserTemplatesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListUserTemplatesResponse>;

  listOrganizationTemplates(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationTemplatesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationTemplatesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationTemplatesResponse>;

  getTemplateVersion(
    request: buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateVersionRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateVersionResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateVersionResponse>;

  listTemplateVersions(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateVersionsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateVersionsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateVersionsResponse>;

  createTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateResponse>;

  deleteTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.DeleteTemplateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.DeleteTemplateResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.DeleteTemplateResponse>;

  createTemplateVersion(
    request: buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateVersionRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateVersionResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateVersionResponse>;

  setTemplateContributor(
    request: buf_alpha_registry_v1alpha1_plugin_pb.SetTemplateContributorRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.SetTemplateContributorResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.SetTemplateContributorResponse>;

  listTemplateContributors(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateContributorsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateContributorsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateContributorsResponse>;

  deprecateTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.DeprecateTemplateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.DeprecateTemplateResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.DeprecateTemplateResponse>;

  undeprecateTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.UndeprecateTemplateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_plugin_pb.UndeprecateTemplateResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_plugin_pb.UndeprecateTemplateResponse>;

}

export class PluginServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listPlugins(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListPluginsResponse>;

  listUserPlugins(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListUserPluginsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListUserPluginsResponse>;

  listOrganizationPlugins(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationPluginsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationPluginsResponse>;

  getPluginVersion(
    request: buf_alpha_registry_v1alpha1_plugin_pb.GetPluginVersionRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.GetPluginVersionResponse>;

  listPluginVersions(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginVersionsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListPluginVersionsResponse>;

  createPlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.CreatePluginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.CreatePluginResponse>;

  getPlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.GetPluginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.GetPluginResponse>;

  deletePlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.DeletePluginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.DeletePluginResponse>;

  setPluginContributor(
    request: buf_alpha_registry_v1alpha1_plugin_pb.SetPluginContributorRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.SetPluginContributorResponse>;

  listPluginContributors(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListPluginContributorsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListPluginContributorsResponse>;

  deprecatePlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.DeprecatePluginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.DeprecatePluginResponse>;

  undeprecatePlugin(
    request: buf_alpha_registry_v1alpha1_plugin_pb.UndeprecatePluginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.UndeprecatePluginResponse>;

  getTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateResponse>;

  listTemplates(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplatesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListTemplatesResponse>;

  listUserTemplates(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListUserTemplatesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListUserTemplatesResponse>;

  listOrganizationTemplates(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationTemplatesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListOrganizationTemplatesResponse>;

  getTemplateVersion(
    request: buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateVersionRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.GetTemplateVersionResponse>;

  listTemplateVersions(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateVersionsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateVersionsResponse>;

  createTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateResponse>;

  deleteTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.DeleteTemplateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.DeleteTemplateResponse>;

  createTemplateVersion(
    request: buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateVersionRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.CreateTemplateVersionResponse>;

  setTemplateContributor(
    request: buf_alpha_registry_v1alpha1_plugin_pb.SetTemplateContributorRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.SetTemplateContributorResponse>;

  listTemplateContributors(
    request: buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateContributorsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.ListTemplateContributorsResponse>;

  deprecateTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.DeprecateTemplateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.DeprecateTemplateResponse>;

  undeprecateTemplate(
    request: buf_alpha_registry_v1alpha1_plugin_pb.UndeprecateTemplateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_plugin_pb.UndeprecateTemplateResponse>;

}

