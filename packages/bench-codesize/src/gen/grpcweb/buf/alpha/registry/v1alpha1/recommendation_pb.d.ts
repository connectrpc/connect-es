import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class RecommendedRepository extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): RecommendedRepository;

  getName(): string;
  setName(value: string): RecommendedRepository;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): RecommendedRepository;
  hasCreateTime(): boolean;
  clearCreateTime(): RecommendedRepository;

  getDescription(): string;
  setDescription(value: string): RecommendedRepository;

  getRepositoryId(): string;
  setRepositoryId(value: string): RecommendedRepository;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecommendedRepository.AsObject;
  static toObject(includeInstance: boolean, msg: RecommendedRepository): RecommendedRepository.AsObject;
  static serializeBinaryToWriter(message: RecommendedRepository, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecommendedRepository;
  static deserializeBinaryFromReader(message: RecommendedRepository, reader: jspb.BinaryReader): RecommendedRepository;
}

export namespace RecommendedRepository {
  export type AsObject = {
    owner: string,
    name: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    description: string,
    repositoryId: string,
  }
}

export class RecommendedTemplate extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): RecommendedTemplate;

  getName(): string;
  setName(value: string): RecommendedTemplate;

  getDescription(): string;
  setDescription(value: string): RecommendedTemplate;

  getTemplateId(): string;
  setTemplateId(value: string): RecommendedTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecommendedTemplate.AsObject;
  static toObject(includeInstance: boolean, msg: RecommendedTemplate): RecommendedTemplate.AsObject;
  static serializeBinaryToWriter(message: RecommendedTemplate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecommendedTemplate;
  static deserializeBinaryFromReader(message: RecommendedTemplate, reader: jspb.BinaryReader): RecommendedTemplate;
}

export namespace RecommendedTemplate {
  export type AsObject = {
    owner: string,
    name: string,
    description: string,
    templateId: string,
  }
}

export class SetRecommendedRepository extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): SetRecommendedRepository;

  getDescription(): string;
  setDescription(value: string): SetRecommendedRepository;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRecommendedRepository.AsObject;
  static toObject(includeInstance: boolean, msg: SetRecommendedRepository): SetRecommendedRepository.AsObject;
  static serializeBinaryToWriter(message: SetRecommendedRepository, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRecommendedRepository;
  static deserializeBinaryFromReader(message: SetRecommendedRepository, reader: jspb.BinaryReader): SetRecommendedRepository;
}

export namespace SetRecommendedRepository {
  export type AsObject = {
    repositoryId: string,
    description: string,
  }
}

export class SetRecommendedTemplate extends jspb.Message {
  getTemplateId(): string;
  setTemplateId(value: string): SetRecommendedTemplate;

  getDescription(): string;
  setDescription(value: string): SetRecommendedTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRecommendedTemplate.AsObject;
  static toObject(includeInstance: boolean, msg: SetRecommendedTemplate): SetRecommendedTemplate.AsObject;
  static serializeBinaryToWriter(message: SetRecommendedTemplate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRecommendedTemplate;
  static deserializeBinaryFromReader(message: SetRecommendedTemplate, reader: jspb.BinaryReader): SetRecommendedTemplate;
}

export namespace SetRecommendedTemplate {
  export type AsObject = {
    templateId: string,
    description: string,
  }
}

export class RecommendedRepositoriesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecommendedRepositoriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RecommendedRepositoriesRequest): RecommendedRepositoriesRequest.AsObject;
  static serializeBinaryToWriter(message: RecommendedRepositoriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecommendedRepositoriesRequest;
  static deserializeBinaryFromReader(message: RecommendedRepositoriesRequest, reader: jspb.BinaryReader): RecommendedRepositoriesRequest;
}

export namespace RecommendedRepositoriesRequest {
  export type AsObject = {
  }
}

