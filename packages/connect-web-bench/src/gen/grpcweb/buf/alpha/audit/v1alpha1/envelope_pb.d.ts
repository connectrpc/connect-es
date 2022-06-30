import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as buf_alpha_rpc_v1alpha1_error_pb from '../../../../buf/alpha/rpc/v1alpha1/error_pb';
import * as buf_alpha_module_v1alpha1_module_pb from '../../../../buf/alpha/module/v1alpha1/module_pb';
import * as buf_alpha_audit_v1alpha1_role_pb from '../../../../buf/alpha/audit/v1alpha1/role_pb';
import * as buf_alpha_audit_v1alpha1_plugin_pb from '../../../../buf/alpha/audit/v1alpha1/plugin_pb';
import * as buf_alpha_audit_v1alpha1_repository_pb from '../../../../buf/alpha/audit/v1alpha1/repository_pb';
import * as buf_alpha_audit_v1alpha1_module_pb from '../../../../buf/alpha/audit/v1alpha1/module_pb';
import * as buf_alpha_audit_v1alpha1_search_pb from '../../../../buf/alpha/audit/v1alpha1/search_pb';
import * as buf_alpha_audit_v1alpha1_user_pb from '../../../../buf/alpha/audit/v1alpha1/user_pb';


export class ActionBufAlphaRegistryV1Alpha1DownloadInfo extends jspb.Message {
  getReference(): string;
  setReference(value: string): ActionBufAlphaRegistryV1Alpha1DownloadInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DownloadInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DownloadInfo): ActionBufAlphaRegistryV1Alpha1DownloadInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DownloadInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DownloadInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DownloadInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DownloadInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DownloadInfo {
  export type AsObject = {
    reference: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1GetImageInfo extends jspb.Message {
  getReference(): string;
  setReference(value: string): ActionBufAlphaRegistryV1Alpha1GetImageInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1GetImageInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1GetImageInfo): ActionBufAlphaRegistryV1Alpha1GetImageInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1GetImageInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1GetImageInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1GetImageInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1GetImageInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1GetImageInfo {
  export type AsObject = {
    reference: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo extends jspb.Message {
  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo): ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo {
  export type AsObject = {
    name: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo {
  export type AsObject = {
    organizationId: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo extends jspb.Message {
  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo {
  export type AsObject = {
    name: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo;

  getUserId(): string;
  setUserId(value: string): ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo;

  getOrganizationRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole;
  setOrganizationRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole): ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo): ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo {
  export type AsObject = {
    organizationId: string,
    userId: string,
    organizationRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole,
  }
}

export class ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo;

  getUserId(): string;
  setUserId(value: string): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo;

  getOrganizationRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole;
  setOrganizationRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo {
  export type AsObject = {
    organizationId: string,
    userId: string,
    organizationRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole,
  }
}

export class ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo;

  getUserId(): string;
  setUserId(value: string): ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo): ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo {
  export type AsObject = {
    organizationId: string,
    userId: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo;

  getRepositoryBaseRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1RepositoryRole;
  setRepositoryBaseRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1RepositoryRole): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo;

  getPluginBaseRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1PluginRole;
  setPluginBaseRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1PluginRole): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo;

  getTemplateBaseRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1TemplateRole;
  setTemplateBaseRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1TemplateRole): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo {
  export type AsObject = {
    organizationId: string,
    repositoryBaseRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1RepositoryRole,
    pluginBaseRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1PluginRole,
    templateBaseRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1TemplateRole,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreatePluginInfo extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ActionBufAlphaRegistryV1Alpha1CreatePluginInfo;

  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1CreatePluginInfo;

  getVisibility(): buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVisibility;
  setVisibility(value: buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVisibility): ActionBufAlphaRegistryV1Alpha1CreatePluginInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreatePluginInfo): ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreatePluginInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreatePluginInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreatePluginInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreatePluginInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreatePluginInfo {
  export type AsObject = {
    owner: string,
    name: string,
    visibility: buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVisibility,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeletePluginInfo extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ActionBufAlphaRegistryV1Alpha1DeletePluginInfo;

  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1DeletePluginInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeletePluginInfo): ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeletePluginInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeletePluginInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeletePluginInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeletePluginInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeletePluginInfo {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo): ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo {
  export type AsObject = {
    version: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;

  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;

  getVisibility(): buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVisibility;
  setVisibility(value: buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVisibility): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;

  getPluginConfigsList(): Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig>;
  setPluginConfigsList(value: Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig>): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;
  clearPluginConfigsList(): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;
  addPluginConfigs(value?: buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig, index?: number): buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo {
  export type AsObject = {
    owner: string,
    name: string,
    visibility: buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVisibility,
    pluginConfigsList: Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig.AsObject>,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo;

  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo): ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo {
  export type AsObject = {
    owner: string,
    name: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo extends jspb.Message {
  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;

  getTemplateOwner(): string;
  setTemplateOwner(value: string): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;

  getTemplateName(): string;
  setTemplateName(value: string): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;

  getPluginVersionsList(): Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping>;
  setPluginVersionsList(value: Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping>): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;
  clearPluginVersionsList(): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;
  addPluginVersions(value?: buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping, index?: number): buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo {
  export type AsObject = {
    name: string,
    templateOwner: string,
    templateName: string,
    pluginVersionsList: Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping.AsObject>,
  }
}

export class ActionBufAlphaRegistryV1Alpha1PushInfo extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): ActionBufAlphaRegistryV1Alpha1PushInfo;

  getRepository(): string;
  setRepository(value: string): ActionBufAlphaRegistryV1Alpha1PushInfo;

  getBranch(): string;
  setBranch(value: string): ActionBufAlphaRegistryV1Alpha1PushInfo;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): ActionBufAlphaRegistryV1Alpha1PushInfo;
  clearTagsList(): ActionBufAlphaRegistryV1Alpha1PushInfo;
  addTags(value: string, index?: number): ActionBufAlphaRegistryV1Alpha1PushInfo;

  getLocalModulePinBranch(): string;
  setLocalModulePinBranch(value: string): ActionBufAlphaRegistryV1Alpha1PushInfo;

  getLocalModulePinCommit(): string;
  setLocalModulePinCommit(value: string): ActionBufAlphaRegistryV1Alpha1PushInfo;

  getLocalModulePinDigest(): string;
  setLocalModulePinDigest(value: string): ActionBufAlphaRegistryV1Alpha1PushInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1PushInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1PushInfo): ActionBufAlphaRegistryV1Alpha1PushInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1PushInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1PushInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1PushInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1PushInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1PushInfo {
  export type AsObject = {
    owner: string,
    repository: string,
    branch: string,
    tagsList: Array<string>,
    localModulePinBranch: string,
    localModulePinCommit: string,
    localModulePinDigest: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo extends jspb.Message {
  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;

  getBranch(): buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryBranch | undefined;
  setBranch(value?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryBranch): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;
  hasBranch(): boolean;
  clearBranch(): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;

  getTag(): buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTag | undefined;
  setTag(value?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTag): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;
  hasTag(): boolean;
  clearTag(): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;

  getCommit(): buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryCommit | undefined;
  setCommit(value?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryCommit): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;
  hasCommit(): boolean;
  clearCommit(): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;

  getTrack(): buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack | undefined;
  setTrack(value?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;
  hasTrack(): boolean;
  clearTrack(): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;

  getReferenceCase(): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.ReferenceCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo {
  export type AsObject = {
    name: string,
    branch?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryBranch.AsObject,
    tag?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTag.AsObject,
    commit?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryCommit.AsObject,
    track?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack.AsObject,
  }

  export enum ReferenceCase { 
    REFERENCE_NOT_SET = 0,
    BRANCH = 2,
    TAG = 3,
    COMMIT = 4,
    TRACK = 5,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo extends jspb.Message {
  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo;

  getParentBranch(): string;
  setParentBranch(value: string): ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo): ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo {
  export type AsObject = {
    name: string,
    parentBranch: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo extends jspb.Message {
  getRepositoryBranchName(): string;
  setRepositoryBranchName(value: string): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo {
  export type AsObject = {
    repositoryBranchName: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo extends jspb.Message {
  getReference(): string;
  setReference(value: string): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo {
  export type AsObject = {
    reference: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo extends jspb.Message {
  getReference(): string;
  setReference(value: string): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo {
  export type AsObject = {
    reference: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo extends jspb.Message {
  getRepositoryBranchName(): string;
  setRepositoryBranchName(value: string): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo;

  getCommitSequenceId(): number;
  setCommitSequenceId(value: number): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo {
  export type AsObject = {
    repositoryBranchName: string,
    commitSequenceId: number,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo;

  getName(): string;
  setName(value: string): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo;

  getCommitName(): string;
  setCommitName(value: string): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo {
  export type AsObject = {
    repositoryId: string,
    name: string,
    commitName: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo extends jspb.Message {
  getFullName(): string;
  setFullName(value: string): ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo;

  getVisibility(): buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1Visibility;
  setVisibility(value: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1Visibility): ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo): ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo {
  export type AsObject = {
    fullName: string,
    visibility: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1Visibility,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo {
  export type AsObject = {
    repositoryId: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo extends jspb.Message {
  getFullName(): string;
  setFullName(value: string): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo {
  export type AsObject = {
    fullName: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo extends jspb.Message {
  getOwnerName(): string;
  setOwnerName(value: string): ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo;

  getRepositoryName(): string;
  setRepositoryName(value: string): ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo;

  getDeprecationMessage(): string;
  setDeprecationMessage(value: string): ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo): ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo {
  export type AsObject = {
    ownerName: string,
    repositoryName: string,
    deprecationMessage: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo extends jspb.Message {
  getOwnerName(): string;
  setOwnerName(value: string): ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo;

  getRepositoryName(): string;
  setRepositoryName(value: string): ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo): ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo {
  export type AsObject = {
    ownerName: string,
    repositoryName: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo extends jspb.Message {
  getModuleReferencesList(): Array<buf_alpha_module_v1alpha1_module_pb.ModuleReference>;
  setModuleReferencesList(value: Array<buf_alpha_module_v1alpha1_module_pb.ModuleReference>): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
  clearModuleReferencesList(): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
  addModuleReferences(value?: buf_alpha_module_v1alpha1_module_pb.ModuleReference, index?: number): buf_alpha_module_v1alpha1_module_pb.ModuleReference;

  getCurrentModulePinsList(): Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>;
  setCurrentModulePinsList(value: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
  clearCurrentModulePinsList(): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
  addCurrentModulePins(value?: buf_alpha_module_v1alpha1_module_pb.ModulePin, index?: number): buf_alpha_module_v1alpha1_module_pb.ModulePin;

  getModulePinsResultsList(): Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>;
  setModulePinsResultsList(value: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
  clearModulePinsResultsList(): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
  addModulePinsResults(value?: buf_alpha_module_v1alpha1_module_pb.ModulePin, index?: number): buf_alpha_module_v1alpha1_module_pb.ModulePin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo {
  export type AsObject = {
    moduleReferencesList: Array<buf_alpha_module_v1alpha1_module_pb.ModuleReference.AsObject>,
    currentModulePinsList: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin.AsObject>,
    modulePinsResultsList: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin.AsObject>,
  }
}

export class ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo extends jspb.Message {
  getLocalModuleReferencesList(): Array<buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference>;
  setLocalModuleReferencesList(value: Array<buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference>): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
  clearLocalModuleReferencesList(): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
  addLocalModuleReferences(value?: buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference, index?: number): buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference;

  getLocalModuleResolveResultsList(): Array<buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult>;
  setLocalModuleResolveResultsList(value: Array<buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult>): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
  clearLocalModuleResolveResultsList(): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
  addLocalModuleResolveResults(value?: buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult, index?: number): buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult;

  getDependenciesList(): Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>;
  setDependenciesList(value: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
  clearDependenciesList(): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
  addDependencies(value?: buf_alpha_module_v1alpha1_module_pb.ModulePin, index?: number): buf_alpha_module_v1alpha1_module_pb.ModulePin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo {
  export type AsObject = {
    localModuleReferencesList: Array<buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference.AsObject>,
    localModuleResolveResultsList: Array<buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult.AsObject>,
    dependenciesList: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin.AsObject>,
  }
}

export class ActionBufAlphaRegistryV1Alpha1SearchInfo extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): ActionBufAlphaRegistryV1Alpha1SearchInfo;

  getFiltersList(): Array<buf_alpha_audit_v1alpha1_search_pb.BufAlphaRegistryV1Alpha1SearchFilter>;
  setFiltersList(value: Array<buf_alpha_audit_v1alpha1_search_pb.BufAlphaRegistryV1Alpha1SearchFilter>): ActionBufAlphaRegistryV1Alpha1SearchInfo;
  clearFiltersList(): ActionBufAlphaRegistryV1Alpha1SearchInfo;
  addFilters(value: buf_alpha_audit_v1alpha1_search_pb.BufAlphaRegistryV1Alpha1SearchFilter, index?: number): ActionBufAlphaRegistryV1Alpha1SearchInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1SearchInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1SearchInfo): ActionBufAlphaRegistryV1Alpha1SearchInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1SearchInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1SearchInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1SearchInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1SearchInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1SearchInfo {
  export type AsObject = {
    query: string,
    filtersList: Array<buf_alpha_audit_v1alpha1_search_pb.BufAlphaRegistryV1Alpha1SearchFilter>,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateTokenInfo extends jspb.Message {
  getNote(): string;
  setNote(value: string): ActionBufAlphaRegistryV1Alpha1CreateTokenInfo;

  getExpireTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExpireTime(value?: google_protobuf_timestamp_pb.Timestamp): ActionBufAlphaRegistryV1Alpha1CreateTokenInfo;
  hasExpireTime(): boolean;
  clearExpireTime(): ActionBufAlphaRegistryV1Alpha1CreateTokenInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateTokenInfo): ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateTokenInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateTokenInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateTokenInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateTokenInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateTokenInfo {
  export type AsObject = {
    note: string,
    expireTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo extends jspb.Message {
  getTokenId(): string;
  setTokenId(value: string): ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo): ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo {
  export type AsObject = {
    tokenId: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateUserInfo extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): ActionBufAlphaRegistryV1Alpha1CreateUserInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateUserInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateUserInfo): ActionBufAlphaRegistryV1Alpha1CreateUserInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateUserInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateUserInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateUserInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateUserInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateUserInfo {
  export type AsObject = {
    username: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1ListUsersInfo extends jspb.Message {
  getUserStateFilter(): buf_alpha_audit_v1alpha1_user_pb.BufAlphaRegistryV1Alpha1UserState;
  setUserStateFilter(value: buf_alpha_audit_v1alpha1_user_pb.BufAlphaRegistryV1Alpha1UserState): ActionBufAlphaRegistryV1Alpha1ListUsersInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1ListUsersInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1ListUsersInfo): ActionBufAlphaRegistryV1Alpha1ListUsersInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1ListUsersInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1ListUsersInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1ListUsersInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1ListUsersInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1ListUsersInfo {
  export type AsObject = {
    userStateFilter: buf_alpha_audit_v1alpha1_user_pb.BufAlphaRegistryV1Alpha1UserState,
  }
}

export class ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo): ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo {
  export type AsObject = {
    userId: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo;

  getServerRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1ServerRole;
  setServerRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1ServerRole): ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo): ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo {
  export type AsObject = {
    userId: string,
    serverRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1ServerRole,
  }
}

export class ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo extends jspb.Message {
  getName(): string;
  setName(value: string): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo;

  getImageDigest(): string;
  setImageDigest(value: string): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo;

  getRuntimeLibrariesList(): Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>;
  setRuntimeLibrariesList(value: Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo;
  clearRuntimeLibrariesList(): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo;
  addRuntimeLibraries(value?: buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, index?: number): buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo;
}

export namespace ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo {
  export type AsObject = {
    name: string,
    imageDigest: string,
    runtimeLibrariesList: Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.AsObject>,
  }
}

export class ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo extends jspb.Message {
  getName(): string;
  setName(value: string): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo;

  getImageDigest(): string;
  setImageDigest(value: string): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo;

  getRuntimeLibrariesList(): Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>;
  setRuntimeLibrariesList(value: Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo;
  clearRuntimeLibrariesList(): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo;
  addRuntimeLibraries(value?: buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, index?: number): buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo;
}

export namespace ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo {
  export type AsObject = {
    name: string,
    imageDigest: string,
    runtimeLibrariesList: Array<buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.AsObject>,
  }
}

export class ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo extends jspb.Message {
  getName(): string;
  setName(value: string): ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo): ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo;
}

export namespace ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo {
  export type AsObject = {
    name: string,
  }
}

export class ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo extends jspb.Message {
  getRepositoryRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1RepositoryRole;
  setRepositoryRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1RepositoryRole): ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo): ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo {
  export type AsObject = {
    repositoryRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1RepositoryRole,
  }
}

export class ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo extends jspb.Message {
  getPluginRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1PluginRole;
  setPluginRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1PluginRole): ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo): ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo {
  export type AsObject = {
    pluginRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1PluginRole,
  }
}

export class ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo extends jspb.Message {
  getTemplateRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1TemplateRole;
  setTemplateRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1TemplateRole): ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo): ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo {
  export type AsObject = {
    templateRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1TemplateRole,
  }
}

export class ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo extends jspb.Message {
  getTrack(): buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack | undefined;
  setTrack(value?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo;
  hasTrack(): boolean;
  clearTrack(): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo {
  export type AsObject = {
    track?: buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack.AsObject,
  }
}

export class ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo extends jspb.Message {
  getOrganizationRole(): buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole;
  setOrganizationRole(value: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole): ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo): ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo;
}

export namespace ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo {
  export type AsObject = {
    organizationRole: buf_alpha_audit_v1alpha1_role_pb.BufAlphaRegistryV1Alpha1OrganizationRole,
  }
}

export class ActionBufAlphaRegistryV1Alpha1GetJSONSchema extends jspb.Message {
  getReference(): string;
  setReference(value: string): ActionBufAlphaRegistryV1Alpha1GetJSONSchema;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionBufAlphaRegistryV1Alpha1GetJSONSchema.AsObject;
  static toObject(includeInstance: boolean, msg: ActionBufAlphaRegistryV1Alpha1GetJSONSchema): ActionBufAlphaRegistryV1Alpha1GetJSONSchema.AsObject;
  static serializeBinaryToWriter(message: ActionBufAlphaRegistryV1Alpha1GetJSONSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionBufAlphaRegistryV1Alpha1GetJSONSchema;
  static deserializeBinaryFromReader(message: ActionBufAlphaRegistryV1Alpha1GetJSONSchema, reader: jspb.BinaryReader): ActionBufAlphaRegistryV1Alpha1GetJSONSchema;
}

export namespace ActionBufAlphaRegistryV1Alpha1GetJSONSchema {
  export type AsObject = {
    reference: string,
  }
}

export class Event extends jspb.Message {
  getEventId(): string;
  setEventId(value: string): Event;

  getUser(): UserActor | undefined;
  setUser(value?: UserActor): Event;
  hasUser(): boolean;
  clearUser(): Event;

  getEventTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEventTime(value?: google_protobuf_timestamp_pb.Timestamp): Event;
  hasEventTime(): boolean;
  clearEventTime(): Event;

  getService(): string;
  setService(value: string): Event;

  getMethod(): string;
  setMethod(value: string): Event;

  getTraceId(): string;
  setTraceId(value: string): Event;

  getSpanId(): string;
  setSpanId(value: string): Event;

  getObjectsList(): Array<Object>;
  setObjectsList(value: Array<Object>): Event;
  clearObjectsList(): Event;
  addObjects(value?: Object, index?: number): Object;

  getErrorMessage(): string;
  setErrorMessage(value: string): Event;

  getErrorCode(): buf_alpha_rpc_v1alpha1_error_pb.ErrorCode;
  setErrorCode(value: buf_alpha_rpc_v1alpha1_error_pb.ErrorCode): Event;

  getAction(): Action;
  setAction(value: Action): Event;

  getActionBufAlphaRegistryV1alpha1DownloadInfo(): ActionBufAlphaRegistryV1Alpha1DownloadInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DownloadInfo(value?: ActionBufAlphaRegistryV1Alpha1DownloadInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DownloadInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DownloadInfo(): Event;

  getActionBufAlphaRegistryV1alpha1GetImageInfo(): ActionBufAlphaRegistryV1Alpha1GetImageInfo | undefined;
  setActionBufAlphaRegistryV1alpha1GetImageInfo(value?: ActionBufAlphaRegistryV1Alpha1GetImageInfo): Event;
  hasActionBufAlphaRegistryV1alpha1GetImageInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1GetImageInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateOrganizationInfo(): ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateOrganizationInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateOrganizationInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateOrganizationInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo(): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo(value?: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo(): ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo(value?: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo(): Event;

  getActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo(): ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo | undefined;
  setActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo(value?: ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo): Event;
  hasActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo(): Event;

  getActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo(): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo | undefined;
  setActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo(value?: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo): Event;
  hasActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo(): Event;

  getActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo(): ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo | undefined;
  setActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo(value?: ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo): Event;
  hasActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo(): Event;

  getActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo(): ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo | undefined;
  setActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo(value?: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo): Event;
  hasActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreatePluginInfo(): ActionBufAlphaRegistryV1Alpha1CreatePluginInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreatePluginInfo(value?: ActionBufAlphaRegistryV1Alpha1CreatePluginInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreatePluginInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreatePluginInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeletePluginInfo(): ActionBufAlphaRegistryV1Alpha1DeletePluginInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeletePluginInfo(value?: ActionBufAlphaRegistryV1Alpha1DeletePluginInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeletePluginInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeletePluginInfo(): Event;

  getActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo(): ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo | undefined;
  setActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo(value?: ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo): Event;
  hasActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateTemplateInfo(): ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateTemplateInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateTemplateInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateTemplateInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeleteTemplateInfo(): ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeleteTemplateInfo(value?: ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeleteTemplateInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeleteTemplateInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo(): ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo(): Event;

  getActionBufAlphaRegistryV1alpha1PushInfo(): ActionBufAlphaRegistryV1Alpha1PushInfo | undefined;
  setActionBufAlphaRegistryV1alpha1PushInfo(value?: ActionBufAlphaRegistryV1Alpha1PushInfo): Event;
  hasActionBufAlphaRegistryV1alpha1PushInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1PushInfo(): Event;

  getActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo(): ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo | undefined;
  setActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo(value?: ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo): Event;
  hasActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo(): ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo(): Event;

  getActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo(): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo | undefined;
  setActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo(value?: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo): Event;
  hasActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo(): Event;

  getActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo(): ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo | undefined;
  setActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo(value?: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo): Event;
  hasActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo(): Event;

  getActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo(): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo | undefined;
  setActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo(value?: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo): Event;
  hasActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo(): Event;

  getActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo(): ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo | undefined;
  setActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo(value?: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo): Event;
  hasActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo(): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo(): ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo(): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo(value?: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo(): ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo(value?: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo(): ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo(value?: ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo(): Event;

  getActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo(): ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo | undefined;
  setActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo(value?: ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo): Event;
  hasActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo(): Event;

  getActionBufAlphaRegistryV1alpha1GetModulePinsInfo(): ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo | undefined;
  setActionBufAlphaRegistryV1alpha1GetModulePinsInfo(value?: ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo): Event;
  hasActionBufAlphaRegistryV1alpha1GetModulePinsInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1GetModulePinsInfo(): Event;

  getActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo(): ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo | undefined;
  setActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo(value?: ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo): Event;
  hasActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo(): Event;

  getActionBufAlphaRegistryV1alpha1SearchInfo(): ActionBufAlphaRegistryV1Alpha1SearchInfo | undefined;
  setActionBufAlphaRegistryV1alpha1SearchInfo(value?: ActionBufAlphaRegistryV1Alpha1SearchInfo): Event;
  hasActionBufAlphaRegistryV1alpha1SearchInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1SearchInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateTokenInfo(): ActionBufAlphaRegistryV1Alpha1CreateTokenInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateTokenInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateTokenInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateTokenInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateTokenInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeleteTokenInfo(): ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeleteTokenInfo(value?: ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeleteTokenInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeleteTokenInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateUserInfo(): ActionBufAlphaRegistryV1Alpha1CreateUserInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateUserInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateUserInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateUserInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateUserInfo(): Event;

  getActionBufAlphaRegistryV1alpha1ListUsersInfo(): ActionBufAlphaRegistryV1Alpha1ListUsersInfo | undefined;
  setActionBufAlphaRegistryV1alpha1ListUsersInfo(value?: ActionBufAlphaRegistryV1Alpha1ListUsersInfo): Event;
  hasActionBufAlphaRegistryV1alpha1ListUsersInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1ListUsersInfo(): Event;

  getActionBufAlphaRegistryV1alpha1DeactivateUserInfo(): ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo | undefined;
  setActionBufAlphaRegistryV1alpha1DeactivateUserInfo(value?: ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo): Event;
  hasActionBufAlphaRegistryV1alpha1DeactivateUserInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1DeactivateUserInfo(): Event;

  getActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo(): ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo | undefined;
  setActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo(value?: ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo): Event;
  hasActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo(): Event;

  getActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo(): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo | undefined;
  setActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo(value?: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo): Event;
  hasActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo(): boolean;
  clearActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo(): Event;

  getActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo(): ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo | undefined;
  setActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo(value?: ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo): Event;
  hasActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo(): boolean;
  clearActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo(): Event;

  getActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo(): ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo | undefined;
  setActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo(value?: ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo): Event;
  hasActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo(): Event;

  getActionBufAlphaRegistryV1alpha1SetPluginContributorInfo(): ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo | undefined;
  setActionBufAlphaRegistryV1alpha1SetPluginContributorInfo(value?: ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo): Event;
  hasActionBufAlphaRegistryV1alpha1SetPluginContributorInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1SetPluginContributorInfo(): Event;

  getActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo(): ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo | undefined;
  setActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo(value?: ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo): Event;
  hasActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo(): Event;

  getActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo(): ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo | undefined;
  setActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo(value?: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo): Event;
  hasActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo(): boolean;
  clearActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo(): Event;

  getActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo(): ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo | undefined;
  setActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo(value?: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo): Event;
  hasActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo(): Event;

  getActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo(): ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo | undefined;
  setActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo(value?: ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo): Event;
  hasActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo(): boolean;
  clearActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo(): Event;

  getActionBufAlphaRegistryV1alpha1GetJsonschema(): ActionBufAlphaRegistryV1Alpha1GetJSONSchema | undefined;
  setActionBufAlphaRegistryV1alpha1GetJsonschema(value?: ActionBufAlphaRegistryV1Alpha1GetJSONSchema): Event;
  hasActionBufAlphaRegistryV1alpha1GetJsonschema(): boolean;
  clearActionBufAlphaRegistryV1alpha1GetJsonschema(): Event;

  getActorCase(): Event.ActorCase;

  getActionDetailsCase(): Event.ActionDetailsCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    eventId: string,
    user?: UserActor.AsObject,
    eventTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    service: string,
    method: string,
    traceId: string,
    spanId: string,
    objectsList: Array<Object.AsObject>,
    errorMessage: string,
    errorCode: buf_alpha_rpc_v1alpha1_error_pb.ErrorCode,
    action: Action,
    actionBufAlphaRegistryV1alpha1DownloadInfo?: ActionBufAlphaRegistryV1Alpha1DownloadInfo.AsObject,
    actionBufAlphaRegistryV1alpha1GetImageInfo?: ActionBufAlphaRegistryV1Alpha1GetImageInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateOrganizationInfo?: ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeleteOrganizationInfo?: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo?: ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.AsObject,
    actionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo?: ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.AsObject,
    actionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo?: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.AsObject,
    actionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo?: ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.AsObject,
    actionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo?: ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreatePluginInfo?: ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeletePluginInfo?: ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.AsObject,
    actionBufAlphaRegistryV1alpha1GetTemplateVersionInfo?: ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateTemplateInfo?: ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeleteTemplateInfo?: ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo?: ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.AsObject,
    actionBufAlphaRegistryV1alpha1PushInfo?: ActionBufAlphaRegistryV1Alpha1PushInfo.AsObject,
    actionBufAlphaRegistryV1alpha1GetReferenceByNameInfo?: ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo?: ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.AsObject,
    actionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo?: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.AsObject,
    actionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo?: ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.AsObject,
    actionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo?: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.AsObject,
    actionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo?: ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo?: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo?: ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeleteRepositoryInfo?: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo?: ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo?: ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.AsObject,
    actionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo?: ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.AsObject,
    actionBufAlphaRegistryV1alpha1GetModulePinsInfo?: ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.AsObject,
    actionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo?: ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.AsObject,
    actionBufAlphaRegistryV1alpha1SearchInfo?: ActionBufAlphaRegistryV1Alpha1SearchInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateTokenInfo?: ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeleteTokenInfo?: ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateUserInfo?: ActionBufAlphaRegistryV1Alpha1CreateUserInfo.AsObject,
    actionBufAlphaRegistryV1alpha1ListUsersInfo?: ActionBufAlphaRegistryV1Alpha1ListUsersInfo.AsObject,
    actionBufAlphaRegistryV1alpha1DeactivateUserInfo?: ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.AsObject,
    actionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo?: ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.AsObject,
    actionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo?: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.AsObject,
    actionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo?: ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.AsObject,
    actionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo?: ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.AsObject,
    actionBufAlphaRegistryV1alpha1SetPluginContributorInfo?: ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.AsObject,
    actionBufAlphaRegistryV1alpha1SetTemplateContributorInfo?: ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.AsObject,
    actionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo?: ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.AsObject,
    actionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo?: ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.AsObject,
    actionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo?: ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.AsObject,
    actionBufAlphaRegistryV1alpha1GetJsonschema?: ActionBufAlphaRegistryV1Alpha1GetJSONSchema.AsObject,
  }

  export enum ActorCase { 
    ACTOR_NOT_SET = 0,
    USER = 2,
  }

  export enum ActionDetailsCase { 
    ACTION_DETAILS_NOT_SET = 0,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DOWNLOAD_INFO = 12,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_IMAGE_INFO = 13,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_ORGANIZATION_INFO = 14,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_ORGANIZATION_INFO = 15,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_ORGANIZATION_BY_NAME_INFO = 16,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_ADD_ORGANIZATION_MEMBER_INFO = 17,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_UPDATE_ORGANIZATION_MEMBER_INFO = 18,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_REMOVE_ORGANIZATION_MEMBER_INFO = 19,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_UPDATE_ORGANIZATION_SETTINGS_INFO = 20,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_PLUGIN_INFO = 21,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_PLUGIN_INFO = 22,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_TEMPLATE_VERSION_INFO = 23,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_TEMPLATE_INFO = 24,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_TEMPLATE_INFO = 25,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_TEMPLATE_VERSION_INFO = 26,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_PUSH_INFO = 27,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_REFERENCE_BY_NAME_INFO = 28,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_REPOSITORY_BRANCH_INFO = 29,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_LIST_REPOSITORY_COMMITS_BY_BRANCH_INFO = 30,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_LIST_REPOSITORY_COMMITS_BY_REFERENCE_INFO = 31,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_REPOSITORY_COMMIT_BY_REFERENCE_INFO = 32,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_REPOSITORY_COMMIT_BY_SEQUENCE_ID_INFO = 33,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_REPOSITORY_TAG_INFO = 34,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_REPOSITORY_BY_FULL_NAME_INFO = 35,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_REPOSITORY_INFO = 36,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_REPOSITORY_BY_FULL_NAME_INFO = 37,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DEPRECATE_REPOSITORY_BY_NAME_INFO = 38,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_UNDEPRECATE_REPOSITORY_BY_NAME_INFO = 39,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_MODULE_PINS_INFO = 40,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_LOCAL_MODULE_PINS_INFO = 41,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SEARCH_INFO = 42,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_TOKEN_INFO = 43,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_TOKEN_INFO = 44,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_USER_INFO = 45,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_LIST_USERS_INFO = 46,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DEACTIVATE_USER_INFO = 47,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_UPDATE_USER_SERVER_ROLE_INFO = 48,
    ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1ALPHA1_CREATE_PLUGIN_VERSION_INFO = 49,
    ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1ALPHA1_DELETE_PLUGIN_VERSION_INFO = 50,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SET_REPOSITORY_CONTRIBUTOR_INFO = 51,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SET_PLUGIN_CONTRIBUTOR_INFO = 52,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SET_TEMPLATE_CONTRIBUTOR_INFO = 53,
    ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1ALPHA1_CREATE_PLUGIN_VERSION_METADATA_INFO = 54,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_REPOSITORY_TRACK_INFO = 55,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SET_ORGANIZATION_MEMBER_INFO = 56,
    ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_JSONSCHEMA = 57,
  }
}

export class UserActor extends jspb.Message {
  getId(): string;
  setId(value: string): UserActor;

  getUsername(): string;
  setUsername(value: string): UserActor;

  getSourceIp(): string;
  setSourceIp(value: string): UserActor;

  getAnonymous(): boolean;
  setAnonymous(value: boolean): UserActor;

  getSubject(): string;
  setSubject(value: string): UserActor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserActor.AsObject;
  static toObject(includeInstance: boolean, msg: UserActor): UserActor.AsObject;
  static serializeBinaryToWriter(message: UserActor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserActor;
  static deserializeBinaryFromReader(message: UserActor, reader: jspb.BinaryReader): UserActor;
}

export namespace UserActor {
  export type AsObject = {
    id: string,
    username: string,
    sourceIp: string,
    anonymous: boolean,
    subject: string,
  }
}

export class UserObject extends jspb.Message {
  getId(): string;
  setId(value: string): UserObject;

  getUsername(): string;
  setUsername(value: string): UserObject;

  getSubject(): string;
  setSubject(value: string): UserObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserObject.AsObject;
  static toObject(includeInstance: boolean, msg: UserObject): UserObject.AsObject;
  static serializeBinaryToWriter(message: UserObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserObject;
  static deserializeBinaryFromReader(message: UserObject, reader: jspb.BinaryReader): UserObject;
}

export namespace UserObject {
  export type AsObject = {
    id: string,
    username: string,
    subject: string,
  }
}

export class OrganizationObject extends jspb.Message {
  getId(): string;
  setId(value: string): OrganizationObject;

  getName(): string;
  setName(value: string): OrganizationObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrganizationObject.AsObject;
  static toObject(includeInstance: boolean, msg: OrganizationObject): OrganizationObject.AsObject;
  static serializeBinaryToWriter(message: OrganizationObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrganizationObject;
  static deserializeBinaryFromReader(message: OrganizationObject, reader: jspb.BinaryReader): OrganizationObject;
}

export namespace OrganizationObject {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class RepositoryObject extends jspb.Message {
  getId(): string;
  setId(value: string): RepositoryObject;

  getName(): string;
  setName(value: string): RepositoryObject;

  getOwnerId(): string;
  setOwnerId(value: string): RepositoryObject;

  getOwnerName(): string;
  setOwnerName(value: string): RepositoryObject;

  getPublic(): boolean;
  setPublic(value: boolean): RepositoryObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepositoryObject.AsObject;
  static toObject(includeInstance: boolean, msg: RepositoryObject): RepositoryObject.AsObject;
  static serializeBinaryToWriter(message: RepositoryObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepositoryObject;
  static deserializeBinaryFromReader(message: RepositoryObject, reader: jspb.BinaryReader): RepositoryObject;
}

export namespace RepositoryObject {
  export type AsObject = {
    id: string,
    name: string,
    ownerId: string,
    ownerName: string,
    pb_public: boolean,
  }
}

export class PluginObject extends jspb.Message {
  getId(): string;
  setId(value: string): PluginObject;

  getName(): string;
  setName(value: string): PluginObject;

  getOwnerId(): string;
  setOwnerId(value: string): PluginObject;

  getOwnerName(): string;
  setOwnerName(value: string): PluginObject;

  getPublic(): boolean;
  setPublic(value: boolean): PluginObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginObject.AsObject;
  static toObject(includeInstance: boolean, msg: PluginObject): PluginObject.AsObject;
  static serializeBinaryToWriter(message: PluginObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginObject;
  static deserializeBinaryFromReader(message: PluginObject, reader: jspb.BinaryReader): PluginObject;
}

export namespace PluginObject {
  export type AsObject = {
    id: string,
    name: string,
    ownerId: string,
    ownerName: string,
    pb_public: boolean,
  }
}

export class TemplateObject extends jspb.Message {
  getId(): string;
  setId(value: string): TemplateObject;

  getName(): string;
  setName(value: string): TemplateObject;

  getOwnerId(): string;
  setOwnerId(value: string): TemplateObject;

  getOwnerName(): string;
  setOwnerName(value: string): TemplateObject;

  getPublic(): boolean;
  setPublic(value: boolean): TemplateObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TemplateObject.AsObject;
  static toObject(includeInstance: boolean, msg: TemplateObject): TemplateObject.AsObject;
  static serializeBinaryToWriter(message: TemplateObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TemplateObject;
  static deserializeBinaryFromReader(message: TemplateObject, reader: jspb.BinaryReader): TemplateObject;
}

export namespace TemplateObject {
  export type AsObject = {
    id: string,
    name: string,
    ownerId: string,
    ownerName: string,
    pb_public: boolean,
  }
}

export class TokenObject extends jspb.Message {
  getId(): string;
  setId(value: string): TokenObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TokenObject.AsObject;
  static toObject(includeInstance: boolean, msg: TokenObject): TokenObject.AsObject;
  static serializeBinaryToWriter(message: TokenObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TokenObject;
  static deserializeBinaryFromReader(message: TokenObject, reader: jspb.BinaryReader): TokenObject;
}

export namespace TokenObject {
  export type AsObject = {
    id: string,
  }
}

export class Object extends jspb.Message {
  getUser(): UserObject | undefined;
  setUser(value?: UserObject): Object;
  hasUser(): boolean;
  clearUser(): Object;

  getOrganization(): OrganizationObject | undefined;
  setOrganization(value?: OrganizationObject): Object;
  hasOrganization(): boolean;
  clearOrganization(): Object;

  getRepository(): RepositoryObject | undefined;
  setRepository(value?: RepositoryObject): Object;
  hasRepository(): boolean;
  clearRepository(): Object;

  getPlugin(): PluginObject | undefined;
  setPlugin(value?: PluginObject): Object;
  hasPlugin(): boolean;
  clearPlugin(): Object;

  getTemplate(): TemplateObject | undefined;
  setTemplate(value?: TemplateObject): Object;
  hasTemplate(): boolean;
  clearTemplate(): Object;

  getToken(): TokenObject | undefined;
  setToken(value?: TokenObject): Object;
  hasToken(): boolean;
  clearToken(): Object;

  getTypeCase(): Object.TypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Object.AsObject;
  static toObject(includeInstance: boolean, msg: Object): Object.AsObject;
  static serializeBinaryToWriter(message: Object, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Object;
  static deserializeBinaryFromReader(message: Object, reader: jspb.BinaryReader): Object;
}

export namespace Object {
  export type AsObject = {
    user?: UserObject.AsObject,
    organization?: OrganizationObject.AsObject,
    repository?: RepositoryObject.AsObject,
    plugin?: PluginObject.AsObject,
    template?: TemplateObject.AsObject,
    token?: TokenObject.AsObject,
  }

  export enum TypeCase { 
    TYPE_NOT_SET = 0,
    USER = 1,
    ORGANIZATION = 2,
    REPOSITORY = 3,
    PLUGIN = 4,
    TEMPLATE = 5,
    TOKEN = 6,
  }
}

export enum Action { 
  ACTION_UNSPECIFIED = 0,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHN_SERVICE_GET_CURRENT_USER = 1,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHN_SERVICE_GET_CURRENT_USER_SUBJECT = 2,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_ORGANIZATION_REPOSITORY = 3,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_REPOSITORY_SETTINGS = 4,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_ORGANIZATION_SETTINGS = 5,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_READ_PLUGIN = 6,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_PLUGIN_VERSION = 7,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_TEMPLATE_VERSION = 8,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_ORGANIZATION_PLUGIN = 9,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_ORGANIZATION_TEMPLATE = 10,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_PLUGIN_SETTINGS = 11,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_TEMPLATE_SETTINGS = 12,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_ADD_ORGANIZATION_MEMBER = 13,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_UPDATE_ORGANIZATION_MEMBER = 14,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_REMOVE_ORGANIZATION_MEMBER = 15,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_ORGANIZATION = 16,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_REPOSITORY = 17,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_TEMPLATE = 18,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_PLUGIN = 19,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_USER = 20,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_SERVER_ADMIN_PANEL = 21,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_SOURCE_DIRECTORY_INFO = 22,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_SOURCE_FILE = 23,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_MODULE_PACKAGES = 24,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_MODULE_DOCUMENTATION = 25,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_PACKAGE_DOCUMENTATION = 26,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOWNLOAD_SERVICE_DOWNLOAD = 27,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_GENERATE_SERVICE_GENERATE_PLUGINS = 28,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_GENERATE_SERVICE_GENERATE_TEMPLATE = 29,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_IMAGE_SERVICE_GET_IMAGE = 30,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_GET_ORGANIZATION = 31,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_GET_ORGANIZATION_BY_NAME = 32,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_LIST_ORGANIZATIONS = 33,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_LIST_USER_ORGANIZATIONS = 34,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_CREATE_ORGANIZATION = 35,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_DELETE_ORGANIZATION = 36,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_DELETE_ORGANIZATION_BY_NAME = 37,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_ADD_ORGANIZATION_MEMBER = 38,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_UPDATE_ORGANIZATION_MEMBER = 39,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_REMOVE_ORGANIZATION_MEMBER = 40,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_GET_ORGANIZATION_SETTINGS = 41,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_UPDATE_ORGANIZATION_SETTINGS = 42,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_OWNER_SERVICE_GET_OWNER_BY_NAME = 43,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_PLUGINS = 44,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_USER_PLUGINS = 45,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_ORGANIZATION_PLUGINS = 46,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_PLUGIN_VERSIONS = 47,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_CREATE_PLUGIN = 48,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_GET_PLUGIN = 49,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_DELETE_PLUGIN = 50,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_GET_TEMPLATE = 51,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_TEMPLATES = 52,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_USER_TEMPLATES = 53,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_ORGANIZATION_TEMPLATES = 54,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_GET_TEMPLATE_VERSION = 55,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_TEMPLATE_VERSIONS = 56,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_CREATE_TEMPLATE = 57,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_DELETE_TEMPLATE = 58,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_CREATE_TEMPLATE_VERSION = 59,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PUSH_SERVICE_PUSH = 60,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_RECOMMENDED_REPOSITORIES = 61,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_RECOMMENDED_TEMPLATES = 62,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_LIST_RECOMMENDED_REPOSITORIES = 63,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_LIST_RECOMMENDED_TEMPLATES = 64,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_SET_RECOMMENDED_REPOSITORIES = 65,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_SET_RECOMMENDED_TEMPLATES = 66,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REFERENCE_SERVICE_GET_REFERENCE_BY_NAME = 67,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_BRANCH_SERVICE_CREATE_REPOSITORY_BRANCH = 68,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_BRANCH_SERVICE_LIST_REPOSITORY_BRANCHES = 69,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_COMMIT_SERVICE_LIST_REPOSITORY_COMMITS_BY_BRANCH = 70,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_COMMIT_SERVICE_LIST_REPOSITORY_COMMITS_BY_REFERENCE = 71,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_COMMIT_SERVICE_GET_REPOSITORY_COMMIT_BY_REFERENCE = 72,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_COMMIT_SERVICE_GET_REPOSITORY_COMMIT_BY_SEQUENCE_ID = 73,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TAG_SERVICE_CREATE_REPOSITORY_TAG = 74,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TAG_SERVICE_LIST_REPOSITORY_TAGS = 75,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_GET_REPOSITORY = 76,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_GET_REPOSITORY_BY_FULL_NAME = 77,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_REPOSITORIES = 78,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_USER_REPOSITORIES = 79,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_REPOSITORIES_USER_CAN_ACCESS = 80,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_ORGANIZATION_REPOSITORIES = 81,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_CREATE_REPOSITORY_BY_FULL_NAME = 82,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_DELETE_REPOSITORY = 83,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_DELETE_REPOSITORY_BY_FULL_NAME = 84,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_DEPRECATE_REPOSITORY_BY_NAME = 85,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_UNDEPRECATE_REPOSITORY_BY_NAME = 86,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_GET_REPOSITORIES_BY_FULL_NAME = 87,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RESOLVE_SERVICE_GET_MODULE_PINS = 88,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_LOCAL_RESOLVE_SERVICE_GET_LOCAL_MODULE_PINS = 89,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_SERVICE_SEARCH = 90,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_TOKEN_SERVICE_CREATE_TOKEN = 91,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_TOKEN_SERVICE_GET_TOKEN = 92,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_TOKEN_SERVICE_DELETE_TOKEN = 93,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_TOKEN_SERVICE_LIST_TOKENS = 94,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_CREATE_USER = 95,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_GET_USER = 96,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_GET_USER_BY_USERNAME = 97,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_LIST_USERS = 98,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_LIST_ORGANIZATION_USERS = 99,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_DELETE_USER = 100,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_DEACTIVATE_USER = 101,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_UPDATE_USER_SERVER_ROLE = 102,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_COUNT_USERS = 103,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_PLUGIN_SERVICE_CREATE_PLUGIN_VERSION = 104,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_PLUGIN_SERVICE_DELETE_PLUGIN_VERSION = 105,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_TOKEN_SERVICE_AUTHENTICATE_TOKEN = 106,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUDIT_LOGS_SERVICE_LIST_AUDIT_LOGS = 107,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_REPOSITORY_CONTRIBUTORS = 108,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_PLUGIN_CONTRIBUTORS = 109,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_TEMPLATE_CONTRIBUTORS = 110,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_SET_REPOSITORY_CONTRIBUTOR = 111,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_SET_PLUGIN_CONTRIBUTOR = 112,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_SET_TEMPLATE_CONTRIBUTOR = 113,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_MANAGE_REPOSITORY_CONTRIBUTORS = 114,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_MANAGE_PLUGIN_CONTRIBUTORS = 115,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_MANAGE_TEMPLATE_CONTRIBUTORS = 116,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_SERVICE_CREATE_REPOSITORY_TRACK = 117,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_SERVICE_LIST_REPOSITORY_TRACKS = 118,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_PROVISION_SERVICE_ADD_USER_TO_ORGANIZATION = 119,
  ACTION_BUF_ALPHA_GOMODULE_V1_ALPHA1_GO_MODULE_SERVICE_DELETE_ALL_MODULES_FOR_REPOSITORY = 120,
  ACTION_BUF_ALPHA_SANDBOX_V1_ALPHA1_SANDBOX_SERVICE_REMOTE_BUILD = 121,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_REPOSITORY_ROLES = 122,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_USER_REPOSITORY_ROLES = 123,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_PLUGIN_ROLES = 124,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_USER_PLUGIN_ROLES = 125,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_TEMPLATE_ROLES = 126,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_USER_TEMPLATE_ROLES = 127,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_SERVICE_DELETE_REPOSITORY_TRACK_BY_NAME = 128,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_PLUGIN_SERVICE_CREATE_PLUGIN_VERSION_METADATA = 129,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_ORGANIZATION_ELEMENTS = 130,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_REPOSITORY_ELEMENTS = 131,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_PLUGIN_ELEMENTS = 132,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_TEMPLATE_ELEMENTS = 133,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_USER_ELEMENTS = 134,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_SERVER_ELEMENTS = 135,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_DEPRECATE_PLUGIN = 136,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_UNDEPRECATE_PLUGIN = 137,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_DEPRECATE_TEMPLATE = 138,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_UNDEPRECATE_TEMPLATE = 139,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_SET_ORGANIZATION_MEMBER = 140,
  ACTION_BUF_ALPHA_GENREGISTRYINTERNAL_V1_ALPHA1_GENERATION_REGISTRY_SERVICE_DELETE_REPOSITORY = 141,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_GET_REPOSITORY_SETTINGS = 142,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ADMIN_SERVICE_FORCE_DELETE_USER = 143,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_GET_PLUGIN_VERSION = 144,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_COMMIT_SERVICE_GET_REPOSITORY_TRACK_COMMIT_BY_REPOSITORY_COMMIT = 145,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_COMMIT_SERVICE_LIST_REPOSITORY_TRACK_COMMITS_BY_REPOSITORY_TRACK = 146,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_SERVICE_GET_REPOSITORY_TRACK_BY_NAME = 147,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_JSON_SCHEMA_SERVICE_GET_JSON_SCHEMA = 148,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_COMMIT_SERVICE_GET_REPOSITORY_TRACK_COMMIT_BY_REFERENCE = 149,
}
