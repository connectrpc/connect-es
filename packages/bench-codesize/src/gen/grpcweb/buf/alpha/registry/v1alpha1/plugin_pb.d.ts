import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_role_pb from '../../../../buf/alpha/registry/v1alpha1/role_pb';
import * as buf_alpha_registry_v1alpha1_user_pb from '../../../../buf/alpha/registry/v1alpha1/user_pb';
import * as buf_alpha_registry_v1alpha1_generate_pb from '../../../../buf/alpha/registry/v1alpha1/generate_pb';


export class Plugin extends jspb.Message {
  getId(): string;
  setId(value: string): Plugin;

  getName(): string;
  setName(value: string): Plugin;

  getOwner(): string;
  setOwner(value: string): Plugin;

  getVisibility(): PluginVisibility;
  setVisibility(value: PluginVisibility): Plugin;

  getDeprecated(): boolean;
  setDeprecated(value: boolean): Plugin;

  getDeprecationMessage(): string;
  setDeprecationMessage(value: string): Plugin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Plugin.AsObject;
  static toObject(includeInstance: boolean, msg: Plugin): Plugin.AsObject;
  static serializeBinaryToWriter(message: Plugin, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Plugin;
  static deserializeBinaryFromReader(message: Plugin, reader: jspb.BinaryReader): Plugin;
}

export namespace Plugin {
  export type AsObject = {
    id: string,
    name: string,
    owner: string,
    visibility: PluginVisibility,
    deprecated: boolean,
    deprecationMessage: string,
  }
}

export class PluginVersion extends jspb.Message {
  getId(): string;
  setId(value: string): PluginVersion;

  getName(): string;
  setName(value: string): PluginVersion;

  getPluginName(): string;
  setPluginName(value: string): PluginVersion;

  getPluginOwner(): string;
  setPluginOwner(value: string): PluginVersion;

  getContainerImageDigest(): string;
  setContainerImageDigest(value: string): PluginVersion;

  getRuntimeLibrariesList(): Array<buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary>;
  setRuntimeLibrariesList(value: Array<buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary>): PluginVersion;
  clearRuntimeLibrariesList(): PluginVersion;
  addRuntimeLibraries(value?: buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary, index?: number): buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginVersion.AsObject;
  static toObject(includeInstance: boolean, msg: PluginVersion): PluginVersion.AsObject;
  static serializeBinaryToWriter(message: PluginVersion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginVersion;
  static deserializeBinaryFromReader(message: PluginVersion, reader: jspb.BinaryReader): PluginVersion;
}

export namespace PluginVersion {
  export type AsObject = {
    id: string,
    name: string,
    pluginName: string,
    pluginOwner: string,
    containerImageDigest: string,
    runtimeLibrariesList: Array<buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary.AsObject>,
  }
}

export class Template extends jspb.Message {
  getId(): string;
  setId(value: string): Template;

  getName(): string;
  setName(value: string): Template;

  getOwner(): string;
  setOwner(value: string): Template;

  getPluginConfigsList(): Array<PluginConfig>;
  setPluginConfigsList(value: Array<PluginConfig>): Template;
  clearPluginConfigsList(): Template;
  addPluginConfigs(value?: PluginConfig, index?: number): PluginConfig;

  getVisibility(): PluginVisibility;
  setVisibility(value: PluginVisibility): Template;

  getDeprecated(): boolean;
  setDeprecated(value: boolean): Template;

  getDeprecationMessage(): string;
  setDeprecationMessage(value: string): Template;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Template.AsObject;
  static toObject(includeInstance: boolean, msg: Template): Template.AsObject;
  static serializeBinaryToWriter(message: Template, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Template;
  static deserializeBinaryFromReader(message: Template, reader: jspb.BinaryReader): Template;
}

export namespace Template {
  export type AsObject = {
    id: string,
    name: string,
    owner: string,
    pluginConfigsList: Array<PluginConfig.AsObject>,
    visibility: PluginVisibility,
    deprecated: boolean,
    deprecationMessage: string,
  }
}

export class PluginConfig extends jspb.Message {
  getPluginOwner(): string;
  setPluginOwner(value: string): PluginConfig;

  getPluginName(): string;
  setPluginName(value: string): PluginConfig;

  getParametersList(): Array<string>;
  setParametersList(value: Array<string>): PluginConfig;
  clearParametersList(): PluginConfig;
  addParameters(value: string, index?: number): PluginConfig;

  getInaccessible(): boolean;
  setInaccessible(value: boolean): PluginConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginConfig.AsObject;
  static toObject(includeInstance: boolean, msg: PluginConfig): PluginConfig.AsObject;
  static serializeBinaryToWriter(message: PluginConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginConfig;
  static deserializeBinaryFromReader(message: PluginConfig, reader: jspb.BinaryReader): PluginConfig;
}

export namespace PluginConfig {
  export type AsObject = {
    pluginOwner: string,
    pluginName: string,
    parametersList: Array<string>,
    inaccessible: boolean,
  }
}

export class TemplateVersion extends jspb.Message {
  getId(): string;
  setId(value: string): TemplateVersion;

  getName(): string;
  setName(value: string): TemplateVersion;

  getTemplateOwner(): string;
  setTemplateOwner(value: string): TemplateVersion;

  getTemplateName(): string;
  setTemplateName(value: string): TemplateVersion;