export class RecommendedRepositoriesResponse extends jspb.Message {
  getRepositoriesList(): Array<RecommendedRepository>;
  setRepositoriesList(value: Array<RecommendedRepository>): RecommendedRepositoriesResponse;
  clearRepositoriesList(): RecommendedRepositoriesResponse;
  addRepositories(value?: RecommendedRepository, index?: number): RecommendedRepository;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecommendedRepositoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RecommendedRepositoriesResponse): RecommendedRepositoriesResponse.AsObject;
  static serializeBinaryToWriter(message: RecommendedRepositoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecommendedRepositoriesResponse;
  static deserializeBinaryFromReader(message: RecommendedRepositoriesResponse, reader: jspb.BinaryReader): RecommendedRepositoriesResponse;
}

export namespace RecommendedRepositoriesResponse {
  export type AsObject = {
    repositoriesList: Array<RecommendedRepository.AsObject>,
  }
}

export class RecommendedTemplatesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecommendedTemplatesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RecommendedTemplatesRequest): RecommendedTemplatesRequest.AsObject;
  static serializeBinaryToWriter(message: RecommendedTemplatesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecommendedTemplatesRequest;
  static deserializeBinaryFromReader(message: RecommendedTemplatesRequest, reader: jspb.BinaryReader): RecommendedTemplatesRequest;
}

export namespace RecommendedTemplatesRequest {
  export type AsObject = {
  }
}

export class RecommendedTemplatesResponse extends jspb.Message {
  getTemplatesList(): Array<RecommendedTemplate>;
  setTemplatesList(value: Array<RecommendedTemplate>): RecommendedTemplatesResponse;
  clearTemplatesList(): RecommendedTemplatesResponse;
  addTemplates(value?: RecommendedTemplate, index?: number): RecommendedTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecommendedTemplatesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RecommendedTemplatesResponse): RecommendedTemplatesResponse.AsObject;
  static serializeBinaryToWriter(message: RecommendedTemplatesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecommendedTemplatesResponse;
  static deserializeBinaryFromReader(message: RecommendedTemplatesResponse, reader: jspb.BinaryReader): RecommendedTemplatesResponse;
}

export namespace RecommendedTemplatesResponse {
  export type AsObject = {
    templatesList: Array<RecommendedTemplate.AsObject>,
  }
}

export class ListRecommendedRepositoriesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRecommendedRepositoriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRecommendedRepositoriesRequest): ListRecommendedRepositoriesRequest.AsObject;
  static serializeBinaryToWriter(message: ListRecommendedRepositoriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRecommendedRepositoriesRequest;
  static deserializeBinaryFromReader(message: ListRecommendedRepositoriesRequest, reader: jspb.BinaryReader): ListRecommendedRepositoriesRequest;
}

export namespace ListRecommendedRepositoriesRequest {
  export type AsObject = {
  }
}

export class ListRecommendedRepositoriesResponse extends jspb.Message {
  getRepositoriesList(): Array<RecommendedRepository>;
  setRepositoriesList(value: Array<RecommendedRepository>): ListRecommendedRepositoriesResponse;
  clearRepositoriesList(): ListRecommendedRepositoriesResponse;
  addRepositories(value?: RecommendedRepository, index?: number): RecommendedRepository;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRecommendedRepositoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRecommendedRepositoriesResponse): ListRecommendedRepositoriesResponse.AsObject;
  static serializeBinaryToWriter(message: ListRecommendedRepositoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRecommendedRepositoriesResponse;
  static deserializeBinaryFromReader(message: ListRecommendedRepositoriesResponse, reader: jspb.BinaryReader): ListRecommendedRepositoriesResponse;
}

export namespace ListRecommendedRepositoriesResponse {
  export type AsObject = {
    repositoriesList: Array<RecommendedRepository.AsObject>,
  }
}

export class ListRecommendedTemplatesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRecommendedTemplatesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRecommendedTemplatesRequest): ListRecommendedTemplatesRequest.AsObject;
  static serializeBinaryToWriter(message: ListRecommendedTemplatesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRecommendedTemplatesRequest;
  static deserializeBinaryFromReader(message: ListRecommendedTemplatesRequest, reader: jspb.BinaryReader): ListRecommendedTemplatesRequest;
}

