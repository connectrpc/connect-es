import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_repository_pb from '../../../../buf/alpha/registry/v1alpha1/repository_pb';
import * as buf_alpha_registry_v1alpha1_plugin_pb from '../../../../buf/alpha/registry/v1alpha1/plugin_pb';


export class RepositorySearchResult extends jspb.Message {
  getId(): string;
  setId(value: string): RepositorySearchResult;

  getName(): string;
  setName(value: string): RepositorySearchResult;

  getOwner(): string;
  setOwner(value: string): RepositorySearchResult;

  getVisibility(): buf_alpha_registry_v1alpha1_repository_pb.Visibility;
  setVisibility(value: buf_alpha_registry_v1alpha1_repository_pb.Visibility): RepositorySearchResult;

  getDeprecated(): boolean;
  setDeprecated(value: boolean): RepositorySearchResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepositorySearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: RepositorySearchResult): RepositorySearchResult.AsObject;
  static serializeBinaryToWriter(message: RepositorySearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepositorySearchResult;
  static deserializeBinaryFromReader(message: RepositorySearchResult, reader: jspb.BinaryReader): RepositorySearchResult;
}

export namespace RepositorySearchResult {
  export type AsObject = {
    id: string,
    name: string,
    owner: string,
    visibility: buf_alpha_registry_v1alpha1_repository_pb.Visibility,
    deprecated: boolean,
  }
}

export class OrganizationSearchResult extends jspb.Message {
  getId(): string;
  setId(value: string): OrganizationSearchResult;

  getName(): string;
  setName(value: string): OrganizationSearchResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrganizationSearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: OrganizationSearchResult): OrganizationSearchResult.AsObject;
  static serializeBinaryToWriter(message: OrganizationSearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrganizationSearchResult;
  static deserializeBinaryFromReader(message: OrganizationSearchResult, reader: jspb.BinaryReader): OrganizationSearchResult;
}

export namespace OrganizationSearchResult {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class UserSearchResult extends jspb.Message {
  getId(): string;
  setId(value: string): UserSearchResult;

  getUsername(): string;
  setUsername(value: string): UserSearchResult;

  getDeactivated(): boolean;
  setDeactivated(value: boolean): UserSearchResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserSearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: UserSearchResult): UserSearchResult.AsObject;
  static serializeBinaryToWriter(message: UserSearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserSearchResult;
  static deserializeBinaryFromReader(message: UserSearchResult, reader: jspb.BinaryReader): UserSearchResult;
}

export namespace UserSearchResult {
  export type AsObject = {
    id: string,
    username: string,
    deactivated: boolean,
  }
}

export class TeamSearchResult extends jspb.Message {
  getId(): string;
  setId(value: string): TeamSearchResult;

  getName(): string;
  setName(value: string): TeamSearchResult;

  getOrganizationName(): string;
  setOrganizationName(value: string): TeamSearchResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TeamSearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: TeamSearchResult): TeamSearchResult.AsObject;
  static serializeBinaryToWriter(message: TeamSearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TeamSearchResult;
  static deserializeBinaryFromReader(message: TeamSearchResult, reader: jspb.BinaryReader): TeamSearchResult;
}

export namespace TeamSearchResult {
  export type AsObject = {
    id: string,
    name: string,
    organizationName: string,
  }
}

export class PluginSearchResult extends jspb.Message {
  getId(): string;
  setId(value: string): PluginSearchResult;

  getName(): string;
  setName(value: string): PluginSearchResult;

  getOwner(): string;
  setOwner(value: string): PluginSearchResult;

  getVisibility(): buf_alpha_registry_v1alpha1_plugin_pb.PluginVisibility;
  setVisibility(value: buf_alpha_registry_v1alpha1_plugin_pb.PluginVisibility): PluginSearchResult;

  getDeprecated(): boolean;
  setDeprecated(value: boolean): PluginSearchResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginSearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: PluginSearchResult): PluginSearchResult.AsObject;
  static serializeBinaryToWriter(message: PluginSearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginSearchResult;
  static deserializeBinaryFromReader(message: PluginSearchResult, reader: jspb.BinaryReader): PluginSearchResult;
}

export namespace PluginSearchResult {
  export type AsObject = {
    id: string,
    name: string,
    owner: string,
    visibility: buf_alpha_registry_v1alpha1_plugin_pb.PluginVisibility,
    deprecated: boolean,
  }
}

export class TemplateSearchResult extends jspb.Message {
  getId(): string;
  setId(value: string): TemplateSearchResult;

  getName(): string;
  setName(value: string): TemplateSearchResult;

  getOwner(): string;
  setOwner(value: string): TemplateSearchResult;

  getVisibility(): buf_alpha_registry_v1alpha1_plugin_pb.PluginVisibility;
  setVisibility(value: buf_alpha_registry_v1alpha1_plugin_pb.PluginVisibility): TemplateSearchResult;