  getPluginVersionsList(): Array<PluginVersionMapping>;
  setPluginVersionsList(value: Array<PluginVersionMapping>): TemplateVersion;
  clearPluginVersionsList(): TemplateVersion;
  addPluginVersions(value?: PluginVersionMapping, index?: number): PluginVersionMapping;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TemplateVersion.AsObject;
  static toObject(includeInstance: boolean, msg: TemplateVersion): TemplateVersion.AsObject;
  static serializeBinaryToWriter(message: TemplateVersion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TemplateVersion;
  static deserializeBinaryFromReader(message: TemplateVersion, reader: jspb.BinaryReader): TemplateVersion;
}

export namespace TemplateVersion {
  export type AsObject = {
    id: string,
    name: string,
    templateOwner: string,
    templateName: string,
    pluginVersionsList: Array<PluginVersionMapping.AsObject>,
  }
}

export class PluginVersionMapping extends jspb.Message {
  getPluginOwner(): string;
  setPluginOwner(value: string): PluginVersionMapping;

  getPluginName(): string;
  setPluginName(value: string): PluginVersionMapping;

  getVersion(): string;
  setVersion(value: string): PluginVersionMapping;

  getInaccessible(): boolean;
  setInaccessible(value: boolean): PluginVersionMapping;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginVersionMapping.AsObject;
  static toObject(includeInstance: boolean, msg: PluginVersionMapping): PluginVersionMapping.AsObject;
  static serializeBinaryToWriter(message: PluginVersionMapping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginVersionMapping;
  static deserializeBinaryFromReader(message: PluginVersionMapping, reader: jspb.BinaryReader): PluginVersionMapping;
}

export namespace PluginVersionMapping {
  export type AsObject = {
    pluginOwner: string,
    pluginName: string,
    version: string,
    inaccessible: boolean,
  }
}

export class PluginContributor extends jspb.Message {
  getUser(): buf_alpha_registry_v1alpha1_user_pb.User | undefined;
  setUser(value?: buf_alpha_registry_v1alpha1_user_pb.User): PluginContributor;
  hasUser(): boolean;
  clearUser(): PluginContributor;

  getPluginId(): string;
  setPluginId(value: string): PluginContributor;

  getExplicitRole(): buf_alpha_registry_v1alpha1_role_pb.PluginRole;
  setExplicitRole(value: buf_alpha_registry_v1alpha1_role_pb.PluginRole): PluginContributor;

  getImplicitRole(): buf_alpha_registry_v1alpha1_role_pb.PluginRole;
  setImplicitRole(value: buf_alpha_registry_v1alpha1_role_pb.PluginRole): PluginContributor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginContributor.AsObject;
  static toObject(includeInstance: boolean, msg: PluginContributor): PluginContributor.AsObject;
  static serializeBinaryToWriter(message: PluginContributor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginContributor;
  static deserializeBinaryFromReader(message: PluginContributor, reader: jspb.BinaryReader): PluginContributor;
}

export namespace PluginContributor {
  export type AsObject = {
    user?: buf_alpha_registry_v1alpha1_user_pb.User.AsObject,
    pluginId: string,
    explicitRole: buf_alpha_registry_v1alpha1_role_pb.PluginRole,
    implicitRole: buf_alpha_registry_v1alpha1_role_pb.PluginRole,
  }
}

export class TemplateContributor extends jspb.Message {
  getUser(): buf_alpha_registry_v1alpha1_user_pb.User | undefined;
  setUser(value?: buf_alpha_registry_v1alpha1_user_pb.User): TemplateContributor;
  hasUser(): boolean;
  clearUser(): TemplateContributor;

  getTemplateId(): string;
  setTemplateId(value: string): TemplateContributor;

  getExplicitRole(): buf_alpha_registry_v1alpha1_role_pb.TemplateRole;
  setExplicitRole(value: buf_alpha_registry_v1alpha1_role_pb.TemplateRole): TemplateContributor;