export namespace ListRecommendedTemplatesRequest {
  export type AsObject = {
  }
}

export class ListRecommendedTemplatesResponse extends jspb.Message {
  getTemplatesList(): Array<RecommendedTemplate>;
  setTemplatesList(value: Array<RecommendedTemplate>): ListRecommendedTemplatesResponse;
  clearTemplatesList(): ListRecommendedTemplatesResponse;
  addTemplates(value?: RecommendedTemplate, index?: number): RecommendedTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRecommendedTemplatesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRecommendedTemplatesResponse): ListRecommendedTemplatesResponse.AsObject;
  static serializeBinaryToWriter(message: ListRecommendedTemplatesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRecommendedTemplatesResponse;
  static deserializeBinaryFromReader(message: ListRecommendedTemplatesResponse, reader: jspb.BinaryReader): ListRecommendedTemplatesResponse;
}

export namespace ListRecommendedTemplatesResponse {
  export type AsObject = {
    templatesList: Array<RecommendedTemplate.AsObject>,
  }
}

export class SetRecommendedRepositoriesRequest extends jspb.Message {
  getRepositoriesList(): Array<SetRecommendedRepository>;
  setRepositoriesList(value: Array<SetRecommendedRepository>): SetRecommendedRepositoriesRequest;
  clearRepositoriesList(): SetRecommendedRepositoriesRequest;
  addRepositories(value?: SetRecommendedRepository, index?: number): SetRecommendedRepository;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRecommendedRepositoriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetRecommendedRepositoriesRequest): SetRecommendedRepositoriesRequest.AsObject;
  static serializeBinaryToWriter(message: SetRecommendedRepositoriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRecommendedRepositoriesRequest;
  static deserializeBinaryFromReader(message: SetRecommendedRepositoriesRequest, reader: jspb.BinaryReader): SetRecommendedRepositoriesRequest;
}

export namespace SetRecommendedRepositoriesRequest {
  export type AsObject = {
    repositoriesList: Array<SetRecommendedRepository.AsObject>,
  }
}

export class SetRecommendedRepositoriesResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRecommendedRepositoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetRecommendedRepositoriesResponse): SetRecommendedRepositoriesResponse.AsObject;
  static serializeBinaryToWriter(message: SetRecommendedRepositoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRecommendedRepositoriesResponse;
  static deserializeBinaryFromReader(message: SetRecommendedRepositoriesResponse, reader: jspb.BinaryReader): SetRecommendedRepositoriesResponse;
}

export namespace SetRecommendedRepositoriesResponse {
  export type AsObject = {
  }
}

export class SetRecommendedTemplatesRequest extends jspb.Message {
  getTemplatesList(): Array<SetRecommendedTemplate>;
  setTemplatesList(value: Array<SetRecommendedTemplate>): SetRecommendedTemplatesRequest;
  clearTemplatesList(): SetRecommendedTemplatesRequest;
  addTemplates(value?: SetRecommendedTemplate, index?: number): SetRecommendedTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRecommendedTemplatesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetRecommendedTemplatesRequest): SetRecommendedTemplatesRequest.AsObject;
  static serializeBinaryToWriter(message: SetRecommendedTemplatesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRecommendedTemplatesRequest;
  static deserializeBinaryFromReader(message: SetRecommendedTemplatesRequest, reader: jspb.BinaryReader): SetRecommendedTemplatesRequest;
}

export namespace SetRecommendedTemplatesRequest {
  export type AsObject = {
    templatesList: Array<SetRecommendedTemplate.AsObject>,
  }
}

export class SetRecommendedTemplatesResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetRecommendedTemplatesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetRecommendedTemplatesResponse): SetRecommendedTemplatesResponse.AsObject;
  static serializeBinaryToWriter(message: SetRecommendedTemplatesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetRecommendedTemplatesResponse;
  static deserializeBinaryFromReader(message: SetRecommendedTemplatesResponse, reader: jspb.BinaryReader): SetRecommendedTemplatesResponse;
}

export namespace SetRecommendedTemplatesResponse {
  export type AsObject = {
  }
}

