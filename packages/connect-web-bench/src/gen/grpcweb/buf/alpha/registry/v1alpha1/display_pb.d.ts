import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_role_pb from '../../../../buf/alpha/registry/v1alpha1/role_pb';


export class DisplayOrganizationElementsRequest extends jspb.Message {
  getOrganizationId(): string;
  setOrganizationId(value: string): DisplayOrganizationElementsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayOrganizationElementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayOrganizationElementsRequest): DisplayOrganizationElementsRequest.AsObject;
  static serializeBinaryToWriter(message: DisplayOrganizationElementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayOrganizationElementsRequest;
  static deserializeBinaryFromReader(message: DisplayOrganizationElementsRequest, reader: jspb.BinaryReader): DisplayOrganizationElementsRequest;
}

export namespace DisplayOrganizationElementsRequest {
  export type AsObject = {
    organizationId: string,
  }
}

export class DisplayOrganizationElementsResponse extends jspb.Message {
  getCreateRepository(): boolean;
  setCreateRepository(value: boolean): DisplayOrganizationElementsResponse;

  getCreatePlugin(): boolean;
  setCreatePlugin(value: boolean): DisplayOrganizationElementsResponse;

  getCreateTemplate(): boolean;
  setCreateTemplate(value: boolean): DisplayOrganizationElementsResponse;

  getSettings(): boolean;
  setSettings(value: boolean): DisplayOrganizationElementsResponse;

  getUpdateSettings(): boolean;
  setUpdateSettings(value: boolean): DisplayOrganizationElementsResponse;

  getDelete(): boolean;
  setDelete(value: boolean): DisplayOrganizationElementsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayOrganizationElementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayOrganizationElementsResponse): DisplayOrganizationElementsResponse.AsObject;
  static serializeBinaryToWriter(message: DisplayOrganizationElementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayOrganizationElementsResponse;
  static deserializeBinaryFromReader(message: DisplayOrganizationElementsResponse, reader: jspb.BinaryReader): DisplayOrganizationElementsResponse;
}

export namespace DisplayOrganizationElementsResponse {
  export type AsObject = {
    createRepository: boolean,
    createPlugin: boolean,
    createTemplate: boolean,
    settings: boolean,
    updateSettings: boolean,
    pb_delete: boolean,
  }
}

export class DisplayRepositoryElementsRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): DisplayRepositoryElementsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayRepositoryElementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayRepositoryElementsRequest): DisplayRepositoryElementsRequest.AsObject;
  static serializeBinaryToWriter(message: DisplayRepositoryElementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayRepositoryElementsRequest;
  static deserializeBinaryFromReader(message: DisplayRepositoryElementsRequest, reader: jspb.BinaryReader): DisplayRepositoryElementsRequest;
}

export namespace DisplayRepositoryElementsRequest {
  export type AsObject = {
    repositoryId: string,
  }
}

export class DisplayRepositoryElementsResponse extends jspb.Message {
  getSettings(): boolean;
  setSettings(value: boolean): DisplayRepositoryElementsResponse;

  getDelete(): boolean;
  setDelete(value: boolean): DisplayRepositoryElementsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayRepositoryElementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayRepositoryElementsResponse): DisplayRepositoryElementsResponse.AsObject;
  static serializeBinaryToWriter(message: DisplayRepositoryElementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayRepositoryElementsResponse;
  static deserializeBinaryFromReader(message: DisplayRepositoryElementsResponse, reader: jspb.BinaryReader): DisplayRepositoryElementsResponse;
}

export namespace DisplayRepositoryElementsResponse {
  export type AsObject = {
    settings: boolean,
    pb_delete: boolean,
  }
}

export class DisplayPluginElementsRequest extends jspb.Message {
  getPluginId(): string;
  setPluginId(value: string): DisplayPluginElementsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayPluginElementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayPluginElementsRequest): DisplayPluginElementsRequest.AsObject;
  static serializeBinaryToWriter(message: DisplayPluginElementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayPluginElementsRequest;
  static deserializeBinaryFromReader(message: DisplayPluginElementsRequest, reader: jspb.BinaryReader): DisplayPluginElementsRequest;
}

export namespace DisplayPluginElementsRequest {
  export type AsObject = {
    pluginId: string,
  }
}

export class DisplayPluginElementsResponse extends jspb.Message {
  getCreateVersion(): boolean;
  setCreateVersion(value: boolean): DisplayPluginElementsResponse;

  getSettings(): boolean;
  setSettings(value: boolean): DisplayPluginElementsResponse;