  getImplicitRole(): buf_alpha_registry_v1alpha1_role_pb.TemplateRole;
  setImplicitRole(value: buf_alpha_registry_v1alpha1_role_pb.TemplateRole): TemplateContributor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TemplateContributor.AsObject;
  static toObject(includeInstance: boolean, msg: TemplateContributor): TemplateContributor.AsObject;
  static serializeBinaryToWriter(message: TemplateContributor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TemplateContributor;
  static deserializeBinaryFromReader(message: TemplateContributor, reader: jspb.BinaryReader): TemplateContributor;
}

export namespace TemplateContributor {
  export type AsObject = {
    user?: buf_alpha_registry_v1alpha1_user_pb.User.AsObject,
    templateId: string,
    explicitRole: buf_alpha_registry_v1alpha1_role_pb.TemplateRole,
    implicitRole: buf_alpha_registry_v1alpha1_role_pb.TemplateRole,
  }
}

export class ListPluginsRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListPluginsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListPluginsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListPluginsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListPluginsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListPluginsRequest): ListPluginsRequest.AsObject;
  static serializeBinaryToWriter(message: ListPluginsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListPluginsRequest;
  static deserializeBinaryFromReader(message: ListPluginsRequest, reader: jspb.BinaryReader): ListPluginsRequest;
}

export namespace ListPluginsRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListPluginsResponse extends jspb.Message {
  getPluginsList(): Array<Plugin>;
  setPluginsList(value: Array<Plugin>): ListPluginsResponse;
  clearPluginsList(): ListPluginsResponse;
  addPlugins(value?: Plugin, index?: number): Plugin;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListPluginsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListPluginsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListPluginsResponse): ListPluginsResponse.AsObject;
  static serializeBinaryToWriter(message: ListPluginsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListPluginsResponse;
  static deserializeBinaryFromReader(message: ListPluginsResponse, reader: jspb.BinaryReader): ListPluginsResponse;
}

export namespace ListPluginsResponse {
  export type AsObject = {
    pluginsList: Array<Plugin.AsObject>,
    nextPageToken: string,
  }
}

export class ListUserPluginsRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ListUserPluginsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListUserPluginsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListUserPluginsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListUserPluginsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUserPluginsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListUserPluginsRequest): ListUserPluginsRequest.AsObject;
  static serializeBinaryToWriter(message: ListUserPluginsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUserPluginsRequest;
  static deserializeBinaryFromReader(message: ListUserPluginsRequest, reader: jspb.BinaryReader): ListUserPluginsRequest;
}

export namespace ListUserPluginsRequest {
  export type AsObject = {
    owner: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListUserPluginsResponse extends jspb.Message {
  getPluginsList(): Array<Plugin>;
  setPluginsList(value: Array<Plugin>): ListUserPluginsResponse;
  clearPluginsList(): ListUserPluginsResponse;
  addPlugins(value?: Plugin, index?: number): Plugin;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListUserPluginsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUserPluginsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListUserPluginsResponse): ListUserPluginsResponse.AsObject;
  static serializeBinaryToWriter(message: ListUserPluginsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUserPluginsResponse;
  static deserializeBinaryFromReader(message: ListUserPluginsResponse, reader: jspb.BinaryReader): ListUserPluginsResponse;
}

export namespace ListUserPluginsResponse {
  export type AsObject = {
    pluginsList: Array<Plugin.AsObject>,
    nextPageToken: string,
  }
}

export class ListOrganizationPluginsRequest extends jspb.Message {
  getOrganization(): string;
  setOrganization(value: string): ListOrganizationPluginsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListOrganizationPluginsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListOrganizationPluginsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListOrganizationPluginsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationPluginsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationPluginsRequest): ListOrganizationPluginsRequest.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationPluginsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationPluginsRequest;
  static deserializeBinaryFromReader(message: ListOrganizationPluginsRequest, reader: jspb.BinaryReader): ListOrganizationPluginsRequest;
}

export namespace ListOrganizationPluginsRequest {
  export type AsObject = {
    organization: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListOrganizationPluginsResponse extends jspb.Message {
  getPluginsList(): Array<Plugin>;
  setPluginsList(value: Array<Plugin>): ListOrganizationPluginsResponse;
  clearPluginsList(): ListOrganizationPluginsResponse;
  addPlugins(value?: Plugin, index?: number): Plugin;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListOrganizationPluginsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationPluginsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationPluginsResponse): ListOrganizationPluginsResponse.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationPluginsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationPluginsResponse;
  static deserializeBinaryFromReader(message: ListOrganizationPluginsResponse, reader: jspb.BinaryReader): ListOrganizationPluginsResponse;
}

export namespace ListOrganizationPluginsResponse {
  export type AsObject = {
    pluginsList: Array<Plugin.AsObject>,
    nextPageToken: string,
  }
}

export class GetPluginVersionRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetPluginVersionRequest;

  getName(): string;
  setName(value: string): GetPluginVersionRequest;

  getVersion(): string;
  setVersion(value: string): GetPluginVersionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPluginVersionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPluginVersionRequest): GetPluginVersionRequest.AsObject;
  static serializeBinaryToWriter(message: GetPluginVersionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPluginVersionRequest;
  static deserializeBinaryFromReader(message: GetPluginVersionRequest, reader: jspb.BinaryReader): GetPluginVersionRequest;
}

export namespace GetPluginVersionRequest {
  export type AsObject = {
    owner: string,
    name: string,
    version: string,
  }
}

export class GetPluginVersionResponse extends jspb.Message {
  getPluginVersion(): PluginVersion | undefined;
  setPluginVersion(value?: PluginVersion): GetPluginVersionResponse;
  hasPluginVersion(): boolean;
  clearPluginVersion(): GetPluginVersionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPluginVersionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPluginVersionResponse): GetPluginVersionResponse.AsObject;
  static serializeBinaryToWriter(message: GetPluginVersionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPluginVersionResponse;
  static deserializeBinaryFromReader(message: GetPluginVersionResponse, reader: jspb.BinaryReader): GetPluginVersionResponse;
}

export namespace GetPluginVersionResponse {
  export type AsObject = {
    pluginVersion?: PluginVersion.AsObject,
  }
}

export class ListPluginVersionsRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ListPluginVersionsRequest;

