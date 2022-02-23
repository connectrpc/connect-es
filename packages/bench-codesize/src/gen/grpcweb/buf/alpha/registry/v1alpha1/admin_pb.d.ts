import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_organization_pb from '../../../../buf/alpha/registry/v1alpha1/organization_pb';
import * as buf_alpha_registry_v1alpha1_plugin_pb from '../../../../buf/alpha/registry/v1alpha1/plugin_pb';
import * as buf_alpha_registry_v1alpha1_repository_pb from '../../../../buf/alpha/registry/v1alpha1/repository_pb';
import * as buf_alpha_registry_v1alpha1_user_pb from '../../../../buf/alpha/registry/v1alpha1/user_pb';


export class ForceDeleteUserRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): ForceDeleteUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ForceDeleteUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ForceDeleteUserRequest): ForceDeleteUserRequest.AsObject;
  static serializeBinaryToWriter(message: ForceDeleteUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ForceDeleteUserRequest;
  static deserializeBinaryFromReader(message: ForceDeleteUserRequest, reader: jspb.BinaryReader): ForceDeleteUserRequest;
}

export namespace ForceDeleteUserRequest {
  export type AsObject = {
    userId: string,
  }
}

export class ForceDeleteUserResponse extends jspb.Message {
  getUser(): buf_alpha_registry_v1alpha1_user_pb.User | undefined;
  setUser(value?: buf_alpha_registry_v1alpha1_user_pb.User): ForceDeleteUserResponse;
  hasUser(): boolean;
  clearUser(): ForceDeleteUserResponse;

  getOrganizationsList(): Array<buf_alpha_registry_v1alpha1_organization_pb.Organization>;
  setOrganizationsList(value: Array<buf_alpha_registry_v1alpha1_organization_pb.Organization>): ForceDeleteUserResponse;
  clearOrganizationsList(): ForceDeleteUserResponse;
  addOrganizations(value?: buf_alpha_registry_v1alpha1_organization_pb.Organization, index?: number): buf_alpha_registry_v1alpha1_organization_pb.Organization;

  getRepositoriesList(): Array<buf_alpha_registry_v1alpha1_repository_pb.Repository>;
  setRepositoriesList(value: Array<buf_alpha_registry_v1alpha1_repository_pb.Repository>): ForceDeleteUserResponse;
  clearRepositoriesList(): ForceDeleteUserResponse;
  addRepositories(value?: buf_alpha_registry_v1alpha1_repository_pb.Repository, index?: number): buf_alpha_registry_v1alpha1_repository_pb.Repository;

  getPluginsList(): Array<buf_alpha_registry_v1alpha1_plugin_pb.Plugin>;
  setPluginsList(value: Array<buf_alpha_registry_v1alpha1_plugin_pb.Plugin>): ForceDeleteUserResponse;
  clearPluginsList(): ForceDeleteUserResponse;
  addPlugins(value?: buf_alpha_registry_v1alpha1_plugin_pb.Plugin, index?: number): buf_alpha_registry_v1alpha1_plugin_pb.Plugin;

  getTemplatesList(): Array<buf_alpha_registry_v1alpha1_plugin_pb.Template>;
  setTemplatesList(value: Array<buf_alpha_registry_v1alpha1_plugin_pb.Template>): ForceDeleteUserResponse;
  clearTemplatesList(): ForceDeleteUserResponse;
  addTemplates(value?: buf_alpha_registry_v1alpha1_plugin_pb.Template, index?: number): buf_alpha_registry_v1alpha1_plugin_pb.Template;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ForceDeleteUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ForceDeleteUserResponse): ForceDeleteUserResponse.AsObject;
  static serializeBinaryToWriter(message: ForceDeleteUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ForceDeleteUserResponse;
  static deserializeBinaryFromReader(message: ForceDeleteUserResponse, reader: jspb.BinaryReader): ForceDeleteUserResponse;
}

export namespace ForceDeleteUserResponse {
  export type AsObject = {
    user?: buf_alpha_registry_v1alpha1_user_pb.User.AsObject,
    organizationsList: Array<buf_alpha_registry_v1alpha1_organization_pb.Organization.AsObject>,
    repositoriesList: Array<buf_alpha_registry_v1alpha1_repository_pb.Repository.AsObject>,
    pluginsList: Array<buf_alpha_registry_v1alpha1_plugin_pb.Plugin.AsObject>,
    templatesList: Array<buf_alpha_registry_v1alpha1_plugin_pb.Template.AsObject>,
  }
}