  getDelete(): boolean;
  setDelete(value: boolean): DisplayPluginElementsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayPluginElementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayPluginElementsResponse): DisplayPluginElementsResponse.AsObject;
  static serializeBinaryToWriter(message: DisplayPluginElementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayPluginElementsResponse;
  static deserializeBinaryFromReader(message: DisplayPluginElementsResponse, reader: jspb.BinaryReader): DisplayPluginElementsResponse;
}

export namespace DisplayPluginElementsResponse {
  export type AsObject = {
    createVersion: boolean,
    settings: boolean,
    pb_delete: boolean,
  }
}

export class DisplayTemplateElementsRequest extends jspb.Message {
  getTemplateId(): string;
  setTemplateId(value: string): DisplayTemplateElementsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayTemplateElementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayTemplateElementsRequest): DisplayTemplateElementsRequest.AsObject;
  static serializeBinaryToWriter(message: DisplayTemplateElementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayTemplateElementsRequest;
  static deserializeBinaryFromReader(message: DisplayTemplateElementsRequest, reader: jspb.BinaryReader): DisplayTemplateElementsRequest;
}

export namespace DisplayTemplateElementsRequest {
  export type AsObject = {
    templateId: string,
  }
}

export class DisplayTemplateElementsResponse extends jspb.Message {
  getCreateVersion(): boolean;
  setCreateVersion(value: boolean): DisplayTemplateElementsResponse;

  getSettings(): boolean;
  setSettings(value: boolean): DisplayTemplateElementsResponse;

  getDelete(): boolean;
  setDelete(value: boolean): DisplayTemplateElementsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayTemplateElementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayTemplateElementsResponse): DisplayTemplateElementsResponse.AsObject;
  static serializeBinaryToWriter(message: DisplayTemplateElementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayTemplateElementsResponse;
  static deserializeBinaryFromReader(message: DisplayTemplateElementsResponse, reader: jspb.BinaryReader): DisplayTemplateElementsResponse;
}

export namespace DisplayTemplateElementsResponse {
  export type AsObject = {
    createVersion: boolean,
    settings: boolean,
    pb_delete: boolean,
  }
}

export class DisplayUserElementsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayUserElementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayUserElementsRequest): DisplayUserElementsRequest.AsObject;
  static serializeBinaryToWriter(message: DisplayUserElementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayUserElementsRequest;
  static deserializeBinaryFromReader(message: DisplayUserElementsRequest, reader: jspb.BinaryReader): DisplayUserElementsRequest;
}

export namespace DisplayUserElementsRequest {
  export type AsObject = {
  }
}

export class DisplayUserElementsResponse extends jspb.Message {
  getDelete(): boolean;
  setDelete(value: boolean): DisplayUserElementsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayUserElementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayUserElementsResponse): DisplayUserElementsResponse.AsObject;
  static serializeBinaryToWriter(message: DisplayUserElementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayUserElementsResponse;
  static deserializeBinaryFromReader(message: DisplayUserElementsResponse, reader: jspb.BinaryReader): DisplayUserElementsResponse;
}

export namespace DisplayUserElementsResponse {
  export type AsObject = {
    pb_delete: boolean,
  }
}

export class DisplayServerElementsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayServerElementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayServerElementsRequest): DisplayServerElementsRequest.AsObject;
  static serializeBinaryToWriter(message: DisplayServerElementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayServerElementsRequest;
  static deserializeBinaryFromReader(message: DisplayServerElementsRequest, reader: jspb.BinaryReader): DisplayServerElementsRequest;
}

export namespace DisplayServerElementsRequest {
  export type AsObject = {
  }
}

export class DisplayServerElementsResponse extends jspb.Message {
  getAdminPanel(): boolean;
  setAdminPanel(value: boolean): DisplayServerElementsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayServerElementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayServerElementsResponse): DisplayServerElementsResponse.AsObject;
  static serializeBinaryToWriter(message: DisplayServerElementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayServerElementsResponse;
  static deserializeBinaryFromReader(message: DisplayServerElementsResponse, reader: jspb.BinaryReader): DisplayServerElementsResponse;
}

export namespace DisplayServerElementsResponse {
  export type AsObject = {
    adminPanel: boolean,
  }
}

export class ListManageableRepositoryRolesRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): ListManageableRepositoryRolesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableRepositoryRolesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableRepositoryRolesRequest): ListManageableRepositoryRolesRequest.AsObject;
  static serializeBinaryToWriter(message: ListManageableRepositoryRolesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableRepositoryRolesRequest;
  static deserializeBinaryFromReader(message: ListManageableRepositoryRolesRequest, reader: jspb.BinaryReader): ListManageableRepositoryRolesRequest;
}