  getName(): string;
  setName(value: string): ListPluginVersionsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListPluginVersionsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListPluginVersionsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListPluginVersionsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListPluginVersionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListPluginVersionsRequest): ListPluginVersionsRequest.AsObject;
  static serializeBinaryToWriter(message: ListPluginVersionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListPluginVersionsRequest;
  static deserializeBinaryFromReader(message: ListPluginVersionsRequest, reader: jspb.BinaryReader): ListPluginVersionsRequest;
}

export namespace ListPluginVersionsRequest {
  export type AsObject = {
    owner: string,
    name: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListPluginVersionsResponse extends jspb.Message {
  getPluginVersionsList(): Array<PluginVersion>;
  setPluginVersionsList(value: Array<PluginVersion>): ListPluginVersionsResponse;
  clearPluginVersionsList(): ListPluginVersionsResponse;
  addPluginVersions(value?: PluginVersion, index?: number): PluginVersion;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListPluginVersionsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListPluginVersionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListPluginVersionsResponse): ListPluginVersionsResponse.AsObject;
  static serializeBinaryToWriter(message: ListPluginVersionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListPluginVersionsResponse;
  static deserializeBinaryFromReader(message: ListPluginVersionsResponse, reader: jspb.BinaryReader): ListPluginVersionsResponse;
}

export namespace ListPluginVersionsResponse {
  export type AsObject = {
    pluginVersionsList: Array<PluginVersion.AsObject>,
    nextPageToken: string,
  }
}

export class CreatePluginRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): CreatePluginRequest;

  getName(): string;
  setName(value: string): CreatePluginRequest;

  getVisibility(): PluginVisibility;
  setVisibility(value: PluginVisibility): CreatePluginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePluginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreatePluginRequest): CreatePluginRequest.AsObject;
  static serializeBinaryToWriter(message: CreatePluginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatePluginRequest;
  static deserializeBinaryFromReader(message: CreatePluginRequest, reader: jspb.BinaryReader): CreatePluginRequest;
}

export namespace CreatePluginRequest {
  export type AsObject = {
    owner: string,
    name: string,
    visibility: PluginVisibility,
  }
}

export class CreatePluginResponse extends jspb.Message {
  getPlugin(): Plugin | undefined;
  setPlugin(value?: Plugin): CreatePluginResponse;
  hasPlugin(): boolean;
  clearPlugin(): CreatePluginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePluginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreatePluginResponse): CreatePluginResponse.AsObject;
  static serializeBinaryToWriter(message: CreatePluginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatePluginResponse;
  static deserializeBinaryFromReader(message: CreatePluginResponse, reader: jspb.BinaryReader): CreatePluginResponse;
}

export namespace CreatePluginResponse {
  export type AsObject = {
    plugin?: Plugin.AsObject,
  }
}

export class GetPluginRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetPluginRequest;

  getName(): string;
  setName(value: string): GetPluginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPluginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPluginRequest): GetPluginRequest.AsObject;
  static serializeBinaryToWriter(message: GetPluginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPluginRequest;
  static deserializeBinaryFromReader(message: GetPluginRequest, reader: jspb.BinaryReader): GetPluginRequest;
}

export namespace GetPluginRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class GetPluginResponse extends jspb.Message {
  getPlugin(): Plugin | undefined;
  setPlugin(value?: Plugin): GetPluginResponse;
  hasPlugin(): boolean;
  clearPlugin(): GetPluginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPluginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPluginResponse): GetPluginResponse.AsObject;
  static serializeBinaryToWriter(message: GetPluginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPluginResponse;
  static deserializeBinaryFromReader(message: GetPluginResponse, reader: jspb.BinaryReader): GetPluginResponse;
}

export namespace GetPluginResponse {
  export type AsObject = {
    plugin?: Plugin.AsObject,
  }
}

export class DeletePluginRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): DeletePluginRequest;

  getName(): string;
  setName(value: string): DeletePluginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeletePluginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeletePluginRequest): DeletePluginRequest.AsObject;
  static serializeBinaryToWriter(message: DeletePluginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeletePluginRequest;
  static deserializeBinaryFromReader(message: DeletePluginRequest, reader: jspb.BinaryReader): DeletePluginRequest;
}

export namespace DeletePluginRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class DeletePluginResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeletePluginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeletePluginResponse): DeletePluginResponse.AsObject;
  static serializeBinaryToWriter(message: DeletePluginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeletePluginResponse;
  static deserializeBinaryFromReader(message: DeletePluginResponse, reader: jspb.BinaryReader): DeletePluginResponse;
}

export namespace DeletePluginResponse {
  export type AsObject = {
  }
}

export class SetPluginContributorRequest extends jspb.Message {
  getPluginId(): string;
  setPluginId(value: string): SetPluginContributorRequest;

  getUserId(): string;
  setUserId(value: string): SetPluginContributorRequest;