  getDeprecated(): boolean;
  setDeprecated(value: boolean): TemplateSearchResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TemplateSearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: TemplateSearchResult): TemplateSearchResult.AsObject;
  static serializeBinaryToWriter(message: TemplateSearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TemplateSearchResult;
  static deserializeBinaryFromReader(message: TemplateSearchResult, reader: jspb.BinaryReader): TemplateSearchResult;
}

export namespace TemplateSearchResult {
  export type AsObject = {
    id: string,
    name: string,
    owner: string,
    visibility: buf_alpha_registry_v1alpha1_plugin_pb.PluginVisibility,
    deprecated: boolean,
  }
}

export class SearchResult extends jspb.Message {
  getRepository(): RepositorySearchResult | undefined;
  setRepository(value?: RepositorySearchResult): SearchResult;
  hasRepository(): boolean;
  clearRepository(): SearchResult;

  getOrganization(): OrganizationSearchResult | undefined;
  setOrganization(value?: OrganizationSearchResult): SearchResult;
  hasOrganization(): boolean;
  clearOrganization(): SearchResult;

  getUser(): UserSearchResult | undefined;
  setUser(value?: UserSearchResult): SearchResult;
  hasUser(): boolean;
  clearUser(): SearchResult;

  getTeam(): TeamSearchResult | undefined;
  setTeam(value?: TeamSearchResult): SearchResult;
  hasTeam(): boolean;
  clearTeam(): SearchResult;

  getPlugin(): PluginSearchResult | undefined;
  setPlugin(value?: PluginSearchResult): SearchResult;
  hasPlugin(): boolean;
  clearPlugin(): SearchResult;

  getTemplate(): TemplateSearchResult | undefined;
  setTemplate(value?: TemplateSearchResult): SearchResult;
  hasTemplate(): boolean;
  clearTemplate(): SearchResult;

  getItemCase(): SearchResult.ItemCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: SearchResult): SearchResult.AsObject;
  static serializeBinaryToWriter(message: SearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchResult;
  static deserializeBinaryFromReader(message: SearchResult, reader: jspb.BinaryReader): SearchResult;
}

export namespace SearchResult {
  export type AsObject = {
    repository?: RepositorySearchResult.AsObject,
    organization?: OrganizationSearchResult.AsObject,
    user?: UserSearchResult.AsObject,
    team?: TeamSearchResult.AsObject,
    plugin?: PluginSearchResult.AsObject,
    template?: TemplateSearchResult.AsObject,
  }

  export enum ItemCase { 
    ITEM_NOT_SET = 0,
    REPOSITORY = 1,
    ORGANIZATION = 2,
    USER = 3,
    TEAM = 4,
    PLUGIN = 5,
    TEMPLATE = 6,
  }
}

export class SearchRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): SearchRequest;

  getPageSize(): number;
  setPageSize(value: number): SearchRequest;

  getPageToken(): number;
  setPageToken(value: number): SearchRequest;

  getFiltersList(): Array<SearchFilter>;
  setFiltersList(value: Array<SearchFilter>): SearchRequest;
  clearFiltersList(): SearchRequest;
  addFilters(value: SearchFilter, index?: number): SearchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchRequest): SearchRequest.AsObject;
  static serializeBinaryToWriter(message: SearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchRequest;
  static deserializeBinaryFromReader(message: SearchRequest, reader: jspb.BinaryReader): SearchRequest;
}

export namespace SearchRequest {
  export type AsObject = {
    query: string,
    pageSize: number,
    pageToken: number,
    filtersList: Array<SearchFilter>,
  }
}

export class SearchResponse extends jspb.Message {
  getSearchResultsList(): Array<SearchResult>;
  setSearchResultsList(value: Array<SearchResult>): SearchResponse;
  clearSearchResultsList(): SearchResponse;
  addSearchResults(value?: SearchResult, index?: number): SearchResult;

  getNextPageToken(): number;
  setNextPageToken(value: number): SearchResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchResponse): SearchResponse.AsObject;
  static serializeBinaryToWriter(message: SearchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchResponse;
  static deserializeBinaryFromReader(message: SearchResponse, reader: jspb.BinaryReader): SearchResponse;
}

export namespace SearchResponse {
  export type AsObject = {
    searchResultsList: Array<SearchResult.AsObject>,
    nextPageToken: number,
  }
}

export enum SearchFilter { 
  SEARCH_FILTER_UNSPECIFIED = 0,
  SEARCH_FILTER_USER = 1,
  SEARCH_FILTER_ORGANIZATION = 2,
  SEARCH_FILTER_REPOSITORY = 3,
  SEARCH_FILTER_PLUGIN = 4,
  SEARCH_FILTER_TEMPLATE = 5,
  SEARCH_FILTER_TEAM = 6,
}