export namespace ListManageableRepositoryRolesRequest {
  export type AsObject = {
    repositoryId: string,
  }
}

export class ListManageableRepositoryRolesResponse extends jspb.Message {
  getRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>;
  setRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>): ListManageableRepositoryRolesResponse;
  clearRolesList(): ListManageableRepositoryRolesResponse;
  addRoles(value: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole, index?: number): ListManageableRepositoryRolesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableRepositoryRolesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableRepositoryRolesResponse): ListManageableRepositoryRolesResponse.AsObject;
  static serializeBinaryToWriter(message: ListManageableRepositoryRolesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableRepositoryRolesResponse;
  static deserializeBinaryFromReader(message: ListManageableRepositoryRolesResponse, reader: jspb.BinaryReader): ListManageableRepositoryRolesResponse;
}

export namespace ListManageableRepositoryRolesResponse {
  export type AsObject = {
    rolesList: Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>,
  }
}

export class ListManageableUserRepositoryRolesRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): ListManageableUserRepositoryRolesRequest;

  getUserId(): string;
  setUserId(value: string): ListManageableUserRepositoryRolesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableUserRepositoryRolesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableUserRepositoryRolesRequest): ListManageableUserRepositoryRolesRequest.AsObject;
  static serializeBinaryToWriter(message: ListManageableUserRepositoryRolesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableUserRepositoryRolesRequest;
  static deserializeBinaryFromReader(message: ListManageableUserRepositoryRolesRequest, reader: jspb.BinaryReader): ListManageableUserRepositoryRolesRequest;
}

export namespace ListManageableUserRepositoryRolesRequest {
  export type AsObject = {
    repositoryId: string,
    userId: string,
  }
}

export class ListManageableUserRepositoryRolesResponse extends jspb.Message {
  getRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>;
  setRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>): ListManageableUserRepositoryRolesResponse;
  clearRolesList(): ListManageableUserRepositoryRolesResponse;
  addRoles(value: buf_alpha_registry_v1alpha1_role_pb.RepositoryRole, index?: number): ListManageableUserRepositoryRolesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableUserRepositoryRolesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableUserRepositoryRolesResponse): ListManageableUserRepositoryRolesResponse.AsObject;
  static serializeBinaryToWriter(message: ListManageableUserRepositoryRolesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableUserRepositoryRolesResponse;
  static deserializeBinaryFromReader(message: ListManageableUserRepositoryRolesResponse, reader: jspb.BinaryReader): ListManageableUserRepositoryRolesResponse;
}

export namespace ListManageableUserRepositoryRolesResponse {
  export type AsObject = {
    rolesList: Array<buf_alpha_registry_v1alpha1_role_pb.RepositoryRole>,
  }
}

export class ListManageablePluginRolesRequest extends jspb.Message {
  getPluginId(): string;
  setPluginId(value: string): ListManageablePluginRolesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageablePluginRolesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageablePluginRolesRequest): ListManageablePluginRolesRequest.AsObject;
  static serializeBinaryToWriter(message: ListManageablePluginRolesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageablePluginRolesRequest;
  static deserializeBinaryFromReader(message: ListManageablePluginRolesRequest, reader: jspb.BinaryReader): ListManageablePluginRolesRequest;
}

export namespace ListManageablePluginRolesRequest {
  export type AsObject = {
    pluginId: string,
  }
}

export class ListManageablePluginRolesResponse extends jspb.Message {
  getRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>;
  setRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>): ListManageablePluginRolesResponse;
  clearRolesList(): ListManageablePluginRolesResponse;
  addRoles(value: buf_alpha_registry_v1alpha1_role_pb.PluginRole, index?: number): ListManageablePluginRolesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageablePluginRolesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageablePluginRolesResponse): ListManageablePluginRolesResponse.AsObject;
  static serializeBinaryToWriter(message: ListManageablePluginRolesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageablePluginRolesResponse;
  static deserializeBinaryFromReader(message: ListManageablePluginRolesResponse, reader: jspb.BinaryReader): ListManageablePluginRolesResponse;
}

export namespace ListManageablePluginRolesResponse {
  export type AsObject = {
    rolesList: Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>,
  }
}

export class ListManageableUserPluginRolesRequest extends jspb.Message {
  getPluginId(): string;
  setPluginId(value: string): ListManageableUserPluginRolesRequest;

  getUserId(): string;
  setUserId(value: string): ListManageableUserPluginRolesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableUserPluginRolesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableUserPluginRolesRequest): ListManageableUserPluginRolesRequest.AsObject;
  static serializeBinaryToWriter(message: ListManageableUserPluginRolesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableUserPluginRolesRequest;
  static deserializeBinaryFromReader(message: ListManageableUserPluginRolesRequest, reader: jspb.BinaryReader): ListManageableUserPluginRolesRequest;
}