  getPluginRole(): buf_alpha_registry_v1alpha1_role_pb.PluginRole;
  setPluginRole(value: buf_alpha_registry_v1alpha1_role_pb.PluginRole): SetPluginContributorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetPluginContributorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetPluginContributorRequest): SetPluginContributorRequest.AsObject;
  static serializeBinaryToWriter(message: SetPluginContributorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetPluginContributorRequest;
  static deserializeBinaryFromReader(message: SetPluginContributorRequest, reader: jspb.BinaryReader): SetPluginContributorRequest;
}

export namespace SetPluginContributorRequest {
  export type AsObject = {
    pluginId: string,
    userId: string,
    pluginRole: buf_alpha_registry_v1alpha1_role_pb.PluginRole,
  }
}

export class SetPluginContributorResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetPluginContributorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetPluginContributorResponse): SetPluginContributorResponse.AsObject;
  static serializeBinaryToWriter(message: SetPluginContributorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetPluginContributorResponse;
  static deserializeBinaryFromReader(message: SetPluginContributorResponse, reader: jspb.BinaryReader): SetPluginContributorResponse;
}

export namespace SetPluginContributorResponse {
  export type AsObject = {
  }
}

export class ListPluginContributorsRequest extends jspb.Message {
  getPluginId(): string;
  setPluginId(value: string): ListPluginContributorsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListPluginContributorsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListPluginContributorsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListPluginContributorsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListPluginContributorsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListPluginContributorsRequest): ListPluginContributorsRequest.AsObject;
  static serializeBinaryToWriter(message: ListPluginContributorsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListPluginContributorsRequest;
  static deserializeBinaryFromReader(message: ListPluginContributorsRequest, reader: jspb.BinaryReader): ListPluginContributorsRequest;
}

export namespace ListPluginContributorsRequest {
  export type AsObject = {
    pluginId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListPluginContributorsResponse extends jspb.Message {
  getUsersList(): Array<PluginContributor>;
  setUsersList(value: Array<PluginContributor>): ListPluginContributorsResponse;
  clearUsersList(): ListPluginContributorsResponse;
  addUsers(value?: PluginContributor, index?: number): PluginContributor;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListPluginContributorsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListPluginContributorsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListPluginContributorsResponse): ListPluginContributorsResponse.AsObject;
  static serializeBinaryToWriter(message: ListPluginContributorsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListPluginContributorsResponse;
  static deserializeBinaryFromReader(message: ListPluginContributorsResponse, reader: jspb.BinaryReader): ListPluginContributorsResponse;
}

export namespace ListPluginContributorsResponse {
  export type AsObject = {
    usersList: Array<PluginContributor.AsObject>,
    nextPageToken: string,
  }
}

export class DeprecatePluginRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): DeprecatePluginRequest;

  getName(): string;
  setName(value: string): DeprecatePluginRequest;

  getMessage(): string;
  setMessage(value: string): DeprecatePluginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeprecatePluginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeprecatePluginRequest): DeprecatePluginRequest.AsObject;
  static serializeBinaryToWriter(message: DeprecatePluginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeprecatePluginRequest;
  static deserializeBinaryFromReader(message: DeprecatePluginRequest, reader: jspb.BinaryReader): DeprecatePluginRequest;
}

export namespace DeprecatePluginRequest {
  export type AsObject = {
    owner: string,
    name: string,
    message: string,
  }
}

export class DeprecatePluginResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeprecatePluginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeprecatePluginResponse): DeprecatePluginResponse.AsObject;
  static serializeBinaryToWriter(message: DeprecatePluginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeprecatePluginResponse;
  static deserializeBinaryFromReader(message: DeprecatePluginResponse, reader: jspb.BinaryReader): DeprecatePluginResponse;
}

export namespace DeprecatePluginResponse {
  export type AsObject = {
  }
}

export class UndeprecatePluginRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): UndeprecatePluginRequest;

  getName(): string;
  setName(value: string): UndeprecatePluginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UndeprecatePluginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UndeprecatePluginRequest): UndeprecatePluginRequest.AsObject;
  static serializeBinaryToWriter(message: UndeprecatePluginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UndeprecatePluginRequest;
  static deserializeBinaryFromReader(message: UndeprecatePluginRequest, reader: jspb.BinaryReader): UndeprecatePluginRequest;
}

export namespace UndeprecatePluginRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class UndeprecatePluginResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UndeprecatePluginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UndeprecatePluginResponse): UndeprecatePluginResponse.AsObject;
  static serializeBinaryToWriter(message: UndeprecatePluginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UndeprecatePluginResponse;
  static deserializeBinaryFromReader(message: UndeprecatePluginResponse, reader: jspb.BinaryReader): UndeprecatePluginResponse;
}

export namespace UndeprecatePluginResponse {
  export type AsObject = {
  }
}

export class GetTemplateRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetTemplateRequest;

  getName(): string;
  setName(value: string): GetTemplateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTemplateRequest): GetTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: GetTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTemplateRequest;
  static deserializeBinaryFromReader(message: GetTemplateRequest, reader: jspb.BinaryReader): GetTemplateRequest;
}

export namespace GetTemplateRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class GetTemplateResponse extends jspb.Message {
  getTemplate(): Template | undefined;
  setTemplate(value?: Template): GetTemplateResponse;
  hasTemplate(): boolean;
  clearTemplate(): GetTemplateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTemplateResponse): GetTemplateResponse.AsObject;
  static serializeBinaryToWriter(message: GetTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTemplateResponse;
  static deserializeBinaryFromReader(message: GetTemplateResponse, reader: jspb.BinaryReader): GetTemplateResponse;
}

export namespace GetTemplateResponse {
  export type AsObject = {
    template?: Template.AsObject,
  }
}

export class ListTemplatesRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListTemplatesRequest;

  getPageToken(): string;
  setPageToken(value: string): ListTemplatesRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListTemplatesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTemplatesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListTemplatesRequest): ListTemplatesRequest.AsObject;
  static serializeBinaryToWriter(message: ListTemplatesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTemplatesRequest;
  static deserializeBinaryFromReader(message: ListTemplatesRequest, reader: jspb.BinaryReader): ListTemplatesRequest;
}

export namespace ListTemplatesRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListTemplatesResponse extends jspb.Message {
  getTemplatesList(): Array<Template>;
  setTemplatesList(value: Array<Template>): ListTemplatesResponse;
  clearTemplatesList(): ListTemplatesResponse;
  addTemplates(value?: Template, index?: number): Template;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListTemplatesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTemplatesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListTemplatesResponse): ListTemplatesResponse.AsObject;
  static serializeBinaryToWriter(message: ListTemplatesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTemplatesResponse;
  static deserializeBinaryFromReader(message: ListTemplatesResponse, reader: jspb.BinaryReader): ListTemplatesResponse;
}

export namespace ListTemplatesResponse {
  export type AsObject = {
    templatesList: Array<Template.AsObject>,
    nextPageToken: string,
  }
}

export class ListUserTemplatesRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ListUserTemplatesRequest;

  getPageSize(): number;
  setPageSize(value: number): ListUserTemplatesRequest;

  getPageToken(): string;
  setPageToken(value: string): ListUserTemplatesRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListUserTemplatesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUserTemplatesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListUserTemplatesRequest): ListUserTemplatesRequest.AsObject;
  static serializeBinaryToWriter(message: ListUserTemplatesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUserTemplatesRequest;
  static deserializeBinaryFromReader(message: ListUserTemplatesRequest, reader: jspb.BinaryReader): ListUserTemplatesRequest;
}

export namespace ListUserTemplatesRequest {
  export type AsObject = {
    owner: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListUserTemplatesResponse extends jspb.Message {
  getTemplatesList(): Array<Template>;
  setTemplatesList(value: Array<Template>): ListUserTemplatesResponse;
  clearTemplatesList(): ListUserTemplatesResponse;
  addTemplates(value?: Template, index?: number): Template;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListUserTemplatesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUserTemplatesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListUserTemplatesResponse): ListUserTemplatesResponse.AsObject;
  static serializeBinaryToWriter(message: ListUserTemplatesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUserTemplatesResponse;
  static deserializeBinaryFromReader(message: ListUserTemplatesResponse, reader: jspb.BinaryReader): ListUserTemplatesResponse;
}

export namespace ListUserTemplatesResponse {
  export type AsObject = {
    templatesList: Array<Template.AsObject>,
    nextPageToken: string,
  }
}

export class GetTemplateVersionRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetTemplateVersionRequest;

  getName(): string;
  setName(value: string): GetTemplateVersionRequest;

  getVersion(): string;
  setVersion(value: string): GetTemplateVersionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTemplateVersionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTemplateVersionRequest): GetTemplateVersionRequest.AsObject;
  static serializeBinaryToWriter(message: GetTemplateVersionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTemplateVersionRequest;
  static deserializeBinaryFromReader(message: GetTemplateVersionRequest, reader: jspb.BinaryReader): GetTemplateVersionRequest;
}

export namespace GetTemplateVersionRequest {
  export type AsObject = {
    owner: string,
    name: string,
    version: string,
  }
}

export class GetTemplateVersionResponse extends jspb.Message {
  getTemplateVersion(): TemplateVersion | undefined;
  setTemplateVersion(value?: TemplateVersion): GetTemplateVersionResponse;
  hasTemplateVersion(): boolean;
  clearTemplateVersion(): GetTemplateVersionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTemplateVersionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTemplateVersionResponse): GetTemplateVersionResponse.AsObject;
  static serializeBinaryToWriter(message: GetTemplateVersionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTemplateVersionResponse;
  static deserializeBinaryFromReader(message: GetTemplateVersionResponse, reader: jspb.BinaryReader): GetTemplateVersionResponse;
}

export namespace GetTemplateVersionResponse {
  export type AsObject = {
    templateVersion?: TemplateVersion.AsObject,
  }
}

export class ListOrganizationTemplatesRequest extends jspb.Message {
  getOrganization(): string;
  setOrganization(value: string): ListOrganizationTemplatesRequest;

  getPageSize(): number;
  setPageSize(value: number): ListOrganizationTemplatesRequest;

  getPageToken(): string;
  setPageToken(value: string): ListOrganizationTemplatesRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListOrganizationTemplatesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationTemplatesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationTemplatesRequest): ListOrganizationTemplatesRequest.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationTemplatesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationTemplatesRequest;
  static deserializeBinaryFromReader(message: ListOrganizationTemplatesRequest, reader: jspb.BinaryReader): ListOrganizationTemplatesRequest;
}

export namespace ListOrganizationTemplatesRequest {
  export type AsObject = {
    organization: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListOrganizationTemplatesResponse extends jspb.Message {
  getTemplatesList(): Array<Template>;
  setTemplatesList(value: Array<Template>): ListOrganizationTemplatesResponse;
  clearTemplatesList(): ListOrganizationTemplatesResponse;
  addTemplates(value?: Template, index?: number): Template;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListOrganizationTemplatesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOrganizationTemplatesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListOrganizationTemplatesResponse): ListOrganizationTemplatesResponse.AsObject;
  static serializeBinaryToWriter(message: ListOrganizationTemplatesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOrganizationTemplatesResponse;
  static deserializeBinaryFromReader(message: ListOrganizationTemplatesResponse, reader: jspb.BinaryReader): ListOrganizationTemplatesResponse;
}

export namespace ListOrganizationTemplatesResponse {
  export type AsObject = {
    templatesList: Array<Template.AsObject>,
    nextPageToken: string,
  }
}

export class ListTemplateVersionsRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ListTemplateVersionsRequest;

  getName(): string;
  setName(value: string): ListTemplateVersionsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListTemplateVersionsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListTemplateVersionsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListTemplateVersionsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTemplateVersionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListTemplateVersionsRequest): ListTemplateVersionsRequest.AsObject;
  static serializeBinaryToWriter(message: ListTemplateVersionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTemplateVersionsRequest;
  static deserializeBinaryFromReader(message: ListTemplateVersionsRequest, reader: jspb.BinaryReader): ListTemplateVersionsRequest;
}

export namespace ListTemplateVersionsRequest {
  export type AsObject = {
    owner: string,
    name: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListTemplateVersionsResponse extends jspb.Message {
  getTemplateVersionsList(): Array<TemplateVersion>;
  setTemplateVersionsList(value: Array<TemplateVersion>): ListTemplateVersionsResponse;
  clearTemplateVersionsList(): ListTemplateVersionsResponse;
  addTemplateVersions(value?: TemplateVersion, index?: number): TemplateVersion;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListTemplateVersionsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTemplateVersionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListTemplateVersionsResponse): ListTemplateVersionsResponse.AsObject;
  static serializeBinaryToWriter(message: ListTemplateVersionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTemplateVersionsResponse;
  static deserializeBinaryFromReader(message: ListTemplateVersionsResponse, reader: jspb.BinaryReader): ListTemplateVersionsResponse;
}

export namespace ListTemplateVersionsResponse {
  export type AsObject = {
    templateVersionsList: Array<TemplateVersion.AsObject>,
    nextPageToken: string,
  }
}

export class CreateTemplateRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): CreateTemplateRequest;