export namespace ListManageableUserPluginRolesRequest {
  export type AsObject = {
    pluginId: string,
    userId: string,
  }
}

export class ListManageableUserPluginRolesResponse extends jspb.Message {
  getRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>;
  setRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>): ListManageableUserPluginRolesResponse;
  clearRolesList(): ListManageableUserPluginRolesResponse;
  addRoles(value: buf_alpha_registry_v1alpha1_role_pb.PluginRole, index?: number): ListManageableUserPluginRolesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableUserPluginRolesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableUserPluginRolesResponse): ListManageableUserPluginRolesResponse.AsObject;
  static serializeBinaryToWriter(message: ListManageableUserPluginRolesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableUserPluginRolesResponse;
  static deserializeBinaryFromReader(message: ListManageableUserPluginRolesResponse, reader: jspb.BinaryReader): ListManageableUserPluginRolesResponse;
}

export namespace ListManageableUserPluginRolesResponse {
  export type AsObject = {
    rolesList: Array<buf_alpha_registry_v1alpha1_role_pb.PluginRole>,
  }
}

export class ListManageableTemplateRolesRequest extends jspb.Message {
  getTemplateId(): string;
  setTemplateId(value: string): ListManageableTemplateRolesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableTemplateRolesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableTemplateRolesRequest): ListManageableTemplateRolesRequest.AsObject;
  static serializeBinaryToWriter(message: ListManageableTemplateRolesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableTemplateRolesRequest;
  static deserializeBinaryFromReader(message: ListManageableTemplateRolesRequest, reader: jspb.BinaryReader): ListManageableTemplateRolesRequest;
}

export namespace ListManageableTemplateRolesRequest {
  export type AsObject = {
    templateId: string,
  }
}

export class ListManageableTemplateRolesResponse extends jspb.Message {
  getRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>;
  setRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>): ListManageableTemplateRolesResponse;
  clearRolesList(): ListManageableTemplateRolesResponse;
  addRoles(value: buf_alpha_registry_v1alpha1_role_pb.TemplateRole, index?: number): ListManageableTemplateRolesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableTemplateRolesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableTemplateRolesResponse): ListManageableTemplateRolesResponse.AsObject;
  static serializeBinaryToWriter(message: ListManageableTemplateRolesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableTemplateRolesResponse;
  static deserializeBinaryFromReader(message: ListManageableTemplateRolesResponse, reader: jspb.BinaryReader): ListManageableTemplateRolesResponse;
}

export namespace ListManageableTemplateRolesResponse {
  export type AsObject = {
    rolesList: Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>,
  }
}

export class ListManageableUserTemplateRolesRequest extends jspb.Message {
  getTemplateId(): string;
  setTemplateId(value: string): ListManageableUserTemplateRolesRequest;

  getUserId(): string;
  setUserId(value: string): ListManageableUserTemplateRolesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableUserTemplateRolesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableUserTemplateRolesRequest): ListManageableUserTemplateRolesRequest.AsObject;
  static serializeBinaryToWriter(message: ListManageableUserTemplateRolesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableUserTemplateRolesRequest;
  static deserializeBinaryFromReader(message: ListManageableUserTemplateRolesRequest, reader: jspb.BinaryReader): ListManageableUserTemplateRolesRequest;
}

export namespace ListManageableUserTemplateRolesRequest {
  export type AsObject = {
    templateId: string,
    userId: string,
  }
}

export class ListManageableUserTemplateRolesResponse extends jspb.Message {
  getRolesList(): Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>;
  setRolesList(value: Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>): ListManageableUserTemplateRolesResponse;
  clearRolesList(): ListManageableUserTemplateRolesResponse;
  addRoles(value: buf_alpha_registry_v1alpha1_role_pb.TemplateRole, index?: number): ListManageableUserTemplateRolesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListManageableUserTemplateRolesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListManageableUserTemplateRolesResponse): ListManageableUserTemplateRolesResponse.AsObject;
  static serializeBinaryToWriter(message: ListManageableUserTemplateRolesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListManageableUserTemplateRolesResponse;
  static deserializeBinaryFromReader(message: ListManageableUserTemplateRolesResponse, reader: jspb.BinaryReader): ListManageableUserTemplateRolesResponse;
}

export namespace ListManageableUserTemplateRolesResponse {
  export type AsObject = {
    rolesList: Array<buf_alpha_registry_v1alpha1_role_pb.TemplateRole>,
  }
}