  getName(): string;
  setName(value: string): CreateTemplateRequest;

  getVisibility(): PluginVisibility;
  setVisibility(value: PluginVisibility): CreateTemplateRequest;

  getPluginConfigsList(): Array<PluginConfig>;
  setPluginConfigsList(value: Array<PluginConfig>): CreateTemplateRequest;
  clearPluginConfigsList(): CreateTemplateRequest;
  addPluginConfigs(value?: PluginConfig, index?: number): PluginConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTemplateRequest): CreateTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: CreateTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTemplateRequest;
  static deserializeBinaryFromReader(message: CreateTemplateRequest, reader: jspb.BinaryReader): CreateTemplateRequest;
}

export namespace CreateTemplateRequest {
  export type AsObject = {
    owner: string,
    name: string,
    visibility: PluginVisibility,
    pluginConfigsList: Array<PluginConfig.AsObject>,
  }
}

export class CreateTemplateResponse extends jspb.Message {
  getTemplate(): Template | undefined;
  setTemplate(value?: Template): CreateTemplateResponse;
  hasTemplate(): boolean;
  clearTemplate(): CreateTemplateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTemplateResponse): CreateTemplateResponse.AsObject;
  static serializeBinaryToWriter(message: CreateTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTemplateResponse;
  static deserializeBinaryFromReader(message: CreateTemplateResponse, reader: jspb.BinaryReader): CreateTemplateResponse;
}

export namespace CreateTemplateResponse {
  export type AsObject = {
    template?: Template.AsObject,
  }
}

export class DeleteTemplateRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): DeleteTemplateRequest;

  getName(): string;
  setName(value: string): DeleteTemplateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTemplateRequest): DeleteTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTemplateRequest;
  static deserializeBinaryFromReader(message: DeleteTemplateRequest, reader: jspb.BinaryReader): DeleteTemplateRequest;
}

export namespace DeleteTemplateRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class DeleteTemplateResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTemplateResponse): DeleteTemplateResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTemplateResponse;
  static deserializeBinaryFromReader(message: DeleteTemplateResponse, reader: jspb.BinaryReader): DeleteTemplateResponse;
}

export namespace DeleteTemplateResponse {
  export type AsObject = {
  }
}

export class CreateTemplateVersionRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateTemplateVersionRequest;

  getTemplateOwner(): string;
  setTemplateOwner(value: string): CreateTemplateVersionRequest;

  getTemplateName(): string;
  setTemplateName(value: string): CreateTemplateVersionRequest;

  getPluginVersionsList(): Array<PluginVersionMapping>;
  setPluginVersionsList(value: Array<PluginVersionMapping>): CreateTemplateVersionRequest;
  clearPluginVersionsList(): CreateTemplateVersionRequest;
  addPluginVersions(value?: PluginVersionMapping, index?: number): PluginVersionMapping;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTemplateVersionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTemplateVersionRequest): CreateTemplateVersionRequest.AsObject;
  static serializeBinaryToWriter(message: CreateTemplateVersionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTemplateVersionRequest;
  static deserializeBinaryFromReader(message: CreateTemplateVersionRequest, reader: jspb.BinaryReader): CreateTemplateVersionRequest;
}

export namespace CreateTemplateVersionRequest {
  export type AsObject = {
    name: string,
    templateOwner: string,
    templateName: string,
    pluginVersionsList: Array<PluginVersionMapping.AsObject>,
  }
}

export class CreateTemplateVersionResponse extends jspb.Message {
  getTemplateVersion(): TemplateVersion | undefined;
  setTemplateVersion(value?: TemplateVersion): CreateTemplateVersionResponse;
  hasTemplateVersion(): boolean;
  clearTemplateVersion(): CreateTemplateVersionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTemplateVersionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTemplateVersionResponse): CreateTemplateVersionResponse.AsObject;
  static serializeBinaryToWriter(message: CreateTemplateVersionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTemplateVersionResponse;
  static deserializeBinaryFromReader(message: CreateTemplateVersionResponse, reader: jspb.BinaryReader): CreateTemplateVersionResponse;
}

export namespace CreateTemplateVersionResponse {
  export type AsObject = {
    templateVersion?: TemplateVersion.AsObject,
  }
}

export class SetTemplateContributorRequest extends jspb.Message {
  getTemplateId(): string;
  setTemplateId(value: string): SetTemplateContributorRequest;

  getUserId(): string;
  setUserId(value: string): SetTemplateContributorRequest;

  getTemplateRole(): buf_alpha_registry_v1alpha1_role_pb.TemplateRole;
  setTemplateRole(value: buf_alpha_registry_v1alpha1_role_pb.TemplateRole): SetTemplateContributorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetTemplateContributorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetTemplateContributorRequest): SetTemplateContributorRequest.AsObject;
  static serializeBinaryToWriter(message: SetTemplateContributorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetTemplateContributorRequest;
  static deserializeBinaryFromReader(message: SetTemplateContributorRequest, reader: jspb.BinaryReader): SetTemplateContributorRequest;
}

export namespace SetTemplateContributorRequest {
  export type AsObject = {
    templateId: string,
    userId: string,
    templateRole: buf_alpha_registry_v1alpha1_role_pb.TemplateRole,
  }
}

export class SetTemplateContributorResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetTemplateContributorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetTemplateContributorResponse): SetTemplateContributorResponse.AsObject;
  static serializeBinaryToWriter(message: SetTemplateContributorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetTemplateContributorResponse;
  static deserializeBinaryFromReader(message: SetTemplateContributorResponse, reader: jspb.BinaryReader): SetTemplateContributorResponse;
}

export namespace SetTemplateContributorResponse {
  export type AsObject = {
  }
}

export class ListTemplateContributorsRequest extends jspb.Message {
  getTemplateId(): string;
  setTemplateId(value: string): ListTemplateContributorsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListTemplateContributorsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListTemplateContributorsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListTemplateContributorsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTemplateContributorsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListTemplateContributorsRequest): ListTemplateContributorsRequest.AsObject;
  static serializeBinaryToWriter(message: ListTemplateContributorsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTemplateContributorsRequest;
  static deserializeBinaryFromReader(message: ListTemplateContributorsRequest, reader: jspb.BinaryReader): ListTemplateContributorsRequest;
}

export namespace ListTemplateContributorsRequest {
  export type AsObject = {
    templateId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListTemplateContributorsResponse extends jspb.Message {
  getUsersList(): Array<TemplateContributor>;
  setUsersList(value: Array<TemplateContributor>): ListTemplateContributorsResponse;
  clearUsersList(): ListTemplateContributorsResponse;
  addUsers(value?: TemplateContributor, index?: number): TemplateContributor;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListTemplateContributorsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTemplateContributorsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListTemplateContributorsResponse): ListTemplateContributorsResponse.AsObject;
  static serializeBinaryToWriter(message: ListTemplateContributorsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTemplateContributorsResponse;
  static deserializeBinaryFromReader(message: ListTemplateContributorsResponse, reader: jspb.BinaryReader): ListTemplateContributorsResponse;
}

export namespace ListTemplateContributorsResponse {
  export type AsObject = {
    usersList: Array<TemplateContributor.AsObject>,
    nextPageToken: string,
  }
}

export class DeprecateTemplateRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): DeprecateTemplateRequest;

  getName(): string;
  setName(value: string): DeprecateTemplateRequest;

  getMessage(): string;
  setMessage(value: string): DeprecateTemplateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeprecateTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeprecateTemplateRequest): DeprecateTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: DeprecateTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeprecateTemplateRequest;
  static deserializeBinaryFromReader(message: DeprecateTemplateRequest, reader: jspb.BinaryReader): DeprecateTemplateRequest;
}

export namespace DeprecateTemplateRequest {
  export type AsObject = {
    owner: string,
    name: string,
    message: string,
  }
}

export class DeprecateTemplateResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeprecateTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeprecateTemplateResponse): DeprecateTemplateResponse.AsObject;
  static serializeBinaryToWriter(message: DeprecateTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeprecateTemplateResponse;
  static deserializeBinaryFromReader(message: DeprecateTemplateResponse, reader: jspb.BinaryReader): DeprecateTemplateResponse;
}

export namespace DeprecateTemplateResponse {
  export type AsObject = {
  }
}

export class UndeprecateTemplateRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): UndeprecateTemplateRequest;

  getName(): string;
  setName(value: string): UndeprecateTemplateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UndeprecateTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UndeprecateTemplateRequest): UndeprecateTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: UndeprecateTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UndeprecateTemplateRequest;
  static deserializeBinaryFromReader(message: UndeprecateTemplateRequest, reader: jspb.BinaryReader): UndeprecateTemplateRequest;
}

export namespace UndeprecateTemplateRequest {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class UndeprecateTemplateResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UndeprecateTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UndeprecateTemplateResponse): UndeprecateTemplateResponse.AsObject;
  static serializeBinaryToWriter(message: UndeprecateTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UndeprecateTemplateResponse;
  static deserializeBinaryFromReader(message: UndeprecateTemplateResponse, reader: jspb.BinaryReader): UndeprecateTemplateResponse;
}

export namespace UndeprecateTemplateResponse {
  export type AsObject = {
  }
}

export enum PluginVisibility { 
  PLUGIN_VISIBILITY_UNSPECIFIED = 0,
  PLUGIN_VISIBILITY_PUBLIC = 1,
  PLUGIN_VISIBILITY_PRIVATE = 2,
}
